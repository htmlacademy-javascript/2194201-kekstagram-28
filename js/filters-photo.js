const MIN_ZOOM = 25;
const MAX_ZOOM = 100;
let typeEffect = '';
let typeUnit = '';

const FilterSettings = {
  CHROME: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    CSS: 'grayscale',
  },
  SEPIA: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    CSS: 'sepia',
  },
  MARVIN: {
    MIN: 0,
    MAX: 100,
    STEP: 1,
    CSS: 'invert',
    UNIT: '%',
  },
  PHOBOS: {
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    CSS: 'blur',
    UNIT: 'px',
  },
  HEAT: {
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    CSS: 'brightness',
  },
};

const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomInput = document.querySelector('.scale__control--value');
const photoElement = document.querySelector('.img-upload__preview>img');
const filterListElement = document.querySelector('.img-upload__effects');
const sliderElement = document.querySelector('.img-upload__effect-level');
const levelSliderElement = document.querySelector('.effect-level__slider');
const levelFilterElement = document.querySelector('.effect-level__value');
const hashTagInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

noUiSlider.create(levelSliderElement, {
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
  levelSliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    step: step,
    start: max,
  });
};

const updateFilter = (filter) => {
  typeEffect = FilterSettings?.[filter]?.CSS ?? '';
  typeUnit = FilterSettings?.[filter]?.UNIT ?? '';
  photoElement.className = '';

  if (filter.toLowerCase() !== 'none') {
    sliderElement.classList.remove('hidden');
    photoElement.classList.add(`effects__preview--${filter}`);
  } else {
    sliderElement.classList.add('hidden');
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
    const filter = evt.target.value.toUpperCase();
    updateFilter(filter);
    updateOptionsSlider(FilterSettings?.[filter]?.MIN, FilterSettings?.[filter]?.MAX, FilterSettings?.[filter]?.STEP);
  }
}

function onLevelSliderUpdate() {
  const valueCurrent = levelSliderElement.noUiSlider.get();
  levelFilterElement.value = valueCurrent;
  photoElement.style.filter = `${typeEffect}(${valueCurrent + typeUnit})`;
}

levelSliderElement.noUiSlider.on('update', onLevelSliderUpdate);

export const resetPhotoStyles = () => {
  zoomInput.value = '100%';
  photoElement.className = '';
  photoElement.style = null;
  sliderElement.classList.add('hidden');
  filterListElement.querySelector('#effect-none').checked = true;
  hashTagInput.value = '';
  descriptionInput.value = '';
  typeEffect = '';
  typeUnit = '';
};

export const initFilterPhotoActions = () => {
  zoomOutButton.addEventListener('click', onZoomOutButtonClick);
  zoomInButton.addEventListener('click', onZoomInButtonClick);
  filterListElement.addEventListener('change', onFilterItemChange);
};

export const deInitFilterPhotoActions = () => {
  zoomOutButton.removeEventListener('click', onZoomOutButtonClick);
  zoomInButton.removeEventListener('click', onZoomInButtonClick);
  filterListElement.removeEventListener('change', onFilterItemChange);
};
