/**
 * Создайте функцию троттлинга (пропуска кадров) — вызов функции callback производится не чаще,  чем в time раз
 * Доп. задание: предложите несколько вариантов решения.
 */
function throttle(time, callback) {
  let isThrottled = false;
  let savedArgs;
  let savedThis;

  function wrapper(...params) {
    if (isThrottled) {
      savedArgs = params;
      savedThis = this;
      return;
    }

    callback.apply(this, params);

    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = null;
        savedThis = null;
      }
    }, time);
  }

  return wrapper;
}

module.exports = { throttle };
