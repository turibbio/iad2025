using TodoApp.Core.DTOs;
using TodoApp.Core.Entities;
using TodoApp.Core.Exceptions;
using TodoApp.Core.Interfaces;

namespace TodoApp.Core.Services;

/// <summary>
/// Servizio per la gestione della business logic dei task
/// </summary>
public class TaskService : ITaskService
{
    private readonly ITaskRepository _repository;

    public TaskService(ITaskRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<TaskDto>> GetAllTasksAsync(string? filter = null)
    {
        var tasks = await _repository.GetAllAsync(filter);
        return tasks.Select(MapToDto);
    }

    public async Task<TaskDto> GetTaskByIdAsync(Guid id)
    {
        var task = await _repository.GetByIdAsync(id);
        if (task == null)
        {
            throw new TaskNotFoundException(id);
        }

        return MapToDto(task);
    }

    public async Task<TaskDto> CreateTaskAsync(CreateTaskDto createDto)
    {
        // Verifica duplicati
        if (await _repository.ExistsAsync(createDto.Title))
        {
            throw new DuplicateTaskException(createDto.Title);
        }

        var task = new TodoTask
        {
            Id = Guid.NewGuid(),
            Title = createDto.Title,
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var createdTask = await _repository.CreateAsync(task);
        return MapToDto(createdTask);
    }

    public async Task<TaskDto> UpdateTaskAsync(Guid id, UpdateTaskDto updateDto)
    {
        var task = await _repository.GetByIdAsync(id);
        if (task == null)
        {
            throw new TaskNotFoundException(id);
        }

        // Verifica duplicati (escludendo il task corrente)
        if (await _repository.ExistsAsync(updateDto.Title, id))
        {
            throw new DuplicateTaskException(updateDto.Title);
        }

        task.Title = updateDto.Title;
        task.UpdatedAt = DateTime.UtcNow;

        var updatedTask = await _repository.UpdateAsync(task);
        return MapToDto(updatedTask);
    }

    public async Task<TaskDto> ToggleTaskAsync(Guid id)
    {
        var task = await _repository.GetByIdAsync(id);
        if (task == null)
        {
            throw new TaskNotFoundException(id);
        }

        task.IsCompleted = !task.IsCompleted;
        task.UpdatedAt = DateTime.UtcNow;

        var updatedTask = await _repository.UpdateAsync(task);
        return MapToDto(updatedTask);
    }

    public async Task DeleteTaskAsync(Guid id)
    {
        var task = await _repository.GetByIdAsync(id);
        if (task == null)
        {
            throw new TaskNotFoundException(id);
        }

        await _repository.DeleteAsync(id);
    }

    public async Task DeleteCompletedTasksAsync()
    {
        await _repository.DeleteCompletedAsync();
    }

    public async Task ToggleAllTasksAsync(bool completed)
    {
        await _repository.ToggleAllAsync(completed);
    }

    private static TaskDto MapToDto(TodoTask task)
    {
        return new TaskDto
        {
            Id = task.Id,
            Title = task.Title,
            IsCompleted = task.IsCompleted,
            CreatedAt = task.CreatedAt,
            UpdatedAt = task.UpdatedAt
        };
    }
}
