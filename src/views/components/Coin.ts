import { Spine } from "@esotericsoftware/spine-pixi-v8";
import { Container } from "pixi.js";
import { CoinSide } from "../../types";

const COIN_STOP_TIME = {
	heads: 0.5,
	tails: 0,
};

export class Coin extends Container {
	public spine: Spine;

	constructor() {
		super();
		this.spine = Spine.from({ skeleton: "skeleton-data", atlas: "skeleton-atlas" });

		this.addChild(this.spine);
	}

	public startSpinAnimation(speed = 1) {
		this.spine.state.setAnimation(0, "animation", true);
		this.spine.state.timeScale = speed;
	}

	public setSpinSpeed(n: number) {
		this.spine.state.timeScale = n;
	}

	public stopAt(side: CoinSide) {
		const animDuration = this.spine.skeleton.data.findAnimation("animation")?.duration ?? 1;
		const targetTime = COIN_STOP_TIME[side] * animDuration;

		const trackEntry = this.spine.state.setAnimation(0, "animation", false);
		trackEntry.mixDuration = 0.7;
		trackEntry.trackTime = targetTime;
		trackEntry.timeScale = 0;
	}
}
