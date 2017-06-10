import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
      list_question : [],
      token:''
    },
    getters:{
      getToken(state){
        return state.token
      },
      getListQuestion(state){
        return state.list_question;
      }
    },
    mutations:{
      changeToken(state,token){
        state.token=token
      },
      getListQuestion(state,list){
        state.list_question=list
      }
    },
    actions:{
      changeToken({commit}){
        commit('changeToken',window.localStorage.getItem('token'))
      }
    }

})
