import type { ITask } from '../../types/task';
import './TaskItem.css';

interface TaskItemProps {
  task: ITask;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * Componente per visualizzare un singolo task
 */
export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleToggle = () => {
    onToggle(task.id);
  };

  return (
    <li className="task-item">
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={handleToggle}
          className="task-checkbox"
          aria-label={`Segna "${task.title}" come ${task.isCompleted ? 'non completata' : 'completata'}`}
        />
        <span className={task.isCompleted ? 'task-title completed' : 'task-title'}>
          {task.title}
        </span>
      </div>
      <button
        type="button"
        onClick={handleDelete}
        className="delete-button"
        aria-label={`Elimina task "${task.title}"`}
      >
        ✕
      </button>
    </li>
  );
}
