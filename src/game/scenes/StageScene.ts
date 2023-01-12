import { Scene } from 'phaser'
import cursorPng from '../assets/point.png'
import { useMainStore } from '../../stores/mainStore'
import { useStageStore } from '../../stores/stageStore'

enum StepType {
  dotMark, nodeBlue, nodeRed, nodeYellow, nodeGreen, pointAdmin, pointRegitare, pointBattle, pointHome
}

type Step = {
  type: StepType,
  coords: {
    x: number,
    y: number
  },
  step?: number
}

export default class StageScene extends Scene {
  private sceneStore = useMainStore()
  private stageStore = useStageStore()
  private stepKeys = Object.values(StepType)
  private nodes: Step[] = [
    // Dal node giallo in basso all'albero
    { type: StepType.nodeYellow, coords: { x: 780, y: 606 }, step: 0 },

    { type: StepType.dotMark, coords: { x: 754, y: 626 } },
    { type: StepType.dotMark, coords: { x: 720, y: 630 } },
    { type: StepType.dotMark, coords: { x: 684, y: 614 } },

    { type: StepType.nodeRed, coords: { x: 626, y: 570 }, step: 1 },

    { type: StepType.dotMark, coords: { x: 618, y: 558 } },
    { type: StepType.dotMark, coords: { x: 602, y:532 } },
    { type: StepType.dotMark, coords: { x: 572, y: 522 } },

    { type: StepType.pointHome, coords: { x: 414, y: 374 }, step: 2 },

    { type: StepType.dotMark, coords: { x: 570, y: 458 } },
    { type: StepType.dotMark, coords: { x: 598, y: 434 } },
    { type: StepType.dotMark, coords: { x: 636, y: 430 } },

    { type: StepType.nodeBlue, coords: { x: 662, y: 390 }, step: 3 },

    { type: StepType.dotMark, coords: { x: 718, y: 380 } },
    { type: StepType.dotMark, coords: { x: 758, y: 364 } },
    { type: StepType.dotMark, coords: { x: 798, y: 360 } },

    { type: StepType.pointBattle, coords: { x: 826, y: 276 }, step: 4 },

    // Dall'albero a destra, fino al node verde
    { type: StepType.dotMark, coords: { x: 942, y: 374 } },
    { type: StepType.dotMark, coords: { x: 974, y: 382 } },
    { type: StepType.dotMark, coords: { x: 996, y: 402 } },

    { type: StepType.nodeBlue, coords: { x: 1002, y: 414 }, step: 5 },

    { type: StepType.dotMark, coords: { x: 1014, y: 474 } },
    { type: StepType.dotMark, coords: { x: 1016, y: 500 } },
    { type: StepType.dotMark, coords: { x: 1028, y: 526 } },

    { type: StepType.pointRegitare, coords: { x: 1048, y: 478 }, step: 6 },

    { type: StepType.dotMark, coords: { x: 1152, y: 524 } },
    { type: StepType.dotMark, coords: { x: 1170, y: 502 } },
    { type: StepType.dotMark, coords: { x: 1174, y: 474 } },

    { type: StepType.nodeGreen, coords: { x: 1154, y: 412 }, step: 7 },

    // Dall'albero a sinistra, fino al node giallo
    { type: StepType.dotMark, coords: { x: 814, y: 326 } },
    { type: StepType.dotMark, coords: { x: 792, y: 308 } },
    { type: StepType.dotMark, coords: { x: 786, y: 280 } },

    { type: StepType.nodeBlue, coords: { x: 732, y: 238 }, step: 8 },

    { type: StepType.dotMark, coords: { x: 710, y: 272 } },
    { type: StepType.dotMark, coords: { x: 680, y: 272 } },
    { type: StepType.dotMark, coords: { x: 652, y: 256 } },

    { type: StepType.nodeRed, coords: { x: 596, y: 208 }, step: 9 },

    { type: StepType.dotMark, coords: { x: 598, y: 190 } },
    { type: StepType.dotMark, coords: { x: 578, y: 172 } },
    { type: StepType.dotMark, coords: { x: 548, y: 162 } },

    { type: StepType.pointAdmin, coords: { x: 382, y: 60 }, step: 10 },

    { type: StepType.dotMark, coords: { x: 364, y: 132 } },
    { type: StepType.dotMark, coords: { x: 338, y: 128 } },
    { type: StepType.dotMark, coords: { x: 320, y: 114 } },

    { type: StepType.nodeYellow, coords: { x: 284, y: 60 }, step: 11 },
  ]
  private clickableNodes: Phaser.GameObjects.Image[] = []

  constructor() {
    super({ key: 'StageScene' })
  }

  preload() {

  }

  create() {
    const mainCamera = this.cameras.main
    mainCamera.fadeIn(500, 0, 0, 0)

    this.add.image(0, 0, 'worldMap').setOrigin(0)

    const playerSprite = this.add.sprite(0, 0, this.sceneStore.mainPlayer).setScale(2)
    playerSprite.anims.play({ key: "Idle", repeat: -1 })

    this.nodes.forEach((node, index) => {
      const image = this.add.image(node.coords.x, node.coords.y, `${this.stepKeys[node.type]}`)
        .setScale(2).setOrigin(0)
      if (node.step != undefined) {
        if (node.step == this.stageStore.selectedNode) {
          if (node.type == StepType.nodeBlue || node.type == StepType.nodeGreen || node.type == StepType.nodeRed ||
            node.type == StepType.nodeYellow) playerSprite.setPosition(node.coords.x + image.width, node.coords.y - (image.height / 2))
          else playerSprite.setPosition(node.coords.x + image.width, node.coords.y + image.height)
          playerSprite.setDepth(1)
        }
        this.clickableNodes.push(image)
        image.setInteractive({ cursor: `url(${cursorPng}), pointer` }).on('pointerup', () => {
          if (node.type == StepType.nodeBlue || node.type == StepType.nodeGreen || node.type == StepType.nodeRed ||
            node.type == StepType.nodeYellow) playerSprite.setPosition(node.coords.x + image.width, node.coords.y - (image.height / 2))
          else playerSprite.setPosition(node.coords.x + image.width, node.coords.y + image.height)
          playerSprite.setDepth(1)
          this.stageStore.selectNode(node.step ?? 0)
        })
      }
    })

    this.stageStore.$subscribe((store, vars) => {
      if (vars.enableNodes) this.clickableNodes.forEach(v => v.setInteractive())
      else if (!vars.enableNodes) this.clickableNodes.forEach(v => v.disableInteractive())
    })
    
    this.sceneStore.$onAction(({ name, args }) => {
      if (name === 'changeScene') {
        mainCamera.fadeOut(500, 0, 0, 0)
        if (args[0] == 'CombatScene') {
          mainCamera.on('camerafadeoutcomplete', () => this.scene.launch(args[0], { node: this.stageStore.selectedNode }).sleep())
        } else mainCamera.on('camerafadeoutcomplete', () => this.scene.start(args[0]))
      }
    })

    this.events.on(Phaser.Scenes.Events.WAKE, () => {
      mainCamera.fadeIn(500, 0, 0, 0)
      this.sound.stopByKey("combatSong")
      this.sound.stopByKey("adminSong")
      this.sound.stopByKey("regitareSong")
      this.sound.play("stageSong", { loop: true })
    })

    this.sound.stopByKey("bgSong")
    this.sound.play("stageSong", { loop: true })
  }

  update() {
    
  }
}
