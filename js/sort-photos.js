import { renderPhotos } from './render-photos.js';
import { debounce } from './utils.js';

const MAX_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;
const sortPhotosSection = document.querySelector('.img-filters');
const sortButtons = document.querySelectorAll('.img-filters__button');

const removePhotos = () => {
  const photosElements = document.querySelectorAll('.picture');
  photosElements.forEach((element) => element.remove());
};

const sortRandom = (photos) => photos
  .slice()
  .sort(() => Math.random() - 0.5)
  .slice(0, MAX_RANDOM_PHOTOS);

const compareComments = (itemA, itemB) => itemB.comments.length - itemA.comments.length;

const sortDiscussed = (photos) => photos.slice().sort(compareComments);

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
    case 'filter-random':
      renderPhotos(sortRandom(photos));
      break;
    case 'filter-discussed':
      renderPhotos(sortDiscussed(photos));
      break;
    default:
      renderPhotos(photos);
  }
};

function onSortButtonClick(sortType, callback) {
  chooseActiveButton(sortType);
  callback();
}

export const initSortPhotosActions = (photos) => {
  sortPhotosSection.classList.remove('img-filters--inactive');

  sortButtons.forEach((button) => {
    const sortType = button.getAttribute('id');
    const rerenderTimeout = debounce(() => updatePhotos(sortType, photos), RERENDER_DELAY);

    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      onSortButtonClick(sortType, rerenderTimeout);
    });
  });
};
