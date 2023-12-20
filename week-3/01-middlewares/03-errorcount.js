const express = require('express');
const app = express();
let errorCount = 0;

app.get('/user', function (req, res, next) {
  try {
    throw new Error("User not found");
    // If an exception occurs, it will be caught by the error handling middleware
    // The code below this line will not be executed in case of an exception
    res.status(200).json({ name: 'john' });
  } catch (error) {
    // If an exception occurs, pass it to the next middleware
    next(error);
  }
});

app.post('/user', function (req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

// Middleware to catch errors and increment errorCount
app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes
  res.status(404).send('Not Found');
  errorCount += 1;
});

app.get('/errorCount', function (req, res) {
  res.status(200).json({ errorCount });
});

module.exports = app;
