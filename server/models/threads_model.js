var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var threadsSchema = new Schema({
  question:   String,
  answer_id:  [{ type: Schema.Types.ObjectId, ref: 'answers' }],
  user_id:    String,
  vote:       Number,
  created_at: Date,
  updated_at: Date
});

var Threads = mongoose.model('threads', threadsSchema);

module.exports = Threads;
