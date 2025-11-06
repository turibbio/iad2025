# US-001: Creazione di una nuova task

**Epic**: Gestione Base Task
**Priorità**: P0 (Must Have)
**Stima**: 5 Story Points
**Dipendenze**: Nessuna

## Descrizione

Come utente, voglio poter creare una nuova task inserendo un titolo, così da poter aggiungere attività alla mia lista TODO.

## Criteri di Accettazione

**Given** che sono sulla pagina principale dell'applicazione TODO
**When** inserisco un titolo nel campo di input e premo Enter
**Then** la nuova task viene aggiunta alla lista con stato "non completata"
**And** il campo di input viene svuotato
**And** la task riceve un ID univoco e timestamp di creazione

**Given** che ho inserito un titolo valido
**When** creo la task
**Then** la task viene salvata nel database
**And** appare immediatamente nella lista visualizzata

**Given** che il campo di input è vuoto
**When** premo Enter
**Then** nessuna task viene creata
**And** viene mostrato un messaggio di errore "Il titolo è obbligatorio"

## Note Tecniche

### Backend
- **Endpoint**: `POST /api/todos`
- **Request Body**: `{ "title": "string" }`
- **Response**: `201 Created` con oggetto task completo
- **Validazioni**: FluentValidation per verificare titolo non vuoto

### Frontend
- **Componente**: `TaskInput.tsx`
- **Hook**: Gestione form con React Hook Form + Zod validation
- **API Call**: `taskService.create()`

### Database
- **Tabella**: `Todos`
- **Campi**: `Id (Guid), Title (string), IsCompleted (bool), CreatedAt (DateTime)`

## Testing

### Unit Tests (Backend)
```csharp
// TodoService.CreateAsync_WithValidTitle_ReturnsNewTodo
// TodoService.CreateAsync_WithEmptyTitle_ThrowsValidationException
```

### Unit Tests (Frontend)
```typescript
// TaskInput - renders input field
// TaskInput - calls onCreate when Enter is pressed
// TaskInput - shows error when title is empty
```

### Integration Test
```csharp
// POST /api/todos - returns 201 with valid data
// POST /api/todos - returns 400 with empty title
```

## DoD (Definition of Done)

- [ ] Endpoint backend implementato e funzionante
- [ ] Validazione titolo implementata (FluentValidation)
- [ ] Componente frontend TaskInput implementato
- [ ] Task salvata correttamente nel database
- [ ] Unit tests backend > 80% coverage
- [ ] Unit tests frontend > 80% coverage
- [ ] Integration test endpoint POST passante
- [ ] Nessun warning nel build
- [ ] Code review approvato
- [ ] Documentazione API aggiornata

## Riferimenti

- Specifiche: `TODO_APP_SPECS.md` § 2.1, § 2.2
- Convenzioni Backend: `docs/backend/conventions.md`
- Convenzioni Frontend: `docs/frontend/conventions.md`
- Testing Guide: `docs/quality/testing-backend.md`, `docs/quality/testing-frontend.md`
