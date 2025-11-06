# Troubleshooting

Soluzioni ai problemi comuni durante lo sviluppo.

## Problemi Backend

### Entity Framework Migration Issues

```bash
# Migration non applicata
cd backend/TodoApp.API
dotnet ef database update

# Migration conflict
dotnet ef migrations remove
dotnet ef migrations add NomeMigration
dotnet ef database update

# Database locked (SQLite)
# Chiudi tutte le connessioni, riavvia l'app
```

### Port Already in Use

```bash
# Trova e termina processo (Mac/Linux)
lsof -ti:5001 | xargs kill -9

# Windows
netstat -ano | findstr :5001
taskkill /PID <PID> /F

# Oppure cambia porta in launchSettings.json
```

### CORS Errors

```csharp
// Verifica che CORS sia PRIMA di UseAuthorization
app.UseCors("AllowFrontend");
app.UseAuthorization();

// Verifica origin corretta
policy.WithOrigins("http://localhost:5173") // Porta Vite
```

## Problemi Frontend

### API Connection Failed

```bash
# Verifica:
# 1. Backend è in esecuzione
# 2. URL corretta in .env
VITE_API_URL=https://localhost:5001/api

# 3. Certificato HTTPS accettato
# Vai a https://localhost:5001/swagger e accetta certificato
```

### React Hook Dependencies Warning

```typescript
// Soluzione 1: Aggiungi dipendenza
useEffect(() => {
  fetchTasks();
}, [fetchTasks]);

// Soluzione 2: useCallback
const fetchTasks = useCallback(async () => {
  // ...
}, []);

// Soluzione 3: Se intenzionale
useEffect(() => {
  fetchTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

### Hot Reload Not Working

```bash
# Riavvia dev server
npm run dev

# Pulisci cache
rm -rf node_modules/.vite

# vite.config.ts - per Docker/WSL
export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
  },
});
```

## Database Issues

### SQLite Database Locked

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=todoapp.db;Cache=Shared;Timeout=30"
  }
}
```

### Reset Database

```bash
rm todoapp.db
dotnet ef database update
```

## Performance Issues

### Slow API Response

```csharp
// Debug con logging
_logger.LogInformation("GetAllTasks started");
var stopwatch = Stopwatch.StartNew();

var tasks = await _repository.GetAllAsync();

stopwatch.Stop();
_logger.LogInformation($"Completato in {stopwatch.ElapsedMilliseconds}ms");
```

### Slow Frontend Rendering

```typescript
// Usa React DevTools Profiler
// Memoizza componenti
const TaskList = React.memo(({ tasks }) => {
  // ...
});
```

## Comandi Utili

```bash
# Backend - Clean e rebuild
dotnet clean
dotnet build

# Frontend - Clean install
rm -rf node_modules package-lock.json
npm install

# Git - Reset a upstream
git fetch upstream
git reset --hard upstream/main

# Docker - Reset completo
docker-compose down -v
docker-compose up --build
```

## Log e Debug

### Backend Logging

```json
// appsettings.Development.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.EntityFrameworkCore": "Information"
    }
  }
}
```

### Frontend Debug

```typescript
// React DevTools
// Redux DevTools (se usi Redux)
// Console logging con context
console.log('Component rendered:', { tasks, filter });
```

## Riferimenti

- [EF Core Troubleshooting](https://docs.microsoft.com/en-us/ef/core/miscellaneous/logging)
- [Vite Troubleshooting](https://vitejs.dev/guide/troubleshooting)
- [React DevTools](https://react.dev/learn/react-developer-tools)
