const Answers = require('../models/answers')
const Question = require('../models/questions')
const Vote = require('../models/votes')
const User = require('../models/users')
const methods = {}

methods.answerToQuestion = function(req, res){
	let user_id = req.decoded._id;
  Answers.create({
		answered_by : user_id,
    description : req.body.description,
		votes : []
	}, function(error, record){
    if(error){
      res.json({error})
    } else {
			console.log(record._id)
		  Question.findByIdAndUpdate(req.params.id_question,
		    { $push: {
		        answers: record._id
		    }},
		    { new: true })
				.populate({ path: 'asked_by votes answers', populate: {
			       path: 'answered_by',
			       model: 'User'
			     }, populate: {
				        path: 'votes',
				        model: 'Vote'
				      }  })
		      .exec((err, recordQuestion) => {
		        if (err)
		          res.send(err)
		        else

							res.json(recordQuestion)
		      })

    }// end else
  }) // end answer create
}

methods.getAll = function(req, res){
	Answers.find({})
		.populate('answered_by votes')
		.exec((error, records) => {
		  if(error){
		    res.json({error})
		  } else {
		    res.json(records)
		  }
		})
}

methods.getById = function(req, res){
  Answers.find({_id : req.params.id })
	.populate('answered_by votes')
	.exec((error, records) => {
    if(error){
      res.json({error})
    } else {
      res.json(records)
    }
  })
}

methods.updateById = function(req, res){
  Answers.findByIdAndUpdate(req.params.id, { $set:req.body }, {new: true})
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.deleteById = function(req, res){
  Answers.findByIdAndRemove(req.params.id)
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

module.exports = methods
