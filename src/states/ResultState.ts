import { SHOW_RESULT_DURATION } from "../config";
import { AudioId } from "../Sounds";
import { RoundResult } from "../types";
import { BaseState } from "./BaseState";
import { StateId } from "./StateMachine";

export class ResultState extends BaseState {
	private _timeout?: number;

	public enter(): void {
		super.enter();

		const isWin = this._stateMachine.gameModel.roundResult === RoundResult.WIN;
		this._stateMachine.appEvents.playSound.emit(isWin ? AudioId.Win : AudioId.Lose);

		this._timeout = setTimeout(() => {
			this._stateMachine.setState(StateId.Idle);
		}, SHOW_RESULT_DURATION);
	}

	public exit(): void {
		if (this._timeout) {
			clearTimeout(this._timeout);
		}
		super.exit();
	}
}
