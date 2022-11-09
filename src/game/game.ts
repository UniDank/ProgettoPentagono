import Phaser from 'phaser'
import ButtonContainer from './ButtonContainer'
import DebugScene from './scenes/DebugScene'
import BootScene from './scenes/BootScene'
import MainScene from './scenes/MainScene'
import HandlerScene from './scenes/HandlerScene'

// https://blog.ourcade.co/posts/2020/phaser3-how-to-communicate-between-scenes/
// https://github.com/photonstorm/phaser/issues/5064#issuecomment-646183833
// https://phaser.discourse.group/t/text-becomes-blurry-on-scaling/1367

Phaser.GameObjects.GameObjectFactory.register('buttonContainer', function (x: number, y: number, text: string, textStyle?: Phaser.Types.GameObjects.Text.TextStyle, texture?: string, tint: number = 0xffffff) {
	// @ts-ignore
  return this.displayList.add(new ButtonContainer(this.scene, x, y, text, textStyle, texture, tint))
})

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
    zoom: 1,
    dom: {
      createContainer: true
    },
    audio: {
      disableWebAudio: true
    },
    scene: [HandlerScene, DebugScene, BootScene, MainScene]
  })
}

export default launch
export { launch }
