var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var answersSchema = new Schema({
  answer:     String,
  thread_id:  { type: Schema.Types.ObjectId, ref: 'threads' },
  user_id:    { type: Schema.Types.ObjectId, ref: 'users' },
  user_name:  String,
  vote:       Number,
  created_at: Date,
  updated_at: Date
});

var Answers = mongoose.model('answers', answersSchema);

module.exports = Answers;
