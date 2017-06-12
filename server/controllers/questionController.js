const Question = require('../models/question')
const methods = {}

methods.createQuestion = (req, res) => {
  let newQuestion = new Question({
    title: req.body.title,
    content: req.body.content,
    askedBy: req.body.askedBy,
    tags: req.body.tags || [],
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
    question.answerCounts = question.answers.length
    question.save((err, record) => {
      if (err) res.json({err})
      res.send(record)
    })
  })
}

methods.deleteAnswer = (req, res) => {
  Question.findById(req.params.questionid, (err, question) => {
    if (err) res.json({msg: `Oopps, Something wrong ${error}`, succes: false})
    else {
      question.answers.id(req.params.answerid).remove()
      question.answerCounts -= 1
      question.save(err => {
        if (err) res.json({msg: `Oopps, Something wrong ${error}`, succes: false})
        else {
          res.json({question, succes: true});
        }
      })
    }
  })
}

methods.editAnswer = (req, res) => {
  Question.findById(req.params.questionid, (error, question) => {
    if (error) res.json({msg: `Oopps, Something wrong ${error}`, succes: false})
    else {
      question.answers.map(answer => {
        if (answer._id == req.params.answerid) {
          console.log('Data answer by id saat edit: ');
          console.log(answer);
          answer.content = req.body.content || answer.content
          answer.updatedDate = new Date() || answer.updatedDate
          question.save((err, result) => {
            if (err) req.json({msg: `Oopps, Something wrong ${error}`, succes: false})
            else {
              res.send(result)
            }
          })
        }
      })
    }
  })
}

methods.getAllQuestion = (req, res) => {
  Question.find({})
  .populate('askedBy votes votes.votedBy answers answers.answeredBy answers.votes.votedBy')
  .exec((error, response) => {
    if (error) res.json({error})
    res.send(response)
    console.log('Get All Question success');
    console.log(response);
  })
}

methods.getDetailQuestion = (req, res) => {
  Question.findById(req.params.id)
  .populate('askedBy votes votes.votedBy answers answers.answeredBy answers.votes.votedBy')
  .exec((error, response) => {
    if (error) res.json({error})
    res.send(response)
    console.log('Get Detail Question success');
    console.log(response);
  })
}

methods.getDetailAnswerByQuestion = (req, res) => {
  Question.findById(req.params.questionid)
  .populate('askedBy votes votes.votedBy answers answers.answeredBy answers.votes.votedBy')
  .then(response => {
    let detailAnswer = response.answers.filter(answer => {
      // console.log('questionid');
      // console.log(req.params.questionid);
      // console.log('answeridX');
      // console.log(answer._id);
      // console.log('answeridY');
      // console.log(req.params.answerid);
      if (answer._id == req.params.answerid) {
        return answer
      }
    })
    console.log(detailAnswer);
    res.send(detailAnswer[0])
  })
  .catch(error => {
    console.log('masuk error', error);
  })
}

methods.voteToQuestion = (req, res) => {
  let questionid = req.params.id
  Question.findById(questionid, (error, question) => {
    if (error) res.json({msg: `Oopps, Something wrong ${error}`, success:false})
    else {
      let detailVote = []
      // let answer = question.answers.id(req.params.answerid)
      if (req.body.vote == 1) {
        question.votes.filter(voteX => {
          if (voteX.vote == 1) {
            console.log('Votex 1');
            console.log(voteX);
            return detailVote.push(voteX)
          }
        })
      } else if (req.body.vote == -1) {
        question.votes.filter(voteX => {
          if (voteX.vote == -1) {
            console.log('Votex -1');
            console.log(voteX);
            return detailVote.push(voteX)
          }
        })
      }
      console.log('++++');
      console.log(detailVote);
      if (detailVote.some(vote => vote.votedBy == req.body.votedBy)) {
        res.json({msg: 'Oopps, You have already vote this question', success: false})
      } else {
        Question.findOneAndUpdate({ _id: question._id},
        { $push: {'votes': {votedBy: req.body.votedBy, vote: req.body.vote } }},
        { new: true}, (err, result) => {
          if (err) res.json({msg: `Oopps, Something wrong ${err}`, success: false})
          console.log('*** result ***');
          console.log(result);
          if (req.body.vote == 1) {
            question.voteCounts += 1
            question.save()
            res.json({result, success: true, msg: 'Thank you for your upVote.'})
          } else if (req.body.vote == -1) {
            question.voteCounts -= 1
            question.save()
            res.json({result, success: true, msg: 'Thank you for your downVote.'})
          }
          // res.json({result, success: true, msg: 'Thank you for your vote.'})
        })
      }
    }
  })

  // Question.findById(req.params.id, (error, question) => {
  //   if (error) res.json({error})
  //   // let exist = question.votes.some(data => data.votedBy == req.body.userActive)
  //   console.log('*****');
  //   console.log(req.body.votes.vote);
  //   exist = question.votes.some(data => data.votedBy == req.body.userActive)
  //
  //   console.log('Cek status vote');
  //   console.log(exist);
  //   if (exist) {
  //     res.json({
  //       statusVote: false,
  //       message: 'You have already voted'
  //     })
  //   } else {
  //     question.votes.push(req.body.votes)
  //     if (req.body.votes.vote == 1) {
  //       question.voteCounts = question.votes.length
  //       console.log('cek voteCounts question');
  //       console.log(question.voteCounts);
  //       question.save((err, record) => {
  //         if (err) res.json({err})
  //         console.log(record);
  //         res.json({
  //           statusVote: err == null ? true : false,
  //           message: 'Upvote questions success'
  //         })
  //       })
  //     }
  //     else {
  //       question.voteCounts -= 1
  //       console.log('cek voteCounts question');
  //       console.log(question.voteCounts);
  //       question.save((err, record) => {
  //         if (err) res.json({err})
  //         console.log(record);
  //         res.json({
  //           statusVote: err == null ? true : false,
  //           message: 'Donwvote question success'
  //         })
  //       })
  //     }
  //   }
  // })
}

