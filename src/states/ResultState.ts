import { SHOW_RESULT_DURATION } from "../config";
import { BaseState } from "./BaseState";
import { StateId } from "./StateMachine";

export class ResultState extends BaseState {
	public enter(): void {
		super.enter();

		setTimeout(() => {
			this._stateMachine.setState(StateId.Idle);
		}, SHOW_RESULT_DURATION);
	}

	public exit(): void {
		super.exit();
	}
}
