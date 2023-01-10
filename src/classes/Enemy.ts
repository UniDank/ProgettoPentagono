import { Player } from './Player'

class Enemy {
    public maxHealth: number
    public maxMana: number

    constructor(public name: string, public attack: number, public health: number, public mana: number, 
        public agility: number, public APs: number, public expReward: number) {
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
    Enemy
}

