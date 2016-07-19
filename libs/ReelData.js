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
    this.speed = 2;
    this.totalHeight = 0;
  }

  setCurrentIndex(value) {
    this.currentIndex = this.correctIndex(value);
    this.scrollY = this.symbolHeight * this.currentIndex;
    this.updateView();
  }

  setSymbols(value) {
    this.symbols = value;
    this.numSymbols = this.symbols.length;
    this.updateTotalHeight();
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
    this.updateTotalHeight();
    this.updateView();
  }

  setScrollY(value) {
    this.scrollY = this.correctScrollY(value);
    this.currentIndex = this.correctIndex(Math.floor(this.scrollY / this.symbolHeight));
    this.scrollOffset = Math.abs(this.scrollY % this.symbolHeight);
    this.updateView();
  }


  updateView() {
    this.view = [];
    for (let i = 0; i < this.viewSize; i++) {
      this.view[i] = this.symbols[this.correctIndex(this.currentIndex + i)];//this.symbols[this.currentIndex + i];
    }

  }

  updateTotalHeight() {
    this.totalHeight = this.numSymbols * this.symbolHeight;
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

  correctScrollY(value) {
    if(value > this.totalHeight) {
      return this.correctScrollY(value - this.totalHeight);
    }
    else if(value < 0) {
      return this.correctScrollY(value + this.totalHeight); 
    }
    //If value is between 0 - totalHeight then it's valid
    return value;
  }

}

export default ReelData;
