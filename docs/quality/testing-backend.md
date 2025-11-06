# Testing Backend (xUnit)

## Unit Test Example

```csharp
public class TaskServiceTests
{
    private readonly Mock<ITaskRepository> _mockRepository;
    private readonly TaskService _service;

    public TaskServiceTests()
    {
        _mockRepository = new Mock<ITaskRepository>();
        _service = new TaskService(_mockRepository.Object);
    }

    [Fact]
    public async Task CreateTask_WithValidData_ReturnsCreatedTask()
    {
        // Arrange
        var dto = new CreateTaskDto { Title = "Test Task" };
        var expectedTask = new TodoTask { Id = Guid.NewGuid(), Title = dto.Title };
        
        _mockRepository.Setup(r => r.ExistsByTitleAsync(dto.Title)).ReturnsAsync(false);
        _mockRepository.Setup(r => r.AddAsync(It.IsAny<TodoTask>())).ReturnsAsync(expectedTask);

        // Act
        var result = await _service.CreateTaskAsync(dto);

        // Assert
        result.Should().NotBeNull();
        result.Title.Should().Be(dto.Title);
    }
}
```

## Riferimenti

- [xUnit Documentation](https://xunit.net/)
- [Moq Documentation](https://github.com/moq/moq4)
- [FluentAssertions](https://fluentassertions.com/)
