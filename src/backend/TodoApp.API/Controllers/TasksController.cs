using Microsoft.AspNetCore.Mvc;
using TodoApp.Core.DTOs;
using TodoApp.Core.Interfaces;

namespace TodoApp.API.Controllers;

/// <summary>
/// Controller per la gestione dei task
/// </summary>
[ApiController]
[Route("api/tasks")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

    /// <summary>
    /// Ottiene tutti i task con filtro opzionale
    /// </summary>
    /// <param name="filter">Filtro: all, active, completed</param>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskDto>>> GetAll([FromQuery] string? filter = null)
    {
        var tasks = await _taskService.GetAllTasksAsync(filter);
        return Ok(tasks);
    }

    /// <summary>
    /// Ottiene un task per ID
    /// </summary>
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<TaskDto>> GetById(Guid id)
    {
        var task = await _taskService.GetTaskByIdAsync(id);
        return Ok(task);
    }

    /// <summary>
    /// Crea un nuovo task
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<TaskDto>> Create([FromBody] CreateTaskDto createDto)
    {
        var task = await _taskService.CreateTaskAsync(createDto);
        return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
    }

    /// <summary>
    /// Aggiorna un task esistente
    /// </summary>
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<TaskDto>> Update(Guid id, [FromBody] UpdateTaskDto updateDto)
    {
        var task = await _taskService.UpdateTaskAsync(id, updateDto);
        return Ok(task);
    }

    /// <summary>
    /// Toggle dello stato di completamento di un task
    /// </summary>
    [HttpPut("{id:guid}/toggle")]
    public async Task<ActionResult<TaskDto>> Toggle(Guid id)
    {
        var task = await _taskService.ToggleTaskAsync(id);
        return Ok(task);
    }

    /// <summary>
    /// Elimina un task
    /// </summary>
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        await _taskService.DeleteTaskAsync(id);
        return NoContent();
    }

    /// <summary>
    /// Elimina tutti i task completati
    /// </summary>
    [HttpDelete("completed")]
    public async Task<ActionResult> DeleteCompleted()
    {
        await _taskService.DeleteCompletedTasksAsync();
        return NoContent();
    }

    /// <summary>
    /// Toggle dello stato di completamento per tutti i task
    /// </summary>
    [HttpPut("toggle-all")]
    public async Task<ActionResult> ToggleAll([FromBody] ToggleAllRequest request)
    {
        await _taskService.ToggleAllTasksAsync(request.Completed);
        return NoContent();
    }
}

/// <summary>
/// Request per toggle-all endpoint
/// </summary>
public class ToggleAllRequest
{
    public bool Completed { get; set; }
}
