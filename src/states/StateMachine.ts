import { AppEvents } from "../AppEvents";
import { GameModel } from "../GameModel";
import { StateId } from "../types";
import { BaseState } from "./BaseState";
import { CoinFlightState } from "./CoinFlightState";
import { IdleState } from "./IdleState";
import { InitState } from "./InitState";
import { ResultState } from "./ResultState";

export class StateMachine {
	public readonly gameModel: GameModel;
	public readonly appEvents: AppEvents;

	private _states = new Map<StateId, BaseState>();
	private _currentState!: BaseState;

	constructor(gameModel: GameModel, appEvents: AppEvents) {
		this.gameModel = gameModel;
		this.appEvents = appEvents;

		this._createStates();

		this.setState(StateId.Init);
	}

	private _createStates() {
		this._states.set(StateId.Init, new InitState(StateId.Init, this));
		this._states.set(StateId.Idle, new IdleState(StateId.Idle, this));
		this._states.set(StateId.CoinFlight, new CoinFlightState(StateId.CoinFlight, this));
		this._states.set(StateId.Result, new ResultState(StateId.Result, this));
	}

	public setState(nextStateId: StateId): void {
		if (this._currentState) {
			this._currentState.exit();
		}

		if (!this._states.has(nextStateId)) {
			throw new Error(`FSM: There is no state with id ${nextStateId}`);
		}

		this._currentState = this._states.get(nextStateId)!;
		this.gameModel.currentStateId = nextStateId;
		this.appEvents.stateChanged.emit(nextStateId);

		this._currentState.enter();
	}
}
export { StateId };
