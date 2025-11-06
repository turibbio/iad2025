import apiClient from './apiClient';
import type { ITask, CreateTaskDto, UpdateTaskDto, TaskFilter, ToggleAllRequest } from '../types/task';
import { API_ENDPOINTS } from '../constants/api';

/**
 * Service per le operazioni CRUD sui task
 */
export const taskService = {
  /**
   * Ottiene tutti i task con filtro opzionale
   */
  async getAllTasks(filter?: TaskFilter): Promise<ITask[]> {
    const params = filter ? { filter } : {};
    const response = await apiClient.get<ITask[]>(API_ENDPOINTS.TASKS, { params });
    return response.data;
  },

  /**
   * Ottiene un task per ID
   */
  async getTaskById(id: string): Promise<ITask> {
    const response = await apiClient.get<ITask>(API_ENDPOINTS.TASK_BY_ID(id));
    return response.data;
  },

  /**
   * Crea un nuovo task
   */
  async createTask(dto: CreateTaskDto): Promise<ITask> {
    const response = await apiClient.post<ITask>(API_ENDPOINTS.TASKS, dto);
    return response.data;
  },

  /**
   * Aggiorna un task esistente
   */
  async updateTask(id: string, dto: UpdateTaskDto): Promise<ITask> {
    const response = await apiClient.put<ITask>(API_ENDPOINTS.TASK_BY_ID(id), dto);
    return response.data;
  },

  /**
   * Toggle dello stato di completamento di un task
   */
  async toggleTask(id: string): Promise<ITask> {
    const response = await apiClient.put<ITask>(API_ENDPOINTS.TOGGLE(id));
    return response.data;
  },

  /**
   * Elimina un task
   */
  async deleteTask(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.TASK_BY_ID(id));
  },

  /**
   * Elimina tutti i task completati
   */
  async clearCompleted(): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.CLEAR_COMPLETED);
  },

  /**
   * Toggle dello stato di completamento per tutti i task
   */
  async toggleAll(completed: boolean): Promise<void> {
    const request: ToggleAllRequest = { completed };
    await apiClient.put(API_ENDPOINTS.TOGGLE_ALL, request);
  },
};
