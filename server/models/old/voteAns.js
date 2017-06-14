const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let voteAnsSchema = new Schema({
  _ans: {type: Schema.Types.ObjectId, ref: 'Answer'},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  poin: {
    type: Number,
    enum: {
      values: [-1,1],
      messages: 'Invalid vote'
    },
  }
});

let VoteAns = mongoose.model('VoteAns',voteAnsSchema);

module.exports = VoteAns
