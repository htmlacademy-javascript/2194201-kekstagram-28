const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const renderMessage = (element) => document.body.append(element);

const createErrorElement = (message) => {
  const div = document.createElement('div');
  div.classList.add('error-message');
  div.textContent = message;
  renderMessage(div);
};

const removeErrorElement = () => {
  const errorMessage = document.querySelector('.error-message');
  errorMessage.remove();
};

export { isEscapeKey, debounce, renderMessage, createErrorElement, removeErrorElement };
