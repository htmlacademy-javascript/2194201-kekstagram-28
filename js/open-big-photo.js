import { isEscapeKey } from './utils.js';

const RENDER_COMMENTS = 5;
let countComments = 0;
let commentsLength = 0;
let commentsTemp;

const bigPhotoElement = document.querySelector('.big-picture');
const bigPhotoCloseButton = document.querySelector('.big-picture__cancel');
const photoElement = document.querySelector('.big-picture__img>img');
const descriptionElement = document.querySelector('.social__caption');
const likesElement = document.querySelector('.likes-count');
const commentsCountElement = document.querySelector('.comments-count');
const loadCommentsButton = document.querySelector('.social__comments-loader');
const commentsListElement = document.querySelector('.social__comments');
const commentsCurrentElement = document.querySelector('.comments-current');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const fillCommentData = (comment) => {
  const commentClone = commentTemplate.cloneNode(true);
  commentClone.querySelector('.social__picture').src = comment.avatar;
  commentClone.querySelector('.social__picture').alt = comment.name;
  commentClone.querySelector('.social__text').textContent = comment.message;
  return commentClone;
};

const fillCommentsCurrent = (counter) => {
  commentsCurrentElement.textContent = counter;
};

const removeLoadCommentsButton = () => loadCommentsButton.classList.add('hidden');

const renderComments = (comments) => {

  if (!commentsTemp) {
    commentsLength = comments.length;
    commentsTemp = [...comments];
  }

  const renderingComments = commentsTemp.splice(0, RENDER_COMMENTS < commentsTemp.length ? RENDER_COMMENTS : commentsTemp.length);

  renderingComments.forEach((comment) => {
    commentsListElement.append(fillCommentData(comment));
    countComments++;
  });

  fillCommentsCurrent(countComments);

  if (countComments === commentsLength) {
    removeLoadCommentsButton();
  }
};

const fillPhotoData = (photo) => {
  photoElement.src = photo.url;
  descriptionElement.textContent = photo.description;
  likesElement.textContent = photo.likes;
  commentsCountElement.textContent = photo.comments.length;

  commentsListElement.innerHTML = '';
  renderComments(photo.comments);
};

const closeBigPhoto = () => {
  bigPhotoElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  loadCommentsButton.classList.remove('hidden');

  loadCommentsButton.removeEventListener('click', onLoadCommentsButtonClick);
  bigPhotoCloseButton.removeEventListener('click', onBigPhotoCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openBigPhoto = () => {
  countComments = 0;
  commentsTemp = '';

  bigPhotoElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  loadCommentsButton.addEventListener('click', onLoadCommentsButtonClick);
  bigPhotoCloseButton.addEventListener('click', onBigPhotoCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

function onLoadCommentsButtonClick(evt) {
  evt.preventDefault();
  renderComments();
}

function onBigPhotoCloseButtonClick(evt) {
  evt.preventDefault();
  closeBigPhoto();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
}

export const onPhotoClick = (photo) => {
  openBigPhoto();
  fillPhotoData(photo);
};
