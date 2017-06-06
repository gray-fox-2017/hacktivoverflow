const Question = require('../models/question')
const methods = {}

methods.createQuestion = (req, res) => {
  let newQuestion = new Question({
    title: req.body.title,
    content: req.body.content,
    askedBy: req.body.askedBy,
    tags: req.body.tags,
    answers: [],
    votes: []
  })

  newQuestion.save((error, response) => {
    if (error) res.json({error})
    res.send(response)
    console.log('Create question success');
    console.log(response);
  })
}

methods.createAnswer = (req, res) => {
  Question.findById(req.params.id, (error, question) => {
    if (error) res.json({error})
    question.answers.push(req.body.answers)
    question.save((err, record) => {
      if (err) res.json({err})
      res.send(record)
    })
  })
}

methods.getAllQuestion = (req, res) => {
  Question.find({})
  .populate('askedBy votes votes.votedBy answers answers.answeredBy')
  .exec((error, response) => {
    if (error) res.json({error})
    res.send(response)
    console.log('Get All Question success');
    console.log(response);
  })
}

methods.getDetailQuestion = (req, res) => {
  Question.findById(req.params.id)
  .populate('askedBy votes votes.votedBy answers answers.answeredBy')
  .exec((error, response) => {
    if (error) res.json({error})
    res.send(response)
    console.log('Get Detail Question success');
    console.log(response);
  })
}

methods.updateQuestion = (req, res) => {
  Question.findById(req.params.id)
  .populate('askedBy votes votes.votedBy answers answers.answeredBy')
  .exec((error, question) => {
    if (error) res.json({error})
    console.log('Get Detail Question success');
    console.log(question);

    Question.findByIdAndUpdate(question._id, { $set: {
      "title": req.body.title || question.title,
      "content": req.body.content || question.content,
      "askedBy": req.body.askedBy || question.askedBy,
      "tags": req.body.tags || question.tags,
      "answers": req.body.answers || question.answers,
      "votes": req.body.votes || question.votes,
      "voteCounts": req.body.voteCounts || question.voteCounts
    }}, {
      new: true
    })
    .exec((error, response) => {
      if (error) req.json({error})
      res.send(response)
      console.log('Update Question success');
      console.log(response);
    })
  })
}

methods.deleteQuestion = (req, res) => {
  Question.findByIdAndRemove(req.params.id, (error, response) => {
    if (error) req.json({error})
    res.send(response)
    console.log('Delete question success');
    console.log(response);
  })
}

module.exports = methods