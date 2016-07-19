import ReelApp from './ReelApp.js';
import EventEmitter from 'events';

import $ from 'jquery';
import PIXI from 'pixi.js';

class SlotApp extends EventEmitter {

	constructor() {

		super();
		this.renderer = PIXI.autoDetectRenderer(1000, 500, {transparent:true});
		//this.renderer.backgroundColor = 0x0494df;
		document.body.appendChild(this.renderer.view);
		this.stage = new PIXI.Container();

		//LOAD ASSETS
		var loader = PIXI.loader;
		loader.add('images/symbols.json');

		var inst = this;
		loader.load(function(loader, resources) { inst.onAssetsLoaded(loader, resources) });

		
		//Create multiple Reels
		this.reels = [];
		this.numReels = 10;
		for(var i=0; i<this.numReels; i++) {
			var reel = new ReelApp();
			reel.addTo(this.stage);
			reel.container.x = i * 100;
			reel.container.y = 100;

			reel.reelData.setCurrentIndex(i * 3);
			//reel.reelData.setScrollY(100);
			var dir = i % 2 == 0 ? -1 : 1;
			reel.reelData.speed = (i + 1) * 2 * dir;
			reel.reelData.setViewSize(4);
			reel.reelData.setSymbolHeight(100);
			this.reels.push(reel);
		}
		


	}

	onAssetsLoaded(loader, resources) {
		for(var i=0; i<this.numReels; i++) {
			var reel = this.reels[i];
			
			reel.onAssetsLoaded(loader, resources);
		}
		this.emit("test", "andy", "smith", "test", {things:123});
		this.render();
	}


	render() {
		var inst = this;
		
		for(var i=0; i<this.numReels; i++) {
			var reel = this.reels[i];
			reel.reelData.setScrollY(reel.reelData.scrollY - reel.reelData.speed);
			reel.render();
		}

		
		this.renderer.render(this.stage);
		requestAnimationFrame(function() { inst.render() });
	}


}

export default SlotApp;