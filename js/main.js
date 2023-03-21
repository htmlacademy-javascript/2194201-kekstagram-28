import { renderPhotos } from './render-photos.js';
import { getData } from './api.js';
import { createErrorLoadMessage } from './fetch-messages.js';
import { initUploadPhotoActions } from './upload-photo.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
  })
  .catch((err) => {
    createErrorLoadMessage(err.message);
  }
  );

initUploadPhotoActions();
