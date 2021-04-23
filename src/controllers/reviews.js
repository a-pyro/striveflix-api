import { v4 as uuidv4 } from 'uuid';
import ErrorResponse from '../utils/errors/errorResponse.js';

import { sendEmail } from '../utils/email/email.js';
import { fetchReviews, writeReviews } from '../utils/fs/fsUtils.js';

// @desc    get all Comments for a media
// @route   GET /comments/:imdbid
export const getAllMovieReviews = async (req, res, next) => {
  try {
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

// @desc    get single Comment
// @route   GET /comments/:imdbid/:id=> comment id
export const getSingleReview = async (req, res, next) => {
  try {
    res.send('hi');
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

// @route   DELETE /comment/:imdbid/:id => comment id
export const deleteReview = async (req, res, next) => {
  try {
    res.send('hi');
  } catch (error) {
    next(error);
  }
};
