import { Scene } from 'phaser'
import eventsCenter from '../EventsCenter'
import ClickableText from '../ClickableText'
import selectPng from '../assets/ButtonPointer.png'
import titlePng from '../assets/Animated_Title.png'
import titleJson from '../assets/Animated_Title.json'
import backgroundPng from '../assets/Wall.png'
import backgroundJson from '../assets/Wall.json'

export default class BootScene extends Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private buttons: Phaser.GameObjects.Text[] = []
  private buttonSelector!: Phaser.GameObjects.Image
  private selectedButtonIndex = 0

  constructor() {
    super({ key: 'BootScene' })
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  preload() {
    this.load.image('selector', selectPng)
    this.load.aseprite('animatedTitle', titlePng, titleJson)
    this.load.aseprite('mainBg', backgroundPng, backgroundJson)
  }

  create() {
    const { width, height } = this.scale
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

    this.anims.createFromAseprite('mainBg');
    const bgSprite = this.add.sprite(230, 230, 'animatedTitle').setScale(1.125)
    bgSprite.play({ key: 'Animated', repeat: -1, frameRate: 15 })

    this.anims.createFromAseprite('animatedTitle');
    const titleSprite = this.add.sprite(185, 65, 'animatedTitle').setScale(1.5)
    titleSprite.play({ key: 'Flash', repeat: -1, frameRate: 15, repeatDelay: 3000 })

    let gameNew = this.add.text(25, 200, 'Nuova Partita', { fontFamily: 'Alagard', fontSize: '2rem' }).setInteractive().setResolution(10)
    let gameContinue = this.add.text(25, 250, 'Continua', { fontFamily: 'Alagard', fontSize: '2rem' }).setInteractive().setResolution(10)
    let gameCredits = this.add.text(25, 300, 'Crediti', { fontFamily: 'Alagard', fontSize: '2rem' }).setInteractive().setResolution(10)
    let gameExit = this.add.text(25, 350, 'Esci', { fontFamily: 'Alagard', fontSize: '2rem' }).setInteractive().setResolution(10)

    this.buttonSelector = this.add.image(50, 50, 'selector').setScale(0.5)

    this.buttons.push(...[gameNew, gameContinue, gameCredits, gameExit])

    if (true) { // se non c'è alcun salvataggio, disabilitarlo
      this.disableButton(1)
      this.buttons.splice(1, 1)
    }

    this.buttons.forEach((btn, i) => {
      btn.on('pointerover', () => this.selectButton(i))
    });

    gameNew.on('pointerup', () => {
      console.log('new')
      //this.scene.start('MainScene')
    })
  
    gameContinue.on('pointerup', () => {
      console.log('continue')
    })
  
    gameCredits.on('pointerup', () => {
      console.log('credits')
    })

    gameExit.on('pointerup', () => {
      this.game.destroy(true, true)
      window.require('electron').ipcRenderer.invoke('close-window')
    })

    this.selectButton(0)

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      gameNew.removeAllListeners()
      gameContinue.removeAllListeners()
      gameCredits.removeAllListeners()
      gameExit.removeAllListeners()
    })
  }

  disableButton(index: number) {
    const button = this.buttons[index]
    button.disableInteractive()
    button.setTint(0xAAAAAA)
  }

  selectButton(index: number) {
    const currentButton = this.buttons[this.selectedButtonIndex]
    currentButton.setTint(0xFFFFFF)
    const button = this.buttons[index]
    button.setTint(0xE01D35)
    this.buttonSelector.x = button.x - 15
    this.buttonSelector.y = button.y + button.displayHeight * 0.5
    this.selectedButtonIndex = index
  }

  selectNextButton(change = 1) {
    let index = this.selectedButtonIndex + change
    if (index >= this.buttons.length) index = 0
    else if (index < 0) index = this.buttons.length - 1
    this.selectButton(index)
  }

  confirmSelection() {
    const button = this.buttons[this.selectedButtonIndex]
    button.emit('pointerup')
  }

  update() {
    const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up!)
    const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down!)
    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space!)

    if (upJustPressed) this.selectNextButton(-1)
    else if (downJustPressed) this.selectNextButton(1)
    else if (spaceJustPressed) this.confirmSelection()
  }
}
