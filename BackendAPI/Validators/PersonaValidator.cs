using BackendAPI.DTOs;
using FluentValidation;

namespace BackendAPI.Validators
{
    public class PersonaValidator : AbstractValidator<PersonaDTO>
    {
        public PersonaValidator()
        {
            RuleFor(p => p.Nombre).NotEmpty().MaximumLength(50);
            RuleFor(p => p.Apellido).NotEmpty().MaximumLength(50);
            RuleFor(p => p.Email).NotEmpty().EmailAddress().MaximumLength(100);
        }
    }
}
