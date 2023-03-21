import { renderPhotos } from './render-photos.js';
import { getData, createErrorMessage } from './api.js';
import { initUploadPhotoActions } from './upload-photo.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
  })
  .catch((err) => {
    createErrorMessage(err.message);
  }
  );

initUploadPhotoActions();
