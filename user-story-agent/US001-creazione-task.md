# US001 - Creazione Task

## User Story
**Come** utente dell'applicazione TODO  
**Voglio** creare una nuova attività inserendo un titolo  
**Così che** possa tracciare le mie attività da completare

## Criteri di Accettazione

### Scenario 1: Creazione task con successo
**Dato che** sono nella pagina principale dell'applicazione  
**Quando** inserisco un titolo valido nel campo input e premo Enter  
**Allora** la nuova task viene aggiunta alla lista  
**E** il campo input viene svuotato  
**E** la task appare in cima alla lista (ordine per data di creazione)  
**E** la task ha uno stato iniziale "non completata"  
**E** viene assegnato un ID univoco alla task  
**E** viene registrata la data di creazione

### Scenario 2: Tentativo di creazione task vuota
**Dato che** sono nella pagina principale  
**Quando** provo a creare una task senza inserire un titolo  
**Allora** la task non viene creata  
**E** viene mostrato un messaggio di errore "Il titolo non può essere vuoto"

### Scenario 3: Tentativo di creazione task duplicata
**Dato che** esiste già una task con titolo "Comprare il latte"  
**Quando** provo a creare una nuova task con lo stesso titolo  
**Allora** la task non viene creata  
**E** viene mostrato un messaggio di errore "Esiste già una task con questo titolo"

### Scenario 4: Creazione task con titolo troppo lungo
**Dato che** sono nella pagina principale  
**Quando** inserisco un titolo che supera la lunghezza massima consentita  
**Allora** la task non viene creata  
**E** viene mostrato un messaggio di errore con la lunghezza massima consentita

## Dettagli Tecnici
- Campo input sempre visibile e accessibile
- Validazione titolo: non vuoto, non duplicato, lunghezza massima
- Salvataggio automatico in persistenza locale
- Generazione automatica ID univoco e timestamp

## Priorità
**Alta** - Funzionalità core fondamentale

## Stima
3 Story Points

## Dipendenze
Nessuna - Prima user story da implementare
