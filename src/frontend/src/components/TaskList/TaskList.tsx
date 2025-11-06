import { TaskItem } from '../TaskItem';
import type { ITask } from '../../types/task';
import './TaskList.css';

interface TaskListProps {
  tasks: ITask[];
  isLoading: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

/**
 * Componente per visualizzare la lista di task
 * Gestisce:
 * - Visualizzazione lista ordinata per data di creazione (più recenti in alto)
 * - Stato vuoto con messaggio informativo
 * - Stato di caricamento
 */
export function TaskList({ tasks, isLoading, onToggle, onDelete, onUpdate }: TaskListProps) {
  if (isLoading) {
    return (
      <div className="task-list-loading" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true"></div>
        <span>Caricamento task in corso...</span>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty" role="status">
        <svg
          className="empty-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="empty-message">Nessuna task presente. Crea la tua prima attività!</p>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <span className="task-count">
          {tasks.length} {tasks.length === 1 ? 'task' : 'task'}
        </span>
      </div>
      <ul className="task-list" role="list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </ul>
    </div>
  );
}
