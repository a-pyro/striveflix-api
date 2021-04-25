import ErrorResponse from '../utils/errors/errorResponse.js';
import { pipeline } from 'stream';

import fs from 'fs-extra';
import { fetchMedias, writeMedias } from '../utils/fs/fsUtils.js';

import axios from 'axios';

import { generatePdfCatalogue } from '../utils/pdf/pdf.js';
import { asyncPipeline } from '../utils/pdf/generatePDF.js';
const { createReadStream } = fs;
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
    console.log(req.body);
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
    } else {
      // se nella richiesta c'è tutto, lo aggiungo in db
      const medias = await fetchMedias();
      const newMedia = { ...req.body, createdAt: new Date() };
      medias.push(newMedia);
      await writeMedias(medias);

      res.status(201).send({ success: true, imdbID: req.body.imdbID });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    get single media
// @route   GET /media/:imdbID
export const getSingleMedia = async (req, res, next) => {
  try {
    const resp = await axios.get(
      `${process.env.OMDB_API}i=${req.params.imdbID}`
    );
    console.log(resp.data);
    res.status(200).send(resp.data);
  } catch (error) {
    next(error);
  }
};

// @route   PUT /media/:imdbID
export const modifyMedia = async (req, res, next) => {
  const medias = await fetchMedias();
  try {
    const movie = medias.find((mov) => mov.imdbID === req.params.imdbID);
    if (!movie) {
      return next(new ErrorResponse(`Movie not found`, 404));
    } else {
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
    const medias = await fetchMedias();
    console.log(req.file);
    const newMedias = medias.reduce((acc, cv) => {
      if (cv.imdbID === req.params.imdbID) {
        cv = { ...cv, Poster: req.file.path, editedAt: new Date() };
        acc.push(cv);
        return acc;
      }
      acc.push(cv);
      return acc;
    }, []);
    await writeMedias(newMedias);
    res.status(200).send({
      success: true,
      Poster: req.file.path,
      imdbdID: req.params.imdbID,
    });
  } catch (error) {
    next(error);
  }
};

export const getPDFcatalogue = async (req, res, next) => {
  try {
    const media = await fetchMedias();

    if (!req.query.hasOwnProperty('title')) {
      return next(
        new ErrorResponse(
          `Only title query is implemented, you sent ${req.url}`,
          400
        )
      );
    }
    const title = req.query.title.toLowerCase();
    const catalogue = media.filter((mov) =>
      mov['Title'].toLowerCase().includes(title)
    );
    const sourceStream = await generatePdfCatalogue(catalogue);
    res.attachment('catalogue.pdf');
    // await asyncPipeline(sourceStream, res);
    pipeline(sourceStream, res, () => {
      console.log('end');
    });
    // res.status(200).send({ succes: true, data: 'suca' });
  } catch (error) {
    next(error);
  }
};
