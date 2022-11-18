import { Scene } from 'phaser'

import titlePng from '../assets/Animated_Title.png'
import titleJson from '../assets/Animated_Title.json'

import { useBootStore } from '../../stores/bootStore'

export default class BootScene extends Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private sceneStore = useBootStore()

  constructor() {
    super({ key: 'BootScene' })
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  preload() {
    this.load.aseprite('animatedTitle', titlePng, titleJson)
  }

  create() {
    this.anims.createFromAseprite('mainBg');
    const bgSprite = this.add.sprite(this.scale.gameSize.width / 3, this.scale.gameSize.height / 2, 'mainBg').setScale(0.85)
    bgSprite.play({ key: 'Animation', repeat: -1, frameRate: 15 })

    const bgAudio = this.sound.add('bgSong')
    bgAudio.play({ loop: true })
    
    this.anims.createFromAseprite('animatedTitle');
    const titleSprite = this.add.sprite(this.scale.gameSize.width * 0.35, this.scale.gameSize.height * 0.15, 'animatedTitle').setScale(2)
    titleSprite.play({ key: 'Flash', repeat: -1, frameRate: 15, repeatDelay: 3000 })

    this.sceneStore.$onAction(({ name, args }) => {
      if (name === 'changeScene') this.scene.start(args[0])
    })
  }

  update() {
    
  }
}
