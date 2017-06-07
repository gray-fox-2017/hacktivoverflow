const mongoose = require('mongoose')
const Schema = mongoose.Schema
const voteSchema = require('./vote')
const answerSchema = require('./answer')

let questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  askedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [],
  answers: [answerSchema],
  answerCounts: {
    type: Number,
    default: 0
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

let Question = mongoose.model('Question', questionSchema)
module.exports = Question