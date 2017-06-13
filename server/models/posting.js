const mongoose = require('mongoose');
var Schema = mongoose.Schema

const postSchema = new Schema({
  user_id: {type : Schema.Types.ObjectId, ref: 'User'},
  title: {type: String, required : true},
  message: {type : String, required : true},
  vote_up: [{type : Schema.Types.ObjectId, ref: 'User'}],
  vote_down: [{type : Schema.Types.ObjectId, ref: 'User'}],
  commentid: [
    { type: Schema.Types.ObjectId, ref: 'Answer' }
  ]
});

let Post = mongoose.model('Post', postSchema)

module.exports = Post;
