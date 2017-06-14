export const Mutations = {
  signIn: (state, payload) => {
    window.localStorage.setItem('token', payload.token)
    window.localStorage.setItem('user', payload.username)
    window.localStorage.setItem('id', payload.id)
    window.localStorage.setItem('login_method', 'local');
    state.user.push(payload)
    window.location = "/"
  },
  signUp: (state, payload) => {
    state.user.push(payload)
  },
  dataTags: (state, payload) => {
    state.dataTags = payload
  },
  dataQuestions: (state, payload) => {
    state.dataQuestions = payload
  },
  detailQuestion: (state, payload) => {
    state.detailQuestion = payload
  },
  addQuestion: (state, payload) => {
    state.dataQuestions.push(payload)
  },
  editQuestion: (state, payload) => {
    state.dataQuestions = payload

    // var questions = state.dataQuestions
    // questions.splice(questions.indexOf(payload.id), 1)
    // state.dataQuestions = questions
    // state.newQuestion = payload
  },
  deleteQuestion: (state, payload) => {
    // state.dataQuestions = payload

    let newQuestions = state.dataQuestions.filter(question => question._id !== payload._id)
    console.log('its  newQuestions ', newQuestions);
    console.log('its state question', state.dataQuestions);
    state.dataQuestions = newQuestions
  },
  addAnswer: (state, payload) => {
    state.detailQuestion = payload
  },
  editAnswer: (state, payload) => {
    state.detailQuestion = payload
  },
  deleteAnswer: (state, payload) => {
    state.detailQuestion = payload
    // let newAnswers = state.detailQuestion.answers.filter(answer => answer._id !== payload.answerid)
    // console.log('its  newAnswers ', newAnswers);
    // console.log('its state answer', state.detailQuestion.answers);
    // state.detailQuestion.answers = newAnswers

    // let answers = state.detailQuestion
    // answers.splice(answers.indexOf(payload.answerid), 1)
  },
  convertDate: (state, payload) => {
    let getDate = new Date(payload);
    let month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    let monthTeks = month[getDate.getMonth()];
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    let days = weekday[getDate.getDay()];
    let year = String(getDate.getFullYear());
    let date = String(getDate.getDate());
    if(date.length === 1) {
      date = '0' + date;
    }
    let data = `${days}, ${date} ${monthTeks} ${year}`;
    console.log(`di mutation: ${days}, ${date} ${monthTeks} ${year}`);
    state.dateConvert = data
  },
  convertTime: (state, payload) => {
    let getDate = new Date(payload);
    let hour = String(getDate.getHours());
    if(hour.length === 1) {
      hour = '0' + hour;
    }
    let minute = String(getDate.getMinutes());
    if(minute.length === 1) {
      minute = '0' + minute;
    }
    let data = `${hour}:${minute}`;
    console.log('ini data: ', data);
    state.timeConvert = data
  }
}