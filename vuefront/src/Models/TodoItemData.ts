export class TodoItemData {
    id: number;
    itemName: string;
    itemDesc: string;
    isComplete: boolean;

    private defaultId: number;
    private defaultName: string;
    private defaultDesc: string;
    private defaultIsComplete: boolean;
    /**
     *
     */
    constructor(data: any) {

        this.id = data.id;
        this.itemName = data.name;
        this.itemDesc = data.desc;
        this.isComplete = data.isComplete;

        this.defaultId = data.id;
        this.defaultName = data.name;
        this.defaultDesc = data.desc;
        this.defaultIsComplete = data.isComplete;
    }

    public resetDefault() {
        this.id = this.defaultId;
        this.itemName = this.defaultName;
        this.itemDesc = this.defaultName
        this.isComplete = this.defaultIsComplete;
    }
}