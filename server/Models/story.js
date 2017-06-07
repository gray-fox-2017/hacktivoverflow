const mongoose = require('mongoose')
const Schema = mongoose.Schema

var storySchema = new Schema ({
  title: String,
  story: String,
  user_id: {type: Schema.Types.ObjectId,ref: 'User'},
  vote: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

var Story = mongoose.model('Stories',storySchema)

module.exports = Story