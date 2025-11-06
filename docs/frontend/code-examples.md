# Esempi di Buone Pratiche Frontend

## Componenti React

### ✅ BUONO - Componente tipizzato con props chiare

```typescript
interface TaskItemProps {
  task: ITask;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  // Gestisce il doppio click per modifica
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (title.trim()) {
      onToggle(task.id);
      setIsEditing(false);
    }
  };

  return (
    <div className={styles.taskItem} onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        />
      ) : (
        <span className={task.completed ? styles.completed : ''}>
          {task.title}
        </span>
      )}
      <button onClick={() => onDelete(task.id)}>Elimina</button>
    </div>
  );
};
```

### ❌ EVITA - Componente senza tipi e nomi poco chiari

```typescript
const TaskItem = (props: any) => {
  return (
    <div onClick={() => props.fn(props.data.id)}>
      {props.data.t}
    </div>
  );
};
```

## Riferimenti

- [React Best Practices](https://react.dev/learn)
- [TypeScript with React](https://react-typescript-cheatsheet.netlify.app/)
