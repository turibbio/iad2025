namespace TodoApp.Core.DTOs;

/// <summary>
/// DTO per la creazione di un nuovo task
/// </summary>
public class CreateTaskDto
{
    public string Title { get; set; } = string.Empty;
}
