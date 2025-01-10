using System.ComponentModel.DataAnnotations;

namespace Api.Validations;

public class DateGreaterThanAttribute : ValidationAttribute
{
    private readonly string _comparisonProperty;

    public DateGreaterThanAttribute(string comparisonProperty)
    {
        _comparisonProperty = comparisonProperty;
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value == null)
        {
            return ValidationResult.Success;
        }

        var currentValue = (DateTime)value;
        var property = validationContext.ObjectType.GetProperty(_comparisonProperty);

        if (property == null)
        {
            throw new ArgumentException($"Property {_comparisonProperty} is not found.");
        }

        var comparisionValue = (DateTime)property.GetValue(validationContext.ObjectInstance)!;

        if (currentValue > comparisionValue)
        {
            return ValidationResult.Success;
        }
        
        return new ValidationResult($"End must be greater than {_comparisonProperty}");
    }
    
}