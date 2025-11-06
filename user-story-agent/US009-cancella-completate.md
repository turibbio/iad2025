# US009 - Cancella Completate

## User Story
**Come** utente dell'applicazione TODO  
**Voglio** eliminare tutte le attività completate con un'unica azione  
**Così che** possa ripulire la lista dalle task già fatte

## Criteri di Accettazione

### Scenario 1: Eliminazione di tutte le task completate
**Dato che** ho 3 task completate e 5 task attive  
**Quando** clicco sul pulsante "Cancella completate"  
**Allora** tutte le 3 task completate vengono eliminate  
**E** le 5 task attive rimangono nella lista  
**E** il contatore rimane a "5 attività rimanenti"  
**E** le modifiche vengono salvate automaticamente  
**E** la lista si riordina automaticamente

### Scenario 2: Cancella completate senza task completate
**Dato che** tutte le mie task sono attive (nessuna completata)  
**Quando** visualizzo l'interfaccia  
**Allora** il pulsante "Cancella completate" è disabilitato o non visibile  
**E** non posso interagire con esso

### Scenario 3: Cancella tutte (tutte completate)
**Dato che** tutte le mie task sono completate  
**Quando** clicco su "Cancella completate"  
**Allora** tutte le task vengono eliminate  
**E** viene mostrato il messaggio "Nessuna attività. Inizia creandone una!"  
**E** il contatore mostra "0 attività rimanenti"

### Scenario 4: Cancella completate con filtro "Completate" attivo
**Dado che** ho il filtro "Completate" selezionato  
**E** sono visibili solo le task completate  
**Quando** clicco su "Cancella completate"  
**Allora** tutte le task completate vengono eliminate  
**E** viene mostrato il messaggio "Nessuna attività completata"  
**E** il filtro rimane attivo

### Scenario 5: Cancella completate con filtro "Attive" attivo
**Dado che** ho il filtro "Attive" selezionato  
**E** sono visibili solo le task attive  
**Quando** clicco su "Cancella completate"  
**Allora** le task completate (nascoste dal filtro) vengono eliminate  
**E** le task visibili (attive) rimangono  
**E** la vista non cambia (perché le completate erano già nascoste)

### Scenario 6: Persistenza dopo cancellazione
**Dado che** ho cancellato tutte le task completate  
**E** chiudo l'applicazione  
**Quando** riapro l'applicazione  
**Allora** le task completate non sono più presenti  
**E** solo le task attive sono visualizzate

### Scenario 7: Visibilità pulsante
**Dado che** sto usando l'applicazione  
**Quando** creo la prima task completata  
**Allora** il pulsante "Cancella completate" diventa visibile/abilitato  
**Quando** elimino l'ultima task completata  
**Allora** il pulsante "Cancella completate" diventa nascosto/disabilitato

## Dettagli Tecnici
- Pulsante posizionato nel footer dell'applicazione
- Visibile/abilitato solo quando esistono task completate
- Eliminazione bulk di tutte le task con stato "completata"
- Salvataggio automatico dopo l'eliminazione
- Aggiornamento automatico della vista

## Priorità
**Bassa** - Operazione bulk utile per manutenzione lista

## Stima
2 Story Points

## Dipendenze
- US002 (Visualizzazione Task)
- US003 (Completamento Task)
- US005 (Eliminazione Task)
- US006 (Filtri Visualizzazione)
