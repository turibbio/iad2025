# US-008 — Seleziona Tutto / Marca Tutte Completate
Priorità: P1

Descrizione
- Come utente voglio un'azione che permetta di marcare tutte le task come completate in un singolo click.

Acceptance Criteria (Given / When / Then)
- Given che esistono più task nella lista,
  When l'utente clicca su `Seleziona tutto` (azione bulk),
  Then tutte le task vengono impostate come `completate` e gli stati sono persistiti; il contatore si aggiorna.

Note
- Implementare come azione singola nel `Footer` o in toolbar.
