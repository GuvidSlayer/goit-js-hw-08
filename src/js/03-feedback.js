import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', event => {
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');
  const FFS_KEY = 'feedback-form-state';

  const backState = localStorage.getItem(FFS_KEY);
  if (backState) {
    const { email, message } = JSON.parse(backState);
    emailInput.value = email;
    messageInput.value = message;
  }

  const saveState = throttle(() => {
    const state = {
      email: emailInput.value,
      message: messageInput.value,
    };
    localStorage.setItem(FFS_KEY, JSON.stringify(state));
  }, 500);

  form.addEventListener('input', saveState);

  form.addEventListener('submit', event => {
    event.preventDefault();

    if (emailInput.value === '' || messageInput.value === '') {
      return alert('Please fill in all the fields!');
    }

    const state = {
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
    };
    console.log(state);
    emailInput.value = '';
    messageInput.value = '';
    localStorage.removeItem(FFS_KEY);
  });
});
