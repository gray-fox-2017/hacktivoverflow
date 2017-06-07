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
  }
}