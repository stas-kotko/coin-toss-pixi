import Logger from "js-logger";
import { StateId, StateMachine } from "./StateMachine";

export abstract class BaseState {
	public readonly id: StateId;

	protected readonly _stateMachine: StateMachine;

	constructor(id: StateId, stateMachine: StateMachine) {
		this.id = id;
		this._stateMachine = stateMachine;
	}

	public enter(): void {
		Logger.info(`>>> Enter ${this.id} state`);
	}

	public exit(): void {
		Logger.info(`>>> Exit ${this.id} state`);
	}
}
