import { Router } from 'express';
import {
  getSingleMedia,
  addMedia,
  modifyMedia,
  deleteMedia,
  getAllMedia,
  uploadMediaImage,
} from '../controllers/media.js';
import { validateMedia } from '../middlewares/validation/mediaValidation.js';

const router = Router();

router.route('/').get(getAllMedia).post(addMedia);
router
  .route('/:imdbID')
  .get(getSingleMedia)
  .delete(deleteMedia)
  .put(validateMedia, modifyMedia);

router.route('/:imdbID/upload').post(uploadMediaImage);

export default router;
