using System.Text.Json;
using Api.DTO;
using Api.Models;
using Api.Services;
using Api.Utils;
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
    public async Task<ActionResult<PagedList<CourseDto>>> GetCourses([FromQuery] PaginationParams paginationParams)
    {
        var courses = await _courseService.GetAllCoursesAsync(paginationParams);
        
        Response.Headers.Add("X-Pagination",
            JsonSerializer.Serialize(new
            {
                courses.CurrentPage,
                courses.TotalPages,
                courses.PageSize,
                courses.TotalCount
            }));
        
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
            return BadRequest("Course id does not match");
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
        
        return Ok();
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

    [HttpGet("GetIds")]
    public async Task<ActionResult<string[]>> GetIds()
    {
       var ids = await _courseService.GetIds();

       return Ok(ids);
    }
    
}