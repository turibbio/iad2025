namespace TodoApp.Core.DTOs;

/// <summary>
/// DTO per l'aggiornamento di un task esistente
/// </summary>
public class UpdateTaskDto
{
    public string Title { get; set; } = string.Empty;
}
