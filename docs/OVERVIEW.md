# Panoramica Repository

## Descrizione

Repository per la sessione Agile Day 2025 "Claude, Copilot, Gemini... e io in mezzo a loro" di Antonio Liccardi. Contiene un'applicazione TODO full-stack come caso di studio pratico per esplorare l'uso di assistenti AI nello sviluppo software agile.

## Struttura Repository

```
iad2025/
├── README.md                 # Documentazione principale
├── CLAUDE.md                 # Istruzioni per Claude Code
├── CONTRIBUTING.md           # Linee guida contribuzione
├── TODO_APP_SPECS.md         # Specifiche funzionali app TODO
├── LICENSE                   # Licenza MIT
├── backend/                  # API .NET 8
├── frontend/                 # App React 18 + TypeScript
├── docs/                     # Documentazione dettagliata
└── utils/                    # Risorse ausiliarie
```

## Stack Tecnologico

### Backend (.NET)
- **Framework**: .NET 8+ (ASP.NET Core)
- **API**: REST API con controller
- **Database**: PostgreSQL
- **ORM**: Entity Framework Core con Npgsql
- **Validazione**: FluentValidation
- **Testing**: xUnit, Moq, FluentAssertions
- **Documentazione**: Swagger/OpenAPI

### Frontend (React)
- **Framework**: React 18+
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules o Tailwind CSS
- **State**: React Context API o Zustand
- **HTTP**: Axios
- **Form**: React Hook Form + Zod
- **Testing**: Vitest, React Testing Library

### DevOps
- **Version Control**: Git con Git Flow
- **CI/CD**: GitHub Actions
- **Container**: Docker + Docker Compose

**IMPORTANTE**: Tutte le librerie sono **open source e gratuite**. Nessuna dipendenza commerciale.

## Lingua

La lingua principale del repository è l'**italiano**:

- ✅ Documentazione in italiano
- ✅ Commenti in italiano (logica di business)
- ✅ Messaggi di commit in italiano
- ℹ️ Codice segue convenzioni inglesi standard (nomi variabili, funzioni)

## Architettura

### Backend: Clean Architecture

```
API Controllers
     ↓
  Services (Business Logic)
     ↓
Repositories (Data Access)
     ↓
  Database (PostgreSQL)
```

### Frontend: Component-Based

```
App
 ├── TaskList
 │    └── TaskItem
 ├── TaskInput
 └── ErrorBoundary
```

## Specifiche App TODO

L'applicazione TODO implementa:

- ✅ CRUD completo task
- ✅ Filtri (tutti/attivi/completati)
- ✅ Validazioni (titoli unici, max 100 caratteri)
- ✅ Persistenza database
- ✅ API REST
- ✅ UI responsive

Dettagli completi in [`TODO_APP_SPECS.md`](../TODO_APP_SPECS.md).

## Contesto Educativo

Questo repository dimostra:

- Come gli AI assistant aiutano nella generazione di codice
- Pattern architetturali moderni (.NET + React)
- Best practices di sviluppo full-stack
- Workflow di sviluppo agile con AI

---

**Versione**: 1.0  
**Maintainer**: Antonio Liccardi  
**Licenza**: MIT
