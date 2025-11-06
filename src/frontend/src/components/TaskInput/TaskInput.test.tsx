import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TaskInput } from './TaskInput';
import { taskService } from '../../services/taskService';
import type { ITask } from '../../types/task';

// Mock del taskService
vi.mock('../../services/taskService', () => ({
  taskService: {
    createTask: vi.fn(),
  },
}));

describe('TaskInput', () => {
  const mockOnTaskCreated = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input field', () => {
    render(<TaskInput onTaskCreated={mockOnTaskCreated} />);

    const input = screen.getByLabelText('Nuovo task');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Cosa devi fare?');
  });

  it('updates input value on change', () => {
    render(<TaskInput onTaskCreated={mockOnTaskCreated} />);

    const input = screen.getByLabelText('Nuovo task') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Nuovo task di test' } });

    expect(input.value).toBe('Nuovo task di test');
  });

  it('calls onCreate when Enter is pressed with valid title', async () => {
    const mockTask: ITask = {
      id: '123',
      title: 'Nuovo task',
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    vi.mocked(taskService.createTask).mockResolvedValue(mockTask);

    render(<TaskInput onTaskCreated={mockOnTaskCreated} />);

    const input = screen.getByLabelText('Nuovo task');
    fireEvent.change(input, { target: { value: 'Nuovo task' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(taskService.createTask).toHaveBeenCalledWith({
        title: 'Nuovo task',
      });
      expect(mockOnTaskCreated).toHaveBeenCalled();
    });
  });

  it('clears input after successful creation', async () => {
    const mockTask: ITask = {
      id: '123',
      title: 'Task temporaneo',
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    vi.mocked(taskService.createTask).mockResolvedValue(mockTask);

    render(<TaskInput onTaskCreated={mockOnTaskCreated} />);

    const input = screen.getByLabelText('Nuovo task') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Task temporaneo' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });

  it('shows error when title is empty', async () => {
    render(<TaskInput onTaskCreated={mockOnTaskCreated} />);

    const input = screen.getByLabelText('Nuovo task');
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Il titolo è obbligatorio');
    });

    expect(taskService.createTask).not.toHaveBeenCalled();
    expect(mockOnTaskCreated).not.toHaveBeenCalled();
  });

  it('shows error when title is only whitespace', async () => {
    render(<TaskInput onTaskCreated={mockOnTaskCreated} />);

    const input = screen.getByLabelText('Nuovo task');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Il titolo è obbligatorio');
    });

    expect(taskService.createTask).not.toHaveBeenCalled();
  });

  it('shows error when title exceeds max length', async () => {
    render(<TaskInput onTaskCreated={mockOnTaskCreated} />);

    const longTitle = 'a'.repeat(101);
    const input = screen.getByLabelText('Nuovo task');
    fireEvent.change(input, { target: { value: longTitle } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Il titolo non può superare 100 caratteri'
      );
    });

    expect(taskService.createTask).not.toHaveBeenCalled();
  });

  it('clears error when user starts typing', async () => {
    render(<TaskInput onTaskCreated={mockOnTaskCreated} />);

    const input = screen.getByLabelText('Nuovo task');

    // Trigger error
    fireEvent.submit(input.closest('form')!);
    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    // Start typing
    fireEvent.change(input, { target: { value: 'N' } });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows error when API returns 409 (duplicate)', async () => {
    const error = {
      response: {
        status: 409,
      },
    };

    vi.mocked(taskService.createTask).mockRejectedValue(error);

    render(<TaskInput onTaskCreated={mockOnTaskCreated} />);

    const input = screen.getByLabelText('Nuovo task');
    fireEvent.change(input, { target: { value: 'Task duplicato' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Esiste già un task con questo titolo'
      );
    });

    expect(mockOnTaskCreated).not.toHaveBeenCalled();
  });

  it('shows error when API returns 400 (validation error)', async () => {
    const error = {
      response: {
        status: 400,
        data: {
          message: 'Dati non validi',
        },
      },
    };

    vi.mocked(taskService.createTask).mockRejectedValue(error);

    render(<TaskInput onTaskCreated={mockOnTaskCreated} />);

    const input = screen.getByLabelText('Nuovo task');
    fireEvent.change(input, { target: { value: 'Task invalido' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Dati non validi');
    });
  });

  it('shows generic error for other API errors', async () => {
    const error = {
      response: {
        status: 500,
      },
    };

    vi.mocked(taskService.createTask).mockRejectedValue(error);

    render(<TaskInput onTaskCreated={mockOnTaskCreated} />);

    const input = screen.getByLabelText('Nuovo task');
    fireEvent.change(input, { target: { value: 'Task generico' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Errore durante la creazione del task'
      );
    });
  });

  it('disables input while submitting', async () => {
    vi.mocked(taskService.createTask).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<TaskInput onTaskCreated={mockOnTaskCreated} />);

    const input = screen.getByLabelText('Nuovo task') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Task lento' } });
    fireEvent.submit(input.closest('form')!);

    // Input should be disabled immediately
    expect(input).toBeDisabled();

    await waitFor(() => {
      expect(input).not.toBeDisabled();
    });
  });

  it('trims whitespace from title before submission', async () => {
    const mockTask: ITask = {
      id: '123',
      title: 'Task con spazi',
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    vi.mocked(taskService.createTask).mockResolvedValue(mockTask);

    render(<TaskInput onTaskCreated={mockOnTaskCreated} />);

    const input = screen.getByLabelText('Nuovo task');
    fireEvent.change(input, { target: { value: '  Task con spazi  ' } });
    fireEvent.submit(input.closest('form')!);

    await waitFor(() => {
      expect(taskService.createTask).toHaveBeenCalledWith({
        title: 'Task con spazi',
      });
    });
  });
});
