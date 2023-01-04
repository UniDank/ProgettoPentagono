import { Scene } from 'phaser'
import WebFont from '../WebFont'
import cursorPng from '../assets/cursor.png'
import mainPng from '../assets/Main_Background.png'
import mainJson from '../assets/Main_Background.json'
import logoPng from '../assets/AnimatedLogo.png'
import logoJson from '../assets/AnimatedLogo.json'
import titlePng from '../assets/Animated_Title.png'
import titleJson from '../assets/Animated_Title.json'
import bgSong from '../assets/background_song.mp3'
import worldMap from '../assets/stages/world_map.png'
import dotMark from '../assets/stages/dotmark.png'
import nodeBlue from '../assets/stages/node_story.png'
import nodeRed from '../assets/stages/node_tutorial.png'
import nodeYellow from '../assets/stages/node_main.png'
import nodeGreen from '../assets/stages/node_lire.png'
import pointAdmin from '../assets/stages/point_admin.png'
import pointRegitare from '../assets/stages/point_regitare.png'
import pointBattle from '../assets/stages/point_battle.png'
import pointHome from '../assets/stages/point_home.png'
import pointTutorial from '../assets/stages/point_tutorial.png'
import bossRegitare from '../assets/stages/boss_battle_regitare.png'
import bossAdmin from '../assets/stages/boss_battle_admin.png'
import combatJson from '../assets/maps/Village.json'
import mapOutside from '../assets/maps/outside.png'
import mapBuilding from '../assets/maps/building.png'
import combatPng from '../assets/Battle.png'
import selectPng from '../assets/Select_Background.png'
import playerJson1 from '../assets/players/P1.json'
import playerPng1 from '../assets/players/P1.png'
import playerJson2 from '../assets/players/P2.json'
import playerPng2 from '../assets/players/P2.png'
import playerJson3 from '../assets/players/P3.json'
import playerPng3 from '../assets/players/P3.png'
import playerJson4 from '../assets/players/P4.json'
import playerPng4 from '../assets/players/P4.png'
import playerJson5 from '../assets/players/P5.json'
import playerPng5 from '../assets/players/P5.png'
import selectorPng from '../assets/ButtonPointer.png'
import btnSelect from '../assets/select_button.mp3'
import btnSwitch from '../assets/switch_button.mp3'
import { useMainStore } from '../../stores/mainStore'

export default class HandlerScene extends Scene {
    private sceneStore = useMainStore()
    parent: Phaser.Structs.Size = new Phaser.Structs.Size()
    sizer: Phaser.Structs.Size = new Phaser.Structs.Size()

    constructor() {
        super({ key: 'HandlerScene', active: true })
    }

    preload() {
        this.load.aseprite('animatedLogo', logoPng, logoJson)

        this.load.on('complete', () => this.time.delayedCall(3000, () => this.cameras.main.fadeOut(500, 0, 0, 0)))

        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.sceneStore.changeScene("BootScene")
            this.scene.launch('BootScene')
        })

        // select scene assets
        this.load.image('selectBg', selectPng)
        this.load.image('selector', selectorPng)
        this.load.audio('btnSelect', btnSelect)
        this.load.audio('btnSwitch', btnSwitch)
        this.load.aseprite('player1', playerPng1, playerJson1)
        this.load.aseprite('player2', playerPng2, playerJson2)
        this.load.aseprite('player3', playerPng3, playerJson3)
        this.load.aseprite('player4', playerPng4, playerJson4)
        this.load.aseprite('player5', playerPng5, playerJson5)

        // stage scene assets
        this.load.image('worldMap', worldMap)
        this.load.image('dotMark', dotMark)
        this.load.image('nodeBlue', nodeBlue)
        this.load.image('nodeRed', nodeRed)
        this.load.image('nodeYellow', nodeYellow)
        this.load.image('nodeGreen', nodeGreen)
        this.load.image('pointAdmin', pointAdmin)
        this.load.image('pointRegitare', pointRegitare)
        this.load.image('pointBattle', pointBattle)
        this.load.image('pointHome', pointHome)
        this.load.image('pointTutorial', pointTutorial)
        this.load.image('bossRegitare', bossRegitare)
        this.load.image('bossAdmin', bossAdmin)

        // combat scene assets
        this.load.image('combatBg', combatPng)
        this.load.image('tiles_Building', mapBuilding)
        this.load.image('tiles_Outside', mapOutside)
        this.load.tilemapTiledJSON('tiles_Map', combatJson)

        // boot scene assets
        this.load.aseprite('mainBg', mainPng, mainJson)
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
