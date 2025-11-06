# Ottimizzazione Performance Frontend

## Memoization

```typescript
// Memoizza componenti costosi
const TaskItem = React.memo<TaskItemProps>(({ task, onToggle, onDelete }) => {
  // ... component logic
});

// Memoizza valori calcolati
const TaskList: React.FC<TaskListProps> = ({ tasks, filter }) => {
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    });
  }, [tasks, filter]);

  return (
    <ul>
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
```

## Debouncing Input

```typescript
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
```

## Lazy Loading

```typescript
const TaskPage = lazy(() => import('./pages/TaskPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<TaskPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Suspense>
  );
}
```

## Metriche Target

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Input Lag**: < 50ms con debouncing

## Riferimenti

- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Web Vitals](https://web.dev/vitals/)
