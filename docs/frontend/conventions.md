# Convenzioni di Codice Frontend (React + TypeScript)

## Naming Conventions

### Componenti
- **PascalCase** per componenti React
- File `.tsx` per componenti con JSX
- Esempi: `TaskList.tsx`, `TaskItem.tsx`, `App.tsx`

### Hook Custom
- **camelCase** con prefisso `use`
- File `.ts` o `.tsx`
- Esempi: `useTaskFilter.ts`, `useFetchTasks.ts`, `useDebounce.ts`

### Utilities
- **camelCase** per funzioni utility
- File `.ts`
- Esempi: `formatDate.ts`, `validateTask.ts`, `apiClient.ts`

### Costanti
- **UPPER_SNAKE_CASE** per costanti globali
- Esempi: `MAX_TITLE_LENGTH`, `API_BASE_URL`, `CACHE_DURATION`

### Interfacce e Types
- **PascalCase** per interfacce e tipi
- Prefisso `I` per interfacce
- Esempi: `ITask`, `TaskProps`, `CreateTaskDto`

## Struttura Progetto

```
frontend/
├── src/
│   ├── components/           # Componenti React
│   │   ├── TaskList/
│   │   │   ├── TaskList.tsx
│   │   │   ├── TaskList.module.css
│   │   │   └── TaskList.test.tsx
│   │   ├── TaskItem/
│   │   │   ├── TaskItem.tsx
│   │   │   ├── TaskItem.module.css
│   │   │   └── TaskItem.test.tsx
│   │   ├── TaskInput/
│   │   └── ErrorBoundary/
│   │
│   ├── hooks/                # Custom hooks
│   │   ├── useTaskFilter.ts
│   │   ├── useFetchTasks.ts
│   │   └── useDebounce.ts
│   │
│   ├── services/             # API calls
│   │   └── taskService.ts
│   │
│   ├── types/                # TypeScript types/interfaces
│   │   └── task.ts
│   │
│   ├── utils/                # Utility functions
│   │   ├── errorHandler.ts
│   │   └── formatDate.ts
│   │
│   ├── constants/            # Costanti globali
│   │   └── api.ts
│   │
│   ├── context/              # React Context
│   │   └── TaskContext.tsx
│   │
│   ├── App.tsx               # Componente principale
│   ├── main.tsx              # Entry point
│   └── vite-env.d.ts
│
├── public/                   # Asset statici
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── .env                      # Environment variables
```

## Principi di Sviluppo

### Componenti Funzionali con Hooks
- Usa sempre componenti funzionali, non class components
- Sfrutta React Hooks (useState, useEffect, useCallback, useMemo)
- Un componente per file

### Props Tipizzate
- Sempre tipi TypeScript espliciti per props
- Usa interfacce per props complesse

```typescript
interface TaskItemProps {
  task: ITask;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  // ...
};
```

### Componenti Controllati per Form
- Usa componenti controllati con state per form
- React Hook Form per form complessi

### Custom Hooks per Logica Riutilizzabile
- Estrai logica riutilizzabile in custom hooks
- Prefisso `use` obbligatorio

## Commenti

- Commenti in **italiano** per logica di business
- JSDoc in **inglese** per funzioni esportate pubblicamente
- Evita commenti ovvi

```typescript
// Gestisce il doppio click sul task per entrare in modalità modifica
const handleDoubleClick = () => {
  setIsEditing(true);
};

/**
 * Formats a date string to Italian locale
 * @param date - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('it-IT');
};
```

## TypeScript

### Strict Mode
- Abilita `strict: true` in `tsconfig.json`
- No uso di `any`, preferisci `unknown` se necessario
- Definisci interfacce per tutti gli oggetti complessi

```typescript
// ✅ BUONO
interface ITask {
  id: string;
  title: string;
  completed: boolean;
}

const task: ITask = { id: '1', title: 'Test', completed: false };

// ❌ EVITA
const task: any = { id: '1', title: 'Test', completed: false };
```

## Riferimenti

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
