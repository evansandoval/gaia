//av api
// CALL USING /avapi?symbol=TGT


const express = require('express')
const router = express.Router()
const needle = require('needle')
const urlfunc = require('url')
//env variables
const API_BASE_URL = process.env.AV_url
const API_KEY_NAME = process.env.AV_key_name
const API_KEY_VALUE = process.env.AV_key_value

router.get('/', async (req,res) => {
    try {
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ['function']: 'TIME_SERIES_DAILY',
            ...urlfunc.parse(req.url, true).query
        })
        const apiRes = await needle('get', `${API_BASE_URL}?${params}`)
        const data = apiRes.body
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error})
    }
    
    
})

module.exports = router