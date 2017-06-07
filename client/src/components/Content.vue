<template lang="html">
  <el-row :gutter="20" type="flex" class="row-bg" justify="center">
    <el-col :span="14">
      <div class="grid-content">
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
              <h3 style="color:#005999;font-weight:400;margin:0px;">{{question.title}}</h3>
              <el-tag style="margin-right:5px" type="success" v-for="(tag, index) in question.tags" :key="index">{{tag}}</el-tag>
              <span class="teks-bawah">asked <b>{{question.askedBy.name}}</b> | {{convertDate(question.createdDate)}} {{convertTime(question.createdDate)}}</span>
            </el-col>
          </el-row>
          <hr style="border-color:white;">
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple">
        <div style="margin-top: 15px;text-align:-webkit-auto;">
          <p style="color:navy;">Favorite Tags</p>
          <el-tag style="margin:0px 5px 5px 0px;" type="gray" v-for="tag in dataTags" :key="tag.count">{{tag.name}}</el-tag>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: {
    convertDate(oriDate) {
      let getDate = new Date(oriDate);
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
      return `${days}, ${date} ${monthTeks} ${year}`;
    },
    convertTime(oriDate) {
      let getDate = new Date(oriDate);
      let hour = String(getDate.getHours());
      if(hour.length === 1) {
        hour = '0' + hour;
      }
      let minute = String(getDate.getMinutes());
      if(minute.length === 1) {
        minute = '0' + minute;
      }
      return `${hour}:${minute}`;
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
