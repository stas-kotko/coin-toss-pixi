import { AudioId } from "./Sounds";
import { StateId } from "./states/StateMachine";
import { CoinSide } from "./types";
import { Signal } from "./utils/Signal";

export class AppEvents {
	public readonly chooseSide = new Signal<CoinSide>();
	public readonly stateChanged = new Signal<StateId>();
	public readonly serverResponse = new Signal<CoinSide>();
	public readonly resize = new Signal<{ width: number; height: number }>();
	public readonly playSound = new Signal<AudioId>();
	public readonly stopSound = new Signal<AudioId>();
}
