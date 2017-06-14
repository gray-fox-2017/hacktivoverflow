const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let questionSchema = new Schema({
  descr: {
    type: String,
    required: [true,'{PATH} must be filled'],
    validate: {
      validator: function(val){ let len = val.length; return len>9 && len<301 },
      message: `{PATH}'s length must be between 10 and 300 char`
    }
  },
  title: {
    type: String,
    required: [true,'{PATH} must be filled'],
    validate: {
      validator: function(val){ let len = val.length; return len>2 && len<51 },
      message: `{PATH}'s length must be between 3 and 50 char`
    }
  },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date },
  downVote: [{type:Schema.Types.ObjectId, ref:'User'}],
  upVote: [{type:Schema.Types.ObjectId, ref:'User'}],
  answerList: [{type:Schema.Types.ObjectId, ref:'Answer'}],
  _user: {type:Schema.Types.ObjectId, ref:'User'},
});

let Question = mongoose.model('Question',questionSchema);

module.exports = Question