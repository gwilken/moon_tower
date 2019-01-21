const redisClient = require('./redis.js')
const { promisify } = require('util')
const asyncIncr = promisify(redisClient.incr).bind(redisClient)
const asyncZrange = promisify(redisClient.zrange).bind(redisClient)
const asyncHget = promisify(redisClient.hget).bind(redisClient)
const asyncHgetall = promisify(redisClient.hgetall).bind(redisClient)
// const redisGet = promisify(redisClient.get).bind(redis)
//let test = await redisLrange(req.params.key, req.params.start, req.params.end)

const recordEvent = async (event) => {
    let timestamp = Date.now()

    event.id = `${event.type}-${await asyncIncr('counter')}`
    event.timestamp = timestamp
    redisClient.hmset(event.id, event)

    redisClient.zadd(event.type, timestamp, event.id)
}

const getFullEvent = (type, min = 0, max = 30) => {
    return new Promise( async (resolve, reject) => {
        let list = await asyncZrange(type, min, max)

        let res = list.map(async (key) => {
            return await asyncHgetall(key)
        })

        Promise.all(res).then( (docs) => {
            resolve(docs)
        })
    })
}

const getEventField = (type, field, min = 0, max = 100) => {
    return new Promise (async (resolve, reject) => {
        let list = await asyncZrange(type, min, max)

        let res = list.map(async key =>  await asyncHget(key, field))

        Promise.all(res).then(docs => resolve(docs))
    })
}


const getEventFieldAndTimestamp = (type, field, min = 0, max = 100) => {
    return new Promise (async (resolve, reject) => {
        let list = await asyncZrange(type, min, max)

        let res = list.map(async (key) => {
            let value = await asyncHget(key, field)
            let timestamp = await asyncHget(key, 'timestamp')
            return { value, timestamp }
        })

        Promise.all(res).then(docs => resolve(docs))
    })
}

module.exports = { redisClient, recordEvent, getFullEvent, getEventField, getEventFieldAndTimestamp }
