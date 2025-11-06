# US005 - Eliminazione Task

## User Story
**Come** utente dell'applicazione TODO  
**Voglio** eliminare un'attività  
**Così che** possa rimuovere task non più necessarie

## Criteri di Accettazione

### Scenario 1: Eliminazione singola task
**Dato che** ho una o più task nella lista  
**Quando** clicco sul pulsante elimina (X) di una task  
**Allora** la task viene rimossa dalla lista  
**E** la modifica viene salvata automaticamente  
**E** se la task era non completata, il contatore attività attive diminuisce di 1  
**E** la lista si riordina automaticamente

### Scenario 2: Eliminazione task in modalità modifica
**Dato che** sono in modalità modifica di una task  
**Quando** clicco sul pulsante elimina  
**Allora** esco dalla modalità modifica  
**E** la task viene eliminata  
**E** non viene richiesta ulteriore conferma

### Scenario 3: Eliminazione ultima task
**Dato che** ho una sola task nella lista  
**Quando** elimino l'unica task  
**Allora** la task viene rimossa  
**E** viene mostrato il messaggio "Nessuna attività. Inizia creandone una!"  
**E** il contatore mostra 0 attività attive

### Scenario 4: Eliminazione task completata
**Dato che** ho una task completata  
**Quando** clicco sul pulsante elimina  
**Allora** la task viene rimossa  
**E** il contatore attività attive non cambia (perché era già completata)  
**E** la modifica viene salvata automaticamente

### Scenario 5: Persistenza dopo eliminazione
**Dato che** ho eliminato una task  
**E** chiudo l'applicazione  
**Quando** riapro l'applicazione  
**Allora** la task eliminata non è più presente  
**E** le altre task sono ancora presenti

## Dettagli Tecnici
- Pulsante elimina (X) visibile per ogni task
- Rimozione immediata senza conferma (per semplicità d'uso)
- Salvataggio automatico in persistenza locale
- Aggiornamento automatico del contatore
- Gestione caso lista vuota dopo eliminazione

## Priorità
**Alta** - Funzionalità core fondamentale

## Stima
2 Story Points

## Dipendenze
- US001 (Creazione Task)
- US002 (Visualizzazione Task)
