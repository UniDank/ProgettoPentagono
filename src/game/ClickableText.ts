import Phaser from 'phaser'
import { Subject, Subscription } from 'rxjs'

declare global {
    interface IClickableText extends Phaser.GameObjects.Text {
        onClick(handler: (pointer: Phaser.Input.Pointer) => void): void
        setDisabled(disabled: boolean): void
    }
}

export default class ClickableText extends Phaser.GameObjects.Text implements IClickableText {
    private clickSubject: Subject<Phaser.Input.Pointer> = new Subject()

    constructor(scene: Phaser.Scene, x: number, y: number, text: string = '', textStyle: Phaser.Types.GameObjects.Text.TextStyle = {}) {
        super(scene, x, y, text, textStyle)
        
        this.setText(text)

        this.setStyle(textStyle)

        this.setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.handleUp, this)
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, this.handleOut, this)
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.handleDown, this)
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, this.handleOver, this)
    }

    onClick(handler: (pointer: Phaser.Input.Pointer) => void) {
        return this.clickSubject.asObservable().subscribe({ next: handler })
    }

    setDisabled(disabled: boolean) {
        disabled ? this.removeInteractive() : this.setInteractive()
    }

    private handleUp(pointer: Phaser.Input.Pointer) {
        this.handleOver(pointer)
        this.clickSubject.next(pointer)
    }

    private handleOut(pointer: Phaser.Input.Pointer) {

    }

    private handleDown(pointer: Phaser.Input.Pointer) {

    }

    private handleOver(pointer: Phaser.Input.Pointer) {
    }
}