using System.Net;
using System.Text.Json;
using TodoApp.Core.Exceptions;
using FluentValidation;

namespace TodoApp.API.Middleware;

/// <summary>
/// Middleware per la gestione globale delle eccezioni
/// </summary>
public class GlobalExceptionHandler
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(RequestDelegate next, ILogger<GlobalExceptionHandler> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        _logger.LogError(exception, "Si è verificato un errore: {Message}", exception.Message);

        context.Response.ContentType = "application/json";

        var (statusCode, message) = exception switch
        {
            TaskNotFoundException => (HttpStatusCode.NotFound, exception.Message),
            DuplicateTaskException => (HttpStatusCode.Conflict, exception.Message),
            ValidationException validationEx => (
                HttpStatusCode.BadRequest,
                string.Join("; ", validationEx.Errors.Select(e => e.ErrorMessage))
            ),
            _ => (HttpStatusCode.InternalServerError, "Si è verificato un errore interno del server.")
        };

        context.Response.StatusCode = (int)statusCode;

        var response = new ErrorResponse
        {
            StatusCode = (int)statusCode,
            Message = message
        };

        var json = JsonSerializer.Serialize(response);
        await context.Response.WriteAsync(json);
    }
}

/// <summary>
/// Modello per la risposta di errore
/// </summary>
public class ErrorResponse
{
    public int StatusCode { get; set; }
    public string Message { get; set; } = string.Empty;
}
