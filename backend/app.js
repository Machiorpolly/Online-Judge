const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const problemRouter = require('./routes/problemRoutes');
const submissionRouter = require('./routes/submissionRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const cors = require('cors');

// Creating the express app
const app = express();

app.use(cors());
// Third party middlewares
app.use(morgan('dev'));
app.use(express.json());

// Setting up routes
app.use('/users', userRouter);
app.use('/problem', submissionRouter);
app.use('/problem', problemRouter);

app.get('/', (req, res) => {
  res.json({ des: 'GKOJ Homepage' });
  //next();
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
// Exporting the express app
module.exports = app;
