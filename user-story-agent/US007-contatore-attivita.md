# US007 - Contatore Attività

## User Story
**Come** utente dell'applicazione TODO  
**Voglio** vedere il numero di attività attive rimanenti  
**Così che** possa avere una visione immediata del mio carico di lavoro

## Criteri di Accettazione

### Scenario 1: Visualizzazione contatore con task attive
**Dato che** ho 5 task non completate e 3 task completate  
**Quando** visualizzo il footer dell'applicazione  
**Allora** vedo il testo "5 attività rimanenti" (o "5 elementi rimanenti")  
**E** il contatore è sempre visibile nel footer

### Scenario 2: Aggiornamento automatico del contatore
**Dato che** il contatore mostra "5 attività rimanenti"  
**Quando** marco una task come completata  
**Allora** il contatore si aggiorna a "4 attività rimanenti"  
**E** l'aggiornamento è immediato e visibile

### Scenario 3: Contatore con una sola attività
**Dato che** ho 1 task non completata  
**Quando** visualizzo il footer  
**Allora** vedo il testo "1 attività rimanente" (singolare)  
**E** la forma grammaticale è corretta

### Scenario 4: Contatore con zero attività
**Dato che** tutte le mie task sono completate o non ho task  
**Quando** visualizzo il footer  
**Allora** vedo il testo "0 attività rimanenti" o "Nessuna attività rimanente"  
**E** il contatore rimane visibile

### Scenario 5: Contatore durante creazione task
**Dado che** il contatore mostra "3 attività rimanenti"  
**Quando** creo una nuova task  
**Allora** il contatore si aggiorna a "4 attività rimanenti"  
**E** l'aggiornamento è automatico e immediato

### Scenario 6: Contatore durante eliminazione task
**Dado che** il contatore mostra "5 attività rimanenti"  
**Quando** elimino una task non completata  
**Allora** il contatore si aggiorna a "4 attività rimanenti"  
**Quando** elimino una task completata  
**Allora** il contatore rimane a "4 attività rimanenti"

### Scenario 7: Contatore con filtri attivi
**Dado che** il contatore mostra "5 attività rimanenti"  
**Quando** attivo un filtro (es. "Completate")  
**Allora** il contatore continua a mostrare "5 attività rimanenti"  
**E** il valore rappresenta sempre il totale delle attività non completate, indipendentemente dal filtro

## Dettagli Tecnici
- Visualizzazione nel footer dell'applicazione
- Conteggio solo delle task non completate
- Aggiornamento automatico in tempo reale
- Forma grammaticale corretta (singolare/plurale)
- Sempre visibile, indipendentemente dal filtro attivo

## Priorità
**Media** - Migliora l'esperienza utente

## Stima
2 Story Points

## Dipendenze
- US001 (Creazione Task)
- US002 (Visualizzazione Task)
- US003 (Completamento Task)
- US005 (Eliminazione Task)
