using Api.DTO;
using Api.Models;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controller;

[ApiController]
[Route("api/[controller]")]
public class CoursesController : ControllerBase
{
    private readonly CourseService _courseService;

    public CoursesController(CourseService courseService)
    {
        _courseService = courseService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CourseDto>>> GetCourses()
    {
        var courses = await _courseService.GetAllCoursesAsync();
        return Ok(courses);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCourse(int id)
    {
        var course = await _courseService.GetCourseByIdAsync(id);
        return Ok(course);        
    }

    [HttpPost]
    public async Task<IActionResult> CreateCourse(Course course)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var (success, message) = await _courseService.CreateCourseAsync(course);
        if (!success)
        {
            return BadRequest(message);
        }

        return CreatedAtAction(nameof(GetCourse), new { id = course.Id }, course);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCourse(int id, Course course)
    {
        if (id != course.Id)
        {
            return BadRequest();
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var (success, message) = await _courseService.UpdateCourseAsync(course);
        if (!success)
        {
            return BadRequest(message);
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCourse(int id)
    {
        var (success, message) = await _courseService.DeleteCourseAsync(id);

        if (!success)
        {
            return BadRequest(message);
        }
        
        return NoContent();
    }

    [HttpGet("{id}/students")]
    public async Task<ActionResult<IEnumerable<Student>>> GetCourseStudents(int id)
    {
        var course = await _courseService.GetCourseByIdAsync(id);
        
        if (course == null)
        {
            return NotFound($"Course with ID {id} not found");
        }
        
        var students = _courseService.GetCourseStudentsAsync(id);
        return Ok(students);        
    }
    
}