methods.voteToAnswer = (req, res) => {
  let questionid = req.params.questionid
  Question.findById(questionid, (error, question) => {
    if (error) res.json({msg: `Oopps, Something wrong ${error}`, success:false})
    else {
      let detailVote = []
      let answer = question.answers.id(req.params.answerid)
      if (req.body.vote == 1) {
        answer.votes.filter(voteX => {
          if (voteX.vote == 1) {
            console.log('Votex 1');
            console.log(voteX);
            return detailVote.push(voteX)
          }
        })
      } else if (req.body.vote == -1) {
        answer.votes.filter(voteX => {
          if (voteX.vote == -1) {
            console.log('Votex -1');
            console.log(voteX);
            return detailVote.push(voteX)
          }
        })
      }
      console.log('++++');
      console.log(detailVote);
      if (detailVote.some(vote => vote.votedBy == req.body.votedBy)) {
        res.json({msg: 'Oopps, You have already vote this answer', success: false})
      } else {
        Question.findOneAndUpdate({ _id: questionid, 'answers._id': req.params.answerid},
        { $push: {'answers.$.votes': {votedBy: req.body.votedBy, vote: req.body.vote } }},
        { new: true}, (err, result) => {
          if (err) res.json({msg: `Oopps, Something wrong ${err}`, success: false})
          console.log('*** result ***');
          console.log(result);
          let index = result.answers.findIndex(data => data._id == req.params.answerid)
          if (req.body.vote == 1) {
            question.answers[index].voteCounts += 1
            question.save()
            res.json({result, success: true, msg: 'Thank you for your upVote.'})
          } else if (req.body.vote == -1) {
            question.answers[index].voteCounts -= 1
            question.save()
            res.json({result, success: true, msg: 'Thank you for your downVote.'})
          }
          // res.json({result, success: true, msg: 'Thank you for your vote.'})
        })
      }
    }
  })

  // Question.findById(req.params.questionid, (error, question) => {
  //   if (error) res.json({error})
  //   let index = question.answers.findIndex(data => data._id == req.params.answerid)
  //   console.log('ini index answer');
  //   console.log(index);
  //   let exist = question.answers[index].votes.some(data => data.votedBy == req.body.userActive)
  //
  //   console.log('Cek status vote');
  //   console.log(exist);
  //   if (exist) {
  //     res.json({
  //       statusVote: false,
  //       message: 'You have already voted'
  //     })
  //   } else {
  //     question.answers[index].votes.push(req.body.votes)
  //     if (req.body.votes.vote == 1) {
  //       question.answers[index].voteCounts = question.answers[index].votes.length
  //       console.log('cek voteCounts anwer');
  //       console.log(question.answers[index].voteCounts);
  //       question.save((err, record) => {
  //         if (err) res.json({err})
  //         console.log(record);
  //         res.json({
  //           statusVote: err == null ? true : false,
  //           message: 'Upvote answer success'
  //         })
  //       })
  //     } else if (req.body.votes.vote == -1){
  //       question.answers[index].voteCounts -= 1
  //       console.log('cek voteCounts anwer');
  //       console.log(question.answers[index].voteCounts);
  //       question.save((err, record) => {
  //         if (err) res.json({err})
  //         console.log(record);
  //         res.json({
  //           statusVote: err == null ? true : false,
  //           message: 'Downvote answer success'
  //         })
  //       })
  //     }
  //   }
  // })
}

methods.updateQuestion = (req, res) => {
  Question.findById(req.params.id)
  .populate('askedBy votes votes.votedBy answers answers.answeredBy answers.votes.votedBy')
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