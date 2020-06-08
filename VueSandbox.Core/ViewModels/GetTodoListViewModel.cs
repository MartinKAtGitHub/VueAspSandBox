using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VueSandbox.Core.ViewModels
{
    public class GetTodoListViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<GetTodoItemViewModel> TodoItems { get; set; }
    }
}
