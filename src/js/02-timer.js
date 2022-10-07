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

    if (selectedDates[0] <= new Date()) {
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
  const ms = fp.selectedDates[0] - new Date();
  console.log(ms);
  convertMs(ms);
  //   console.dir(convertMs(ms).days);
  refs.daysCouner.textContent = convertMs(ms).days;
  refs.hoursCouner.textContent = convertMs(ms).hours;
  refs.minutesCouner.textContent = convertMs(ms).minutes;
  refs.secondsCouner.textContent = convertMs(ms).seconds;
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
