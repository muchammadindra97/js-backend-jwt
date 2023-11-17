const express = require('express')
const app = express()
const port = process.env.DOCKER_APP_PORT ?? 3000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
