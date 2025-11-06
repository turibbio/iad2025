import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskItem } from './TaskItem';
import type { ITask } from '../../types/task';

describe('TaskItem', () => {
  const mockTask: ITask = {
    id: '1',
    title: 'Test Task',
    isCompleted: false,
    createdAt: '2025-01-06T10:00:00Z',
    updatedAt: '2025-01-06T10:00:00Z',
  };

  const mockHandlers = {
    onToggle: vi.fn(),
    onDelete: vi.fn(),
    onUpdate: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('deve renderizzare il task correttamente', () => {
      render(<TaskItem task={mockTask} {...mockHandlers} />);

      expect(screen.getByText('Test Task')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.getByLabelText('Elimina task')).toBeInTheDocument();
    });

    it('deve mostrare la data di creazione formattata', () => {
      render(<TaskItem task={mockTask} {...mockHandlers} />);

      // Verifica che ci sia una data formattata (formato italiano)
      const dateElement = screen.getByText(/06\/01\/2025/);
      expect(dateElement).toBeInTheDocument();
    });

    it('deve applicare la classe "completed" per task completati', () => {
      const completedTask = { ...mockTask, isCompleted: true };
      const { container } = render(<TaskItem task={completedTask} {...mockHandlers} />);

      const taskItem = container.querySelector('.task-item');
      expect(taskItem).toHaveClass('completed');
    });

    it('NON deve applicare la classe "completed" per task non completati', () => {
      const { container } = render(<TaskItem task={mockTask} {...mockHandlers} />);

      const taskItem = container.querySelector('.task-item');
      expect(taskItem).not.toHaveClass('completed');
    });
  });

  describe('Toggle Completamento', () => {
    it('deve chiamare onToggle quando si clicca sulla checkbox', () => {
      render(<TaskItem task={mockTask} {...mockHandlers} />);

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);

      expect(mockHandlers.onToggle).toHaveBeenCalledWith('1');
      expect(mockHandlers.onToggle).toHaveBeenCalledTimes(1);
    });

    it('deve mostrare checkbox checked per task completati', () => {
      const completedTask = { ...mockTask, isCompleted: true };
      render(<TaskItem task={completedTask} {...mockHandlers} />);

      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('deve mostrare checkbox unchecked per task non completati', () => {
      render(<TaskItem task={mockTask} {...mockHandlers} />);

      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it('deve avere aria-label appropriato per accessibilità', () => {
      render(<TaskItem task={mockTask} {...mockHandlers} />);

      const checkbox = screen.getByLabelText('Segna come completata');
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe('Eliminazione', () => {
    it('deve chiamare onDelete quando si clicca sul pulsante elimina', () => {
      render(<TaskItem task={mockTask} {...mockHandlers} />);

      const deleteButton = screen.getByLabelText('Elimina task');
      fireEvent.click(deleteButton);

      expect(mockHandlers.onDelete).toHaveBeenCalledWith('1');
      expect(mockHandlers.onDelete).toHaveBeenCalledTimes(1);
    });
  });

  describe('Modifica Inline', () => {
    it('deve entrare in modalità edit al doppio click sul task', () => {
      render(<TaskItem task={mockTask} {...mockHandlers} />);

      const taskDetails = screen.getByText('Test Task').closest('.task-details');
      expect(taskDetails).toBeInTheDocument();

      fireEvent.doubleClick(taskDetails!);

      // Deve mostrare l'input di modifica
      const editInput = screen.getByRole('textbox', { name: 'Modifica titolo task' });
      expect(editInput).toBeInTheDocument();
      expect(editInput).toHaveValue('Test Task');
    });

    it('deve chiamare onUpdate quando si preme Enter nell\'input', () => {
      render(<TaskItem task={mockTask} {...mockHandlers} />);

      const taskDetails = screen.getByText('Test Task').closest('.task-details');
      fireEvent.doubleClick(taskDetails!);

      const editInput = screen.getByRole('textbox');
      fireEvent.change(editInput, { target: { value: 'Updated Task' } });
      fireEvent.keyDown(editInput, { key: 'Enter' });

      expect(mockHandlers.onUpdate).toHaveBeenCalledWith('1', 'Updated Task');
    });

    it('deve annullare la modifica quando si preme Escape', () => {
      render(<TaskItem task={mockTask} {...mockHandlers} />);

      const taskDetails = screen.getByText('Test Task').closest('.task-details');
      fireEvent.doubleClick(taskDetails!);

      const editInput = screen.getByRole('textbox');
      fireEvent.change(editInput, { target: { value: 'Updated Task' } });
      fireEvent.keyDown(editInput, { key: 'Escape' });

      // Non deve chiamare onUpdate
      expect(mockHandlers.onUpdate).not.toHaveBeenCalled();

      // Deve tornare alla visualizzazione normale
      expect(screen.getByText('Test Task')).toBeInTheDocument();
    });

    it('deve salvare automaticamente al blur dell\'input', () => {
      render(<TaskItem task={mockTask} {...mockHandlers} />);

      const taskDetails = screen.getByText('Test Task').closest('.task-details');
      fireEvent.doubleClick(taskDetails!);

      const editInput = screen.getByRole('textbox');
      fireEvent.change(editInput, { target: { value: 'Updated Task' } });
      fireEvent.blur(editInput);

      expect(mockHandlers.onUpdate).toHaveBeenCalledWith('1', 'Updated Task');
    });

    it('NON deve salvare se il valore è vuoto o solo spazi', () => {
      render(<TaskItem task={mockTask} {...mockHandlers} />);

      const taskDetails = screen.getByText('Test Task').closest('.task-details');
      fireEvent.doubleClick(taskDetails!);

      const editInput = screen.getByRole('textbox');
      fireEvent.change(editInput, { target: { value: '   ' } });
      fireEvent.keyDown(editInput, { key: 'Enter' });

      expect(mockHandlers.onUpdate).not.toHaveBeenCalled();
    });

    it('NON deve salvare se il valore non è cambiato', () => {
      render(<TaskItem task={mockTask} {...mockHandlers} />);

      const taskDetails = screen.getByText('Test Task').closest('.task-details');
      fireEvent.doubleClick(taskDetails!);

      const editInput = screen.getByRole('textbox');
      // Non cambiamo il valore
      fireEvent.keyDown(editInput, { key: 'Enter' });

      expect(mockHandlers.onUpdate).not.toHaveBeenCalled();
    });
  });
});
