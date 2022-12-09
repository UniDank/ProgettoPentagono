import { Scene } from 'phaser'
import mapJson from '../assets/maps/Village.json'
import mapOutside from '../assets/maps/outside.png'
import mapBuilding from '../assets/maps/building.png'
import backgroundPng from '../assets/Battle.png'
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
    this.load.image('combatBg', backgroundPng)
    this.load.image('tiles_Building', mapBuilding)
    this.load.image('tiles_Outside', mapOutside)
    this.load.tilemapTiledJSON('tiles_Map', mapJson)
  }

  create() {
    this.add.image(-this.scale.gameSize.width, -this.scale.gameSize.height * 0.5, 'combatBg').setScale(1.25).setOrigin(0)
    
    const map = this.make.tilemap({ key: 'tiles_Map' })
    const tileSetBuilding = map.addTilesetImage('building', 'tiles_Building')
    const tileSetOutside = map.addTilesetImage('outside', 'tiles_Outside')
    map.createLayer('Bottom', [tileSetBuilding, tileSetOutside], 0, 0)
    map.createLayer('Walk', [tileSetBuilding, tileSetOutside], 0, -32)
    map.createLayer('Roof', [tileSetBuilding, tileSetOutside], 0, -64)
    map.createLayer('Top', [tileSetBuilding, tileSetOutside], 0, -96)
    map.createLayer('More Top', [tileSetBuilding, tileSetOutside], 0, -128)

    this.cameras.main.setZoom(0.75).centerOn(0, 0).setOrigin(0)
    this.cameras.main.setBounds(-this.scale.gameSize.width * 0.75, -this.scale.gameSize.height * 0.5, map.widthInPixels, map.heightInPixels)

    this.sceneStore.$onAction(({ name, args }) => {
      if (name === 'changeScene') this.scene.start(args[0])
    })
  }

  update() {
    
  }
}
