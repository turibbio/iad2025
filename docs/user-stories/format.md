# Formato User Stories

## Formato Standard

```
Come [tipo di utente]
Voglio [azione/funzionalità]
In modo da [beneficio/valore]
```

## Criteri di Accettazione (Given-When-Then)

```
Given [stato iniziale]
When [azione eseguita]
Then [risultato atteso]
```

## Esempio

```markdown
### US-001: Creare un nuovo task

**Come** utente dell'app TODO
**Voglio** creare un nuovo task inserendo un titolo
**In modo da** tenere traccia delle cose da fare

**Priorità**: P0

**Criteri di Accettazione**:

**Frontend**:
- [ ] Given sono sulla pagina principale
      When inserisco "Comprare il latte" e premo Enter
      Then il nuovo task appare in cima alla lista

**Backend**:
- [ ] Given ricevo POST /api/tasks con { "title": "Test" }
      When il titolo è valido
      Then viene creato task con ID univoco
      And ritorna 201 Created
```
