import { photoData, photoContainer } from './render-photos.js';
import { isEscapeKey } from './utils.js';

const photoFullContainer = document.querySelector('.big-picture');
const closeModalButton = document.querySelector('#picture-cancel');
// const photoCollection = photoContainer.children;
// const photoDescription = document.querySelector('.social__caption');
// const likesCount = document.querySelector('.likes-count');
// const commentsCount = document.querySelector('.comments-count');
// const commentsList = document.querySelector('.social__comments');

const closeModal = () => {
  photoFullContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  closeModalButton.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openModal = (evt) => {
  evt.preventDefault();

  if (evt.target.matches('.picture__img')) {
    photoFullContainer.classList.remove('hidden');
    document.body.classList.add('modal-open');

    closeModalButton.addEventListener('click', closeModal);
    document.addEventListener('keydown', onDocumentKeydown);
  }
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

photoContainer.addEventListener('click', openModal);
