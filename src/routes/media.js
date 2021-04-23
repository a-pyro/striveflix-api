import { Router } from 'express';
import {
  getSingleMedia,
  addMedia,
  modifyMedia,
  deleteMedia,
  getAllMedia,
  uploadMediaImage,
} from '../controllers/media.js';

const router = Router();

router.route('/').get(getAllMedia).post(addMedia);
router
  .route('/:imdbid')
  .get(getSingleMedia)
  .delete(deleteMedia)
  .put(modifyMedia);

router.route('/:imdbid/upload').post(uploadMediaImage);

export default router;
