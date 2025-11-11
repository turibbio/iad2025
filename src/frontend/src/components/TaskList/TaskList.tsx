import { TaskItem } from '../TaskItem/TaskItem';
import type { ITask } from '../../types/task';
import './TaskList.css';

interface TaskListProps {
  tasks: ITask[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

/**
 * Componente per visualizzare la lista dei task
 */
export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="empty-list">
        <p>Nessun task presente. Creane uno nuovo!</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
