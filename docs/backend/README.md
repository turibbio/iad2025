# Documentazione Backend (.NET)

Questa sezione contiene la documentazione completa per lo sviluppo backend con .NET 8 e ASP.NET Core.

## Stack Tecnologico

- **Framework**: .NET 8+ (ASP.NET Core)
- **API**: REST API con controller
- **Database**: PostgreSQL
- **ORM**: Entity Framework Core con Npgsql
- **Validazione**: FluentValidation
- **Documentazione API**: Swagger/OpenAPI
- **Testing**: xUnit, Moq, FluentAssertions

**IMPORTANTE**: Solo librerie **open source gratuite**. Nessuna dipendenza commerciale.

## Indice Documentazione

### 📋 [Convenzioni di Codice](conventions.md)
Naming conventions, struttura del progetto, principi architetturali (Clean Architecture, Dependency Injection, Repository Pattern).

### 💡 [Esempi di Codice](code-examples.md)
Esempi di buone pratiche e pattern da evitare in C#, con confronti tra codice corretto e scorretto.

### 🗄️ [Database e Persistenza](database.md)
Entity Framework Core, definizione entità Task, configurazione, validazioni e regole di persistenza.

### ⚠️ [Gestione Errori](error-handling.md)
Custom exceptions, global exception handler, gestione centralizzata degli errori HTTP.

### ⚡ [Ottimizzazione Performance](performance.md)
Query optimization, caching con IMemoryCache, async/await best practices, metriche target.

## Collegamenti Rapidi

- [Frontend Documentation](../frontend/README.md)
- [Quality & Testing](../quality/README.md)
- [Workflow & Contribution](../workflow/README.md)

## Risorse Utili

- [ASP.NET Core Documentation](https://docs.microsoft.com/en-us/aspnet/core/)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
- [FluentValidation](https://docs.fluentvalidation.net/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
