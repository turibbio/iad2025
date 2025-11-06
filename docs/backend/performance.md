# Ottimizzazione Performance Backend

Best practices per ottimizzare le performance dell'API .NET.

## Ottimizzazioni Database

### 1. AsNoTracking() per Query Read-Only

```csharp
// ✅ BUONO - Query read-only ottimizzata
public async Task<List<TaskDto>> GetAllTasksAsync()
{
    return await _context.Tasks
        .AsNoTracking() // Disabilita change tracking
        .OrderByDescending(t => t.CreatedAt)
        .Select(t => new TaskDto // Projection
        {
            Id = t.Id,
            Title = t.Title,
            IsCompleted = t.IsCompleted,
            CreatedAt = t.CreatedAt,
            UpdatedAt = t.UpdatedAt
        })
        .ToListAsync();
}

// ❌ EVITA - Tracking inutile e caricamento entità complete
public async Task<List<TaskDto>> GetAllTasksAsync()
{
    var tasks = await _context.Tasks.ToListAsync(); // Carica tutto
    return tasks.Select(t => MapToDto(t)).ToList(); // Mappa in memoria
}
```

**Benefici**:
- **30-40% più veloce** per query di sola lettura
- Minor utilizzo memoria
- Nessun overhead di change tracking

### 2. Projection - Seleziona Solo i Campi Necessari

```csharp
// ✅ BUONO - Projection con Select
var taskTitles = await _context.Tasks
    .AsNoTracking()
    .Select(t => new { t.Id, t.Title }) // Solo ID e Title
    .ToListAsync();

// ❌ EVITA - Carica entità complete
var tasks = await _context.Tasks.ToListAsync(); // Tutti i campi
var titles = tasks.Select(t => new { t.Id, t.Title }).ToList();
```

### 3. Evita N+1 Queries

```csharp
// ✅ BUONO - Eager loading con Include
var tasksWithCategory = await _context.Tasks
    .Include(t => t.Category)
    .ToListAsync();

// ❌ EVITA - N+1 query problem
var tasks = await _context.Tasks.ToListAsync();
foreach (var task in tasks)
{
    var category = await _context.Categories
        .FirstOrDefaultAsync(c => c.Id == task.CategoryId); // Query per ogni task!
}
```

### 4. Paginazione

```csharp
public async Task<PagedResult<TaskDto>> GetTasksPagedAsync(int pageNumber, int pageSize)
{
    var totalCount = await _context.Tasks.CountAsync();

    var tasks = await _context.Tasks
        .AsNoTracking()
        .OrderByDescending(t => t.CreatedAt)
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .Select(t => new TaskDto
        {
            Id = t.Id,
            Title = t.Title,
            IsCompleted = t.IsCompleted,
            CreatedAt = t.CreatedAt
        })
        .ToListAsync();

    return new PagedResult<TaskDto>
    {
        Items = tasks,
        TotalCount = totalCount,
        PageNumber = pageNumber,
        PageSize = pageSize
    };
}
```

### 5. Indici Database

```csharp
// Aggiungi indici per query frequenti
builder.HasIndex(t => t.Title).IsUnique();
builder.HasIndex(t => t.IsCompleted);
builder.HasIndex(t => t.CreatedAt);

// Indice composito per filtri combinati
builder.HasIndex(t => new { t.IsCompleted, t.CreatedAt });
```

## Caching

### IMemoryCache per Dati Frequenti

```csharp
using Microsoft.Extensions.Caching.Memory;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _repository;
    private readonly IMemoryCache _cache;
    private readonly ILogger<TaskService> _logger;
    private const string AllTasksCacheKey = "all_tasks";
    private static readonly TimeSpan CacheDuration = TimeSpan.FromMinutes(5);

    public TaskService(
        ITaskRepository repository,
        IMemoryCache cache,
        ILogger<TaskService> logger)
    {
        _repository = repository;
        _cache = cache;
        _logger = logger;
    }

    public async Task<List<TaskDto>> GetAllTasksAsync()
    {
        // Cerca in cache
        if (_cache.TryGetValue(AllTasksCacheKey, out List<TaskDto> cachedTasks))
        {
            _logger.LogInformation("Tasks recuperati dalla cache");
            return cachedTasks;
        }

        // Cache miss - recupera da database
        _logger.LogInformation("Cache miss - recupero tasks da database");
        var tasks = await _repository.GetAllAsync();
        var taskDtos = tasks.Select(MapToDto).ToList();

        // Salva in cache
        _cache.Set(AllTasksCacheKey, taskDtos, CacheDuration);

        return taskDtos;
    }

    public async Task<TaskDto> CreateTaskAsync(CreateTaskDto dto)
    {
        var task = MapToEntity(dto);
        var createdTask = await _repository.AddAsync(task);

        // Invalida cache quando i dati cambiano
        _cache.Remove(AllTasksCacheKey);

        return MapToDto(createdTask);
    }

    public async Task UpdateTaskAsync(Guid id, UpdateTaskDto dto)
    {
        // ... update logic

        // Invalida cache
        _cache.Remove(AllTasksCacheKey);
    }

    public async Task DeleteTaskAsync(Guid id)
    {
        await _repository.DeleteAsync(id);

        // Invalida cache
        _cache.Remove(AllTasksCacheKey);
    }
}
```

### Registrazione IMemoryCache

```csharp
// In Program.cs
builder.Services.AddMemoryCache();
```

### Cache con Opzioni Avanzate

