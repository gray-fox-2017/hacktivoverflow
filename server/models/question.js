var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema ({
  title: {
    type: String,
    required: [true, 'Please enter title']
  },
  detail: {
    type: String,
    required: [true, 'Please enter your question detail']
  },
  tags: [{
    type: String
  }],
  upVote: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  downVote: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  creator: {
    type: Schema.Types.ObjectId, ref: 'User'
  },
  createdAt: Date,
  updatedAt: Date
})

var Question = mongoose.model('Question', questionSchema);

module.exports = Question;
