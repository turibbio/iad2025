# US-007 — Contatore Attività Attive
Priorità: P1

Descrizione
- Come utente voglio vedere il numero di attività attive rimanenti per avere una panoramica rapida del lavoro da completare.

Acceptance Criteria (Given / When / Then)
- Given che la lista contiene task con stato misto,
  When la pagina viene caricata o lo stato di una task cambia,
  Then il `Footer` mostra il conteggio corretto delle task non completate e si aggiorna automaticamente ad ogni modifica.

Note
- Il contatore deve aggiornarsi dopo operazioni di creazione, eliminazione e toggle stato.
