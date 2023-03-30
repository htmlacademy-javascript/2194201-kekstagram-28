import { renderPhotos } from './render-photos.js';
import { getData } from './api.js';
import { createErrorMessage } from './utils.js';
import { initFormActions } from './form.js';
import { initSortPhotosActions } from './sort.js';
import { initBigPhotoActions } from './big-photo.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
    initSortPhotosActions(photos);
    initBigPhotoActions();
  })
  .catch((err) => {
    createErrorMessage(err.message);
  }
  );

initFormActions();
