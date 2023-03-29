const REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASH_TAGS = 5;
const MESSAGE_ERROR_HASH_TAG = `Не более ${MAX_HASH_TAGS} уникальных хэштэгов < 20 символов каждый. Сначала #, а после - буквы и цифры!`;

const editPhotoForm = document.querySelector('.img-upload__form');
const hashTagInput = document.querySelector('.text__hashtags');

const pristine = new Pristine(editPhotoForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error',
}, false);

const isHashTagRegExp = (hashTags) => hashTags.some((hashTag) => !REG_EXP.test(hashTag));

const isHashTagSame = (hashTags) => hashTags.some((item, index) => hashTags.indexOf(item.toLowerCase()) !== index);

const isHashTagsLength = (hashTags) => hashTags.length > MAX_HASH_TAGS;

const createHashTagsArray = (value) => value.trim().split(' ').filter((item) => item);

const validateHashTags = (value) => {
  if (!value) {
    return true;
  }

  const hashTags = createHashTagsArray(value);
  const isValid = isHashTagRegExp(hashTags) || isHashTagSame(hashTags) || isHashTagsLength(hashTags);

  return !isValid;
};

const addValidator = () => pristine.addValidator(hashTagInput, validateHashTags, MESSAGE_ERROR_HASH_TAG);

const resetPristine = () => pristine.reset();
const validatePristine = () => pristine.validate();

export { addValidator, validatePristine, resetPristine };
