import ReelComponent from './ReelComponent.js';
import ReelMover from './ReelMover.js';


class ReelsManager {

	createReels(reelsContainer, config) {

		this.config = config;

		//TODO -  Put Reel creation into SETUP Module/Command
		//Create multiple Reels
		this.reels = [];
		this.numReels = this.config.NUM_REELS;
		for (var i = 0; i < this.numReels; i++) {
			var reel = new ReelComponent();
			reel.addTo(reelsContainer);
			reel.container.x = i * 100;

			reel.reelData.setCurrentIndex(i * 3);
			reel.reelData.setScrollY(100);
			//var dir = i % 2 == 0 ? -1 : 1;
			//reel.reelData.speed = (i + 1) * 2 * dir;
			reel.reelData.setViewSize(4);
			reel.reelData.setSymbolHeight(this.config.SYMBOL_HEIGHT);
			this.reels.push(reel);
		}


		for (var i = 0; i < this.numReels; i++) {
			var reel = this.reels[i];
			reel.createUI();
		}

	
	}

	render() { 
		for (var i = 0; i < this.numReels; i++) {
			var reel = this.reels[i];
			reel.render();
		}

	}


	startReels() {

		for (var i = 0; i < this.numReels; i++) {
			var mover = new ReelMover();
			var reel = this.reels[i];
			reel.mover = mover;
			mover.reelData = reel.reelData;
			var inst = this;
			setTimeout(function(reel) {
				
				reel.reelData.speed = inst.config.REEL_PULL_BACK_SPEED;
				reel.mover.start({
					speed: inst.config.REEL_FULL_SPEED
				}, inst.config.REEL_SPEED_UP_TIME, inst.config.REEL_START_TWEEN_TYPE);
			}, i * inst.config.REEL_START_DELAY, reel);

		}

		setTimeout(function() {
			inst.stopReels();
		}, this.config.MIN_SPIN_TIME);

	}


	stopReels() {
		for (var i = 0; i < this.numReels; i++) {
			var reel = this.reels[this.config.REEL_STOP_ORDER[i]];
			var nextReelset = [5, 6, 7, 8, 9, 5, 6, 7, 8, 9, 5, 6, 7, 8, 9, 5, 6, 7, 8, 9, 5, 6, 7, 8, 9, 5, 6, 7, 8, 9, 5, 6, 7, 8, 9, 5, 6, 7, 8, 9];
			reel.reelData.nextReelset = nextReelset;

			var mover = new ReelMover();
			reel.mover = mover;
			mover.reelData = reel.reelData;
			var inst = this;
			setTimeout(function(reel, i) {
				reel.reelData.calculateStop(Math.floor(Math.random() * 3), inst.config.REEL_STOP_DISTANCE);
				reel.reelData.speed = 0;
				reel.mover.start({
					_scrollY: reel.reelData.stopY
				}, inst.config.REEL_STOP_TIME, inst.config.REEL_STOP_TWEEN_TYPE);
			}, ((i + 1) * inst.config.REEL_STOP_DELAY), reel, i);
		}

	}

	promiseTest() {

		return new Promise((resolve, reject) => {
        	setTimeout(resolve, 2000);
    	})

	}


}


export default ReelsManager;
