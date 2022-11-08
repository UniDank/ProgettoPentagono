import { Scene } from 'phaser'
import fullscreenPng from '../assets/fullscreen.png'

export default class DebugScene extends Scene {
    private fpsText!: Phaser.GameObjects.Text
    private mouseText!: Phaser.GameObjects.Text
    private fullscreenBtn!: Phaser.GameObjects.Image

    constructor() {
        super({ key: 'DebugScene', active: true })
    }

    init() {

    }

    preload() {
        this.load.spritesheet('fullscreen', fullscreenPng, { frameWidth: 64, frameHeight: 64 })
    }

    create() {
        this.scene.bringToTop()

        this.fpsText = this.add.text(0, 0, 'FPS:', {
            fontSize: '16px',
            padding: { x: 2, y: 2 },
            fontStyle: 'bold',
            stroke: '#353535',
            strokeThickness: 3,
            color: '#00FF00',
            resolution: 3
        })

        this.mouseText = this.add.text(0, this.scale.gameSize.height - 20, 'Mouse', {
            fontSize: '16px',
            padding: { x: 2, y: 2 },
            fontStyle: 'bold',
            stroke: '#353535',
            strokeThickness: 3,
            color: '#00FF00',
            resolution: 3
        })

        this.fullscreenBtn = this.add.image(this.scale.gameSize.width - 5, 5, 'fullscreen', 0).setOrigin(1, 0).setScale(0.35).setInteractive()

        this.fullscreenBtn.on('pointerup', () => {
            this.fullscreenBtn.setFrame(this.scale.isFullscreen ? 1 : 0)
            this.scale.toggleFullscreen()
        })
    }

    update() {
        this.fpsText.setText(`FPS: ${this.game.loop.actualFps.toFixed(0)}`)

        let pointer = this.input.activePointer;
        this.mouseText.setText(`Mouse (x: ${pointer.x.toFixed(0)} | y: ${pointer.y.toFixed(0)})`)

        this.fullscreenBtn.setFrame(this.scale.isFullscreen ? 1 : 0)
    }
}
