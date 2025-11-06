namespace TodoApp.Core.Entities;

/// <summary>
/// Entità che rappresenta un task nella todo list
/// </summary>
public class TodoTask
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public bool IsCompleted { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}
