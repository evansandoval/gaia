//*************import packages
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const rateLimit = require('express-rate-limit')
const PORT = process.env.PORT || 5000

const app = express()

//Rate limiting
const limiter = rateLimit({
    windowMs: 1000*60*2, // maxes out requests to 150 in 2 minutes
    max: 150
})

app.use(limiter)
app.set('trust proxy', 1)

//set static folder
app.use(express.static('public'))

//routes
app.use('/esgapi', require('./routes/esg.js'))
app.use('/avapi', require('./routes/av.js'))

//enable cors
app.use(cors())

//run server using express
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))