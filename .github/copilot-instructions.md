
<!-- Copilot instructions: conciso e specifico per il repository iad2025 -->

# Copilot instructions (italiano)

Obiettivo: fornire a Copilot il contesto operativo minimo per essere subito produttivo.

- Architettura: backend .NET 8 (Clean Architecture: `backend/TodoApp.API`, `TodoApp.Core`, `TodoApp.Infrastructure`), frontend React+TS in `frontend/`.
- Persistenza: PostgreSQL via EF Core; migrazioni in `backend/TodoApp.Infrastructure/Migrations`.
- Convenzioni principali: codice C# in PascalCase, DI via costruttore, validator con FluentValidation; React usa functional components, `useXxx` hooks, React Hook Form + Zod per i form.

- Workflow rapido:
  - Backend: `cd backend/TodoApp.API && dotnet build` / `dotnet test`.
  - Frontend: `cd frontend && npm install` then `npm run dev` / `npm run test`.
  - Migrazioni DB: esegui da progetto Infrastructure: `dotnet ef database update`.

- Pattern e file da consultare:
  - `docs/OVERVIEW.md` per architettura completa.
  - `docs/backend/conventions.md` e `docs/frontend/conventions.md` per regole di stile.
  - `TODO_APP_SPECS.md` per requisiti funzionali (usa questi per le user stories).

- Integrazioni e limitazioni note:
  - Non aggiungere dipendenze a pagamento; tutte le librerie devono essere open source.
  - Evitare di inserire segreti o credenziali nel codice.

- Esempi di prompt mirati (usa i path indicati):
  - "Aggiungi DTO C# in `backend/TodoApp.Core/Dtos/TaskDto.cs` con Id, Title, IsCompleted, CreatedAt seguendo le convenzioni del repo."
  - "Scrivi un `FluentValidation` validator per `CreateTaskDto` in `backend/TodoApp.API/Validators/` con messaggi in italiano." 
  - "Crea il componente `frontend/src/components/TaskItem.tsx` che riceve `task: Task` e gestisce toggle/delete; includi test Vitest in `frontend/src/__tests__/`."

- Esempi pratici da non cambiare:
  - Mantieni la struttura Clean Architecture (non spostare logica domain in Presentation).
  - Segui i nomi di file e percorsi esistenti per Dependency Injection e registrazioni nei `Program.cs`.

- Commit & PR:
  - Messaggi in italiano, seguire Conventional Commits (es. `feat(tasks): aggiunge endpoint toggle`).

Se vuoi, posso rendere questa versione bilingue (IT/EN) o estrarre mini-prompts per attività comuni (DTO, Validator, Endpoint, Component).

## File specialistici (link)

- `.github/instructions/csharp.instructions.md` — linee guida C#/.NET per questo repo: pattern Clean Architecture, EF Core, migrazioni e FluentValidation; contiene snippet ed esempi da usare come prompt.
- `.github/instructions/reactjs.instructions.md` — best practice React+TypeScript, convenzioni componenti, hooks (`useXxx`), testing con Vitest e esempi di prompt per componenti e test.
- `.github/instructions/taming-copilot.instructions.md` — regole operative per l'uso di Copilot nel repository: cosa evitare, come strutturare i prompt, e convenzioni per commit/PR quando si usa l'assistente.

Mantieni aggiornati questi file specialistici quando aggiungi nuovi pattern o prompt; il file principale rimane il punto d'ingresso per Copilot e i nuovi collaboratori.
