const mongoose = require('mongoose');
var Schema = mongoose.Schema

const userSchema = new Schema({
  username: {type: String, required : true},
  password: {type: String, required : true},
  email: {type : String, required : true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please fill a valid email']},
  phone: {type : String, default: false},
});

let User = mongoose.model('User', userSchema)

module.exports = User;
