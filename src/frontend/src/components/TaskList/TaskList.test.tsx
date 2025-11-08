import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskList } from './TaskList';
import type { ITask } from '../../types/task';

describe('TaskList', () => {
  const mockTasks: ITask[] = [
    {
      id: '1',
      title: 'First Task',
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Second Task',
      isCompleted: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  it('renders empty message when no tasks', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TaskList tasks={[]} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    expect(screen.getByText('Nessun task presente. Creane uno nuovo!')).toBeInTheDocument();
  });

  it('renders all tasks', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    expect(screen.getByText('First Task')).toBeInTheDocument();
    expect(screen.getByText('Second Task')).toBeInTheDocument();
  });

  it('renders correct number of task items', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const taskItems = screen.getAllByRole('listitem');
    expect(taskItems).toHaveLength(2);
  });

  it('calls onToggle when task checkbox is clicked', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  it('calls onDelete when delete button is clicked', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const deleteButtons = screen.getAllByRole('button', { name: /elimina task/i });
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith('1');
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('does not call onDelete when checkbox is clicked', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(mockOnDelete).not.toHaveBeenCalled();
  });

  it('removes task from list after deletion', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const { rerender } = render(<TaskList tasks={mockTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    expect(screen.getByText('First Task')).toBeInTheDocument();

    const updatedTasks = mockTasks.filter((task) => task.id !== '1');
    rerender(<TaskList tasks={updatedTasks} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    expect(screen.queryByText('First Task')).not.toBeInTheDocument();
    expect(screen.getByText('Second Task')).toBeInTheDocument();
  });
});
