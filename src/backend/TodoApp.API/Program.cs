using FluentValidation;
using Microsoft.EntityFrameworkCore;
using TodoApp.API.Middleware;
using TodoApp.Core.Interfaces;
using TodoApp.Core.Services;
using TodoApp.Infrastructure.Data;
using TodoApp.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Configurazione Database
builder.Services.AddDbContext<TodoDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Dependency Injection
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<ITaskService, TaskService>();

// FluentValidation
builder.Services.AddValidatorsFromAssemblyContaining<TodoApp.Core.Validators.CreateTaskDtoValidator>();

// Controllers
builder.Services.AddControllers();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "TodoApp API", Version = "v1" });
});

var app = builder.Build();

// Middleware - Global Exception Handler
app.UseMiddleware<GlobalExceptionHandler>();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();

// Partial class per testing
public partial class Program { }
