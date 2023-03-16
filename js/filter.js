const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomInput = document.querySelector('.scale__control--value');
const photo = document.querySelector('.img-upload__preview>img');

const MIN_ZOOM = 25;
const MAX_ZOOM = 100;

const changeZoomPhoto = () => {
  photo.style.transform = `scale(${parseInt(zoomInput.value, 10) / 100})`;
};

const zoomOutPhoto = () => {
  zoomInput.value = `${parseInt(zoomInput.value, 10) - 25}%`;
};

const zoomInPhoto = () => {
  zoomInput.value = `${parseInt(zoomInput.value, 10) + 25}%`;
};

function onZoomOutButtonClick(evt) {
  evt.preventDefault();

  if (parseInt(zoomInput.value, 10) > MIN_ZOOM) {
    zoomOutPhoto();
    changeZoomPhoto();
  }
}

function onZoomInButtonClick(evt) {
  evt.preventDefault();

  if (parseInt(zoomInput.value, 10) < MAX_ZOOM) {
    zoomInPhoto();
    changeZoomPhoto();
  }
}


export const initFilterPhotoActions = () => {
  zoomOutButton.addEventListener('click', onZoomOutButtonClick);
  zoomInButton.addEventListener('click', onZoomInButtonClick);
};
