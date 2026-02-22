import { Howl, HowlOptions } from "howler";
import { BG_MUSIC_VOLUME } from "./config";

const PATH_TO_ASSETS = "/assets/sounds/";

export enum AudioId {
	ButtonClick = "button_click",
	Win = "win",
	Lose = "lose",
	Ambience = "ambience",
}

export const soundMap: Record<AudioId, HowlOptions> = {
	[AudioId.ButtonClick]: { src: "button.wav" },
	[AudioId.Win]: { src: "win.wav" },
	[AudioId.Lose]: { src: "lose.wav" },
	[AudioId.Ambience]: { src: "ambience.mp3", loop: true, volume: BG_MUSIC_VOLUME },
};

export class Sounds {
	private _sounds: Record<string, Howl> = {};

	constructor(soundMap: Record<AudioId, HowlOptions>) {
		for (const key in soundMap) {
			const { src, ...rest } = soundMap[key as AudioId];
			this._sounds[key] = new Howl({ src: PATH_TO_ASSETS + src, ...rest });
		}
	}

	public playAudio(id: AudioId): void {
		this._sounds[id]?.play();
	}

	public stopAudio(id: AudioId): void {
		this._sounds[id]?.stop();
	}

	public setMute(isMute: boolean) {
		for (const key in this._sounds) {
			this._sounds[key].mute(isMute);
		}
	}
}
