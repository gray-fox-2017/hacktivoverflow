<template lang="html">
  <div class="grid-content">
    <div style="margin-top: 15px;">
      <h5 class="mini-counts" style="text-align:-webkit-auto;margin:0px;" @click="routeToContent"><u>back</u></h5>
      <h1 style="font-size:22px;font-weight:500;color:navy;text-align:-webkit-auto;">{{indexquestion.title}}</h1>
      <hr style="border-color:white;">
      <el-row>
        <el-col :span="2">
          <div class="vote">
            <i class="el-icon-caret-top"></i><br>
            <span class="mini-counts">0</span><br>
            <i class="el-icon-caret-bottom"></i>
          </div>
        </el-col>
        <el-col :span="20" style="text-align:-webkit-auto;">
          <p style="margin-top:0px;">
            {{indexquestion.content}}
            <el-button :plain="true" type="success" size="mini">share</el-button>
            <el-button :plain="true" type="warning" size="mini" @click="viewEditQuestion(indexquestion)">edit</el-button>
            <el-button :plain="true" type="danger" size="mini">delete</el-button>
          </p>
          <el-tag style="margin-right:5px" type="primary" v-for="(tag, index) in indexquestion.tags" :key="index">{{tag}}</el-tag>
          <span class="teks-bawah">asked {{convertDate(indexquestion.createdDate)}} by <b>{{indexquestion.askedBy.name}}</b></span>
        </el-col>
      </el-row>
      <!-- <hr style="border-color:white;"> -->
      <p style="padding-top:10px;margin-bottom:0px;font-size:18px;color:navy;text-align:-webkit-auto">{{indexquestion.answerCounts}} <span v-if="indexquestion.answerCounts <= 1">Answer</span><span v-else>Answers</span></p>
      <hr style="border-color:white;">
      <div v-for="(answer, index) in indexquestion.answers" :key="index">
        <el-row>
          <el-col :span="1">
            <div class="vote">
              <i class="el-icon-caret-top"></i><br>
              <span class="mini-counts">{{answer.voteCounts}}</span><br>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </el-col>
          <el-col :span="18" style="text-align:-webkit-auto;">
            <p style="margin-top:0px;">
              {{answer.content}}
              <el-button :plain="true" type="warning" size="mini">edit</el-button>
              <el-button :plain="true" type="danger" size="mini">delete</el-button>
            </p>
            <span class="teks-bawah">answered {{answer.createdDate}} by <b>{{answer.answeredBy.name}}</b></span>
          </el-col>
        </el-row>
        <hr style="border-color:white;">
      </div>
    </div>
    <!-- <button type="button" name="button" @click="viewEditQuestion">ininini</button> -->
    <el-dialog title="Edit Question" v-model="dialogFormVisibleEditQuestion">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" style="padding:0px 20px 0px 5px;margin-top:10px;">
        <el-form-item label="Title" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Content" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-tag
            :key="tag"
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
        </el-form-item>
        <el-form-item style="margin-left:0px;">
          <el-button type="primary" @click="submitForm('ruleForm')">Edit</el-button>
          <el-button @click="resetForm('ruleForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      dialogFormVisibleEditQuestion: false,
      ruleForm: {
        name: '',
        desc: '',
        tags: []
      },
      rules: {
        name: [
          { required: true, message: 'Please input title', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: 'Please input content', trigger: 'blur' }
        ]
      },
      inputVisible: false,
    }
  },
  props: ['indexquestion'],
  methods: {
    ...mapActions([
        "signIn", "signUp"
    ]),
    routeToContent() {
      // this.$router.push('/content')
      window.location.href = "/content"
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
    viewEditQuestion(indexquestion) {
      this.dialogFormVisibleEditQuestion = true
      this.ruleForm.name = indexquestion.title
      this.ruleForm.desc = indexquestion.content
      // this.ruleForm.tags = this.indexquestion.tags
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  computed: {
    ...mapGetters({
      statusLogin: "isLogin"
    })
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
</style>
