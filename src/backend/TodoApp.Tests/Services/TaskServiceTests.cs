using Moq;
using TodoApp.Core.DTOs;
using TodoApp.Core.Entities;
using TodoApp.Core.Exceptions;
using TodoApp.Core.Interfaces;
using TodoApp.Core.Services;
using Xunit;

namespace TodoApp.Tests.Services;

/// <summary>
/// Test per il TaskService
/// </summary>
public class TaskServiceTests
{
    private readonly Mock<ITaskRepository> _mockRepository;
    private readonly TaskService _service;

    public TaskServiceTests()
    {
        _mockRepository = new Mock<ITaskRepository>();
        _service = new TaskService(_mockRepository.Object);
    }

    #region CreateTaskAsync Tests

    [Fact]
    public async Task CreateTaskAsync_WithValidTitle_ReturnsNewTodo()
    {
        // Arrange
        var createDto = new CreateTaskDto { Title = "Test Task" };
        var expectedTask = new TodoTask
        {
            Id = Guid.NewGuid(),
            Title = "Test Task",
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _mockRepository
            .Setup(r => r.ExistsAsync(It.IsAny<string>(), It.IsAny<Guid?>()))
            .ReturnsAsync(false);

        _mockRepository
            .Setup(r => r.CreateAsync(It.IsAny<TodoTask>()))
            .ReturnsAsync(expectedTask);

        // Act
        var result = await _service.CreateTaskAsync(createDto);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Test Task", result.Title);
        Assert.False(result.IsCompleted);
        Assert.NotEqual(Guid.Empty, result.Id);

        _mockRepository.Verify(r => r.ExistsAsync("Test Task", It.IsAny<Guid?>()), Times.Once);
        _mockRepository.Verify(r => r.CreateAsync(It.IsAny<TodoTask>()), Times.Once);
    }

    [Fact]
    public async Task CreateTaskAsync_WithDuplicateTitle_ThrowsDuplicateTaskException()
    {
        // Arrange
        var createDto = new CreateTaskDto { Title = "Existing Task" };

        _mockRepository
            .Setup(r => r.ExistsAsync("Existing Task", It.IsAny<Guid?>()))
            .ReturnsAsync(true);

        // Act & Assert
        await Assert.ThrowsAsync<DuplicateTaskException>(
            () => _service.CreateTaskAsync(createDto)
        );

        _mockRepository.Verify(r => r.ExistsAsync("Existing Task", It.IsAny<Guid?>()), Times.Once);
        _mockRepository.Verify(r => r.CreateAsync(It.IsAny<TodoTask>()), Times.Never);
    }

    [Fact]
    public async Task CreateTaskAsync_SetsCorrectDefaultValues()
    {
        // Arrange
        var createDto = new CreateTaskDto { Title = "New Task" };
        TodoTask? capturedTask = null;

        _mockRepository
            .Setup(r => r.ExistsAsync(It.IsAny<string>(), It.IsAny<Guid?>()))
            .ReturnsAsync(false);

        _mockRepository
            .Setup(r => r.CreateAsync(It.IsAny<TodoTask>()))
            .Callback<TodoTask>(task => capturedTask = task)
            .ReturnsAsync((TodoTask t) => t);

        // Act
        await _service.CreateTaskAsync(createDto);

        // Assert
        Assert.NotNull(capturedTask);
        Assert.Equal("New Task", capturedTask.Title);
        Assert.False(capturedTask.IsCompleted);
        Assert.NotEqual(Guid.Empty, capturedTask.Id);
        Assert.True((DateTime.UtcNow - capturedTask.CreatedAt).TotalSeconds < 1);
        Assert.True((DateTime.UtcNow - capturedTask.UpdatedAt).TotalSeconds < 1);
    }

    #endregion

    #region GetTaskByIdAsync Tests

    [Fact]
    public async Task GetTaskByIdAsync_WithExistingId_ReturnsTask()
    {
        // Arrange
        var taskId = Guid.NewGuid();
        var expectedTask = new TodoTask
        {
            Id = taskId,
            Title = "Test Task",
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _mockRepository
            .Setup(r => r.GetByIdAsync(taskId))
            .ReturnsAsync(expectedTask);

        // Act
        var result = await _service.GetTaskByIdAsync(taskId);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(taskId, result.Id);
        Assert.Equal("Test Task", result.Title);
    }

    [Fact]
    public async Task GetTaskByIdAsync_WithNonExistingId_ThrowsTaskNotFoundException()
    {
        // Arrange
        var taskId = Guid.NewGuid();

        _mockRepository
            .Setup(r => r.GetByIdAsync(taskId))
            .ReturnsAsync((TodoTask?)null);

        // Act & Assert
        await Assert.ThrowsAsync<TaskNotFoundException>(
            () => _service.GetTaskByIdAsync(taskId)
        );
    }

    #endregion

    #region GetAllTasksAsync Tests

    [Fact]
    public async Task GetAllTasksAsync_ReturnsAllTasks()
    {
        // Arrange
        var tasks = new List<TodoTask>
        {
            new() { Id = Guid.NewGuid(), Title = "Task 1", IsCompleted = false, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new() { Id = Guid.NewGuid(), Title = "Task 2", IsCompleted = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        };

        _mockRepository
            .Setup(r => r.GetAllAsync(null))
            .ReturnsAsync(tasks);

        // Act
        var result = await _service.GetAllTasksAsync();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count());
    }

    #endregion

    #region ToggleTaskAsync Tests

    [Fact]
    public async Task ToggleTaskAsync_WithExistingTask_TogglesStatusToCompleted()
    {
        // Arrange
        var taskId = Guid.NewGuid();
        var task = new TodoTask
        {
            Id = taskId,
            Title = "Test Task",
            IsCompleted = false,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var updatedTask = new TodoTask
        {
            Id = taskId,
            Title = "Test Task",
            IsCompleted = true,
            CreatedAt = task.CreatedAt,
            UpdatedAt = DateTime.UtcNow
        };

        _mockRepository
            .Setup(r => r.GetByIdAsync(taskId))
            .ReturnsAsync(task);

        _mockRepository
            .Setup(r => r.UpdateAsync(It.IsAny<TodoTask>()))
            .ReturnsAsync(updatedTask);

        // Act
        var result = await _service.ToggleTaskAsync(taskId);

        // Assert
        Assert.NotNull(result);
        Assert.True(result.IsCompleted);
        _mockRepository.Verify(r => r.UpdateAsync(It.Is<TodoTask>(t => t.IsCompleted == true)), Times.Once);
    }

    [Fact]
    public async Task ToggleTaskAsync_WithCompletedTask_TogglesStatusToNotCompleted()
    {
        // Arrange
        var taskId = Guid.NewGuid();
        var task = new TodoTask
        {
            Id = taskId,
            Title = "Completed Task",
            IsCompleted = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        var updatedTask = new TodoTask
        {
            Id = taskId,
            Title = "Completed Task",
            IsCompleted = false,
            CreatedAt = task.CreatedAt,
            UpdatedAt = DateTime.UtcNow
        };

        _mockRepository
            .Setup(r => r.GetByIdAsync(taskId))
            .ReturnsAsync(task);

        _mockRepository
            .Setup(r => r.UpdateAsync(It.IsAny<TodoTask>()))
            .ReturnsAsync(updatedTask);

        // Act
        var result = await _service.ToggleTaskAsync(taskId);

        // Assert
        Assert.NotNull(result);
        Assert.False(result.IsCompleted);
        _mockRepository.Verify(r => r.UpdateAsync(It.Is<TodoTask>(t => t.IsCompleted == false)), Times.Once);
    }

    [Fact]
    public async Task ToggleTaskAsync_WithNonExistingTask_ThrowsTaskNotFoundException()
    {
        // Arrange
        var taskId = Guid.NewGuid();

        _mockRepository
            .Setup(r => r.GetByIdAsync(taskId))
            .ReturnsAsync((TodoTask?)null);

        // Act & Assert
        await Assert.ThrowsAsync<TaskNotFoundException>(
            () => _service.ToggleTaskAsync(taskId)
        );

        _mockRepository.Verify(r => r.UpdateAsync(It.IsAny<TodoTask>()), Times.Never);
    }

    [Fact]
    public async Task ToggleTaskAsync_UpdatesUpdatedAtTimestamp()
    {
        // Arrange
        var taskId = Guid.NewGuid();
        var originalTime = DateTime.UtcNow.AddHours(-1);
        var task = new TodoTask
        {
            Id = taskId,
            Title = "Test Task",
            IsCompleted = false,
            CreatedAt = originalTime,
            UpdatedAt = originalTime
        };

        TodoTask? capturedTask = null;
        _mockRepository
            .Setup(r => r.GetByIdAsync(taskId))
            .ReturnsAsync(task);

        _mockRepository
            .Setup(r => r.UpdateAsync(It.IsAny<TodoTask>()))
            .Callback<TodoTask>(t => capturedTask = t)
            .ReturnsAsync((TodoTask t) => t);

        // Act
        await _service.ToggleTaskAsync(taskId);

        // Assert
        Assert.NotNull(capturedTask);
        Assert.True(capturedTask.UpdatedAt > originalTime);
        Assert.True((DateTime.UtcNow - capturedTask.UpdatedAt).TotalSeconds < 1);
    }

    #endregion
}
