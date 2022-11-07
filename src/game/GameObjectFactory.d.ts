declare namespace Phaser.GameObjects {
    interface GameObjectFactory {
        buttonContainer(x: number, y: number, text: string, textStyle?: Phaser.Types.GameObjects.Text.TextStyle, texture?: string, tint?: number): IButtonContainer
        clickableText(x: number, y: number, text: string, textStyle?: Phaser.Types.GameObjects.Text.TextStyle): IClickableText
    }
}