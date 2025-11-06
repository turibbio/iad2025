# US-003 — Modifica Task
Priorità: P0

Descrizione
- Come utente voglio modificare il titolo di una task esistente per correggere o aggiornare la descrizione.

Acceptance Criteria (Given / When / Then)
- Given che una task esiste nella lista,
  When l'utente fa double-click sul titolo (o attiva la modalità modifica) e inserisce un nuovo titolo poi preme `Enter`,
  Then la task viene aggiornata con il nuovo titolo e le modifiche sono persistite.

Note
- `Escape` annulla la modifica e ripristina il titolo precedente.
