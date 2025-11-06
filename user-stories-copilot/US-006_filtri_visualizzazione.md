# US-006 — Filtri (Tutte / Attive / Completate)
Priorità: P0

Descrizione
- Come utente voglio filtrare la lista per vedere tutte le task, solo le attive o solo le completate.

Acceptance Criteria (Given / When / Then)
- Given che sono presenti task con stati diversi,
  When l'utente seleziona il filtro `Attive`, `Completate` o `Tutte` nella `Barra filtri`,
  Then la lista mostra solo le task corrispondenti al filtro selezionato e eventuali messaggi di "nessun risultato" se vuota.

Note
- Il filtro non rimuove o modifica i dati, solo la vista.
