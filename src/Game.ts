import { Application, Container } from "pixi.js";
import { AppEvents } from "./AppEvents";
import { IS_DEBUG, IS_MUTED, VIEWPORT_SIZE } from "./config";
import { GameModel } from "./GameModel";
import { soundMap, Sounds } from "./Sounds";
import { StateMachine } from "./states/StateMachine";
import { ViewportScaler } from "./utils/ViewportScaler";
import { GameView } from "./views/GameView";

export class Game {
	public app: Application;
	public gameModel = new GameModel();
	public appEvents = new AppEvents();
	public stateMachine: StateMachine;
	public sounds: Sounds;
	public gameView: Container;

	private _scaler: ViewportScaler;

	constructor(app: Application) {
		this.app = app;

		this.sounds = new Sounds(soundMap);
		this.appEvents.playSound.add(this.sounds.playAudio, this.sounds);
		this.appEvents.stopSound.add(this.sounds.stopAudio, this.sounds);
		this.sounds.setMute(IS_MUTED);

		const gameView = new GameView(app.stage, this.gameModel, this.appEvents);
		this.gameView = gameView;
		this.stateMachine = new StateMachine(this.gameModel, this.appEvents);

		this.app.stage.addChild(gameView);

		const [width, height] = VIEWPORT_SIZE;

		this._scaler = new ViewportScaler(this.app, this.app.stage, width, height, 30);
		this._scaler.debug = IS_DEBUG;
		this._scaler.attach();
		this._scaler.onResize.add((data) => this.appEvents.resize.emit(data));
	}
}
