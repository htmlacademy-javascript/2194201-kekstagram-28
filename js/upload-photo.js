import { isEscapeKey } from './utils.js';
import { validate } from './form-validation.js';
import { initFilterPhotoActions, deInitFilterPhotoActions, resetPhotoStyles } from './filters-photo.js';

const editPhotoContainer = document.querySelector('.img-upload__overlay');
const uploadPhotoInput = document.querySelector('.img-upload__input');
const editPhotoContainerCloseButton = document.querySelector('.img-upload__cancel');
const editPhotoForm = document.querySelector('.img-upload__form');
const hashTagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');

const openEditPhotoContainer = () => {
  editPhotoContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  editPhotoContainerCloseButton.addEventListener('click', onEditPhotoCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeEditPhotoContainer = () => {
  uploadPhotoInput.value = '';

  editPhotoContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  editPhotoContainerCloseButton.removeEventListener('click', onEditPhotoCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
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
  if (isEscapeKey(evt) && !hashTagField.matches(':focus') && !descriptionField.matches(':focus')) {
    evt.preventDefault();
    closeEditPhotoContainer();
    deInitFilterPhotoActions();
    resetPhotoStyles();
  }
}

function onEditPhotoFormSubmit(evt) {
  if (validate()) {
    evt.preventDefault();
  }
}

editPhotoForm.addEventListener('submit', onEditPhotoFormSubmit);

export const initUploadPhotoActions = () => uploadPhotoInput.addEventListener('change', onUploadPhotoChange);
