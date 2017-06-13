const mongoose = require('mongoose');
var Schema = mongoose.Schema

const voteSchema = new Schema({
  user_id: {type : Schema.Types.ObjectId, ref: 'User'},
  vote: {type: Number, required : true, enum: [1,-1]},
});

let Vote = mongoose.model('Vote', voteSchema)

module.exports = Vote;