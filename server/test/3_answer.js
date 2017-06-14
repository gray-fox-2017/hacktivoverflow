const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();
let Answer = require('../models/answer');
let answerCtrl = require('../controllers/answerCtrl');
const server = require('../app');

describe('Answer', () => {
  let _token;
  let _token2;
  let _id;
  let _id2;
  let _qid;
  let _qid2;

  let _ans;
  let _ans2;
  let _ans3;
  let _ans4;

  let descr = 'Answer Descr 1 dari user1';
  let descr2 = 'Answer Descr 2 dari user2';
  let descr3 = 'Answer Descr 3 dari user2';
  let descr4 = 'Answer Descr 4 dari user1';

  let ans = {
    descr : descr
  };

  let ans2 = {
    descr : descr2,
  };

  let ans3 = {
    descr : descr3
  };


  let ans4 = {
    descr : descr4
  };

  let invalidAns = {
    descr: ''
  }

  let descrUp = `${descr}Updt`;

  before(done => {
    _token = global._token;
    _token2 = global._token2;
    _id = global._id;
    _id2 = global._id2;
    _qid = global._qid;
    _qid2 = global._qid2;


    // console.log('global\n\n');
    // console.log(global);

    ans._question = _qid;
    ans2._question = _qid2;
    ans3._question = _qid2;
    ans4._question = _qid;

    console.log(ans);


    Answer.remove({}, err => {done();});
  })

  describe('/GET',() => {
    it('Should get all answer', done => {
      chai.request(server)
      .get(`/api/answers/`)
      .end((err,ans) => {
        if (err) done(err);
        else if (ans.body.hasOwnProperty('err')) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('array');
          ans.body.length.should.eql(0);
          done();
        }
      })
    })
  })

  describe('/POST',() => {
    it('Should create Answer1', done => {
      // console.log(ans)
      chai.request(server)
      .post(`/api/answers/`)
      .set('token',_token)
      .send(ans)
      .end((err,ans) => {
        // console.log(err);
        // console.log('====================================1');
        // console.log(ans.body.err);
        if (err) done(err);
        else if (ans.body.hasOwnProperty('err')) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('descr',descr);
          ans.body.should.have.property('_user',_id);
          ans.body.should.have.property('_id');
          _ans = ans.body._id;
          done();
        }
      })
    });
    it('Should create Answer2', done => {
      chai.request(server)
      .post(`/api/answers/`)
      .send(ans2)
      .set('token',_token2)
      .end((err,ans) => {
        if (err) done(err);
        else if (ans.body.hasOwnProperty('err')) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('descr',descr2);
          ans.body.should.have.property('_user',_id2);
          ans.body.should.have.property('_id');
          _ans2 = ans.body._id;
          done();
        }
      })
    });

    it('Should create Answer3', done => {
      chai.request(server)
      .post(`/api/answers/`)
      .send(ans3)
      .set('token',_token2)
      .end((err,ans) => {
        if (err) done(err);
        else if (ans.body.hasOwnProperty('err')) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('descr',descr3);
          ans.body.should.have.property('_user',_id2);
          ans.body.should.have.property('_id');
          _ans3 = ans.body._id;
          done();
        }
      })
    });

    it('Should create Answer4', done => {
      chai.request(server)
      .post(`/api/answers/`)
      .send(ans4)
      .set('token',_token)
      .end((err,ans) => {
        if (err) done(err);
        else if (ans.body.hasOwnProperty('err')) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('descr',descr4);
          ans.body.should.have.property('_user',_id);
          ans.body.should.have.property('_id');
          _ans4 = ans.body._id;
          done();
        }
      })
    });

    it('Shouldnt create Answer -incompleteDt', done => {
      chai.request(server)
      .post(`/api/answers/`)
      .send(invalidAns)
      .set('token',_token)
      .end((err,ans) => {
        if (err) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('err');
          done();
        }
      })
    })

    it('Shouldnt create Answer -notLogin ', done => {
      chai.request(server)
      .post(`/api/answers/`)
      .send(ans)
      .end((err,ans) => {
        if (err) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('err');
          done();
        }
      })
    })
  });



  describe('/PUT/:id',() => {

    it('Should update Answer', done => {
      chai.request(server)
      .put(`/api/answers/${_ans3}`)
      .set('token',_token2)
      .send({descr:descrUp})
      .end((err,ans) => {
        if (err) done(err);
        else if (ans.body.hasOwnProperty('err')) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('descr',descrUp);
          ans.body.should.have.property('_user',_id2);
          ans.body.should.have.property('_id',`${_ans3}`);
          done();
        }
      })
    })

    it('Shouldnt update Answer -incompleteDt', done => {
      chai.request(server)
      .put(`/api/answers/${_ans3}`)
      .set('token',_token2)
      .send(invalidAns)
      .end((err,ans) => {
        if (err) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('err');
          done();
        }
      })
    })

    it('Shouldnt update Answer -notLogin', done => {
      chai.request(server)
      .put(`/api/answers/${_ans3}`)
      .send(ans)
      .end((err,ans) => {
        if (err) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('err');
          done();
        }
      })
    })
    it('Shouldnt update Answer -invalidId ', done => {
      chai.request(server)
      .put(`/api/answers/${_ans}telolet`)
      .send(ans)
      .end((err,ans) => {
        if (err) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('err');
          done();
        }
      })
    })

    it('Shouldnt update Answer -notAuthorized ', done => {
      chai.request(server)
      .put(`/api/answers/${_ans4}`)
      .set('token',_token2)
      .send(ans)
      .end((err,ans) => {
        if (err) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('err');
          done();
        }
      })
    })


  })

  //vote
  describe('/POST/:id',() => {
    it('Should vote answer', done => {
      chai.request(server)
      .post(`/api/answers/${_ans}`)
      .set('token',_token)
      .send({vote:-1})
      .end((err,ans) => {
        if (err) done(err);
        else if (ans.body.hasOwnProperty('err')) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          done();
        }
      })
    })

    it('Should vote answer', done => {
      chai.request(server)
      .post(`/api/answers/${_ans}`)
      .set('token',_token2)
      .send({vote:1})
      .end((err,ans) => {
        if (err) done(err);
        else if (ans.body.hasOwnProperty('err')) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          done();
        }
      })
    })

    it('Shouldnt vote answer -notLogin ', done => {
      chai.request(server)
      .post(`/api/answers/${_ans}`)
      .send({vote:-1})
      .end((err,ans) => {
        if (err) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('err');
          done();
        }
      })
    })

    it('Shouldnt vote answer -invalidId ', done => {
      chai.request(server)
      .post(`/api/answers/${_ans}telolet`)
      .send({vote:-1})
      .set('token',_token)
      .end((err,ans) => {
        if (err) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('err');
          done();
        }
      })
    })

    it('Shouldnt vote answer -alreadyVote', done => {
      chai.request(server)
      .post(`/api/answers/${_ans}`)
      .send({vote:1})
      .set('token',_token)
      .end((err,ans) => {
        if (err) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('err');
          done();
        }
      })
    })
  })

  describe('/GET/:id',() => {
    it('Should get AnswerById', done => {
      chai.request(server)
      .get(`/api/answers/${_ans}`)
      // .send(ans)
      .end((err,ans) => {
        if (err) done(err);
        else if (ans.body.hasOwnProperty('err')) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('descr',descr);
          ans.body.should.have.property('_user',_id);
          ans.body.should.have.property('_id',_ans);
          _qid = ans.body._id;
          done();
        }
      })
    })
    it('Shouldnt get AnswerById -invalidId ', done => {
      chai.request(server)
      .get(`/api/answers/${_ans}telolet`)
      .send(ans)
      .end((err,ans) => {
        if (err) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('err');
          done();
        }
      })
    })
  })

  describe('/DELETE/:id',() => {
    it('Should delete Answer', done => {
      chai.request(server)
      .delete(`/api/answers/${_ans3}`)
      .set('token',_token2)
      .send(ans)
      .end((err,ans) => {
        if (err) done(err);
        else if (ans.body.hasOwnProperty('err')) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('descr',descrUp);
          ans.body.should.have.property('_user',_id2);
          ans.body.should.have.property('_id',_ans3);
          done();
        }
      })
    })
    it('Shouldnt delete Answer -invalidId  ', done => {
      chai.request(server)
      .delete(`/api/answers/${_ans}telolet`)
      .set('token',_token2)
      .end((err,ans) => {
        if (err) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('err');
          done();
        }
      })
    })
    it('Shouldnt delete Answer -notLogin ', done => {
      chai.request(server)
      .delete(`/api/answers/${_ans2}`)
      .end((err,ans) => {
        if (err) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('err');
          done();
        }
      })
    })
    it('Shouldnt delete Answer -notAuthor ', done => {
      chai.request(server)
      .delete(`/api/answers/${_ans2}`)
      .set('token',_token)
      .end((err,ans) => {
        if (err) done(err);
        else {
          ans.should.have.status(200);
          ans.body.should.be.a('object');
          ans.body.should.have.property('err');
          done();
        }
      })
    })
  })


  after(done => {
    done();
  })
});