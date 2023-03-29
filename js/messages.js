import { isEscapeKey, renderMessage } from './utils.js';
import { hiddenEditPhotoElement } from './form.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

let errorMessageClone;
let successMessageClone;

const createErrorMessage = () => {
  errorMessageClone = errorTemplate.cloneNode(true);
  renderMessage(errorMessageClone);

  document.addEventListener('keydown', onErrorMessageKeydown);
  errorMessageClone.addEventListener('click', onErrorMessageClick);
};

const createSuccessMessage = () => {
  successMessageClone = successTemplate.cloneNode(true);
  renderMessage(successMessageClone);

  document.addEventListener('keydown', onSuccessMessageKeydown);
  successMessageClone.addEventListener('click', onSuccessMessageClick);

  hiddenEditPhotoElement();
};

const removeErrorMessage = () => {
  errorMessageClone.remove();
  document.removeEventListener('keydown', onErrorMessageKeydown);
};

const removeSuccessMessage = () => {
  successMessageClone.remove();
  document.removeEventListener('keydown', onSuccessMessageKeydown);
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
