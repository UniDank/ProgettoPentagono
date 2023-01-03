enum Characters {
    Agoraco = 1,
    Danblos,
    Marcurion,
    Gioxon,
    Claphos
}

class Player {
    public maxHealth: number
    public maxMana: number
    public name

    constructor(public pid: Characters, public health: number, public mana: number) {
        this.name = Characters[pid]
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
    Player, Characters
}

