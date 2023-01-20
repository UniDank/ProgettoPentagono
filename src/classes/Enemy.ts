import { ClassType, Entity } from './Entity'

class Enemy extends Entity {
    constructor(
        public name: string, 
        public attack: number, public defense: number, 
        public health: number, public mana: number, 
        public agility: number, 
        public expReward: number, public category: ClassType) {
        super(name, attack, defense, health, mana, agility, category)
    }
}

export {
    Enemy
}

