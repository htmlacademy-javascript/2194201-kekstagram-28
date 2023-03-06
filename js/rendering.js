import { createPhotos } from './data.js';

const photosContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const image = photoTemplate.querySelector('.picture__img');
const like = photoTemplate.querySelector('.picture__likes');
const comments = photoTemplate.querySelector('.picture__comments');

const photoItemFragment = document.createDocumentFragment();

export const createItemFragment = () => {
  const pictures = createPhotos();

  pictures.forEach((photo, index) => {
    const copyElement = photoTemplate.cloneNode(true);
    image.src = photo.url;
    image.alt = photo.description;
    photoItemFragment.append(copyElement);
  });
};

console.log(photoItemFragment);
