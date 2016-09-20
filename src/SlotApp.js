import ReelsManager from './reels/ReelsManager.js';
import ReelMover from './reels/ReelMover.js';
import AssetLoader from './AssetLoader.js';
import Test from './UI.js';

import EventEmitter from 'events';
import React from 'react';
import {render} from 'react-dom';
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

		//React UI Test
		render(<Test/>, document.getElementById("ui-container"));

		$("#ui-container").css("left", 200);
		$("#spin-button").click($.proxy(this.spinClickHandler, this));

		//Renderer
		this.renderer = PIXI.autoDetectRenderer(SlotApp.config.GAME_WIDTH, SlotApp.config.GAME_HEIGHT, { transparent: true });
		document.getElementById("game-container").appendChild(this.renderer.view);

		this.stage = new PIXI.Container();

		//Create Container for reels
		var reelsContainer = new PIXI.Container();
		reelsContainer.x = Math.round((SlotApp.config.GAME_WIDTH - 500) / 2);
		reelsContainer.y = Math.round((SlotApp.config.GAME_HEIGHT - 300) / 2);
		this.stage.addChild(reelsContainer);

		//Instantiate ReelManager and create Reels
		this.reels = new ReelsManager();
		this.reels.createReels(reelsContainer, SlotApp.config);

		this.reels.promiseTest().then(function(){ console.log("PROMISE RESOLVED") });

		this.render();

	}

	spinClickHandler() {
		this.reels.startReels();
	}


	
	
	render() {
		var inst = this;

		TWEEN.update();

		this.reels.render();

		this.renderer.render(this.stage);
		requestAnimationFrame(function() {
			inst.render();
		});
	}


}

export default SlotApp;