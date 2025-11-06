# Gestione Stato e Comunicazione API

## Service Layer per API

```typescript
// services/taskService.ts
import axios from 'axios';
import { ITask, ICreateTaskDto } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:5001/api';

export const taskService = {
  async getAll(): Promise<ITask[]> {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    return response.data;
  },
  
  async create(dto: ICreateTaskDto): Promise<ITask> {
    const response = await axios.post(`${API_BASE_URL}/tasks`, dto);
    return response.data;
  },
  
  async update(id: string, dto: Partial<ITask>): Promise<ITask> {
    const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, dto);
    return response.data;
  },
  
  async delete(id: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/tasks/${id}`);
  }
};
```

## React Context API

```typescript
// context/TaskContext.tsx
interface ITaskContext {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (title: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // implementazione metodi...
  
  return (
    <TaskContext.Provider value={{ tasks, loading, error, /* ... */ }}>
      {children}
    </TaskContext.Provider>
  );
};
```

## Riferimenti

- [React Context](https://react.dev/reference/react/useContext)
- [Axios Documentation](https://axios-http.com/)
