import { Scene } from 'phaser'

export default class DebugScene extends Scene {
    private fpsText!: Phaser.GameObjects.Text
    private mouseText!: Phaser.GameObjects.Text

    constructor() {
        super({ key: 'DebugScene', active: true })
    }

    init() {
        
    }

    preload() {
        console.log(this.game.scene.getScenes())
    }

    create() {
        this.fpsText = this.add.text(1, 1, 'FPS:', { fontFamily: 'Courier', fontSize: '1rem', fontStyle: 'bold', color: '#FF00FF' })
        
        this.mouseText = this.add.text(1, 10, 'Mouse', { fontFamily: 'Courier', fontSize: '1rem', fontStyle: 'bold', color: '#00FF00' })
    }

    update() {
        this.fpsText.setText(`FPS: ${this.game.loop.actualFps.toFixed(0)}`)

        let pointer = this.input.activePointer;
        this.mouseText.setText(`Mouse (x: ${pointer.x} | y: ${pointer.y})`)
    }
}
