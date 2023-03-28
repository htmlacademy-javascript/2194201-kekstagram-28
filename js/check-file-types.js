import { createErrorElement, removeErrorElement, debounce } from './utils.js';
import { showEditPhotoElement } from './form.js';

const FILE_TYPES = ['gif', 'png', 'jpeg', 'jpg'];
const FILE_TYPES_ERROR_MESSAGE = 'Допустимы только файлы изображений: gif, png, jpeg, jpg';
const FILE_TYPES_ERROR_TIMER = 5000;

const uploadPhotoInput = document.querySelector('.img-upload__input');
const imageElement = document.querySelector('.img-upload__preview img');

const removeErrorElementTimeout = debounce(() => removeErrorElement(), FILE_TYPES_ERROR_TIMER);

const checkFileTypes = (fileName) => FILE_TYPES.some((type) => fileName.endsWith(type));

const insertPhotoInImageElement = () => {
  const file = uploadPhotoInput.files[0];
  const fileName = file.name.toLowerCase();

  if (checkFileTypes(fileName)) {
    showEditPhotoElement();

    imageElement.src = URL.createObjectURL(file);
  } else {
    createErrorElement(FILE_TYPES_ERROR_MESSAGE);
    removeErrorElementTimeout();

    uploadPhotoInput.value = '';
  }
};

export { insertPhotoInImageElement };
