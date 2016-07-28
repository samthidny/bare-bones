import ReelComponent from './ReelComponent.js';
import EventEmitter from 'events';
import ReelMover from './ReelMover.js';
import AssetLoader from './AssetLoader.js';


import $ from 'jquery';
import PIXI from 'pixi.js';
import TWEEN from 'tween.js';


class SlotApp extends EventEmitter {

	constructor() {

		super();

		//Load defaults to avoid compiling evrytime we want to tweak settings
		var inst = this;
		$.ajax({
			dataType: "json",
			url: "config.json",
			success: function(data) {
				inst.loadAssets(data);
			}
		});

	}

	loadAssets(data) {
		SlotApp.config = data;
		var inst = this;
		var assetLoader = new AssetLoader();
		assetLoader.once(AssetLoader.LOAD_COMPLETE, function() {
			inst.createUI();
		});
		assetLoader.load();
	}

	createUI() {

		this.renderer = PIXI.autoDetectRenderer(SlotApp.config.GAME_WIDTH, SlotApp.config.GAME_HEIGHT, { transparent: true });
		//document.body.appendChild(this.renderer.view);
		document.getElementById("game-container").appendChild(this.renderer.view);
		//this.renderer.backgroundColor = 0x0494df;
		this.stage = new PIXI.Container();

		var reelsContainer = new PIXI.Container();
		reelsContainer.x = Math.round((SlotApp.config.GAME_WIDTH - 500) / 2);
		reelsContainer.y = Math.round((SlotApp.config.GAME_HEIGHT - 300) / 2);
		
		this.stage.addChild(reelsContainer);

		//TODO -  Put Reel creation into SETUP Module/Command
		//Create multiple Reels
		this.reels = [];
		this.numReels = 5;
		for (var i = 0; i < this.numReels; i++) {
			var reel = new ReelComponent();
			reel.addTo(reelsContainer);
			reel.container.x = i * 100;

			reel.reelData.setCurrentIndex(i * 3);
			reel.reelData.setScrollY(100);
			//var dir = i % 2 == 0 ? -1 : 1;
			//reel.reelData.speed = (i + 1) * 2 * dir;
			reel.reelData.setViewSize(4);
			reel.reelData.setSymbolHeight(SlotApp.config.SYMBOL_HEIGHT);
			this.reels.push(reel);
		}


		for (var i = 0; i < this.numReels; i++) {
			var reel = this.reels[i];
			reel.createUI();
		}

		this.startTween();
		this.render();

	}


	startTween() {

		for (var i = 0; i < this.numReels; i++) {
			var mover = new ReelMover();
			var reel = this.reels[i];
			reel.mover = mover;
			mover.reelData = reel.reelData;
			var inst = this;
			setTimeout(function(reel) {
				reel.reelData.speed = SlotApp.config.REEL_PULL_BACK_SPEED;
				reel.mover.start({
					speed: SlotApp.config.REEL_FULL_SPEED
				}, SlotApp.config.REEL_SPEED_UP_TIME, SlotApp.config.REEL_START_TWEEN_TYPE);
			}, i * SlotApp.config.REEL_START_DELAY, reel);

		}

		setTimeout(function() {
			inst.stopReels();
		}, 4000);

	}


	stopReels() {
		for (var i = 0; i < this.numReels; i++) {
			var reel = this.reels[i];


			//Test Swapping symbols
			var stopSymbols = [5, 6, 7, 8];
			var reelSymbols = reel.reelData.symbols;
			var stopDistance = SlotApp.config.REEL_STOP_DISTANCE;
			var fakeSymbols = reelSymbols.slice();
			var currentIndex = reel.reelData.currentIndex;
			for (var r = 0; r < stopSymbols.length; r++) {
				var insertIndex = reel.reelData.correctIndex(currentIndex - stopDistance + (stopSymbols.length - r));
				fakeSymbols[insertIndex] = stopSymbols[r];
			}
			reel.reelData.setSymbols(fakeSymbols);

			// Add stopper
			var mover = new ReelMover();
			reel.mover = mover;
			mover.reelData = reel.reelData;
			setTimeout(function(reel) {
				//Work out stop position
				var target = Math.floor((reel.reelData.scrollY - (SlotApp.config.REEL_STOP_DISTANCE * reel.reelData.symbolHeight)) / reel.reelData.symbolHeight) * reel.reelData.symbolHeight;
				reel.reelData.speed = 0;
				reel.mover.start({
					_scrollY: target
				}, SlotApp.config.REEL_STOP_TIME, SlotApp.config.REEL_STOP_TWEEN_TYPE);
			}, i * 400, reel);
		}
	}

	render() {
		var inst = this;

		TWEEN.update();

		for (var i = 0; i < this.numReels; i++) {
			var reel = this.reels[i];
			reel.render();
		}

		this.renderer.render(this.stage);
		requestAnimationFrame(function() {
			inst.render();
		});
	}


}

export default SlotApp;