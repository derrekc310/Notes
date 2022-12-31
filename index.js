function changeText() {
  if (this.style.textDecoration == 'none') {
    this.style.textDecoration = 'line-through';
  } else {
    this.style.textDecoration = 'none';
  }
}

document
  .querySelectorAll('li.bullet')
  .forEach((el) => el.addEventListener('click', changeText));
