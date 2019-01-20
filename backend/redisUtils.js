const redis = require('./redis.js')
const { promisify } = require('util')
const asyncIncr = promisify(redis.incr).bind(redis)
const asyncZrange = promisify(redis.zrange).bind(redis)
const asyncHget = promisify(redis.hget).bind(redis)
const asyncHgetall = promisify(redis.hgetall).bind(redis)
// const redisGet = promisify(redis.get).bind(redis)
//let test = await redisLrange(req.params.key, req.params.start, req.params.end)

const recordEvent = async (event) => {
    let timestamp = Date.now()

    event.id = `${event.type}-${await asyncIncr('counter')}`
    event.timestamp = timestamp
    redis.hmset(event.id, event)

    redis.zadd(event.type, timestamp, event.id)
}

const getFullEvent = (type, min = 0, max = 30) => {
    return new Promise( async (resolve, reject) => {
        let list = await asyncZrange(type, min, max)

        let res = list.map(async (key) => {
            return await asyncHgetall(key)
        })

        Promise.all(res).then( (docs) => {
            console.log(docs)
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

module.exports = { recordEvent, getFullEvent, getEventField, getEventFieldAndTimestamp }
