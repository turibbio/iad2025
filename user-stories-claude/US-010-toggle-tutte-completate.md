# US-010: Marca tutte le task come completate

**Epic**: Operazioni Bulk
**Priorità**: P2 (Medium Priority)
**Stima**: 3 Story Points
**Dipendenze**: US-003

## Descrizione

Come utente, voglio poter marcare tutte le task come completate con un solo click, così da segnare rapidamente la fine di una sessione di lavoro produttiva.

## Criteri di Accettazione

**Given** che ho 8 task attive e 2 completate
**When** clicco sul checkbox "Seleziona tutto" (o pulsante equivalente)
**Then** tutte le 10 task vengono marcate come completate
**And** tutti i checkbox individuali risultano selezionati
**And** gli stati vengono salvati nel database

**Given** che tutte le task sono già completate
**When** clicco sul checkbox "Seleziona tutto"
**Then** tutte le task vengono marcate come non completate
**And** tutti i checkbox individuali risultano deselezionati
**And** gli stati vengono salvati nel database

**Given** che alcune task sono completate e altre no
**When** clicco sul checkbox "Seleziona tutto"
**Then** tutte le task vengono marcate come completate (comportamento master checkbox)

**Given** che non ho task nella lista
**When** visualizzo l'interfaccia
**Then** il checkbox "Seleziona tutto" è nascosto o disabilitato

## Note Tecniche

### Backend
- **Opzione 1**: Endpoint specifico
  - `PATCH /api/todos/toggle-all`
  - Request Body: `{ "completed": true/false }`
  - Response: `200 OK` con array task aggiornate
- **Opzione 2**: Batch update client-side (multipli PATCH)

### Frontend
- **Componente**: Master checkbox in header lista (`TaskList.tsx`)
- **Label**: "Seleziona tutto" (aria-label)
- **Logica Toggle**:
  ```typescript
  const allCompleted = tasks.every(t => t.isCompleted);
  const toggleAll = async () => {
    const newStatus = !allCompleted;
    await Promise.all(tasks.map(t => taskService.toggleComplete(t.id, newStatus)));
    // Oppure: await taskService.toggleAll(newStatus);
  };
  ```
- **Stato Checkbox**:
  - Checked se tutte completate
  - Unchecked se nessuna completata
  - Indeterminate se alcune completate (opzionale)

### Database
- **Query**: `UPDATE Todos SET IsCompleted = @status`

## Testing

### Unit Tests (Backend - se endpoint dedicato)
```csharp
// TodoService.ToggleAllAsync_ToCompleted_MarksAllAsCompleted
// TodoService.ToggleAllAsync_ToActive_MarksAllAsActive
```

### Unit Tests (Frontend)
```typescript
// TaskList - renders master checkbox
// TaskList - master checkbox checked when all completed
// TaskList - master checkbox unchecked when none completed
// TaskList - toggles all tasks on master checkbox click
// TaskList - hides master checkbox when no tasks
```

### Integration Test
```csharp
// PATCH /api/todos/toggle-all - marks all as completed
// PATCH /api/todos/toggle-all - marks all as active
// GET /api/todos after toggle-all - verifies all states updated
```

## DoD (Definition of Done)

- [ ] Endpoint PATCH /api/todos/toggle-all implementato (o batch client-side)
- [ ] Master checkbox in header lista implementato
- [ ] Logica toggle funzionante (tutte completate ↔ tutte attive)
- [ ] Stato checkbox sincronizzato con task individuali
- [ ] Checkbox nascosto/disabilitato se lista vuota
- [ ] Unit tests backend > 80% coverage (se endpoint dedicato)
- [ ] Unit tests frontend > 80% coverage
- [ ] Integration test passante
- [ ] Accessibilità verificata (aria-label, keyboard)
- [ ] UI visivamente chiara (master checkbox ben distinguibile)
- [ ] Code review approvato

## Riferimenti

- Specifiche: `TODO_APP_SPECS.md` § 2.4
- Accessibility: `docs/quality/accessibility.md`
- Performance: Considerare batch operation per migliori performance
