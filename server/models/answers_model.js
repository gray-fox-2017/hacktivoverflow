var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var answersSchema = new Schema({
  answer:     String,
  thread_id:  String,
  user_id:    String,
  vote:       Number,
  created_at: Date,
  updated_at: Date
});

var Answers = mongoose.model('answers', answersSchema);

module.exports = Answers;
