enum ItemType {
    Health,
    Mana
}

class Item {
    constructor(public name: string, public type: ItemType, public quantity: number) {}
}

class Inventory {
    constructor(public items: Item[]) {}
}

export {
    Item, Inventory
}

