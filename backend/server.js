const express = require('express')
const app = express()
const config = require('./config')

app.use(express.static('../frontend/build'))

app.listen(config.webserver.port, function() {
  console.log('Server listening on:', config.webserver.port)
})