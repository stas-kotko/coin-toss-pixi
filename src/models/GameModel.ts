import { StateId } from "../states/StateMachine";
import { CoinSide, RoundResult } from "../types";

export class GameModel {
	currentStateId: StateId | null = null;
	playersChoice?: CoinSide;
	roundResult?: RoundResult;
}
