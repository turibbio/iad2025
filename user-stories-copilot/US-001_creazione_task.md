# US-001 — Creazione Task
Priorità: P0

Descrizione
- Come utente voglio poter creare una nuova task inserendo un titolo, in modo da aggiungere attività alla mia lista.

Acceptance Criteria (Given / When / Then)
- Given che l'utente è nella pagina principale e l'`input field` è visibile,
  When l'utente inserisce un titolo valido e preme `Enter` (o clicca il pulsante di invio),
  Then la nuova task viene aggiunta alla lista con un `ID` univoco, `data creazione` impostata e `stato` non completato.

Note
- Titolo obbligatorio; non creare duplicati (vedi US-011).
