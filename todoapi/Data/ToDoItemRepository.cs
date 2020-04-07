using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoListAPI.Data
{
    public class ToDoItemRepository : IRepository<TodoItem>
    {
        private static readonly ICollection<TodoItem> items;

        static ToDoItemRepository() {
            items = new Collection<TodoItem>
            {
                new TodoItem{ Id = 1, Task = "Task1", Done = false, TimeStamp = DateTime.Now }
            };
        }
        public IEnumerable<TodoItem> GetAll()
        {
            return items;
        }

        public void Delete(int entityId)
        {
            var todoitem = items.FirstOrDefault(x => x.Id == entityId);
            if (todoitem != null)
            {
                items.Remove(todoitem);
            }
        }

        public TodoItem Get(int id)
        {
            return items.FirstOrDefault(x => x.Id == id);
        }

        public TodoItem Save(TodoItem entity)
        {
            items.Add(entity);
            return entity;
        }
    }
}
