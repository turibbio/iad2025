# Database e Persistenza

Documentazione per Entity Framework Core con PostgreSQL, configurazione entità, validazioni e regole di persistenza.

**Database**: PostgreSQL
**Provider EF Core**: Npgsql.EntityFrameworkCore.PostgreSQL (open source, gratuito)

## Entity Framework Core con PostgreSQL

### Entità TodoTask

```csharp
public class TodoTask
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
```

### Configurazione Entità

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class TodoTaskConfiguration : IEntityTypeConfiguration<TodoTask>
{
    public void Configure(EntityTypeBuilder<TodoTask> builder)
    {
        // Primary Key
        builder.HasKey(t => t.Id);

        // Title: obbligatorio, max 100 caratteri, univoco
        builder.Property(t => t.Title)
            .IsRequired()
            .HasMaxLength(100);

        builder.HasIndex(t => t.Title)
            .IsUnique();

        // IsCompleted: default false
        builder.Property(t => t.IsCompleted)
            .IsRequired()
            .HasDefaultValue(false);

        // CreatedAt: obbligatorio
        builder.Property(t => t.CreatedAt)
            .IsRequired();

        // UpdatedAt: obbligatorio
        builder.Property(t => t.UpdatedAt)
            .IsRequired();

        // Table name
        builder.ToTable("Tasks");
    }
}
```

### DbContext

```csharp
using Microsoft.EntityFrameworkCore;

public class TodoDbContext : DbContext
{
    public TodoDbContext(DbContextOptions<TodoDbContext> options)
        : base(options)
    {
    }

    public DbSet<TodoTask> Tasks { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Applica tutte le configurazioni nell'assembly
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(TodoDbContext).Assembly);
    }
}
```

### Configurazione in Program.cs

```csharp
// PostgreSQL con Npgsql (open source, gratuito)
builder.Services.AddDbContext<TodoDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        b => b.MigrationsAssembly("TodoApp.Infrastructure")
    ));
```

### Package NuGet Richiesti

```xml
<!-- TodoApp.Infrastructure.csproj -->
<ItemGroup>
  <PackageReference Include="Npgsql.EntityFrameworkCore.PostgreSQL" Version="8.0.*" />
  <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="8.0.*" />
</ItemGroup>
```

### Connection String

**appsettings.Development.json** (PostgreSQL locale):
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=todoapp;Username=postgres;Password=your_password"
  }
}
```

**appsettings.Production.json** (PostgreSQL produzione):
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=your-postgres-server;Database=todoapp;Username=your_user;Password=your_password;SSL Mode=Require"
  }
}
```

**Docker Compose** (per sviluppo locale):
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: todoapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Validazioni

### Regole di Validazione

- **Titolo**:
  - Obbligatorio
  - Lunghezza: 1-100 caratteri
  - Univoco (nessun duplicato)
  - No caratteri HTML (`<`, `>`) per prevenire XSS

- **IsCompleted**: Boolean, default `false`

- **CreatedAt**: Impostato automaticamente a `DateTime.UtcNow` alla creazione

- **UpdatedAt**: Aggiornato automaticamente a `DateTime.UtcNow` ad ogni modifica

### FluentValidation

```csharp
using FluentValidation;

public class CreateTaskDtoValidator : AbstractValidator<CreateTaskDto>
{
    public CreateTaskDtoValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .WithMessage("Il titolo è obbligatorio")
            .MaximumLength(100)
            .WithMessage("Il titolo non può superare 100 caratteri")
            .Must(BeValidTitle)
            .WithMessage("Il titolo contiene caratteri non validi");
    }

    private bool BeValidTitle(string title)
    {
        // Previene XSS rimuovendo caratteri pericolosi
        return !title.Contains('<') && !title.Contains('>');
    }
}
```

### Registrazione Validators

```csharp
// In Program.cs
using FluentValidation;
using FluentValidation.AspNetCore;

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<CreateTaskDtoValidator>();
```

## Migrations

### Creare una Migration

```bash
cd backend/TodoApp.API

# Crea migration
dotnet ef migrations add InitialCreate --project ../TodoApp.Infrastructure

