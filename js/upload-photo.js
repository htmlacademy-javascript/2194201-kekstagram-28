import { isEscapeKey } from './utils.js';
import { validate } from './form-validation.js';
import { initFilterPhotoActions, deInitFilterPhotoActions, resetPhotoStyles } from './filters-photo.js';
import { sendData } from './api.js';
import { createErrorSubmitMessage, createSuccessSubmitMessage } from './fetch-messages.js';

const editPhotoContainer = document.querySelector('.img-upload__overlay');
const uploadPhotoInput = document.querySelector('.img-upload__input');
const editPhotoContainerCloseButton = document.querySelector('.img-upload__cancel');
const editPhotoForm = document.querySelector('.img-upload__form');
const hashTagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const SubmitButtonText = {
  DEFAULT: 'Опубликовать',
  SENDING: 'Загружаю...'
};

const openEditPhotoContainer = () => {
  editPhotoContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  editPhotoContainerCloseButton.addEventListener('click', onEditPhotoCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

export const closeEditPhotoContainer = () => {
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
  openEditPhotoContainer();
  initFilterPhotoActions();
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
  createErrorSubmitMessage();
}

function onSuccess() {
  closeEditPhotoContainer();
  resetPhotoStyles();
  createSuccessSubmitMessage();
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

export const initUploadPhotoActions = () => uploadPhotoInput.addEventListener('change', onUploadPhotoChange);
