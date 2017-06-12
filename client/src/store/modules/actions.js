export const Actions = {
  signIn: ({commit}, payload) => {
    axios.post('http://localhost:3000/signin', {
      username: payload.username,
      password: payload.password
    })
    .then(response => {
      console.log('Action SignIn');
      console.log(response.data);
      commit('signIn', response.data)
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  },
  signUp: ({commit}, payload) => {
    axios.post('http://localhost:3000/signup', {
      name: payload.name,
      username: payload.username,
      password: payload.password,
      email: payload.email
    })
    .then(response => {
      console.log('Action SignUp');
      console.log(response.data);
      commit('signUp', response.data)
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  },
  dataTags: ({commit}) => {
    axios.get('https://api.stackexchange.com/2.2/tags?page=1&pagesize=100&order=desc&sort=popular&site=stackoverflow')
    .then(response => {
      console.log('ini list tags di action');
      console.log(response.data.items);
      commit('dataTags', response.data.items)
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  },
  dataQuestions: ({commit}) => {
    axios.get('http://localhost:3000/allquestion')
    .then(response => {
      console.log('Action Get All Question');
      console.log(response.data);
      commit('dataQuestions', response.data)
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  },
  detailQuestion: ({commit}, payload) => {
    axios.get(`http://localhost:3000/detailquestion/${payload}`)
    .then(response => {
      console.log('Action get DetailQuestion');
      console.log(response.data);
      commit('detailQuestion', response.data)
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  },
  addQuestion: ({commit}, payload) => {
    console.log('Cek data di action: ');
    console.log(payload);
    axios.post('http://localhost:3000/createquestion/', {
      title: payload.title,
      content: payload.content,
      askedBy: payload.askedBy,
      tags: payload.tags
    })
    .then(response => {
      console.log('Action Add Question');
      console.log(response.data);
      commit('addQuestion', response.data)
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  },
  editQuestion: ({commit}, payload) => {
    axios.put(`http://localhost:3000/editquestion/${payload.id}`, {
      title: payload.title,
      content: payload.content,
      askedBy: payload.askedBy,
      tags: payload.tags
    })
    .then(response => {
      console.log('Action get EditQuestion');
      console.log(response.data);
      commit('editQuestion', response.data)
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  },
  deleteQuestion: ({commit}, payload) => {
    axios.delete(`http://localhost:3000/deletequestion/${payload}`)
    .then(response => {
      console.log('Action get deleteQuestion');
      console.log(response.data);
      commit('deleteQuestion', response.data)
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  },
  addAnswer: ({commit}, payload) => {
    axios.put(`http://localhost:3000/createAnswer/${payload.id}`, {
      answers: {
        answeredBy: payload.answeredBy,
        content:payload.content
      }
    })
    .then(response => {
      console.log('Action add new answer');
      console.log(response.data);
      commit('addAnswer', response.data)
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  },
  deleteAnswer: ({commit}, payload) => {
    axios.delete(`http://localhost:3000/deleteAnswer/${payload.questionid}/${payload.answerid}`)
    .then(response => {
      console.log('Action delete answer');
      console.log(response.data);
      commit('addAnswer', response.data)
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  },
  voteToQuestion: ({commit}, payload) => {
    axios.put(`http://localhost:3000/votequestion/${payload.id}`, {
      votedBy: payload.votedBy,
      vote: payload.vote
    })
    .then(response => {
      console.log('Action vote question');
      console.log(response.data);
      if (response.data.success != true) {
        alert(response.data.msg)
      } else {
        alert(response.data.msg)
        commit('detailQuestion', response.data)
      }
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  },
  voteToAnswer: ({commit}, payload) => {
    console.log('Cek vote to answer di action');
    console.log(payload);
    axios.put(`http://localhost:3000/voteanswer/${payload.questionid}/${payload.answerid}`, {
      votedBy: payload.votedBy,
      vote: payload.vote
    })
    .then(response => {
      console.log('Action vote answer');
      console.log(response.data);
      if (response.data.success != true) {
        alert(response.data.msg)
      } else {
        alert(response.data.msg)
        commit('detailQuestion', response.data)
      }
    })
    .catch(error => {
      console.log(error);
      console.log('error, masuk ke catch');
    })
  }
}