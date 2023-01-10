import { Enemy } from './Enemy'

enum Characters {
    Agoraco,
    Danblos,
    Marcurion,
    Gioxon,
    Claphos
}

class Player {
    public maxHealth: number
    public maxMana: number
    public maxAPs: number
    public currentExp: number
    public level: number

    constructor(public name: string, public attack: number, public health: number, public mana: number, 
        public agility: number, public APs: number) {
        this.maxHealth = health
        this.maxMana = mana
        this.maxAPs = APs
        this.level = 1
        this.currentExp = 0
    }

    public setDamage(amount: number, target: Enemy | Player): void {
        target.health = Math.max(target.health -= amount, 0)
    }

    public addHealth(amount: number) {
        this.health = Math.min(this.health += amount, this.maxHealth)
    }
    
    public addMana(amount: number) {
        this.mana = Math.min(this.mana += amount, this.maxMana)
    }

    public useMana(amount: number): void {
        this.mana = Math.max(this.mana -= amount, 0)
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
    Player, Characters
}

