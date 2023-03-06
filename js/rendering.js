import { createPhotos } from './data.js';

export const getPhoto = () => {
  const CONTAINER_PHOTOS = document.querySelector('.pictures');
  const TEMPLATE_PHOTO = document.querySelector('#picture').content.querySelector('.picture');

  const PHOTOS = createPhotos();

  PHOTOS.forEach((photo) => {
    const TEMPLATE_CLONE = TEMPLATE_PHOTO.cloneNode(true);

    TEMPLATE_CLONE.querySelector('.picture__img').src = photo.url;
    TEMPLATE_CLONE.querySelector('.picture__img').alt = photo.description;
    TEMPLATE_CLONE.querySelector('.picture__likes').textContent = photo.likes;
    TEMPLATE_CLONE.querySelector('.picture__comments').textContent = photo.comments.length;

    CONTAINER_PHOTOS.append(TEMPLATE_CLONE);
  });
};
