const mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var VotingSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  vote: {type:Number, required:true, enumL [1, -1]}
});

var Voting = mongoose.model('Voting', VotingSchema);

module.exports = Voting;
