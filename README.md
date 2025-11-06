# Italian Agile Day 2025 - Claude, Copilot, Gemini... e io in mezzo a loro

Repository per la sessione Agile Day 2025 di **Antonio Liccardi**. Contiene un'applicazione TODO full-stack (.NET 8 + React 18 + TypeScript) come caso di studio pratico per esplorare l'uso di assistenti AI nello sviluppo software agile.

## Descrizione

Questo repository raccoglie esempi, risorse e materiale di supporto utilizzati durante la sessione. L'obiettivo è condividere esperienze pratiche sull'uso degli assistenti di programmazione basati su AI, evidenziandone punti di forza, limiti e buone pratiche.

### Abstract della Sessione

L'intelligenza artificiale è entrata nei nostri IDE come una nuova presenza silenziosa e potentissima. Ma come si lavora davvero con strumenti come Copilot, Claude o Gemini? In questo talk racconto la mia esperienza concreta in un progetto reale, tra dubbi, scoperte e piccole crisi quotidiane. Non una celebrazione dell'AI, ma un confronto onesto: cosa funziona, cosa no, e come usare questi strumenti senza perdere il controllo del codice... e del mestiere!

## Argomenti Trattati

- Introduzione agli assistenti di programmazione basati su AI
- Esperienze pratiche con Copilot, Claude e Gemini
- Vantaggi e limiti nell'uso quotidiano
- Buone pratiche per integrare l'AI nel flusso di lavoro di sviluppo
- Riflessioni etiche e professionali sull'uso dell'AI nel coding

## Stack Tecnologico

### Backend (.NET)
- **Framework**: .NET 8+ (ASP.NET Core)
- **API**: REST API con controller
- **Database**: PostgreSQL 16
- **ORM**: Entity Framework Core con Npgsql
- **Validazione**: FluentValidation
- **Testing**: xUnit, Moq, FluentAssertions
- **Documentazione**: Swagger/OpenAPI

### Frontend (React)
- **Framework**: React 18+
- **Language**: TypeScript (strict mode)
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod
- **Testing**: Vitest, React Testing Library
- **Styling**: CSS (moderno)

### DevOps
- **Version Control**: Git con Git Flow
- **CI/CD**: GitHub Actions
- **Container**: Docker + Docker Compose
- **Database**: PostgreSQL in Docker

**IMPORTANTE**: Tutte le librerie sono **open source e gratuite**. Nessuna dipendenza commerciale.

## Struttura del Repository

```
iad2025/
├── README.md                    # Questo file
├── CLAUDE.md                    # Istruzioni per Claude Code
├── CONTRIBUTING.md              # Linee guida contribuzione
├── TODO_APP_SPECS.md            # Specifiche funzionali app TODO
├── USER_STORIES_STATUS.md       # Stato implementazione user stories
├── LICENSE                      # Licenza MIT
├── docker-compose.yml           # Setup PostgreSQL
├── iad2025.sln                  # Solution .NET
│
├── src/
│   ├── backend/                 # Applicazione .NET
│   │   ├── TodoApp.API/         # Controllers, Program.cs
│   │   ├── TodoApp.Core/        # Entities, Interfaces, Services, DTOs
│   │   ├── TodoApp.Infrastructure/  # DbContext, Repositories, Migrations
│   │   └── TodoApp.Tests/       # Unit & Integration tests
│   │
│   └── frontend/                # Applicazione React
│       ├── src/
│       │   ├── components/      # Componenti React
│       │   ├── hooks/           # Custom hooks
│       │   ├── services/        # API calls
│       │   ├── types/           # TypeScript interfaces
│       │   └── utils/           # Utility functions
│       ├── package.json
│       └── vite.config.ts
│
├── docs/                        # Documentazione dettagliata
│   ├── README.md                # Indice documentazione
│   ├── OVERVIEW.md              # Panoramica repository
│   ├── backend/                 # Docs backend (.NET)
│   ├── frontend/                # Docs frontend (React)
│   ├── quality/                 # Testing, accessibility, security
│   ├── workflow/                # Git flow, PR guidelines
│   └── user-stories/            # Generazione user stories
│
├── user-stories-claude/         # User stories generate con Claude
├── user-stories-copilot/        # User stories generate con Copilot
├── user-story-agent/            # User stories generate con agenti
│
├── .github/
│   ├── workflows/               # GitHub Actions CI/CD
│   └── copilot-instructions.md  # Istruzioni per GitHub Copilot
│
└── utils/                       # Risorse ausiliarie (QR code, etc.)
```

## Applicazione TODO - Specifiche

L'applicazione TODO implementa le seguenti funzionalità:

### Funzionalità Core
- **Gestione Task**: Create, Read, Update, Delete (CRUD completo)
- **Proprietà Task**: ID, Titolo, Stato (completata/non completata), Data creazione
- **Filtri**: Visualizza tutti/attivi/completati
- **Operazioni Bulk**: Seleziona tutto, Cancella completate
- **Contatore**: Numero di attività attive rimanenti

### Validazioni
- Titolo obbligatorio e non vuoto
- Titolo univoco (no duplicati)
- Lunghezza massima titolo: 100 caratteri

### Persistenza
- Database PostgreSQL
- API REST con ASP.NET Core
- Frontend React con chiamate API via Axios

