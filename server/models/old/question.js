const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//
// let voteSchema = new Schema({
//   _user: {type: Schema.Types.ObjectId, ref: 'User'},
//   poin: {
//     type: Number,
//     enum: {
//       values: [-1,1],
//       messages: 'Invalid vote'
//     },
//   }
// });

let questionSchema = new Schema({
  title: {
    type: String,
    required: [true,'{PATH} must be filled'],
    validate: {
      validator: function(val){ return /[a-z]{3,40}/gi.test(val) },
      message: `{PATH}'s length must be between 3 and 40 char`
    }
  },
  descr: {
    type: String,
    required: [true,'{PATH} must be filled'],
    validate: {
      validator: function(val){ return /[a-z]{10,100}/gi.test(val) },
      message: `{PATH}'s length must be between 10 and 100 char`
    }
  },
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date },
  downVote: {_voter: {type:Schema.Types.ObjectId, ref:'User'},
  upVote: {_voter:{type:Schema.Types.ObjectId, ref:'User'},
  answerList: [{type:Schema.Types.ObjectId, ref:'Answer'}],
  // voteList : [voteSchema],
  _user: {type:Schema.Types.ObjectId, ref:'User'},
});

let Question = mongoose.model('Question',questionSchema);

module.exports = Question