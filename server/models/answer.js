const mongoose = require('mongoose')
const Schema = mongoose.Schema
const voteSchema = require('./vote')

let answerSchema = new Schema({
  answeredBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  votes: [voteSchema],
  voteCounts: {
    type: Number,
    default: 0
  },
  createdDate: {
    type: Date,
    default: new Date()
  },
  updatedDate: {
    type: Date,
    default: new Date()
  }
})

module.exports = answerSchema