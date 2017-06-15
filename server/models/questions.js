const mongoose = require('mongoose')
const Schema = mongoose.Schema

let questionSchema = new Schema({
  asked_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  votes: [{
    type: Schema.Types.ObjectId, ref: 'Vote'
  }],
  answers: [{
    type: Schema.Types.ObjectId, ref: 'Answer'
  }],
  created: {
    type: Date,
    default: Date.now
  }
})

let Question = mongoose.model('Question', questionSchema)

module.exports = Question
