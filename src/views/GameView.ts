import Confetti from "js-confetti";
import { Container, DestroyOptions } from "pixi.js";
import { AppEvents } from "../AppEvents";
import { LOSE_TEXT, WIN_TEXT } from "../config";
import { GameModel } from "../GameModel";
import { AudioId } from "../Sounds";
import { StateId } from "../states/StateMachine";
import { CoinSide, RoundResult } from "../types";
import { Button, ButtonOptions } from "./components/Button";
import { Coin } from "./components/Coin";
import { Modal } from "./components/Modal";
import { GAME_VIEW_LAYOUT } from "./gameLayout";

export class GameView extends Container {
	public readonly appStage: Container;
	public readonly gameModel: GameModel;
	public readonly appEvents: AppEvents;

	private _modal!: Modal;
	private _coin = new Coin();
	private _headsBtn!: Button;
	private _tailsBtn!: Button;
	private confetti = new Confetti();

	constructor(stage: Container, gameModel: GameModel, appEvents: AppEvents) {
		super();

		this.appStage = stage;
		this.gameModel = gameModel;
		this.appEvents = appEvents;

		appEvents.stateChanged.add(this._stateChangeHandler, this);
		appEvents.resize.add(this._onResize, this);

		this._createElements();
	}

	private _createElements() {
		this._createButtons();
		this._createCoin();
		this._createModal();
		this._layoutLandscape();
	}

	private _createButtons() {
		const btnOpts: ButtonOptions = {
			width: 300,
			height: 200,
			borderRadius: 16,
			fontSize: 52,
		};

		this._headsBtn = new Button(btnOpts);
		this._tailsBtn = new Button(btnOpts);

		this._headsBtn.setText("Heads");
		this._tailsBtn.setText("Tails");

		this._headsBtn.onClickSignal.add(() => this.btnHandler(CoinSide.HEADS));
		this._tailsBtn.onClickSignal.add(() => this.btnHandler(CoinSide.TAILS));

		this.addChild(this._headsBtn, this._tailsBtn);
	}

	private _createCoin() {
		this._coin.startSpinAnimation();
		this.addChild(this._coin);
	}

	private _createModal() {
		this._modal = new Modal();
		this.addChild(this._modal);
	}

	private _layoutLandscape(): void {
		const { headsBtn, tailsBtn, coin, modal } = GAME_VIEW_LAYOUT.landscape;

		this._headsBtn.position.set(headsBtn.x, headsBtn.y);
		this._tailsBtn.position.set(tailsBtn.x, tailsBtn.y);
		this._coin.position.set(coin.x, coin.y);

		const { width: mw, height: mh } = this._modal;
		this._modal.position.set(modal.x - mw / 2, modal.y - mh / 2);
	}

	private _layoutPortrait(): void {
		const { coin, headsBtn, tailsBtn, modal } = GAME_VIEW_LAYOUT.portrait;

		this._coin.position.set(coin.x, coin.y);
		this._headsBtn.position.set(headsBtn.x, headsBtn.y);
		this._tailsBtn.position.set(tailsBtn.x, tailsBtn.y);

		const { width: mw } = this._modal;
		this._modal.position.set(modal.x - mw / 2, modal.y);
	}

	private _onResize({ width, height }: { width: number; height: number }): void {
		if (height > width) {
			this._layoutPortrait();
		} else {
			this._layoutLandscape();
		}
	}

	private _stateChangeHandler(stateId: StateId) {
		switch (stateId) {
			case StateId.Init: {
				this._modal.visible = false;
				this._headsBtn.disable();
				this._tailsBtn.disable();
				break;
			}

			case StateId.Idle: {
				this._modal.visible = false;
				this._headsBtn.enable();
				this._tailsBtn.enable();
				this._coin.startSpinAnimation(0.5);
				break;
			}

			case StateId.CoinFlight: {
				this._headsBtn.disable();
				this._tailsBtn.disable();
				this._coin.setSpinSpeed(6);
				break;
			}

			case StateId.Result: {
				this._modal.visible = true;

				this._coin.stopAt(this.gameModel.tossResult!);

				if (this.gameModel.roundResult === RoundResult.WIN) {
					this.confetti.addConfetti();
					this._modal.setText(WIN_TEXT);
				} else {
					this._modal.setText(LOSE_TEXT);
				}

				break;
			}
		}
	}

	btnHandler(side: CoinSide) {
		this.appEvents.playSound.emit(AudioId.ButtonClick);
		this.appEvents.chooseSide.emit(side);
	}

	public destroy(options?: DestroyOptions): void {
		super.destroy(options);
		this.appEvents.stateChanged.remove(this._stateChangeHandler);
		this.appEvents.resize.remove(this._onResize);
	}
}
