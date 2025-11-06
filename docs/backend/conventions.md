# Convenzioni di Codice Backend (.NET)

## Naming Conventions

### Classi e Interfacce
- **PascalCase** per classi e interfacce
- Prefisso `I` per le interfacce
- Esempi: `TaskService`, `ITaskRepository`, `TodoTask`

### Metodi
- **PascalCase** per metodi pubblici e privati
- Nomi descrittivi che indicano l'azione
- Esempi: `GetTaskById`, `CreateTask`, `ExistsByTitleAsync`

### Proprietà
- **PascalCase** per proprietà pubbliche
- Esempi: `TaskTitle`, `IsCompleted`, `CreatedAt`

### Parametri e Variabili Locali
- **camelCase** per parametri e variabili locali
- Nomi descrittivi, evitare abbreviazioni
- Esempi: `taskId`, `userInput`, `createdTask`

### Costanti
- **PascalCase** per costanti
- Esempi: `MaxTitleLength`, `DefaultPageSize`

### File
- **PascalCase** per nomi dei file
- Nome del file deve corrispondere al nome della classe principale
- Esempi: `TaskController.cs`, `TaskService.cs`, `ITaskRepository.cs`

## Struttura Progetto

```
backend/
├── TodoApp.API/                # Progetto API (entry point)
│   ├── Controllers/            # Controller REST
│   │   └── TaskController.cs
│   ├── Program.cs              # Configurazione applicazione
│   ├── appsettings.json        # Configurazioni
│   └── appsettings.Development.json
│
├── TodoApp.Core/               # Business Logic (Domain Layer)
│   ├── Entities/               # Domain Models
│   │   └── TodoTask.cs
│   ├── Interfaces/             # Contratti (Abstractions)
│   │   ├── ITaskRepository.cs
│   │   └── ITaskService.cs
│   ├── Services/               # Servizi applicativi
│   │   └── TaskService.cs
│   ├── DTOs/                   # Data Transfer Objects
│   │   ├── TaskDto.cs
│   │   ├── CreateTaskDto.cs
│   │   └── UpdateTaskDto.cs
│   └── Exceptions/             # Custom Exceptions
│       ├── DuplicateTaskException.cs
│       └── TaskNotFoundException.cs
│
├── TodoApp.Infrastructure/     # Persistenza e Infrastruttura
│   ├── Data/                   # DbContext
│   │   └── TodoDbContext.cs
│   ├── Repositories/           # Implementazioni Repository
│   │   └── TaskRepository.cs
│   ├── Configurations/         # Entity Configurations
│   │   └── TodoTaskConfiguration.cs
│   └── Migrations/             # EF Core Migrations
│
└── TodoApp.Tests/              # Unit & Integration Tests
    ├── Unit/
    │   └── TaskServiceTests.cs
    └── Integration/
        └── TaskControllerIntegrationTests.cs
```

## Principi Architetturali

### Clean Architecture (Onion Architecture)

Il progetto segue i principi della Clean Architecture con separazione in layer:

1. **Domain Layer** (`TodoApp.Core/Entities`): Entità di dominio, regole di business
2. **Application Layer** (`TodoApp.Core/Services`): Logica applicativa, use cases
3. **Infrastructure Layer** (`TodoApp.Infrastructure`): Persistenza, database, I/O
4. **Presentation Layer** (`TodoApp.API`): Controller, API endpoints

**Dipendenze**: Le dipendenze puntano verso l'interno (verso il dominio), mai verso l'esterno.

```
Presentation (API Controllers)
        ↓
Application (Services)
        ↓
Domain (Entities, Interfaces)
        ↑
Infrastructure (Repositories, DbContext)
```

### Dependency Injection

- Tutte le dipendenze sono iniettate tramite costruttore
- Registrazione servizi in `Program.cs`
- Uso di interfacce per le astrazioni

```csharp
// Registrazione in Program.cs
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<ITaskService, TaskService>();

// Iniezione nel controller
public class TaskController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TaskController(ITaskService taskService)
    {
        _taskService = taskService;
    }
}
```

### Repository Pattern

- Astrazione dell'accesso ai dati
- Un repository per ogni entità aggregata
- Interfaccia definita nel layer Core, implementazione nell'Infrastructure

