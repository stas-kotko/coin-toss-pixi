import { AudioId } from "../Sounds";
import { BaseState } from "./BaseState";
import { StateId } from "./StateMachine";

export class InitState extends BaseState {
	enter() {
		super.enter();
		this._stateMachine.appEvents.playSound.emit(AudioId.Ambience);
		this._stateMachine.setState(StateId.Idle);
	}

	exit() {
		super.exit();
	}
}
