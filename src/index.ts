require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const AdminBroExpress = require('@admin-bro/express')

const adminBroOptions = require('./adminbro-options')

const router = AdminBroExpress.buildRouter(adminBroOptions)

const app = express()

app.use(adminBroOptions.options.rootPath, router)

const run = async () => {
  await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ghmix.gcp.mongodb.net/adminbro-db?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })

  await app.listen(8080)
}

run()
