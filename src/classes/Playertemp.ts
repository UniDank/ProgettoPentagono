import Vector2 = Phaser.Math.Vector2;
import {Direction} from "grid-engine";

export class Playertemp{
    public player: Phaser.GameObjects.Sprite
    private movrange: number


    constructor(public scene: Phaser.Scene,
                public idplayer: string ,
                private tilePos: Phaser.Math.Vector2 = new Vector2(0,0)
    ) {
        scene.anims.createFromAseprite(idplayer)
        this.player = scene.add.sprite(0, 0, idplayer).setInteractive().setScale(1.5)
        this.movrange = 1;


    }

    /***
     * Used to get Character config for gridEngine plugin
     * @param collision  string array of all object that needs to collide. By default, the array is empty
     * @return json object
     */

    public getCharacterConfig(collision: string[] = []): any{
        return {
            id: this.idplayer,
            sprite: this.player,
            startPosition: { x: this.tilePos.x, y: this.tilePos.y },
            offsetY: -16,
            offsetX: -8,

            collides:{
                collisionGroups: collision
            }
        };
    }

    public movePlayerTo(position: Vector2): void{
        this.scene.gridEngine.moveTo(this.idplayer, { x: position.x, y: position.y })
    }

    private movePlayer(direction: Direction): void {
        this.scene.gridEngine.move(this.idplayer,direction);
    }
    /***
     * Method used to move the player.
     * @param cursors Cursor of input from phaser 3
     * */

    public moveWithKeys(cursors: Phaser.Types.Input.Keyboard.CursorKeys): void{
        switch (true){
            case cursors.left.isDown:
                this.movePlayer(Direction.UP_LEFT);
                break;
            case cursors.right.isDown:
                this.movePlayer(Direction.DOWN_RIGHT);
                break;
            case cursors.up.isDown:
                this.movePlayer(Direction.UP_RIGHT);
                break;
            case cursors.down.isDown:
                this.movePlayer(Direction.DOWN_LEFT);
                break;
        }
    }

    public moveWkeys(direction: string): void{
        switch (true){
            case direction === Direction.LEFT:
                this.movePlayer(Direction.UP_LEFT);
                break;
            case direction === Direction.RIGHT:
                this.movePlayer(Direction.DOWN_RIGHT);
                break;
            case direction === Direction.UP:
                this.movePlayer(Direction.UP_RIGHT);
                break;
            case direction === Direction.DOWN:
                this.movePlayer(Direction.DOWN_LEFT);
                break;
        }


    }



    public setEvent(nameevent: string, fn: Function): void{
        this.player.on(nameevent,fn);
    }

    public getPosition(): Vector2 {
        return this.scene.gridEngine.getPosition(this.idplayer);
    }

    public isMoving(): boolean{
        return this.scene.gridEngine.isMoving(this.idplayer);
    }

    public get getRangeMov(): number{
        return this.movrange;
    }

    


}