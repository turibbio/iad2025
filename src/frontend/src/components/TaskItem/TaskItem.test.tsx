import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskItem } from './TaskItem';
import type { ITask } from '../../types/task';

describe('TaskItem', () => {
  const mockTask: ITask = {
    id: '123',
    title: 'Test Task',
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it('renders task title', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('renders checkbox with correct state', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it('renders checkbox checked when task is completed', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const completedTask: ITask = { ...mockTask, isCompleted: true };

    render(<TaskItem task={completedTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('applies completed style when task is completed', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();
    const completedTask: ITask = { ...mockTask, isCompleted: true };

    render(<TaskItem task={completedTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const title = screen.getByText('Test Task');
    expect(title).toHaveClass('completed');
  });

  it('calls onToggle when checkbox is clicked', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith('123');
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('renders delete button', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByRole('button', { name: /elimina task/i });
    expect(deleteButton).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByRole('button', { name: /elimina task/i });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('123');
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it('has accessible aria-label for checkbox', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAccessibleName(/segna "test task" come completata/i);
  });

  it('has accessible aria-label for delete button', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toHaveAccessibleName(/elimina task "test task"/i);
  });
});
