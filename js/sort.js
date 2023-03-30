import { renderPhotos } from './render-photos.js';
import { debounce } from './utils.js';

const MAX_RANDOM_PHOTOS = 10;
const RERENDER_DELAY = 500;

const sortPhotosElement = document.querySelector('.img-filters');
const sortButtons = document.querySelector('.img-filters__form');

const removePhotos = (elements) => elements.forEach((element) => element.remove());

const sortRandom = (data) => data.sort(() => Math.random() - 0.5).slice(0, MAX_RANDOM_PHOTOS);

const sortDiscussed = (data) => data.sort((a, b) => b.comments.length - a.comments.length);

const chooseActiveButton = (buttonActive, button) => {
  buttonActive.classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');
};

const updatePhotos = (id, data) => {
  let photoSort = data.slice();

  if (id === 'filter-random') {
    photoSort = sortRandom(photoSort);
  }
  if (id === 'filter-discussed') {
    photoSort = sortDiscussed(photoSort);
  }

  removePhotos(document.querySelectorAll('.picture'));
  renderPhotos(photoSort);
};

const onSortButtonClick = (button) => {
  chooseActiveButton(sortButtons.querySelector('.img-filters__button--active'), button);
};

const rerenderTimeout = debounce((id, data) => updatePhotos(id, data), RERENDER_DELAY);

const initSortPhotosActions = (photos) => {
  sortPhotosElement.classList.remove('img-filters--inactive');

  sortButtons.addEventListener('click', (evt) => {
    if (evt.target.closest('.img-filters__button') && !evt.target.closest('.img-filters__button--active')) {
      onSortButtonClick(evt.target);
      rerenderTimeout(evt.target.id, photos);
    }
  });
};

export { initSortPhotosActions };
