import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
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
