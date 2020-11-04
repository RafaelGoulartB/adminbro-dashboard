require('dotenv').config()

const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')
const Project = require('./db/Project')

AdminBro.registerAdapter(AdminBroMongoose)

const adminBroOptions = new AdminBro({
  resources: [
    {
      resource: Project,
      options: {
        properties: {
          description: { type: 'richtext' },
          created_at: {
            isVisible: { edit: false, list: true, show: true, filter: true }
          }
        }
      }
    }
  ],
  locale: {
    translations: {
      labels: {
        Project: 'My Projects'
      }
    }
  },
  rootPath: '/admin'
})

const router = AdminBroExpress.buildRouter(adminBroOptions)

// Server
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(adminBroOptions.options.rootPath, router)

// Run App
const run = async () => {
  await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ghmix.gcp.mongodb.net/adminbro-db?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  await app.listen(8080, () => console.log('Server started at http://localhost:8080/'))
}

run()
