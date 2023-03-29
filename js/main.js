import { renderPhotos } from './render-photos.js';
import { getData } from './api.js';
import { createErrorElement } from './utils.js';
import { initFormActions } from './form.js';
import { initSortPhotosActions } from './sort.js';
import { initBigPhotoActions } from './big-photo.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
    initSortPhotosActions(photos);
    initBigPhotoActions();
    initFormActions();
  })
  .catch((err) => {
    createErrorElement(err.message);
  }
  );
