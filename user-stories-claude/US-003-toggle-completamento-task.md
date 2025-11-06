# US-003: Toggle completamento task

**Epic**: Gestione Base Task
**Priorità**: P0 (Must Have)
**Stima**: 3 Story Points
**Dipendenze**: US-002

## Descrizione

Come utente, voglio poter marcare una task come completata o non completata cliccando su un checkbox, così da tracciare i miei progressi.

## Criteri di Accettazione

**Given** che ho una task non completata nella lista
**When** clicco sul checkbox accanto alla task
**Then** la task viene marcata come completata
**And** il titolo viene visualizzato con stile barrato
**And** lo stato viene salvato nel database

**Given** che ho una task completata nella lista
**When** clicco sul checkbox
**Then** la task viene marcata come non completata
**And** lo stile barrato viene rimosso dal titolo
**And** lo stato aggiornato viene salvato nel database

**Given** che modifico lo stato di una task
**When** ricarico la pagina
**Then** lo stato della task è persistito correttamente

## Note Tecniche

### Backend
- **Endpoint**: `PATCH /api/todos/{id}/toggle`
- **Response**: `200 OK` con oggetto task aggiornato
- **Logica**: Toggle booleano di `IsCompleted`

### Frontend
- **Componente**: `TaskItem.tsx`
- **Evento**: `onChange` del checkbox
- **Styling**: Classe CSS `.completed` per testo barrato
- **API Call**: `taskService.toggleComplete(id)`

### Database
- **Update**: `UPDATE Todos SET IsCompleted = !IsCompleted WHERE Id = @id`

## Testing

### Unit Tests (Backend)
```csharp
// TodoService.ToggleCompleteAsync_ExistingTask_TogglesStatus
// TodoService.ToggleCompleteAsync_NonExistingTask_ThrowsNotFoundException
```

### Unit Tests (Frontend)
```typescript
// TaskItem - toggles checkbox on click
// TaskItem - applies strikethrough style when completed
// TaskItem - calls onToggle handler with task id
```

### Integration Test
```csharp
// PATCH /api/todos/{id}/toggle - returns 200 and toggles status
// PATCH /api/todos/invalid-id/toggle - returns 404
```

## DoD (Definition of Done)

- [ ] Endpoint PATCH implementato
- [ ] Toggle funzionante per task esistenti
- [ ] Gestione errore 404 per task inesistenti
- [ ] Checkbox funzionale in TaskItem
- [ ] Stile barrato applicato a task completate
- [ ] Persistenza stato verificata
- [ ] Unit tests backend > 80% coverage
- [ ] Unit tests frontend > 80% coverage
- [ ] Integration test passante
- [ ] Accessibilità checkbox verificata (aria-label)
- [ ] Code review approvato

## Riferimenti

- Specifiche: `TODO_APP_SPECS.md` § 2.1, § 3.2, § 6
- Accessibility: `docs/quality/accessibility.md`
