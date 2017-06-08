<template lang="html">
  <el-row :gutter="20" type="flex" class="row-bg" justify="center">
    <el-col :span="14">
      <div class="grid-content" v-show="displayListQuestions">
        <div style="margin-top: 15px;">
          <el-input placeholder="Please input" v-show="statusLogin">
            <el-button slot="append" icon="plus"></el-button>
          </el-input>
          <el-input
            placeholder="Please input"
             v-show="statusLogin == null">
            <el-button slot="append" icon="search"></el-button>
          </el-input>
        </div>
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
              <h3 style="color:#005999;font-weight:400;margin:0px;" @click="viewDetail(index)">{{question.title}}</h3>
              <el-tag style="margin-right:5px" type="primary" v-for="(tag, index) in question.tags" :key="index">{{tag}}</el-tag>
              <span class="teks-bawah">asked {{question.createdDate}} by <b>{{question.askedBy.name}}</b></span>
            </el-col>
          </el-row>
          <hr style="border-color:white;">
        </div>
      </div>

      <DetailQuestion v-show="displayDetailQuestion" :indexquestion="content"></DetailQuestion>
    </el-col>
    <!-- <el-col :span="6">
      <div class="grid-content">
        <div style="margin-top: 15px;text-align:-webkit-auto;">
          <p style="color:navy;">Favorite Tags</p>
          <el-tag style="margin:0px 5px 5px 0px;" type="gray" v-for="tag in dataTags" :key="tag.count">{{tag.name}}</el-tag>
        </div>
      </div>
    </el-col> -->
  </el-row>
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
      content: []
    }
  },
  methods: {
    viewDetail(index) {
      this.content = this.dataQuestions[index]
      console.log('Ini content');
      console.log(this.content);
      this.displayListQuestions = false
      this.displayDetailQuestion = true
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