```csharp
var cacheOptions = new MemoryCacheEntryOptions()
    .SetSlidingExpiration(TimeSpan.FromMinutes(5))  // Scade dopo 5 min inattività
    .SetAbsoluteExpiration(TimeSpan.FromMinutes(30)) // Scade max dopo 30 min
    .SetPriority(CacheItemPriority.Normal)
    .RegisterPostEvictionCallback((key, value, reason, state) =>
    {
        _logger.LogInformation(
            "Cache entry {Key} rimossa. Motivo: {Reason}",
            key,
            reason
        );
    });

_cache.Set(AllTasksCacheKey, tasks, cacheOptions);
```

## Async/Await Best Practices

### 1. Usa Async per Operazioni I/O

```csharp
// ✅ BUONO - Async per I/O
public async Task<List<TaskDto>> GetAllTasksAsync()
{
    var tasks = await _repository.GetAllAsync();
    return tasks.Select(MapToDto).ToList();
}

// ❌ EVITA - Blocking synchronous
public List<TaskDto> GetAllTasks()
{
    var tasks = _repository.GetAllAsync().Result; // DEADLOCK RISK
    return tasks.Select(MapToDto).ToList();
}
```

### 2. ConfigureAwait(false) in Librerie

```csharp
// Per librerie e codice riutilizzabile
public async Task<TodoTask> GetByIdAsync(Guid id)
{
    return await _context.Tasks
        .FindAsync(id)
        .ConfigureAwait(false); // Evita context capture
}

// Per applicazioni ASP.NET Core, non necessario (no SynchronizationContext)
```

### 3. Non Usare async void

```csharp
// ✅ BUONO - async Task
public async Task ProcessTasksAsync()
{
    await _repository.ProcessAsync();
}

// ❌ EVITA - async void (eccetto event handlers)
public async void ProcessTasks() // PERICOLOSO
{
    await _repository.ProcessAsync();
}
```

### 4. ValueTask per Hot Path

```csharp
// Per metodi chiamati frequentemente con risultati spesso già disponibili
public ValueTask<TaskDto?> GetCachedTaskAsync(Guid id)
{
    if (_cache.TryGetValue(id, out TaskDto cachedTask))
    {
        return new ValueTask<TaskDto?>(cachedTask); // No allocazione
    }

    return new ValueTask<TaskDto?>(_repository.GetByIdAsync(id));
}
```

## Response Compression

### Configurazione in Program.cs

```csharp
using Microsoft.AspNetCore.ResponseCompression;

builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<GzipCompressionProvider>();
    options.Providers.Add<BrotliCompressionProvider>();
});

builder.Services.Configure<BrotliCompressionProviderOptions>(options =>
{
    options.Level = System.IO.Compression.CompressionLevel.Fastest;
});

builder.Services.Configure<GzipCompressionProviderOptions>(options =>
{
    options.Level = System.IO.Compression.CompressionLevel.SmallestSize;
});

// Dopo app.Build()
app.UseResponseCompression();
```

## JSON Serialization

### System.Text.Json Ottimizzato

```csharp
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
        options.JsonSerializerOptions.WriteIndented = false; // Produzione
    });
```

## Monitoring e Profiling

### Application Insights (Opzionale)

```csharp
builder.Services.AddApplicationInsightsTelemetry();
```

### Custom Metrics

```csharp
public class TaskService : ITaskService
{
    private readonly ILogger<TaskService> _logger;

    public async Task<List<TaskDto>> GetAllTasksAsync()
    {
        var stopwatch = System.Diagnostics.Stopwatch.StartNew();

        var tasks = await _repository.GetAllAsync();

        stopwatch.Stop();
        _logger.LogInformation(
            "GetAllTasks completato in {ElapsedMs}ms. Tasks restituiti: {Count}",
            stopwatch.ElapsedMilliseconds,
            tasks.Count
        );

        return tasks.Select(MapToDto).ToList();
    }
}
```

### EF Core Query Logging

```csharp
// In appsettings.Development.json
{
  "Logging": {
    "LogLevel": {
      "Microsoft.EntityFrameworkCore.Database.Command": "Information"
    }
  }
}

// Per logging dettagliato query SQL
optionsBuilder.LogTo(
    Console.WriteLine,
    new[] { DbLoggerCategory.Database.Command.Name },
    LogLevel.Information
);
```

## Metriche Target

### API Response Time
- **Operazioni CRUD semplici**: < 100ms
- **Query con filtri**: < 200ms
- **Operazioni batch**: < 500ms

### Database Query Time
- **Query ottimizzate**: < 50ms
- **Query complesse con join**: < 150ms

### Memory Usage
- **Heap allocation per request**: < 10KB
- **Gen 0 collections**: Minime

### Throughput
- **Request/sec**: > 1000 per operazioni semplici

## Checklist Ottimizzazione

- [ ] Usa `AsNoTracking()` per query read-only
- [ ] Implementa projection con `Select()`
- [ ] Evita N+1 queries con `Include()`
- [ ] Aggiungi indici su colonne frequentemente cercate
- [ ] Implementa paginazione per liste grandi
- [ ] Usa `IMemoryCache` per dati frequenti
- [ ] Invalida cache quando i dati cambiano
- [ ] Usa async/await per tutte le operazioni I/O
- [ ] Abilita response compression
- [ ] Monitora performance con logging
- [ ] Usa connection pooling (default in EF Core)
- [ ] Limita dimensione response con DTOs specifici

## Riferimenti

- [EF Core Performance](https://docs.microsoft.com/en-us/ef/core/performance/)
- [ASP.NET Core Performance Best Practices](https://docs.microsoft.com/en-us/aspnet/core/performance/performance-best-practices)
- [Memory Management in .NET](https://docs.microsoft.com/en-us/dotnet/standard/garbage-collection/)
- [Response Caching](https://docs.microsoft.com/en-us/aspnet/core/performance/caching/response)
