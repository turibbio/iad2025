# US-004: Eliminazione task

**Epic**: Gestione Base Task
**Priorità**: P0 (Must Have)
**Stima**: 3 Story Points
**Dipendenze**: US-002

## Descrizione

Come utente, voglio poter eliminare una task dalla lista, così da rimuovere attività non più necessarie o create per errore.

## Criteri di Accettazione

**Given** che ho una task nella lista
**When** clicco sul pulsante elimina (X) accanto alla task
**Then** la task viene rimossa dalla lista visualizzata
**And** la task viene eliminata dal database
**And** la lista si aggiorna automaticamente

**Given** che elimino una task
**When** ricarico la pagina
**Then** la task eliminata non è più presente nella lista

**Given** che provo a eliminare una task inesistente
**When** il sistema tenta l'eliminazione
**Then** ricevo un errore 404 Not Found

## Note Tecniche

### Backend
- **Endpoint**: `DELETE /api/todos/{id}`
- **Response**: `204 No Content` in caso di successo
- **Response**: `404 Not Found` se task non esiste
- **Logica**: Eliminazione fisica dal database

### Frontend
- **Componente**: `TaskItem.tsx`
- **UI**: Pulsante con icona "X" o cestino
- **Conferma**: Nessuna conferma richiesta (eliminazione diretta)
- **API Call**: `taskService.delete(id)`
- **State Update**: Rimozione task da state locale dopo successo

### Database
- **Delete**: `DELETE FROM Todos WHERE Id = @id`

## Testing

### Unit Tests (Backend)
```csharp
// TodoService.DeleteAsync_ExistingTask_RemovesTask
// TodoService.DeleteAsync_NonExistingTask_ThrowsNotFoundException
// TodoRepository.DeleteAsync_RemovesFromDatabase
```

### Unit Tests (Frontend)
```typescript
// TaskItem - renders delete button
// TaskItem - calls onDelete when button clicked
// TaskList - removes task from list after deletion
```

### Integration Test
```csharp
// DELETE /api/todos/{id} - returns 204 and removes task
// DELETE /api/todos/invalid-id - returns 404
// GET /api/todos after DELETE - verifies task is gone
```

## DoD (Definition of Done)

- [ ] Endpoint DELETE implementato
- [ ] Eliminazione fisica dal database funzionante
- [ ] Gestione errore 404 per task inesistenti
- [ ] Pulsante elimina visibile in TaskItem
- [ ] State locale aggiornato dopo eliminazione
- [ ] UI si aggiorna senza reload manuale
- [ ] Unit tests backend > 80% coverage
- [ ] Unit tests frontend > 80% coverage
- [ ] Integration test passante
- [ ] Accessibilità pulsante verificata (aria-label "Elimina task")
- [ ] Code review approvato

## Riferimenti

- Specifiche: `TODO_APP_SPECS.md` § 2.1, § 3.2
- Error Handling: `docs/backend/error-handling.md`
- Accessibility: `docs/quality/accessibility.md`
