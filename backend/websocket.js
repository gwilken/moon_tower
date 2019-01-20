const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', function connection(ws) {
    console.log('client websocket connected')

    ws.on('message', function incoming(packet) {
        console.log(packet)
    })

})

module.exports = wss