import { renderPhotos } from './render-photos.js';
import { getData } from './api.js';
import { createErrorElement } from './utils.js';
import { initUploadPhotoActions } from './form.js';
import { initSortPhotosActions } from './sort.js';

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
