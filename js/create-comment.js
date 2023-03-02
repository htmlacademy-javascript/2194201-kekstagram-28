import { getRandomInteger, getRandomArrayElement } from './utils.js';
import { createMessage } from './create-message.js';
import { NAMES } from './data.js';

let commentId = 1;

export const createComment = () => ({
  id: commentId++,
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});
