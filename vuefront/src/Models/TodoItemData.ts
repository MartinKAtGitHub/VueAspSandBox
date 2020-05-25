export class TodoItemData {
    id: number;
    itemName: string;
    itemDesc: string;
    isComplete: boolean;

    /**
     *
     */
    constructor(data: any) {

        this.id = data.id;
        this.itemName = data.name;
        this.itemDesc = data.desc;
        this.isComplete = data.isComplete;
    }
}