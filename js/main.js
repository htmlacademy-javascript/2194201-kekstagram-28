import { renderPhotos } from './render-photos.js';
import { getData } from './api.js';
import { initUploadPhotoActions } from './upload-photo.js';

getData()
  .then((photos) => {
    renderPhotos(photos);
  })
  .catch(
    (err) => {
      console.error(err.message);
    }
  );

initUploadPhotoActions();
