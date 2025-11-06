# CLAUDE.md

Questo file fornisce indicazioni a Claude Code (claude.ai/code) quando lavora con il codice in questo repository.

## Panoramica Rapida

Questo è il repository per la sessione Agile Day 2025 "Claude, Copilot, Gemini... e io in mezzo a loro" di Antonio Liccardi. Contiene un'applicazione TODO full-stack (.NET 8 + React 18 + TypeScript) come caso di studio pratico per esplorare l'uso di assistenti AI nello sviluppo software agile.

### Stack Tecnologico

**Backend**: .NET 8, ASP.NET Core, Entity Framework Core, PostgreSQL, FluentValidation
**Frontend**: React 18, TypeScript, Vite, Axios, React Hook Form, Zod
**Testing**: xUnit/Moq, Vitest/React Testing Library
**DevOps**: Git Flow, GitHub Actions, Docker

**IMPORTANTE**: Utilizzare **esclusivamente librerie open source gratuite**. Nessuna dipendenza a pagamento.

### Lingua

La lingua principale del repository è l'**italiano**:
- Documentazione, commenti e commit messages in italiano
- Codice segue convenzioni standard (nomi in inglese)

## Documentazione Completa

**Tutta la documentazione dettagliata è disponibile in [`docs/`](docs/README.md)**

### 🔧 Backend Development

- **[Backend Overview](docs/backend/README.md)** - Panoramica stack backend
- **[Convenzioni Codice](docs/backend/conventions.md)** - Naming, struttura progetto, principi Clean Architecture
- **[Esempi di Codice](docs/backend/code-examples.md)** - Buone pratiche C# con confronti
- **[Database & Persistenza](docs/backend/database.md)** - Entity Framework Core, entità, validazioni
- **[Gestione Errori](docs/backend/error-handling.md)** - Custom exceptions, global handler
- **[Performance](docs/backend/performance.md)** - Ottimizzazioni DB, caching, async/await

### 💻 Frontend Development

- **[Frontend Overview](docs/frontend/README.md)** - Panoramica stack frontend
- **[Convenzioni Codice](docs/frontend/conventions.md)** - Naming, struttura progetto, TypeScript strict
- **[Esempi di Codice](docs/frontend/code-examples.md)** - Buone pratiche React/TypeScript
- **[Gestione Stato](docs/frontend/state-management.md)** - API service layer, React Context
- **[Gestione Errori](docs/frontend/error-handling.md)** - Error Boundary, API error handling
- **[Performance](docs/frontend/performance.md)** - Memoization, debouncing, lazy loading

### ✅ Quality & Testing

- **[Quality Overview](docs/quality/README.md)** - Panoramica testing e qualità
- **[Testing Backend](docs/quality/testing-backend.md)** - xUnit, unit test, integration test
- **[Testing Frontend](docs/quality/testing-frontend.md)** - Vitest, React Testing Library
- **[Accessibilità](docs/quality/accessibility.md)** - WCAG 2.1 AA requirements
- **[Security](docs/quality/security.md)** - Input validation, XSS, CORS, SQL injection

### 🔄 Workflow & Contribution

- **[Workflow Overview](docs/workflow/README.md)** - Panoramica workflow contribuzione
- **[Setup Iniziale](docs/workflow/setup.md)** - Fork, clone, configurazione environment
- **[Development Workflow](docs/workflow/development.md)** - Branch creation, commit atomici
- **[Pull Request Guidelines](docs/workflow/pull-requests.md)** - Template, checklist, best practices
- **[Conventional Commits](docs/workflow/conventional-commits.md)** - Formato commit messages

### 📋 User Stories

- **[User Stories Guide](docs/user-stories/README.md)** - Guida completa alla generazione
- **[Processo di Analisi](docs/user-stories/process.md)** - Come analizzare le specifiche
- **[Formato & Criteri](docs/user-stories/format.md)** - Formato standard, Given-When-Then
- **[Prioritizzazione](docs/user-stories/prioritization.md)** - P0-P3, epic, dipendenze
- **[Esempi](docs/user-stories/examples.md)** - Esempio completo US-001

### 🛠️ Risorse Generali

- **[Repository Overview](docs/OVERVIEW.md)** - Panoramica completa repository e architettura
- **[Troubleshooting](docs/troubleshooting.md)** - Soluzioni problemi comuni (backend, frontend, database)
- **[Riferimenti](docs/references.md)** - Link a documentazione ufficiale, pattern, tools

## Convenzioni Rapide

### Backend (.NET)

