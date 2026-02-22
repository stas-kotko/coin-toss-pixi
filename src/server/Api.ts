import { SERVER_URL } from "../config";
import { CoinSide, TossResponse } from "../types";

class Api {
	async toss(): Promise<CoinSide> {
		const res = await fetch(`${SERVER_URL}/api/toss`);
		const { result } = await (res.json() as Promise<TossResponse>);
		return result;
	}
}

export const API = new Api();
