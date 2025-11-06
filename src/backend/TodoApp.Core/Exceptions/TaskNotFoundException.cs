namespace TodoApp.Core.Exceptions;

/// <summary>
/// Eccezione lanciata quando un task non viene trovato
/// </summary>
public class TaskNotFoundException : Exception
{
    public TaskNotFoundException(Guid taskId)
        : base($"Task con ID {taskId} non trovato.")
    {
    }
}
