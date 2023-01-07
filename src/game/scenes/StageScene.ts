import { Scene } from 'phaser'
import cursorPng from '../assets/point.png'
import { useMainStore } from '../../stores/mainStore'
import { useStageStore } from '../../stores/stageStore'

enum StepType {
  dotMark, nodeBlue, nodeRed, nodeYellow, nodeGreen, pointAdmin, pointRegitare, pointBattle, pointHome, pointTutorial
}

type Step = {
  type: StepType,
  coords: {
    x: number,
    y: number
  },
  action?: Function
}

export default class StageScene extends Scene {
  private sceneStore = useMainStore()
  private stageStore = useStageStore()
  private stepKeys = Object.values(StepType)
  private steps: Step[] = [
    // Dal node giallo in basso all'albero
    { type: StepType.nodeYellow, coords: { x: 780 , y: 606 }, action: () => this.stageStore.selectNode(0) },

    { type: StepType.dotMark, coords: { x: 754, y: 626 } },
    { type: StepType.dotMark, coords: { x: 720, y: 630 } },
    { type: StepType.dotMark, coords: { x: 684, y: 614 } },

    { type: StepType.nodeBlue, coords: { x: 626 , y: 570 }, action: () => this.stageStore.selectNode(1) },

    { type: StepType.dotMark, coords: { x: 618 , y: 558 } },
    { type: StepType.dotMark, coords: { x: 602 , y:532 } },
    { type: StepType.dotMark, coords: { x: 572 , y: 522 } },

    { type: StepType.pointHome, coords: { x: 414, y: 374 }, action: () => this.stageStore.selectNode(2) },

    { type: StepType.dotMark, coords: { x: 570 , y: 458 } },
    { type: StepType.dotMark, coords: { x: 598 , y: 434 } },
    { type: StepType.dotMark, coords: { x: 636 , y: 430 } },

    { type: StepType.nodeBlue, coords: { x: 662 , y: 390 }, action: () => this.stageStore.selectNode(3) },

    { type: StepType.dotMark, coords: { x: 718 , y: 380 } },
    { type: StepType.dotMark, coords: { x: 758 , y: 364 } },
    { type: StepType.dotMark, coords: { x: 798 , y: 360 } },

    { type: StepType.pointBattle, coords: { x: 826 , y: 276 }, action: () => this.stageStore.selectNode(4) },

    // Dall'albero a destra, fino al node verde
    { type: StepType.dotMark, coords: { x: 942, y: 374 } },
    { type: StepType.dotMark, coords: { x: 974, y: 382 } },
    { type: StepType.dotMark, coords: { x: 996, y: 402 } },

    { type: StepType.nodeBlue, coords: { x: 1002 , y: 414 }, action: () => this.stageStore.selectNode(5) },

    { type: StepType.dotMark, coords: { x: 1014 , y: 474 } },
    { type: StepType.dotMark, coords: { x: 1016 , y: 500 } },
    { type: StepType.dotMark, coords: { x: 1028 , y: 526 } },

    { type: StepType.pointRegitare, coords: { x: 1048, y: 478 }, action: () => this.stageStore.selectNode(6) },

    { type: StepType.dotMark, coords: { x: 1152 , y: 524 } },
    { type: StepType.dotMark, coords: { x: 1170 , y: 502 } },
    { type: StepType.dotMark, coords: { x: 1174 , y: 474 } },

    { type: StepType.nodeGreen, coords: { x: 1154 , y: 412 }, action: () => this.stageStore.selectNode(7) },

    // Dall'albero a sinistra, fino al node giallo
    { type: StepType.dotMark, coords: { x: 814 , y: 326 } },
    { type: StepType.dotMark, coords: { x: 792 , y: 308 } },
    { type: StepType.dotMark, coords: { x: 786 , y: 280 } },

    { type: StepType.nodeBlue, coords: { x: 732 , y: 238 }, action: () => this.stageStore.selectNode(8) },

    { type: StepType.dotMark, coords: { x: 710 , y: 272 } },
    { type: StepType.dotMark, coords: { x: 680 , y: 272 } },
    { type: StepType.dotMark, coords: { x: 652 , y: 256 } },

    { type: StepType.nodeRed, coords: { x: 596 , y: 208 }, action: () => this.stageStore.selectNode(9) },

    { type: StepType.dotMark, coords: { x: 598 , y: 190 } },
    { type: StepType.dotMark, coords: { x: 578 , y: 172 } },
    { type: StepType.dotMark, coords: { x: 548 , y: 162 } },

    { type: StepType.pointAdmin, coords: { x: 382 , y: 60 }, action: () => this.stageStore.selectNode(10) },

    { type: StepType.dotMark, coords: { x: 370 , y: 102 } },
    { type: StepType.dotMark, coords: { x: 346 , y: 90 } },
    { type: StepType.dotMark, coords: { x: 326 , y: 70 } },

    { type: StepType.nodeYellow, coords: { x: 278 , y: 18 }, action: () => this.stageStore.selectNode(11) },
  ]
  private stepsImages: Phaser.GameObjects.Image[] = []

  constructor() {
    super({ key: 'StageScene' })
  }

  preload() {

  }

  create() {
    const mainCamera = this.cameras.main
    mainCamera.fadeIn(500, 0, 0, 0)

    this.add.image(0, 0, 'worldMap').setOrigin(0)

    this.steps.forEach((step, index) => {
      const image = this.add.image(step.coords.x, step.coords.y, `${this.stepKeys[step.type]}`)
        .setScale(2).setOrigin(0)
      this.stepsImages.push(image)
      if (step.action) image.setInteractive({ cursor: `url(${cursorPng}), pointer` }).on('pointerup', step.action)
    })
    
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
