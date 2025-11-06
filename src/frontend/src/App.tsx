import { useState, useEffect } from 'react';
import { TaskInput } from './components/TaskInput';
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
          <div className="task-list">
            {tasks.length === 0 ? (
              <p className="empty-message">
                Nessun task presente. Creane uno nuovo!
              </p>
            ) : (
              <ul className="tasks">
                {tasks.map((task) => (
                  <li key={task.id} className="task-item">
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      readOnly
                      className="task-checkbox"
                    />
                    <span className={task.isCompleted ? 'completed' : ''}>
                      {task.title}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>Italian Agile Day 2025 - Demo App</p>
      </footer>
    </div>
  );
}

export default App;
