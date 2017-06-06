const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  uuid: String,
  name: String,
  username: String,
  password: String,
  email: String,
  phone: {
    type: String,
    default: '+6281315853615'
  },
  createdDate: {
    type: Date,
    default: Date.now()
  },
  updatedDate: {
    type: Date,
    default: Date.now()
  },
  role: {
    type: String,
    default: 'user'
  }
})

let User = mongoose.model('User', userSchema)
module.exports = User