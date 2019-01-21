const express = require('express')
const app = express()
const websocket = require('./websocket')
const routes = require('./routes')
const config = require('./config')

//app.use(express.static('../frontend/public'))
app.use('/api', routes)

app.listen(config.webserver.port, function() {
  console.log('Server listening on:', config.webserver.port)
})