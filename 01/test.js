const expect = require('expect.js');
const { getMinMax, rle, printNumbers, fibonacciSimple, fibonacciWithCache } = require('./tasks');

describe('Lesson 1', () => {
  describe('task 1 getMinMax', () => {
    it('should normally get numeric values from string', () => {
      expect(getMinMax('1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028')).to.eql({
        max: 15,
        min: -1028
      });

      expect(getMinMax('100 и 500 -3; 178 или неточное число 1.3232')).to.eql({
        max: 500,
        min: -3
      });

      expect(getMinMax('в этой строке чисел нет')).to.eql({
        max: -Infinity,
        min: Infinity
      });

      expect(getMinMax('')).to.eql({
        max: -Infinity,
        min: Infinity
      });

      expect(getMinMax({})).to.eql(null);
      
      expect(getMinMax([])).to.eql(null);
      
      expect(getMinMax([1, 2])).to.eql(null);      
      
      expect(getMinMax(123)).to.eql(null);
      
      expect(getMinMax(undefined)).to.eql(null);
      
      expect(getMinMax(null)).to.eql(null);
      
      expect(getMinMax(true)).to.eql(null);
    });
  });

  describe('task 2 fibonacciSimple', () => {
    it('should compute fibonacci number', () => {
      expect(fibonacciSimple(-1)).to.be(null);  
      expect(fibonacciSimple(0)).to.be(0);
      expect(fibonacciSimple(1)).to.be(1);
      expect(fibonacciSimple(6)).to.be(8);
      expect(fibonacciSimple(10)).to.be(55);
      
      expect(fibonacciSimple(null)).to.be(null);
      
      expect(fibonacciSimple(undefined)).to.be(null);
      
      expect(fibonacciSimple({})).to.be(null);
      
      expect(fibonacciSimple([])).to.be(null);
      
      expect(fibonacciSimple('string')).to.be(null);
      
      expect(fibonacciSimple(true)).to.be(null);
      
      expect(fibonacciSimple(123.999)).to.be(null);
    });
  });

  // TODO Как протестировать то, что кэш реально используется?
  describe('task 3 fibonacciWithCache', () => {
    it('should compute fibonacci number with cache', () => {
      expect(fibonacciWithCache(-1)).to.be(null);  
      expect(fibonacciWithCache(0)).to.be(0);
      expect(fibonacciWithCache(1)).to.be(1);
      expect(fibonacciWithCache(6)).to.be(8);
      expect(fibonacciWithCache(10)).to.be(55);
      
      expect(fibonacciWithCache(null)).to.be(null);
      
      expect(fibonacciWithCache(undefined)).to.be(null);
      
      expect(fibonacciWithCache({})).to.be(null);
      
      expect(fibonacciWithCache([])).to.be(null);
      
      expect(fibonacciWithCache('string')).to.be(null);
      
      expect(fibonacciWithCache(true)).to.be(null);
      
      expect(fibonacciWithCache(123.999)).to.be(null);
    });
  });

  describe('task 4 rle', () => {
    it('should convert the string correctly', () => {
      expect(rle('')).to.eql('');
      expect(rle('BCCDDDEEEE')).to.eql('BC2D3E4');
      expect(rle('AAAB')).to.eql('A3B');
      expect(rle('LLLKKFJJJJJJJJJDDDDDSSKQQQNNAAAAAGG')).to.eql('L3K2FJ9D5S2KQ3N2A5G2');

      expect(rle({})).to.eql(null);
      
      expect(rle([])).to.eql(null);
        
      expect(rle(123)).to.eql(null);
      
      expect(rle(undefined)).to.eql(null);
      
      expect(rle(null)).to.eql(null);
      
      expect(rle(true)).to.eql(null);
    });
  });

  describe('task 5 printNumbers', () => {
    it('should print numbers as expected', () => {
      expect(printNumbers(-1, 1)).to.eql(null);
      expect(printNumbers(0, -1)).to.eql(null);
      expect(printNumbers(100, 1)).to.eql(null);
      expect(printNumbers(1, 0)).to.eql(null);
      expect(printNumbers(0, 2)).to.eql(' 0');
      expect(printNumbers(11, 3)).to.eql(' 0  4  8\n 1  5  9\n 2  6 10\n 3  7 11');
      expect(printNumbers(5, 3)).to.eql(' 0  2  4\n 1  3  5');
      expect(printNumbers(1, 4)).to.eql(' 0  1');

      expect(printNumbers(1, null)).to.be(null);
      expect(printNumbers(null, 1)).to.be(null);
      expect(printNumbers(null, null)).to.be(null);
      
      expect(printNumbers(1, undefined)).to.be(null);
      expect(printNumbers(undefined, 1)).to.be(null);
      expect(printNumbers(undefined, undefined)).to.be(null);
      
      expect(printNumbers(1, {})).to.be(null);
      expect(printNumbers({}, 1)).to.be(null);
      expect(printNumbers({}, {})).to.be(null);
      
      expect(printNumbers(1, [])).to.be(null);
      expect(printNumbers([], 1)).to.be(null);
      expect(printNumbers([], [])).to.be(null);
      
      expect(printNumbers(1, 'string')).to.be(null);
      expect(printNumbers('string', 1)).to.be(null);
      expect(printNumbers('string', 'string')).to.be(null);
      
      expect(printNumbers(1, true)).to.be(null);
      expect(printNumbers(true, 1)).to.be(null);
      expect(printNumbers(true, true)).to.be(null);
      
      expect(printNumbers(1, 1.999)).to.be(null);
      expect(printNumbers(1.999, 1)).to.be(null);
      expect(printNumbers(1.999, 1.999)).to.be(null);
    });
  });
});