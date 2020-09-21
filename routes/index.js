module.exports = (app) => {
  // Web routes
  app.use('/', require('./web'))

  // API routes
  app.use('/api/user', require('./user'))
  app.use('/api/task', require('./task'))
}
