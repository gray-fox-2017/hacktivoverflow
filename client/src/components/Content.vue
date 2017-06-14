<template lang="html">
  <div>

    <div v-show="statusLogin">
      <el-row style="margin-top: 15px;" :gutter="20" type="flex" class="row-bg" justify="center">
        <el-col :span="14">
          <div class="grid-content">
            <el-input placeholder="Please input">
              <el-button slot="append" icon="search"></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="6" style="text-align:right">
          <div class="grid-content">
            <el-button @click="viewNewQuestionDialog" icon="plus" style="background-color:darkred;color:#fff;">New Question</el-button>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" type="flex" class="row-bg" justify="center">
        <el-col :span="14">
          <div class="grid-content" v-show="displayListQuestions">
            <p style="color:navy;text-align:-webkit-auto">Top Questions</p>
            <hr style="border-color:white;">
            <div v-for="(question, index) in dataQuestions" :key="index">
              <el-row>
                <el-col :span="2">
                  <div class="mini-counts">
                    <span>{{question.voteCounts}}</span>
                  </div>
                  <div class="teks-bawah">votes</div>
                </el-col>
                <el-col :span="2">
                  <div class="mini-counts">
                    <span>{{question.answerCounts}}</span>
                  </div>
                  <div class="teks-bawah">answers</div>
                </el-col>
                <el-col :span="18" style="text-align:-webkit-auto;margin-left:10px;">
                  <router-link :to="'detail/'+question._id">{{question.title}}</router-link>

                  <!-- <h3 style="color:#005999;font-weight:400;margin:0px;" @click="viewDetail(index)" :indexquestion="content">{{question.title}}</h3> -->
                  <el-tag style="margin-right:5px" type="primary" v-for="(tag, index) in question.tags" :key="index">{{tag}}</el-tag><br>
                  <span class="teks-bawah">asked {{question.createdDate}} by <b>{{question.askedBy.name}}</b></span>
                </el-col>
              </el-row>
              <hr style="border-color:white;">
            </div>
          </div>

          <!-- <DetailQuestion v-show="displayDetailQuestion" :indexquestion="content"></DetailQuestion> -->
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div style="margin-top: 15px;text-align:-webkit-auto;">
              <p style="color:navy;">Favorite Tags</p>
              <el-tag style="margin:0px 5px 5px 0px;" type="gray" v-for="tag in dataTags" :key="tag.count">{{tag.name}}</el-tag>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-dialog title="New Question" v-model="dialogFormVisibleNewQuestion">
        <el-form :model="formNewQuestion" :rules="rules" ref="formNewQuestion" label-width="120px" class="demo-ruleForm" style="padding:0px 20px 0px 5px;margin-top:10px;">
          <el-form-item label="Title" prop="title">
            <el-input v-model="formNewQuestion.title"></el-input>
          </el-form-item>
          <el-form-item label="Content" prop="content">
            <el-input type="textarea" v-model="formNewQuestion.content"></el-input>
          </el-form-item>
          <el-form-item label="Tags">
            <el-card :body-style="{ padding: '10px' }" style="height:auto;">
              <el-tag
                v-if="formNewQuestion.tags.length > 0"
                :key="tag"
                v-for="tag in formNewQuestion.tags"
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
            <el-button type="primary" @click="submitFormNewQuestion('formNewQuestion')">Create</el-button>
            <el-button @click="resetForm('formNewQuestion')">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DetailQuestion from './DetailQuestion'

export default {
  name: 'content',
  components: {
    DetailQuestion
  },
  data() {
    return {
      displayListQuestions: true,
      displayDetailQuestion: false,
      dialogFormVisibleNewQuestion: false,
      content: [],
      formNewQuestion: {
        title: '',
        content: '',
        tags: []
      },
      rules: {
        title: [
          { required: true, message: 'Please input the title', trigger: 'blur' }
        ],
        content: [
          { required: true, message: 'Please input the content', trigger: 'blur' }
        ]
      },
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    submitFormNewQuestion(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('Sukses')
          let payload = {
            title: this.formNewQuestion.title,
            content: this.formNewQuestion.content,
            askedBy: window.localStorage.getItem('id'),
            tags: this.formNewQuestion.tags
          }
          console.log('payload new question');
          console.log(payload);
          this.$store.dispatch('addQuestion', payload)
          this.formNewQuestion.title = ''
          this.formNewQuestion.content = ''
          this.formNewQuestion.tags = []
          this.dialogFormVisibleNewQuestion = false
        } else {
          console.log('error add new todo!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    viewNewQuestionDialog() {
      this.dialogFormVisibleNewQuestion = true
    },
    viewDetail(index) {
      this.content = this.dataQuestions[index]
      this.$router.push('/detail')
    },
    handleClose(tag) {
      this.formNewQuestion.tags.splice(this.formNewQuestion.tags.indexOf(tag), 1);
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
        this.formNewQuestion.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    convertDate(oriDate) {
      console.log('oridate di content: ', oriDate);
      this.$store.commit('convertDate', oriDate)
      return this.$store.state.dateConvert
    },
    convertTime(oriTime) {
      console.log('oritime di content: ', oriTime);
      this.$store.commit('convertTime', oriTime)
      return this.$store.state.timeConvert
    }
  },
  computed: {
    ...mapGetters({
      statusLogin: 'isLogin'
    }),
    dataTags() {
      return this.$store.state.dataTags
    },
    dataQuestions() {
      return this.$store.state.dataQuestions
    }
  },
  created() {
    this.$store.dispatch('dataTags')
    this.$store.dispatch('dataQuestions')
  }
}
</script>

<style lang="css">
  .el-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .mini-counts {
    font-size: 17px;
    font-weight: 300;
    color: #6a737c;
    margin-top: 3px;
  }

  .teks-bawah {
    font-size: 70%;
    color: #848d95;
  }

  .tags {
    margin-right: 5px;
  }
</style>
