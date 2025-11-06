# US-013 — Stati dell'Applicazione (Lista Vuota / Nessun Risultato)
Priorità: P2

Descrizione
- Come utente voglio messaggi informativi per gli stati "lista vuota" e "nessun risultato" quando non ci sono task o un filtro non restituisce elementi.

Acceptance Criteria (Given / When / Then)
- Given che non esistono task,
  When l'utente apre l'app,
  Then viene mostrato un messaggio chiaro che invita a creare la prima task.
- Given che esiste un filtro attivo che non restituisce risultati,
  When il filtro è applicato,
  Then viene mostrato un messaggio "Nessun risultato" spiegando che non ci sono task corrispondenti.

Note
- I messaggi devono essere localizzati in italiano e coerenti con lo stile dell'app.
