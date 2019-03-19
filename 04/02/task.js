function doubleClick(element, timeDistance, doubleClickHandler) {
  let clickCount = 0;
  let firstClickTime = null;

  element.addEventListener('click', () => {
    clickCount++;

    if (clickCount === 1) {
      firstClickTime = Date.now();
    } else {
      if (Date.now() - firstClickTime <= timeDistance) {
        doubleClickHandler();
      }

      clickCount = 0;
    }
  });
}

doubleClick(document.querySelector('button'), 300, () => {
  let node = document.createElement('li');
  let textNode = document.createTextNode('2xClick - ' + new Date());
  node.appendChild(textNode);
  document.querySelector('ol').appendChild(node);
});
