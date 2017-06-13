var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var answerSchema = new Schema ({
  answer: {
    type: String,
    required: [true, 'Please enter your question detail']
  },
  upVote: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  downVote: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  creator: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  questionId: {
    type: Schema.Types.ObjectId, ref: 'Question'
  },
  createdAt: Date,
  updatedAt: Date
})

var Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
