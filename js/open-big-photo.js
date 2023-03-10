import { isEscapeKey } from './utils.js';

const bigPhotoContainer = document.querySelector('.big-picture');
const bigPhotoCloseButton = document.querySelector('.big-picture__cancel');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const fillCommentsData = (comment) => {
  const commentClone = commentTemplate.cloneNode(true);
  commentClone.querySelector('.social__picture').src = comment.avatar;
  commentClone.querySelector('.social__picture').alt = comment.name;
  commentClone.querySelector('.social__text').textContent = comment.message;
  return commentClone;
};

export const fillPhotoData = (data) => {
  bigPhotoContainer.querySelector('img').src = data.url;
  bigPhotoContainer.querySelector('.social__caption').textContent = data.description;
  bigPhotoContainer.querySelector('.likes-count').textContent = data.likes;
  bigPhotoContainer.querySelector('.comments-count').textContent = data.comments.length;

  commentsList.innerHTML = '';
  data.comments.forEach((comment) => commentsList.append(fillCommentsData(comment)));
};

const closeBigPhoto = () => {
  bigPhotoContainer.classList.add('hidden');
  bigPhotoContainer.querySelector('.social__comment-count').classList.remove('hidden');
  bigPhotoContainer.querySelector('.comments-loader').classList.remove('hidden');
  document.body.classList.remove('modal-open');

  bigPhotoCloseButton.removeEventListener('click', closeBigPhoto);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openBigPhoto = () => {
  bigPhotoContainer.classList.remove('hidden');
  bigPhotoContainer.querySelector('.social__comment-count').classList.add('hidden');
  bigPhotoContainer.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');

  bigPhotoCloseButton.addEventListener('click', closeBigPhoto);
  document.addEventListener('keydown', onDocumentKeydown);
};

export const onPhotoClick = (evt) => {
  evt.preventDefault();
  openBigPhoto();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
}
