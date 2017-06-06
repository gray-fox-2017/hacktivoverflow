var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var threadSchema = mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Please enter thread\'s title']
    },
    threadContent: {
      type: String,
      required: [true, 'Please enter thread\'s content']
    },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdAt: Date,
    updatedAt: Date
});

var Thread  = mongoose.model('Thread', threadSchema);

module.exports = Thread;