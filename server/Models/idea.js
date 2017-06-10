const mongoose = require('mongoose')
const Schema = mongoose.Schema

var ideaSchema = new Schema ({
  idea: String,
  upvote: [{type: Schema.Types.ObjectId, ref: 'User'}],
  downvote: [{type: Schema.Types.ObjectId, ref: 'User'}],
  user_id:{type: Schema.Types.ObjectId,ref: 'User'},
  story_id:{type: Schema.Types.ObjectId,ref: 'User'}
})

var Idea = mongoose.model('Ideas',ideaSchema)

module.exports = Idea