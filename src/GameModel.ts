import { CoinSide, RoundResult, StateId } from "./types";

export class GameModel {
	currentStateId: StateId | null = null;
	playersChoice?: CoinSide;
	tossResult?: CoinSide;
	roundResult?: RoundResult;
}
