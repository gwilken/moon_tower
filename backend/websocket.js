const WebSocket = require('ws');
const config = require('./config.js')
const redis = require('redis')
const subscriber = redis.createClient(config.redis.port, config.redis.host)
const getter = redis.createClient(config.redis.port, config.redis.host)
const { promisify } = require('util')
const zrevrange = promisify(getter.zrevrange).bind(getter)
const hgetall = promisify(getter.hgetall).bind(getter)

subscriber.on('ready', () => {
//subscriber.subscribe("__keyevent@0__:*")
subscriber.subscribe("__keyevent@0__:zadd")
subscriber.subscribe("__keyevent@0__:expired")
subscriber.subscribe("__keyevent@0__:hset")

  subscriber.on("message", async (channel, key) => {
    console.log(channel, key)
   
    if (channel === '__keyevent@0__:zadd') {
   //   console.log('zadd', key)
      let hashKey = await zrevrange(key, 0, 0)

      setTimeout(async () => {
        let hash = await hgetall(hashKey)

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(hash));
            }
        });
      }, 250)
    }

    else if (channel === '__keyevent@0__:expired') {
 //     console.log('expired', key)
    } else {
   //   console.log(channel, key)
    }
  })
});

const wss = new WebSocket.Server({ port: config.websocket.port });
console.log('[ WEBSOCKET ] - Ready.')

wss.on('connection', function connection(ws) {
  console.log('client websocket connected')

  ws.on('message', function incoming(packet) {
      console.log(packet)
  })
})

module.exports = wss