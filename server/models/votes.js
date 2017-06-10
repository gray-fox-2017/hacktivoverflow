const mongoose = require('mongoose')
const Schema = mongoose.Schema

let voteSchema = new Schema({
  voted_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  vote : {
     type : Number,
     enum : [1, -1]
   }
})

const Vote = mongoose.model('Vote', voteSchema)

module.exports = Vote
