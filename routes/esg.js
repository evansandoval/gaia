//esg api
// CALL USING /esgapi?q=TGT
const express = require('express')
const router = express.Router()
const needle = require('needle')
const urlfunc = require('url')
const apicache = require('apicache')
//env variables
const API_BASE_URL = process.env.ESG_url
const API_KEY_NAME = process.env.ESG_key_name
const API_KEY_VALUE = process.env.ESG_key_value

//init cache
let cache = apicache.middleware

router.get('/', cache('10 days'), async (req,res) => {
    try {
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
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