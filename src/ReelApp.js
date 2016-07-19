import ReelData from './../libs/ReelData.js';

import $ from 'jquery';
import PIXI from 'pixi.js';

class ReelApp {

	constructor() {
		console.log("Constructed");
		this.symbols = [];
		this.plane = null;
		this.stage = null;
		this.renderer = null;
		this.textures = {};
		this.reelData = new ReelData();
		this.reelData.setSymbols([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
		this.paytable = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		this.frames = [];
		this.parent = null;
		this.container = null;
	}

	addTo(parent) {
		this.parent = parent;
		this.container = new PIXI.Container();
		this.parent.addChild(this.container);
	}

	onAssetsLoaded(loader, resources) {

		console.log("Loaded");

		
		// lets create moving shape
		var mask = new PIXI.Graphics();
		mask.lineStyle(0);
		mask.beginFill(0x8bc5ff, 0.4);
		mask.drawRect(0, 0, 100, (this.reelData.viewSize-1) * this.reelData.symbolHeight);
		this.container.addChild(mask);
		this.container.mask = mask;
		this.parent.addChild(this.container);


		//Add 10 symbols to avoid switching textures and pool them, assumes only ever 1 of each for now.
		//Originally this was done with textures but I've been warned that is very heavy switching textures
		//TODO - performance/stress test the 2 methods - as MovieClip works in exact same way (texture swapping)
		for(var i=0; i<this.paytable.length; i++){
			this.frames.push(PIXI.Texture.fromFrame(i + '.png'));
		}

		//Add symbols based on viewsize (eg 3)
		for (var i = 0; i < 10; i++) {
			var sprite = new PIXI.extras.MovieClip(this.frames);
			this.container.addChild(sprite);
			sprite.y = (i * this.reelData.symbolHeight) - this.reelData.symbolHeight;
			sprite.gotoAndStop(i);
			this.symbols.push(sprite);
		}

	}

	render() {
		//Hide pooled sprites
		for(var i=0; i<10; i++) {
			var sprite = this.symbols[i];
			sprite.y = 400;
			sprite.visible = false;
		}

		//Add symbols based on viewsize (eg 3)
		for (var i = 0; i < this.reelData.viewSize; i++) {
			var sprite = this.symbols[this.reelData.view[i]];
			sprite.y = ((i * this.reelData.symbolHeight) - this.reelData.scrollOffset);
			sprite.visible = true;
		}
	}

	
}

export default ReelApp;