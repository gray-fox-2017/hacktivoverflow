const mongoose = require('mongoose');
var Schema = mongoose.Schema

const commentSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  comment: {type : String, required : true},
  vote_up: [{type : Schema.Types.ObjectId, ref: 'User'}],
  vote_down: [{type : Schema.Types.ObjectId, ref: 'User'}]
});

let Answer = mongoose.model('Answer', commentSchema)

module.exports = Answer;
