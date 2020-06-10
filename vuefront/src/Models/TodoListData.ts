import { TodoItemData } from '@/Models/TodoItemData';

export class TodoListData {
    id: number;
    listName: string;
    todoItems: TodoItemData[] = [];

    constructor(todoListViewModel: any) {
        this.id = todoListViewModel.id;
        this.listName = todoListViewModel.name;


        todoListViewModel.todoItems?.forEach((element: any) => {
            this.todoItems.push(new TodoItemData(element));
        });
    }
}