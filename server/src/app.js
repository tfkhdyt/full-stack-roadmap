const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes/route')

require('dotenv').config()

// Connect to database
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PWD}@cluster0.pbe5r.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`

try {
  mongoose
    .connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log('Connected to DB...')
    })
} catch (error) {
  throw error.message
}

process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection', error.message)
})

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  })
)

//using routes
app.use(routes)

//setup server to listen on port 8080
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is live on port ${process.env.PORT}`)
})
