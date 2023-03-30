const FILTER_SETTINGS = {
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

const imageElement = document.querySelector('.img-upload__preview img');
const filterListElement = document.querySelector('.img-upload__effects');
const sliderElement = document.querySelector('.img-upload__effect-level');
const levelSliderElement = document.querySelector('.effect-level__slider');
const levelFilterElement = document.querySelector('.effect-level__value');

let typeEffect = '';
let typeUnit = '';

const createSlider = () => {
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
  typeEffect = FILTER_SETTINGS?.[filter]?.css ?? '';
  typeUnit = FILTER_SETTINGS?.[filter]?.unit ?? '';
  imageElement.className = '';

  if (filter !== 'none') {
    sliderElement.classList.remove('hidden');
    imageElement.classList.add(`effects__preview--${filter}`);
  } else {
    sliderElement.classList.add('hidden');
    imageElement.style.filter = null;
  }
};

const resetFilter = () => {
  typeEffect = '';
  typeUnit = '';
  sliderElement.classList.add('hidden');
};

const resetPhotoStyles = () => {
  imageElement.className = '';
  imageElement.style = null;
};

const onFilterItemChange = (evt) => {
  if (evt.target.closest('.effects__radio')) {
    const filter = evt.target.value;
    updateFilter(filter);
    updateOptionsSlider(FILTER_SETTINGS?.[filter]?.min, FILTER_SETTINGS?.[filter]?.max, FILTER_SETTINGS?.[filter]?.step);
  }
};

const onLevelSliderUpdate = () => {
  const valueCurrent = levelSliderElement.noUiSlider.get();
  levelFilterElement.value = valueCurrent;
  imageElement.style.filter = `${typeEffect}(${valueCurrent + typeUnit})`;
};

const activateFilters = () => {
  createSlider();

  filterListElement.addEventListener('change', onFilterItemChange);
  levelSliderElement.noUiSlider.on('update', onLevelSliderUpdate);
};

export { activateFilters, resetFilter, resetPhotoStyles };
