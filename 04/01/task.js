/* eslint-disable no-use-before-define */
const phoneInput = document.getElementById('phone');

let previousPhone = '+7 (___) ___-__-__';
let phoneDigitsCount = 0;
const minAvailableCursorPosition = '+7('.length + 1;

phoneInput.addEventListener('focus', event => {
  event.target.value = previousPhone;
  setCursorPosition(event.target, getMaxAvailibleCursorPosition());
});

phoneInput.addEventListener('click', e => {
  const cursorPosition = event.target.selectionStart;

  setCursorPosition(e.target, correctCursorPositionAfterMouseClick(cursorPosition));
});

phoneInput.addEventListener('keyup', event => {
  // noinspection JSUnresolvedVariable
  let cursorPosition = event.target.selectionStart;

  switch (event.key) {
    case 'ArrowRight': {
      cursorPosition = correctCursorPositionAfterRightShift(cursorPosition);

      const maxAvailablePosition = getMaxAvailibleCursorPosition();

      if (cursorPosition > maxAvailablePosition) {
        cursorPosition = maxAvailablePosition;
      }

      setCursorPosition(event.target, cursorPosition);

      break;
    }
    case 'ArrowLeft':
      cursorPosition = correctCursorPositionAfterLeftShift(cursorPosition);

      if (cursorPosition < minAvailableCursorPosition) {
        cursorPosition = minAvailableCursorPosition;
      }

      setCursorPosition(event.target, cursorPosition);

      break;
    default:
      break;
  }
});

phoneInput.addEventListener('input', e => {
  // noinspection JSUnresolvedVariable
  const cursorPosition = event.target.selectionStart;

  // noinspection JSUnresolvedVariable
  switch (e.inputType) {
    case 'insertText':
      if (/^\d$/.test(e.data)) {
        // noinspection JSUnresolvedVariable
        previousPhone = setCharAt(previousPhone, cursorPosition - 1, e.data);
        setInputValue(event.target, previousPhone, correctCursorPositionAfterRightShift(cursorPosition));
        phoneDigitsCount++;
      } else {
        setInputValue(event.target, previousPhone, cursorPosition - 1);
      }

      break;
    case 'deleteContentBackward':
      setInputValue(event.target, previousPhone, cursorPosition + 1);
      break;
    case 'insertFromPaste':
      setInputValue(event.target, previousPhone, cursorPosition);
      break;
    default:
      break;
  }
});

function setCursorPosition(element, position) {
  element.setSelectionRange(position, position);
}

function correctCursorPositionAfterLeftShift(cursorPositon) {
  switch (cursorPositon) {
    case 8:
      return 6;
    case 12:
      return 11;
    case 15:
      return 14;
    default:
      return cursorPositon;
  }
}

function getMaxAvailibleCursorPosition() {
  if (0 <= phoneDigitsCount && phoneDigitsCount <= 2) {
    return '+7('.length + 1 + phoneDigitsCount;
  } else if (3 <= phoneDigitsCount && phoneDigitsCount <= 5) {
    return '+7('.length + 1 + phoneDigitsCount + ') '.length;
  } else if (6 <= phoneDigitsCount && phoneDigitsCount <= 7) {
    return '+7('.length + 1 + phoneDigitsCount + ') '.length + '-'.length;
  }

  return '+7('.length + 1 + phoneDigitsCount + ') '.length + '-'.length + '-'.length;
}

function correctCursorPositionAfterMouseClick(cursorPosition) {
  // noinspection RedundantIfStatementJS
  if (cursorPosition < minAvailableCursorPosition) {
    return minAvailableCursorPosition;
  }

  if (cursorPosition > getMaxAvailibleCursorPosition()) {
    return getMaxAvailibleCursorPosition();
  }

  if (cursorPosition >= '+7 (___'.length && cursorPosition < '+7 (___) '.length) {
    return '+7 (___) '.length;
  }

  if (cursorPosition === '+7 (___) ___'.length) {
    return cursorPosition + 1;
  }

  if (cursorPosition === '+7 (___) ___-__'.length) {
    return cursorPosition + 1;
  }

  return cursorPosition;
}

function correctCursorPositionAfterRightShift(cursorPositon) {
  switch (cursorPositon) {
    case 7:
      return 9;
    case 12:
      return 13;
    case 15:
      return 16;
    default:
      return cursorPositon;
  }
}

function setInputValue(input, value, cursorPosition) {
  input.value = value;
  setCursorPosition(input, cursorPosition);
}

function setCharAt(str, index, chr) {
  if (index > str.length - 1) {
    return str;
  }
  return str.substr(0, index) + chr + str.substr(index + 1);
}
