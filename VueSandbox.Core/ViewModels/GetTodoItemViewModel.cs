using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VueSandbox.Core.ViewModels
{
    public class GetTodoItemViewModel
    {
        public long Id { get; set; }
        public int TodoListId { get; set; }
      
        public string Name { get; set; }
        public string Desc { get; set; }
        public bool IsComplete { get; set; }

    }
}
