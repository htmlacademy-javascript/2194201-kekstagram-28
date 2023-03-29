const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const renderMessage = (element) => document.body.append(element);

const createErrorMessage = (message) => {
  const div = document.createElement('div');
  div.classList.add('error-message');
  div.textContent = message;
  renderMessage(div);
};

const removeErrorMessage = () => document.querySelector('.error-message').remove();

export { isEscapeKey, debounce, renderMessage, createErrorMessage, removeErrorMessage };
