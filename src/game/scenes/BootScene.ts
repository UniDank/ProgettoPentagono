import { Scene } from 'phaser'
import { useMainStore } from '../../stores/mainStore'

export default class BootScene extends Scene {
  private sceneStore = useMainStore()

  constructor() {
    super({ key: 'BootScene' })
  }

  init() {
  
  }

  preload() {
    
  }

  create() {
    const mainCamera = this.cameras.main
    mainCamera.fadeIn(500, 0, 0, 0)

    this.anims.createFromAseprite('mainBg')
    const bgSprite = this.add.sprite(0, 0, 'mainBg').setOrigin(0)
    bgSprite.play({ key: 'Animation', repeat: -1, frameRate: 15 })
    
    this.anims.createFromAseprite('animatedTitle')
    const titleSprite = this.add.sprite(this.scale.gameSize.width * 0.025, this.scale.gameSize.height * 0.05, 'animatedTitle').setOrigin(0).setScale(2)
    titleSprite.play({ key: 'Clean', repeat: -1, frameRate: 15, repeatDelay: 3000 })

    this.sceneStore.$onAction(({ name, args }) => {
      if (name === 'changeScene') {
        mainCamera.fadeOut(500, 0, 0, 0)
        mainCamera.on('camerafadeoutcomplete', () => this.scene.start(args[0]))
      }
    })

    this.sound.stopByKey("stageSong")
    this.sound.add('bgSong').play({ loop: true })
  }

  update() {
    
  }
}
