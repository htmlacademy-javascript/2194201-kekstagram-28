const MIN_ZOOM = 25;
const MAX_ZOOM = 100;
let typeEffect = '';
let typeUnit = '';

const FiltersSettings = {
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    css: 'grayscale',
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    css: 'sepia',
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    css: 'invert',
    unit: '%',
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    css: 'blur',
    unit: 'px',
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    css: 'brightness',
  },
};

const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomInput = document.querySelector('.scale__control--value');
const photoElement = document.querySelector('.img-upload__preview>img');
const filterList = document.querySelector('.img-upload__effects');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const levelSlider = document.querySelector('.effect-level__slider');
const levelFilter = document.querySelector('.effect-level__value');
const hashTagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');

noUiSlider.create(levelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const changeZoomPhoto = () => {
  photoElement.style.transform = `scale(${parseInt(zoomInput.value, 10) / 100})`;
};

const zoomOutValue = () => {
  zoomInput.value = `${parseInt(zoomInput.value, 10) - 25}%`;
};

const zoomInValue = () => {
  zoomInput.value = `${parseInt(zoomInput.value, 10) + 25}%`;
};

const updateOptionsSlider = (min = 0, max = 100, step = 1) => {
  levelSlider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    step: step,
    start: max,
  });
};

const updateFilter = (filter) => {
  typeEffect = FiltersSettings?.[filter]?.css ?? '';
  typeUnit = FiltersSettings?.[filter]?.unit ?? '';
  photoElement.className = '';

  if (filter !== 'none') {
    sliderContainer.classList.remove('hidden');
    photoElement.classList.add(`effects__preview--${filter}`);
  } else {
    sliderContainer.classList.add('hidden');
    photoElement.style.filter = null;
  }
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

function onFilterItemChange(evt) {
  if (evt.target.closest('.effects__radio')) {
    const filter = evt.target.value;
    updateFilter(filter);
    updateOptionsSlider(FiltersSettings?.[filter]?.min, FiltersSettings?.[filter]?.max, FiltersSettings?.[filter]?.step);
  }
}

function onLevelSliderUpdate() {
  const valueCurrent = levelSlider.noUiSlider.get();
  levelFilter.value = valueCurrent;
  photoElement.style.filter = `${typeEffect}(${valueCurrent + typeUnit})`;
}

levelSlider.noUiSlider.on('update', onLevelSliderUpdate);

export const resetPhotoStyles = () => {
  zoomInput.value = '100%';
  photoElement.className = '';
  photoElement.style = null;
  sliderContainer.classList.add('hidden');
  filterList.querySelector('#effect-none').checked = true;
  hashTagField.value = '';
  descriptionField.value = '';
  typeEffect = '';
  typeUnit = '';
};

export const initFilterPhotoActions = () => {
  zoomOutButton.addEventListener('click', onZoomOutButtonClick);
  zoomInButton.addEventListener('click', onZoomInButtonClick);
  filterList.addEventListener('change', onFilterItemChange);
};

export const deInitFilterPhotoActions = () => {
  zoomOutButton.removeEventListener('click', onZoomOutButtonClick);
  zoomInButton.removeEventListener('click', onZoomInButtonClick);
  filterList.removeEventListener('change', onFilterItemChange);
};
