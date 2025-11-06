import { useState, useRef, useEffect } from 'react';
import type { ITask } from '../../types/task';
import './TaskItem.css';

interface TaskItemProps {
  task: ITask;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

/**
 * Componente per visualizzare un singolo task
 * Supporta:
 * - Toggle completamento tramite checkbox
 * - Eliminazione tramite pulsante delete
 * - Modifica inline tramite doppio click
 */
export function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus automatico sull'input quando si entra in modalità edit
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditValue(task.title);
  };

  const handleSave = () => {
    const trimmedValue = editValue.trim();
    if (trimmedValue && trimmedValue !== task.title) {
      onUpdate(task.id, trimmedValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  const handleBlur = () => {
    // Auto-save quando si perde il focus
    handleSave();
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <li className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.isCompleted}
          onChange={() => onToggle(task.id)}
          aria-label={task.isCompleted ? 'Segna come non completata' : 'Segna come completata'}
        />

        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            className="task-edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            maxLength={100}
            aria-label="Modifica titolo task"
          />
        ) : (
          <div className="task-details" onDoubleClick={handleDoubleClick}>
            <span className="task-title">{task.title}</span>
            <span className="task-date">{formatDate(task.createdAt)}</span>
          </div>
        )}
      </div>

      <button
        className="task-delete-btn"
        onClick={() => onDelete(task.id)}
        aria-label="Elimina task"
        title="Elimina task"
      >
        ×
      </button>
    </li>
  );
}
