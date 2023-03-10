import { createPhotos } from './data.js';
import { onPhotoClick, fillPhotoData } from './show-full-photo.js';

export const photoContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const photoData = createPhotos();

const createPhoto = (photo) => {
  const photoClone = photoTemplate.cloneNode(true);
  photoClone.querySelector('.picture__img').src = photo.url;
  photoClone.querySelector('.picture__img').alt = photo.description;
  photoClone.querySelector('.picture__likes').textContent = photo.likes;
  photoClone.querySelector('.picture__comments').textContent = photo.comments.length;

  photoClone.addEventListener('click', (evt) => {
    onPhotoClick(evt);
    fillPhotoData(photo);
  });

  return photoClone;
};

export const renderPhotos = () => {
  photoData.forEach((item) => photoContainer.append(createPhoto(item)));
};

