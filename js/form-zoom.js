const ZOOM_STEP = 25;
const PERCENT_DIVIDER = 100;
const MIN_ZOOM = '25%';
const MAX_ZOOM = '100%';

const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomInput = document.querySelector('.scale__control--value');
const imageElement = document.querySelector('.img-upload__preview img');

const changeZoomPhoto = (value) => {
  imageElement.style.transform = `scale(${+value.replace('%', '') / PERCENT_DIVIDER})`;
};

const onZoomOutButtonClick = (evt) => {
  evt.preventDefault();

  if (zoomInput.value !== MIN_ZOOM) {
    zoomInput.value = `${+zoomInput.value.replace('%', '') - ZOOM_STEP}%`;
    changeZoomPhoto(zoomInput.value);
  }
};

const onZoomInButtonClick = (evt) => {
  evt.preventDefault();

  if (zoomInput.value !== MAX_ZOOM) {
    zoomInput.value = `${+zoomInput.value.replace('%', '') + ZOOM_STEP}%`;
    changeZoomPhoto(zoomInput.value);
  }
};

const activateZoom = () => {
  zoomOutButton.addEventListener('click', onZoomOutButtonClick);
  zoomInButton.addEventListener('click', onZoomInButtonClick);
};

export { activateZoom };
