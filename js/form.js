import { isEscapeKey } from './utils.js';
import { validate } from './validation.js';
import { deInitFilterPhotoActions, resetPhotoStyles } from './filters.js';
import { sendData } from './api.js';
import { createErrorMessage, createSuccessMessage } from './messages.js';
import { insertPhotoInImageElement } from './check-file-types.js';

const SubmitButtonText = {
  DEFAULT: 'Опубликовать',
  SENDING: 'Загружаю...'
};

const editPhotoElement = document.querySelector('.img-upload__overlay');
const uploadPhotoInput = document.querySelector('.img-upload__input');
const editPhotoCloseButton = document.querySelector('.img-upload__cancel');
const editPhotoForm = document.querySelector('.img-upload__form');
const hashTagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const showEditPhotoElement = () => {
  editPhotoElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  editPhotoCloseButton.addEventListener('click', onEditPhotoCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const hiddenEditPhotoElement = () => {
  uploadPhotoInput.value = '';

  editPhotoElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  editPhotoCloseButton.removeEventListener('click', onEditPhotoCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.DEFAULT;
};

const hiddenEditPhoto = () => {
  hiddenEditPhotoElement();
  deInitFilterPhotoActions();
  resetPhotoStyles();
};

function onEditPhotoCloseButtonClick(evt) {
  evt.preventDefault();
  hiddenEditPhoto();
}

function onUploadPhotoChange(evt) {
  evt.preventDefault();
  insertPhotoInImageElement();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !hashTagInput.matches(':focus') && !descriptionInput.matches(':focus') && !document.querySelector('.error')) {
    evt.preventDefault();
    hiddenEditPhoto();
  }
}

function onEditPhotoFormSubmit(evt) {
  evt.preventDefault();
  if (validate()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(createSuccessMessage)
      .catch(createErrorMessage)
      .finally(unblockSubmitButton);
  }
}

const initUploadPhotoActions = () => {
  uploadPhotoInput.addEventListener('change', onUploadPhotoChange);
  editPhotoForm.addEventListener('submit', onEditPhotoFormSubmit);
};

export { initUploadPhotoActions, showEditPhotoElement, hiddenEditPhoto };
