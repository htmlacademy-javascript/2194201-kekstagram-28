import { isEscapeKey } from './utils.js';

const editPhotoForm = document.querySelector('.img-upload__overlay');
const uploadPhotoInput = document.querySelector('.img-upload__input');
const editPhotoCloseButton = document.querySelector('.img-upload__cancel');
// const imageForm = document.querySelector('.img-upload__preview>img');

const openEditPhotoForm = () => {
  editPhotoForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  editPhotoCloseButton.addEventListener('click', onEditPhotoCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeEditPhotoForm = () => {
  uploadPhotoInput.value = '';

  editPhotoForm.classList.add('hidden');
  document.body.classList.remove('modal-open');

  editPhotoCloseButton.removeEventListener('click', onEditPhotoCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onEditPhotoCloseButtonClick(evt) {
  evt.preventDefault();
  closeEditPhotoForm();
}

function onUploadPhotoChange(evt) {
  evt.preventDefault();
  openEditPhotoForm();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditPhotoForm();
  }
}

uploadPhotoInput.addEventListener('change', onUploadPhotoChange);
