import { v4 as uuidv4 } from 'uuid';
import ErrorResponse from '../utils/errors/errorResponse.js';

import { sendEmail } from '../utils/email/email.js';

import generatePDF, { asyncPipeline } from '../utils/pdf/generatePDF.js';
import { fetchMedias, writeMedias } from '../utils/fs/fsUtils.js';
import { response } from 'express';
import axios from 'axios';

// @desc    get all media
// @route   GET /media
export const getAllMedia = async (req, res, next) => {
  try {
    const medias = await fetchMedias();
    res.status(200).send({ data: medias });
  } catch (error) {
    next(error);
  }
};

// @route   POST /media
export const addMedia = async (req, res, next) => {
  try {
    //se nella richiesta c'è solo title => gli mando array da cui scegliere
    if (Object.keys(req.body).length === 1) {
      const title = req.body.Title;
      const movies = await axios.get(
        `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${title}`
      );
      // se non trova niente in OMDB
      if (movies.data.Response === 'False') {
        return next(
          new ErrorResponse(
            `No suggestion from omdb, try with another title`,
            404
          )
        );
      } else {
        return res.status(200).send(movies.data.Search); //se trova gli mando l'array
      }
    }
    // se nella richiesta c'è tutto, lo aggiungo in db
    const medias = await fetchMedias();
    const newMedia = { ...req.body, createdAt: new Date() };
    medias.push(newMedia);
    await writeMedias(medias);

    res.status(201).send({ success: true, imdbID: req.body.imdbID });
  } catch (error) {
    next(error);
  }
};

// @desc    get single media
// @route   GET /media/:imdbID
export const getSingleMedia = async (req, res, next) => {
  try {
    const medias = await fetchMedias();
    const movie = medias.find((mov) => mov.imdbID === req.params.imdbID);
    if (!movie) {
      return next(new ErrorResponse(`Movie not found`, 404));
    }
    return res.status(200).send({ succes: true, movie });
  } catch (error) {
    next(error);
  }
};

// @route   PUT /media/:imdbID
export const modifyMedia = async (req, res, next) => {
  try {
    try {
      const medias = await fetchMedias();
      const movie = medias.find((mov) => mov.imdbID === req.params.imdbID);
      if (!movie) {
        return next(new ErrorResponse(`Movie not found`, 404));
      }
      const modifiedMovie = { ...req.body };
      const newMedias = medias.reduce((acc, cv) => {
        if (cv.imdbID === modifiedMovie.imdbID) {
          cv = { ...cv, ...modifiedMovie, editedAt: new Date() };
          acc.push(cv);
          return acc;
        }
        acc.push(cv);
        return acc;
      }, []);
      await writeMedias(newMedias);

      return res.status(200).send({ succes: true, modifiedMovie });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /media/:imdbID
export const deleteMedia = async (req, res, next) => {
  try {
    const medias = await fetchMedias();
    const newMedias = medias.filter((med) => med.imdbID !== req.params.imdbID);
    await writeMedias(newMedias);
    res.status(200).send({ success: true, message: 'movie deleted' });
  } catch (error) {
    next(error);
  }
};

//@ route POST /media/:imdbID/upload
export const uploadMediaImage = async (req, res, next) => {
  try {
    res.send('hi');
  } catch (error) {
    next(error);
  }
};
