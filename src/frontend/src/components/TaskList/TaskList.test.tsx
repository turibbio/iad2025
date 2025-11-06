import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskList } from './TaskList';
import type { ITask } from '../../types/task';

describe('TaskList', () => {
  const mockTasks: ITask[] = [
    {
      id: '1',
      title: 'First Task',
      isCompleted: false,
      createdAt: '2025-01-06T10:00:00Z',
      updatedAt: '2025-01-06T10:00:00Z',
    },
    {
      id: '2',
      title: 'Second Task',
      isCompleted: true,
      createdAt: '2025-01-05T10:00:00Z',
      updatedAt: '2025-01-05T10:00:00Z',
    },
    {
      id: '3',
      title: 'Third Task',
      isCompleted: false,
      createdAt: '2025-01-04T10:00:00Z',
      updatedAt: '2025-01-04T10:00:00Z',
    },
  ];

  const mockHandlers = {
    onToggle: vi.fn(),
    onDelete: vi.fn(),
    onUpdate: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Loading State', () => {
    it('deve mostrare lo spinner durante il caricamento', () => {
      render(<TaskList tasks={[]} isLoading={true} {...mockHandlers} />);

      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByText(/caricamento task in corso/i)).toBeInTheDocument();
    });

    it('deve avere attributi di accessibilità appropriati', () => {
      render(<TaskList tasks={[]} isLoading={true} {...mockHandlers} />);

      const loadingElement = screen.getByRole('status');
      expect(loadingElement).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Empty State', () => {
    it('deve mostrare il messaggio vuoto quando non ci sono task', () => {
      render(<TaskList tasks={[]} isLoading={false} {...mockHandlers} />);

      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(
        screen.getByText('Nessuna task presente. Crea la tua prima attività!')
      ).toBeInTheDocument();
    });

    it('deve mostrare l\'icona vuota', () => {
      const { container } = render(<TaskList tasks={[]} isLoading={false} {...mockHandlers} />);

      const icon = container.querySelector('.empty-icon');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Lista Task', () => {
    it('deve renderizzare tutti i task', () => {
      render(<TaskList tasks={mockTasks} isLoading={false} {...mockHandlers} />);

      expect(screen.getByText('First Task')).toBeInTheDocument();
      expect(screen.getByText('Second Task')).toBeInTheDocument();
      expect(screen.getByText('Third Task')).toBeInTheDocument();
    });

    it('deve mostrare il conteggio corretto dei task', () => {
      render(<TaskList tasks={mockTasks} isLoading={false} {...mockHandlers} />);

      expect(screen.getByText('3 task')).toBeInTheDocument();
    });

    it('deve usare il formato singolare per 1 task', () => {
      render(<TaskList tasks={[mockTasks[0]]} isLoading={false} {...mockHandlers} />);

      expect(screen.getByText('1 task')).toBeInTheDocument();
    });

    it('deve renderizzare la lista con il role appropriato', () => {
      render(<TaskList tasks={mockTasks} isLoading={false} {...mockHandlers} />);

      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
    });

    it('deve mantenere l\'ordine dei task (più recenti in alto)', () => {
      const { container } = render(
        <TaskList tasks={mockTasks} isLoading={false} {...mockHandlers} />
      );

      const taskItems = container.querySelectorAll('.task-item');
      expect(taskItems).toHaveLength(3);

      // Verifica che i task siano nell'ordine corretto
      // First Task (2025-01-06) dovrebbe essere il primo
      expect(taskItems[0]).toHaveTextContent('First Task');
      // Second Task (2025-01-05) dovrebbe essere il secondo
      expect(taskItems[1]).toHaveTextContent('Second Task');
      // Third Task (2025-01-04) dovrebbe essere il terzo
      expect(taskItems[2]).toHaveTextContent('Third Task');
    });
  });

  describe('Props Delegation', () => {
    it('deve passare correttamente le props ai TaskItem children', () => {
      render(<TaskList tasks={mockTasks} isLoading={false} {...mockHandlers} />);

      // Verifica che ogni task abbia una checkbox (parte di TaskItem)
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(3);

      // Verifica che ogni task abbia un pulsante elimina
      const deleteButtons = screen.getAllByLabelText('Elimina task');
      expect(deleteButtons).toHaveLength(3);
    });
  });

  describe('Edge Cases', () => {
    it('NON deve mostrare lo stato vuoto durante il caricamento', () => {
      render(<TaskList tasks={[]} isLoading={true} {...mockHandlers} />);

      expect(
        screen.queryByText('Nessuna task presente. Crea la tua prima attività!')
      ).not.toBeInTheDocument();
    });

    it('deve gestire correttamente task con titoli molto lunghi', () => {
      const longTitleTask: ITask = {
        id: '1',
        title: 'A'.repeat(100),
        isCompleted: false,
        createdAt: '2025-01-06T10:00:00Z',
        updatedAt: '2025-01-06T10:00:00Z',
      };

      render(<TaskList tasks={[longTitleTask]} isLoading={false} {...mockHandlers} />);

      expect(screen.getByText('A'.repeat(100))).toBeInTheDocument();
    });

    it('deve gestire correttamente task con caratteri speciali', () => {
      const specialCharsTask: ITask = {
        id: '1',
        title: 'Task con <script>alert("XSS")</script> & "quotes"',
        isCompleted: false,
        createdAt: '2025-01-06T10:00:00Z',
        updatedAt: '2025-01-06T10:00:00Z',
      };

      render(<TaskList tasks={[specialCharsTask]} isLoading={false} {...mockHandlers} />);

      // React automaticamente esegue l'escape dei caratteri speciali
      expect(screen.getByText(/Task con.*script/)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('deve avere gli attributi ARIA appropriati per la lista', () => {
      render(<TaskList tasks={mockTasks} isLoading={false} {...mockHandlers} />);

      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
    });

    it('deve avere uno stato live region per gli aggiornamenti', () => {
      render(<TaskList tasks={[]} isLoading={true} {...mockHandlers} />);

      const liveRegion = screen.getByRole('status');
      expect(liveRegion).toHaveAttribute('aria-live', 'polite');
    });
  });
});
