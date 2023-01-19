import Vector2 = Phaser.Math.Vector2
import { useCombatStore } from '../stores/combatStore'
import { Direction, Position, MoveToResult } from "grid-engine"

export class Entity {
    private movRange: number
    private combatStore = useCombatStore()
    public sprite: Phaser.GameObjects.Sprite
    public spriteName = ""
    public animations: Phaser.Animations.Animation[] = []

    constructor(private scene: Phaser.Scene, public entityName: string, private tilePos = new Vector2(0, 0)) {
        this.spriteName = entityName.slice(0, entityName.lastIndexOf(' ') != -1 ? entityName.lastIndexOf(' ') : undefined).toLowerCase()
        this.sprite = scene.add.sprite(0, 0, this.spriteName).setInteractive().setScale(1.6)
        this.animations = this.sprite.anims.createFromAseprite(this.scene.game, this.spriteName)
        this.movRange = 1
    }

    public getCharacterConfig(collision: string[] = []): any {
        return {
            id: this.spriteName,
            sprite: this.sprite,
            startPosition: { x: this.tilePos.x, y: this.tilePos.y },
            offsetY: -16,
            offsetX: -8,
            collides: {
                collisionGroups: collision
            }
        }
    }

    public movePlayerTo(position: Vector2): void {
        const moveObv = this.scene.gridEngine.moveTo(this.spriteName, { x: position.x, y: position.y })
        moveObv.subscribe({
            next: (rep) => {
                if (rep.result == MoveToResult.SUCCESS) this.combatStore.updateCombatLog(`${this.entityName} si è spostato!\n`)
                else this.combatStore.updateCombatLog(`${this.entityName} non può andare lì!\n`)
            }
        })
    }

    private movePlayer(direction: Direction): void {
        this.scene.gridEngine.move(this.spriteName, direction)
    }

    public setEvent(event: string, fn: Function): void {
        this.sprite.on(event, fn)
    }

    public getInitPosition(): Vector2 {
        return new Vector2(this.tilePos.x, this.tilePos.y)
    }

    public getPosition(): Position {
        return this.scene.gridEngine.getPosition(this.spriteName)
    }

    public isMoving(): boolean {
        return this.scene.gridEngine.isMoving(this.spriteName)
    }

    public getRangeMov(): number {
        return this.movRange
    }
}