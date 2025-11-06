# US003 - Completamento Task

## User Story
**Come** utente dell'applicazione TODO  
**Voglio** marcare un'attività come completata o non completata  
**Così che** possa tracciare i miei progressi

## Criteri di Accettazione

### Scenario 1: Completamento di una task attiva
**Dato che** ho una task con stato "non completata"  
**Quando** clicco sul checkbox della task  
**Allora** lo stato della task diventa "completata"  
**E** il titolo della task viene visualizzato con stile barrato  
**E** il checkbox viene marcato come selezionato  
**E** il contatore delle attività attive diminuisce di 1  
**E** la modifica viene salvata automaticamente

### Scenario 2: Riattivazione di una task completata
**Dato che** ho una task con stato "completata"  
**Quando** clicco sul checkbox della task  
**Allora** lo stato della task diventa "non completata"  
**E** il titolo della task torna allo stile normale  
**E** il checkbox viene deselezionato  
**E** il contatore delle attività attive aumenta di 1  
**E** la modifica viene salvata automaticamente

### Scenario 3: Toggle rapido dello stato
**Dato che** ho una task  
**Quando** clicco più volte sul checkbox in rapida successione  
**Allora** lo stato si alterna correttamente tra completata e non completata  
**E** l'interfaccia si aggiorna immediatamente  
**E** non si verificano conflitti di stato

### Scenario 4: Persistenza dello stato completamento
**Dato che** ho marcato una task come completata  
**E** chiudo l'applicazione  
**Quando** riapro l'applicazione  
**Allora** la task mantiene lo stato "completata"  
**E** viene visualizzata con stile barrato

## Dettagli Tecnici
- Interazione tramite click su checkbox
- Aggiornamento immediato dello stile visivo
- Salvataggio automatico in persistenza locale
- Aggiornamento automatico del contatore attività attive

## Priorità
**Alta** - Funzionalità core fondamentale

## Stima
2 Story Points

## Dipendenze
- US001 (Creazione Task)
- US002 (Visualizzazione Task)
