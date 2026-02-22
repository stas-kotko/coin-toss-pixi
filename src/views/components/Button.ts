import { Container, DestroyOptions, Graphics, Text } from "pixi.js";
import "pixi.js/advanced-blend-modes";
import { Signal } from "../../utils/Signal";

export interface ButtonOptions {
	width: number;
	height: number;
	borderRadius?: number;
	text?: string;
	fontSize?: number;
}

export class Button extends Container {
	public onClickSignal = new Signal<Button>();
	public bgWidth: number = 0;
	public bgHeight: number = 0;
	public borderRadius: number = 0;
	public fontSize: number = 32;

	protected _bg = new Graphics();
	protected _isEnabled = true;
	protected _isDown = false;
	protected _isOver = false;
	protected readonly _downScale = 0.95;
	protected readonly _downTint = "#00000077";
	protected _text: Text;

	private _bgColors = {
		down: "#dddd00",
		default: "#eeee00",
		over: "#ffff00",
		disabled: "#cccccc",
	};

	constructor(opts: ButtonOptions) {
		super();
		this.eventMode = "static";
		this.cursor = "pointer";

		this.bgWidth = opts.width;
		this.bgHeight = opts.height;
		this.borderRadius = opts.borderRadius || this.borderRadius;
		this.fontSize = opts.fontSize || this.fontSize;

		this._text = new Text({
			text: opts.text || "",
			style: {
				fontSize: this.fontSize,
				fill: "#000",
			},
		});

		this._redrawBg(this._bgColors.default);
		this._centerText();

		this.addChild(this._bg, this._text);

		this._addListeners();
	}

	public setText(t: string) {
		this._text.text = t;
		this._centerText();
	}

	private _centerText() {
		const w = this._text.width;
		const h = this._text.height;

		this._text.position.set(-w / 2, -h / 2);
	}

	private _addListeners() {
		this.on("pointerdown", this._onPointerDown, this);
		this.on("pointerup", this._onPointerUp, this);
		this.on("pointerover", this._onPointerOver, this);
		this.on("pointerout", this._onPointerOut, this);
		this.on("pointerupoutside", this._onPointerOut, this);
	}

	public isEnabled() {
		return this._isEnabled;
	}

	public enable() {
		this._isEnabled = true;
		this.eventMode = "static";
		this._redrawBg(this._bgColors.default);
	}

	public disable() {
		this._isEnabled = false;
		this.eventMode = "none";
		this._redrawBg(this._bgColors.disabled);
	}

	private _redrawBg(color: string = this._bgColors.default) {
		const w = this.bgWidth;
		const h = this.bgHeight;

		this._bg.clear();
		this._bg.roundRect(-w / 2, -h / 2, w, h, this.borderRadius);
		this._bg.fill({ color });
	}

	private _onPointerDown() {
		this._isDown = true;
		this.scale = this._downScale;
		this._redrawBg(this._bgColors.down);
	}

	private _onPointerUp() {
		if (!this._isDown) return;
		this._isDown = false;
		this.scale = 1;
		this.onClickSignal.emit(this);
	}

	private _onPointerOver() {
		this._isOver = true;
		this._redrawBg(this._bgColors.over);
	}

	private _onPointerOut() {
		this._isOver = false;
		this._isDown = false;
		this.scale = 1;
		this._redrawBg(this._bgColors.default);
	}

	destroy(options?: DestroyOptions): void {
		this.off("pointerdown", this._onPointerDown, this);
		this.onClickSignal.removeAll();

		super.destroy(options);
	}
}
