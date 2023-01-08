import { Scene } from 'phaser'
import { useMainStore } from '../../stores/mainStore'
import {Playertemp} from "../../classes/Playertemp";
import {GridEngine} from "grid-engine";
import Vector2 = Phaser.Math.Vector2;

export default class CombatScene extends Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private sceneStore = useMainStore()
  
  //variabili che possono cambiare
  
  private player!:Playertemp
  private enemy!:Playertemp
  private map!: Phaser.Tilemaps.Tilemap
  private walklayer!:  Phaser.Tilemaps.TilemapLayer

  //solo per avere a disposizione i tipi ;(
  protected gridEngine: GridEngine | null = null

  private colorR: number = 0xffcc4a
  private colorC: number = 0x23ccaa

  private turn!: boolean

  private initialpos!: Vector2;

  private newpos!: Vector2

  private timer = 0
  
  private Menu!: boolean
  
  
  

  constructor() {
    super({ key: 'CombatScene' })
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  preload() {
    
  }

  create() {
    //setup mappa
    const mainCamera = this.cameras.main
    mainCamera.fadeIn(500, 0, 0, 0)

    this.add.image(0,this.scale.gameSize.height *0.4 , 'combatBg')

    const cameraWidth = this.cameras.main.width
    
    const map = this.make.tilemap({ key: 'tiles_Map' })
    this.map = map
    const tileSetBuilding = map.addTilesetImage('building', 'tiles_Building')
    const tileSetOutside = map.addTilesetImage('outside', 'tiles_Outside')
    this.walklayer = map.createLayer('Bottom', [tileSetBuilding, tileSetOutside], 0, 0)
    map.createLayer('Walk', [tileSetBuilding, tileSetOutside], 0, -32)
    map.createLayer('Roof', [tileSetBuilding, tileSetOutside], 0, -64)
    map.createLayer('Top', [tileSetBuilding, tileSetOutside], 0, -96)
    map.createLayer('More Top', [tileSetBuilding, tileSetOutside], 0, -128)

    this.cameras.main.centerOn(0, 0).setOrigin(0)
    this.cameras.main.setBounds(-this.scale.gameSize.width * 0.5, -this.scale.gameSize.height * 0.1, this.map.widthInPixels, this.map.heightInPixels)

    this.sceneStore.$onAction(({ name, args }) => {
      if (name === 'changeScene') {
        mainCamera.fadeOut(500, 0, 0, 0)
        mainCamera.on('camerafadeoutcomplete', () => this.scene.start(args[0]))
      }
    })
    
    //setup altro
    this.player = new Playertemp(this, "agoraco",new Vector2(7,7))
    this.enemy = new Playertemp(this, "pg",new Vector2(6,7))

    const gridEngineConfig = {
      characters: [
        this.player.getCharacterConfig(["cg1"]),
        this.enemy.getCharacterConfig(["cg1"])
      ],
    };
    this.gridEngine?.create(this.map,gridEngineConfig)
    //todo: scrivere le animazioni
    this.gridEngine?.movementStarted().subscribe(({ direction })=>{
      console.log(direction)
      this.player.player.anims.play({key: "Left run", repeat: 1 , frameRate: 5})
    })
    this.gridEngine?.movementStopped().subscribe(({ direction }) => {
      this.player.player.anims.play({key: "Idle", repeat: -1})
    });



    this.input.keyboard.on('keydown-TWO', () => {
      console.log(this.player.getPosition())
    });

    this.input.keyboard.on("keydown-THREE", ()=>{
      this.initialpos = new Vector2(this.player.getPosition()?.x,this.player.getPosition()?.y)
      //coloro il range
      this.tintRadius(this.map,this.initialpos.y, this.initialpos.x, 2, this.colorR)
      //coloro il tile di destinazione
      this.tintTile(this.walklayer.layer, this.initialpos.x, this.initialpos.y, this.colorC)
      console.log("muovlei il tile di destinazione")
      this.newpos = this.initialpos
      console.warn(this.newpos)
      this.turn = true
    })
    
    
    
  }

  update() {
    
    this.timer++
    if (this.timer % 3 === 0){
      this.time.paused = true
      if (this.turn){
        //flag per alternarsi tra il movimento con le 4 freccie o il movimento del menu
        if (this.Menu){
          this.newpos = this.moveTileWithMenu("",this.newpos.x,this.newpos.y)
        }
        else {
          this.newpos = this.moveTile(this.cursors, this.newpos.x, this.newpos.y)
        }
        if (this.checkTurn(this.cursors) || this.checkTurnWithMenu("") ){
          if (this.checkTile(this.newpos, this.initialpos, 3)){
            const colorbase = 16777215
            for (const arr of this.walklayer.layer.data){
              for (const tile of arr){
                tile.tint = colorbase
              }
            }
            this.turn = false;
            this.player.movePlayerTo(this.newpos)
          }
          else console.warn("Moviemnto impossibile mio duce, riprova")
        }

      }
      this.time.paused = false
    }
  }


  tintRadius(tilemap: Phaser.Tilemaps.Tilemap, posX: number, posY: number, radius: number, color: number) {
    const manhattanDist = (x1: number, y1: number, x2: number, y2: number) => {
      return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    for (let i = 0; i < tilemap.layers.length; i++) {
      for (let x = 0; x <= radius; x++) {
        for (let y = 0; y <= radius; y++) {
          if (manhattanDist(posX, posY, posX + x, posY + y) <= radius) {
            tilemap.layers[i].tilemapLayer.layer.data[posX + x][posY + y].tint =
                color;
          }
          if (manhattanDist(posX, posY, posX - x, posY + y) <= radius) {
            tilemap.layers[i].tilemapLayer.layer.data[posX - x][posY + y].tint =
                color;
          }
          if (manhattanDist(posX, posY, posX + x, posY - y) <= radius) {
            tilemap.layers[i].tilemapLayer.layer.data[posX + x][posY - y].tint =
                color;
          }
          if (manhattanDist(posX, posY, posX - x, posY - y) <= radius) {
            tilemap.layers[i].tilemapLayer.layer.data[posX - x][posY - y].tint =
                color;
          }
        }
      }
    }

  }

  tintTile(layer: Phaser.Tilemaps.LayerData, posX: number, posY: number, color: number): void{
    for (const arr of layer.data){
      for (const tile of arr){
        if (tile.x === posX && tile.y === posY){
          tile.tint = color
          return;
        }

      }
    }
  }

  checkTurn(cursors: Phaser.Types.Input.Keyboard.CursorKeys): boolean {
    return cursors.space.isDown
  }
  
  //per il menu di movimento
  checkTurnWithMenu(cursors: string): boolean {
    return cursors == "ok"
  }

  /***
   * Permette di muovere il tile.
   * @param cursors cursore delle freccie
   * @param x posizione X del tile corrente!
   * @param y posizione Y del tile corrente!
   * */
  moveTile (cursors: Phaser.Types.Input.Keyboard.CursorKeys, x: number, y: number): Vector2 {
    switch (true) {
      case cursors.left.isDown:
        if (this.checkTile(new Vector2(x-1,y),new Vector2(this.initialpos.x, this.initialpos.y),2)){
          this.tintTile(this.walklayer.layer, x, y, this.colorR)
        }
        else{
          this.tintTile(this.walklayer.layer, x, y, 16777215)
        }
        this.tintTile(this.walklayer.layer, x - 1, y, this.colorC)
        return new Vector2(x - 1, y)
      case cursors.right.isDown:
        if (this.checkTile(new Vector2(x+1,y),new Vector2(this.initialpos.x, this.initialpos.y),3)){
          this.tintTile(this.walklayer.layer, x, y, this.colorR)
        }
        else{
          this.tintTile(this.walklayer.layer, x, y, 16777215)
        }
        this.tintTile(this.walklayer.layer, x + 1, y, this.colorC)
        return new Vector2(x + 1, y)
      case cursors.up.isDown:
        if (this.checkTile(new Vector2(x,y-1),new Vector2(this.initialpos.x, this.initialpos.y),3)){
          this.tintTile(this.walklayer.layer, x, y, this.colorR)
        }
        else{
          this.tintTile(this.walklayer.layer, x, y, 16777215)
        }
        this.tintTile(this.walklayer.layer, x, y - 1, this.colorC)
        return new Vector2(x, y - 1)
      case cursors.down.isDown:
        if (this.checkTile(new Vector2(x,y+1),new Vector2(this.initialpos.x, this.initialpos.y),3)){
          this.tintTile(this.walklayer.layer, x, y, this.colorR)
        }
        else{
          this.tintTile(this.walklayer.layer, x, y, 16777215)
        }
        this.tintTile(this.walklayer.layer, x, y + 1, this.colorC)
        return new Vector2(x, y + 1)
      default:
        return new Vector2(x, y)
    }
  }
  
  //per il menu di movimento
  moveTileWithMenu (cursors: string, x: number, y: number): Vector2 {
    switch (true) {
      case cursors == "left":
        if (this.checkTile(new Vector2(x-1,y),new Vector2(this.initialpos.x, this.initialpos.y),2)){
          this.tintTile(this.walklayer.layer, x, y, this.colorR)
        }
        else{
          this.tintTile(this.walklayer.layer, x, y, 16777215)
        }
        this.tintTile(this.walklayer.layer, x - 1, y, this.colorC)
        return new Vector2(x - 1, y)
      case cursors == "right":
        if (this.checkTile(new Vector2(x+1,y),new Vector2(this.initialpos.x, this.initialpos.y),3)){
          this.tintTile(this.walklayer.layer, x, y, this.colorR)
        }
        else{
          this.tintTile(this.walklayer.layer, x, y, 16777215)
        }
        this.tintTile(this.walklayer.layer, x + 1, y, this.colorC)
        return new Vector2(x + 1, y)
      case cursors == "up":
        if (this.checkTile(new Vector2(x,y-1),new Vector2(this.initialpos.x, this.initialpos.y),3)){
          this.tintTile(this.walklayer.layer, x, y, this.colorR)
        }
        else{
          this.tintTile(this.walklayer.layer, x, y, 16777215)
        }
        this.tintTile(this.walklayer.layer, x, y - 1, this.colorC)
        return new Vector2(x, y - 1)
      case cursors == "down":
        if (this.checkTile(new Vector2(x,y+1),new Vector2(this.initialpos.x, this.initialpos.y),3)){
          this.tintTile(this.walklayer.layer, x, y, this.colorR)
        }
        else{
          this.tintTile(this.walklayer.layer, x, y, 16777215)
        }
        this.tintTile(this.walklayer.layer, x, y + 1, this.colorC)
        return new Vector2(x, y + 1)
      default:
        return new Vector2(x, y)
    }
  }

  checkTile(newpos: Phaser.Math.Vector2, initpos: Phaser.Math.Vector2, radius: number): boolean {
    const manhattanDist = (x1: number, y1: number, x2: number, y2: number) => {
      return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    return manhattanDist(initpos.x, initpos.y, newpos.x, newpos.y) < radius
  }
}
