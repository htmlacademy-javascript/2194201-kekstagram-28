const editPhotoForm = document.querySelector('.img-upload__form');
const hashTagField = document.querySelector('.text__hashtags');

const REG_EXP = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASH_TAGS = 5;

const messageErrorHagTag = `Не более ${MAX_HASH_TAGS} уникальных хэштэгов < 20 символов каждый. Сначала #, а после - буквы и цифры!`;

const pristine = new Pristine(editPhotoForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error',
}, false);

const checkHashTagRegExp = (hashTags) => hashTags.some((hashTag) => !REG_EXP.test(hashTag));

const checkHashTagSame = (hashTags) => hashTags.some((item, index) => hashTags.indexOf(item.toLowerCase()) !== index);

const checkHashTagsLength = (hashTags) => hashTags.length > MAX_HASH_TAGS;

const validateHashTags = () => {
  const hashTags = hashTagField.value.trim().split(' ');
  const isValid = checkHashTagRegExp(hashTags) || checkHashTagSame(hashTags) || checkHashTagsLength(hashTags);

  return !hashTagField.value.length ? isValid : !isValid;
};

pristine.addValidator(hashTagField, validateHashTags, messageErrorHagTag);

export const validate = () => pristine.validate();
