import Vector2 = Phaser.Math.Vector2
import { Direction, Position } from "grid-engine"

export class Entity {
    public sprite: Phaser.GameObjects.Sprite
    private movRange: number
    public animations: Phaser.Animations.Animation[] = []

    constructor(private scene: Phaser.Scene, public spriteName: string, private tilePos = new Vector2(0, 0)) {
        this.animations = scene.anims.createFromAseprite(spriteName)
        this.sprite = scene.add.sprite(0, 0, spriteName).setInteractive().setScale(2)
        this.movRange = 1
    }

    public getCharacterConfig(collision: string[] = []): any{
        return {
            id: this.spriteName,
            sprite: this.sprite,
            startPosition: { x: this.tilePos.x, y: this.tilePos.y },
            offsetY: -16,
            offsetX: -8,
            collides: {
                collisionGroups: collision
            }
        };
    }

    public movePlayerTo(position: Vector2): void{
        this.scene.gridEngine.moveTo(this.spriteName, { x: position.x, y: position.y })
    }

    private movePlayer(direction: Direction): void {
        this.scene.gridEngine.move(this.spriteName,direction);
    }

    public setEvent(event: string, fn: Function): void {
        this.sprite.on(event, fn)
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