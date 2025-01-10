using Api.Data;
using Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Api.Services;

public class CourseService
{
    private readonly AppDbContext _context;

    public CourseService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Course>> GetAllCoursesAsync()
    {
        return await _context.Courses
            .Include(c => c.Students)
            .ToListAsync();
    }

    public async Task<Course?> GetCourseByIdAsync(int id)
    {
        return await _context.Courses
            .Include(c => c.Students)
            .FirstOrDefaultAsync(c => c.Id == id);
    }
    
    public async Task<(bool success, string message)> CreateCourseAsync(Course course)
    {
        if (course.EndDate <= course.StartDate)
        {
            return (false, "End date cannot be earlier than start date.");
        }

        try
        {
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();
            return (true, $"Course {course.Id} has been created.");
        }
        catch (Exception e)
        {
            return (false, e.Message);
        }
    }

    public async Task<(bool success, string message)> UpdateCourseAsync(Course course)
    {
        if (course.EndDate <= course.StartDate)
        {
            return (false, "End date cannot be earlier than start date.");
        }
        
        var courseToUpdate = await _context.Courses.FindAsync(course.Id);
        
        if (courseToUpdate == null)
        {
            return (false, "Course not found.");
        }
        
        try
        {
            _context.Courses.Update(course);
            await _context.SaveChangesAsync();
            return (true, $"Course {course.Id} has been updated.");
        }
        catch (Exception e)
        {
            return (false, e.Message);
        }
    }

    public async Task<(bool success, string message)> DeleteCourseAsync(int id)
    {
        try
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null)
            {
                return (false, "Course not found.");
            }
            
            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
            return (true, $"Course {course.Id} has been deleted.");
        }
        catch (Exception e)
        {
            return (false, e.Message);
        }
    }

    public async Task<(bool success, string message)> EnrollCourseAsync(int courseId, int studentId)
    {
        try
        {
            var course = await _context.Courses.Include(c => c.Students).FirstOrDefaultAsync(c => c.Id == courseId);
            if (course == null)
            {
                return (false, "Course not found.");
            }
            
            var student = await _context.Students.FindAsync(studentId);
            if (student == null)
            {
                return (false, "Student not found.");
            }

            if (course.Students.Any(s => s.Id == student.Id))
            {
                return (false, "Course already enrolled.");
            }
            
            course.Students.Add(student);
            await _context.SaveChangesAsync();
            return (true, $"Course {course.Id} has been enrolled.");
        }
        catch (Exception e)
        {
            return (false, e.Message);
        }
    }
    
    public async Task<(bool success, string message)> UnEnrollStudentAsync(int courseId, int studentId)
    {
        try
        {
            var course = await _context.Courses
                .Include(c => c.Students)
                .FirstOrDefaultAsync(c => c.Id == courseId);

            if (course == null)
            {
                return (false, $"Course with ID {courseId} not found");
            }

            var student = course.Students.FirstOrDefault(s => s.Id == studentId);
            if (student == null)
            {
                return (false, "Student is not enrolled in this course");
            }

            course.Students.Remove(student);
            await _context.SaveChangesAsync();
            return (true, "Student unenrolled successfully");
        }
        catch (Exception ex)
        {
            return (false, $"Error unenrolling student: {ex.Message}");
        }
    }

    public async Task<IEnumerable<Student>> GetCourseStudentsAsync(int courseId)
    {
        var course = await _context.Courses
            .Include(c => c.Students)
            .FirstOrDefaultAsync(c => c.Id == courseId);
        
        return course?.Students ?? new List<Student>();
    }

}