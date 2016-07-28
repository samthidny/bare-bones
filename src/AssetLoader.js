import EventEmitter from 'events';
import $ from 'jquery';
import PIXI from 'pixi.js';


class AssetLoader extends EventEmitter {

	constructor() {
		super();
	}

	load() {

		var inst = this;
		$.ajax({
		  dataType: "json",
		  url: "assets.json",
		  success: function(data) { inst.configLoaded(data) }
		});
	}

	configLoaded(data) {


		//LOAD ASSETS
		var loader = PIXI.loader;
		
		for(var prop in data.assets) {
			loader.add(data.assets[prop]);
		}

		var inst = this;
		loader.load(function(loader, resources) { 
			inst.onAssetsLoaded(loader, resources)
		});

	}


	onAssetsLoaded(loader, resources) {
		this.emit(AssetLoader.LOAD_COMPLETE, loader, resources);
	}

}

AssetLoader.LOAD_COMPLETE = "ASSET_LOADER_LOAD_COMPLETE";

export default AssetLoader;