const editPhotoForm = document.querySelector('.img-upload__form');
const hashTagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const regExp = /^#[a-zа-яё0-9]{1,19}$/i;
const pristine = new Pristine(editPhotoForm, {}, false);
const MAX_HASH_TAGS = 5;

const setMessageErrorHashTags = (message) => hashTagField.setCustomValidity(message);

const checkHashTagRegExp = (hashTag) => {
  const checkHashTag = !regExp.test(hashTag);
  if (checkHashTag) {
    setMessageErrorHashTags('Хэштег начинается с #, состоит из букв и чисел, длина < 20 символов');
  }
  return checkHashTag;
};

const checkHashTagSame = (hashTags) => {
  const checkSame = hashTags.some((item, index) => hashTags.indexOf(item.toLowerCase()) !== index);
  if (checkSame) {
    setMessageErrorHashTags('Одинаковые хэштэги недопустимы');
  }
  return checkSame;
};

const checkHashTagsLength = (hashTags) => {
  const checkLength = hashTags.length > MAX_HASH_TAGS;
  if (checkLength) {
    setMessageErrorHashTags('Разрешено добавлять не более 5 хэштэгов');
  }
  return checkLength;
};

const validateHashTags = () => {
  const hashTags = hashTagField.value.trim().split(' ');
  const isValid = hashTags.some((hashTag) => checkHashTagRegExp(hashTag) || checkHashTagSame(hashTags) || checkHashTagsLength(hashTags));

  return hashTagField.value.length === 0 ? isValid : !isValid;
};

function onEditPhotoFormSubmit(evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
    hashTagField.reportValidity();
  }
}

pristine.addValidator(hashTagField, validateHashTags);

editPhotoForm.addEventListener('submit', onEditPhotoFormSubmit);
