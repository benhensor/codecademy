const express = require('express')
const apiRouter = express.Router()

const minionsRouter = require('./minionsRoutes')
const ideasRouter = require('./ideasRoutes')
const meetingsRouter = require('./meetingsRoutes')

apiRouter.use('/minions', minionsRouter)
apiRouter.use('/ideas', ideasRouter)
apiRouter.use('/meetings', meetingsRouter)

module.exports = apiRouter