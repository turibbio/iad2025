# US-005: Modifica titolo task

**Epic**: Gestione Base Task
**Priorità**: P0 (Must Have)
**Stima**: 5 Story Points
**Dipendenze**: US-002

## Descrizione

Come utente, voglio poter modificare il titolo di una task esistente, così da correggere errori di battitura o aggiornare la descrizione dell'attività.

## Criteri di Accettazione

**Given** che ho una task nella lista
**When** faccio doppio click sul titolo della task
**Then** il titolo diventa un campo di input editabile
**And** il testo corrente è selezionato per facilitare la modifica

**Given** che sono in modalità modifica
**When** modifico il testo e premo Enter
**Then** il titolo viene aggiornato con il nuovo valore
**And** l'input torna a essere testo normale
**And** la modifica viene salvata nel database

**Given** che sono in modalità modifica
**When** premo Escape
**Then** la modifica viene annullata
**And** il titolo ritorna al valore originale
**And** l'input torna a essere testo normale

**Given** che sono in modalità modifica
**When** lascio il campo vuoto e premo Enter
**Then** la modifica viene annullata
**And** viene mostrato un messaggio "Il titolo non può essere vuoto"
**And** il titolo rimane quello originale

## Note Tecniche

### Backend
- **Endpoint**: `PUT /api/todos/{id}`
- **Request Body**: `{ "title": "string" }`
- **Response**: `200 OK` con oggetto task aggiornato
- **Response**: `400 Bad Request` se titolo vuoto
- **Response**: `404 Not Found` se task non esiste

### Frontend
- **Componente**: `TaskItem.tsx`
- **State Locale**: `isEditing` boolean flag
- **Eventi**: `onDoubleClick`, `onKeyDown` (Enter/Escape), `onBlur`
- **API Call**: `taskService.update(id, { title })`
- **Validazione**: Client-side con Zod prima di API call

### Database
- **Update**: `UPDATE Todos SET Title = @title WHERE Id = @id`

## Testing

### Unit Tests (Backend)
```csharp
// TodoService.UpdateAsync_WithValidTitle_UpdatesTask
// TodoService.UpdateAsync_WithEmptyTitle_ThrowsValidationException
// TodoService.UpdateAsync_NonExistingTask_ThrowsNotFoundException
```

### Unit Tests (Frontend)
```typescript
// TaskItem - enters edit mode on double click
// TaskItem - saves on Enter key
// TaskItem - cancels on Escape key
// TaskItem - validates empty title
// TaskItem - restores original value on cancel
```

### Integration Test
```csharp
// PUT /api/todos/{id} - returns 200 with updated task
// PUT /api/todos/{id} - returns 400 with empty title
// PUT /api/todos/invalid-id - returns 404
```

## DoD (Definition of Done)

- [ ] Endpoint PUT implementato
- [ ] Validazione titolo implementata (FluentValidation)
- [ ] Modalità edit in TaskItem implementata
- [ ] Doppio click attiva modalità edit
- [ ] Enter salva, Escape annulla
- [ ] Validazione client-side con Zod
- [ ] Gestione errori API (404, 400)
- [ ] Unit tests backend > 80% coverage
- [ ] Unit tests frontend > 80% coverage
- [ ] Integration test passante
- [ ] Accessibilità input verificata (focus management)
- [ ] Code review approvato

## Riferimenti

- Specifiche: `TODO_APP_SPECS.md` § 2.1, § 3.2, § 5
- Error Handling: `docs/backend/error-handling.md`, `docs/frontend/error-handling.md`
- Forms: React Hook Form best practices
