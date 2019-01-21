const redisUtils = require('./redisUtils')

//redis.getEventFieldAndTimestamp('gps', 'speed').then(docs => console.log(docs))

redisUtils.redisClient.subscribe("__keyevent@0__:zadd")
redisUtils.redisClient.on("message", (channel, msg) => {
    console.log('channel:', channel)
    console.log('msg:', msg)
})