const request = require('supertest');
const assert = require('assert');
const express = require('express');

const app = express();


// Object to track the number of requests for each user
const numberOfRequestsForUser = {};

// Global middleware for rate limiting
app.use((req, res, next) => {
  const userId = req.headers['user-id'];

  // Initialize request count for the user if not present
  numberOfRequestsForUser[userId] = numberOfRequestsForUser[userId] || 0;

  // Increment request count for the user
  numberOfRequestsForUser[userId]++;

  // Clear request count every one second
  setTimeout(() => {
    numberOfRequestsForUser[userId] = 0;
  }, 1000);

  // Check if the user exceeded the rate limit (5 requests per second)
  if (numberOfRequestsForUser[userId] > 5) {
    return res.status(404).send('Rate limit exceeded');
  }

  // If within the rate limit, continue to the next middleware or route handler
  next();
});

// Example endpoint
app.get('/user', (req, res) => {
  res.status(200).send('Request successful');
});

// Start the server


module.exports = app;