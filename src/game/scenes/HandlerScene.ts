import { Scene } from 'phaser'
import WebFont from '../WebFont'
import cursorPng from '../assets/cursor.png'

export default class HandlerScene extends Scene {
    parent: Phaser.Structs.Size = new Phaser.Structs.Size();
    sizer: Phaser.Structs.Size = new Phaser.Structs.Size();
    
    constructor() {
        super({ key: 'HandlerScene', active: true })
    }

    preload() {
        this.load.addFile(new WebFont(this.load, 'Alagard', 'custom', '../style.css'))
    }

    create() {
        this.input.setDefaultCursor("url(" + cursorPng + "), pointer")

        /*const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        this.parent = new Phaser.Structs.Size(width, height);
        this.sizer = new Phaser.Structs.Size(640, 960, Phaser.Structs.Size.HEIGHT_CONTROLS_WIDTH, this.parent);

        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);*/

        this.updateCamera(this.scale.gameSize.width, this.scale.gameSize.height);

        this.scale.on('resize', this.resize, this);
        //window.addEventListener('resize', this.resize);

        this.scene.launch('BootScene')
    }
    
    updateCamera(width: number, height: number) {
        this.cameras.resize(width, height)
        this.cameras.main.setViewport(0, 0, width, height)
        this.cameras.main.setZoom(width / 500, height / 500)
        this.cameras.main.centerOn(width / 2, height / 2)

        /*const camera = this.cameras.main;

        const x = Math.ceil((this.parent.width - this.sizer.width) * 0.5);
        const y = 0;
        const scaleX = this.sizer.width / 800;
        const scaleY = this.sizer.height / 600;

        camera.setViewport(x, y, this.sizer.width, this.sizer.height);
        camera.setZoom(Math.max(scaleX, scaleY));
        camera.centerOn(400, 300);*/
    }

    resize() {
        let { innerWidth, innerHeight } = window
        let canvas = this.game.canvas
        console.log({ innerWidth, innerHeight })
        // canvas.width = innerWidth
        // canvas.height = innerHeight
        canvas.style.width = `${innerWidth}px`
        canvas.style.height = `${innerHeight}px`

        /*const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);*/

        this.updateCamera(innerWidth, innerHeight);
    }
}
