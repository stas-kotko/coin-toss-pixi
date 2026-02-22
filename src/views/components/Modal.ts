import { Container, Graphics, Text } from "pixi.js";

export class Modal extends Container {
	protected _bg = new Graphics();
	protected _text: Text;
	protected _timeout = 0;

	constructor() {
		super();

		const width = 400;
		const height = 240;
		const borderRadius = 16;
		const borderWidth = 2;
		const bgColor = "#777";
		const borderColor = "#222";

		this._bg.roundRect(0, 0, width, height, borderRadius);
		this._bg.fill({ color: bgColor });
		this._bg.stroke({ color: borderColor, width: borderWidth });

		this._text = new Text({
			text: "",
			style: {
				fill: "#eee",
				fontSize: 52,
			},
		});
		this._alignText();

		this.addChild(this._bg, this._text);
	}

	public setText(t: string) {
		this._text.text = t;
		this._alignText();
	}

	private _alignText() {
		const tw = this._text.width;
		const th = this._text.height;

		this._text.position.set(this._bg.width / 2 - tw / 2, this._bg.height / 2 - th / 2);
	}
}
