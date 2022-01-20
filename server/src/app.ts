import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
require('dotenv').config()

import routes from './routes/route'

const app = express()

// Connect to database
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PWD}@cluster0.pbe5r.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`

try {
  (async () => {
    await mongoose.connect(uri)
    console.log('Connected to DB...')
  })()
} catch (error: any) {
  throw error.message
}

process.on('unhandledRejection', (error: any) => {
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
