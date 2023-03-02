import { getRandomInteger, getRandomArrayElement } from './utils.js';

const PHOTO_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 1;
const MAX_COMMENTS = 7;

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

const DESCRIPTIONS = [
  'Классное фото!',
  'Наша лучшая фотография!',
  'Оцените ракурс, плиз...',
  'Твое лицо, когда ты не умеешь фотографировать.',
  'Это моя бывшая!!!',
  'Купил новый фотоаппарат, оцените снимок.'
];

let commentId = 1;
let photoId = 1;

const createMessage = () => {
  const message = Array.from({ length: getRandomInteger(1, 2) }, () => getRandomArrayElement(COMMENTS));
  return [...new Set(message)].join(' ');
};

const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = () => ({
  id: photoId,
  url: `photos/${photoId++}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({ length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS) }, createComment),
});

export const createPhotos = () => Array.from({ length: PHOTO_COUNT }, createPhoto);
