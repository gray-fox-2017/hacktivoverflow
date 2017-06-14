const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();
let Question = require('../models/question');
let questionCtrl = require('../controllers/questionCtrl');
const server = require('../app');

describe('Question', () => {
  console.log('masuk question')
  let _token;
  let _token2;
  let _id;
  let _id2;

  let _qid;
  let _qid2;
  let _qid3;
  let _qid4;

  let title = 'Title 1';
  let title2 = 'Title 2';
  let title3 = 'Title 3';
  let descr = 'Descr 1 dari user1';
  let descr2 = 'Descr 2 dari user1';
  let descr3 = 'Descr 3 dari user2';

  let quest = {
    title : title,
    descr : descr
  };

  let quest2 = {
    title : title2,
    descr : descr2
  };

  let quest3 = {
    title : title3,
    descr : descr3
  };

  let invalidQuest = {
    title: title,
    descr: ''
  }

  let titleUp = `${title}Updt`;
  let descrUp = `${descr}Updt`;

  before(done => {
    _token = global._token;
    _token2 = global._token2;
    _id = global._id;
    _id2 = global._id2;
    Question.remove({}, err => {done();});
  })

  describe('/GET',() => {
    it('Should get all question', done => {
      chai.request(server)
      .get(`/api/questions/`)
      .end((err,quest) => {
        if (err) done(err);
        else if (quest.body.hasOwnProperty('err')) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('array');
          quest.body.length.should.eql(0);
          done();
        }
      })
    })
  })

  describe('/POST',() => {
    it('Should create Question1', done => {
      console.log('=============================q2')
      // console.log(quest)

      chai.request(server)
      .post(`/api/questions/`)
      .set('token',_token)
      .send(quest)
      .end((err,quest) => {
        if (err) done(err);
        else if (quest.body.hasOwnProperty('err')) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          quest.body.should.have.property('title',title);
          quest.body.should.have.property('descr',descr);
          quest.body.should.have.property('_user',_id);
          quest.body.should.have.property('_id');
          _qid = quest.body._id;
          done();
        }
      })
    });
    it('Should create Question2', done => {
      chai.request(server)
      .post(`/api/questions/`)
      .send(quest2)
      .set('token',_token2)
      .end((err,quest) => {
        if (err) done(err);
        else if (quest.body.hasOwnProperty('err')) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          quest.body.should.have.property('title',title2);
          quest.body.should.have.property('descr',descr2);
          quest.body.should.have.property('_user',_id2);
          quest.body.should.have.property('_id');
          _qid2 = quest.body._id;
          done();
        }
      })
    });
    it('Should create Question3', done => {
      chai.request(server)
      .post(`/api/questions/`)
      .send(quest3)
      .set('token',_token2)
      .end((err,quest) => {
        if (err) done(err);
        else if (quest.body.hasOwnProperty('err')) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          quest.body.should.have.property('title',title3);
          quest.body.should.have.property('descr',descr3);
          quest.body.should.have.property('_user',_id2);
          quest.body.should.have.property('_id');
          _qid3 = quest.body._id;
          done();
        }
      })
    });
    it('Shouldnt create Question -incompleteDt', done => {
      chai.request(server)
      .post(`/api/questions/`)
      .send(invalidQuest)
      .set('token',_token)
      .end((err,quest) => {
        if (err) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          quest.body.should.have.property('err');
          done();
        }
      })
    })

    it('Shouldnt create Question -notLogin ', done => {
      chai.request(server)
      .post(`/api/questions/`)
      .send(quest)
      .end((err,quest) => {
        if (err) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          quest.body.should.have.property('err');
          done();
        }
      })
    })
  });



  describe('/PUT/:id',() => {
    it('Should update Question', done => {
      chai.request(server)
      .put(`/api/questions/${_qid}`)
      .set('token',_token)
      .send({title:titleUp,descr:descrUp})
      .end((err,quest) => {
        if (err) done(err);
        else if (quest.body.hasOwnProperty('err')) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          quest.body.should.have.property('title',titleUp);
          quest.body.should.have.property('descr',descrUp);
          quest.body.should.have.property('_user',_id);
          quest.body.should.have.property('_id');
          done();
        }
      })
    })
    it('Shouldnt update Question -incompleteDt', done => {
      chai.request(server)
      .put(`/api/questions/${_qid}`)
      .send(invalidQuest)
      .end((err,quest) => {
        if (err) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          quest.body.should.have.property('err');
          done();
        }
      })
    })
    it('Shouldnt update Question -notLogin', done => {
      chai.request(server)
      .put(`/api/questions/${_qid}`)
      .send(quest)
      .end((err,quest) => {
        if (err) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          quest.body.should.have.property('err');
          done();
        }
      })
    })
    it('Shouldnt update Question -invalidId ', done => {
      chai.request(server)
      .put(`/api/questions/${_qid}telolet`)
      .send(quest)
      .end((err,quest) => {
        if (err) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          quest.body.should.have.property('err');
          done();
        }
      })
    })
  })

  //vote
  describe('/POST/:id',() => {
    it('Should vote question', done => {
      chai.request(server)
      .post(`/api/questions/${_qid}`)
      .set('token',_token)
      .send({vote:-1})
      .end((err,quest) => {
        if (err) done(err);
        else if (quest.body.hasOwnProperty('err')) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          done();
        }
      })
    })
    it('Shouldnt vote question -notLogin ', done => {
      chai.request(server)
      .post(`/api/questions/${_qid}`)
      .send({vote:-1})
      .end((err,quest) => {
        if (err) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          quest.body.should.have.property('err');
          done();
        }
      })
    })
    it('Shouldnt vote question -invalidId ', done => {
      chai.request(server)
      .post(`/api/questions/${_qid}telolet`)
      .send({vote:-1})
      .set('token',_token)
      .end((err,quest) => {
        if (err) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          quest.body.should.have.property('err');
          done();
        }
      })
    })
    it('Shouldnt vote question -alreadyVote', done => {
      chai.request(server)
      .post(`/api/questions/${_qid}`)
      .send({vote:1})
      .set('token',_token)
      .end((err,quest) => {
        if (err) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          quest.body.should.have.property('err');
          done();
        }
      })
    })
  })

  describe('/GET/:id',() => {
    it('Should get QuestionById', done => {
      chai.request(server)
      .get(`/api/questions/${_qid2}`)
      .send(quest)
      .end((err,quest) => {
        if (err) done(err);
        else if (quest.body.hasOwnProperty('err')) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          quest.body.should.have.property('title',title2);
          quest.body.should.have.property('descr',descr2);
          quest.body.should.have.property('_id',_qid2);
          done();
        }
      })
    })
    it('Shouldnt get QuestionById -invalidId ', done => {
      chai.request(server)
      .get(`/api/questions/${_qid2}telolet`)
      .send(quest)
      .end((err,quest) => {
        if (err) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          quest.body.should.have.property('err');
          done();
        }
      })
    })
  })

  describe('/DELETE/:id',() => {
    it('Should delete Question', done => {
      chai.request(server)
      .delete(`/api/questions/${_qid}`)
      .set('token',_token)
      .end((err,quest) => {
        // console.log(quest.body)
        if (err) done(err);
        else if (quest.body.hasOwnProperty('err')) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          quest.body.should.have.property('title',titleUp);
          quest.body.should.have.property('descr',descrUp);
          quest.body.should.have.property('_user',_id);
          quest.body.should.have.property('_id',_qid);
          done();
        }
      })
    })
    it('Shouldnt delete Question -invalidId  ', done => {
      chai.request(server)
      .delete(`/api/questions/${_qid2}telolet`)
      .set('token',_token2)
      .end((err,quest) => {
        if (err) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          quest.body.should.have.property('err');
          done();
        }
      })
    })
    it('Shouldnt delete Question -notLogin ', done => {
      chai.request(server)
      .delete(`/api/questions/${_qid2}`)
      .end((err,quest) => {
        if (err) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          quest.body.should.have.property('err');
          done();
        }
      })
    })
    it('Shouldnt delete Question -notAuthor ', done => {
      chai.request(server)
      .delete(`/api/questions/${_qid2}`)
      .set('token',_token)
      .end((err,quest) => {
        //
        // console.log(_id)
        // console.log(_qid2);
        // console.log(err);
        // console.log(quest.body)
        if (err) done(err);
        else {
          quest.should.have.status(200);
          quest.body.should.be.a('object');
          quest.body.should.have.property('err');
          done();
        }
      })
    })
  })


  after(done => {
    global._qid = _qid2; //user1 - lycaa
    global._qid2 = _qid3; //user2 - meyer
    done();
  })
});