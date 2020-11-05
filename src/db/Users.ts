import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true
  }
}, {
  timestamps: true
})

UserSchema.pre('save', async function (next: any) {
  const hash = await bcrypt.hashSync(this.password, 10)
  this.password = hash

  next()
})

const Users = mongoose.model('Users', UserSchema)

export default Users
