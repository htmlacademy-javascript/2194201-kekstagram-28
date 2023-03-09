import { photoCollection } from './render-photos.js';
import { isEscapeKey } from './utils.js';

const photoFullContainer = document.querySelector('.big-picture');
const closeModalButton = document.querySelector('#picture-cancel');

let list = 2;

const closeModal = () => {
  photoFullContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeModalButton.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openModal = (evt) => {
  evt.preventDefault();

  photoFullContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeModalButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

const fillPhotoData = (item) => {
  photoFullContainer.querySelector('img').src = item.url;
  photoFullContainer.querySelector('.social__caption').textContent = item.description;
  photoFullContainer.querySelector('.likes-count').textContent = item.likes;
  photoFullContainer.querySelector('.comments-count').textContent = item.comments.length;
};

export const addListeners = (item) => {
  photoCollection[list++].addEventListener('click', (evt) => {
    openModal(evt);
    fillPhotoData(item);
  });
};
