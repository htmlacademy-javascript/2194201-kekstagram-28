import { isEscapeKey, renderElement } from './utils.js';
import { hiddenEditPhotoElement } from './form.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const createErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  renderElement(errorMessage);

  document.addEventListener('keydown', onErrorMessageKeydown);
  errorMessage.addEventListener('click', onErrorMessageClick);
};

const createSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  renderElement(successMessage);

  document.addEventListener('keydown', onSuccessMessageKeydown);
  successMessage.addEventListener('click', onSuccessMessageClick);

  hiddenEditPhotoElement();
};

const removeErrorMessage = () => {
  const errorMessage = document.querySelector('.error');

  document.removeEventListener('keydown', onErrorMessageKeydown);
  errorMessage.removeEventListener('click', onErrorMessageClick);

  errorMessage.remove();
};

const removeSuccessMessage = () => {
  const successMessage = document.querySelector('.success');

  document.removeEventListener('keydown', onSuccessMessageKeydown);
  successMessage.removeEventListener('click', onSuccessMessageClick);

  successMessage.remove();
};

function onErrorMessageKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeErrorMessage();
  }
}

function onSuccessMessageKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeSuccessMessage();
  }
}

function onErrorMessageClick(evt) {
  evt.preventDefault();
  if (evt.target.matches('.error') || evt.target.closest('.error__button')) {
    removeErrorMessage();
  }
}

function onSuccessMessageClick(evt) {
  evt.preventDefault();
  if (evt.target.matches('.success') || evt.target.closest('.success__button')) {
    removeSuccessMessage();
  }
}

export { createErrorMessage, createSuccessMessage };
