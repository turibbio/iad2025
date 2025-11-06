# US-002 — Visualizzazione Lista Task
Priorità: P0

Descrizione
- Come utente voglio vedere l'elenco di tutte le task per poter consultare lo stato delle mie attività.

Acceptance Criteria (Given / When / Then)
- Given che esistono una o più task persistite,
  When l'utente apre l'applicazione,
  Then tutte le task vengono mostrate nella `Lista task` ordinate per `data creazione` (più recenti in alto).

Note
- Se la lista è vuota mostrare messaggio informativo (vedi US-013).
