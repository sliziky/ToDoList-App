using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ToDoListAPI.Data;

namespace ToDoListAPI.Controllers
{
    [ApiController]
    [Route("api/todolist")]
    public class ToDoListController : ControllerBase
    {
        private List<TodoItem> Items = new List<TodoItem>();

        private readonly ILogger<ToDoListController> _logger;
        private readonly IRepository<TodoItem> _repository;
        public ToDoListController(ILogger<ToDoListController> logger,
            IRepository<TodoItem> repository)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("")]
        public IActionResult GetAll()
        {
            return Ok(_repository.GetAll());
        }


        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_repository.Get(id));
        }

        [HttpPost("")]
        public IActionResult Post(TodoItem item)
        {
            return Ok(_repository.Save(item));
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            _repository.Delete(id);
            return Ok();
        }

    }
}
