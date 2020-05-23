using Microsoft.EntityFrameworkCore;

namespace VueSandbox.Core.Models
{
    public class TodoDbContext : DbContext
    {
        public DbSet<TodoItem> TodoItems { get; set; }

        public TodoDbContext(DbContextOptions<TodoDbContext> options)
            : base(options)
        {
        }

    }
}
