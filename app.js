const express = require('express');
require('express-async-errors');
// const createError = require('http-errors');
// const morgan = require('morgan');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));

app.use('/', require('./src/routes/routes'));

app.use((error, request, response, next) => {
  console.log(error)
  response.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
  });
  return next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
