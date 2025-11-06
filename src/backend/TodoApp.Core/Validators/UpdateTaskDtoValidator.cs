using FluentValidation;
using TodoApp.Core.DTOs;

namespace TodoApp.Core.Validators;

/// <summary>
/// Validator per UpdateTaskDto
/// </summary>
public class UpdateTaskDtoValidator : AbstractValidator<UpdateTaskDto>
{
    public UpdateTaskDtoValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .WithMessage("Il titolo è obbligatorio.")
            .MaximumLength(100)
            .WithMessage("Il titolo non può superare 100 caratteri.");
    }
}
