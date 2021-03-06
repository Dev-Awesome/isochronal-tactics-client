import { GameObjects, Scene } from 'phaser';
import RenderContext from '../contexts/rendercontext';
import AbstractContainer from './abstractcontainer';
import AbstractGroup from './abstractgroup';

export default class AbstractText {
    private renderer: RenderContext;
    public framework_object: GameObjects.Text;

    private readonly STYLE: object = {
        fontFamily: 'silkscreennormal, Arial',
        fontSize: '16px',
        fill: '#fff',
        stroke: '#000',
        strokeThickness: 3
    }

    constructor(renderer: RenderContext, scene: Scene, x: number, y: number, text: string, container?: AbstractContainer | AbstractGroup | Array<any>) {
        this.renderer = renderer;
        this.framework_object = scene.add.text(x, y, text, this.STYLE);
        // this.framework_object.lineSpacing = -4;

        if (this.renderer.ui_camera) this.renderer.ui_camera.ignore(this.framework_object);

        if (container) {
            if (Array.isArray(container)) {
                container.push(this);
            } else {
                container.add(this);
            }
        }
    }

    get x(): number {
        return this.framework_object.x;
    }

    get y(): number {
        return this.framework_object.y;
    }

    get width(): number {
        return Math.abs(this.framework_object.width);
    }

    get height(): number {
        return Math.abs(this.framework_object.height);
    }

    public set_anchor(x: number, y: number): void {
        this.framework_object.setOrigin(x, y);
    }

    get text(): string {
        return this.framework_object.text;
    }

    set text(text: string) {
        this.framework_object.text = text;
    }

    public set_font_size(font_size: number): void {
        this.framework_object.setFontSize(font_size);

        // this.framework_object.setFontSize = font_size;
        // this.framework_object.fontSize *= this.renderer.base_scale_factor;
    }

    public set_stroke(stroke_size: number): void {
        this.framework_object.setStroke('#000', stroke_size);
    }

    public set_word_wrap(wrap_width: number): void {
        this.framework_object.setWordWrapWidth(wrap_width);

        // this.framework_object.wordWrap = true;
        // this.framework_object.wordWrapWidth = wrap_width;
    }

    public set_position(x: number, y: number): void {
        this.framework_object.setPosition(x, y);
    }

    public set_scroll(scroll_x: number, scroll_y: number): void {
        this.framework_object.setScrollFactor(scroll_x, scroll_y);
    }

    public set_depth(depth: number): void {
        this.framework_object.setDepth(depth);
    }

    public set_visible(visible: boolean): void {
        this.framework_object.visible = visible;
    }

    public affix_ui(): void {
        if (this.renderer.ui_camera) {
            this.framework_object.cameraFilter &= ~this.renderer.ui_camera.id;
            this.renderer.camera.ignore(this.framework_object);
        } else {
            this.set_scroll(0, 0);
        }
    }

    public destroy(): void {
        if (this.framework_object) {
            this.framework_object.destroy();
            this.framework_object = null;
        }
    }
}