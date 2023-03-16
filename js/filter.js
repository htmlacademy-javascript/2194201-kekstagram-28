const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomInput = document.querySelector('.scale__control--value');
const photo = document.querySelector('.img-upload__preview>img');

const MIN_ZOOM = 25;
const MAX_ZOOM = 100;

const changeZoomPhoto = () => {
  photo.style.transform = `scale(${parseInt(zoomInput.value, 10) / 100})`;
};

const zoomOutValue = () => {
  zoomInput.value = `${parseInt(zoomInput.value, 10) - 25}%`;
};

const zoomInValue = () => {
  zoomInput.value = `${parseInt(zoomInput.value, 10) + 25}%`;
};

function onZoomOutButtonClick(evt) {
  evt.preventDefault();

  if (parseInt(zoomInput.value, 10) > MIN_ZOOM) {
    zoomOutValue();
    changeZoomPhoto();
  }
}

function onZoomInButtonClick(evt) {
  evt.preventDefault();

  if (parseInt(zoomInput.value, 10) < MAX_ZOOM) {
    zoomInValue();
    changeZoomPhoto();
  }
}


export const initFilterPhotoActions = () => {
  zoomOutButton.addEventListener('click', onZoomOutButtonClick);
  zoomInButton.addEventListener('click', onZoomInButtonClick);
};
