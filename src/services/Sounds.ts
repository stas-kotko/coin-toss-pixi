import { Howl } from "howler";

const PATH_TO_ASSETS = "/assets/sounds/";

export const soundMap = {
	button: "button.wav",
};

export class Sounds {
	private _sounds: Record<string, Howl> = {};

	constructor(soundMap: Record<string, string>) {
		for (const key in soundMap) {
			const src = PATH_TO_ASSETS + soundMap[key];

			this._sounds[key] = new Howl({ src });
		}
	}

	play(key: string) {
		this._sounds[key]?.play();
	}
}
