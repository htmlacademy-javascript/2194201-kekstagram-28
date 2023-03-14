const editPhotoForm = document.querySelector('.img-upload__form');
const hashTagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const regExp = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASH_TAGS = 5;
const messageErrorHagTag = 'Не более 5 уникальных хэштэгов, длина каждого < 20 символов. Должен начинаться с # и состоять из букв или цифр!';

const pristine = new Pristine(editPhotoForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error',
});

const checkHashTagRegExp = (hashTag) => !regExp.test(hashTag);

const checkHashTagSame = (hashTags) => hashTags.some((item, index) => hashTags.indexOf(item.toLowerCase()) !== index);

const checkHashTagsLength = (hashTags) => hashTags.length > MAX_HASH_TAGS;

const validateHashTags = () => {
  const hashTags = hashTagField.value.trim().split(' ');
  const isValid = hashTags.some((hashTag) => checkHashTagRegExp(hashTag) || checkHashTagSame(hashTags) || checkHashTagsLength(hashTags));

  return hashTagField.value.length === 0 ? isValid : !isValid;
};

function onEditPhotoFormSubmit(evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
}

pristine.addValidator(hashTagField, validateHashTags, messageErrorHagTag);

editPhotoForm.addEventListener('submit', onEditPhotoFormSubmit);
