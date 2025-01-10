using System.ComponentModel.DataAnnotations;
using Api.Validations;

namespace Api.Models;

public class Course
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(100, MinimumLength = 3, ErrorMessage = "Course name must be between 3 and 100 characters")]
    public string? Name { get; set; }    
    
    [StringLength(500, ErrorMessage = "Course description must be less than characters")]
    public string? Description { get; set; }
    
    [Required(ErrorMessage = "Start date is required")]
    [DataType(DataType.Date)]
    [Display(Name = "Start Date")]
    public DateTime StartDate { get; set; }
    
    [Required(ErrorMessage = "End date is required")]
    [DataType(DataType.Date)]
    [Display(Name = "End Date")]
    [DateGreaterThan("StartDate", ErrorMessage = "End date must be greater than end date")]
    public DateTime EndDate { get; set; }

    public ICollection<Student> Students { get; set; } = new List<Student>();
}