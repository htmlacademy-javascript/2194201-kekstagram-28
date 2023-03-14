import { isEscapeKey } from './utils.js';
import { hashTagField, descriptionField } from './form-validation.js';

const editPhotoContainer = document.querySelector('.img-upload__overlay');
const uploadPhotoInput = document.querySelector('.img-upload__input');
const editPhotoContainerCloseButton = document.querySelector('.img-upload__cancel');

const openEditPhotoContainer = () => {
  editPhotoContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  editPhotoContainerCloseButton.addEventListener('click', onEditPhotoCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeEditPhotoForm = () => {
  uploadPhotoInput.value = '';

  editPhotoContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  editPhotoContainerCloseButton.removeEventListener('click', onEditPhotoCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onEditPhotoCloseButtonClick(evt) {
  evt.preventDefault();
  closeEditPhotoForm();
}

function onUploadPhotoChange(evt) {
  evt.preventDefault();
  openEditPhotoContainer();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !hashTagField.matches(':focus') && !descriptionField.matches(':focus')) {
    evt.preventDefault();
    closeEditPhotoForm();
  }
}

uploadPhotoInput.addEventListener('change', onUploadPhotoChange);
