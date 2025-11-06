# US-006: Filtro visualizzazione task

**Epic**: Organizzazione e Filtri
**Priorità**: P1 (High Priority)
**Stima**: 5 Story Points
**Dipendenze**: US-002, US-003

## Descrizione

Come utente, voglio poter filtrare la visualizzazione delle task (tutte/attive/completate), così da concentrarmi sulle attività rilevanti per il mio contesto attuale.

## Criteri di Accettazione

**Given** che ho task completate e non completate
**When** seleziono il filtro "Tutte"
**Then** vedo tutte le task indipendentemente dallo stato

**Given** che ho task completate e non completate
**When** seleziono il filtro "Attive"
**Then** vedo solo le task non completate
**And** le task completate sono nascoste

**Given** che ho task completate e non completate
**When** seleziono il filtro "Completate"
**Then** vedo solo le task completate
**And** le task non completate sono nascoste

**Given** che ho applicato un filtro che non restituisce risultati
**When** la lista è vuota
**Then** vedo un messaggio "Nessuna task trovata con i filtri applicati"

**Given** che ho selezionato un filtro
**When** ricarico la pagina
**Then** il filtro selezionato viene mantenuto (persistito in localStorage o URL)

## Note Tecniche

### Backend
- **Opzione 1**: Endpoint con query parameter
  - `GET /api/todos?filter=all|active|completed`
- **Opzione 2**: Filtro solo client-side (preferibile per semplicità)

### Frontend
- **Componente**: `TaskFilter.tsx` (barra filtri)
- **State**: `currentFilter` in React Context
- **UI**: Tre pulsanti radio/toggle (Tutte, Attive, Completate)
- **Logica Filtro**:
  ```typescript
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true; // 'all'
  });
  ```
- **Persistenza**: `localStorage.setItem('taskFilter', filter)`

### Database
- Nessuna modifica necessaria se filtro client-side

## Testing

### Unit Tests (Backend - se server-side)
```csharp
// TodoService.GetAllAsync_FilterActive_ReturnsOnlyActiveTasks
// TodoService.GetAllAsync_FilterCompleted_ReturnsOnlyCompletedTasks
```

### Unit Tests (Frontend)
```typescript
// TaskFilter - renders three filter buttons
// TaskFilter - calls onChange when filter selected
// TaskList - filters tasks by status (all/active/completed)
// TaskList - shows empty state message when no results
// App - persists filter selection to localStorage
```

### Integration Test (se server-side)
```csharp
// GET /api/todos?filter=active - returns only active tasks
// GET /api/todos?filter=completed - returns only completed tasks
```

## DoD (Definition of Done)

- [ ] Componente TaskFilter implementato
- [ ] Logica filtro funzionante (client o server-side)
- [ ] Tre filtri disponibili: Tutte, Attive, Completate
- [ ] Messaggio per filtri senza risultati
- [ ] Persistenza filtro in localStorage
- [ ] Filtro attivo visivamente evidenziato
- [ ] Unit tests frontend > 80% coverage
- [ ] Integration test passante (se server-side)
- [ ] UI responsive
- [ ] Accessibilità verificata (aria-label, keyboard navigation)
- [ ] Code review approvato

## Riferimenti

- Specifiche: `TODO_APP_SPECS.md` § 2.3, § 7
- State Management: `docs/frontend/state-management.md`
- Accessibility: `docs/quality/accessibility.md`
