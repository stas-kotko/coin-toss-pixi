import { SERVER_URL } from "./config";
import { CoinSide, TossResponse } from "./types";

class Api {
	async toss(): Promise<CoinSide> {
		try {
			const res = await fetch(`${SERVER_URL}/api/toss`);
			if (!res.ok) {
				throw new Error(`Server error: ${res.status} ${res.statusText}`);
			}
			const { result } = await (res.json() as Promise<TossResponse>);
			return result;
		} catch (err) {
			throw new Error(`Toss request failed: ${err instanceof Error ? err.message : err}`);
		}
	}
}

export const API = new Api();
