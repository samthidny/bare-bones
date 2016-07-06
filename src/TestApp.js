import Framework from './../libs/Framework.js';
import ReelData from './../libs/ReelData.js';

import $ from 'jquery';
import PIXI from 'pixi.js';

class TestApp {

	constructor() {
		console.log("Constructed");
	}
	
	initApp() {

		//Framework is a ES5 class with module.exports = Framework
		var f = new Framework();
		f.test();
		$(document).ready(function(){
			console.log("Docuument Ready");
		});

		//ReelData is an ECMA2015 class
		var r = new ReelData();
		console.log("ReelSize " + r.viewSize);
		
		//PIXI is a node module installed using npm pixi.js
		var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
		document.body.appendChild(renderer.view);

		// create the root of the scene graph
		var stage = new PIXI.Container();

		// create a texture from an image path
		var texture = PIXI.Texture.fromImage('https://pixijs.github.io/examples/_assets/basics/bunny.png');

		// create a new Sprite using the texture
		var bunny = new PIXI.Sprite(texture);

		// center the sprite's anchor point
		bunny.anchor.x = 0.5;
		bunny.anchor.y = 0.5;

		// move the sprite to the center of the screen
		bunny.position.x = 300;
		bunny.position.y = 150;

		stage.addChild(bunny);

		var dirx = 1;
		var diry = 1;
		var speed = 3;
		var rotation = 0.1;
		
		// start animating
		animate();
		
		function animate() {
			requestAnimationFrame(animate);

			// just for fun, let's rotate mr rabbit a little
			bunny.rotation += rotation;
			bunny.x += dirx * speed;
			bunny.y += diry * speed;
			
			if(dirx > 0 && bunny.x >= 750) {
				dirx = -r();
				
			}
			else if(dirx < 0 && bunny.x <= 50) {
				dirx = r();
			}
			
			if(diry > 0 && bunny.y >= 550) {
				diry = -r();
			}
			else if(diry < 0 && bunny.y <= 50) {
				diry = r();
			}
			
			function r() {
				rotation = (Math.random() - 0.5);
				return 0.5 + Math.random();
			}
			
			// render the container
			renderer.render(stage);
		}
		
	}	

}

export default TestApp;