# US-005 — Completamento / Toggle Stato
Priorità: P0

Descrizione
- Come utente voglio marcare una task come completata o non completata usando la checkbox, per tracciare il progresso.

Acceptance Criteria (Given / When / Then)
- Given che una task è mostrata nella lista e ha una checkbox,
  When l'utente clicca sulla checkbox di una task,
  Then lo stato `completata` della task viene togglato e il cambio è persistito; UI mostra stile barrato per le completate.

Note
- L'aggiornamento del contatore attività (US-007) deve essere immediato.
