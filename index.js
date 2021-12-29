const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit').default;
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
require('express-async-errors');

// const { loginRouter } = require('./routes/login');
// const { handleError } = require('./middlewares/handleError');
// const { dashRouter } = require('./routes/dashboard');
// const { signUpRouter } = require('./routes/register');
// const { movieRouter } = require('./routes/movie');
// const { reviewRouter } = require('./routes/review');
// const { tourReviewRouter } = require('./routes/tourReview');
// const {tourRouter} = require('./routes/tourRoute');
const {siteRouter} = require('./routes/site');
const {handleError} = require('./middlewares/handleError');
const {userRouter} = require('./routes/user');
//const { reviewRouter } = require('./routes/audit');

dotenv.config();

const app = express();
//Set CORS header

app.use(cors());
app.set('trust proxy', 1);

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

 app.use('/api', limiter);


// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

//Setup to use routes
app.use('/api/v1', siteRouter);
app.use('/api/v1', userRouter);
//app.use('/api/v1', reviewRouter);

// Error handling middleware
app.use(handleError);

async function start() {
    try {
    await mongoose.connect(process.env.MONGO_URI);
    const port = process.env.PORT || 4000;
    app.listen(port, (e) => {
        console.log(`Listening on ${port}`);
    })
} catch(err) {
    console.log(err.message);
}
}

start();

module.exports = app;
