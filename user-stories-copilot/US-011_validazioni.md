# US-011 — Validazioni Titolo Task
Priorità: P0

Descrizione
- Come utente voglio che il sistema valuti il titolo della task in fase di creazione/modifica per evitare errori (titolo vuoto, duplicati, lunghezza massima).

Acceptance Criteria (Given / When / Then)
- Given che l'utente prova a creare o modificare una task,
  When il titolo è vuoto, uguale a uno esistente o supera la lunghezza massima,
  Then l'operazione è bloccata e viene mostrato un messaggio di errore appropriato in italiano.

Note
- Definire la lunghezza massima (es. 100 caratteri) nelle convenzioni del progetto.
