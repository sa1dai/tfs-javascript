/* eslint-disable no-console */
/**
 * Исправьте проблему с таймером: должны выводиться числа от 0 до 9.
 * Доп. задание: предложите несколько вариантов решения.
 */
function timer(logger = console.log) {
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      logger(i);
    }, 100);
  }
}

function timerSecondSolution(logger = console.log) {
  // noinspection ES6ConvertVarToLetConst
  for (var i = 0; i < 10; i++) { // eslint-disable-line no-var
    // eslint-disable-next-line no-loop-func
    (() => {
      // noinspection ES6ConvertVarToLetConst
      var j = i; // eslint-disable-line no-var

      setTimeout(() => {
        logger(j);
      }, 100);
    })();
  }
}

function timerThirdSolution(logger = console.log) {
  // noinspection ES6ConvertVarToLetConst
  for (var i = 0; i < 10; i++) { // eslint-disable-line no-var
    // eslint-disable-next-line no-shadow
    (i => {
      setTimeout(() => {
        logger(i);
      }, 100);
    })(i);
  }
}

/*= ============================================ */

/**
 * Создайте собственную реализацию функции bind
 * @param {Function} func передаваемая функция
 * @param {any} context контекст
 * @param {Array<any>} args массив аргументов
 * @return {Function} функция с нужным контекстом
 */
function customBind(func, context, ...args) {
  return (...otherArgs) => func.apply(context, args.concat(otherArgs));
}

/*= ============================================ */

/**
 * Напишите функцию sum, вычисляющую суммы подобным образом:
 * sum(1)(2)( ) // 3
 * sum(1)(2)(3)( ) // 6
 * sum :: Number -> sum
 * sum :: void -> Number
 */
function sum(x) {
  if (!x) {
    return 0;
  }

  let result = x;

  const inner = y => {
    if (y) {
      result += y;
      return inner;
    }

    return result;
  };

  return inner;
}

/*= ============================================ */

/**
 * Определите, являются ли строчки анаграммами (например, “просветитель” — “терпеливость”).
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
function anagram(first, second) {
  if (first.length !== second.length) {
    return false;
  }

  const secondArray = [...second];

  for (let i = 0; i < first; i++) {
    const charIndexInSecond = secondArray.indexOf(first[i]);

    if (charIndexInSecond === -1) {
      return false;
    }

    secondArray.splice(charIndexInSecond, 1);
  }

  return true;
}

/*= ============================================ */

/**
 * Сократите массив чисел до набора уникальных значений
 * [1, 1, 2, 6, 3, 6, 2] → [1, 2, 3, 6]
 * @param {Array<number>} arr исходный массив
 * @return {Array<number>} массив уникальных значений, отсортированный по возрастанию
 */
function getUnique(arr) {
  arr.sort((a, b) => a - b);

  const uniqueArr = [];
  let previousNumber = null;

  arr.forEach(number => {
    if (number !== previousNumber) {
      uniqueArr.push(number);
      previousNumber = number;
    }
  });

  return uniqueArr;
}

/**
 * Найдите пересечение двух массивов
 * [1, 3, 5, 7, 9] и [1, 2, 3, 4] → [1, 3]
 * @param {Array<number>} first первый массив
 * @param {Array<number>} second второй массив
 * @return {Array<number>} массив уникальных значений, отсортированный по возрастанию
 */
function getIntersection(first, second) {
  first = getUnique(first); // eslint-disable-line no-param-reassign
  second = getUnique(second); // eslint-disable-line no-param-reassign

  const intersection = [];

  for (let i = 0; i < first.length; i++) {
    if (second.indexOf(first[i]) !== -1) {
      intersection.push(first[i]);
    }
  }

  return intersection;
}

/* ============================================= */

/**
 * Две строки называются изоморфными, когда в строке A можно заменить
 * конкретный символ на любой другой для получения строки B. (Расстояние Левенштейна, при возможных мутациях
 * ограничивающихся заменой символа - отличается на 1).
 * Отдельно стоит отметить что строка изоморфна самой себе.
 * Порядок символов должен остаться неизменным. Каждый
 * последовательный символ в строке A сравнивается с
 * каждым последовательным символов в строке B.
 *
 * @param  {string} left
 * @param  {string} right
 * @return {boolean}
 */
function isIsomorphic(left, right) {
  if (left.length !== right.length) {
    return false;
  }

  let diffNumber = 0;

  for (let i = 0; i < left.length; i++) {
    if (left[i] !== right[i]) {
      diffNumber++; // eslint-disable-line no-plusplus
    }

    if (diffNumber > 1) {
      return false;
    }
  }

  return true;
}

module.exports = {
  timer,
  timerSecondSolution,
  timerThirdSolution,
  customBind,
  sum,
  anagram,
  getUnique,
  getIntersection,
  isIsomorphic
};
