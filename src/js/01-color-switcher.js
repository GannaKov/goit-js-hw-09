function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const refs = {
  bodyEl: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);
const DELAYINTERVAL = 1000;
let timerId = null;
function onStartBtnClick() {
  refs.startBtn.setAttribute('disabled', '');
  timerId = setInterval(() => {
    const colorBody = getRandomHexColor();
    refs.bodyEl.style.backgroundColor = colorBody;
  }, DELAYINTERVAL);
}
function onStopBtnClick() {
  refs.startBtn.removeAttribute('disabled');
  clearInterval(timerId);
}
