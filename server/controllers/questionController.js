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

module.exports = methods