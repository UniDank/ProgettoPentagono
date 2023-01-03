import { Scene } from 'phaser'
import { useMainStore } from '../../stores/mainStore'

enum StepType {
  DotMark, NodeBlue, NodeRed, NodeYellow, NodeGreen, PointAdmin, PointRegitare, PointBattle, PointHome, PointTutorial
}

type Step = {
  type: StepType,
  shown: boolean,
  coords: {
    x: number,
    y: number
  }
}

export default class StageScene extends Scene {
  private sceneStore = useMainStore()
  private steps: Step[] = [
    { type: StepType.NodeYellow, shown: true, coords: { x: 780, y: 606 } },
    { type: StepType.DotMark, shown: false, coords: { x: 754, y: 626 } },
    { type: StepType.DotMark, shown: false, coords: { x: 720, y: 630 } },
    { type: StepType.DotMark, shown: false, coords: { x: 684, y: 614 } },
    { type: StepType.NodeBlue, shown: false, coords: { x: 626, y: 570 } },
  ]

  constructor() {
    super({ key: 'StageScene' })
  }

  preload() {
    
  }

  create() { //https://phaser.io/examples/v3/view/input/zones/basic-input-zone
    this.add.image(0, 0, 'worldMap').setOrigin(0)

    /*for (const step of this.steps) {
      console.log("Type:", StepType[step.type])
      //this.add.image(step.coords.x, step.coords.y, StepType[step.type]).setOrigin(0).setVisible(step.shown)
    }*/
    
    this.sceneStore.$onAction(({ name, args }) => {
      if (name === 'changeScene') this.scene.start(args[0])
    })
  }
}
