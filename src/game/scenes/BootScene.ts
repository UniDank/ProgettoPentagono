import { Scene } from 'phaser'

import selectPng from '../assets/ButtonPointer.png'
import titlePng from '../assets/Animated_Title.png'
import titleJson from '../assets/Animated_Title.json'
import bgSong from '../assets/background_song.mp3'
import btnSelect from '../assets/select_button.mp3'
import btnSwitch from '../assets/switch_button.mp3'

import { useBootStore } from '../../stores/bootStore'

export default class BootScene extends Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private buttons: Phaser.GameObjects.Text[] = []
  private buttonSelector!: Phaser.GameObjects.Image
  private selectedButtonIndex = 0
  private selectAudio!: Phaser.Sound.BaseSound
  private switchAudio!: Phaser.Sound.BaseSound
  private sceneStore = useBootStore()

  constructor() {
    super({ key: 'BootScene' })
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  preload() {
    this.load.audio('bgSong', bgSong);
    /*this.load.audio('btnSelect', btnSelect)
    this.load.audio('btnSwitch', btnSwitch)
    this.load.image('selector', selectPng)*/
    this.load.aseprite('animatedTitle', titlePng, titleJson)
  }

  create() {
    //this.selectAudio = this.sound.add('btnSelect')
    //this.switchAudio = this.sound.add('btnSwitch')

    this.anims.createFromAseprite('mainBg');
    const bgSprite = this.add.sprite(this.scale.gameSize.width / 3, this.scale.gameSize.height / 2, 'mainBg').setScale(0.85)
    bgSprite.play({ key: 'Animation', repeat: -1, frameRate: 15 })

    const bgAudio = this.sound.add('bgSong')
    bgAudio.play({ loop: true })
    
    this.anims.createFromAseprite('animatedTitle');
    const titleSprite = this.add.sprite(this.scale.gameSize.width * 0.35, this.scale.gameSize.height * 0.15, 'animatedTitle').setScale(2)
    titleSprite.play({ key: 'Flash', repeat: -1, frameRate: 15, repeatDelay: 3000 })

    /*let gameNew = this.add.text(25, 200, 'Nuova Partita', { 
      fontFamily: 'Alagard', fontSize: '2rem', stroke: '#353535', strokeThickness: 5, resolution: 10
    }).setInteractive()
    let gameContinue = this.add.text(25, 250, 'Continua', { 
      fontFamily: 'Alagard', fontSize: '2rem', stroke: '#353535', strokeThickness: 5, resolution: 10
    }).setInteractive()
    let gameOptions = this.add.text(25, 300, 'Opzioni', { 
      fontFamily: 'Alagard', fontSize: '2rem', stroke: '#353535', strokeThickness: 5, resolution: 10
    }).setInteractive()
    let gameCredits = this.add.text(25, 350, 'Crediti', { 
      fontFamily: 'Alagard', fontSize: '2rem', stroke: '#353535', strokeThickness: 5, resolution: 10
    }).setInteractive()
    let gameExit = this.add.text(25, 400, 'Esci', { 
      fontFamily: 'Alagard', fontSize: '2rem', stroke: '#353535', strokeThickness: 5, resolution: 10
    }).setInteractive()

    this.buttonSelector = this.add.image(50, 50, 'selector').setScale(0.5)

    const startGroup = this.add.group().addMultiple([titleSprite, bgSprite, gameNew, gameContinue, gameOptions, gameCredits, gameExit])

    this.buttons.push(...[gameNew, gameContinue, gameOptions, gameCredits, gameExit])

    if (true) { // se non c'è alcun salvataggio, disabilitare il bottone 'Continue'
      this.disableButton(1)
      this.buttons.splice(1, 1)
    }

    this.buttons.forEach((btn, i) => btn.on('pointerover', () => this.selectButton(i)))

    gameNew.on('pointerup', () => {
      this.selectAudio.play()
      this.scene.start('MainScene')
    })
  
    gameContinue.on('pointerup', () => {
      this.selectAudio.play()
    })

    gameOptions.on('pointerup', () => {
      this.selectAudio.play()
      startGroup.setAlpha(0.5)
      this.buttons.forEach(btn => btn.disableInteractive())
    })
  
    gameCredits.on('pointerup', () => {
      this.selectAudio.play()
    })

    gameExit.on('pointerup', () => {
      this.selectAudio.play()
      this.game.destroy(true, true)
      window.require('electron').ipcRenderer.invoke('close-window')
    })

    this.selectButton(0)

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      gameNew.removeAllListeners()
      gameContinue.removeAllListeners()
      gameOptions.removeAllListeners()
      gameCredits.removeAllListeners()
      gameExit.removeAllListeners()
    })*/

    this.sceneStore.$onAction(({ name, args }) => {
      if (name === 'changeScene') this.scene.start(args[0])
    })
  }

  /*disableButton(index: number) {
    const button = this.buttons[index]
    button.disableInteractive()
    button.setColor('#AAAAAA')
    //button.setStroke('', 0)
  }

  selectButton(index: number) {
    const currentButton = this.buttons[this.selectedButtonIndex]
    currentButton.setColor('#FFFFFF')
    const button = this.buttons[index]
    button.setColor('#E01D35')
    this.buttonSelector.x = button.x - 15
    this.buttonSelector.y = button.y + button.displayHeight * 0.5
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
    const button = this.buttons[this.selectedButtonIndex]
    button.emit('pointerup')
  }*/

  update() {
    /*const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up!)
    const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down!)
    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space!)

    if (upJustPressed) this.sceneStore.selectButton(-1) //this.selectNextButton(-1)
    else if (downJustPressed) this.sceneStore.selectButton(1) //this.selectNextButton(1)
    else if (spaceJustPressed) this.sceneStore.confirmButton() //this.confirmSelection()
    */
  }
}
