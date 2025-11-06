using TodoApp.Core.DTOs;

namespace TodoApp.Core.Interfaces;

/// <summary>
/// Interfaccia per il servizio di gestione dei task
/// </summary>
public interface ITaskService
{
    Task<IEnumerable<TaskDto>> GetAllTasksAsync(string? filter = null);
    Task<TaskDto> GetTaskByIdAsync(Guid id);
    Task<TaskDto> CreateTaskAsync(CreateTaskDto createDto);
    Task<TaskDto> UpdateTaskAsync(Guid id, UpdateTaskDto updateDto);
    Task<TaskDto> ToggleTaskAsync(Guid id);
    Task DeleteTaskAsync(Guid id);
    Task DeleteCompletedTasksAsync();
    Task ToggleAllTasksAsync(bool completed);
}
