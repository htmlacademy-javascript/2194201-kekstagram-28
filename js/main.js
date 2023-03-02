import { PHOTO_COUNT } from './data.js';
import { createPhoto } from './create-photo.js';

const getPhotos = () => Array.from({ length: PHOTO_COUNT }, createPhoto);

getPhotos();
