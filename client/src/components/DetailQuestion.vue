<template lang="html">
  <el-row :gutter="20" type="flex" class="row-bg" justify="center" v-show="statusLogin">
    <el-col :span="14">
      <div class="grid-content">
        <div style="margin-top:15px;text-align:-webkit-auto;" class="teks-bawah">
          <router-link :to="'/'"><span style="color:blue;">homepage</span></router-link>&nbsp;&nbsp;<span>/</span>&nbsp;&nbsp;<span>detail question</span>
        </div>
        <div style="margin-top: 15px;">
          <h1 style="font-size:22px;font-weight:500;color:navy;text-align:-webkit-auto;">{{indexquestion.title}}</h1>
          <hr style="border-color:white;">
          <el-row>
            <el-col :span="2">
              <div class="vote">
                <i class="el-icon-caret-top" @click="voteToQuestion(1, indexquestion)"></i><br>
                <span class="mini-counts">{{indexquestion.voteCounts}}</span><br>
                <i class="el-icon-caret-bottom" @click="voteToQuestion(1, indexquestion)"></i>
              </div>
            </el-col>
            <el-col :span="20" style="text-align:-webkit-auto;">
              <p style="margin-top:0px;">
                {{indexquestion.content}}
                <span v-if="indexquestion.askedBy._id == cekUser">
                  <el-button :plain="true" type="success" size="mini">share</el-button>
                  <el-button :plain="true" type="warning" size="mini" @click="viewEditQuestion">edit</el-button>
                  <el-button :plain="true" type="danger" size="mini" @click="deleteQuestion">delete</el-button>
                </span>
              </p>
              <el-tag style="margin-right:5px" type="primary" v-if="indexquestion.tags.length > 0" v-for="(tag, index) in indexquestion.tags" :key="index">{{tag}}</el-tag>
              <span class="teks-bawah">asked {{indexquestion.createdDate}} by <b>{{indexquestion.askedBy.name}}</b></span>
            </el-col>
          </el-row>
          <!-- <hr style="border-color:white;"> -->
          <el-row :gutter="20" type="flex" class="row-bg" justify="center">
            <el-col :span="12">
              <div class="grid-content">
                <p style="padding-top:10px;margin-bottom:0px;font-size:18px;color:navy;text-align:-webkit-auto">{{indexquestion.answerCounts}} <span v-if="indexquestion.answerCounts <= 1">Answer</span><span v-else>Answers</span></p>
              </div>
            </el-col>
            <el-col :span="12" style="text-align:right;padding-top:20px;padding-bottom:0px;margin-bottom:0px;">
              <div class="grid-content">
                <el-button @click="viewFormNewAnswer" size="small" icon="plus" style="background-color:darkred;color:#fff;">New Answer</el-button>
              </div>
            </el-col>
          </el-row>
          <hr style="border-color:white;">
          <div v-for="(answer, index) in indexquestion.answers" :key="index">
            <el-row>
              <el-col :span="1">
                <div class="vote">
                  <i class="el-icon-caret-top" @click="voteToAnswer(1, answer, index)"></i><br>
                  <span class="mini-counts" v-if="answer.voteCounts < 0">0</span>
                  <span class="mini-counts" v-else>{{answer.voteCounts}}</span><br>
                  <i class="el-icon-caret-bottom" @click="voteToAnswer(-1, answer, index)"></i>
                </div>
              </el-col>
              <el-col :span="18" style="text-align:-webkit-auto;">
                <!-- {{answer.answeredBy}} -->
                <p style="margin-top:0px;">
                  {{answer.content}}
                  <el-button v-if="answer.answeredBy._id == cekUser" :plain="true" type="warning" size="mini" @click="viewFormEditAnswer(answer, index)">edit</el-button>
                  <el-button v-if="answer.answeredBy._id == cekUser" :plain="true" type="danger" size="mini" @click="deleteAnswer(answer, index)">delete</el-button>
                </p>
                <span class="teks-bawah">answered {{answer.createdDate}} by <b>{{answer.answeredBy.name}}</b></span>
              </el-col>
            </el-row>
            <hr style="border-color:white;">
          </div>
        </div>

        <el-dialog title="New Question" v-model="dialogFormVisibleEditQuestion">
          <el-form :model="formEditQuestion" :rules="rules" ref="formEditQuestion" label-width="120px" class="demo-ruleForm" style="padding:0px 20px 0px 5px;margin-top:10px;">
            <el-form-item label="Title" prop="title">
              <el-input v-model="formEditQuestion.title"></el-input>
            </el-form-item>
            <el-form-item label="Content" prop="content">
              <el-input type="textarea" v-model="formEditQuestion.content"></el-input>
            </el-form-item>
            <el-form-item label="Tags">
              <el-card :body-style="{ padding: '10px' }" style="height:auto;">
                <el-tag
                  v-if="formEditQuestion.tags.length > 0"
                  :key="tag"
                  v-for="tag in formEditQuestion.tags"
                  :closable="true"
                  :close-transition="false"
                  @close="handleClose(tag)"
                >
                {{tag}}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="mini"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
              </el-card>
            </el-form-item>
            <el-form-item style="margin-left:0px;">
              <el-button type="primary" @click="submitFormEditQuestion('formEditQuestion')">Create</el-button>
              <el-button @click="resetForm('formEditQuestion')">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <el-dialog title="New Answer" v-model="dialogFormVisibleNewAnswer">
          <el-form :model="formNewAnswer" :rules="rules" ref="formNewAnswer" label-width="120px" class="demo-ruleForm" style="padding:0px 20px 0px 5px;margin-top:10px;">
            <el-form-item label="Question">
              <span><b>{{indexquestion.title}}</b></span>
            </el-form-item>
            <el-form-item label="Content" prop="content">
              <el-input type="textarea" v-model="formNewAnswer.content"></el-input>
            </el-form-item>
            <el-form-item style="margin-left:0px;">
              <el-button type="primary" @click="submitFormNewAnswer('formNewAnswer')">Create</el-button>
              <el-button @click="resetForm('formNewAnswer')">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <el-dialog title="Edit Answer" v-model="dialogFormVisibleEditAnswer">
          <el-form :model="formEditAnswer" :rules="rules" ref="formEditAnswer" label-width="120px" class="demo-ruleForm" style="padding:0px 20px 0px 5px;margin-top:10px;">
            <el-form-item label="Question">
              <span><b>{{indexquestion.title}}</b></span>
            </el-form-item>
            <el-form-item label="Content" prop="content">
              <el-input type="textarea" v-model="formEditAnswer.content"></el-input>
            </el-form-item>
            <el-form-item style="margin-left:0px;">
              <el-button type="primary" @click="submitFormEditAnswer('formEditAnswer')">Edit</el-button>
              <el-button @click="resetForm('formEditAnswer')">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
    </el-col>

    <el-col :span="6">
      <div class="grid-content">
        <div style="margin-top: 15px;text-align:-webkit-auto;">
          <p style="color:navy;">List of Question</p>
          <el-tag style="margin:0px 5px 5px 0px;" type="gray" v-for="(question, index) in dataQuestions" :key="index">{{question.title}}</el-tag>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: ['id'],
  data() {
    return {
      dialogFormVisibleEditQuestion: false,
      dialogFormVisibleNewAnswer: false,
      dialogFormVisibleEditAnswer: false,
      formEditQuestion: {
        title: '',
        content: '',
        tags: []
      },
      formNewAnswer: {
        content: ''
      },
      formEditAnswer: {
        answerid: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: 'Please input title', trigger: 'blur' }
        ],
        content: [
          { required: true, message: 'Please input content', trigger: 'blur' }
        ]
      },
      inputVisible: false,
      inputValue: '',
      cekUser: ''
    }
  },
  methods: {
    ...mapActions([
        "signIn", "signUp"
    ]),
    routeToContent() {
      this.$router.push('/')
    },
    convertDate(oriDate) {
      console.log('oridate di detailquestion: ', oriDate);
      this.$store.commit('convertDate', oriDate)
      return this.$store.state.dateConvert
    },
    convertTime(oriTime) {
      console.log('oritime di detailquestion:', oriTime);
      this.$store.commit('convertTime', oriTime)
      return this.$store.state.timeConvert
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    viewEditQuestion() {
      this.dialogFormVisibleEditQuestion = true
      this.formEditQuestion.title = this.indexquestion.title
      this.formEditQuestion.content = this.indexquestion.content
      this.formEditQuestion.tags = this.indexquestion.tags
    },
    viewFormNewAnswer() {
      this.dialogFormVisibleNewAnswer = true
    },
    viewFormEditAnswer(data, index) {
      this.dialogFormVisibleEditAnswer = true
      this.formEditAnswer.content = data.content
      this.formEditAnswer.answerid = data._id
    },
    submitFormEditQuestion(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('Sukses')
          let payload = {
            id: this.indexquestion._id,
            title: this.formEditQuestion.title,
            content: this.formEditQuestion.content,
            askedBy: window.localStorage.getItem('id'),
            tags: this.formEditQuestion.tags
          }
          console.log('payload edit question');
          console.log(payload);
          this.$store.dispatch('editQuestion', payload)
          this.indexquestion.title = payload.title
          this.indexquestion.content = payload.content
          this.dialogFormVisibleEditQuestion = false
        } else {
          console.log('error edit question!!');
          return false;
        }
      });
    },
    submitFormNewAnswer(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let payload = {
            id: this.id,
            answeredBy: window.localStorage.getItem('id'),
            content: this.formNewAnswer.content
          }
          this.$store.dispatch('addAnswer', payload)
          this.formNewAnswer.content = ''
          this.dialogFormVisibleNewAnswer = false
        } else {
          console.log('error add new answer!!');
          return false;
        }
      });
    },
    submitFormEditAnswer(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let payload = {
            questionid: this.id,
            answerid: this.formEditAnswer.answerid,
            content: this.formEditAnswer.content
          }
          this.$store.dispatch('editAnswer', payload)
          this.indexquestion.answers.forEach(answer => {
            if (answer._id == payload.answerid) {
              answer.content = payload.content
            }
          })
          // this.indexquestion.content = payload.content
          this.dialogFormVisibleEditAnswer = false
        } else {
          console.log('error edit answer!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose(tag) {
      this.formEditQuestion.tags.splice(this.formEditQuestion.tags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.formEditQuestion.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    deleteQuestion() {
      if (confirm(`Are you sure want to delete ${this.indexquestion.title}?`)) {
        this.$store.dispatch('deleteQuestion', this.id)
      }
      this.$store.state.dataQuestions
      window.location = '/'
      // this.$router.push('/')
    },
    voteToQuestion(vote, answer) {
      let payload = {
        id: this.id,
        votedBy: window.localStorage.getItem('id'),
        vote: vote
      }
      this.$store.dispatch('voteToQuestion', payload)
      this.$store.dispatch('detailQuestion', this.id)
      this.indexquestion = this.$store.state.detailQuestion
      window.location.reload()
    },
    voteToAnswer(vote, answer, index) {
      let payload = {
        questionid: this.id,
        answerid: answer._id,
        votedBy: window.localStorage.getItem('id'),
        vote: vote
      }
      this.$store.dispatch('voteToAnswer', payload)
      this.$store.dispatch('detailQuestion', this.id)
      this.indexquestion = this.$store.state.detailQuestion
      this.indexquestion[index]
      window.location.reload()
    },
    deleteAnswer(answer, index) {
      if (confirm(`Are you sure want to delete ${answer.content}?`)) {
        let payload = {
          questionid: this.id,
          answerid: answer._id
        }
        this.$store.dispatch('deleteAnswer', payload)
      }
      this.indexquestion.answers.splice(index, 1)
    }
  },
  computed: {
    ...mapGetters({
      statusLogin: "isLogin"
    }),
    indexquestion() {
      return this.$store.state.detailQuestion
    },
    dataQuestions() {
      return this.$store.state.dataQuestions
    }
  },
  created() {
    this.$store.dispatch('detailQuestion', this.id)
    this.$store.dispatch('dataQuestions')
    this.cekUser = window.localStorage.getItem('id')
  }
}
</script>

<style lang="css">
  .vote {
    text-align: center;
  }

  .mini-counts {
    font-size: 19px;
    font-weight: 300;
    color: #6a737c;
    margin-top: 3px;
  }

  .teks-bawah {
    font-size: 70%;
    color: #848d95;
  }

  .el-icon-caret {
    color: indigo;
  }

  .el-form-item__content {
    text-align: -webkit-auto;
  }

  .el-dialog__body {
    padding: 0px;
  }
</style>
