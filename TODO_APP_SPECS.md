# Specifiche Funzionali - App TODO

## 1. Panoramica
Applicazione per la gestione di attività (TODO) che permette agli utenti di organizzare e tracciare le proprie task quotidiane.

## 2. Funzionalità Core

### 2.1 Gestione Task
- **Creazione task**: l'utente può creare una nuova attività inserendo un titolo
- **Visualizzazione task**: l'utente può vedere l'elenco di tutte le attività
- **Modifica task**: l'utente può modificare il titolo di un'attività esistente
- **Eliminazione task**: l'utente può eliminare un'attività
- **Completamento task**: l'utente può marcare un'attività come completata o non completata

### 2.2 Proprietà Task
Ogni task deve contenere:
- **Titolo**: testo descrittivo dell'attività (obbligatorio)
- **Stato**: completata/non completata
- **Data creazione**: timestamp automatico alla creazione
- **ID univoco**: identificatore univoco per ogni task

### 2.3 Organizzazione e Filtri
- **Visualizzazione tutte**: mostra tutte le attività
- **Filtro attive**: mostra solo le attività non completate
- **Filtro completate**: mostra solo le attività completate
- **Contatore attività**: visualizza il numero di attività attive rimanenti

### 2.4 Operazioni Bulk
- **Seleziona tutto**: permette di marcare tutte le attività come completate
- **Cancella completate**: rimuove tutte le attività già completate dall'elenco

## 3. Interfaccia Utente

### 3.1 Componenti Principali
- **Input field**: campo di inserimento per nuove attività
- **Lista task**: visualizzazione ordinata delle attività
- **Item task**: singola riga con checkbox, titolo e pulsante elimina
- **Barra filtri**: pulsanti per filtrare la visualizzazione
- **Footer**: mostra statistiche e azioni bulk

### 3.2 Interazioni
- Click sul checkbox per toggle dello stato completato
- Double-click sul titolo per entrare in modalità modifica
- Pulsante elimina (X) per rimuovere singola task
- Enter per confermare inserimento/modifica
- Escape per annullare modifica

## 4. Persistenza Dati
- I dati devono essere persistiti localmente (localStorage, database locale)
- Le modifiche devono essere salvate automaticamente
- Al riavvio dell'app, i dati devono essere ripristinati

## 5. Validazioni
- Il titolo della task non può essere vuoto
- Non è possibile creare task duplicate con lo stesso titolo
- Il titolo deve avere una lunghezza massima definita

## 6. Comportamenti Speciali
- Le task completate possono essere visualizzate con stile barrato
- L'ordine di visualizzazione è per data di creazione (più recenti in alto)
- L'input field deve essere sempre visibile e accessibile
- Il contatore deve aggiornarsi automaticamente ad ogni modifica

## 7. Stati dell'Applicazione
- **Lista vuota**: messaggio informativo quando non ci sono task
- **Nessun risultato filtro**: messaggio quando un filtro non restituisce risultati
- **Modalità modifica**: stato temporaneo durante la modifica di una task
