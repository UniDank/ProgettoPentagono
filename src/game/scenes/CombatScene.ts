import { Scene, Cameras } from 'phaser'
import { useMainStore } from '../../stores/mainStore'
import { useCombatStore } from '../../stores/combatStore'
import { useStageStore } from '../../stores/stageStore'
import { GameEntity } from "../../classes/GameEntity"
import { Player } from "../../classes/Player"
import { Entity } from "../../classes/Entity"
import { Enemy } from "../../classes/Enemy"
import Vector2 = Phaser.Math.Vector2
import { GridEngineConfig } from 'grid-engine'

export default class CombatScene extends Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private sceneStore = useMainStore()
  private combatStore = useCombatStore()
  private stageStore = useStageStore()
  private players: Map<GameEntity, Player> = new Map()
  private enemies: Map<GameEntity, Enemy> = new Map()
  private map!: Phaser.Tilemaps.Tilemap
  private walkLayer!:  Phaser.Tilemaps.TilemapLayer
  private radiusColor: number = 0xFFCC4A
  private rangeColor: number = 0xFF9900
  private cleanColor: number = 0xFFFFFF
  private selectionColor: number = 0x23CCAA
  private turn: boolean = false
  private initialPos = new Vector2(0, 0)
  private newPos = new Vector2(0, 0)
  private timer = 0

  constructor() {
    super({ key: 'CombatScene' })
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  preload() {

  }

  manhattanDist(x1: number, y1: number, x2: number, y2: number) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2)
  }

  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  getCurrentEntity() {
    const currentEntity = Array.from([...this.players.keys(), ...this.enemies.keys()])
      .find(v => v.entityName == this.combatStore.currentEntity?.name)
    return currentEntity!
  }

  create() {
    const mainCamera = this.cameras.main
    mainCamera.fadeIn(300, 0, 0, 0, (camera: Cameras.Scene2D.Camera, progress: number) => {
      if (progress >= 0.7) this.sceneStore.changeInterface("CombatInterface")
    })

    this.add.image(25, 275, 'combatBg').setScale(0.8)
    
    this.map = this.make.tilemap({ key: 'tiles_Map' })
    const tileSetBuilding = this.map.addTilesetImage('building', 'tiles_Building')
    const tileSetOutside = this.map.addTilesetImage('outside', 'tiles_Outside')
    this.walkLayer = this.map.createLayer('Bottom', [tileSetBuilding, tileSetOutside], 0, 0)
    this.map.createLayer('Walk', [tileSetBuilding, tileSetOutside], 0, -32)
    this.map.createLayer('Roofs', [tileSetBuilding, tileSetOutside], 0, -64)
    this.map.createLayer('Top', [tileSetBuilding, tileSetOutside], 0, -96)
    this.map.createLayer('More Top', [tileSetBuilding, tileSetOutside], 0, -128)

    this.cameras.main.setZoom(1.25).centerOn(0, 0).setOrigin(0)
    this.cameras.main.setBounds(-this.scale.gameSize.width + this.map.widthInPixels + 25, 60, this.map.widthInPixels, this.map.heightInPixels)

    this.sceneStore.$onAction(({ name, args }) => {
      if (name === 'changeScene') {
        mainCamera.fadeOut(300, 0, 0, 0)
        this.sceneStore.closeInterface()
        mainCamera.on('camerafadeoutcomplete', () => {
          this.gridEngine.removeAllCharacters()
          this.scene.stop().wake(args[0])
        })
      }
    })

    this.players.clear()
    this.enemies.clear()

    this.sceneStore.party.filter(p => p.health > 0).forEach(p => {
      let randomX = this.randomNumber(3, 10)
      let randomY = this.randomNumber(3, 10)
      if (this.players.size > 0) {
        while ([...this.enemies.keys(), ...this.players.keys()]
          .find(v => v.getInitPosition().x == randomX && v.getInitPosition().y == randomY) != undefined) {
          randomX = this.randomNumber(3, 10)
          randomY = this.randomNumber(3, 10)
        }
      }
      const player = new GameEntity(this, p.name, new Vector2(randomX, randomY))
      player.sprite.setActive(true)
      console.assert(player.sprite.anims, "Now it's undefined")
      player.sprite.anims.play({ key: "Idle", repeat: -1, frameRate: 10 })
      this.players.set(player, p)
    })

    this.combatStore.enemies.forEach(e => {
      let randomX = this.randomNumber(3, 10)
      let randomY = this.randomNumber(3, 10)
      if (this.enemies.size > 0) {
        while ([...this.enemies.keys(), ...this.players.keys()]
          .find(v => v.getInitPosition().x == randomX && v.getInitPosition().y == randomY) != undefined) {
          randomX = this.randomNumber(3, 10)
          randomY = this.randomNumber(3, 10)
        }
      }
      const enemy = new GameEntity(this, e.name, new Vector2(randomX, randomY))
      enemy.sprite.setActive(true)
      enemy.sprite.anims.play({ key: "Idle", repeat: -1, frameRate: 10 })
      this.enemies.set(enemy, e)
    })

    const gridEngineConfig: GridEngineConfig = {
      characters: [
        ...Array.from(this.players.keys()).map(p => p.getCharacterConfig(["cg1"])), 
        ...Array.from(this.enemies.keys()).map(e => e.getCharacterConfig(["cg1"]))
      ]
    }

    this.gridEngine.create(this.map, gridEngineConfig)

    this.gridEngine.movementStarted().subscribe(({ direction }) => {
      const currentEntity = this.getCurrentEntity()
      currentEntity.sprite.flipX = direction.includes("left")
      currentEntity.sprite.anims.play({ key: "Run right", repeat: 1, frameRate: 10 })
    })

    this.gridEngine.movementStopped().subscribe(() => {
      this.playOnHealth(this.getCurrentEntity(), this.combatStore.currentEntity!)
      this.combatStore.passTurn()
    })

    this.combatStore.$onAction(({ name, args }) => {
      if (name === 'actionAttack') {
        const currentEntity = this.getCurrentEntity()
        currentEntity.sprite.anims.play({ key: "Attack", repeat: 1, frameRate: 10 }).on('animationcomplete', () => {
          this.playOnHealth(this.getCurrentEntity(), this.combatStore.currentEntity!)
          this.combatStore.passTurn()
        })
        const targetEntity = Array.from([...this.players.keys(), ...this.enemies.keys()]).find(v => v.entityName == args[0].name)!
        targetEntity.sprite.anims.play({ key: "Damage taken", repeat: 1, frameRate: 10 }).on('animationcomplete', () => {
          this.playOnHealth(targetEntity, args[0])
        })
      }
      if (name === "actionInRange") {
        this.cleanAllTiles()
        if (args[0]) {
          const entityRange = this.combatStore.currentEntity?.category ?? 0
          const entityPos = this.getCurrentEntity().getPosition()
          this.tintRadius(entityPos.x, entityPos.y, entityRange, this.rangeColor)
          this.combatStore.inRangeEntities = this.checkEnemyInRange(entityRange)
        }
      }
      if (name === 'actionMove') {
        this.cleanAllTiles()
        if (args[0]) this.startMovement()
        else this.turn = false
      }
      if (name === "actionWin") {
        if (args[0]) Array.from(this.players.keys()).forEach(w => w.sprite.anims.play({ key: "Victory", repeat: -1, frameRate: 10 }))
        else Array.from(this.enemies.keys()).forEach(w => w.sprite.anims.play({ key: "Victory", repeat: -1, frameRate: 10 }))
        setTimeout(() => this.sceneStore.changeScene('StageScene'), 3000)
      }
    })

    //this.input.keyboard.on("keydown-THREE", this.startMovement)

    this.sound.stopByKey("stageSong")
    if (this.stageStore.selectedNode == 10) this.sound.play('adminSong', { loop: true })
    else if (this.stageStore.selectedNode == 6) this.sound.play('regitareSong', { loop: true })
    else this.sound.play('combatSong', { loop: true })
  }

  playOnHealth(gameEntity: GameEntity, frontEntity: Entity) {
    if (frontEntity.isKo) {
      if (frontEntity instanceof Enemy) {
        gameEntity.sprite.destroy(true)
        this.enemies.delete(gameEntity)
        this.gridEngine.removeCharacter(gameEntity.entityName)
      } else gameEntity.sprite.anims.play({ key: "KO", repeat: -1, frameRate: 10 })
    } else if (frontEntity.isLowHP) gameEntity.sprite.anims.play({ key: "Low HP", repeat: -1, frameRate: 10 })
    else gameEntity.sprite.anims.play({ key: "Idle", repeat: -1, frameRate: 10 })
  }

  startMovement() {
    this.initialPos = new Vector2(this.getCurrentEntity().getPosition().x, this.getCurrentEntity().getPosition().y)
    this.tintRadius(this.initialPos.x, this.initialPos.y, 2, this.radiusColor)
    this.tintTile(this.initialPos.x, this.initialPos.y, this.selectionColor)
    this.newPos = this.initialPos
    this.turn = true
  }

  cleanAllTiles() {
    for (const arr of this.walkLayer.layer.data) {
      for (const tile of arr) {
        tile.tint = this.cleanColor
      }
    }
  }

  update() {
    this.timer++
    if (this.timer % 3 === 0) {
      this.time.paused = true
      if (this.turn) {
        if (!this.combatStore.moveMode && this.combatStore.moveDirection != "") 
          this.newPos = this.moveTile(this.newPos.x, this.newPos.y, this.combatStore.moveDirection)
        else this.newPos = this.moveTile(this.newPos.x, this.newPos.y)
        if ((this.combatStore.moveMode && this.cursors.space.isDown) || (!this.combatStore.moveMode && this.combatStore.isConfirmed)) {
          this.combatStore.isConfirmed = false
          if (this.checkTile(this.newPos, this.initialPos, 3)) {
            this.cleanAllTiles()
            this.turn = false
            this.getCurrentEntity().movePlayerTo(this.newPos)
          } else console.warn("Movimento impossibile, riprova")
        }
      }
      this.time.paused = false
    }
  }
  
  tintRadius(posX: number, posY: number, radius: number, color: number) {
    [posX, posY] = [posY, posX]
    for (let x = 0; x <= radius; x++) {
      for (let y = 0; y <= radius; y++) {
        if (this.manhattanDist(posX, posY, posX + x, posY + y) <= radius &&
          (posX + x > 2 && posX + x < 11) && (posY + y > 2 && posY + y < 11)) {
          this.walkLayer.layer.data[posX + x][posY + y].tint = color
        }
        if (this.manhattanDist(posX, posY, posX - x, posY + y) <= radius &&
          (posX - x > 2  && posX - x < 11) && (posY + y > 2 && posY + y < 11)) {
            this.walkLayer.layer.data[posX - x][posY + y].tint = color
        }
        if (this.manhattanDist(posX, posY, posX + x, posY - y) <= radius &&
          (posX + x > 2 && posX + x < 11) && (posY - y > 2 && posY - y < 11)) {
            this.walkLayer.layer.data[posX + x][posY - y].tint = color
        }
        if (this.manhattanDist(posX, posY, posX - x, posY - y) <= radius &&
          (posX - x > 2 && posX - x < 11) && (posY - y > 2 && posY - y < 11)) {
            this.walkLayer.layer.data[posX - x][posY - y].tint = color
        }
      }
    }
  }

  tintTile(posX: number, posY: number, color: number): void {
    this.walkLayer.layer.data[posY][posX].tint = color
  }

  moveTile(x: number, y: number, direction?: string): Vector2 {
    const entityPos = this.getCurrentEntity().getPosition()
    this.combatStore.moveDirection = ""
    switch (true) {
      case direction != "" ? direction == "left" : this.cursors.left.isDown:
        if (this.checkTile(new Vector2(x - 1, y), new Vector2(entityPos.x, entityPos.y), 2)) this.tintTile(x, y, this.radiusColor)
        else this.tintTile(x, y, this.cleanColor)
        this.tintTile(x - 1, y, this.selectionColor)
        return new Vector2(x - 1, y)
      case direction != "" ? direction == "right" : this.cursors.right.isDown:
        if (this.checkTile(new Vector2(x + 1, y), new Vector2(entityPos.x, entityPos.y), 3)) this.tintTile(x, y, this.radiusColor)
        else this.tintTile(x, y, this.cleanColor)
        this.tintTile(x + 1, y, this.selectionColor)
        return new Vector2(x + 1, y)
      case direction != "" ? direction == "up" : this.cursors.up.isDown:
        if (this.checkTile(new Vector2(x, y - 1), new Vector2(entityPos.x, entityPos.y), 3)) this.tintTile(x, y, this.radiusColor)
        else this.tintTile(x, y, this.cleanColor)
        this.tintTile(x, y - 1, this.selectionColor)
        return new Vector2(x, y - 1)
      case direction != "" ? direction == "down" : this.cursors.down.isDown:
        if (this.checkTile(new Vector2(x, y + 1), new Vector2(entityPos.x, entityPos.y), 3)) this.tintTile(x, y, this.radiusColor)
        else this.tintTile(x, y, this.cleanColor)
        this.tintTile(x, y + 1, this.selectionColor)
        return new Vector2(x, y + 1)
      default:
        return new Vector2(x, y)
    }
  }

  checkTile(newPos: Phaser.Math.Vector2, initpos: Phaser.Math.Vector2, radius: number): boolean {
    return this.manhattanDist(initpos.x, initpos.y, newPos.x, newPos.y) < radius
  }

  checkEnemyInRange(radiusEntity: number) {
    const entity = this.getCurrentEntity()
    const posX = entity.getPosition().x
    const posY = entity.getPosition().y
    const isPlayer = this.players.has(entity)
    const entities: (Player | Enemy)[] = []
    if (isPlayer) {
      this.enemies.forEach((value, key) => {
        if (this.manhattanDist(posX, posY, key.getPosition().x, key.getPosition().y) <= radiusEntity) {
          entities.push(value)
        }
      })
    } else {
      this.players.forEach((value, key) => {
        if (this.manhattanDist(posX, posY, key.getPosition().x, key.getPosition().y) <= radiusEntity) {
          entities.push(value)
        }
      })
    }
    return entities
  }
}
