const express = require('express')
const router = new express.Router();
const redis = require('./redisUtils.js')

// router.get('/api/:key/:field/:start?/:end?', async (req, res) => {  
//     let test = await redis.getEventFieldAndTimestamp(req.params.key, req.params.field, req.params.start, req.params.end)
//     res.json(test)
// })

router.get('/key/:key/:start?/:end?', async (req, res) => {  
   // console.log(req.params.key)
    let test = await redis.getFullEvent(req.params.key, req.params.start, req.params.end)
   // console.log(test)
    res.json(test)
})

router.get('/window/:key/:window', async (req, res) => {  
    console.log(req.params.key)
    let test = await redis.getZrevrange(req.params.key, req.params.window)
    console.log(test.length)
    res.json(test)
})

router.get('/allkeys', async (req, res) => {  
    let test = await redis.getFullEvent(req.params.key, req.params.start, req.params.end)
    res.json(test)
})


module.exports = router