import TWEEN from 'tween.js';


class ReelMover {

	constructor() {
		this.reelData = null;
	}


	start(toObj, time, ease) {
		
		var eases = [TWEEN.Easing.Cubic.In, TWEEN.Easing.Cubic.Out, TWEEN.Easing.Linear.None, TWEEN.Easing.Quintic.In, TWEEN.Easing.Quintic.Out];

		//Quick Tween test
		//var tweenData = { speed: 0 };
		var tween = new TWEEN.Tween(this.reelData)
		    .to(toObj, time)
		    .easing(eases[ease])
		    .onComplete(function() {

		    })
		    .onUpdate(function() {

		    })
		    .start();

	}


}

export default ReelMover;