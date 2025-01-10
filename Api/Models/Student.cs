using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public class Student
{
    public int Id { get; set; }
    [Required] 
    public string? Name { get; set; }

    public string? Address { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }

    public ICollection<Course> Courses { get; set; } = new List<Course>();
}