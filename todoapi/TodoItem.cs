using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoListAPI
{
    public class TodoItem
    {
        public int Id { get; set; }
        public string Task { get; set; }
        public bool Done { get; set; }
        public DateTime TimeStamp { get; set; }
    }
}
