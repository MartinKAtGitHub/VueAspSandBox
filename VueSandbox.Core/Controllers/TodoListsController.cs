using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VueSandbox.Core.Models;
using VueSandbox.Core.ViewModels;

namespace VueSandbox.Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoListsController : ControllerBase
    {
        private readonly TodoDbContext _context;

        public TodoListsController(TodoDbContext context)
        {
            _context = context;
        }

        // GET: api/TodoLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetTodoListViewModel>>> GetTodoLists()
        {
            var todoLists = new List<GetTodoListViewModel>();

            todoLists = await _context.TodoLists.Include(list => list.TodoItems).Select(list => new GetTodoListViewModel
            {
                Id = list.Id,
                Name = list.Name,
                TodoItems = list.TodoItems.Select(item => new GetTodoItemViewModel
                {
                    Id = item.Id,
                    Name = item.Name,
                    Desc = item.Desc,
                    IsComplete = item.IsComplete,
                    TodoListId = item.TodoListId
                }).ToList(),

            }).ToListAsync();

            //return await _context.TodoLists.ToListAsync();
            return todoLists;
        }

        // GET: api/TodoLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoList>> GetTodoList(int id)
        {
            var todoList = await _context.TodoLists.FindAsync(id);

            if (todoList == null)
            {
                return NotFound();
            }

            return todoList;
        }

        // PUT: api/TodoLists/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoList(int id, PutTodoListViewModel todoListModel)
        {
            if (id != todoListModel.Id)
            {
                return BadRequest();
            }

            var todoList = await _context.TodoLists.FindAsync(id);
            if (todoList == null)
            {
                return NotFound();
            }

            todoList.Name = todoListModel.Name;
       
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TodoLists
        [HttpPost]
        public async Task<ActionResult<TodoListViewModel>> PostTodoList(TodoListViewModel model)
        {
            var todoList = new TodoList
            {
                Name = model.Name
            };

            _context.TodoLists.Add(todoList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodoList", new { id = todoList.Id }, todoList);
        }

        // DELETE: api/TodoLists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TodoList>> DeleteTodoList(int id)
        {
            var todoList = await _context.TodoLists.FindAsync(id);
            if (todoList == null)
            {
                return NotFound();
            }

            _context.TodoLists.Remove(todoList);
            await _context.SaveChangesAsync();

            return todoList;
        }

        private bool TodoListExists(int id)
        {
            return _context.TodoLists.Any(e => e.Id == id);
        }
    }
}
