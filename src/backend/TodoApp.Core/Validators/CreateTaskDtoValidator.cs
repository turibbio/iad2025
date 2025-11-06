using FluentValidation;
using TodoApp.Core.DTOs;

namespace TodoApp.Core.Validators;

/// <summary>
/// Validator per CreateTaskDto
/// </summary>
public class CreateTaskDtoValidator : AbstractValidator<CreateTaskDto>
{
    public CreateTaskDtoValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .WithMessage("Il titolo è obbligatorio.")
            .MaximumLength(100)
            .WithMessage("Il titolo non può superare 100 caratteri.");
    }
}
