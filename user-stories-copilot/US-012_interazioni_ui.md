# US-012 — Interazioni UI (Enter, Escape, Double-click)
Priorità: P1

Descrizione
- Come utente voglio interagire con la UI tramite tastiera e mouse: `Enter` per confermare inserimento/modifica, `Escape` per annullare, double-click per attivare la modifica.

Acceptance Criteria (Given / When / Then)
- Given che l'utente sta creando o modificando una task,
  When preme `Enter`,
  Then l'inserimento o la modifica viene confermata; quando preme `Escape`, la modifica viene annullata.
  When fa double-click sul titolo di una task,
  Then entra in modalità modifica.

Note
- Assicurarsi che l'`input field` sia accessibile e focusabile via tastiera.
