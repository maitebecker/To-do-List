
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TO_DO_LIST.Models;


[ApiController]
[Route("[controller]")]
[Authorize]
public class TaskController : ControllerBase
{
    private readonly AppDbContext _context;

    public TaskController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public IActionResult GetId(int id)
    {
         var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return Unauthorized();

        int userId = int.Parse(userIdClaim.Value);

        var task = _context.Tasks.FirstOrDefault(t => t.Id == id && t.UserId == userId);
        if (task == null)
        {
            return NotFound();
        }

        return Ok(task);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return Unauthorized();

        int userId = int.Parse(userIdClaim.Value);

        var tasks = _context.Tasks.Where(t => t.UserId == userId);
        return Ok(tasks);
    }

    [HttpGet("GetDescription/{description}")]
    public IActionResult GetDescription(string description)
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return Unauthorized();

        int userId = int.Parse(userIdClaim.Value);

        var task = _context.Tasks.Where(t => t.UserId == userId && t.Description.ToLower().Contains(description.ToLower()));
        return Ok(task);
    }

    [HttpGet("GetDate")]
    public IActionResult GetDate(DateTime dateAndTime)
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return Unauthorized();

        int userId = int.Parse(userIdClaim.Value);

        var task = _context.Tasks.Where(t => t.UserId == userId && t.DateAndTime.Date == dateAndTime.Date);
        return Ok(task);
    }

    [HttpGet("GetSatus")]
    public IActionResult GetStatus(EnumTaskStatus status)
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return Unauthorized();

        int userId = int.Parse(userIdClaim.Value);

        var task = _context.Tasks.Where(t => t.UserId == userId && t.Status == status);
        return Ok(task);
    }

    [HttpPost]
    public IActionResult Create(Task task)
    {
        //verifica se a data esta preenchida
        if (task.DateAndTime == DateTime.MinValue)
            return BadRequest(new { Erro = "A data da tarefa não pode ser vazia" });

        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

        if (userIdClaim == null)
            return Unauthorized(new { Erro = "Usuário não autenticado corretamente." });

        int userId = int.Parse(userIdClaim.Value);
        task.UserId = userId;

        _context.Add(task);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetId), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Task task)
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return Unauthorized();

        int userId = int.Parse(userIdClaim.Value);

        var taskDB = _context.Tasks.FirstOrDefault(t => t.Id == id && t.UserId == userId);
        if (taskDB == null)
        {
            return NotFound();
        }

        if (task.DateAndTime == DateTime.MinValue)
            return BadRequest(new { Erro = "A data da tarefa não pode ser vazia" });


        taskDB.Description = task.Description;
        taskDB.DateAndTime = task.DateAndTime;
        taskDB.Status = task.Status;
        _context.Tasks.Update(taskDB);
        _context.SaveChanges();

        return Ok();
    }


    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return Unauthorized();

        int userId = int.Parse(userIdClaim.Value);

        var taskDB = _context.Tasks.FirstOrDefault(t => t.Id == id && t.UserId == userId);
        if (taskDB == null)
        {
            return NotFound();
        }

        _context.Tasks.Remove(taskDB);
        _context.SaveChanges();

        return NoContent();
    }
}
