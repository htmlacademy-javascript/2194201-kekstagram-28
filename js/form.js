import { isEscapeKey } from './utils.js';
import { addValidator, validatePristine, resetPristine } from './form-validation.js';
import { initFiltersActions, createSlider, resetPhotoStyles, resetFilter } from './filters.js';
import { sendData } from './api.js';
import { createErrorMessage, createSuccessMessage } from './messages.js';
import { insertPhotoInImageElement } from './check-file-types.js';
import { activateScale } from './form-scale.js';

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
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const onEditPhotoFormSubmit = (evt) => {
  evt.preventDefault();

  if (validatePristine()) {
    blockSubmitButton();

    sendData(new FormData(evt.target))
      .then(createSuccessMessage)
      .catch(createErrorMessage)
      .finally(unblockSubmitButton);
  }
};

const onUploadPhotoChange = () => insertPhotoInImageElement();

const onEditPhotoCloseButtonClick = () => hiddenEditPhotoElement();

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

  activateScale();
  addValidator();
  createSlider();
  initFiltersActions();
};

export { initFormActions, showEditPhotoElement, hiddenEditPhotoElement };
