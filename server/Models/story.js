const mongoose = require('mongoose')
const Schema = mongoose.Schema

var storySchema = new Schema ({
  title: String,
  story: String,
  premise: String,
  note: String,
  creator: String,
  createdAt: Date,
  user_id: {type: Schema.Types.ObjectId,ref: 'User'},
  upvote: [{type: Schema.Types.ObjectId, ref: 'User'}],
  downvote: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

var Story = mongoose.model('Stories',storySchema)

module.exports = Story