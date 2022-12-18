import { Scene } from 'phaser'
import WebFont from '../WebFont'
import cursorPng from '../assets/cursor.png'
import backgroundPng from '../assets/Main_Background.png'
import backgroundJson from '../assets/Main_Background.json'
import logoPng from '../assets/AnimatedLogo.png'
import logoJson from '../assets/AnimatedLogo.json'
import titlePng from '../assets/Animated_Title.png'
import titleJson from '../assets/Animated_Title.json'
import bgSong from '../assets/background_song.mp3'

export default class HandlerScene extends Scene {
    parent: Phaser.Structs.Size = new Phaser.Structs.Size()
    sizer: Phaser.Structs.Size = new Phaser.Structs.Size()

    constructor() {
        super({ key: 'HandlerScene', active: true })
    }

    preload() {
        this.load.aseprite('animatedLogo', logoPng, logoJson)

        this.load.on('complete', () => this.time.delayedCall(4000, () => this.cameras.main.fadeOut(750, 0, 0, 0)))

        this.cameras.main.once('camerafadeoutcomplete', () => this.scene.launch('BootScene'))

        this.load.aseprite('mainBg', backgroundPng, backgroundJson)
        this.load.audio('bgSong', bgSong)
        this.load.aseprite('animatedTitle', titlePng, titleJson)
        this.load.crossOrigin = 'anonymous'
        this.load.addFile(new WebFont(this.load, 'Alagard', 'custom', '../style.css'))
    }

    create() {
        this.anims.createFromAseprite('animatedLogo')
        const logoSprite = this.add.sprite(this.scale.gameSize.width / 2, this.scale.gameSize.height / 2, 'animatedLogo')
        logoSprite.play({ key: 'Morph', frameRate: 10 })
            .on('animationcomplete', () => logoSprite.play({ key: 'Flash', repeat: -1, frameRate: 12, repeatDelay: 2000 }))
        
        this.input.setDefaultCursor(`url(${cursorPng}), pointer`)

        this.updateCamera(this.scale.gameSize.width, this.scale.gameSize.height)

        this.scale.on('resize', this.resize, this)
    }

    updateCamera(width: number, height: number) { // https://codepen.io/yandeu/pen/oVBybd?editors=0010
        /*let defWidth = 500
        let defHeight = 500
        let maxWidth = 1000
        let maxHeight = 1000

        let scale = Math.min(defWidth / width, defHeight / height)
        let newWidth = Math.min(width / scale, maxWidth)
        let newHeight = Math.min(height / scale, maxHeight)

        let defaultRatio = defWidth / defHeight
        let maxRatioWidth = maxWidth / defHeight
        let maxRatioHeight = defWidth / maxHeight

        let smooth = 1
        const maxSmoothScale = 1.15
        const normalize = (value: number, min: number, max: number) => (value - min) / (max - min)

        if (width / height < defWidth / defHeight) {
            smooth = -normalize(newWidth / newHeight, defaultRatio, maxRatioWidth) / (1 / (maxSmoothScale - 1)) + maxSmoothScale
        } else {
            smooth = -normalize(newWidth / newHeight, defaultRatio, maxRatioHeight) / (1 / (maxSmoothScale - 1)) + maxSmoothScale
        }

        this.game.scale.resize(newWidth * smooth, newHeight * smooth)
        this.game.canvas.style.width = newWidth * scale + 'px'
        this.game.canvas.style.height = newHeight * scale + 'px'
        this.game.canvas.style.marginTop = `${(defHeight - newHeight * scale) / 2}px`
        this.game.canvas.style.marginLeft = `${(defWidth - newWidth * scale) / 2}px`*/

        /*this.cameras.resize(width, height)
        this.cameras.main.setViewport(0, 0, width, height)
        this.cameras.main.setZoom(width / 500, height / 500)
        this.cameras.main.centerOn(width / 2, height / 2)*/
    }

    resize() {
        let { innerWidth, innerHeight } = window
        let canvas = this.game.canvas
        canvas.style.width = `${innerWidth}px`
        canvas.style.height = `${innerHeight}px`

        this.updateCamera(innerWidth, innerHeight);
    }
}
