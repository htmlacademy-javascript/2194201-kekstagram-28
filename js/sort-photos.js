import { getRandomInteger } from './utils.js';
import { renderPhotos } from './render-photos.js';

const MAX_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;
const sortPhotosSection = document.querySelector('.img-filters');
const sortButtons = document.querySelectorAll('.img-filters__button');

let timeoutId;

const removePhotos = () => {
  const photosElements = document.querySelectorAll('.picture');
  photosElements.forEach((element) => element.remove());
};

const sortingRandom = (photos) => {
  const photosTemp = Array.from(photos);
  const photosRandom = [];

  for (let i = 0; i < MAX_RANDOM_PHOTOS; i++) {
    photosRandom.push(photosTemp.splice(getRandomInteger(0, photosTemp.length - 1), 1)[0]);
  }

  return photosRandom;
};

const chooseActiveButton = (sortType) => {
  sortButtons.forEach((button) => {
    if (button.getAttribute('id') !== sortType) {
      button.classList.remove('img-filters__button--active');
    } else {
      button.classList.add('img-filters__button--active');
    }
  });
};

const updatePhotos = (sortType, photos) => {
  removePhotos();

  switch (sortType) {
    case 'filter-default':
      renderPhotos(photos);
      break;
    case 'filter-random':
      renderPhotos(sortingRandom(photos));
      break;
    case 'filter-discussed':
      break;
  }
};

function onSortButtonClick(sortType, photos) {
  chooseActiveButton(sortType);

  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => updatePhotos(sortType, photos), RERENDER_DELAY);
}

export const initSortPhotosActions = (photos) => {
  sortPhotosSection.classList.remove('img-filters--inactive');

  sortButtons.forEach((button) => button.addEventListener('click', (evt) => {
    evt.preventDefault();
    onSortButtonClick(button.getAttribute('id'), photos);
  }));
};
