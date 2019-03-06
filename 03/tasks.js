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
  return Promise.resolve(null);
}


/**
 * Реализовать функцию, поведение которой аналогично поведению Promise.all,
 * которая возвращает в качестве результата rejected промис c первым reject value или resolve с массивом resolveValues,
 * в соответствущих исходному массиву промисов позициях, если не было ни одного промиса с reject.
 * @param {Array<Promise>} promises - массив с исходными промисами
 * @return {Promise}
 */
function promiseAll(promises) {
  return Promise.resolve(null);
}


/**
 * Реализовать функцию, поведение которой аналогично поведению Promise.race,
 * которая возвращает в качестве результата промис c первым resolve value или reject value в массиве исходных промисов
 * @param {Array<Promise>} promises - массив с исходными промисами
 * @return {Promise}
 */

function promiseRace(promises) {
  return Promise.resolve(null);
}


/**
 * Реализовать Range с римскими цифрами.
 * Изменить поведение чисел таким образом, чтобы указанные конструкции были эквивалетны при условии,
 * что римские цифры могут быть любыми.
 * 0..V => [0, 1, 2, 3, 4]
 * 0..VII => [0, 1, 2, 3, 4, 5, 6]
 * 0..X => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
 * Подсказка - необходимо использовать Proxy - объекты
 * */


module.exports = {
  NumberAndString,
  rejectOnTimeout,
  promiseAll,
  promiseRace
};
