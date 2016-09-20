import ReelData from './ReelData.js';

import $ from 'jquery';
import PIXI from 'pixi.js';

class ReelComponent {

	constructor() {
		this.symbols = [];
		this.plane = null;
		this.stage = null;
		this.renderer = null;
		this.textures = {};
		this.reelData = new ReelData();
		this.reelData.setSymbols([0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1, 2, 3, 4]);
		this.paytable = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
		this.frames = [];
		this.parent = null;
		this.container = null;
		this.mover = null;
	}

	addTo(parent) {
		this.parent = parent;
		this.container = new PIXI.Container();
		this.parent.addChild(this.container);
	}

	createUI() {
		
		// Mask
		var mask = new PIXI.Graphics();
		mask.lineStyle(0);
		mask.beginFill(0x8bc5ff, 0.4);
		mask.drawRect(0, 0, 100, (this.reelData.viewSize-1) * this.reelData.symbolHeight);
		this.container.addChild(mask);
		this.container.mask = mask;
		this.parent.addChild(this.container);

		// Create symbol Frames from pngs
		for(var i=0; i<this.paytable.length; i++){
			this.frames.push(PIXI.Texture.fromFrame(i + '.png'));
		}

		// Add symbols based on viewsize (eg 3)
		for (var i = 0; i < 5; i++) {
			var sprite = new PIXI.extras.MovieClip(this.frames);
			this.container.addChild(sprite);
			sprite.y = (i * this.reelData.symbolHeight) - this.reelData.symbolHeight;
			sprite.gotoAndStop(i);
			this.symbols.push(sprite);
		}

	}

	render() {
		
		this.reelData.update();

		for (var i = 0; i < this.reelData.viewSize; i++) {
			var sprite = this.symbols[i];
			sprite.gotoAndStop(this.reelData.view[i]);
			sprite.y = ((i * this.reelData.symbolHeight) - this.reelData.scrollOffset);
		}

	}
	
}

export default ReelComponent;