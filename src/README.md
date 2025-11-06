# TODO App - Struttura Progetto

Questa cartella contiene il codice sorgente completo dell'applicazione TODO full-stack.

## Struttura

```
src/
├── backend/          # Backend .NET 8
│   ├── TodoApp.API/           # Web API (Controllers, Program.cs)
│   ├── TodoApp.Core/          # Business Logic (Entities, Services, DTOs)
│   ├── TodoApp.Infrastructure/# Data Access (DbContext, Repositories)
│   └── TodoApp.Tests/         # Unit & Integration Tests
│
└── frontend/         # Frontend React 18 + TypeScript
    └── src/
        ├── components/        # Componenti React
        ├── hooks/            # Custom hooks
        ├── services/         # API service layer
        ├── types/            # TypeScript types
        ├── context/          # React Context
        ├── utils/            # Utility functions
        ├── constants/        # Costanti
        └── styles/           # Stili globali
```

## Backend (.NET 8)

### Architettura: Clean Architecture

- **TodoApp.API**: Presentation Layer - Controllers, Middleware, configurazione
- **TodoApp.Core**: Application + Domain Layer - Entities, Services, DTOs, Validators
- **TodoApp.Infrastructure**: Data Access Layer - DbContext, Repositories, EF Migrations
- **TodoApp.Tests**: Testing - Unit tests + Integration tests

### Stack Tecnologico

- .NET 8.0
- ASP.NET Core Web API
- Entity Framework Core 8.0
- PostgreSQL (via Npgsql)
- FluentValidation
- Swagger/OpenAPI

### Setup Backend

1. **Avviare PostgreSQL**:
   ```bash
   docker-compose up -d
   ```

2. **Creare migration iniziale**:
   ```bash
   cd src/backend/TodoApp.Infrastructure
   dotnet ef migrations add InitialCreate --startup-project ../TodoApp.API
   ```

3. **Applicare migration**:
   ```bash
   dotnet ef database update --startup-project ../TodoApp.API
   ```

4. **Avviare API**:
   ```bash
   cd src/backend/TodoApp.API
   dotnet run
   ```

API disponibile su: `http://localhost:5000`
Swagger UI: `http://localhost:5000/swagger`

### Endpoint API

```
GET    /api/tasks              # Lista tasks (+ ?filter=all|active|completed)
GET    /api/tasks/{id}         # Singolo task
POST   /api/tasks              # Crea task
PUT    /api/tasks/{id}         # Modifica task
PUT    /api/tasks/{id}/toggle  # Toggle completamento
DELETE /api/tasks/{id}         # Elimina task
DELETE /api/tasks/completed    # Elimina completate
PUT    /api/tasks/toggle-all   # Toggle tutte
```

## Frontend (React 18 + TypeScript)

### Stack Tecnologico

- React 18
- TypeScript (strict mode)
- Vite (build tool)
- Axios (HTTP client)
- React Hook Form + Zod (form validation)
- Vitest + React Testing Library (testing)

### Setup Frontend

1. **Installare dipendenze**:
   ```bash
   cd src/frontend
   npm install
   ```

2. **Avviare dev server**:
   ```bash
   npm run dev
   ```

Frontend disponibile su: `http://localhost:5173`

### Scripts Disponibili

```bash
npm run dev        # Avvia dev server
npm run build      # Build produzione
npm run preview    # Preview build produzione
npm run test       # Esegui tests con Vitest
npm run lint       # Linting con ESLint
```

## Workflow di Sviluppo

1. **Avviare PostgreSQL**: `docker-compose up -d`
2. **Avviare Backend**: `cd src/backend/TodoApp.API && dotnet run`
3. **Avviare Frontend**: `cd src/frontend && npm run dev`

Accedere all'applicazione su `http://localhost:5173`

## Testing

### Backend Tests

```bash
cd src/backend/TodoApp.Tests
dotnet test
```

### Frontend Tests

```bash
cd src/frontend
npm run test
```

## Configurazione

### Backend

- **Connection String**: `src/backend/TodoApp.API/appsettings.json`
- **CORS**: Configurato per `http://localhost:5173` e `http://localhost:3000`

### Frontend

- **API Base URL**: `src/frontend/.env.development`
- **Proxy Vite**: Configurato in `vite.config.ts` per `/api` → `http://localhost:5000`

## Database

PostgreSQL viene eseguito via Docker Compose:

- **Host**: localhost
- **Port**: 5432
- **Database**: todoapp
- **Username**: postgres
- **Password**: dev_password

## Note

- Il backend usa Clean Architecture con separazione layer netta
- Il frontend segue convenzioni React moderne (functional components, hooks)
- TypeScript strict mode abilitato
- FluentValidation per validazioni backend
- Zod per validazioni frontend
- Global exception handler per gestione errori centralizzata

## Prossimi Passi

Questo è uno scheletro funzionale pronto per implementare le user stories. Per completare l'applicazione:

1. Creare la migration iniziale del database
2. Implementare i componenti React (TaskList, TaskItem, TaskInput, etc.)
3. Implementare i custom hooks (useTasks, useTaskFilter)
4. Aggiungere test per backend e frontend
5. Implementare error boundary e gestione errori UI
6. Aggiungere stili CSS

Consultare le user stories in `user-stories-claude/` per i requisiti dettagliati.
