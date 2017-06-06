var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var responseSchema = mongoose.Schema({
    responseContent: {
      type: String,
      required: [true, 'Please enter thread\'s title']
    },
    parent: { type: Schema.Types.ObjectId, ref: 'Thread' },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: Date,
    updatedAt: Date
});

var Response  = mongoose.model('Response', responseSchema);

module.exports = Response;