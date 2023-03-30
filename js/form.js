import { isEscapeKey } from './utils.js';
import { addValidator, validatePristine, resetPristine } from './form-validation.js';
import { activateFilters, resetPhotoStyles, resetFilter } from './filters.js';
import { sendData } from './api.js';
import { createErrorMessage, createSuccessMessage } from './messages.js';
import { checkFileTypes } from './check-file-types.js';
import { activateZoom } from './form-zoom.js';

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

  document.addEventListener('keydown', onDocumentKeydown);
};

const hiddenEditPhotoElement = () => {
  editPhotoForm.reset();
  resetFilter();
  resetPhotoStyles();
  resetPristine();

  editPhotoElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

const blockSubmitButton = () => {
  submitButton.disabled = !submitButton.disabled;
};

const onEditPhotoFormSubmit = (evt) => {
  evt.preventDefault();

  if (validatePristine()) {
    blockSubmitButton();

    sendData(new FormData(evt.target))
      .then(createSuccessMessage)
      .catch(createErrorMessage)
      .finally(blockSubmitButton);
  }
};

const onUploadPhotoChange = () => checkFileTypes();

const onEditPhotoCloseButtonClick = (evt) => {
  evt.preventDefault();
  hiddenEditPhotoElement();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !hashTagInput.matches(':focus') && !descriptionInput.matches(':focus') && !document.querySelector('.error')) {
    evt.preventDefault();
    hiddenEditPhotoElement();
  }
}

const initFormActions = () => {
  uploadPhotoInput.addEventListener('change', onUploadPhotoChange);
  editPhotoForm.addEventListener('submit', onEditPhotoFormSubmit);
  editPhotoCloseButton.addEventListener('click', onEditPhotoCloseButtonClick);

  activateZoom();
  activateFilters();
  addValidator();
};

export { initFormActions, showEditPhotoElement, hiddenEditPhotoElement };