```csharp
// Interface in TodoApp.Core/Interfaces
public interface ITaskRepository
{
    Task<List<TodoTask>> GetAllAsync();
    Task<TodoTask?> GetByIdAsync(Guid id);
    Task<TodoTask> AddAsync(TodoTask task);
    Task UpdateAsync(TodoTask task);
    Task DeleteAsync(Guid id);
    Task<bool> ExistsByTitleAsync(string title);
}

// Implementation in TodoApp.Infrastructure/Repositories
public class TaskRepository : ITaskRepository
{
    private readonly TodoDbContext _context;

    public TaskRepository(TodoDbContext context)
    {
        _context = context;
    }

    // ... implementazioni metodi
}
```

### DTOs (Data Transfer Objects)

- Separazione tra entità di dominio e oggetti trasferiti via API
- DTOs specifici per Create, Update e Response
- Validazioni sui DTOs, non sulle entità

```csharp
// Request DTO
public class CreateTaskDto
{
    public string Title { get; set; } = string.Empty;
}

// Response DTO
public class TaskDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
```

### Separazione di Concerns

Il flusso di una richiesta HTTP segue questo pattern:

```
Controller → Service → Repository → Database
    ↓          ↓          ↓
  HTTP     Business    Data
 Logic     Logic      Access
```

- **Controller**: Riceve richieste HTTP, valida input, ritorna risposte
- **Service**: Contiene logica di business, orchestrazione
- **Repository**: Accesso ai dati, query database

## Linee Guida Generali

### Commenti
- Commenti in **italiano** per logica di business
- XML documentation in **inglese** per metodi pubblici
- Evita commenti ovvi, documenta il "perché" non il "cosa"

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

    // ... resto del codice
}
```

### Async/Await
- Usa sempre `async`/`await` per operazioni I/O
- Suffisso `Async` per metodi asincroni
- Non usare `.Result` o `.Wait()` (rischio deadlock)

```csharp
// ✅ BUONO
public async Task<List<TaskDto>> GetAllTasksAsync()
{
    return await _repository.GetAllAsync();
}

// ❌ EVITA
public List<TaskDto> GetAllTasks()
{
    return _repository.GetAllAsync().Result; // DEADLOCK RISK!
}
```

### Immutabilità e Record Types
- Usa `record` per DTOs quando appropriato
- Proprietà immutabili quando possibile

```csharp
// DTO come record
public record TaskDto(
    Guid Id,
    string Title,
    bool IsCompleted,
    DateTime CreatedAt,
    DateTime UpdatedAt
);
```

### Null Safety
- Abilita nullable reference types (`<Nullable>enable</Nullable>`)
- Usa `?` per tipi nullable
- Inizializza stringhe con `string.Empty` invece di null

```csharp
public class TodoTask
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty; // Non nullable
    public string? Description { get; set; }          // Nullable
}
```

## Convenzioni Specifiche

### Controller
- Eredita da `ControllerBase`
- Usa attributi `[ApiController]` e `[Route]`
- Metodi async con suffisso `Async`
- Ritorna `ActionResult<T>` o `IActionResult`

```csharp
[ApiController]
[Route("api/[controller]")]
public class TaskController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<TaskDto>>> GetAllAsync()
    {
        // ...
    }

    [HttpPost]
    public async Task<ActionResult<TaskDto>> CreateAsync([FromBody] CreateTaskDto dto)
    {
        // ...
        return CreatedAtAction(nameof(GetByIdAsync), new { id = task.Id }, task);
    }
}
```

### Services
- Un'interfaccia per ogni service
- Iniezione delle dipendenze via costruttore
- Logica di business centralizzata

```csharp
public class TaskService : ITaskService
{
    private readonly ITaskRepository _repository;
    private readonly ILogger<TaskService> _logger;

    public TaskService(ITaskRepository repository, ILogger<TaskService> logger)
    {
        _repository = repository;
        _logger = logger;
    }

    // ... metodi del servizio
}
```

### Validazioni
- Usa FluentValidation per validazioni complesse
- Validatori in file separati
- Registrazione automatica dei validatori

```csharp
public class CreateTaskDtoValidator : AbstractValidator<CreateTaskDto>
{
    public CreateTaskDtoValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Il titolo è obbligatorio")
            .MaximumLength(100).WithMessage("Il titolo non può superare 100 caratteri");
    }
}

// Registrazione in Program.cs
builder.Services.AddValidatorsFromAssemblyContaining<CreateTaskDtoValidator>();
```

## Riferimenti

- [C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)
- [ASP.NET Core Best Practices](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/best-practices)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Repository Pattern](https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design)
