# Prossimi Passi - TODO App

Questo documento descrive i passi necessari per completare l'implementazione dell'applicazione TODO.

## ✅ Completato

### Backend
- [x] Struttura progetto Clean Architecture creata
- [x] Entità `TodoTask` definita
- [x] DTOs (TaskDto, CreateTaskDto, UpdateTaskDto) creati
- [x] Interfacce (ITaskRepository, ITaskService) definite
- [x] Repository `TaskRepository` implementato
- [x] Service `TaskService` implementato con business logic
- [x] FluentValidation configurato (CreateTaskDtoValidator, UpdateTaskDtoValidator)
- [x] Custom exceptions (TaskNotFoundException, DuplicateTaskException)
- [x] Controller `TasksController` con tutti gli endpoint REST
- [x] Global Exception Handler middleware
- [x] Program.cs configurato (DI, CORS, Swagger, DbContext)
- [x] DbContext e Entity Configuration per PostgreSQL
- [x] appsettings.json con connection string

### Frontend
- [x] Progetto Vite + React + TypeScript inizializzato
- [x] TypeScript types definiti (ITask, CreateTaskDto, UpdateTaskDto, TaskFilter)
- [x] API service layer (taskService.ts) implementato
- [x] Axios client configurato
- [x] Costanti definite (API endpoints, validation rules)
- [x] Struttura cartelle componenti creata
- [x] Vite config con proxy per API
- [x] Vitest configurato per testing
- [x] Environment files (.env.development, .env.production)

### Infrastruttura
- [x] docker-compose.yml per PostgreSQL
- [x] .gitignore aggiornato per .NET e React
- [x] Documentazione (README.md, NEXT_STEPS.md)

## 📋 Da Fare

### 1. Database Setup

**Priorità: Alta**

```bash
# 1. Avviare PostgreSQL
docker-compose up -d

# 2. Creare migration iniziale
cd src/backend/TodoApp.Infrastructure
dotnet ef migrations add InitialCreate --startup-project ../TodoApp.API

# 3. Applicare migration al database
dotnet ef database update --startup-project ../TodoApp.API

# 4. Verificare che il database sia stato creato
# Connettersi a PostgreSQL e verificare tabella Tasks
```

**File da verificare**:
- `src/backend/TodoApp.Infrastructure/Migrations/xxxxx_InitialCreate.cs`

### 2. Backend - Testing

**Priorità: Alta**

Creare test per:

**Unit Tests**:
- `TaskServiceTests.cs` - Test per TaskService (tutti i metodi)
- `CreateTaskDtoValidatorTests.cs` - Test validatori FluentValidation
- `UpdateTaskDtoValidatorTests.cs`
- `TaskRepositoryTests.cs` - Test repository (con InMemory DB)

**Integration Tests**:
- `TasksControllerIntegrationTests.cs` - Test endpoint API completi

**Esempio struttura**:
```csharp
// src/backend/TodoApp.Tests/Unit/Services/TaskServiceTests.cs
public class TaskServiceTests
{
    [Fact]
    public async Task CreateTaskAsync_ValidDto_ReturnsCreatedTask() { }

    [Fact]
    public async Task CreateTaskAsync_DuplicateTitle_ThrowsDuplicateTaskException() { }

    // ... altri test
}
```

### 3. Frontend - Componenti React

**Priorità: Alta**

Implementare i seguenti componenti:

#### TaskInput (Creazione task)
```tsx
// src/frontend/src/components/TaskInput/TaskInput.tsx
- Form con React Hook Form + Zod validation
- Input per titolo task (max 100 caratteri)
- Submit handler che chiama taskService.createTask()
- Gestione errori (duplicati, validazione)
```

#### TaskItem (Singolo task)
```tsx
// src/frontend/src/components/TaskItem/TaskItem.tsx
- Checkbox per toggle completamento
- Titolo task (editable on double-click)
- Pulsante elimina
- Styling differenziato per completed/active
```

#### TaskList (Lista task)
```tsx
// src/frontend/src/components/TaskList/TaskList.tsx
- Rendering lista TaskItem
- Loading state
- Empty state quando nessun task
```

#### TaskFilter (Filtri visualizzazione)
```tsx
// src/frontend/src/components/TaskFilter/TaskFilter.tsx
- Bottoni: All, Active, Completed
- Evidenzia filtro attivo
- Aggiorna query param on click
```

#### TaskFooter (Footer con azioni)
```tsx
// src/frontend/src/components/TaskFooter/TaskFooter.tsx
- Contatore task attive
- Pulsante "Clear completed"
- Pulsante "Toggle all"
```

#### ErrorBoundary (Gestione errori)
```tsx
// src/frontend/src/components/ErrorBoundary/ErrorBoundary.tsx
- Cattura errori React
- Mostra UI fallback con messaggio errore
```

### 4. Frontend - Custom Hooks

**Priorità: Alta**

#### useTasks
```tsx
// src/frontend/src/hooks/useTasks.ts
- Gestione stato tasks (useState)
- Caricamento iniziale (useEffect)
- Funzioni CRUD (create, update, delete, toggle)
- Gestione loading/error states
- Sincronizzazione con API
```

#### useTaskFilter
```tsx
// src/frontend/src/hooks/useTaskFilter.ts
- Gestione filtro attivo (all/active/completed)
- Filtraggio tasks in base al filtro
- Calcolo tasks attive
```

