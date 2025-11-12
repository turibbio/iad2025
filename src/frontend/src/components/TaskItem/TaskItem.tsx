import type { ITask } from '../../types/task';
import './TaskItem.css';

interface TaskItemProps {
  task: ITask;
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void;
}

/**
 * Componente per visualizzare e interagire con un singolo task
 */
export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const handleCheckboxChange = () => {
    onToggle(task.id);
  };

  const handleDelete = () => {
    onDelete?.(task.id);
  };

  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={handleCheckboxChange}
        className="task-checkbox"
        aria-label={`Marca "${task.title}" come ${task.isCompleted ? 'non completata' : 'completata'}`}
      />
      <span className={task.isCompleted ? 'task-title completed' : 'task-title'}>
        {task.title}
      </span>
      {onDelete && (
        <button
          onClick={handleDelete}
          className="task-delete-btn"
          aria-label={`Elimina task "${task.title}"`}
        >
          ×
        </button>
      )}
    </li>
  );
}
