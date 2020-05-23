using Microsoft.EntityFrameworkCore.Migrations;

namespace VueSandbox.Core.Migrations
{
    public partial class AddDescTodoModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Desc",
                table: "TodoItems",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Desc",
                table: "TodoItems");
        }
    }
}
