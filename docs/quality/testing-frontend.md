# Testing Frontend (Vitest + React Testing Library)

## Component Test Example

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskItem from './TaskItem';

describe('TaskItem', () => {
  const mockTask: ITask = {
    id: '1',
    title: 'Test Task',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it('dovrebbe renderizzare il titolo del task', () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();
    
    render(<TaskItem task={mockTask} onToggle={onToggle} onDelete={onDelete} />);
    
    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  it('dovrebbe chiamare onToggle quando cliccato', () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();
    
    render(<TaskItem task={mockTask} onToggle={onToggle} onDelete={onDelete} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(onToggle).toHaveBeenCalledWith('1');
  });
});
```

## Riferimenti

- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
