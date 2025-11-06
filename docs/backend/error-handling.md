# Gestione Errori Backend

Documentazione per la gestione centralizzata degli errori in ASP.NET Core.

## Custom Exceptions

### DuplicateTaskException

```csharp
namespace TodoApp.Core.Exceptions;

public class DuplicateTaskException : Exception
{
    public DuplicateTaskException(string message) : base(message)
    {
    }

    public DuplicateTaskException(string message, Exception innerException)
        : base(message, innerException)
    {
    }
}
```

### TaskNotFoundException

```csharp
namespace TodoApp.Core.Exceptions;

public class TaskNotFoundException : Exception
{
    public TaskNotFoundException(string taskId)
        : base($"Task con ID {taskId} non trovato")
    {
        TaskId = taskId;
    }

    public string TaskId { get; }
}
```

### ValidationException

```csharp
namespace TodoApp.Core.Exceptions;

public class ValidationException : Exception
{
    public ValidationException(string message, IDictionary<string, string[]> errors)
        : base(message)
    {
        Errors = errors;
    }

    public IDictionary<string, string[]> Errors { get; }
}
```

## Global Exception Handler

### Implementation (.NET 8+)

```csharp
using Microsoft.AspNetCore.Diagnostics;
using TodoApp.Core.Exceptions;

namespace TodoApp.API.Middleware;

public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
    {
        _logger = logger;
    }

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        var (status, message, errors) = exception switch
        {
            TaskNotFoundException ex => (
                StatusCodes.Status404NotFound,
                ex.Message,
                null
            ),
            DuplicateTaskException ex => (
                StatusCodes.Status409Conflict,
                ex.Message,
                null
            ),
            ValidationException ex => (
                StatusCodes.Status400BadRequest,
                "Errore di validazione",
                ex.Errors
            ),
            _ => (
                StatusCodes.Status500InternalServerError,
                "Si è verificato un errore interno",
                null
            )
        };

        _logger.LogError(
            exception,
            "Errore gestito: {Message}",
            exception.Message
        );

        httpContext.Response.StatusCode = status;

        var response = errors != null
            ? new { error = message, validationErrors = errors }
            : new { error = message };

        await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);

        return true;
    }
}
```

### Registrazione in Program.cs

```csharp
// Aggiungi il global exception handler
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

// Dopo app.Build()
app.UseExceptionHandler();
```

## HTTP Status Codes

### Mappatura Errori → Status Codes

| Exception | Status Code | Codice | Descrizione |
|-----------|-------------|--------|-------------|
| `TaskNotFoundException` | 404 | Not Found | Risorsa non trovata |
| `DuplicateTaskException` | 409 | Conflict | Conflitto (es. titolo duplicato) |
| `ValidationException` | 400 | Bad Request | Dati input non validi |
| `UnauthorizedException` | 401 | Unauthorized | Non autenticato |
| `ForbiddenException` | 403 | Forbidden | Non autorizzato |
| Altri errori | 500 | Internal Server Error | Errore generico server |

### Esempi di Risposta

**404 Not Found**:
```json
{
  "error": "Task con ID 12345678-1234-1234-1234-123456789abc non trovato"
}
```

**409 Conflict**:
```json
{
  "error": "Un task con questo titolo esiste già"
}
```

**400 Bad Request** (con validazioni):
```json
{
  "error": "Errore di validazione",
  "validationErrors": {
    "Title": ["Il titolo è obbligatorio", "Il titolo non può superare 100 caratteri"]
  }
}
```

**500 Internal Server Error**:
```json
{
  "error": "Si è verificato un errore interno"
}
```

## Uso nelle Applicazioni

### Nel Service Layer

```csharp
public class TaskService : ITaskService
{
    public async Task<TaskDto> GetByIdAsync(Guid id)
    {
        var task = await _repository.GetByIdAsync(id);

        if (task == null)
        {
            throw new TaskNotFoundException(id.ToString());
        }

        return MapToDto(task);
    }

    public async Task<TaskDto> CreateTaskAsync(CreateTaskDto dto)
    {
        if (await _repository.ExistsByTitleAsync(dto.Title))
        {
            throw new DuplicateTaskException(
                "Un task con questo titolo esiste già"
            );
        }

        var task = MapToEntity(dto);
        var createdTask = await _repository.AddAsync(task);

        return MapToDto(createdTask);
    }
}
```

