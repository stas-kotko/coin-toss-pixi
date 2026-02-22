import Logger from "js-logger";
import { CoinSide, RoundResult } from "../types";
import { BaseState } from "./BaseState";
import { StateId } from "./StateMachine";

export class CoinFlightState extends BaseState {
	public enter(): void {
		this._stateMachine.appEvents.serverResponse.addOnce(this._handleServerResponse, this);
	}

	private _handleServerResponse(tossResult: CoinSide) {
		Logger.info(">>> coinTossResult", tossResult);

		const { gameModel } = this._stateMachine;

		gameModel.roundResult = gameModel.playersChoice === tossResult ? RoundResult.WIN : RoundResult.LOSE;

		this._stateMachine.setState(StateId.Result);
	}

	public exit(): void {}
}
