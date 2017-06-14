const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let voteQuestSchema = new Schema({
  _quest: {type: Schema.Types.ObjectId, ref: 'Question'},
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  poin: {
    type: Number,
    enum: {
      values: [-1,1],
      messages: 'Invalid vote'
    },
  }
});

let VoteQuest = mongoose.model('VoteQuest',voteQuestSchema);

module.exports = VoteQuest