const ideasRouter = require('express').Router()
const { getAllIdeas } = require('../server')
const checkMillionDollarIdea = require('./checkMillionDollarIdea')

module.exports = ideasRouter

const {
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabaseById,
} = require('./db')


ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id)
  if (idea) {
    req.idea = idea
    next()
  } else {
    res.status(404).send('Idea not found')
  }
})

// ideas routes

ideasRouter.get('/', getAllIdeas, (req, res, next) => {
  try {
    if (req.ideas) {
      res.status(200).send(req.ideas);
    } else {
      res.status(404).send('No ideas found');
    }
  } catch (err) {
    next(err);
  }
})

ideasRouter.get('/:ideaId', (req, res, next) => {
  try {
    const idea = getFromDatabaseById('ideas', req.params.ideaId);
    if (idea) {
      res.status(200).send(idea);
    } else {
      res.status(404).send('No idea found');
    }
  } catch (err) {
    next(err);
  }
})

ideasRouter.put('/:ideaId', getAllIdeas, checkMillionDollarIdea, (req, res, next) => {
  const ideaId = req.params.ideaId
  if(isNaN(Number(ideaId))) {
    return res.status(404).send('Invalid idea id')
  }
  try {
    const ideaToUpdate = req.ideas.find(idea => idea.id === req.params.ideaId)
    if (!ideaToUpdate) {
      res.status(404).send('No minion with matching id found')
      return
    }
    const updatedIdea = {...ideaToUpdate, ...req.body}
    const result = updateInstanceInDatabase('ideas', updatedIdea)
    res.status(200).send(result)
  } catch (err) {
    next(err)
  }
})

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  try {
    const newIdea = addToDatabase('ideas', req.body)
    res.status(201).send(newIdea)
  } catch (err) {
    next(err)
  }
})

ideasRouter.delete('/:ideaId', getAllIdeas, (req, res, next) => {
  try {
    const ideaToDelete = req.ideas.find(idea => idea.id === req.params.ideaId)
    if (!ideaToDelete) {
      res.status(404).send('Idea not found')
      return
    }
    deleteFromDatabaseById('ideas', req.params.ideaId)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})