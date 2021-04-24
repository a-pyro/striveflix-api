import { v4 as uuidv4 } from 'uuid';
import ErrorResponse from '../utils/errors/errorResponse.js';

import { sendEmail } from '../utils/email/email.js';
import { fetchReviews, writeReviews } from '../utils/fs/fsUtils.js';

// @desc    get all Comments for a media
// @route   GET /comments/:imdbID
export const getAllMovieReviews = async (req, res, next) => {
  try {
    const reviews = await fetchReviews();
    const movieReviews = reviews.filter(
      (rev) => rev.elementId === req.params.imdbID
    );
    if (movieReviews.length === 0) {
      return res.status(200).send({
        success: true,
        message: 'no reviews for this movie',
        movieReviews,
      });
    }
    res.status(200).send({ success: true, movieReviews });
  } catch (error) {
    next(error);
  }
};

// @route   POST /comments
export const addReview = async (req, res, next) => {
  try {
    const reviews = await fetchReviews();
    const newReview = { ...req.body, createdAt: new Date(), _id: uuidv4() };
    reviews.push(newReview);
    await writeReviews(reviews);
    res.status(201).send({
      success: true,
      moviesReviews: `${req.protocol}://${req.get('host')}/reviews/${
        req.body.elementId
      }`,
    });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /comments//:imdbid/:id
export const modifyReview = async (req, res, next) => {
  try {
    res.send('hi');
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /comment/:imdbID/:id => comment id
export const deleteReview = async (req, res, next) => {
  try {
    const reviews = await fetchReviews();
    const newReviews = reviews.reduce((acc, cv) => {
      if (cv.elementId === req.params.imdbID && cv._id === req.params.id) {
        return acc;
      }
      acc.push(cv);
      return acc;
    }, []);
    await writeReviews(newReviews);
    res.status(200).send({
      success: true,
      moviesReviews: `${req.protocol}://${req.get('host')}/reviews/${
        req.body.elementId
      }`,
    });
  } catch (error) {
    next(error);
  }
};
