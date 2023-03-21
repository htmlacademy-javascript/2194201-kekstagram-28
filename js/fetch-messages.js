import { isEscapeKey } from './utils.js';

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const removeErrorMessage = () => {
  document.removeEventListener('keydown', onErrorMessageSubmitKeydown);
  document.querySelector('.error').removeEventListener('click', onErrorSubmitMessageClick);

  document.querySelector('.error').remove();
};

const removeSuccessMessage = () => {
  document.removeEventListener('keydown', onSuccessMessageSubmitKeydown);
  document.querySelector('.success').removeEventListener('click', onSuccessSubmitMessageClick);

  document.querySelector('.success').remove();
};

function onErrorMessageSubmitKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeErrorMessage();
  }
}

function onSuccessMessageSubmitKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeSuccessMessage();
  }
}

function onErrorSubmitMessageClick(evt) {
  evt.preventDefault();
  if (evt.target.matches('.error') || evt.target.closest('.error__button')) {
    removeErrorMessage();
  }
}

function onSuccessSubmitMessageClick(evt) {
  evt.preventDefault();
  if (evt.target.matches('.success') || evt.target.closest('.success__button')) {
    removeSuccessMessage();
  }
}

const renderMessage = (element) => document.body.append(element);

export const createErrorLoadMessage = (message) => {
  const div = document.createElement('div');
  div.classList.add('error-message');
  div.textContent = message;
  renderMessage(div);
};

export const createErrorSubmitMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  renderMessage(errorMessage);

  document.addEventListener('keydown', onErrorMessageSubmitKeydown);
  document.querySelector('.error').addEventListener('click', onErrorSubmitMessageClick);
};

export const createSuccessSubmitMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  renderMessage(successMessage);

  document.addEventListener('keydown', onSuccessMessageSubmitKeydown);
  document.querySelector('.success').addEventListener('click', onSuccessSubmitMessageClick);
};
