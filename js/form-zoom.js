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

const zoomOutValue = (value) => {
  zoomInput.value = `${+value.replace('%', '') - ZOOM_STEP}%`;
};

const zoomInValue = (value) => {
  zoomInput.value = `${+value.replace('%', '') + ZOOM_STEP}%`;
};

const onZoomOutButtonClick = (evt) => {
  evt.preventDefault();

  if (zoomInput.value !== MIN_ZOOM) {
    zoomOutValue(zoomInput.value);
    changeZoomPhoto(zoomInput.value);
  }
};

const onZoomInButtonClick = (evt) => {
  evt.preventDefault();

  if (zoomInput.value !== MAX_ZOOM) {
    zoomInValue(zoomInput.value);
    changeZoomPhoto(zoomInput.value);
  }
};

const activateScale = () => {
  zoomOutButton.addEventListener('click', onZoomOutButtonClick);
  zoomInButton.addEventListener('click', onZoomInButtonClick);
};

export { activateScale };
