# US-010 — Persistenza Dati
Priorità: P0

Descrizione
- Come utente voglio che le mie task siano salvate localmente in modo che siano ripristinate al riavvio dell'app.

Acceptance Criteria (Given / When / Then)
- Given che l'utente crea/modifica/elimina task,
  When le operazioni vengono completate,
  Then i dati sono salvati in storage locale (es. `localStorage` o DB locale) e al successivo avvio dell'app la stessa lista viene ripristinata.

Note
- Le modifiche devono essere salvate automaticamente senza richiedere azioni aggiuntive dall'utente.
