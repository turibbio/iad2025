using Microsoft.EntityFrameworkCore;
using TodoApp.Core.Entities;
using TodoApp.Core.Interfaces;
using TodoApp.Infrastructure.Data;

namespace TodoApp.Infrastructure.Repositories;

/// <summary>
/// Implementazione del repository per i task
/// </summary>
public class TaskRepository : ITaskRepository
{
    private readonly TodoDbContext _context;

    public TaskRepository(TodoDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TodoTask>> GetAllAsync(string? filter = null)
    {
        IQueryable<TodoTask> query = _context.Tasks;

        if (!string.IsNullOrWhiteSpace(filter))
        {
            query = filter.ToLower() switch
            {
                "active" => query.Where(t => !t.IsCompleted),
                "completed" => query.Where(t => t.IsCompleted),
                _ => query
            };
        }

        return await query.OrderByDescending(t => t.CreatedAt).ToListAsync();
    }

    public async Task<TodoTask?> GetByIdAsync(Guid id)
    {
        return await _context.Tasks.FindAsync(id);
    }

    public async Task<TodoTask> CreateAsync(TodoTask task)
    {
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task<TodoTask> UpdateAsync(TodoTask task)
    {
        _context.Tasks.Update(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task DeleteAsync(Guid id)
    {
        var task = await GetByIdAsync(id);
        if (task != null)
        {
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<bool> ExistsAsync(string title, Guid? excludeId = null)
    {
        var query = _context.Tasks.Where(t => t.Title == title);

        if (excludeId.HasValue)
        {
            query = query.Where(t => t.Id != excludeId.Value);
        }

        return await query.AnyAsync();
    }

    public async Task DeleteCompletedAsync()
    {
        var completedTasks = await _context.Tasks
            .Where(t => t.IsCompleted)
            .ToListAsync();

        _context.Tasks.RemoveRange(completedTasks);
        await _context.SaveChangesAsync();
    }

    public async Task ToggleAllAsync(bool completed)
    {
        var tasks = await _context.Tasks.ToListAsync();

        foreach (var task in tasks)
        {
            task.IsCompleted = completed;
            task.UpdatedAt = DateTime.UtcNow;
        }

        await _context.SaveChangesAsync();
    }
}
