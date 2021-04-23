import { Router } from 'express';
import {
  getSingleReview,
  addReview,
  modifyReview,
  deleteReview,
  getAllMovieReviews,
} from '../controllers/reviews.js';

const router = Router();

router.route('/').post(addReview);

router.route('/:imdbID').get(getAllMovieReviews);

router.route('/:imdbID/:id').put(modifyReview).delete(deleteReview);

export default router;
