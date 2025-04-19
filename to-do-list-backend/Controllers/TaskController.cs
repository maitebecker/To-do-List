
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TO_DO_LIST.Models;

namespace TO_DO_LIST.Controllers;

[ApiController]
[Route("[controller]")]
public class TaskController : ControllerBase
{
    private readonly TaskContext _context;

    public TaskController(TaskContext context)
    {
        _context = context;
    }

    [HttpGet("{id}")]
    public IActionResult GetId(int id)
    {
        var task = _context.Tasks.Find(id);
        if (task == null)
        {
            return NotFound();
        }

        return Ok(task);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        var task = _context.Tasks;
        return Ok(task);
    }

    [HttpGet("GetDescription/{description}")]
    public IActionResult GetDescription(string description)
    {
        var task = _context.Tasks.Where(value => value.Description.ToLower().Contains(description.ToLower()));
        return Ok(task);
    }

    [HttpGet("GetDate")]
    public IActionResult GetDate(DateTime dateAndTime)
    {

        var task = _context.Tasks.Where(value => value.DateAndTime.Date == dateAndTime.Date); 
        return Ok(task);
    }

    [HttpGet("GetSatus")]
    public IActionResult GetSatus(EnumTaskStatus status)
    {
        var task = _context.Tasks.Where(value => value.Status == status);
        return Ok(task);
    }

    [HttpPost]
    public IActionResult Create(Task task)
    {
        //verifica se a data esta preenchida
        if (task.DateAndTime == DateTime.MinValue)
            return BadRequest(new { Erro = "A data da tarefa não pode ser vazia" });

        _context.Add(task);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetId), new { id = task.Id }, task);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Task task)
    {
        var taskDB = _context.Tasks.Find(id);
        if (taskDB == null)
        {
            return NotFound();
        }

        if (task.Date.IsNullOrEmpty())
            return BadRequest(new { Erro = "A data da tarefa não pode ser vazia" });


        taskDB.Description = task.Description;
        taskDB.DateAndTime = task.DateAndTime;
        taskDB.Description = task.Description;
        taskDB.Status = task.Status;
        _context.Tasks.Update(taskDB);
        _context.SaveChanges();

        return Ok();
    }


    [HttpDelete("{id}")]
    public IActionResult Dele(int id)
    {
        var taskDB = _context.Tasks.Find(id);
        if (taskDB == null)
        {
            return NotFound();
        }

        _context.Tasks.Remove(taskDB);
        _context.SaveChanges();

        return NoContent();
    }
}
