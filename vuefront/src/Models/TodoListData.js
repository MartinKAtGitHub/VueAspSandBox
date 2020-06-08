import { TodoItemData } from '@/Models/TodoItemData';
export class TodoListData {
    /**
     *
     */
    constructor(todoListViewModel) {
        this.todoItems = [];
        this.id = todoListViewModel.id;
        this.listName = todoListViewModel.name;
        todoListViewModel.todoItems.forEach((element) => {
            this.todoItems.push(new TodoItemData(element));
        });
        // todoListViewModel.todoItems.array.forEach((element: any) => {
        //     this.todoItems.push(new TodoItemData(element));
        // });
    }
}
//# sourceMappingURL=TodoListData.js.map