export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  TASKS: '/api/tasks',
  TASK_BY_ID: (id: string) => `/api/tasks/${id}`,
  TOGGLE: (id: string) => `/api/tasks/${id}/toggle`,
  CLEAR_COMPLETED: '/api/tasks/completed',
  TOGGLE_ALL: '/api/tasks/toggle-all',
} as const;
