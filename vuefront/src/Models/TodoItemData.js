export class TodoItemData {
    /**
     *
     */
    constructor(data) {
        this.id = data.id;
        this.itemName = data.name;
        this.itemDesc = data.desc;
        this.isComplete = data.isComplete;
        this.defaultId = data.id;
        this.defaultName = data.name;
        this.defaultDesc = data.desc;
        this.defaultIsComplete = data.isComplete;
    }
    resetDefault() {
        this.id = this.defaultId;
        this.itemName = this.defaultName;
        this.itemDesc = this.defaultName;
        this.isComplete = this.defaultIsComplete;
    }
    setNewDefaultValues(itemName, itemDesc, isComplete) {
        this.defaultName = itemName;
        this.defaultDesc = itemDesc;
        this.defaultIsComplete = isComplete;
    }
}
//# sourceMappingURL=TodoItemData.js.map