/**
 * Создайте класс, обладающий следующим поведением:
 * const values = ['hello', 'javascript', 'world'];
 * const instances = values.map(str => new NumberAndString(str));
 *
 * const resultConcatenation = instances.join(' '); // == 'hello javascript world'
 * const resultCharCount = instances.reduce((obj, memo) => memo + obj, 0); // == 20
 * @class NumberAndString
 * @param {String} str - initial value
 */
class NumberAndString {
  constructor(str) {
    this.str = str;
  }

  toString() {
    return this.str;
  }

  valueOf() {
    return this.str.length;
  }
}


/**
 * Сделать функцию, которая reject'ит возвращаемый промис, передавая в качестве ошибки строку 'timeout_error',
 * если он не resolve'ится за указанный timeout, или ведет себя эквивалентно исходному.
 * В учебных целях для этой задачи просьба не использовать Promise.race.
 *
 * @param {Promise} promise исходный промис
 * @param {Number} timeoutInMilliseconds время для timeout в миллисекундах
 * @return {Promise} промис с нужным поведением
 */
function rejectOnTimeout(promise, timeoutInMilliseconds) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject('timeout_error');
    }, timeoutInMilliseconds);

    promise
      .then(res => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch(err => {
        clearTimeout(timer);
        reject(err);
      });
  });
}


/**
 * Реализовать функцию, поведение которой аналогично поведению Promise.all,
 * которая возвращает в качестве результата rejected промис c первым reject value или resolve с массивом resolveValues,
 * в соответствущих исходному массиву промисов позициях, если не было ни одного промиса с reject.
 * @param {Array<Promise>} promises - массив с исходными промисами
 * @return {Promise}
 */
function promiseAll(promises) {
  const results = [];
  let completedPromises = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise.then(value => {
        results[index] = value;
        completedPromises++;

        if (completedPromises === promises.length) {
          resolve(results);
        }
      }).catch(error => {
        reject(error);
      });
    });
  });
}

/**
 * Реализовать функцию, поведение которой аналогично поведению Promise.race,
 * которая возвращает в качестве результата промис c первым resolve value или reject value в массиве исходных промисов
 * @param {Array<Promise>} promises - массив с исходными промисами
 * @return {Promise}
 */
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => promise.then(resolve).catch(reject));
  });
}


/**
 * Реализовать Range с римскими цифрами.
 * Изменить поведение чисел таким образом, чтобы указанные конструкции были эквивалетны при условии,
 * что римские цифры могут быть любыми.
 * 0..V => [0, 1, 2, 3, 4]
 * 0..VII => [0, 1, 2, 3, 4, 5, 6]
 * 5..X => [5, 6, 7, 8, 9]
 * Подсказка - необходимо использовать Proxy - объекты
 * */
// eslint-disable-next-line no-proto
Number.prototype.__proto__ = new Proxy({}, {
  get(target, property, number) {
    const upperBound = parseIntFromRoman(property);

    if (upperBound) {
      let arrayLength = upperBound - number + 1;

      if (arrayLength < 0) {
        arrayLength = 0;
      }

      return Array.from(new Array(arrayLength), (x, i) => i + number);
    }

    return target[property];
  }
});

const intFromRoman = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};

function isRomanNumber(string) {
  if (!/^[IVXLCDM]+$/.test(string)) {
    return false;
  }

  const substrs = string.match(/(.)\1*/g);

  for (let i = 0; i < substrs.length; i++) {
    if (substrs[i].length > 3) {
      return false;
    }
  }

  const correctSubtractionPairs = ['IV', 'IX', 'XL', 'XC', 'CD', 'CM'];

  for (let i = 0; i < string.length; i++) {
    if (i + 1 < string.length
      && intFromRoman[string[i]] < intFromRoman[string[i + 1]]
      && !correctSubtractionPairs.includes(string[i] + string[i + 1])
    ) {
      return false;
    }
  }

  return true;
}

function parseIntFromRoman(roman) {
  if (!isRomanNumber(roman)) {
    return null;
  }

  let result = 0;

  for (let i = 0; i < roman.length; i++) {
    let sign = 1;

    if (i + 1 < roman.length && intFromRoman[roman[i]] < intFromRoman[roman[i + 1]]) {
      sign = -1;
    }

    result += sign * intFromRoman[roman[i]];
  }

  return result;
}

module.exports = {
  NumberAndString,
  rejectOnTimeout,
  promiseAll,
  promiseRace
};
