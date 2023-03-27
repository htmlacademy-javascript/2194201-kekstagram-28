import { renderPhotos } from './render-photos.js';
import { getData } from './api.js';
import { createErrorElement } from './utils.js';
import { initUploadPhotoActions } from './upload-photo.js';
import { initSortPhotosActions } from './sort-photos.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
    initSortPhotosActions(photos);
  })
  .catch((err) => {
    createErrorElement(err.message);
  }
  );

initUploadPhotoActions();
