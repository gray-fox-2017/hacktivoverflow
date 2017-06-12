var mongoose = require('mongoose');
var validator = require('validator');

var userSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Mohon masukkan nama anda']
    },
    password: {
      type: String,
      required: [true, 'Mohon masukkan kata sandi anda']
    },
    email: {
      type: String,
      required: true,
      validate: function(v) {
        return validator.isEmail(v);
      }
    }
});

var User  = mongoose.model('User', userSchema);

module.exports = User;