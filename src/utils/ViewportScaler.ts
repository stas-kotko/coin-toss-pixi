import { Application, Container, Graphics } from "pixi.js";
import { Signal } from "./Signal";

export class ViewportScaler {
	public debug = false;
	public onResize = new Signal<{ width: number; height: number }>();

	private _app: Application;
	private _target: Container;
	private _designWidth: number;
	private _designHeight: number;
	private _debounceMs: number;
	private _debounceTimer: ReturnType<typeof setTimeout> | null = null;
	private _boundScale: () => void;
	private _debugGraphics: Graphics | null = null;

	constructor(app: Application, target: Container, designWidth: number, designHeight: number, debounceMs = 0) {
		this._app = app;
		this._target = target;
		this._designWidth = designWidth;
		this._designHeight = designHeight;
		this._debounceMs = debounceMs;
		this._boundScale = () => this._scheduleScale();
	}

	attach(): void {
		this._app.renderer.on("resize", this._boundScale);
		this._scale();
	}

	detach(): void {
		this._app.renderer.off("resize", this._boundScale);
		if (this._debounceTimer !== null) {
			clearTimeout(this._debounceTimer);
			this._debounceTimer = null;
		}
		this._removeDebugGraphics();
	}

	private _scheduleScale(): void {
		if (this._debounceMs === 0) {
			this._scale();
			return;
		}
		if (this._debounceTimer !== null) clearTimeout(this._debounceTimer);
		this._debounceTimer = setTimeout(() => {
			this._debounceTimer = null;
			this._scale();
		}, this._debounceMs);
	}

	private _scale(): void {
		const { width, height } = this._app.renderer;
		const isPortrait = height > width;
		const dw = isPortrait ? this._designHeight : this._designWidth;
		const dh = isPortrait ? this._designWidth : this._designHeight;
		const scale = Math.min(width / dw, height / dh);
		this._target.scale.set(scale);
		this._target.position.set((width - dw * scale) / 2, (height - dh * scale) / 2);
		this._updateDebugGraphics(dw, dh);
		this.onResize.emit({ width, height });
	}

	private _updateDebugGraphics(dw: number, dh: number): void {
		if (!this.debug) {
			this._removeDebugGraphics();
			return;
		}
		if (!this._debugGraphics) {
			this._debugGraphics = new Graphics();
			this._target.addChild(this._debugGraphics);
		}
		this._debugGraphics.clear();
		this._debugGraphics.rect(0, 0, dw, dh);
		this._debugGraphics.stroke({ color: 0xff0000, width: 2 });
	}

	private _removeDebugGraphics(): void {
		if (this._debugGraphics) {
			this._debugGraphics.destroy();
			this._debugGraphics = null;
		}
	}
}
