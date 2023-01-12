import Phaser from 'phaser'
import DebugScene from './scenes/DebugScene'
import BootScene from './scenes/BootScene'
import CombatScene from './scenes/CombatScene'
import HandlerScene from './scenes/HandlerScene'
import SelectScene from './scenes/SelectScene'
import StageScene from './scenes/StageScene'
import { GridEngine } from "grid-engine"

declare module 'phaser' {
  interface Scene {
      gridEngine: GridEngine
  }
}

function launch(containerId: string) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    backgroundColor: '#353535',
    pixelArt: true,
    scale: {
      fullscreenTarget: 'body',
      mode: Phaser.Scale.ENVELOP,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: containerId,
      width: window.innerWidth,
      height: window.innerHeight,
    },
    plugins: {
      scene: [
        {
          key: "gridEngine",
          plugin: GridEngine,
          mapping: "gridEngine",
        },
      ],
    },
    zoom: 1,
    dom: {
      createContainer: true
    },
    audio: {
      disableWebAudio: true
    },
    scene: [HandlerScene, DebugScene, BootScene, SelectScene, StageScene, CombatScene]
  })
}

export default launch
export { launch }