#### useDebounce (opzionale)
```tsx
// src/frontend/src/hooks/useDebounce.ts
- Debouncing per input search (se implementato)
```

### 5. Frontend - Context (State Management)

**Priorità: Media**

```tsx
// src/frontend/src/context/TaskContext.tsx
- TaskContext con stato globale
- TaskProvider wrapper
- Custom hook useTaskContext()
```

Alternativamente, se l'app è semplice, usare solo hooks locali.

### 6. Frontend - Testing

**Priorità: Media**

Creare test per:

**Component Tests**:
- `TaskInput.test.tsx` - Test input, validazione, submit
- `TaskItem.test.tsx` - Test toggle, delete, edit
- `TaskList.test.tsx` - Test rendering lista
- `TaskFilter.test.tsx` - Test cambio filtro
- `TaskFooter.test.tsx` - Test clear completed, toggle all

**Hook Tests**:
- `useTasks.test.ts` - Test operazioni CRUD
- `useTaskFilter.test.ts` - Test filtri

**Esempio**:
```tsx
// src/frontend/src/components/TaskInput/TaskInput.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { TaskInput } from './TaskInput'

describe('TaskInput', () => {
  it('should render input field', () => {
    render(<TaskInput onSubmit={jest.fn()} />)
    expect(screen.getByPlaceholderText(/titolo/i)).toBeInTheDocument()
  })

  // ... altri test
})
```

### 7. Frontend - Stili CSS

**Priorità: Bassa**

```css
// src/frontend/src/styles/global.css
- Reset CSS
- Variabili CSS (colori, spacing)
- Typography

// Component-specific styles
- TaskInput.module.css
- TaskItem.module.css
- TaskList.module.css
- etc.
```

### 8. Integrazione Frontend-Backend

**Priorità: Alta**

**Test end-to-end**:
1. Avviare backend: `cd src/backend/TodoApp.API && dotnet run`
2. Avviare frontend: `cd src/frontend && npm run dev`
3. Accedere a `http://localhost:5173`
4. Testare tutti i flussi:
   - Creare task
   - Toggle completamento
   - Modificare task
   - Eliminare task
   - Filtrare (all/active/completed)
   - Clear completed
   - Toggle all

### 9. Miglioramenti Opzionali

**Priorità: Bassa**

- [ ] Paginazione (se molti task)
- [ ] Ordinamento (per data, alfabetico)
- [ ] Ricerca/filtro per titolo
- [ ] Drag & drop per riordinare
- [ ] Categorie/tags per task
- [ ] Data scadenza
- [ ] Priorità task
- [ ] Dark mode
- [ ] Animazioni (Framer Motion)
- [ ] PWA support
- [ ] Offline support
- [ ] Export/Import task (JSON, CSV)

### 10. Deployment

**Priorità: Bassa**

- [ ] Build produzione frontend: `npm run build`
- [ ] Pubblicare backend su Azure/AWS/DigitalOcean
- [ ] Pubblicare frontend su Vercel/Netlify
- [ ] Configurare PostgreSQL produzione
- [ ] Configurare CORS per dominio produzione
- [ ] Setup CI/CD (GitHub Actions)

## Ordine Consigliato di Implementazione

1. **Database Setup** (5 min)
2. **Backend Testing** (30-60 min)
3. **Frontend - useTasks hook** (30 min)
4. **Frontend - TaskInput component** (30 min)
5. **Frontend - TaskItem component** (30 min)
6. **Frontend - TaskList component** (20 min)
7. **Frontend - TaskFilter component** (20 min)
8. **Frontend - TaskFooter component** (20 min)
9. **Frontend - ErrorBoundary** (15 min)
10. **Frontend Testing** (60 min)
11. **Integrazione e test E2E** (30 min)
12. **Stili CSS** (60 min)

**Tempo stimato totale**: 6-8 ore

## Comandi Rapidi

### Backend
```bash
# Avvia PostgreSQL
docker-compose up -d

# Crea migration
cd src/backend/TodoApp.Infrastructure
dotnet ef migrations add InitialCreate --startup-project ../TodoApp.API

# Applica migration
dotnet ef database update --startup-project ../TodoApp.API

# Avvia API
cd src/backend/TodoApp.API
dotnet run

# Run tests
cd src/backend/TodoApp.Tests
dotnet test
```

### Frontend
```bash
# Installa dipendenze
cd src/frontend
npm install

# Avvia dev server
npm run dev

# Build produzione
npm run build

# Run tests
npm run test

# Lint
npm run lint
```

## Riferimenti

- **User Stories**: Consultare `user-stories-claude/` per requisiti dettagliati
- **Documentazione Backend**: Vedi `docs/backend/`
- **Documentazione Frontend**: Vedi `docs/frontend/`
- **Convenzioni**: Vedi `CLAUDE.md`
- **Specifiche App**: Vedi `TODO_APP_SPECS.md`

## Note

- Questo è uno **scheletro funzionale** pronto per l'implementazione
- Backend e frontend compilano senza errori
- Tutte le interfacce e contratti sono definiti
- Database schema è configurato (manca solo migration)
- API endpoints sono pronti (manca solo testing)
- Service layer frontend è completo

**Pronto per iniziare l'implementazione! 🚀**
