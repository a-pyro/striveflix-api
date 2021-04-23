import { v4 as uuidv4 } from 'uuid';
import ErrorResponse from '../utils/errors/errorResponse.js';
import { fetchAttendees, writeAttendees } from '../utils/fs/fsUtils.js';
import { sendEmail } from '../utils/email/email.js';

import generatePDF, { asyncPipeline } from '../utils/pdf/generatePDF.js';

// @desc    get all media
// @route   GET /media
export const getAllMedia = async (req, res, next) => {
  try {
    res.send('hi');
  } catch (error) {
    next(error);
  }
};

// @route   POST /media
export const addMedia = async (req, res, next) => {
  try {
    res.send('hi');
  } catch (error) {
    next(error);
  }
};

// @desc    get single media
// @route   GET /media/:imdbid
export const getSingleMedia = async (req, res, next) => {
  try {
    res.send('hi');
  } catch (error) {
    next(error);
  }
};

// @route   PUT /media/:imdbid
export const modifyMedia = async (req, res, next) => {
  try {
    res.send('hi');
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /media/:imdbid
export const deleteMedia = async (req, res, next) => {
  try {
    res.send('hi');
  } catch (error) {
    next(error);
  }
};

//@ route POST /media/:imdbid/upload
export const uploadMediaImage = async (req, res, next) => {
  try {
    res.send('hi');
  } catch (error) {
    next(error);
  }
};