**Naming**: Classes/Methods PascalCase, parameters/variables camelCase
**Architecture**: Clean Architecture (Domain → Application → Infrastructure → Presentation)
**Dependency Injection**: Tutte le dipendenze iniettate via costruttore
**Repository Pattern**: Astrazione dell'accesso dati
**Validation**: FluentValidation per validazioni complesse
**Testing**: xUnit + Moq, coverage > 80% per funzioni core

**Struttura**:
```
backend/
├── TodoApp.API/          # Controllers, Program.cs
├── TodoApp.Core/         # Entities, Interfaces, Services, DTOs
├── TodoApp.Infrastructure/ # DbContext, Repositories, Migrations
└── TodoApp.Tests/        # Unit & Integration tests
```

### Frontend (React + TypeScript)

**Naming**: Components PascalCase, hooks `useXxx`, utilities camelCase, constants UPPER_SNAKE_CASE
**Components**: Funzionali con hooks, un componente per file, props tipizzate
**State**: React Context API per app semplici, Zustand per complesse
**Forms**: React Hook Form + Zod per validation
**Testing**: Vitest + React Testing Library, coverage > 80%

**Struttura**:
```
frontend/src/
├── components/    # Componenti React (TaskList, TaskItem, etc.)
├── hooks/         # Custom hooks (useTaskFilter, useDebounce)
├── services/      # API calls (taskService.ts)
├── types/         # TypeScript interfaces
├── utils/         # Utility functions
├── context/       # React Context providers
└── App.tsx
```

### General

**Commenti**: Italiano per logica di business, XML docs/JSDoc in inglese per metodi pubblici
**Specifiche**: Vedi `TODO_APP_SPECS.md` per funzionalità complete app TODO
**User Stories**: Generate in `USER_STORIES.md` seguendo formato standard

## Inizio Rapido

### Per Sviluppatori

1. **Leggi** [Repository Overview](docs/OVERVIEW.md) per contesto generale
2. **Setup** ambiente seguendo [Setup Guide](docs/workflow/setup.md)
3. **Consulta** convenzioni per [Backend](docs/backend/conventions.md) o [Frontend](docs/frontend/conventions.md)
4. **Segui** il [Development Workflow](docs/workflow/development.md) (fork, branch, commit, PR)
5. **Controlla** [Troubleshooting](docs/troubleshooting.md) se incontri problemi

### Per Generare User Stories

1. **Leggi** [User Stories Guide](docs/user-stories/README.md)
2. **Analizza** le specifiche con [Process & Analysis](docs/user-stories/process.md)
3. **Usa** il [Formato Standard](docs/user-stories/format.md) (Given-When-Then)
4. **Consulta** [Esempi Completi](docs/user-stories/examples.md) per riferimento

### Per Testing

**Backend**: Vedi [Testing Backend](docs/quality/testing-backend.md) per xUnit examples
**Frontend**: Vedi [Testing Frontend](docs/quality/testing-frontend.md) per Vitest/RTL examples

## Architettura

### Backend - Clean Architecture

```
API Controllers (HTTP)
        ↓
Services (Business Logic)
        ↓
Repositories (Data Access)
        ↓
Database (PostgreSQL)
```

**Dipendenze**: Sempre verso l'interno (verso il dominio), mai verso l'esterno.

### Frontend - Component-Based

```
App
 ├── TaskProvider (Context)
 │    ├── TaskList
 │    │    └── TaskItem
 │    └── TaskInput
 └── ErrorBoundary
```

## Specifiche Applicazione TODO

L'applicazione TODO implementa:

- ✅ **CRUD completo**: Creare, visualizzare, modificare, eliminare task
- ✅ **Filtri**: Visualizza tutti/attivi/completati
- ✅ **Validazioni**: Titoli obbligatori, univoci, max 100 caratteri
- ✅ **Persistenza**: Database PostgreSQL
- ✅ **API REST**: Endpoint conformi a convenzioni REST
- ✅ **UI Responsive**: Interfaccia moderna con React

**Dettagli completi**: Vedi [`TODO_APP_SPECS.md`](TODO_APP_SPECS.md)

## Contesto della Sessione

Questo repository è materiale educativo per la sessione Agile Day 2025 che dimostra:

- Come gli AI assistant aiutano nella generazione di codice
- Pattern architetturali moderni (.NET + React)
- Best practices di sviluppo full-stack
- Workflow di sviluppo agile con AI

L'applicazione TODO serve come caso di studio concreto per esplorare punti di forza, limitazioni e best practices quando si lavora con strumenti come Copilot, Claude e Gemini in progetti reali.

---

**Versione**: 1.0
**Ultimo aggiornamento**: Gennaio 2025
**Maintainer**: Antonio Liccardi
**Licenza**: MIT

**Per documentazione dettagliata**, consulta la [Documentazione Completa](docs/README.md)
