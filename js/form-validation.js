const editPhotoForm = document.querySelector('.img-upload__form');
const hashTagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
// const hashTag = /^#[a-zа-яё0-9]{1,19}$/i;
const pristine = new Pristine(editPhotoForm);

const MAX_HASH_TAGS = 5;

const checkHashTag = [
  {
    regExp: /^#[a-zа-яё0-9]{1,19}$/i,
    message: 'Хэштег должен начинаться с # и состоять только из букв и чисел, а также иметь длину не более 20 символов',
    check: function (hashTags, hashTag) {
      return !this.regExp.test(hashTag);
    },
  },
  {
    message: 'Одинаковые хэштэги недопустимы',
    check: (hashTags, hashTag) => {

      for (let i = 0; i < hashTags.length; i++) {
        for (let j = i + 1; j < hashTags.length; j++) {
          if (hashTags[i].toLowerCase() === hashTags[j].toLowerCase()) {
            return true;
          }
        }
      }

      return false;
    }
  },
  {
    message: 'Разрешено добавлять не более 5 хэштэгов',
    check: (hashTags, hashTag) => hashTags.length > MAX_HASH_TAGS,
  },
];

const getHashTagsErrorMessage = (index) => {

  const message = checkHashTag[index].message;
  console.log(message);
  return message;
};

const validateHashTags = () => {
  const hashTags = hashTagField.value.trim().split(' ');

  hashTags.forEach((hashTag) => {

    checkHashTag.forEach((object, index) => {
      if (checkHashTag[index].check(hashTags, hashTag)) {
        return getHashTagsErrorMessage(index);
      }
    });

  });
};

function onEditPhotoFormSubmit(evt) {
  evt.preventDefault();
  // pristine.validate();
}

pristine.addValidator(hashTagField, validateHashTags);

editPhotoForm.addEventListener('submit', onEditPhotoFormSubmit);
