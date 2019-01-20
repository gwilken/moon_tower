const redis = require('./redisUtils')

redis.getEventFieldAndTimestamp('gps', 'speed').then(docs => console.log(docs))