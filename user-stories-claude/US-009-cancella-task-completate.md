# US-009: Cancella tutte le task completate

**Epic**: Operazioni Bulk
**Priorità**: P2 (Medium Priority)
**Stima**: 3 Story Points
**Dipendenze**: US-003, US-004

## Descrizione

Come utente, voglio poter eliminare tutte le task completate con un solo click, così da mantenere la lista pulita e focalizzata sulle attività ancora da svolgere.

## Criteri di Accettazione

**Given** che ho 5 task completate e 3 attive
**When** clicco sul pulsante "Cancella completate"
**Then** tutte le 5 task completate vengono rimosse dalla lista
**And** le 3 task attive rimangono visibili
**And** le task vengono eliminate dal database

**Given** che non ho task completate
**When** visualizzo la lista
**Then** il pulsante "Cancella completate" è disabilitato o nascosto

**Given** che cancello tutte le task completate
**When** ricarico la pagina
**Then** le task completate non sono più presenti

## Note Tecniche

### Backend
- **Opzione 1**: Endpoint specifico
  - `DELETE /api/todos/completed`
  - Response: `204 No Content`
- **Opzione 2**: Batch delete client-side (multipli DELETE)
  - Iterare task completate e chiamare `DELETE /api/todos/{id}` per ciascuna

### Frontend
- **Componente**: Pulsante in `TaskFooter.tsx`
- **Label**: "Cancella completate"
- **Stato**: Disabilitato se `completedCount === 0`
- **Logica**:
  ```typescript
  const deleteCompleted = async () => {
    const completedIds = tasks.filter(t => t.isCompleted).map(t => t.id);
    await Promise.all(completedIds.map(id => taskService.delete(id)));
    // Oppure: await taskService.deleteCompleted();
  };
  ```
- **Conferma**: Mostrare dialog di conferma (opzionale ma raccomandato)

### Database
- **Query**: `DELETE FROM Todos WHERE IsCompleted = true`

## Testing

### Unit Tests (Backend - se endpoint dedicato)
```csharp
// TodoService.DeleteCompletedAsync_WithCompletedTasks_RemovesAll
// TodoService.DeleteCompletedAsync_WithNoCompletedTasks_DoesNothing
```

### Unit Tests (Frontend)
```typescript
// TaskFooter - renders "Cancella completate" button
// TaskFooter - button disabled when no completed tasks
// TaskFooter - deletes all completed tasks on click
// TaskFooter - shows confirmation dialog (if implemented)
```

### Integration Test
```csharp
// DELETE /api/todos/completed - removes all completed tasks
// GET /api/todos after bulk delete - verifies only active remain
```

## DoD (Definition of Done)

- [ ] Endpoint DELETE /api/todos/completed implementato (o batch client-side)
- [ ] Pulsante "Cancella completate" in TaskFooter
- [ ] Pulsante disabilitato quando nessuna task completata
- [ ] Dialog di conferma implementato (opzionale)
- [ ] Rimozione task dal database verificata
- [ ] Unit tests backend > 80% coverage (se endpoint dedicato)
- [ ] Unit tests frontend > 80% coverage
- [ ] Integration test passante
- [ ] UI aggiornata senza reload manuale
- [ ] Accessibilità verificata
- [ ] Code review approvato

## Riferimenti

- Specifiche: `TODO_APP_SPECS.md` § 2.4
- Error Handling: `docs/backend/error-handling.md`
- Performance: Considerare batch operation vs multiple requests
