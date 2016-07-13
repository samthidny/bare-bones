import Framework from './../libs/Framework.js';
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
	}

	initApp() {

		this.reelData.setViewSize(4);
		this.reelData.setSymbolHeight(100);

		//PIXI
		var loader = PIXI.loader;
		loader.add('images/symbols.json');

		var inst = this;
		loader.load(function(loader, resources) { inst.onAssetsLoaded(loader, resources) });

	}

	onAssetsLoaded(loader, resources) {
		console.log("Loaded");

		this.renderer = PIXI.autoDetectRenderer(500, 500);
		this.renderer.backgroundColor = 0x0494df;
		document.body.appendChild(this.renderer.view);
		this.stage = new PIXI.Container();

		//Add 10 symbols to avoid switching textures and pool them, assumes only ever 1 of each for now.
		//Originally this was done with textures but I've been warned that is very heavy switching textures
		//TODO - performance/stress test the 2 methods - as MovieClip works in exact same way (texture swapping)
		for(var i=0; i<this.paytable.length; i++){
			this.frames.push(PIXI.Texture.fromFrame(i + '.png'));
		}

		//Add symbols based on viewsize (eg 3)
		for (var i = 0; i < 10; i++) {
			var sprite = new PIXI.extras.MovieClip(this.frames);
			this.stage.addChild(sprite);
			sprite.y = i * this.reelData.symbolHeight;
			sprite.gotoAndStop(i);
			this.symbols.push(sprite);
		}

		this.render();
	}

	renderReel() {
		//Hide pooled sprites
		for(var i=0; i<10; i++) {
			var sprite = this.symbols[i];
			sprite.y = 400;
			sprite.visible = false;
		}

		//Add symbols based on viewsize (eg 3)
		for (var i = 0; i < this.reelData.viewSize; i++) {
			var sprite = this.symbols[this.reelData.view[i]];
			sprite.y = (i * this.reelData.symbolHeight) + this.reelData.scrollOffset;
			sprite.visible = true;
		}
	}

	render() {

		var inst = this;
		this.reelData.setScrollY(this.reelData.scrollY -8);
		this.renderReel();
		this.renderer.render(this.stage);
		requestAnimationFrame(function() { inst.render() });
	}
}

export default ReelApp;