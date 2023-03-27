import { isEscapeKey } from './utils.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const removeErrorMessage = () => {
  document.removeEventListener('keydown', onErrorMessageKeydown);
  document.querySelector('.error').removeEventListener('click', onErrorMessageClick);

  document.querySelector('.error').remove();
};

const removeSuccessMessage = () => {
  document.removeEventListener('keydown', onSuccessMessageKeydown);
  document.querySelector('.success').removeEventListener('click', onSuccessMessageClick);

  document.querySelector('.success').remove();
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

export const renderMessage = (element) => document.body.append(element);

export const createErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  renderMessage(errorMessage);

  document.addEventListener('keydown', onErrorMessageKeydown);
  document.querySelector('.error').addEventListener('click', onErrorMessageClick);
};

export const createSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  renderMessage(successMessage);

  document.addEventListener('keydown', onSuccessMessageKeydown);
  document.querySelector('.success').addEventListener('click', onSuccessMessageClick);
};
