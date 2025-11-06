# US004 - Modifica Task

## User Story
**Come** utente dell'applicazione TODO  
**Voglio** modificare il titolo di un'attività esistente  
**Così che** possa correggere errori o aggiornare la descrizione

## Criteri di Accettazione

### Scenario 1: Modifica task con successo
**Dato che** ho una task esistente  
**Quando** faccio double-click sul titolo della task  
**Allora** entro in modalità modifica  
**E** il titolo diventa un campo input editabile  
**E** il testo attuale è selezionato per facilitare la modifica  
**Quando** modifico il testo e premo Enter  
**Allora** il nuovo titolo viene salvato  
**E** esco dalla modalità modifica  
**E** il titolo aggiornato viene visualizzato  
**E** la modifica viene salvata automaticamente

### Scenario 2: Annullamento modifica
**Dato che** sono in modalità modifica di una task  
**Quando** premo Escape  
**Allora** esco dalla modalità modifica  
**E** il titolo originale viene ripristinato  
**E** nessuna modifica viene salvata

### Scenario 3: Tentativo di modifica con titolo vuoto
**Dato che** sono in modalità modifica  
**Quando** cancello tutto il testo e premo Enter  
**Allora** viene mostrato un messaggio di errore "Il titolo non può essere vuoto"  
**E** rimango in modalità modifica  
**E** il titolo originale non viene modificato

### Scenario 4: Tentativo di modifica con titolo duplicato
**Dato che** esiste una task con titolo "Comprare il latte"  
**E** sto modificando un'altra task  
**Quando** provo a salvare con il titolo "Comprare il latte"  
**Allora** viene mostrato un messaggio di errore "Esiste già una task con questo titolo"  
**E** rimango in modalità modifica  
**E** il titolo originale non viene modificato

### Scenario 5: Modifica con titolo troppo lungo
**Dato che** sono in modalità modifica  
**Quando** inserisco un titolo che supera la lunghezza massima e premo Enter  
**Allora** viene mostrato un messaggio di errore con la lunghezza massima  
**E** rimango in modalità modifica

### Scenario 6: Uscita automatica dalla modalità modifica
**Dato che** sono in modalità modifica di una task  
**Quando** clicco fuori dal campo input  
**Allora** se il titolo è valido, viene salvato automaticamente  
**E** esco dalla modalità modifica

## Dettagli Tecnici
- Double-click sul titolo per entrare in modalità modifica
- Enter per confermare, Escape per annullare
- Click fuori dal campo (blur) per salvare automaticamente
- Validazione: non vuoto, non duplicato, lunghezza massima
- Mantenimento dello stato (completata/non completata) durante la modifica

## Priorità
**Media** - Funzionalità importante ma non critica

## Stima
3 Story Points

## Dipendenze
- US001 (Creazione Task)
- US002 (Visualizzazione Task)
