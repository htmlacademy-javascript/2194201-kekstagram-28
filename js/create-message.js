import { getRandomInteger, getRandomArrayElement } from './utils.js';
import { COMMENTS } from './data.js';

export const createMessage = () => {
  const message = Array.from({ length: getRandomInteger(1, 2) }, () => getRandomArrayElement(COMMENTS));
  return [...new Set(message)].join(' ');
};
