import { createComment } from './create-comment.js';
import { getRandomInteger, getRandomArrayElement } from './utils.js';
import { MIN_LIKES, MAX_LIKES, MIN_COMMENTS, MAX_COMMENTS, DESCRIPTIONS } from './data.js';

let photoId = 1;

export const createPhoto = () => ({
  id: photoId,
  url: `photos/${photoId++}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from({ length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS) }, createComment),
});
