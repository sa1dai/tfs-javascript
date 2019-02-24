/**
 * найдите минимум и максимум в любой строке
 * @param  {string} string входная строка(числа отделены от других частей строки пробелами или знаками препинания)
 * @return {({min: number, max: number}|null)} объект с минимумом и максимумом или null, если string - не строка
 * @example
 * getMinMax('1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028');
 * // returns { min: -1028, max: 15 }
 */
function getMinMax(string) {
  if (typeof string !== 'string') {
    return null;
  }

  const numbers = [];
  const words = string.match(/[^ ,;]+/g);

  if (words !== null) {
    words.forEach(word => {
      if (!isNaN(parseInt(word, 10))) {
        numbers.push(parseFloat(word));
      }
    });
  }

  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers)
  };
}

/* ============================================= */

function isNumber(x) {
  return !isNaN(parseInt(x, 10));
}

/**
 * Напишите рекурсивную функцию вычисления чисел Фибоначчи
 * @param {number} x номер числа
 * @return {(number|null)} число под номером х или null, если x - не целое число от 0 и больше
 */
function fibonacciSimple(x) {
  if (!isNumber(x)) {
    return null;
  }

  if (!Number.isInteger(x)) {
    return null;
  }

  if (x < 0) {
    return null;
  }

  if (x === 0 || x === 1) {
    return x;
  }

  return fibonacciSimple(x - 2) + fibonacciSimple(x - 1);
}

/* ============================================= */

const memoize = f => {
  const cache = {};

  return x => {
    if (x in cache) {
      return cache[x];
    }

    const result = f(x);

    cache[x] = result;

    return result;
  };
};

/**
 * Напишите функцию для вычисления числа Фибоначчи с мемоизацией:
 * при повторных вызовах функция не вычисляет значения, а достает из кеша.
 * @param {number} x номер числа
 * @return {(number|null)} число под номером х или null, если x - не целое число от 0 и больше
 */
const fibonacciWithCache = memoize(
  x => {
    if (!isNumber(x)) {
      return null;
    }

    if (!Number.isInteger(x)) {
      return null;
    }

    if (x < 0) {
      return null;
    }

    if (x === 0 || x === 1) {
      return x;
    }

    return fibonacciWithCache(x - 2) + fibonacciWithCache(x - 1);
  }
);

/* ============================================= */

/**
 * Напишите функцию printNumbers, выводящую числа в столбцах
 * так, чтобы было заполнено максимальное число столбцов при
 * минимальном числе строк.
 * Разделитель межу числами в строке - один пробел,
 * на каждое число при печати - отводится 2 символа
 * Пример работы: printNumbers(11, 3)
 *  0  4  8
 *  1  5  9
 *  2  6 10
 *  3  7 11
 * @param  {number} max  максимальное число (до 99)
 * @param  {number} cols количество столбцов
 * @return {(string|null)}
 */
function printNumbers(max, cols) {
  if (!isNumber(max) || !isNumber(cols)) {
    return null;
  }

  if (!Number.isInteger(max) || !Number.isInteger(cols)) {
    return null;
  }

  if (max < 0 || max > 99 || cols < 1) {
    return null;
  }

  const m = Math.floor((max + 1) / cols);
  const p = (max + 1) % cols;
  // (max + 1) === (m * cols + p)

  let result = '';
  let rows = m;

  if (p > 0) {
    rows++;
  }

  for (let i = 0; i < rows; i++) {
    let row = '';
    let currentRowCols = cols;

    if (p > 0 && i === rows - 1) {
      currentRowCols = p;
    }

    for (let j = 0; j < currentRowCols; j++) {
      let multiplier = m;

      if (p > 0 && j < p + 1) {
        multiplier++;
      }

      const number = i + multiplier * j;

      if (j > 0) {
        row += ' ';
      }

      if (number < 10) {
        row += ' ';
      }

      row += number;
    }

    result += row;

    if (i < rows - 1) {
      result += '\n';
    }
  }

  return result;
}

/* ============================================= */

/**
 * Реализуйте RLE-сжатие: AAAB -> A3B, BCCDDDEEEE -> BC2D3E4
 * @param  {string} input
 * @return {(string|null)}
 */
function rle(input) {
  if (typeof input !== 'string') {
    return null;
  }

  let i = 0;
  let result = '';

  while (i < input.length) {
    const char = input[i];
    let charCount = 1;

    while ((i + 1) < input.length && (input[i + 1] === char)) {
      charCount++;
      i++;
    }

    i++;

    result += char;

    if (charCount > 1) {
      result += charCount;
    }
  }

  return result;
}

module.exports = {
  getMinMax,
  rle,
  printNumbers,
  fibonacciSimple,
  fibonacciWithCache
};
