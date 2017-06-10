const Answers = require('../models/answers')
const Question = require('../models/questions')
const Vote = require('../models/votes')
const User = require('../models/users')
const methods = {}

methods.insertOne = function(req, res){
	let user_id = req.decoded._id;
  Question.create({
		asked_by : user_id,
    title : req.body.title,
    description : req.body.description,
		votes : [],
		answers : []
	}, function(error, record){
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.getAll = function(req, res){
	Question.find({})
		.populate('asked_by votes answers')

		.exec((error, records) => {
		  if(error){
		    res.json({error})
		  } else {
		    res.json(records)
		  }
		})
}

methods.getById = function(req, res){
  Question.find({_id : req.params.id })
	.populate({
		path: 'asked_by votes answers',
			populate: {
      	path: 'answered_by',
      	model: 'User',
			}
	})
	.exec((error, docs) => {
    if(error){
      res.json({error})
    } else {
			let options = {
				path: 'answers.votes',
				model: 'Vote'
    	};
			Question.populate(docs, options, function (err, records) {
      	res.json(records);
    	});
    }
  })
}

methods.updateById = function(req, res){
  Question.findByIdAndUpdate(req.params.id, { $set:req.body }, {new: true})
	.populate('asked_by votes answers answered_by')
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.deleteById = function(req, res){
  Question.findByIdAndRemove(req.params.id)
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

module.exports = methods
