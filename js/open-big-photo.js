import { isEscapeKey } from './utils.js';

const bigPhotoContainer = document.querySelector('.big-picture');
const bigPhotoCloseButton = document.querySelector('.big-picture__cancel');
const loadCommentsButton = document.querySelector('.social__comments-loader');
const commentsList = document.querySelector('.social__comments');
const commentsCurrent = document.querySelector('.comments-current');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const RENDER_COMMENTS = 5;
let countComments = 0;
let commentsTemp;

const fillCommentData = (comment) => {
  const commentClone = commentTemplate.cloneNode(true);
  commentClone.querySelector('.social__picture').src = comment.avatar;
  commentClone.querySelector('.social__picture').alt = comment.name;
  commentClone.querySelector('.social__text').textContent = comment.message;
  return commentClone;
};

const renderComments = (comments) => {
  let countLoadMore = 0;

  if (!commentsTemp) {
    commentsTemp = comments;
  }

  commentsTemp.forEach((comment, index) => {

    if (countLoadMore < RENDER_COMMENTS &&
      countComments < commentsTemp.length &&
      countComments <= index) {

      commentsList.append(fillCommentData(comment));
      countComments++;
      countLoadMore++;

      if (countComments === commentsTemp.length) {
        loadCommentsButton.classList.add('hidden');
      }

      console.log(countComments, countLoadMore);
    }

  });
  commentsCurrent.textContent = countComments;
};

const fillPhotoData = (photo) => {
  bigPhotoContainer.querySelector('img').src = photo.url;
  bigPhotoContainer.querySelector('.social__caption').textContent = photo.description;
  bigPhotoContainer.querySelector('.likes-count').textContent = photo.likes;
  bigPhotoContainer.querySelector('.comments-count').textContent = photo.comments.length;

  commentsList.innerHTML = '';
  renderComments(photo.comments);
};

const closeBigPhoto = () => {
  bigPhotoContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  loadCommentsButton.classList.remove('hidden');

  loadCommentsButton.removeEventListener('click', onLoadCommentsButtonClick);
  bigPhotoCloseButton.removeEventListener('click', onBigPhotoCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openBigPhoto = () => {
  countComments = 0;
  commentsTemp = '';

  bigPhotoContainer.classList.remove('hidden');
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
