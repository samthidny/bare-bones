/**
 * babeltest
 *
 * Copyright © 2016 . All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { expect } from 'chai';

import ReelData from './../libs/ReelData';

describe('ReelData', () => {


  it('should be OK', () => {
    const reel = new ReelData();
    expect(reel).to.be.ok;
  })

  it('should return an instance of ReelData', () => {
    const reel = new ReelData();
    expect(reel).to.be.a.instanceof(ReelData);
  })

  it('symbols is an array', () => {
    const reel = new ReelData();
    expect(reel.symbols).to.be.a.instanceof(Array);
  })

  it('symbols should be empty', () => {
    const reel = new ReelData();
    expect(reel.symbols).to.be.empty;
  })

  //Populate symbols
  const reel = new ReelData();

  it('starts with 0 currentIndex', () => {
    expect(reel.currentIndex).to.equal(0);
  })

  it('symbols setSymbols length correct', () => {
    reel.setSymbols([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(reel.symbols).to.have.lengthOf(10);
  })

  it('symbols numSymbols correct', () => {
    expect(reel.numSymbols).to.equal(10);
  })

  it('default view size is 3', () => {
    expect(reel.viewSize).to.equal(3);
  })

  it('should allow custom view size', () => {
    reel.setViewSize(4);
    expect(reel.viewSize).to.equal(4);
  })

  it('should have default view offset is 1', () => {
    expect(reel.viewOffset).to.equal(1);
  })

  it('should show view correctly without offsets', () => {
    expect(reel.view).to.have.lengthOf(4);
  })

  it('should have initial view of 1,2,3,4', () => {
    expect(reel.view).to.eql([0, 1, 2, 3]);
  })

  it('should allow currentIndex to be changed', () => {
    reel.setCurrentIndex(3);
    expect(reel.currentIndex).to.equal(3);
  })

  it('should change view when index increases', () => {
    reel.setCurrentIndex(1);
    expect(reel.view).to.eql([1, 2, 3, 4]);
  })

  it('should correct negative currentIndex ', () => {
    reel.setCurrentIndex(-2);
    expect(reel.currentIndex).to.equal(8);
  })

  it('should correct too bigger currentIndex ', () => {
    reel.setCurrentIndex(12);
    expect(reel.currentIndex).to.equal(2);
  })

  it('should display correct view with negative currentIndex', () => {
    reel.setCurrentIndex(-2);
    expect(reel.view).to.eql([8, 9, 0, 1]);
  })

  it('should display correct view with larger than array length ', () => {
    reel.setCurrentIndex(12);
    expect(reel.view).to.eql([2, 3, 4, 5]);
  })


  it('should be able to set symbolHeight', () => {
    reel.setSymbolHeight(200);
    expect(reel.symbolHeight).to.equal(200);
  })

  it('should be able to scroll in pixels by setting scrollY', () => {
    reel.setSymbolHeight(100);
    reel.setScrollY(250);
    expect(reel.scrollY).to.equal(250);
    expect(reel.currentIndex).to.equal(2);
  })

  it('should handle scrolling beyond max', () => {
    reel.setScrollY(1050);
    expect(reel.currentIndex).to.equal(0);
  })

  it('should handle negative scroll', () => {
    reel.setScrollY(-50);
    expect(reel.currentIndex).to.equal(9);
    expect(reel.view).to.eql([9, 0, 1, 2]);
  })

  it('should have an offset based on scrollY and symbolHeight', () => {
    reel.setScrollY(150);
    expect(reel.scrollOffset).to.equal(50);

  })


  it('should be correct index when adjusting scrollY', () => {
    reel.setScrollY(0);
    expect(reel.currentIndex).to.equal(0);
    reel.setScrollY(99);
    expect(reel.currentIndex).to.equal(0);
    reel.setScrollY(100);
    expect(reel.currentIndex).to.equal(1);
    reel.setScrollY(-1);
    expect(reel.currentIndex).to.equal(9);
    reel.setScrollY(-100);
    expect(reel.currentIndex).to.equal(9);
    expect(reel.view).to.eql([9, 0, 1, 2]);
    reel.setScrollY(-101);
    expect(reel.currentIndex).to.equal(8);
    expect(reel.view).to.eql([8, 9, 0, 1]);




  })




  it('', () => {

  })





  /*
    it('', () => {
  
    })
  */













});
