function createPromise(position, delay) {
  console.log(position, delay);
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
    // .then(({ position, delay }) => {
    //   console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    // })
    // .catch(({ position, delay }) => {
    //   console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    // });
  }
}
function onSuccess({ position, delay }) {
  console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
function onError({ position, delay }) {
  console.log(`❌ Rejected promise ${position} in ${delay}ms`);
}
