var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usersSchema = new Schema({
  name:       String,
  email:      String,
  password:   String,
  role:       String,
  thread_id:  [{ type: Schema.Types.ObjectId, ref: 'threads' }],
  answer_id:  [{ type: Schema.Types.ObjectId, ref: 'answers' }],
  created_at: Date,
  updated_at: Date
});

var Users = mongoose.model('users', usersSchema);

module.exports = Users;
