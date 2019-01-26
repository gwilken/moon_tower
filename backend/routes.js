const express = require('express')
const router = new express.Router();
const redis = require('./redisUtils.js')

// router.get('/api/:key/:field/:start?/:end?', async (req, res) => {  
//     let data = await redis.getEventFieldAndTimestamp(req.params.key, req.params.field, req.params.start, req.params.end)
//     res.json(data)
// })

// router.get('/system', async (req, res) => {
//     let hash = redis.
// })

router.get('/key/:key/:start?/:end?', async (req, res) => {  
    let data = await redis.getHashsFromSet(req.params.key, req.params.start, req.params.end)
    res.json(data)
})

router.get('/window/:key/:window', async (req, res) => {  
    let data = await redis.getHashsFromSet(req.params.key, req.params.window * -1, -1)
    res.json(data)
})

router.get('/allkeys', async (req, res) => {  
    let data = await redis.getHashsFromSet(req.params.key, req.params.start, req.params.end)
    res.json(data)
})

module.exports = router