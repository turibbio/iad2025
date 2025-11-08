import { useState, useEffect } from 'react';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList/TaskList';
import { taskService } from './services/taskService';
import type { ITask } from './types/task';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err: any) {
      setError('Errore durante il caricamento dei task');
      console.error('Error loading tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await taskService.toggleTask(id);
      await loadTasks();
    } catch (err: any) {
      setError('Errore durante l\'aggiornamento del task');
      console.error('Error toggling task:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err: any) {
      setError('Errore durante l\'eliminazione del task');
      console.error('Error deleting task:', err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>TODO App</h1>
        <p className="subtitle">Gestisci i tuoi task in modo semplice</p>
      </header>

      <main className="app-main">
        <TaskInput onTaskCreated={loadTasks} />

        {isLoading && (
          <div className="loading">Caricamento...</div>
        )}

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        {!isLoading && !error && (
          <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
        )}
      </main>

      <footer className="app-footer">
        <p>Italian Agile Day 2025 - Demo App</p>
      </footer>
    </div>
  );
}

export default App;
