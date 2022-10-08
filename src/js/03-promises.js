import { Notify } from 'notiflix';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}

const refs = { form: document.querySelector('.form') };
refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  // const { delay, step, amount } = event.currentTarget.elements;
  const delay = Number(event.currentTarget.elements.delay.value);
  const step = Number(event.currentTarget.elements.step.value);
  const amount = Number(event.currentTarget.elements.amount.value);
  for (let i = 0; i < amount; i++) {
    let interval = delay + i * step;
    createPromise(i + 1, interval)
      .then(onSuccess)
      .catch(onError);
  }
}
function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
    timeout: 4000,
  });
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
    timeout: 4000,
  });
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
}
