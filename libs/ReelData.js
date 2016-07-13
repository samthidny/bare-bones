class ReelData {

  constructor() {
    this.symbols = [];
    this.viewSize = 3;
    this.viewOffset = 1;
    this.view = [];
    this.currentIndex = 0;
    this.numSymbols = 0;
    this.symbolHeight = 100;
    this.scrollY = 0;
    this.scrollOffset = 0;
  }

  setCurrentIndex(value) {
    this.currentIndex = this.correctIndex(value);
    this.updateView();
  }

  setSymbols(value) {
    this.symbols = value;
    this.numSymbols = this.symbols.length;
    this.updateView();
  }

  setViewSize(value) {
    this.viewSize = value;
    this.updateView();
  }

  setViewOffset(value) {
    this.updateView();
  }

  setSymbolHeight(value) {
    this.symbolHeight = value;
    this.updateView();
  }

  setScrollY(value) {
    this.scrollY = value;
    this.currentIndex = this.correctIndex(Math.floor(this.scrollY / this.symbolHeight));
    this.scrollOffset = Math.abs(this.scrollY % this.symbolHeight);
    //TODO - This needs a rethink something not right with having to abs and add 0 exception
    if(this.scrollOffset == 0) {
      this.scrollOffset = this.symbolHeight;
    }
    this.updateView();
  }


  updateView() {
    this.view = [];
    for (let i = 0; i < this.viewSize; i++) {
      this.view[i] = this.symbols[this.correctIndex(this.currentIndex + i)];//this.symbols[this.currentIndex + i];
    }

  }

  //Util functions

  /*
    Handles indexes out of scope of the array size eg [-10] or [9999999]
  */
  getItemAtIndex(index) {

  }

  correctIndex(index) {
      if(index < 0) {
  	    return this.numSymbols + (index % this.numSymbols);
      }
      return index % this.numSymbols;
  }

}

export default ReelData;
