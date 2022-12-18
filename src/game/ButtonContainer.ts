import Phaser from 'phaser'
import Button from './Button'

declare global {
    interface IButtonContainer extends IButton {
        setText(text: string): this
        setTextStyle(style: Phaser.Types.GameObjects.Text.TextStyle): this
    }
}

export default class ButtonContainer extends Phaser.GameObjects.Container implements IButtonContainer {
    private button: IButton
    private text: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, x: number, y: number, text: string = '', textStyle: Phaser.Types.GameObjects.Text.TextStyle = {}, texture: string = '', tint: number = 0xffffff) {
        super(scene, x, y)

        this.button = new Button(scene, 0, 0, texture, tint)
        this.text = scene.add.text(0, 0, text, textStyle).setOrigin(0.5, 0.5)

        this.add(this.button)
        this.add(this.text)
    }

    onClick(handler?: (value: Phaser.Input.Pointer) => void) {
        return this.button.onClick(handler)
    }

    setText(text: string) {
        this.text.text = text
        return this
    }

    setTextStyle(style: Phaser.Types.GameObjects.Text.TextStyle) {
        this.text.setStyle(style)
        return this
    }

    setUpTexture(texture: string) {
        this.button.setUpTexture(texture)
        return this
    }

    setUpTint(tint: number) {
        this.button.setUpTint(tint)
        return this
    }

    setDownTexture(texture: string): this {
        this.button.setDownTexture(texture)
        return this
    }

    setDownTint(tint: number): this {
        this.button.setDownTint(tint)
        return this
    }

    setOverTexture(texture: string): this {
        this.button.setOverTexture(texture)
        return this
    }

    setOverTint(tint: number): this {
        this.button.setOverTint(tint)
        return this
    }

    setDisabledTexture(texture: string): this {
        this.button.setDisabledTexture(texture)
        return this
    }

    setDisabledTint(tint: number): this {
        this.button.setDisabledTint(tint)
        return this
    }

    setDisabled(disabled: boolean): this {
        this.button.setDisabled(disabled)
        return this
    }
}