export async function asyncTimer(waitTime: number) {
	return new Promise((res) => setTimeout(res, waitTime));
}
