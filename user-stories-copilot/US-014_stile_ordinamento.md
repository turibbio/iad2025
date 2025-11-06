# US-014 — Stile Visualizzazione e Ordinamento
Priorità: P2

Descrizione
- Come utente voglio che le task completate siano visualmente distinte (stile barrato) e che l'ordine sia per data di creazione (più recenti in alto).

Acceptance Criteria (Given / When / Then)
- Given che esistono task con stato `completato` e `non completato`,
  When la lista è renderizzata,
  Then le task completate devono avere stile barrato e l'ordine deve essere per `data creazione` con le più recenti in alto.

Note
- Assicurarsi che gli stili siano applicati tramite classi CSS riutilizzabili e che l'ordinamento sia deterministico.
