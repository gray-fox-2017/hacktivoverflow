const mongoose = require('mongoose')
const Schema = mongoose.Schema

let voteSchema = new Schema({
  votedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vote: {
    type: Number,
    enum: [1, -1]
  }
})

module.exports = voteSchema