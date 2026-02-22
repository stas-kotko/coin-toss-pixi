export enum CoinSide {
	HEADS = "heads",
	TAILS = "tails",
}

export enum RoundResult {
	WIN = "win",
	LOSE = "LOSE",
}

export interface TossResponse {
	result: CoinSide;
}

export enum Layout {
	LANDSCAPE,
	PORTRAIT,
}
