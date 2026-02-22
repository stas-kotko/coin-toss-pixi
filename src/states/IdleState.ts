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

		API.toss().then((result) => {
			this._stateMachine.appEvents.serverResponse.emit(result);
		});

		this._stateMachine.setState(StateId.CoinFlight);
	}

	exit(): void {
		super.exit();
		this._stateMachine.appEvents.chooseSide.remove(this._onSideChosen);
	}
}
