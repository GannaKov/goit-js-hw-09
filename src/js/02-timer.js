import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysCouner: document.querySelector('span[data-days]'),
  hoursCouner: document.querySelector('span[data-hours]'),
  minutesCouner: document.querySelector('span[data-minutes]'),
  secondsCouner: document.querySelector('span[data-seconds]'),
};
let timerId = null;
let isActiveTimer = false;
const INTERVAL = 1000;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      refs.startBtn.setAttribute('disabled', '');
      //   window.alert('Please choose a date in the future');
    } else {
      if (refs.startBtn.hasAttribute('disabled')) {
        refs.startBtn.removeAttribute('disabled');
      }
    }
  },
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= Date.now()) {
      refs.startBtn.setAttribute('disabled', '');
      window.alert('Please choose a date in the future');
    } //else {
    //   if (refs.startBtn.hasAttribute('disabled')) {
    //     refs.startBtn.removeAttribute('disabled');
    //   }
    // }
  },
};

const fp = flatpickr(refs.inputEl, options); // flatpickr
// if (refs.startBtn.hasAttribute('disabled')) {
//   refs.startBtn.removeAttribute('disabled');
// }
refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  if (isActiveTimer) {
    return;
  }
  isActiveTimer = true;
  //   convertMs(ms);
  console.log('zapusk');

  timerId = setInterval(() => {
    const currentTime = Date.now();
    const ms = fp.selectedDates[0] - currentTime;

    console.log(ms);
    if (ms >= 0) {
      let { days, hours, minutes, seconds } = convertMs(ms);
      console.log('f', fp.selectedDates[0]);
      console.log('now', currentTime);
      updateTimerFace({ days, hours, minutes, seconds });
    } else {
      console.log('Vse');
      stopTimer(timerId);
      window.alert('Game is over');
    }
  }, INTERVAL);
}
function stopTimer(timerId) {
  clearInterval(timerId);
  isActiveTimer = false;
}
function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.daysCouner.textContent = days;

  refs.hoursCouner.textContent = hours;
  refs.minutesCouner.textContent = minutes;
  refs.secondsCouner.textContent = seconds;
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
function pad(value) {
  return String(value).padStart(2, '0');
}
