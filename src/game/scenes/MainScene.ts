import { Scene } from 'phaser'

export default class MainScene extends Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

  constructor() {
    super({ key: 'MainScene' })
  }

  preload() {
    
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    
  }
}
