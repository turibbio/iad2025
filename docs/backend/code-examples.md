# Esempi di Buone Pratiche Backend

Questa pagina contiene esempi concreti di buone pratiche e pattern da evitare nello sviluppo backend .NET.

## Service Layer

### ✅ BUONO - Service con validazione e gestione errori

```csharp
/// <summary>
/// Creates a new task with validation
/// </summary>
/// <param name="dto">Task creation data</param>
/// <returns>Created task with generated ID</returns>
public async Task<TaskDto> CreateTaskAsync(CreateTaskDto dto)
{
    // Valida che il titolo non sia duplicato
    if (await _repository.ExistsByTitleAsync(dto.Title))
    {
        throw new DuplicateTaskException("Un task con questo titolo esiste già");
    }

    var task = new TodoTask
    {
        Id = Guid.NewGuid(),
        Title = dto.Title,
        IsCompleted = false,
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow
    };

    var createdTask = await _repository.AddAsync(task);

    _logger.LogInformation("Task creato con ID {TaskId}", createdTask.Id);

    return MapToDto(createdTask);
}
```

### ❌ EVITA - Nomi poco chiari e mancanza di validazioni

```csharp
// Nomi poco chiari, abbreviazioni, nessuna validazione
public async Task<TaskDto> Create(CreateTaskDto d)
{
    var t = new TodoTask(); // abbreviazione
    t.Title = d.Title;
    return await _repository.AddAsync(t); // nessun controllo duplicati
}
```

## Controller

### ✅ BUONO - Controller con gestione errori e status codes appropriati

```csharp
[ApiController]
[Route("api/[controller]")]
public class TaskController : ControllerBase
{
    private readonly ITaskService _taskService;
    private readonly ILogger<TaskController> _logger;

    public TaskController(ITaskService taskService, ILogger<TaskController> logger)
    {
        _taskService = taskService;
        _logger = logger;
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(TaskDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<TaskDto>> GetByIdAsync(Guid id)
    {
        try
        {
            var task = await _taskService.GetByIdAsync(id);
            return Ok(task);
        }
        catch (TaskNotFoundException ex)
        {
            _logger.LogWarning(ex, "Task {TaskId} non trovato", id);
            return NotFound(new { error = ex.Message });
        }
    }

    [HttpPost]
    [ProducesResponseType(typeof(TaskDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<TaskDto>> CreateAsync([FromBody] CreateTaskDto dto)
    {
        try
        {
            var createdTask = await _taskService.CreateTaskAsync(dto);
            return CreatedAtAction(
                nameof(GetByIdAsync),
                new { id = createdTask.Id },
                createdTask
            );
        }
        catch (DuplicateTaskException ex)
        {
            _logger.LogWarning(ex, "Tentativo di creare task duplicato: {Title}", dto.Title);
            return Conflict(new { error = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [ProducesResponseType(typeof(TaskDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<TaskDto>> UpdateAsync(Guid id, [FromBody] UpdateTaskDto dto)
    {
        try
        {
            var updatedTask = await _taskService.UpdateTaskAsync(id, dto);
            return Ok(updatedTask);
        }
        catch (TaskNotFoundException ex)
        {
            return NotFound(new { error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteAsync(Guid id)
    {
        try
        {
            await _taskService.DeleteTaskAsync(id);
            return NoContent();
        }
        catch (TaskNotFoundException ex)
        {
            return NotFound(new { error = ex.Message });
        }
    }
}
```

### ❌ EVITA - Controller senza error handling e status codes generici

```csharp
[ApiController]
[Route("api/[controller]")]
public class TaskController : ControllerBase
{
    private readonly ITaskService _service;

    [HttpGet("{id}")]
    public async Task<TaskDto> GetById(Guid id) // No ActionResult, no error handling
    {
        return await _service.GetByIdAsync(id); // Throws se non trovato
    }

    [HttpPost]
    public async Task<TaskDto> Create(CreateTaskDto dto) // Sempre 200 OK
    {
        return await _service.CreateTaskAsync(dto);
    }
}
```

