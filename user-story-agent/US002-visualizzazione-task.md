# US002 - Visualizzazione Task

## User Story
**Come** utente dell'applicazione TODO  
**Voglio** visualizzare l'elenco di tutte le mie attività  
**Così che** possa vedere cosa devo fare

## Criteri di Accettazione

### Scenario 1: Visualizzazione lista con task esistenti
**Dato che** ho creato diverse task  
**Quando** accedo alla pagina principale  
**Allora** vedo tutte le task ordinate per data di creazione (più recenti in alto)  
**E** ogni task mostra il titolo, checkbox di completamento e pulsante elimina  
**E** le task completate sono visualizzate con stile barrato  
**E** le task non completate sono visualizzate con stile normale

### Scenario 2: Visualizzazione lista vuota
**Dato che** non ho ancora creato alcuna task  
**Quando** accedo alla pagina principale  
**Allora** vedo un messaggio informativo "Nessuna attività. Inizia creandone una!"  
**E** il campo input è visibile e pronto all'uso

### Scenario 3: Persistenza dei dati al riavvio
**Dato che** ho creato diverse task  
**E** chiudo l'applicazione  
**Quando** riapro l'applicazione  
**Allora** tutte le mie task sono ancora presenti  
**E** mantengono lo stesso stato (completate/non completate)  
**E** mantengono lo stesso ordine

### Scenario 4: Aggiornamento automatico della lista
**Dato che** sto visualizzando la lista delle task  
**Quando** creo, modifico o elimino una task  
**Allora** la lista si aggiorna automaticamente  
**E** l'ordine viene mantenuto correttamente

## Dettagli Tecnici
- Ordinamento per data di creazione (timestamp)
- Stile visivo differente per task completate (text-decoration: line-through)
- Caricamento dati da localStorage/database locale all'avvio
- Rendering efficiente della lista

## Priorità
**Alta** - Funzionalità core fondamentale

## Stima
3 Story Points

## Dipendenze
- US001 (Creazione Task)
