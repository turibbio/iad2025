import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskItem } from './TaskItem';
import type { ITask } from '../../types/task';

describe('TaskItem', () => {
  const mockOnToggle = vi.fn();
  const mockOnDelete = vi.fn();

  const mockTask: ITask = {
    id: '123',
    title: 'Test Task',
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders task title', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('renders checkbox unchecked for incomplete task', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it('renders checkbox checked for completed task', () => {
    const completedTask = { ...mockTask, isCompleted: true };
    render(<TaskItem task={completedTask} onToggle={mockOnToggle} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('applies strikethrough style to completed task', () => {
    const completedTask = { ...mockTask, isCompleted: true };
    render(<TaskItem task={completedTask} onToggle={mockOnToggle} />);

    const title = screen.getByText('Test Task');
    expect(title).toHaveClass('completed');
  });

  it('does not apply strikethrough to incomplete task', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} />);

    const title = screen.getByText('Test Task');
    expect(title).not.toHaveClass('completed');
  });

  it('calls onToggle when checkbox is clicked', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith('123');
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('renders delete button when onDelete is provided', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByLabelText(/Elimina task/i);
    expect(deleteButton).toBeInTheDocument();
  });

  it('does not render delete button when onDelete is not provided', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} />);

    const deleteButton = screen.queryByLabelText(/Elimina task/i);
    expect(deleteButton).not.toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByLabelText(/Elimina task/i);
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('123');
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('has accessible aria-label for checkbox', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'Marca "Test Task" come completata');
  });

  it('updates aria-label for completed task', () => {
    const completedTask = { ...mockTask, isCompleted: true };
    render(<TaskItem task={completedTask} onToggle={mockOnToggle} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'Marca "Test Task" come non completata');
  });

  it('has accessible aria-label for delete button', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByLabelText('Elimina task "Test Task"');
    expect(deleteButton).toBeInTheDocument();
  });
});