## Repository

### ✅ BUONO - Repository con query ottimizzate

```csharp
public class TaskRepository : ITaskRepository
{
    private readonly TodoDbContext _context;

    public TaskRepository(TodoDbContext context)
    {
        _context = context;
    }

    public async Task<List<TodoTask>> GetAllAsync()
    {
        return await _context.Tasks
            .AsNoTracking() // Read-only query, più veloce
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    public async Task<TodoTask?> GetByIdAsync(Guid id)
    {
        return await _context.Tasks
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<TodoTask> AddAsync(TodoTask task)
    {
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task UpdateAsync(TodoTask task)
    {
        _context.Tasks.Update(task);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task != null)
        {
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsByTitleAsync(string title)
    {
        return await _context.Tasks
            .AsNoTracking()
            .AnyAsync(t => t.Title == title);
    }
}
```

### ❌ EVITA - Repository con query non ottimizzate

```csharp
public class TaskRepository : ITaskRepository
{
    private readonly TodoDbContext _context;

    public List<TodoTask> GetAll()
    {
        // Carica tutto in memoria, poi ordina
        var tasks = _context.Tasks.ToList();
        return tasks.OrderByDescending(t => t.CreatedAt).ToList();
    }

    public bool ExistsByTitle(string title)
    {
        // Carica TUTTI i task per controllare uno solo
        var allTasks = _context.Tasks.ToList();
        return allTasks.Any(t => t.Title == title);
    }
}
```

## DTOs e Mapping

### ✅ BUONO - DTOs separati e mapping esplicito

```csharp
// Request DTO per creazione
public class CreateTaskDto
{
    public string Title { get; set; } = string.Empty;
}

// Request DTO per update
public class UpdateTaskDto
{
    public string Title { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
}

// Response DTO
public record TaskDto(
    Guid Id,
    string Title,
    bool IsCompleted,
    DateTime CreatedAt,
    DateTime UpdatedAt
);

// Mapping esplicito nel service
private TaskDto MapToDto(TodoTask task)
{
    return new TaskDto(
        task.Id,
        task.Title,
        task.IsCompleted,
        task.CreatedAt,
        task.UpdatedAt
    );
}

private TodoTask MapToEntity(CreateTaskDto dto)
{
    return new TodoTask
    {
        Id = Guid.NewGuid(),
        Title = dto.Title,
        IsCompleted = false,
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow
    };
}
```

### ❌ EVITA - Esporre entità direttamente

```csharp
// NON esporre entità di dominio direttamente via API
[HttpGet]
public async Task<List<TodoTask>> GetAll() // Espone entità interna
{
    return await _repository.GetAllAsync();
}

// Problemi:
// 1. Coupling tra API e database schema
// 2. Modifiche al database rompono i client
// 3. Possibile esposizione di dati sensibili
```

## Validazioni

### ✅ BUONO - FluentValidation con regole chiare

```csharp
public class CreateTaskDtoValidator : AbstractValidator<CreateTaskDto>
{
    public CreateTaskDtoValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Il titolo è obbligatorio")
            .MaximumLength(100).WithMessage("Il titolo non può superare 100 caratteri")
            .Must(BeValidTitle).WithMessage("Il titolo contiene caratteri non validi");
    }

    private bool BeValidTitle(string title)
    {
        // Previene XSS rimuovendo caratteri pericolosi
        return !title.Contains('<') && !title.Contains('>');
    }
}

public class UpdateTaskDtoValidator : AbstractValidator<UpdateTaskDto>
{
    public UpdateTaskDtoValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Il titolo è obbligatorio")
            .MaximumLength(100).WithMessage("Il titolo non può superare 100 caratteri")
            .Must(BeValidTitle).WithMessage("Il titolo contiene caratteri non validi");
    }

    private bool BeValidTitle(string title)
    {
        return !title.Contains('<') && !title.Contains('>');
    }
}
```

### ❌ EVITA - Validazioni manuali sparse nel codice

