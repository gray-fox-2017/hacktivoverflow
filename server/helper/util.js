require('dotenv').config();
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const SECRET_KEY =  process.env.SECRET_KEY;
const page_auth = {
  // user : {
  //   hasParam: {
  //     GET: ['admin', 'id'],
  //     PUT: ['id'],
  //     DELETE: ['admin']
  //   },
  //   noParam: { GET: ['admin'] }
  // },
  // qna : {
  //   [
  //     name: '/',
  //     hasParam: {
  //       PUT: ['id'],
  //       DELETE: ['id', 'login']
  //     },
  //     noParam: { GET: ['admin'] }
  //   ],
  //   [
  //     name: '/vote',
  //     hasParam: { GET: ['login - not_id'] }
  //   ],
  //   [
  //     name: '/reply',
  //     hasParam: { POST: ['login'] }
  //   ]
  // }
}

const page_quest = {
  hasParam: ['PUT','DELETE','POST'],
  noParam: ['POST']
}

const page_ans = {
  hasParam: ['PUT','DELETE','POST'],
  noParam: ['POST']
}

const authUser = (req,res,next) => {
  let method = req.method;
  let hasParam = (req.path === '/' ? 'noParam' : 'hasParam');

  let idx = page_auth.user[hasParam].findIndex(mtd => mtd === method);
  if (idx !== -1) {
    page_auth.user[hasParam][method].forEach( (mtd) => {
      // if ()
    });

  } else res.send('ga ada akses');

}

const authQuest = (req,res,next) => {
  // console.log('auth');
  let method = req.method;
  let hasParam = (req.path === '/' ? 'noParam' : 'hasParam');
  let idx = page_quest[hasParam].findIndex(mtd => mtd === method)
  if (idx === -1) next();
  else if (req.headers.hasOwnProperty('token')) {
    // console.log('has token');
    let token = req.headers.token;
    let decoded = jwt.verify(token,SECRET_KEY);
    if (decoded) next();
  } else res.send({err:'Login first'});
}

const authAns = (req,res,next) => {
  // console.log('auth ans');
  let method = req.method;
  let hasParam = (req.path === '/' ? 'noParam' : 'hasParam');
  let idx = page_ans[hasParam].findIndex(mtd => mtd === method)
  if (idx === -1) next();
  else if (req.headers.hasOwnProperty('token')) {
    // console.log('has token');
    let token = req.headers.token;
    let decoded = jwt.verify(token,SECRET_KEY);
    // console.log('decoded\n'+ JSON.stringify(decoded) );
    if (decoded) next();
    else res.send({err:'Invalid User'})
  } else res.send({err:'Login first'});
}


const hashPassword = (password) => {
  let hashPassword = CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
  return hashPassword;
}

const getUserId = (token,callback) => {
  jwt.verify(token, SECRET_KEY, callback);

}

const getUserDetail = (token) => {
  return jwt.verify(token,SECRET_KEY);;
}

const createToken = (user_data) => {
  let token = jwt.sign(user_data, SECRET_KEY)
  return token;
}

const checkPassword = (password,hashPassword) => {
  let plainpass  = CryptoJS.AES.decrypt(hashPassword, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  return plainpass === password;
}

module.exports = {
  authUser,
  authQuest,
  authAns,
  getUserId,
  getUserDetail,
  createToken,
  checkPassword,
  hashPassword
}