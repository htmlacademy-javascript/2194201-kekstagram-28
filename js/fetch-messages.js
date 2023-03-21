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

const showErrorLoadMessage = (element) => document.body.append(element);

export const createErrorLoadMessage = (message) => {
  const div = document.createElement('div');
  div.classList.add('error-message');
  div.textContent = message;
  showErrorLoadMessage(div);
};

export const showErrorMessage = () => {
  const errorClone = errorTemplate.cloneNode(true);
  document.body.append(errorClone);

  document.addEventListener('keydown', onErrorMessageKeydown);
  document.querySelector('.error').addEventListener('click', onErrorMessageClick);
};

export const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  document.body.append(successMessage);

  document.addEventListener('keydown', onSuccessMessageKeydown);
  document.querySelector('.success').addEventListener('click', onSuccessMessageClick);
};
