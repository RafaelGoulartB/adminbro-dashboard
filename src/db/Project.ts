const mongooseDB = require('mongoose')

const ProjectSchema = new mongooseDB.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  completed: Boolean,
  created_at: { type: Date, default: Date.now }
})

const ProjectModel = mongooseDB.model('Project', ProjectSchema)

module.exports = ProjectModel
