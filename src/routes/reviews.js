import { Router } from 'express';
import {
  getSingleReview,
  addReview,
  modifyReview,
  deleteReview,
  getAllReviews,
} from '../controllers/reviews.js';

const router = Router();

router.route('/').post(addReview);

router.route('/:imdbid').get(getAllReviews);

router
  .route('/:imdbid/:id')
  .get(getSingleReview)
  .put(modifyReview)
  .delete(deleteReview);

export default router;
