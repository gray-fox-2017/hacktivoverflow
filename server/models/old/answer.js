const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let voteSchema = new Schema({
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  poin: {
    type: Number,
    enum: {
      values: [-1,1],
      messages: 'Invalid vote'
    },
  }
});

let answerSchema = new Schema({
  descr: {
    type: String,
    required: [true,'{PATH} must be filled'],
    validate: {
      validator: function(val){ return /[a-z]{10,100}/gi.test(val) },
      message: `{PATH}'s length must be between 10 and 100 char`
    }
  },
  voteList: [voteSchema],
  _user: {type:Schema.Types.ObjectId, ref:'User'},
  _question: {type:Schema.Types.ObjectId, ref:'Question'}
});

let Answer = mongoose.model('Answer',answerSchema);

module.exports = Answer
