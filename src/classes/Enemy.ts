import { Player } from './Player'

enum EnemyType {
    Archer,
    Tank,
    Thief,
    Mage
}

class Enemy {
    public maxHealth: number
    public maxMana: number

    constructor(public name: string, public health: number, public mana: number, public attack: number, public defense: number, 
        public agility: number, public expReward: number, public category: EnemyType) {
        this.maxHealth = health
        this.maxMana = mana
    }

    public setDamage(amount: number, target: Player | Enemy): void {
        target.health = Math.max(target.health -= amount, 0)
    }

    public useMana(amount: number): void {
        this.mana = Math.max(this.mana -= amount, 0)
    }
}

export {
    Enemy, EnemyType
}

