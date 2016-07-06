class ReelData {

  constructor() {
    this.symbols = [];
    this.viewSize = 3;
    this.viewOffset = 1;
    this.view = [];
    this.currentIndex = 0;
    this.numSymbols = 0;
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
