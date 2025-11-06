# US-007: Contatore task attive

**Epic**: Organizzazione e Filtri
**Priorità**: P1 (High Priority)
**Stima**: 2 Story Points
**Dipendenze**: US-002, US-003

## Descrizione

Come utente, voglio visualizzare il numero di task attive rimanenti, così da avere un'indicazione immediata del mio carico di lavoro.

## Criteri di Accettazione

**Given** che ho 5 task attive e 3 completate
**When** visualizzo la lista
**Then** vedo il contatore che mostra "5 attività rimanenti"

**Given** che ho 1 sola task attiva
**When** visualizzo la lista
**Then** vedo il contatore che mostra "1 attività rimanente" (singolare)

**Given** che non ho task attive
**When** visualizzo la lista
**Then** vedo il contatore che mostra "0 attività rimanenti"

**Given** che marco una task come completata
**When** il contatore si aggiorna
**Then** il numero diminuisce di 1 automaticamente

**Given** che creo una nuova task
**When** il contatore si aggiorna
**Then** il numero aumenta di 1 automaticamente

## Note Tecniche

### Backend
- Nessun endpoint specifico necessario
- Il conteggio viene fatto client-side sulla lista task esistente

### Frontend
- **Componente**: `TaskCounter.tsx` o parte di `TaskFooter.tsx`
- **Logica**:
  ```typescript
  const activeCount = tasks.filter(t => !t.isCompleted).length;
  const label = activeCount === 1 ? 'attività rimanente' : 'attività rimanenti';
  ```
- **Posizione UI**: Footer dell'applicazione
- **Auto-update**: Useeffect che ricomputa quando `tasks` cambia

### Database
- Nessuna modifica necessaria

## Testing

### Unit Tests (Frontend)
```typescript
// TaskCounter - displays correct count for multiple active tasks
// TaskCounter - displays singular form for 1 active task
// TaskCounter - displays zero when no active tasks
// TaskCounter - updates when task is toggled
// TaskCounter - updates when task is created
// TaskCounter - updates when task is deleted
```

## DoD (Definition of Done)

- [ ] Componente TaskCounter implementato
- [ ] Conteggio corretto per task attive (isCompleted = false)
- [ ] Gestione singolare/plurale corretta
- [ ] Auto-aggiornamento al cambio stato task
- [ ] Auto-aggiornamento alla creazione/eliminazione
- [ ] Unit tests frontend > 80% coverage
- [ ] UI visivamente integrata nel footer
- [ ] Accessibilità verificata (aria-live per screen readers)
- [ ] Code review approvato

## Riferimenti

- Specifiche: `TODO_APP_SPECS.md` § 2.3, § 3.1
- State Management: `docs/frontend/state-management.md`
- Accessibility: `docs/quality/accessibility.md` (aria-live regions)
