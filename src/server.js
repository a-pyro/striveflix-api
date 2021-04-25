import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mediaRoutes from './routes/media.js';
import reviewsRoutes from './routes/reviews.js';
import ErrorResponse from './utils/errors/errorResponse.js';
import {
  errorHandler,
  routeNotFoundHandler,
} from './middlewares/errors/errorHandling.js';

const app = express();

if (process.env.NODE_DEV === 'development') {
  app.use(morgan('dev'));
}

const whiteList = [process.env.FE_URL_DEV, process.env.FE_URL_PROD];
// da configurare anke su heroku

const corsOptions = {
  origin: function (origin, next) {
    if (whiteList.indexOf(origin) !== -1) {
      console.log('ORIGIN: ', origin);
      //origin trovata in whitelist
      next(null, true);
    } else {
      // origin non trovata in white, sucati i cors
      next(new ErrorResponse(`NOT ALLOWED BY CORS`, 403));
    }
  },
};

// app.use(cors(corsOptions));
app.use(express.json());
/* 
ROUTES
*/
app.use('/media', mediaRoutes);
app.use('/reviews', reviewsRoutes);

app.use(routeNotFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'production') {
    // no need to configure it manually on Heroku
    console.log('Server running on cloud on port: ', PORT);
  } else {
    console.log('Server running locally on port: ', PORT);
  }
});
