const express = require('express');
const app = express();


module.exports = app;

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

const { getAllFromDatabase } = require('./server/db');

// Add middleware for handling CORS requests from index.html
const cors = require('cors');
app.use(cors());

// Add middware for parsing request bodies here:
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Get all from database middleware
const getAll = (modelType) => {
  return (req, res, next) => {
    const items = getAllFromDatabase(modelType)
    if (!items) {
      const err = new Error(`No ${modelType} found`)
      err.status = 404
      return next(err)
    }
    req[modelType] = items
    next()
  }
}

const getAllMinions = getAll('minions');
const getAllIdeas = getAll('ideas');
const getAllMeetings = getAll('meetings');

module.exports.getAllMinions = getAllMinions;
module.exports.getAllIdeas = getAllIdeas;
module.exports.getAllMeetings = getAllMeetings;

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || 'Something went wrong';
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {}
  })
}

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');
app.use('/api', apiRouter);

app.use(errorHandler);

// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}