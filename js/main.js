import { renderPhotos } from './render-photos.js';
import { getData } from './api.js';
import { createErrorLoadMessage } from './fetch-messages.js';
import { initUploadPhotoActions } from './upload-photo.js';
import { initSortPhotosActions } from './sort-photos.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
    initSortPhotosActions(photos);
  })
  .catch((err) => {
    createErrorLoadMessage(err.message);
  }
  );

initUploadPhotoActions();
