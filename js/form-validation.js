const editPhotoForm = document.querySelector('.img-upload__form');
const hashTagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const regExp = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASH_TAGS = 5;
const MAX_SYMBOL_DESCRIPTION = 140;
const messageErrorHagTag = `Не более ${MAX_HASH_TAGS} уникальных хэштэгов < 20 символов каждый. Сначала #, а после - буквы и цифры!`;
const messageErrorDescription = `Комментарий должен быть не более ${MAX_SYMBOL_DESCRIPTION} символов. Уменьшите количество символов!`;

const pristine = new Pristine(editPhotoForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error',
}, false);

const checkHashTagRegExp = (hashTag) => !regExp.test(hashTag);

const checkHashTagSame = (hashTags) => hashTags.some((item, index) => hashTags.indexOf(item.toLowerCase()) !== index);

const checkHashTagsLength = (hashTags) => hashTags.length > MAX_HASH_TAGS;

const validateHashTags = () => {
  const hashTags = hashTagField.value.trim().split(' ');
  const isValid = hashTags.some((hashTag) => checkHashTagRegExp(hashTag)) || checkHashTagSame(hashTags) || checkHashTagsLength(hashTags);

  return hashTagField.value.length === 0 ? isValid : !isValid;
};

const validateDescription = () => descriptionField.value.length < MAX_SYMBOL_DESCRIPTION;

function onEditPhotoFormSubmit(evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
}

pristine.addValidator(hashTagField, validateHashTags, messageErrorHagTag);
pristine.addValidator(descriptionField, validateDescription, messageErrorDescription);

editPhotoForm.addEventListener('submit', onEditPhotoFormSubmit);
