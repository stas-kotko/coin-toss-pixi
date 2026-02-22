export enum StateId {
	Init = "init",
	Idle = "idle",
	Result = "result",
	CoinFlight = "coinFlight",
}

export enum CoinSide {
	HEADS = "heads",
	TAILS = "tails",
}

export enum RoundResult {
	WIN = "win",
	LOSE = "lose",
}

export interface TossResponse {
	result: CoinSide;
}

export enum Layout {
	LANDSCAPE,
	PORTRAIT,
}
