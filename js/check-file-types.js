import { createErrorElement, removeErrorElement, debounce } from './utils.js';
import { openEditPhotoContainer } from './upload-photo.js';
import { initFilterPhotoActions } from './filters-photo.js';

const uploadPhotoInput = document.querySelector('.img-upload__input');
const photoElement = document.querySelector('.img-upload__preview>img');

const FILE_TYPES = ['gif', 'png', 'jpeg', 'jpg'];
const FILE_TYPES_ERROR_MESSAGE = 'Допустимы только файлы изображений: gif, png, jpeg, jpg';
const FILE_TYPES_ERROR_TIMER = 5000;

const removeErrorElementTimeout = debounce(() => removeErrorElement(), FILE_TYPES_ERROR_TIMER);

const checkFileType = (fileName) => FILE_TYPES.some((item) => fileName.endsWith(item));

export const insertPhotoInContainer = () => {
  const file = uploadPhotoInput.files[0];
  const fileName = file.name.toLowerCase();

  if (checkFileType(fileName)) {
    openEditPhotoContainer();
    initFilterPhotoActions();

    photoElement.src = URL.createObjectURL(file);
  } else {
    createErrorElement(FILE_TYPES_ERROR_MESSAGE);
    removeErrorElementTimeout();

    uploadPhotoInput.value = '';
  }
};
