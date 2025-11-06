using TodoApp.Core.Entities;

namespace TodoApp.Core.Interfaces;

/// <summary>
/// Interfaccia per il repository dei task
/// </summary>
public interface ITaskRepository
{
    Task<IEnumerable<TodoTask>> GetAllAsync(string? filter = null);
    Task<TodoTask?> GetByIdAsync(Guid id);
    Task<TodoTask> CreateAsync(TodoTask task);
    Task<TodoTask> UpdateAsync(TodoTask task);
    Task DeleteAsync(Guid id);
    Task<bool> ExistsAsync(string title, Guid? excludeId = null);
    Task DeleteCompletedAsync();
    Task ToggleAllAsync(bool completed);
}
