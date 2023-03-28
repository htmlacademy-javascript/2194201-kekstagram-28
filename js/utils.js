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

export const renderElement = (element) => document.body.append(element);

export const createErrorElement = (message) => {
  const div = document.createElement('div');
  div.classList.add('error-message');
  div.textContent = message;
  renderElement(div);
};

export const removeErrorElement = () => {
  const errorMessage = document.querySelector('.error-message');
  errorMessage.remove();
};