```csharp
public async Task<TaskDto> CreateTaskAsync(CreateTaskDto dto)
{
    // Validazioni manuali sparse
    if (string.IsNullOrEmpty(dto.Title))
        throw new Exception("Titolo vuoto");

    if (dto.Title.Length > 100)
        throw new Exception("Titolo troppo lungo");

    // Difficile manutenzione, non riusabili
}
```

## Logging

### ✅ BUONO - Logging strutturato con contesto

```csharp
public class TaskService : ITaskService
{
    private readonly ITaskRepository _repository;
    private readonly ILogger<TaskService> _logger;

    public async Task<TaskDto> CreateTaskAsync(CreateTaskDto dto)
    {
        _logger.LogInformation(
            "Inizio creazione task con titolo {Title}",
            dto.Title
        );

        try
        {
            if (await _repository.ExistsByTitleAsync(dto.Title))
            {
                _logger.LogWarning(
                    "Tentativo di creare task duplicato: {Title}",
                    dto.Title
                );
                throw new DuplicateTaskException("Un task con questo titolo esiste già");
            }

            var task = MapToEntity(dto);
            var createdTask = await _repository.AddAsync(task);

            _logger.LogInformation(
                "Task creato con successo. ID: {TaskId}, Titolo: {Title}",
                createdTask.Id,
                createdTask.Title
            );

            return MapToDto(createdTask);
        }
        catch (Exception ex) when (ex is not DuplicateTaskException)
        {
            _logger.LogError(
                ex,
                "Errore durante la creazione del task {Title}",
                dto.Title
            );
            throw;
        }
    }
}
```

### ❌ EVITA - Logging con string concatenation

```csharp
// NON usare string concatenation
_logger.LogInformation("Task creato: " + task.Id + " - " + task.Title);

// Problemi:
// 1. No structured logging
// 2. Performance peggiore
// 3. Difficile parsing dei log
```

## Async/Await

### ✅ BUONO - Async corretto

```csharp
public async Task<List<TaskDto>> GetAllTasksAsync()
{
    var tasks = await _repository.GetAllAsync();
    return tasks.Select(MapToDto).ToList();
}

public async Task<TaskDto> GetByIdAsync(Guid id)
{
    var task = await _repository.GetByIdAsync(id);

    if (task == null)
    {
        throw new TaskNotFoundException(id.ToString());
    }

    return MapToDto(task);
}
```

### ❌ EVITA - Blocking su async

```csharp
// NON usare .Result o .Wait()
public TaskDto GetById(Guid id)
{
    var task = _repository.GetByIdAsync(id).Result; // DEADLOCK RISK!
    return MapToDto(task);
}

// NON usare async void (eccetto event handlers)
public async void CreateTask(CreateTaskDto dto) // PERICOLOSO
{
    await _repository.AddAsync(MapToEntity(dto));
}
```

## Dependency Injection

### ✅ BUONO - DI corretto con interfacce

```csharp
// Registrazione in Program.cs
builder.Services.AddDbContext<TodoDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<ITaskService, TaskService>();

// Iniezione tramite costruttore
public class TaskService : ITaskService
{
    private readonly ITaskRepository _repository;
    private readonly ILogger<TaskService> _logger;

    public TaskService(
        ITaskRepository repository,
        ILogger<TaskService> logger)
    {
        _repository = repository ?? throw new ArgumentNullException(nameof(repository));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }
}
```

### ❌ EVITA - Istanziazione diretta

```csharp
// NON creare istanze direttamente
public class TaskService
{
    private readonly TaskRepository _repository;

    public TaskService()
    {
        var options = new DbContextOptions<TodoDbContext>();
        var context = new TodoDbContext(options);
        _repository = new TaskRepository(context); // ANTI-PATTERN
    }
}
```

## Riferimenti

- [C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)
- [ASP.NET Core Best Practices](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/best-practices)
- [Dependency Injection in .NET](https://docs.microsoft.com/en-us/dotnet/core/extensions/dependency-injection)
