import { Scene } from 'phaser'
import { useMainStore } from '../../stores/mainStore'

export default class CombatScene extends Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private sceneStore = useMainStore()

  constructor() {
    super({ key: 'CombatScene' })
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  preload() {
    
  }

  create() {
    const mainCamera = this.cameras.main
    mainCamera.fadeIn(500, 0, 0, 0)

    this.add.image(0, 0, 'combatBg').setOrigin(0)

    const cameraWidth = this.cameras.main.width
    
    const map = this.make.tilemap({ key: 'tiles_Map' })
    const tileSetBuilding = map.addTilesetImage('building', 'tiles_Building')
    const tileSetOutside = map.addTilesetImage('outside', 'tiles_Outside')
    map.createLayer('Bottom', [tileSetBuilding, tileSetOutside], cameraWidth / 2, 48)
    map.createLayer('Walk', [tileSetBuilding, tileSetOutside], cameraWidth / 2, 16)
    map.createLayer('Roof', [tileSetBuilding, tileSetOutside], cameraWidth / 2, -16)
    map.createLayer('Top', [tileSetBuilding, tileSetOutside], cameraWidth / 2, -48)
    map.createLayer('More Top', [tileSetBuilding, tileSetOutside], cameraWidth / 2, -80)

    this.sceneStore.$onAction(({ name, args }) => {
      if (name === 'changeScene') {
        mainCamera.fadeOut(500, 0, 0, 0)
        mainCamera.on('camerafadeoutcomplete', () => this.scene.start(args[0]))
      }
    })
  }

  update() {
    
  }
}
