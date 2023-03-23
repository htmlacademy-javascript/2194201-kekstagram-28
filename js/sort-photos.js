import { getRandomInteger, debounce } from './utils.js';
import { renderPhotos } from './render-photos.js';

const MAX_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;
const sortPhotosSection = document.querySelector('.img-filters');
const sortButtons = document.querySelectorAll('.img-filters__button');

const removePhotos = () => {
  const photosElements = document.querySelectorAll('.picture');
  photosElements.forEach((element) => element.remove());
};

const sortingRandom = (photos) => {
  const photosTemp = Array.from(photos);
  const photosClone = [];

  for (let i = 0; i < MAX_RANDOM_PHOTOS; i++) {
    photosClone.push(photosTemp.splice(getRandomInteger(0, photosTemp.length - 1), 1)[0]);
  }

  return photosClone;
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

function onSortButtonClick(sortType, photos) {
  removePhotos();
  chooseActiveButton(sortType);

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
}

export const initSortPhotosActions = (photos) => {
  sortPhotosSection.classList.remove('img-filters--inactive');

  sortButtons.forEach((button) => button.addEventListener('click', (evt) => {
    evt.preventDefault();

    let timeoutId;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => onSortButtonClick(button.getAttribute('id'), photos), RERENDER_DELAY);
  }));
};
