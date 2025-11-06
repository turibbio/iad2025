# Workflow di Sviluppo

## Prima di Iniziare

1. Sincronizza il fork:

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

2. Leggi le specifiche in `TODO_APP_SPECS.md`
3. Controlla le issue aperte

## Durante lo Sviluppo

1. Crea branch descrittivo:

```bash
git checkout -b feature/nome-funzionalita
# oppure
git checkout -b fix/nome-bug
```

2. Sviluppa con commit atomici:

```bash
git add .
git commit -m "feat: aggiunge funzionalità X"
```

3. Esegui test:

```bash
# Backend
dotnet test

# Frontend
npm test
```

4. Push sul fork:

```bash
git push origin feature/nome-funzionalita
```

5. Apri Pull Request dal fork al repository principale
