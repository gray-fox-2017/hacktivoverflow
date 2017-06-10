const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema({
  answered_by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  description: String,
	votes: [{
    type: Schema.Types.ObjectId, ref: 'Vote'
  }],
  created: {
    type: Date,
    default: Date.now
  }
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer
