# US-008: Validazione avanzata task (lunghezza e duplicati)

**Epic**: Validazioni e Qualità Dati
**Priorità**: P2 (Medium Priority)
**Stima**: 3 Story Points
**Dipendenze**: US-001, US-005

## Descrizione

Come utente, voglio che il sistema impedisca la creazione di task duplicate o con titoli troppo lunghi, così da mantenere la lista organizzata e leggibile.

## Criteri di Accettazione

**Given** che provo a creare una task con titolo > 100 caratteri
**When** invio il form
**Then** ricevo un errore "Il titolo non può superare 100 caratteri"
**And** la task non viene creata

**Given** che esiste già una task con titolo "Comprare il latte"
**When** provo a creare un'altra task con lo stesso titolo
**Then** ricevo un errore "Esiste già una task con questo titolo"
**And** la task non viene creata

**Given** che modifico una task esistente
**When** cambio il titolo in uno già usato da un'altra task
**Then** ricevo un errore "Esiste già una task con questo titolo"
**And** la modifica non viene salvata

**Given** che modifico una task con un titolo > 100 caratteri
**When** invio la modifica
**Then** ricevo un errore "Il titolo non può superare 100 caratteri"
**And** la modifica non viene salvata

## Note Tecniche

### Backend
- **FluentValidation Rules**:
  ```csharp
  RuleFor(x => x.Title)
    .NotEmpty().WithMessage("Il titolo è obbligatorio")
    .MaximumLength(100).WithMessage("Il titolo non può superare 100 caratteri")
    .Must(BeUnique).WithMessage("Esiste già una task con questo titolo");
  ```
- **Logica Duplicati**: Query database per verificare esistenza titolo
- **Response**: `400 Bad Request` con dettaglio errore

### Frontend
- **Zod Validation Schema**:
  ```typescript
  const taskSchema = z.object({
    title: z.string()
      .min(1, "Il titolo è obbligatorio")
      .max(100, "Il titolo non può superare 100 caratteri")
  });
  ```
- **Validazione Duplicati**: Gestita server-side, messaggio mostrato da response API
- **UI**: Messaggi di errore sotto l'input field (rosso)

### Database
- **Index**: Creare unique index su `Title` (opzionale, ma raccomandato)
  ```sql
  CREATE UNIQUE INDEX IX_Todos_Title ON Todos(Title);
  ```

## Testing

### Unit Tests (Backend)
```csharp
// TodoValidator.Validate_TitleTooLong_ReturnsError
// TodoValidator.Validate_DuplicateTitle_ReturnsError
// TodoService.CreateAsync_DuplicateTitle_ThrowsValidationException
// TodoService.UpdateAsync_DuplicateTitle_ThrowsValidationException
```

### Unit Tests (Frontend)
```typescript
// TaskInput - shows error when title > 100 chars
// TaskInput - validates max length before API call
// TaskItem - shows error when update has duplicate title
```

### Integration Test
```csharp
// POST /api/todos - returns 400 with title > 100 chars
// POST /api/todos - returns 400 with duplicate title
// PUT /api/todos/{id} - returns 400 with duplicate title
```

## DoD (Definition of Done)

- [ ] FluentValidation rules per lunghezza e duplicati implementate
- [ ] Zod schema con validazione lunghezza implementato
- [ ] Unique constraint/index sul database (opzionale)
- [ ] Messaggi di errore chiari e in italiano
- [ ] Gestione errori 400 nel frontend
- [ ] Unit tests backend > 80% coverage
- [ ] Unit tests frontend > 80% coverage
- [ ] Integration test passanti
- [ ] UI mostra errori in modo user-friendly
- [ ] Code review approvato

## Riferimenti

- Specifiche: `TODO_APP_SPECS.md` § 5
- Validation: `docs/backend/database.md` (FluentValidation)
- Error Handling: `docs/backend/error-handling.md`, `docs/frontend/error-handling.md`
