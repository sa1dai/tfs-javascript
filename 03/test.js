const expect = require('expect.js');
const { NumberAndString, rejectOnTimeout, promiseAll, promiseRace } = require('./tasks');

function delayPromise(promise, timeout) {
  let resolveValue = null;
  let rejectValue = null;

  promise.then(
    value => resolveValue = value,
    err => rejectValue = err
  );

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (resolveValue !== null) {
        resolve(resolveValue);
      } else if (rejectValue !== null) {
        reject(rejectValue);
      } else {
        promise.then(resolve, reject);
      }
    }, timeout);
  });
}

describe('Lesson 3', () => {
  describe('NumberAndString', () => {
    it('should have behavior as expected', () => {
      const values = ['hello', 'javascript', 'world'];
      const instances = values.map(str => new NumberAndString(str));

      const resultConcatenation = instances.join(' ');
      const resultCharCount = instances.reduce((obj, memo) => memo + obj, 0);

      expect(resultConcatenation).to.eql('hello javascript world');
      expect(resultCharCount).to.eql(20);
    });
  });

  describe('rejectOnTimeout', () => {
    it('should work as initial resolved promise', done => {
      rejectOnTimeout(Promise.resolve(10), 1000).then(value => {
        expect(value).to.eql(10);
        done();
      }, e => done(new Error(`Rejection with ${e}`)));
    });

    it('should work as initial rejected promise', done => {
      rejectOnTimeout(Promise.reject(10), 1000).then(
        value => e => done(new Error(`Resolved with ${value}`)),
        errValue => {
          expect(errValue).to.eql(10);
          done();
        }
      );
    });

    it('should work as reject delayed rejection', done => {
      rejectOnTimeout(delayPromise(Promise.reject('test_value'), 1000), 500).then(
        value => done(new Error(`Resolved with ${value}`)),
        errValue => {
          expect(errValue).to.eql('timeout_error');
          done();
        }
      );
    });

    it('should work as reject delayed resoluton', done => {
      rejectOnTimeout(delayPromise(Promise.resolve('test_value'), 1000), 500).then(
        value => done(new Error(`Resolved with ${value}`)),
        errValue => {
          expect(errValue).to.eql('timeout_error');
          done();
        }
      );
    });
  });

  describe('promiseAll', () => {
    it('should be rejected if one was rejected', done => {
      promiseAll([
        Promise.reject('test_error'),
        Promise.resolve('test_value')
      ]).then(
        value => done(new Error(`Resolution with ${value}`)),
        errValue => {
          expect(errValue).to.eql('test_error');
          done();
        }
      );
    });

    it('should be resolved if all were resolved', done => {
      promiseAll([
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3)
      ]).then(
        values => {
          expect(values).to.eql([1, 2, 3]);
          done();
        },
        errValue => done(new Error(`Rejection with ${errValue}`))
      );
    });

    it('should be rejected if one was rejected with delay', done => {
      promiseAll([
        delayPromise(Promise.reject('test_error'), 1000),
        Promise.resolve(2),
        Promise.resolve(3)
      ]).then(
        value => done(new Error(`Resolution with ${value}`)),
        errValue => {
          expect(errValue).to.eql('test_error');
          done();
        }
      );
    });

    it('should be resolved if all were resolved with delay', done => {
      promiseAll([
        delayPromise(Promise.resolve(1), 200),
        delayPromise(Promise.resolve(2), 300),
        Promise.resolve(3)
      ]).then(
        values => {
          expect(values).to.eql([1, 2, 3]);
          done();
        },
        errValue => done(new Error(`Rejection with ${errValue}`))
      );
    });

  });

  describe('promiseRace', () => {
    it('should be rejected if firstly one of the promises was rejected', done => {
      promiseRace([
        delayPromise(Promise.reject('test_error'), 500),
        delayPromise(Promise.resolve('test_value'), 1000)
      ]).then(
        value => done(new Error(`Resolution with ${value}`)),
        errValue => {
          expect(errValue).to.eql('test_error');
          done();
        }
      );
    });

    it('should be resolved if firstly one of the promises was resolved', done => {
      promiseRace([
        delayPromise(Promise.reject('test_error'), 1000),
        delayPromise(Promise.resolve('test_value'), 500)
      ]).then(
        values => {
          expect(values).to.eql('test_value');
          done();
        },
        errValue => done(new Error(`Rejection with ${errValue}`))
      );
    });

  });
});
