class Enemy {
    public maxHealth: number
    public maxMana: number

    constructor(public name: string, public health: number, public mana: number) {
        this.maxHealth = health
        this.maxMana = mana
    }

    public setDamage(amount: number): void {
        this.health = Math.max(this.health -= amount, 0)
    }

    public useMana(amount: number): void {
        this.mana = Math.max(this.mana -= amount, 0)
    }
}

export {
    Enemy
}

