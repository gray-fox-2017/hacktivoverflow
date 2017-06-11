const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = new Schema ({
  name: String,
  username: String,
  password: String,
  email: String,
  picture: String
})

var User = mongoose.model('Users',userSchema)

module.exports = User