### Nel Controller (Opzionale)

```csharp
[HttpGet("{id}")]
[ProducesResponseType(typeof(TaskDto), StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status404NotFound)]
public async Task<ActionResult<TaskDto>> GetByIdAsync(Guid id)
{
    // Il Global Exception Handler gestisce automaticamente le eccezioni
    var task = await _taskService.GetByIdAsync(id);
    return Ok(task);
}

[HttpPost]
[ProducesResponseType(typeof(TaskDto), StatusCodes.Status201Created)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
[ProducesResponseType(StatusCodes.Status409Conflict)]
public async Task<ActionResult<TaskDto>> CreateAsync([FromBody] CreateTaskDto dto)
{
    var createdTask = await _taskService.CreateTaskAsync(dto);
    return CreatedAtAction(
        nameof(GetByIdAsync),
        new { id = createdTask.Id },
        createdTask
    );
}
```

## Logging degli Errori

### Livelli di Log

```csharp
public async Task<TaskDto> UpdateTaskAsync(Guid id, UpdateTaskDto dto)
{
    _logger.LogInformation("Aggiornamento task {TaskId}", id);

    try
    {
        var task = await _repository.GetByIdAsync(id);

        if (task == null)
        {
            _logger.LogWarning("Task {TaskId} non trovato durante update", id);
            throw new TaskNotFoundException(id.ToString());
        }

        task.Title = dto.Title;
        task.IsCompleted = dto.IsCompleted;
        task.UpdatedAt = DateTime.UtcNow;

        await _repository.UpdateAsync(task);

        _logger.LogInformation("Task {TaskId} aggiornato con successo", id);

        return MapToDto(task);
    }
    catch (Exception ex) when (ex is not TaskNotFoundException)
    {
        _logger.LogError(
            ex,
            "Errore durante l'aggiornamento del task {TaskId}",
            id
        );
        throw;
    }
}
```

### Structured Logging

```csharp
// ✅ BUONO - Structured logging
_logger.LogInformation(
    "Task creato: {TaskId}, Titolo: {Title}",
    task.Id,
    task.Title
);

// ❌ EVITA - String concatenation
_logger.LogInformation($"Task creato: {task.Id}, Titolo: {task.Title}");
```

## Best Practices

### 1. Non catturare Exception generica

```csharp
// ✅ BUONO - Cattura eccezioni specifiche
try
{
    await _service.CreateTaskAsync(dto);
}
catch (DuplicateTaskException ex)
{
    // Gestisci duplicato
}
catch (ValidationException ex)
{
    // Gestisci validazione
}

// ❌ EVITA - Catch generico
try
{
    await _service.CreateTaskAsync(dto);
}
catch (Exception ex) // Troppo generico
{
    // ...
}
```

### 2. Rilancia eccezioni quando necessario

```csharp
// ✅ BUONO
catch (Exception ex)
{
    _logger.LogError(ex, "Errore durante operazione");
    throw; // Rilancia l'eccezione originale
}

// ❌ EVITA - Swallow exception
catch (Exception ex)
{
    _logger.LogError(ex, "Errore");
    // Non fa nulla, nasconde l'errore
}
```

### 3. Non esporre dettagli interni

```csharp
// ✅ BUONO - Messaggio generico per 500
"Si è verificato un errore interno"

// ❌ EVITA - Espone dettagli database
$"Errore SQL: {sqlException.Message}"
```

### 4. Usa messaggi localizzati

```csharp
// Messaggi in italiano per questo progetto
throw new TaskNotFoundException("Task non trovato");

// Non in inglese
throw new TaskNotFoundException("Task not found");
```

## Riferimenti

- [Error Handling in ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/error-handling)
- [IExceptionHandler (.NET 8+)](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/error-handling)
- [Logging in .NET](https://docs.microsoft.com/en-us/dotnet/core/extensions/logging)
