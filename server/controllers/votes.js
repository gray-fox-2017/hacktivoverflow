const Vote = require('../models/votes')
const Question = require('../models/questions')
const Answer = require('../models/answers')
const methods = {}

methods.voteToQuestion = function(req, res){
	let decodedUser_id = req.decoded._id;
	Question.findById(req.params.id_question)
		.populate('votes')
		.exec((err, recordQuestion) => {
			if (err)
				res.send(err)
			else {
				let voted = recordQuestion.votes.some(val => val.voted_by == decodedUser_id )
				if (voted)
					res.json({ validated: false })
				else {
					Vote.create({
						voted_by : decodedUser_id,
						vote : req.body.vote
					}, function(error, recordVote){
				    if(error)
				      res.json({error})
				    else {
							Question.findByIdAndUpdate(recordQuestion._id,
								{ $push: {
										votes: recordVote._id
								}},
								{ new: true })
								.exec((err, suc) => {
									res.json({ validated: err == null ? true:false })
								})
						} // end else
					}) // end Votecreate
				} // end else

    	} // end else
  	}) // end questionFind
}

methods.voteToAnswer = function(req, res){
	let decodedUser_id = req.decoded._id;
	Answer.findById(req.params.id_answer)
		.populate('votes')
		.exec((err, recordAnswer) => {
			if (err)
				res.send(err)
			else {

				let voted = recordAnswer.votes.some(val => val.voted_by == decodedUser_id )

				if (voted)
					res.json({ validated: false })
				else {
					Vote.create({
						voted_by : decodedUser_id,
						vote : req.body.vote
					}, function(error, recordVote){
				    if(error)
				      res.json({error})
				    else {
							Answer.findByIdAndUpdate(recordAnswer._id,
								{ $push: {
										votes: recordVote._id
								}},
								{ new: true })
								.exec((err, suc) => {
									res.json({ validated: err == null ? true:false })
								})
						} // end else
					}) // end Votecreate
				} // end else

    	} // end else
  	}) // end answerFind
}

methods.deleteById = function(req, res){
  Vote.findByIdAndRemove(req.params.id)
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

module.exports = methods
