# US006 - Filtri Visualizzazione

## User Story
**Come** utente dell'applicazione TODO  
**Voglio** filtrare le attività per stato (tutte, attive, completate)  
**Così che** possa concentrarmi su specifici gruppi di task

## Criteri di Accettazione

### Scenario 1: Filtro "Tutte"
**Dato che** ho task completate e non completate  
**Quando** seleziono il filtro "Tutte"  
**Allora** vengono visualizzate tutte le task  
**E** il filtro "Tutte" appare come attivo/selezionato  
**E** le task mantengono l'ordine per data di creazione

### Scenario 2: Filtro "Attive"
**Dato che** ho task completate e non completate  
**Quando** seleziono il filtro "Attive"  
**Allora** vengono visualizzate solo le task non completate  
**E** il filtro "Attive" appare come attivo/selezionato  
**E** le task completate sono nascoste  
**E** l'ordine per data di creazione è mantenuto

### Scenario 3: Filtro "Completate"
**Dato che** ho task completate e non completate  
**Quando** seleziono il filtro "Completate"  
**Allora** vengono visualizzate solo le task completate  
**E** il filtro "Completate" appare come attivo/selezionato  
**E** le task attive sono nascoste  
**E** l'ordine per data di creazione è mantenuto

### Scenario 4: Nessun risultato per filtro attivo
**Dato che** seleziono il filtro "Completate"  
**E** non ho task completate  
**Quando** visualizzo la lista  
**Allora** vedo il messaggio "Nessuna attività completata"  
**E** il campo input rimane visibile

### Scenario 5: Interazione durante filtro attivo
**Dato che** ho il filtro "Attive" selezionato  
**Quando** marco una task attiva come completata  
**Allora** la task scompare dalla vista filtrata  
**E** il contatore si aggiorna  
**E** la task rimane nel sistema (visibile con filtro "Tutte")

### Scenario 6: Persistenza filtro selezionato
**Dato che** ho selezionato un filtro specifico  
**E** chiudo l'applicazione  
**Quando** riapro l'applicazione  
**Allora** il filtro "Tutte" è selezionato per default  
(Comportamento alternativo: può essere mantenuto l'ultimo filtro selezionato)

### Scenario 7: Cambio rapido tra filtri
**Dato che** ho task in diversi stati  
**Quando** cambio rapidamente tra i vari filtri  
**Allora** la lista si aggiorna immediatamente  
**E** mostra i dati corretti per ogni filtro  
**E** non si verificano ritardi o glitch visivi

## Dettagli Tecnici
- Barra filtri con 3 pulsanti: Tutte, Attive, Completate
- Indicazione visiva del filtro attualmente attivo
- Filtraggio lato client (non richiede chiamate al backend)
- Mantenimento ordine per data di creazione in ogni filtro
- Messaggi informativi appropriati per ogni caso

## Priorità
**Media** - Migliora l'usabilità ma non è critica

## Stima
3 Story Points

## Dipendenze
- US001 (Creazione Task)
- US002 (Visualizzazione Task)
- US003 (Completamento Task)
