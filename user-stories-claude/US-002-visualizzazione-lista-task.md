# US-002: Visualizzazione lista task

**Epic**: Gestione Base Task
**Priorità**: P0 (Must Have)
**Stima**: 3 Story Points
**Dipendenze**: US-001

## Descrizione

Come utente, voglio visualizzare l'elenco di tutte le mie task, così da avere una panoramica delle attività da svolgere.

## Criteri di Accettazione

**Given** che ho delle task salvate nel sistema
**When** accedo alla pagina principale
**Then** vedo la lista di tutte le task ordinate per data di creazione (più recenti in alto)
**And** ogni task mostra titolo, stato (completata/non completata), e data di creazione

**Given** che non ho ancora creato nessuna task
**When** accedo alla pagina principale
**Then** vedo un messaggio informativo "Nessuna task presente. Crea la tua prima attività!"

**Given** che ci sono task nel database
**When** ricarico la pagina
**Then** tutte le task vengono ripristinate correttamente dal database

## Note Tecniche

### Backend
- **Endpoint**: `GET /api/todos`
- **Response**: `200 OK` con array di oggetti task
- **Query**: Ordinamento per `CreatedAt DESC`

### Frontend
- **Componente**: `TaskList.tsx`
- **Hook**: `useEffect` per fetch iniziale
- **State**: Lista task in React Context o state locale
- **API Call**: `taskService.getAll()`

### Database
- **Query**: `SELECT * FROM Todos ORDER BY CreatedAt DESC`

## Testing

### Unit Tests (Backend)
```csharp
// TodoService.GetAllAsync_WithExistingTodos_ReturnsOrderedList
// TodoService.GetAllAsync_WithNoTodos_ReturnsEmptyList
```

### Unit Tests (Frontend)
```typescript
// TaskList - renders list of tasks
// TaskList - shows empty state message when no tasks
// TaskList - orders tasks by creation date (newest first)
```

### Integration Test
```csharp
// GET /api/todos - returns 200 with task list
// GET /api/todos - returns empty array when no tasks
```

## DoD (Definition of Done)

- [ ] Endpoint GET implementato
- [ ] Ordinamento per data implementato
- [ ] Componente TaskList implementato
- [ ] Stato vuoto con messaggio informativo
- [ ] Persistenza dati verificata (ricarica pagina)
- [ ] Unit tests backend > 80% coverage
- [ ] Unit tests frontend > 80% coverage
- [ ] Integration test passante
- [ ] UI responsive su mobile/desktop
- [ ] Code review approvato

## Riferimenti

- Specifiche: `TODO_APP_SPECS.md` § 2.1, § 4, § 6
- Formato task: `TODO_APP_SPECS.md` § 2.2
