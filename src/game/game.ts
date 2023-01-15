import Phaser from 'phaser'
import DebugScene from './scenes/DebugScene'
import BootScene from './scenes/BootScene'
import CombatScene from './scenes/CombatScene'
import HandlerScene from './scenes/HandlerScene'
import SelectScene from './scenes/SelectScene'
import StageScene from './scenes/StageScene'
import { GridEngine } from "grid-engine"
import { Animations } from 'phaser'
import GetValue = Phaser.Utils.Objects.GetValue
import GetFastValue = Phaser.Utils.Objects.GetFastValue

declare module 'phaser' {
  interface Scene {
    gridEngine: GridEngine
  }
  namespace Animations {
    interface AnimationState {
      createFromAseprite(game: Phaser.Game, key: string, tags?: string[] | undefined): Animation[]
    }
  }
}

Animations.AnimationState.prototype.createFromAseprite = function (game: Phaser.Game, key: string, tags?: string[] | undefined): Animations.Animation[] {
  let output: Animations.Animation[] = []
  let data = game.cache.json.get(key)

  if (!data) {
    return output;
  }

  let meta = GetValue(data, 'meta', null);
  let frames = GetValue(data, 'frames', null);

  if (meta && frames) {
    let frameTags = GetValue(meta, 'frameTags', []);

    frameTags.forEach((tag: any) => {
      let animFrames: { key: string, frame: string, duration: number }[] = [];

      let name = GetFastValue(tag, 'name', null);
      let from = GetFastValue(tag, 'from', 0);
      let to = GetFastValue(tag, 'to', 0);
      let direction = GetFastValue(tag, 'direction', 'forward');

      if (!name) {
        return;
      }

      if (!tags || (tags && tags.indexOf(name) > -1)) {
        let tempFrames: { frame: string, duration: number }[] = [];
        let minDuration = Number.MAX_SAFE_INTEGER;

        for (let i = from; i <= to; i++) {
          let frameKey = i.toString();
          let frame = frames[frameKey];

          if (frame) {
            let frameDuration = GetFastValue(frame, 'duration', Number.MAX_SAFE_INTEGER);

            if (frameDuration < minDuration) {
              minDuration = frameDuration;
            }

            tempFrames.push({ frame: frameKey, duration: frameDuration });
          }
        }

        tempFrames.forEach((entry) => {
          animFrames.push({
            key: key,
            frame: entry.frame,
            duration: (minDuration - entry.duration)
          });
        });

        let totalDuration = (minDuration * animFrames.length);

        if (direction === 'reverse') {
          animFrames = animFrames.reverse();
        }

        let createConfig = {
          key: name,
          frames: animFrames,
          duration: totalDuration,
          yoyo: (direction === 'pingpong')
        };

        let result = this.create(createConfig);

        if (result) {
          output.push(result);
        }
      }
    });
  }

  return output;
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