# Applica migration
dotnet ef database update
```

### Migration InitialCreate (PostgreSQL)

```csharp
public partial class InitialCreate : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Tasks",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uuid", nullable: false),
                Title = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                IsCompleted = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Tasks", x => x.Id);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Tasks_Title",
            table: "Tasks",
            column: "Title",
            unique: true);

        // Indice per performance su query filtrate
        migrationBuilder.CreateIndex(
            name: "IX_Tasks_IsCompleted_CreatedAt",
            table: "Tasks",
            columns: new[] { "IsCompleted", "CreatedAt" });
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(name: "Tasks");
    }
}
```

**Note PostgreSQL**:
- Tipi nativi: `uuid`, `character varying`, `boolean`, `timestamp with time zone`
- Supporto completo per indici B-tree, GIN, GIST
- Performance eccellenti per query complesse

## Data Seeding

### Seed iniziale per sviluppo

```csharp
public static class DbInitializer
{
    public static void Initialize(TodoDbContext context)
    {
        context.Database.EnsureCreated();

        // Controlla se ci sono già dati
        if (context.Tasks.Any())
        {
            return; // DB già popolato
        }

        var tasks = new[]
        {
            new TodoTask
            {
                Id = Guid.NewGuid(),
                Title = "Implementare API CRUD",
                IsCompleted = true,
                CreatedAt = DateTime.UtcNow.AddDays(-2),
                UpdatedAt = DateTime.UtcNow.AddDays(-1)
            },
            new TodoTask
            {
                Id = Guid.NewGuid(),
                Title = "Scrivere unit test",
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow.AddDays(-1),
                UpdatedAt = DateTime.UtcNow.AddDays(-1)
            },
            new TodoTask
            {
                Id = Guid.NewGuid(),
                Title = "Configurare CI/CD",
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        };

        context.Tasks.AddRange(tasks);
        context.SaveChanges();
    }
}

// In Program.cs, dopo app.Build()
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<TodoDbContext>();
    DbInitializer.Initialize(context);
}
```

## Query Patterns

### Ordinamento Task

I task sono ordinati per `CreatedAt DESC` (più recenti prima):

```csharp
public async Task<List<TodoTask>> GetAllAsync()
{
    return await _context.Tasks
        .AsNoTracking()
        .OrderByDescending(t => t.CreatedAt)
        .ToListAsync();
}
```

### Filtri

```csharp
// Tutti i task attivi
public async Task<List<TodoTask>> GetActiveTasksAsync()
{
    return await _context.Tasks
        .AsNoTracking()
        .Where(t => !t.IsCompleted)
        .OrderByDescending(t => t.CreatedAt)
        .ToListAsync();
}

// Tutti i task completati
public async Task<List<TodoTask>> GetCompletedTasksAsync()
{
    return await _context.Tasks
        .AsNoTracking()
        .Where(t => t.IsCompleted)
        .OrderByDescending(t => t.CreatedAt)
        .ToListAsync();
}
```

### Controllo Esistenza

```csharp
public async Task<bool> ExistsByTitleAsync(string title)
{
    return await _context.Tasks
        .AsNoTracking()
        .AnyAsync(t => t.Title == title);
}

public async Task<bool> ExistsByIdAsync(Guid id)
{
    return await _context.Tasks
        .AsNoTracking()
        .AnyAsync(t => t.Id == id);
}
```

## Best Practices

### 1. Usa AsNoTracking() per query read-only

```csharp
// ✅ BUONO - Read-only query
var tasks = await _context.Tasks
    .AsNoTracking()
    .ToListAsync();

// ❌ EVITA - Tracking inutile per query di sola lettura
var tasks = await _context.Tasks.ToListAsync();
```

### 2. Proiezioni per performance

```csharp
// ✅ BUONO - Seleziona solo i campi necessari
var taskDtos = await _context.Tasks
    .AsNoTracking()
    .Select(t => new TaskDto
    {
        Id = t.Id,
        Title = t.Title,
        IsCompleted = t.IsCompleted,
        CreatedAt = t.CreatedAt
    })
    .ToListAsync();

// ❌ EVITA - Carica entità intere poi mappa
var tasks = await _context.Tasks.ToListAsync();
var dtos = tasks.Select(MapToDto).ToList();
```

### 3. Evita N+1 queries

```csharp
// ✅ BUONO - Query singola
var tasksWithRelated = await _context.Tasks
    .Include(t => t.RelatedEntity)
    .ToListAsync();

// ❌ EVITA - N+1 query
var tasks = await _context.Tasks.ToListAsync();
foreach (var task in tasks)
{
    var related = await _context.RelatedEntities
        .Where(r => r.TaskId == task.Id)
        .ToListAsync(); // Query per ogni task!
}
```

### 4. Usa transazioni per operazioni multiple

```csharp
using (var transaction = await _context.Database.BeginTransactionAsync())
{
    try
    {
        await _context.Tasks.AddAsync(task1);
        await _context.SaveChangesAsync();

        await _context.Tasks.AddAsync(task2);
        await _context.SaveChangesAsync();

        await transaction.CommitAsync();
    }
    catch
    {
        await transaction.RollbackAsync();
        throw;
    }
}
```

## Troubleshooting PostgreSQL

### Connection Timeout

```json
// appsettings.json - Aumenta timeout per operazioni lunghe
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=todoapp;Username=postgres;Password=dev;Timeout=30;Command Timeout=30"
  }
}
```

### Migration Conflicts

```bash
# Rimuovi ultima migration
dotnet ef migrations remove --project TodoApp.Infrastructure

# Ricrea migration
dotnet ef migrations add NomeMigration --project TodoApp.Infrastructure

# Applica
dotnet ef database update
```

### Reset Database PostgreSQL

```bash
# Usando psql
psql -U postgres -c "DROP DATABASE IF EXISTS todoapp;"
psql -U postgres -c "CREATE DATABASE todoapp;"

# Oppure con Docker
docker-compose down -v
docker-compose up -d postgres

# Poi applica migrations
dotnet ef database update
```

### Connection Failed

```bash
# Verifica che PostgreSQL sia in esecuzione
# Docker
docker ps | grep postgres

# Linux/Mac service
sudo systemctl status postgresql

# Testa connessione
psql -h localhost -U postgres -d todoapp
```

## Riferimenti

- [Entity Framework Core Documentation](https://docs.microsoft.com/en-us/ef/core/)
- [Npgsql Entity Framework Core Provider](https://www.npgsql.org/efcore/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Migrations](https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/)
- [FluentValidation](https://docs.fluentvalidation.net/)
- [Query Performance](https://docs.microsoft.com/en-us/ef/core/performance/)
