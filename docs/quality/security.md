# Security

## Backend Security

### Input Validation

```csharp
public class CreateTaskDtoValidator : AbstractValidator<CreateTaskDto>
{
    public CreateTaskDtoValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(100)
            .Must(BeValidTitle).WithMessage("Il titolo contiene caratteri non validi");
    }

    private bool BeValidTitle(string title)
    {
        return !title.Contains('<') && !title.Contains('>'); // Previene XSS
    }
}
```

### CORS Configuration

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
```

## Frontend Security

### XSS Prevention

```typescript
// ✅ React escapa automaticamente
<span>{task.title}</span>

// ❌ EVITA dangerouslySetInnerHTML senza sanitizzazione
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

## Checklist

- [ ] Input validation lato client E server
- [ ] Escape HTML output
- [ ] Parametrized queries (EF Core automatico)
- [ ] HTTPS in produzione
- [ ] CORS configurato
- [ ] Dipendenze aggiornate

## Riferimenti

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [ASP.NET Core Security](https://docs.microsoft.com/en-us/aspnet/core/security/)
