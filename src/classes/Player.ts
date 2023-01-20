import { ClassType, Entity } from './Entity'

class Player extends Entity {
    public maxAPs: number
    public currentExp: number
    public level: number
    public isLowHP = false
    public isKo = false

    constructor(
        public name: string, 
        public attack: number, public defense: number, 
        public health: number, public mana: number, 
        public agility: number, 
        public APs: number, public category: ClassType) {
        super(name, attack, defense, health, mana, agility, category)
        this.maxAPs = APs
        this.level = 1
        this.currentExp = 0
    }

    public addAPs(amount: number) {
        this.APs = Math.min(this.APs += amount, this.maxAPs)
    }

    public useAPs(amount: number): void {
        this.APs = Math.max(this.APs -= amount, 0)
    }

    public addExp(amount: number): void {
        this.currentExp += amount
        if (this.currentExp == 100) {
            this.currentExp = 0
            this.level += 1
            this.maxHealth += 10
            this.maxMana += 5
            this.maxAPs += 2
        }
    }
    
}

export {
    Player
}

