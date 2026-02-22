import { API } from "../server/Api";
import { CoinSide } from "../types";
import { BaseState } from "./BaseState";
import { StateId } from "./StateMachine";

export class IdleState extends BaseState {
	enter(): void {
		super.enter();
		this._stateMachine.appEvents.chooseSide.add(this._onSideChosen, this);
	}

	public _onSideChosen(side: CoinSide) {
		this._stateMachine.gameModel.playersChoice = side;

		API.toss()
			.then((result) => this._gameResultHandler(result))
			.catch((err) => this._serverErrorHandler(err));

		this._stateMachine.setState(StateId.CoinFlight);
	}

	private _gameResultHandler(result: CoinSide) {
		this._stateMachine.appEvents.serverResponse.emit(result);
	}

	private _serverErrorHandler(err: Error) {
		this._stateMachine.setState(StateId.Idle);
		throw new Error(`Server responded with error: ${err.message}`)
	}

	exit(): void {
		super.exit();
		this._stateMachine.appEvents.chooseSide.remove(this._onSideChosen, this);
	}
}
