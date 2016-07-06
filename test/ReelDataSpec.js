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
    reel.setSymbols([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(reel.symbols).to.have.lengthOf(9);
  })

  it('symbols numSymbols correct', () => {
    reel.setSymbols([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(reel.numSymbols).to.equal(9);
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
    expect(reel.view).to.eql([1, 2, 3, 4]);
  })

  it('should allow currentIndex to be changed', () => {
    reel.setCurrentIndex(3);
    expect(reel.currentIndex).to.equal(3);
  })

  it('should change view when index increases', () => {
    reel.setCurrentIndex(1);
    expect(reel.view).to.eql([2, 3, 4, 5]);
  })

  it('should correct negative currentIndex ', () => {
    reel.setCurrentIndex(-2);
    expect(reel.currentIndex).to.equal(7);
  })

  it('should correct too bigger currentIndex ', () => {
    reel.setCurrentIndex(12);
    expect(reel.currentIndex).to.equal(3);
  })

  it('should display correct view with negative currentIndex', () => {
    reel.setCurrentIndex(-2);
    expect(reel.view).to.eql([8, 9, 1, 2]);
  })

  it('should display correct view with larger than array length ', () => {
    reel.setCurrentIndex(10);
    expect(reel.view).to.eql([2, 3, 4, 5]);
  })


  it('', () => {

  })

  it('', () => {

  })

  /*
    it('', () => {
  
    })
  */













});
