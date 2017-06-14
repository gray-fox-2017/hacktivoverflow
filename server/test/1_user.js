const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
let should = chai.should();
let User = require('../models/user');
let userCtrl = require('../controllers/userCtrl');
const server = require('../app');

describe('User', () => {
  let username = 'poppy';
  let password = 'poppypassword';
  let user = {
    username: username,
    password: password
  }

  let username2 = 'lycaa';
  let password2 = 'lycaapassword';
  let password2updt = 'lycaapasswordupd';
  let user2 = {
    username: username2,
    password: password2
  }

  let username4 = 'meyer';
  let password4 = 'meyerpassword';
  let user4 = {
    username: username4,
    password: password4
  }

  let username3 = 'juminten';
  let userIncomplete = {
    password: '',
    username:''
  }

  let wrongpassword = 'jumintenpassword';
  let userWrongPassword = {
    username: username,
    password: wrongpassword
  }

  /* */
  let _id;
  let _id2;
  let _id3;
  let _token = '';
  let _token2 = '';

  before(done => {
    User.remove({}, err=>{done();});
  })

  describe('/POST',() => {
    it('Should create new User',(done) => {
      chai.request(server)
      .post('/api/users')
      .send(user)
      .end((err,user) => {
        if (err) done(err);
        else if (user.body.hasOwnProperty('err')) done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('username',username);
          user.body.should.have.property('password');
          user.body.should.have.property('_id');
          _id = user.body._id;
          done();
        }
      });
    });

    it('Should create new User 2',(done) => {
      chai.request(server)
      .post('/api/users')
      .send(user2)
      .end((err,user) => {
        if (err) done(err);
        else if (user.body.hasOwnProperty('err')) done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('username',username2);
          user.body.should.have.property('password');
          user.body.should.have.property('_id');
          _id2 = user.body._id;
          // console.log('_id user2 :'+_id2)
          done();
        }
      });
    });

    it('Should create new User 3',(done) => {
      chai.request(server)
      .post('/api/users')
      .send(user4)
      .end((err,user) => {
        if (err) done(err);
        else if (user.body.hasOwnProperty('err')) done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('username',username4);
          user.body.should.have.property('password');
          user.body.should.have.property('_id');
          _id3 = user.body._id;
          done();
        }
      });
    });

    it('Shouldnt create new User - duplicate ',(done) => {
      chai.request(server)
      .post('/api/users')
      .send(user2)
      .end((err,user) => {
        if (err) done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('err');
          done();
        }
      });
    })

    it('Shouldnt create new User - incompleteDt ',(done) => {
      chai.request(server)
      .post('/api/users')
      .send(user2)
      .end((err,user) => {
        if (err) done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('err');
          done();
        }
      });
    })

  });

  describe('/GET',() => {
    it('Should get all user',(done) => {
      chai.request(server)
      .get(`/api/users/`)
      .end((err,user) => {
        if (err) done(err);
        else if (user.body.hasOwnProperty('err')) done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('array');
          done();
        }
      })
    })
  })

  describe('/GET:id',() => {
    it('Should get userById',(done) => {
      chai.request(server)
      .get(`/api/users/${_id}`)
      .set('token',_token)
      .end((err,user) => {
        if (err) done(err);
        else if (user.body.hasOwnProperty('err')) done(err);
        else {
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('_id').eql(_id);
          done();
        }
      })
    });

    it('Shouldnt get userById - invalidId',(done) => {
      chai.request(server)
      .get(`/api/users/${_id}telolet`)
      .end((err,user) => {
        if (err) done(err);
        else {
          user.should.have.status(200);
          user.body.should.have.property('err');
          done();
        }
      });
    });
  })

  describe('/PUT:id',() => {
    it('Should update User',(done) => {
      user2.password = password2updt;
      // console.log(user2);
      // console.log(_id);
      // console.log('--------------------')
      chai.request(server)
      .put(`/api/users/${_id2}`)
      .send(user2)
      .end((err,user) => {
        // console.log(user.body)
        if (err) done(err);
        else if (user.body.hasOwnProperty('err')) done(err);
        else {
          user.should.have.status(200);
          // user.body.should.have.property('username',username2updt);
          done();
        }
      });
    });

    it('Shouldnt update User - incompleteDt ',(done) => {
      chai.request(server)
      .put(`/api/users/${_id2}`)
      .send({password:''})
      .end((err,user) => {
        if (err) done(err);
        else {
          user.should.have.status(200);
          user.body.should.have.property('err');
          done();
        }
      });
    })

    it('Shouldnt update User - invalidId ',(done) => {
      chai.request(server)
      .put(`/api/users/${_id2}telolet`)
      .send({username: username})
      .end((err,user) => {
        if (err) done(err);
        else {
          user.should.have.status(200);
          user.body.should.have.property('err');
          done();
        }
      });
    })

  })

  describe('/POST login',() => {
    it('Should login user2',(done) => {
      chai.request(server)
      .post('/login')
      .send(user2)
      .end((err,user)=>{
        // console.log(user.body)
        if (err) done(err);
        else if (user.body.hasOwnProperty('err')) done(err);
        else {
          _token = user.body.token;
          // console.log('token: '+_token)
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('token');
          done();
        }
      });
    });

    it('Should login user4',(done) => {
      chai.request(server)
      .post('/login')
      .send(user4)
      .end((err,user)=>{
        if (err) done(err);
        else if (user.body.hasOwnProperty('err')) done(err);
        else {
          _token2 = user.body.token;

          // console.log('token2: '+_token2)
          user.should.have.status(200);
          user.body.should.be.a('object');
          user.body.should.have.property('token');
          done();
        }
      });
    });

    it('Shouldnt login user - invalid password',(done) => {
      chai.request(server)
      .post('/login')
      .send(userWrongPassword)
      .end((err,user)=>{
        if (err) done(err);else {
          user.should.have.status(200);
          user.body.should.have.property('err');
          done();
        }
      });
    })

    it('Shouldnt login user - incompletedt',(done) => {
      // console.log(userIncomplete)
      chai.request(server)
      .post('/login')
      .send(userIncomplete)
      .end((err,user) =>{
        if (err) done(err);
        else {
          user.should.have.status(200);
          user.body.should.have.property('err');
          done();
        }
      });
    })
  })

  describe('/DELETE:id',() => {
    it('Should delete UserbyId',(done) => {
      chai.request(server)
      .delete(`/api/users/${_id}`)
      .end((err,user) => {
        if (err) done(err);
        else if (user.body.hasOwnProperty('err')) done(err);
        else {
          user.should.have.status(200);
          user.body.should.have.property('_id',_id);
          done();
        }
      });
    })

    it('Shouldnt delete UserbyId - Invalid Id',(done) => {
      chai.request(server)
      .delete(`/api/users/${_id}telolet`)
      .end((err,user) => {
        if (err) done(err);
        else {
          user.should.have.status(200);
          user.body.should.have.property('err');
          done();
        }
      });
    })
  })



  after((done) => {
    global._token = _token;
    global._token2 = _token2;
    global._id = _id2;
    global._id2 = _id3;
    console.log(`token : ${global._token}`);
    console.log(`id : ${global._id}`)
    done();
  });

});
