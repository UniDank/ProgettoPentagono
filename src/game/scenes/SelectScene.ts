import { Scene } from 'phaser'
import { useMainStore } from '../../stores/mainStore'

export default class SelectScene extends Scene {
  private buttons: Phaser.GameObjects.Image[] = []
  private buttonSelector!: Phaser.GameObjects.Image
  private selectedButtonIndex = 0
  private selectAudio!: Phaser.Sound.BaseSound
  private switchAudio!: Phaser.Sound.BaseSound
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private sceneStore = useMainStore()

  constructor() {
    super({ key: 'SelectScene' })
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  preload() {
    
  }

  create() {
    this.selectAudio = this.sound.add('btnSelect')
    this.switchAudio = this.sound.add('btnSwitch')

    this.add.image(0, 0, 'selectBg').setOrigin(0)
    
    this.anims.createFromAseprite('player1')
    const player1 = this.add.sprite(this.scale.gameSize.width * 0.1, this.scale.gameSize.height / 2, 'player1').setInteractive()
    player1.play({ key: 'Idle1', repeat: -1, frameRate: 5 })

    this.anims.createFromAseprite('player2')
    const player2 = this.add.sprite(this.scale.gameSize.width * 0.3, this.scale.gameSize.height / 2, 'player2').setInteractive()
    player2.play({ key: 'Idle2', repeat: -1, frameRate: 5 })

    this.anims.createFromAseprite('player3')
    const player3 = this.add.sprite(this.scale.gameSize.width * 0.5, this.scale.gameSize.height / 2, 'player3').setInteractive()
    player3.play({ key: 'Idle3', repeat: -1, frameRate: 5 })

    this.anims.createFromAseprite('player4')
    const player4 = this.add.sprite(this.scale.gameSize.width * 0.7, this.scale.gameSize.height / 2, 'player4').setInteractive()
    player4.play({ key: 'Idle4', repeat: -1, frameRate: 5 })

    this.anims.createFromAseprite('player5')
    const player5 = this.add.sprite(this.scale.gameSize.width * 0.9, this.scale.gameSize.height / 2, 'player5').setInteractive()
    player5.play({ key: 'Idle5', repeat: -1, frameRate: 5 })

    this.buttonSelector = this.add.image(this.scale.gameSize.width * 0.1, this.scale.gameSize.height * 0.675, 'selector')
      .setScale(0.65).setRotation(4.71)

    this.buttons.push(...[player1, player2, player3, player4, player5])

    this.buttons.forEach((btn, i) => btn.on('pointerover', () => this.selectButton(i)))
    
    this.buttons.forEach((btn, i) => btn.on('pointerup', () => this.confirmSelection()))
    
    this.sceneStore.$onAction(({ name, args }) => {
      if (name === 'changeScene') this.scene.start(args[0])
    })
  }

  selectButton(index: number) {
    const button = this.buttons[index]
    this.buttonSelector.x = button.x
    this.selectedButtonIndex = index
    this.switchAudio.play()
  }

  selectNextButton(change = 1) {
    let index = this.selectedButtonIndex + change
    if (index >= this.buttons.length) index = 0
    else if (index < 0) index = this.buttons.length - 1
    this.selectButton(index)
  }

  confirmSelection() {
    this.sceneStore.changeScene('StageScene')
    this.selectAudio.play()
  }

  update() {
    const leftJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.left!)
    const rightJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.right!)
    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space!)

    if (leftJustPressed) this.selectNextButton(-1)
    else if (rightJustPressed) this.selectNextButton(1)
    else if (spaceJustPressed) this.confirmSelection()
  }
}