const zoomOutButton = document.querySelector('.scale__control--smaller');
const zoomInButton = document.querySelector('.scale__control--bigger');
const zoomInput = document.querySelector('.scale__control--value');
const photo = document.querySelector('.img-upload__preview>img');
const filterList = document.querySelectorAll('.effects__radio');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const levelSlider = document.querySelector('.effect-level__slider');
const levelFilter = document.querySelector('.effect-level__value');

const MIN_ZOOM = 25;
const MAX_ZOOM = 100;
let typeEffect = '';
let typeUnit = '';

const filtersSettings = {
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
  },
};

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
  photo.style.transform = `scale(${parseInt(zoomInput.value, 10) / 100})`;
};

const zoomOutValue = () => {
  zoomInput.value = `${parseInt(zoomInput.value, 10) - 25}%`;
};

const zoomInValue = () => {
  zoomInput.value = `${parseInt(zoomInput.value, 10) + 25}%`;
};

const updateOptionsSlider = (min, max, step) => {
  levelSlider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    step: step,
    start: max,
  });
};

const selectTypeEffect = (effect) => {
  switch (effect) {
    case 'chrome':
      return 'grayscale';
    case 'sepia':
      return 'sepia';
    case 'marvin':
      return 'invert';
    case 'phobos':
      return 'blur';
    case 'heat':
      return 'brightness';
  }
};

const selectTypeUnit = (effect) => {
  switch (effect) {
    case 'chrome':
    case 'sepia':
    case 'heat':
      return '';
    case 'marvin':
      return '%';
    case 'phobos':
      return 'px';
  }
};

const updateFilter = (filter) => {
  typeEffect = selectTypeEffect(filter);
  typeUnit = selectTypeUnit(filter);
  photo.className = '';

  if (filter !== 'none') {
    sliderContainer.classList.remove('hidden');
    photo.classList.add(`effects__preview--${filter}`);
  } else {
    sliderContainer.classList.add('hidden');
    photo.style.filter = null;
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

function onFilterItemChange(filter) {
  updateFilter(filter);

  if (filter !== 'none') {
    updateOptionsSlider(filtersSettings[filter].min, filtersSettings[filter].max, filtersSettings[filter].step);
  }
}

levelSlider.noUiSlider.on('update', () => {
  const levelValue = levelSlider.noUiSlider.get();
  levelFilter.value = levelValue;
  photo.style.filter = `${typeEffect}(${levelValue}${typeUnit})`;
});

filterList.forEach((filterItem) => {
  filterItem.addEventListener('change', () => {
    onFilterItemChange(filterItem.value);
  });
});

export const resetPhotoStyles = () => {
  zoomInput.value = '100%';
  photo.className = '';
  photo.style = null;
  sliderContainer.classList.add('hidden');
  filterList[0].checked = true;
  typeEffect = '';
  typeUnit = '';
};

export const initFilterPhotoActions = () => {
  zoomOutButton.addEventListener('click', onZoomOutButtonClick);
  zoomInButton.addEventListener('click', onZoomInButtonClick);
};

export const deInitFilterPhotoActions = () => {
  zoomOutButton.removeEventListener('click', onZoomOutButtonClick);
  zoomInButton.removeEventListener('click', onZoomInButtonClick);
};
