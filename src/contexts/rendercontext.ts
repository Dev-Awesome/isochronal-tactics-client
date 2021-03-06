import AbstractScene from '../abstracts/abstractscene';
import AbstractText from '../abstracts/abstracttext';
import AbstractSprite from '../abstracts/abstractsprite';
import AbstractContainer from '../abstracts/abstractcontainer';
import { Textures } from 'phaser';
import { Vector } from 'turn-based-combat-framework';
import AbstractGroup from '../abstracts/abstractgroup';

export default class RenderContext {
    public scene: AbstractScene;
    public ui_camera: Phaser.Cameras.Scene2D.Camera;
    private notification_position: Vector;
    private notification_text: AbstractText;

    public get buffer(): number {
        return 10;
    }

    public get width(): number {
        return this.camera.displayWidth;
    }

    public get height(): number {
        return this.camera.displayHeight;
    }

    public get center_x(): number {
        return this.camera.centerX;
    }

    public get center_y(): number {
        return this.camera.centerY;
    }
    
    public get camera(): Phaser.Cameras.Scene2D.Camera {
        return this.scene.cameras.main;
    }

    public render_effect(effect_key: string, position: Vector, callback?: Function, context?: any): void {
        const sprite: AbstractSprite = this.add_sprite(position.x, position.y, effect_key);
        // sprite.set_anchor(0.5, 1);
        sprite.set_scale(6, 6);
        sprite.set_anchor(0.5, 0.25);
        sprite.framework_object.play('attack').on('animationcomplete', (animation: any, animation_frame: any, sprite: Phaser.GameObjects.Sprite) => {
            sprite.destroy();
            if (callback) callback.call(context);
        });
    }

    public add_container(x: number, y: number): AbstractContainer {
        const container: AbstractContainer = new AbstractContainer(this, this.scene, x, y);

        return container;
    }

    public add_group(): AbstractGroup {
        const group: AbstractGroup = new AbstractGroup(this, this.scene);

        return group;
    }

    public add_sprite(x: number, y: number, key: string, container?: AbstractContainer | AbstractGroup | Array<any>): AbstractSprite {
        const sprite_object: AbstractSprite = new AbstractSprite(this, this.scene, x, y, key, container);

        return sprite_object;
    }

    public add_text(x: number, y: number, text: string, container?: AbstractContainer | AbstractGroup | Array<any>): AbstractText {
        const text_object: AbstractText = new AbstractText(this, this.scene, x, y, text, container);

        return text_object;
    }

    public get_sprite_dimensions(key: string): Vector {
        const sprite: Textures.Frame = this.scene.textures.getFrame(key);

        return new Vector(sprite.width, sprite.height);
    }

    public set_notification_position(position: Vector): void {
        this.notification_position = new Vector(position.x, position.y);
        this.notification_text = this.add_text(this.notification_position.x, this.notification_position.y, '');
        this.notification_text.set_font_size(20);
        this.notification_text.set_anchor(0.5, 0);
        this.notification_text.set_word_wrap(this.width * 0.7);
        this.notification_text.set_depth(position.z);
        this.notification_text.affix_ui();
        this.notification_text.set_visible(false);
    }

    public display_notification(notification: string): void {
        this.notification_text.text = notification;
        this.notification_text.set_visible(true);
    }

    public hide_notification(): void {
        this.notification_text.set_visible(false);
    }
}