import { check, checkSchema, validationResult } from 'express-validator';
import ErrorResponse from '../../utils/errors/errorResponse.js';
import multer from 'multer';
import { extname } from 'path';
import { fetchMedias } from '../../utils/fs/fsUtils.js';

export const validateMedia = [
  check('Title').trim().notEmpty().withMessage('title cannot be empty'),
  check('Year').trim().notEmpty().withMessage('year cannot be empty'),
  check('Type').notEmpty().withMessage('type cannot be empty'),
  check('imdbID').trim().notEmpty().withMessage('imdbID cannot be empty'),
  async (req, res, next) => {
    const errors = validationResult(req);
    //controllo che non mi dia un altro imdb id
    const medias = await fetchMedias();
    if (req.body.imdbID !== req.params.imdbID) {
      return next(
        new ErrorResponse(`Imdb id must be unique and cannot be changed`, 400)
      );
    }
    if (!errors.isEmpty()) {
      const error = new ErrorResponse(
        `Something went wrong with validation`,
        400,
        'productValidation'
      );
      error.errList = errors.errors;
      return next(error);
    }
    next();
  },
];

// const productSchema = {
//   name: 'iPhone 13',
//   description: 'straight from the future',
//   brand: 'apple',
//   price: 1000,
//   category: 'smartphones',
// };

// export const validateProductSchema = (req, res, next) => {
//   checkSchema()
// }

export const validateProductSchema = (req, res, next) => {
  const productValidationSchema = {
    name: {
      notEmpty: true,
      errorMessage: 'name cannot be empty',
    },
    description: {
      notEmpty: true,
      errorMessage: 'description cannot be empty',
    },
    brand: {
      notEmpty: true,
      errorMessage: 'brand cannot be empty',
    },
    price: {
      notEmpty: true,
      errorMessage: 'price cannot be empty',
    },
    category: {
      notEmpty: true,
      errorMessage: 'category cannot be empty',
    },
  };
  checkSchema(productValidationSchema);
  next();
};
