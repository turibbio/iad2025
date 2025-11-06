# US008 - Seleziona Tutto

## User Story
**Come** utente dell'applicazione TODO  
**Voglio** marcare tutte le attività come completate con un'unica azione  
**Così che** possa velocemente indicare di aver completato tutto

## Criteri di Accettazione

### Scenario 1: Completamento di tutte le task attive
**Dato che** ho 5 task non completate e 2 task già completate  
**Quando** clicco sul pulsante/checkbox "Seleziona tutto"  
**Allora** tutte le 5 task attive vengono marcate come completate  
**E** le 2 task già completate rimangono completate  
**E** tutte le task vengono visualizzate con stile barrato  
**E** il contatore attività attive diventa "0 attività rimanenti"  
**E** le modifiche vengono salvate automaticamente

### Scenario 2: Deseleziona tutto
**Dato che** tutte le task sono completate  
**E** il pulsante "Seleziona tutto" è attivo/selezionato  
**Quando** clicco nuovamente sul pulsante "Seleziona tutto"  
**Allora** tutte le task vengono marcate come non completate  
**E** le task tornano allo stile normale (non barrato)  
**E** il contatore si aggiorna con il numero totale di task  
**E** le modifiche vengono salvate automaticamente

### Scenario 3: Seleziona tutto con lista vuota
**Dato che** non ho alcuna task  
**Quando** visualizzo l'interfaccia  
**Allora** il pulsante "Seleziona tutto" è disabilitato o non visibile  
**E** non posso interagire con esso

### Scenario 4: Seleziona tutto con filtro attivo
**Dado che** ho il filtro "Attive" selezionato  
**E** sono visibili solo 3 task attive  
**Quando** clicco su "Seleziona tutto"  
**Allora** tutte le task del sistema (non solo quelle visibili) vengono completate  
**E** le 3 task scompaiono dalla vista filtrata "Attive"  
**E** il contatore diventa "0 attività rimanenti"

### Scenario 5: Indicazione visiva stato "Seleziona tutto"
**Dado che** ho task attive e completate  
**Quando** tutte le task sono completate  
**Allora** il checkbox "Seleziona tutto" appare selezionato  
**Quando** almeno una task non è completata  
**Allora** il checkbox "Seleziona tutto" appare non selezionato  
(Opzionale: stato indeterminato se alcune sono completate)

### Scenario 6: Interazione dopo "Seleziona tutto"
**Dado che** ho usato "Seleziona tutto" per completare tutte le task  
**Quando** creo una nuova task  
**Allora** la nuova task è non completata  
**E** il contatore mostra "1 attività rimanente"  
**E** il checkbox "Seleziona tutto" torna allo stato non selezionato

## Dettagli Tecnici
- Controllo posizionato nell'area header o sopra la lista
- Checkbox master con comportamento toggle
- Aggiornamento bulk di tutte le task
- Salvataggio automatico di tutte le modifiche
- Gestione corretta dello stato del checkbox in base alle task

## Priorità
**Bassa** - Operazione bulk utile ma non essenziale

## Stima
2 Story Points

## Dipendenze
- US001 (Creazione Task)
- US002 (Visualizzazione Task)
- US003 (Completamento Task)
- US007 (Contatore Attività)
