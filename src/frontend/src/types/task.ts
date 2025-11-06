export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export type TaskFilter = 'all' | 'active' | 'completed';

export interface CreateTaskDto {
  title: string;
}

export interface UpdateTaskDto {
  title: string;
}

export interface ToggleAllRequest {
  completed: boolean;
}
