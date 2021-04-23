import { v4 as uuidv4 } from 'uuid';
import ErrorResponse from '../utils/errors/errorResponse.js';
import { fetchAttendees, writeAttendees } from '../utils/fs/fsUtils.js';
import { sendEmail } from '../utils/email/email.js';

// @desc    get all Comments for a media
// @route   GET /comments/:imdbid
export const getAllReviews = async (req, res, next) => {
  try {
    res.send('hi');
  } catch (error) {
    next(error);
  }
};

// @route   POST /comments
export const addReview = async (req, res, next) => {
  try {
    res.send('hi');
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
