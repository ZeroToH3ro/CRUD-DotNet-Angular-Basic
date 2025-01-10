using System.ComponentModel.DataAnnotations;

namespace Api.DTO;

public class CourseDto
{
    [Required(ErrorMessage = "Course name is required")]
    [StringLength(100, MinimumLength = 3)]
    public string Name { get; set; }

    [StringLength(500)]
    public string? Description { get; set; }

    [Required]
    public DateTime StartDate { get; set; }

    [Required]
    public DateTime EndDate { get; set; }
}