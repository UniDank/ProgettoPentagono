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
        this.load.addFile(new WebFont(this.load, 'Alagard', 'custom', '../style.css')) // carica il font
    }

    create() {
        this.input.setDefaultCursor("url(" + cursorPng + "), pointer") // imposta il cursore

        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        this.parent = new Phaser.Structs.Size(width, height);
        this.sizer = new Phaser.Structs.Size(640, 960, Phaser.Structs.Size.HEIGHT_CONTROLS_WIDTH, this.parent);

        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);

        this.updateCamera();

        this.scale.on('resize', this.resize, this);
        window.addEventListener('resize', this.resize);

        this.scene.launch('BootScene').launch('DebugScene') // avvia scena di boot e di debug
    }
    
    updateCamera () {
        const camera = this.cameras.main;

        const x = Math.ceil((this.parent.width - this.sizer.width) * 0.5);
        const y = 0;
        const scaleX = this.sizer.width / 800;
        const scaleY = this.sizer.height / 600;

        camera.setViewport(x, y, this.sizer.width, this.sizer.height);
        camera.setZoom(Math.max(scaleX, scaleY));
        camera.centerOn(400, 300);
    }

    resize() {
        const width = this.scale.gameSize.width;
        const height = this.scale.gameSize.height;

        this.parent.setSize(width, height);
        this.sizer.setSize(width, height);

        this.updateCamera();
    }
}
