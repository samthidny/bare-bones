import TWEEN from 'tween.js';


class ReelMover {

	constructor() {
		this.reelData = null;
		this.onComplete = function(){};
	}


	start(toObj, time, ease) {
		
		this.reelData.distanceTravelled = 0;
		this.reelData.waitingForSwap = true;
		var eases = [TWEEN.Easing.Cubic.In, TWEEN.Easing.Cubic.Out, TWEEN.Easing.Linear.None, TWEEN.Easing.Quintic.In, TWEEN.Easing.Quintic.Out];
		var inst = this;
		//Quick Tween test
		//var tweenData = { speed: 0 };
		var tween = new TWEEN.Tween(this.reelData)
		    .to(toObj, time)
		    .easing(eases[ease])
		    .onComplete(function() {
		    	inst.onComplete();
		    })
		    .onUpdate(function() {

		    })
		    .start();

	}


}

export default ReelMover;