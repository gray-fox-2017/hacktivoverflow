<template>
  <div class="thread" style="margin:0px 15%">
    <h3 style="margin-left:40px"> Thread > </h3>
    <question-one
      :id="id"
      :thread="thread"
      @edit="editQ"
      @reply="replyQ"
      @remove="removeQ"
      :user="currUser"
      @vote="voteQ"
      ></question-one>
    <hr/>
    <frm-save-question
      :question="questionInForm"
      @submit="saveFrmQ"
      @reset="resetFrmQ"
    >
    </frm-save-question>
    <hr/>
    <answer-list
      :id="id"
      @edit="editA"
      @remove="removeA"
      @vote="voteA"
      :answers="answers"
      :user="currUser"
    >
    </answer-list>
    <frm-save-answer
      :answer="answerInForm"
      @submit="saveFrmA"
      @reset="resetFrmA"
    >
    </frm-save-answer>
  </div>
</template>
<script>
  import AnswerList from './thread/AnswerList';
  import QuestionOne from './thread/QuestionOne';
  import FrmSaveQuestion from './thread/FrmSaveQuestion';
  import FrmSaveAnswer from './thread/FrmSaveAnswer';
  const initialData = {
    question :
    {
      _id: null,
      title: '',
      descr: ''
    },
    answer :
    {
      _id: null,
      _question: null,
      descr: ''
    }
  }

  export default {
    props: ['id'],
    components: {
      AnswerList,
      QuestionOne,
      FrmSaveQuestion,
      FrmSaveAnswer
    },
    data () {
      return {
        token: localStorage.getItem('token'),
        currUser: {},
        initialData : {},
        thread: {},
        answers: [],
        answerInForm: initialData.answer,
        questionInForm: initialData.question
      }
    },
    created: function() {
      this.id = this.$route.params.id;

      // this.questionInForm =  ;
      // this.answerInForm = initialData.answer;
      this.getCurrentUser();
      this.getThread();
      this.getAnswers();
      this.axios.defaults.headers.common['token'] = this.token;
    },
    methods: {
      voteQ(vote) {
        // console.log('voteQ')
        let _self = this;
        _self.axios.post(`http://localhost:3000/api/questions/${vote._qid}`,{vote:vote.vote})
        .then( res => {
          if (typeof res.data.err === 'undefined') this.getThread();
          else alert(`${res.data.err}`);
        })
        .catch(err=> console.log(err));

      },
      voteA(vote) {
        // console.log('voteA')
        let _self = this;
        _self.axios.post(`http://localhost:3000/api/answers/${vote._aid}`,{vote:vote.vote})
        .then( res => {
          if (typeof res.data.err === 'undefined') this.getAnswers();
          else alert(`${res.data.err}`);
        })
        .catch(err=> console.log(err));
      },
      getThread() {
        // console.log('getOne')
        let _self = this;
        _self.axios.get(`http://localhost:3000/api/questions/qheader/${this.id}`)
        .then( res => {
          _self.thread = (typeof res.data === 'undefined' ? [] : res.data);
        })
        .catch(err=> console.log(err));

      },
      replyQ(_qid) {
        this.answerInForm._question = _qid;
        console.log('reply to '+_qid);
      },
      removeA(_aid) {
        let _confirm = confirm('Are you sure to delete your answer? ');
        let _self = this;
        if (_confirm) {
          _self.axios
          .delete(`http://localhost:3000/api/answers/${_aid}`)
          .then( res => {
            console.log('ea')
            if (res.data) this.getAnswers();
            else {
              console.log('failed')
            }
          });
        }
      },
      removeQ(_qid) {
        console.log(_qid)
        let _confirm = confirm('Are you sure to delete your question? ');
        let _self = this;
        if (_confirm) {
          _self.axios
          .delete(`http://localhost:3000/api/questions/${_qid}`)
          .then( res => {
            console.log('ea')
            if (res.data) window.open('http://localhost:8080/#/thread','_self')
            else {
              console.log('failed')
            }
          });
        }
      },
      getAnswers() {
        let _self = this;
        _self.axios.get(`http://localhost:3000/api/answers/question/${this.id}`)
        .then( res => {
          if (res.data) _self.answers = (typeof res.data === 'undefined' ? [] : res.data);
        })
        .catch(err=> console.log(err));
      },
      getCurrentUser() {
        let _self = this;
        let user = {};
        _self.axios
        .post('http://localhost:3000/token', {
          token: _self.token
        })
        .then( res => {
          if (res.data) {
            user = res.data;
            user.token = _self.token;
            _self.currUser = user;
          } else
            localStorage.removeItem('token');
        });
      },
      editQ(question) {
        // console.log(question)
        question._id = this.id;
        this.questionInForm  = {...question};
      },
      editA(answer) {

        answer._question = this.id;
        console.log({...answer})
        this.answerInForm  = {...answer};
      },
      saveFrmQ(question) {
        let _self = this;
        _self.axios
        .put(`http://localhost:3000/api/questions/${this.id}`, question)
        .then( res => {
          if (typeof res.data.err === 'undefined'){
            this.getThread();
            this.resetFrmQ();
          }
          else {
            console.log('failed to save')
            alert(`${res.data.err}`);
          }
        });

        // console.log(question)
      },
      saveFrmA(answer) {
        let _self = this;
        if (answer._id === null) {
          _self.axios
          .post(`http://localhost:3000/api/answers/`, answer)
          .then( res => {
            // console.log('ea')
            if (typeof res.data.err === 'undefined'){
              this.getAnswers();
              this.resetFrmA();
            }
            else {
              console.log('failed')
              alert(`${res.data.err}`)
              // localStorage.removeItem('token');
            }
          });
        } else {
          _self.axios
          .put(`http://localhost:3000/api/answers/${answer._id}`, answer)
          .then( res => {
            if (typeof res.data.err === 'undefined'){
              this.getAnswers();
              this.resetFrmA();
            }
            else {
              console.log('failed to save')
              alert(`${res.data.err}`);
            }
          });
        }
        // console.log(answer)
      },
      resetFrmQ() {
        this.questionInForm = initialData.question;
      },
      resetFrmA() {
        this.answerInForm = initialData.answer;
      }

    }
  }


</script>
<style scope>
  /*.md-fab, .md-fab:hover {
    background-color: rgba(102, 98, 98, 0.85);
  }*/
  button.gray{
    background-color: 'dimgray'
  }
  .red: {
    background-color: 'red'
  }
  .green : {
    background-color: 'green'
  }
</style>