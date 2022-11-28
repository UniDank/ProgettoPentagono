import { Scene } from 'phaser'
import backgroundPng from '../assets/Select_Background.png'
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
import selectPng from '../assets/ButtonPointer.png'
import btnSelect from '../assets/select_button.mp3'
import btnSwitch from '../assets/switch_button.mp3'
import { useBootStore } from '../../stores/bootStore'

export default class SelectScene extends Scene {
  private buttons: Phaser.GameObjects.Image[] = []
  private buttonSelector!: Phaser.GameObjects.Image
  private selectedButtonIndex = 0
  private selectAudio!: Phaser.Sound.BaseSound
  private switchAudio!: Phaser.Sound.BaseSound
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private sceneStore = useBootStore()

  constructor() {
    super({ key: 'SelectScene' })
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  preload() {
    this.load.image('selectBg', backgroundPng)
    this.load.image('selector', selectPng)
    this.load.audio('btnSelect', btnSelect)
    this.load.audio('btnSwitch', btnSwitch)
    this.load.aseprite('player1', playerPng1, playerJson1)
    this.load.aseprite('player2', playerPng2, playerJson2)
    this.load.aseprite('player3', playerPng3, playerJson3)
    this.load.aseprite('player4', playerPng4, playerJson4)
    this.load.aseprite('player5', playerPng5, playerJson5)
  }

  create() {
    this.selectAudio = this.sound.add('btnSelect')
    this.switchAudio = this.sound.add('btnSwitch')

    this.add.image(-this.scale.gameSize.width / 2.5, 0, 'selectBg').setScale(0.8).setOrigin(0)
    
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
    console.log("Personaggio %d selezionato!", this.selectedButtonIndex)
    this.scene.start('CombatScene')
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
