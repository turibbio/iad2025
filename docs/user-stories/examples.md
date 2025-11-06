# Esempi Completi

## US-001: Creare un nuovo task

**Come** utente dell'app TODO  
**Voglio** creare un nuovo task inserendo un titolo  
**In modo da** tenere traccia delle cose da fare

**Priorità**: P0

**Criteri di Accettazione**:

**Frontend**:
- [ ] Given sono sulla pagina principale
      When inserisco "Comprare il latte" e premo Enter
      Then il task appare in cima alla lista
      And il campo input viene svuotato

**Backend**:
- [ ] Given ricevo POST /api/tasks con { "title": "Comprare il latte" }
      When il titolo è valido e non esiste già
      Then viene creato task con ID univoco (Guid)
      And ritorna 201 Created
      And il task ha CreatedAt e UpdatedAt impostati

- [ ] Given ricevo POST con titolo vuoto
      Then ritorna 400 Bad Request
      And messaggio "Il titolo è obbligatorio"

- [ ] Given esiste già task con stesso titolo
      Then ritorna 409 Conflict
      And messaggio "Un task con questo titolo esiste già"

**Note Tecniche**:
- Frontend: React Hook Form
- Backend: FluentValidation
- Database: Index unique su Title

**Dipendenze**: Nessuna
