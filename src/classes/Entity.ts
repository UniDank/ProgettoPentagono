enum ClassType {
    Archer = 3,
    Tank = 1,
    Thief = 2,
    Mage = 4,
    Unknown = 10,
    Melee = 2
}

class Entity {
    public maxHealth: number
    public maxMana: number
    public isLowHP = false
    public isKo = false

    constructor(public name: string, public attack: number, public defense: number, public health: number, 
        public mana: number, public agility: number, public category: ClassType) {
        this.maxHealth = health
        this.maxMana = mana
    }

    public setDamage(amount: number, target: Entity): void {
        target.health = Math.max(target.health -= amount, 0)
        target.isLowHP = (target.health / target.maxHealth * 100) <= 20
        target.isKo = target.health == 0
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
}

export {
    ClassType, Entity
}