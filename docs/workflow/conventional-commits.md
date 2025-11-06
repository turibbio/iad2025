# Conventional Commits

## Formato

```
<tipo>(<scope opzionale>): <descrizione breve>

<corpo opzionale>

<footer opzionale>
```

## Tipi

- `feat`: Nuova funzionalità
- `fix`: Correzione bug
- `docs`: Modifiche documentazione
- `style`: Formattazione codice
- `refactor`: Refactoring senza modifiche funzionali
- `test`: Aggiunta o modifica test
- `chore`: Manutenzione generale

## Esempi

```
feat(api): aggiunge endpoint per filtro task

Implementa GET /api/tasks?filter=completed

Closes #42
```

```
fix(frontend): corregge doppio click su task completato

Fixes #38
```

## Riferimenti

- [Conventional Commits](https://www.conventionalcommits.org/)
