const express = require('express')
const app = express()
const port = process.env.DOCKER_APP_PORT ?? 3000
const routes = require('./routes')

app.use(express.json())

// Import all api routes
app.use('/api', routes)

// Handle unknown path
app.all('*', (req, res) => {
  res
    .status(404)
    .json({
      status: 'fail',
      message: 'Not found'
    })
})

// Custom error response
app.use((err, req, res, next) => {
  console.error(err)
  res
    .status(500)
    .json({
      status: 'fail',
      message: 'Internal server error'
    })
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
