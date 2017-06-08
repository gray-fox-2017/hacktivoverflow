var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema({
  answerBody: {
      type: String,
      required: [true, 'Fill the title please!']
  },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: Date,
  updatedAt: Date
});

var answer = mongoose.model('Answer', answerSchema);

module.exports = answer
