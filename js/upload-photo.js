import { isEscapeKey } from './utils.js';
import { validate } from './form-validation.js';
import { deInitFilterPhotoActions, resetPhotoStyles } from './filters-photo.js';
import { sendData } from './api.js';
import { createErrorMessage, createSuccessMessage } from './fetch-messages.js';
import { insertPhotoInContainer } from './check-file-types.js';

const SubmitButtonText = {
  DEFAULT: 'Опубликовать',
  SENDING: 'Загружаю...'
};

const editPhotoContainer = document.querySelector('.img-upload__overlay');
const uploadPhotoInput = document.querySelector('.img-upload__input');
const editPhotoContainerCloseButton = document.querySelector('.img-upload__cancel');
const editPhotoForm = document.querySelector('.img-upload__form');
const hashTagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const closeEditPhotoContainer = () => {
  uploadPhotoInput.value = '';

  editPhotoContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  editPhotoContainerCloseButton.removeEventListener('click', onEditPhotoCloseButtonClick);
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

function onEditPhotoCloseButtonClick(evt) {
  evt.preventDefault();
  closeEditPhotoContainer();
  deInitFilterPhotoActions();
  resetPhotoStyles();
}

function onUploadPhotoChange(evt) {
  evt.preventDefault();
  insertPhotoInContainer();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !hashTagField.matches(':focus') && !descriptionField.matches(':focus') && !document.querySelector('.error')) {
    evt.preventDefault();
    closeEditPhotoContainer();
    deInitFilterPhotoActions();
    resetPhotoStyles();
  }
}

function onError() {
  createErrorMessage();
}

function onSuccess() {
  closeEditPhotoContainer();
  resetPhotoStyles();
  createSuccessMessage();
}

function onEditPhotoFormSubmit(evt) {
  evt.preventDefault();
  if (validate()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(onSuccess)
      .catch(onError)
      .finally(unblockSubmitButton);
  }
}

editPhotoForm.addEventListener('submit', onEditPhotoFormSubmit);

export const openEditPhotoContainer = () => {
  editPhotoContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  editPhotoContainerCloseButton.addEventListener('click', onEditPhotoCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export const initUploadPhotoActions = () => uploadPhotoInput.addEventListener('change', onUploadPhotoChange);
