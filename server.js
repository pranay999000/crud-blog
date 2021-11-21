require('dotenv').config()
require('./config/mongodb')

const express = require('express')
const app = express()
const http = require('http')
const morgan = require("morgan")
const cookieParser = require("cookie-parser")

const authRoutes = require('./routes/auth')
const blogRoutes = require('./routes/blog')

const httpServer = http.createServer(app)

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

app.use('/api/v1', authRoutes)
app.use('/api/v1', blogRoutes)

httpServer.listen(4000, () => {
    console.log('Server started on 4000!')
})

app.get('/api/v1', (req, res) => {
    res.send('Server listening!')
})

module.exports = app