import { renderMessage } from './fetch-messages.js';

export const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export const isEscapeKey = (evt) => evt.key === 'Escape';

export const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export const createErrorElement = (message) => {
  const div = document.createElement('div');
  div.classList.add('error-message');
  div.textContent = message;
  renderMessage(div);
};

export const removeErrorElement = () => {
  const errorMessage = document.querySelector('.error-message');
  errorMessage.remove();
};