Dettagli completi in [TODO_APP_SPECS.md](TODO_APP_SPECS.md).

## Architettura

### Backend: Clean Architecture

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

**Layer**:
- `TodoApp.API` → Presentation layer (Controllers)
- `TodoApp.Core` → Domain + Application layer (Entities, Services, DTOs)
- `TodoApp.Infrastructure` → Infrastructure layer (DbContext, Repositories)
- `TodoApp.Tests` → Testing layer

### Frontend: Component-Based Architecture

```
App
 ├── TaskProvider (Context)
 │    ├── TaskList
 │    │    └── TaskItem
 │    └── TaskInput
 └── ErrorBoundary
```

## Quick Start

### Prerequisiti

- **.NET 8 SDK** o superiore
- **Node.js 18+** e **npm**
- **Docker Desktop** (per PostgreSQL)
- **Git**

### Setup del Progetto

1. **Clona il repository** (o fai fork e clona il tuo fork):

```bash
git clone https://github.com/<username>/iad2025.git
cd iad2025
```

2. **Avvia PostgreSQL** con Docker:

```bash
docker-compose up -d
```

3. **Setup Backend**:

```bash
cd src/backend/TodoApp.API
dotnet restore
dotnet ef database update
dotnet run
```

API disponibile su: `http://localhost:5000` (o porta configurata)
Swagger UI: `http://localhost:5000/swagger`

4. **Setup Frontend**:

```bash
cd src/frontend
npm install
npm run dev
```

App disponibile su: `http://localhost:5173`

### Esecuzione Test

**Backend**:
```bash
cd src/backend/TodoApp.Tests
dotnet test
```

**Frontend**:
```bash
cd src/frontend
npm test
```

## Documentazione

La documentazione completa è organizzata in [`docs/`](docs/):

### Per Sviluppatori
- [Repository Overview](docs/OVERVIEW.md) - Panoramica generale
- [Backend Development](docs/backend/) - Convenzioni .NET, esempi, database, performance
- [Frontend Development](docs/frontend/) - Convenzioni React/TS, state management, performance
- [Quality & Testing](docs/quality/) - Testing backend/frontend, accessibility, security
- [Workflow](docs/workflow/) - Setup, Git flow, Pull Request guidelines
- [Troubleshooting](docs/troubleshooting.md) - Soluzioni problemi comuni

### Per Claude Code
- [CLAUDE.md](CLAUDE.md) - Istruzioni complete per Claude Code (AI assistant)

### Per GitHub Copilot
- [.github/copilot-instructions.md](.github/copilot-instructions.md) - Istruzioni per GitHub Copilot

### User Stories
- [User Stories Guide](docs/user-stories/) - Generazione, formato, prioritizzazione
- [USER_STORIES_STATUS.md](USER_STORIES_STATUS.md) - Stato implementazione

## Lingua

La lingua principale del repository è l'**italiano**:

- ✅ Documentazione in italiano
- ✅ Commenti in italiano (per logica di business)
- ✅ Messaggi di commit in italiano (Conventional Commits)
- ℹ️ Codice segue convenzioni inglesi standard (nomi variabili, funzioni, classi)

## Contribuire

Questo repository è pubblico. Per contribuire, usa il **workflow tramite fork**:

1. **Fai fork** del repository nel tuo account GitHub
2. **Clona** il tuo fork in locale
3. **Crea una branch** con nome descrittivo (`feature/nome-funzionalita`, `fix/nome-bug`)
4. **Implementa** le modifiche con commit chiari e atomici
5. **Apri una Pull Request** dal tuo fork verso il repository principale

Segui le [Linee guida per contribuire](CONTRIBUTING.md) per dettagli completi.

### Stile dei Commit

Usa **Conventional Commits** in italiano:

```
feat: aggiunge filtro per task completate
fix: corregge validazione titolo duplicato
docs: aggiorna README con setup Docker
test: aggiunge test per TaskService
```

Vedi [docs/workflow/conventional-commits.md](docs/workflow/conventional-commits.md) per dettagli.

## Contesto Educativo

Questo repository dimostra:

- ✅ Come gli AI assistant aiutano nella generazione di codice
- ✅ Pattern architetturali moderni (.NET + React)
- ✅ Best practices di sviluppo full-stack
- ✅ Workflow di sviluppo agile con AI
- ✅ Testing automatizzato e CI/CD
- ✅ Clean Architecture e separation of concerns

L'applicazione TODO serve come caso di studio concreto per esplorare:
- Punti di forza e limitazioni degli AI coding assistants
- Best practices quando si lavora con strumenti come Copilot, Claude e Gemini
- Come mantenere il controllo del codice in progetti reali

## Licenza

Questo progetto è rilasciato sotto licenza **MIT**. Vedi [LICENSE](LICENSE) per dettagli.

Contribuendo al repository accetti che il tuo contributo venga rilasciato sotto la stessa licenza.

## Contatti

**Speaker**: Antonio Liccardi

Per domande, chiarimenti o segnalazioni:
- Apri un'**issue** su GitHub
- Contatta lo speaker tramite i canali Agile Day 2025

---

**Versione**: 1.0
**Ultimo aggiornamento**: Novembre 2025
**Evento**: Italian Agile Day 2025

---

![QR Code Repository](./docs/repo.jpg)
