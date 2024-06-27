const meetingsRouter = require('express').Router()
const { getAllMeetings } = require('../server')

const {
  createMeeting,
  addToDatabase,
  deleteAllFromDatabase,
} = require('./db')

// meetings routes

meetingsRouter.get('/', getAllMeetings, (req, res, next) => {
  if (req.meetings) {
    try {
      res.status(200).send(req.meetings);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(404).send('No meetings found');
  }
})

meetingsRouter.post('/', (req, res, next) => {
  try {
    const newMeeting = addToDatabase('meetings', createMeeting())
    res.status(201).send(newMeeting)
  } catch (err) {
    next(err)
  }
})

meetingsRouter.delete('/', (req, res, next) => {
  try {
    deleteAllFromDatabase('meetings')
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = meetingsRouter