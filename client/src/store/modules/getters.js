export const Getters = {
  isLogin: (state) => {
    return window.localStorage.getItem('token')
  },
  dataTags: (state) => {
    return state.dataTags
  },
  dataQuestions: (state) => {
    return state.dataQuestions
  }
}