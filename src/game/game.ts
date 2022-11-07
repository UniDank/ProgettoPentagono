import Phaser from 'phaser'
import ButtonContainer from './ButtonContainer'
import ClickableText from './ClickableText'
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

Phaser.GameObjects.GameObjectFactory.register('clickableText', function (x: number, y: number, text: string, textStyle?: Phaser.Types.GameObjects.Text.TextStyle) {
	// @ts-ignore
  return this.displayList.add(new ClickableText(this.scene, x, y, text, textStyle))
})

function launch(containerId: string) {
  return new Phaser.Game({
    type: Phaser.AUTO,
    backgroundColor: '#282c34',
    pixelArt: true,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: containerId,
      width: 600,
      height: 580,
      min: {
        width: 600,
        height: 580,
      },
      max: {
        width: 1000,
        height: 980
      }
    },
    zoom: 1,
    dom: {
      createContainer: true
    },
    scene: [HandlerScene, DebugScene, BootScene, MainScene]
  })
}

export default launch
export { launch }
