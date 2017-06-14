<template>
  <div class="thread">
    <h1>Treadlist</h1>
    <md-button v-if="token != null" @click.native.prevent="createThread">Create Thread</md-button>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head colspan="2">Thread</md-table-head>
          <md-table-head>Created Date</md-table-head>
          <md-table-head>Replies</md-table-head>
          <md-table-head>Popularity</md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-for="tl in threadList" :key="tl._id" @click.native.prevent="onClick(tl._id)">
          <md-table-cell colspan="2">
            <strong>{{tl.title}}</strong><br/>
            <p>{{tl.descr}}</p>
          </md-table-cell>
          <md-table-cell>{{tl.createdAt }} by <strong>{{tl._user.username}}</strong> </md-table-cell>
          <md-table-cell> {{tl.answerList.length}} </md-table-cell>
          <md-table-cell> ^{{tl.upVote.length}} v{{tl.downVote.length}} </md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
    <frm-save-question
      :question="questionInForm"
      @submit="saveFrmQ"
      @reset="resetFrmQ">
    </frm-save-question>

    <!-- Vue.axios.get(api).then((response) => {
  console.log(response.data)
}) -->

  </div>
</template>
<script>
  import FrmSaveQuestion from './thread/FrmSaveQuestion';
  const initialData = {
    question: {
      _id: null,
      title: '',
      descr: ''
    }
  }

  export default {
    components: {
      FrmSaveQuestion
    },
    data () {
      return {
        token: localStorage.getItem('token') || null ,
        threadList : [],
        question: 'http://localhost:3000/api/questions/qheader',
        initialData : {},
        // questionInForm: initialData
      }
    },
    created: function() {
      this.getAllThread();
      this.axios.defaults.headers.common['token'] = this.token;
      this.initialData.question =
      {
        _id: null,
        title: '',
        descr: ''
      };
      this.questionInForm =  this.initialData.question;
    },
    methods: {
      createThread(){},
      onClick(_qid) {
        console.log('called'+_qid);
        window.open(
          `http://localhost:8080/#/thread/${_qid}`,
          '_blank'
        )
      },
      resetFrmQ() {
        this.questionInForm = initialData.question;
      },
      saveFrmQ(question) {
        let _self = this;
        _self.axios
        .post(`http://localhost:3000/api/questions/`, question)
        .then( res => {
          if (typeof res.data.err === 'undefined'){
            this.getAllThread();
            this.resetFrmQ();
          }
          else {
            console.log('failed to save')
            alert(res.data.err);
          }
        });

        // console.log(question)
      },
      getAllThread() {
        let _self = this;
        _self.axios.get(_self.question)
        .then( response => {
          _self.threadList = response.data;
          console.log(_self.threadList);
        })
        .catch(err=> console.log(err));
      },
    }
  }


</script>