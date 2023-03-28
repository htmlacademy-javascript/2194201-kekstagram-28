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

const imageElement = document.querySelector('.img-upload__preview img');
const filterListElement = document.querySelector('.img-upload__effects');
const sliderElement = document.querySelector('.img-upload__effect-level');
const levelSliderElement = document.querySelector('.effect-level__slider');
const levelFilterElement = document.querySelector('.effect-level__value');

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
  typeEffect = FilterSettings?.[filter]?.CSS ?? '';
  typeUnit = FilterSettings?.[filter]?.UNIT ?? '';
  imageElement.className = '';

  if (filter.toLowerCase() !== 'none') {
    sliderElement.classList.remove('hidden');
    imageElement.classList.add(`effects__preview--${filter}`);
  } else {
    sliderElement.classList.add('hidden');
    imageElement.style.filter = null;
  }
};

const resetFilterStyles = () => {
  typeEffect = '';
  typeUnit = '';
};

const resetPhotoStyles = () => {
  imageElement.className = '';
  imageElement.style = null;
};

const resetSlider = () => sliderElement.classList.add('hidden');

const onFilterItemChange = (evt) => {
  if (evt.target.closest('.effects__radio')) {
    const filter = evt.target.value.toUpperCase();
    updateFilter(filter);
    updateOptionsSlider(FilterSettings?.[filter]?.MIN, FilterSettings?.[filter]?.MAX, FilterSettings?.[filter]?.STEP);
  }
};

const onLevelSliderUpdate = () => {
  const valueCurrent = levelSliderElement.noUiSlider.get();
  levelFilterElement.value = valueCurrent;
  imageElement.style.filter = `${typeEffect}(${valueCurrent + typeUnit})`;
};

const initFiltersActions = () => {
  filterListElement.addEventListener('change', onFilterItemChange);
  levelSliderElement.noUiSlider.on('update', onLevelSliderUpdate);
};

export { initFiltersActions, createSlider, resetFilterStyles, resetPhotoStyles, resetSlider };
