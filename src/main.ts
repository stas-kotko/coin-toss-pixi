import Logger from "js-logger";
import { Application, Assets } from "pixi.js";
import { Game } from "./Game";
import { initDevtools } from "@pixi/devtools";
import { IS_DEBUG } from "./config";

(async () => {
	const app = new Application();
	await app.init({ background: "#1099bb", resizeTo: window });
	document.getElementById("pixi-container")!.appendChild(app.canvas);

	if (IS_DEBUG) {
		initDevtools(app);
		Logger.useDefaults();
	}

	await Assets.load([
		{ src: "/assets/spine/coin/coin-pro.json", alias: "skeleton-data" },
		{ src: "/assets/spine/coin/coin-pma.atlas", alias: "skeleton-atlas" },
		{ src: "/assets/img/btn.png", alias: "btn" },
	]);

	new Game(app);
})();
