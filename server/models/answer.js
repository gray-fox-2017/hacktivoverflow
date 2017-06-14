const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let answerSchema = new Schema({
  descr: {
    type: String,
    required: [true,'{PATH} must be filled'],
    validate: {
      validator: function(val){ let len = val.length; return len>9 && len<301 },
      message: `{PATH}'s length must be between 10 and 300 char`
    }
  },
  createdAt: { type: Date, default: new Date() },
  updatedAt: Date,
  downVote: [{type:Schema.Types.ObjectId, ref:'User'}],
  upVote: [{type:Schema.Types.ObjectId, ref:'User'}],
  _user: {type:Schema.Types.ObjectId, ref:'User'},
  _question: {type:Schema.Types.ObjectId, ref:'Question'}
});

let Answer = mongoose.model('Answer',answerSchema);

module.exports = Answer
