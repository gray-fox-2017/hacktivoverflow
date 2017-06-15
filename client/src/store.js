import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
      is_login:false,
      list_question:[],
      detil_question:{},
      answersByQuestion:[]
    },
    //////////////////////////
        //GETTERS//
    ///////////////////////
    getters:{
      isLogin(state){
        return state.is_login
      },
      listQuestion(state){
        return state.list_question;
      },
      detil_question(state){
        return state.list_question;
      },
      questioner(state){
        return state.list_question;
      },
      answersByQuestion(state){
        return state.answersByQuestion;
      },
      listQuestionByUser(state){
        let list=state.list_question.filter(function(question){
          return question.asked_by.username===window.localStorage.getItem('user')
        })
        return list

        console.log('asdfsadf========',this.listQuestion);
      }
    },
    //////////////////////////
        //MUTATATIONS//
    ///////////////////////
    mutations:{
      changeIsLogin(state,value){
        state.is_login=value
      },
      getListQuestion(state,list){
        state.list_question=list
      },
      getDetilQuestion(state,list){
        state.list_question=list
        state.answersByQuestion=list.answers
      },
      addAnswer(state,dataAnswers){
        state.answersByQuestion=dataAnswers
      },
      deleteAnswer(state,id,index){
        state.answersByQuestion.splice(index,1);
      }
    },
    //////////////////////////
        //ACTIONS//
    ///////////////////////
    actions:{
      changeIsLogin({commit},value){
        commit('changeIsLogin',value)
      },
      getListQuestion({commit}){
        let self = this
        let token = window.localStorage.getItem('token');
        axios.get('http://localhost:3000/questions',{
          headers:{
            token:token
          }
        })
        .then(response =>{
          commit('getListQuestion',response.data)
        })
      },
      getDetilQuestion({commit},id){
        let token = window.localStorage.getItem('token');
        axios.get(`http://localhost:3000/questions/${id}`,{
          headers:{
            token:token
          }
        })
        .then(response =>{
          commit('getDetilQuestion',response.data)
        })
      }
    }
})
