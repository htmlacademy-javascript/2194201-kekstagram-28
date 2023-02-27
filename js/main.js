const NAMES = [
  'Алиса', 'Евгений', 'Елена', 'Роман', 'Светлана', 'Сергей', 'Юлия'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ?!'
];

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomId = (min, max, noRepeat) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);

    if (noRepeat) {
      if (previousValues.length >= (max - min + 1)) {
        return null;
      }
      while (previousValues.includes(currentValue)) {
        currentValue = getRandomInteger(min, max);
      }
      previousValues.push(currentValue);
    }

    return currentValue;
  };
};

const createPhotoId = createRandomId(1, 25, true);
const createCommentTotal = createRandomId(0, 2);
const createCommentId = createRandomId(1, 1000, true);
const createAuthor = createRandomId(0, NAMES.length - 1);
const createAvatar = createRandomId(1, NAMES.length - 1);

const stickMessage = () => {
  const createMessage = createRandomId(0, COMMENTS.length - 1, true);

  let message = `${COMMENTS[createMessage()]}`;

  if (getRandomInteger(0, 1)) {
    message += ` ${COMMENTS[createMessage()]}`;
  }

  return message;
};

const addComment = () => {
  const commentArray = [];

  for (let i = 0; i < createCommentTotal(); i++) {
    commentArray.push({
      id: createCommentId(),
      avatar: `img/avatar-${createAvatar()}.svg`,
      message: stickMessage(),
      name: NAMES[createAuthor()],
    });
  }

  return commentArray.length > 0 ? commentArray : null;
};

const createPhoto = () => {
  const photoId = createPhotoId();

  return ({
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: `Описание к фото №${photoId}`,
    likes: getRandomInteger(15, 200),
    comments: addComment(),
  });
};

const similarWizards = Array.from({ length: 25 }, createPhoto);

console.log(similarWizards);
