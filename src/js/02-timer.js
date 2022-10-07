import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
// import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
// import { Loading } from 'notiflix/build/notiflix-loading-aio';
// import { Block } from 'notiflix/build/notiflix-block-aio';
// import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.5.min.css';

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
refs.startBtn.classList.add('timer-btn');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      refs.startBtn.setAttribute('disabled', '');
    } else {
      if (refs.startBtn.hasAttribute('disabled')) {
        refs.startBtn.removeAttribute('disabled');
      }
    }
  },
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      refs.startBtn.setAttribute('disabled', '');

      Report.failure(
        'Attention!',
        'Please choose a date in the future',
        'Okay',
        {
          width: '300px',
          titleFontSize: '22px',
          messageFontSize: '16px',
        }
      );
    }
  },
};

const fp = flatpickr(refs.inputEl, options);
refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  if (isActiveTimer) {
    return;
  }
  isActiveTimer = true;

  timerId = setInterval(() => {
    const currentTime = Date.now();
    const ms = fp.selectedDates[0] - currentTime;

    if (ms >= 0) {
      const getTime = convertMs(ms);

      updateTimerFace(getTime);
    } else {
      stopTimer(timerId);
      // window.alert('Game is over');
      Report.info('Too late...', 'Time is over', 'Okay', {
        width: '300px',
        titleFontSize: '22px',
        messageFontSize: '16px',
      });
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
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
