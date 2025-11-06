import { useState, type FormEvent } from 'react';
import { taskService } from '../../services/taskService';
import { VALIDATION } from '../../constants/validation';
import type { CreateTaskDto } from '../../types/task';
import './TaskInput.css';

interface TaskInputProps {
  onTaskCreated?: () => void;
}

/**
 * Componente per l'input e la creazione di nuovi task
 */
export function TaskInput({ onTaskCreated }: TaskInputProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateTitle = (value: string): string => {
    if (!value.trim()) {
      return VALIDATION.ERRORS.TITLE_REQUIRED;
    }
    if (value.length > VALIDATION.TITLE_MAX_LENGTH) {
      return VALIDATION.ERRORS.TITLE_TOO_LONG;
    }
    return '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validazione
    const validationError = validateTitle(title);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const dto: CreateTaskDto = { title: title.trim() };
      await taskService.createTask(dto);

      // Reset form
      setTitle('');

      // Notifica il parent component
      onTaskCreated?.();
    } catch (err: any) {
      // Gestione errori API
      if (err.response?.status === 409) {
        setError('Esiste già un task con questo titolo');
      } else if (err.response?.status === 400) {
        setError(err.response.data.message || 'Dati non validi');
      } else {
        setError('Errore durante la creazione del task');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (value: string) => {
    setTitle(value);
    // Pulisci l'errore quando l'utente inizia a digitare
    if (error) {
      setError('');
    }
  };

  return (
    <div className="task-input-container">
      <form onSubmit={handleSubmit} className="task-input-form">
        <input
          type="text"
          value={title}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Cosa devi fare?"
          className={`task-input ${error ? 'task-input-error' : ''}`}
          disabled={isSubmitting}
          maxLength={VALIDATION.TITLE_MAX_LENGTH}
          aria-label="Nuovo task"
          aria-invalid={!!error}
          aria-describedby={error ? 'task-input-error' : undefined}
        />
        {error && (
          <div
            id="task-input-error"
            className="error-message"
            role="alert"
          >
            {error}
          </div>
        )}
      </form>
      <p className="hint-text">
        Premi Invio per aggiungere il task
      </p>
    </div>
  );
}
