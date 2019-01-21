const WebSocket = require('ws');
const config = require('./config.js')
const redis = require('redis')
const subscriber = redis.createClient(config.redis.port, config.redis.host)
const getter = redis.createClient(config.redis.port, config.redis.host)

const { promisify } = require('util')
const zrevrange = promisify(getter.zrevrange).bind(getter)
const hgetall = promisify(getter.hgetall).bind(getter)


subscriber.on('ready', () => {
  console.log('Subscriber Ready.');

  subscriber.subscribe("__keyevent@0__:zadd")

  subscriber.on("message", async (channel, key) => {
    console.log('msg:', key)

    let hashKey = await zrevrange(key, 0, 0)
    let hash = await hgetall(hashKey)

    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            console.log('sending to clients:', hash)
            client.send(JSON.stringify(hash));
        }
    });

  })
});

const wss = new WebSocket.Server({ port: 8081 });


wss.on('connection', function connection(ws) {
    console.log('client websocket connected')

    ws.on('message', function incoming(packet) {
        console.log(packet)
    })

})

module.exports = wss