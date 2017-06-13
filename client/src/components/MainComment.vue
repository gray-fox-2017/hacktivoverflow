<template lang="html">
  <div id="main">
    <form novalidate >
      <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbarVote" :md-duration="duration">
        <span>{{ status }}</span>
        <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbarVote.close()">Close</md-button>
      </md-snackbar>
    </form>
    <div class="container">
      <div class="content">
        <div class="post">
          <md-dialog-actions v-if="login" id="action-up" >
            <md-button class="md-icon-button md-dense" v-bind:href='url_back'>
              <md-icon style="margin-top: 4px;">undo</md-icon>
              <md-tooltip md-direction="top" >Back Home</md-tooltip>
            </md-button>
          </md-dialog-actions>
          <md-dialog-title >
            <div id="title-main">
              <h3 id="title-h3">Title :</h3> {{data.title}}
            </div>
          </md-dialog-title>
          <md-dialog-title id="title-quest">
            <label ><h3 id="question">Question :</h3></label>
          </md-dialog-title>
          <md-dialog-title>
            {{data.message}}
          </md-dialog-title>
          <md-dialog-actions>
              <md-button v-if="login" class="md-raised md-primary" @click.native="openDialog('dialogComment')">Comment</md-button>
          </md-dialog-actions>
        </div>
      </div>
      <!-- /end of content -->
      <div class="content">
        <div id="answers">
          <md-table >
            <md-table-header>
              <md-table-row>
                <md-table-head>Answer</md-table-head>
                <md-table-head></md-table-head>
              </md-table-row>
            </md-table-header>

            <md-table-body style=":hover {background: yellow}">
              <md-table-row v-for="data in data.commentid" >
                <md-table-cell>
                  {{ data.comment }}
                </md-table-cell>
                <md-table-cell style="float:right;">
                  <span style="font-size:23px">{{ data.vote_up.length }}</span>
                  <md-button class="md-icon-button md-dense" @click.native="vote(data._id, 'up')">
                    <md-icon id="icon">thumb_up</md-icon>
                  </md-button>
                  <!-- {{ data.vote_down.length }} -->
                  <span style="font-size:23px">{{ data.vote_down.length }}</span>
                  <md-button class="md-icon-button md-dense" @click.native="vote(data._id, 'down')">
                    <md-icon id="icon">thumb_down</md-icon>
                  </md-button>
                  <md-button class="md-icon-button md-dense" @click.native="openDialogUpdate(data.user_id, data._id, data.comment)">
                    <md-icon id="icon">edit</md-icon>
                  </md-button>
                  <md-button class="md-icon-button md-dense" @click.native="deleteComment(data._id)">
                    <md-icon id="icon">delete</md-icon>
                  </md-button>
                </md-table-cell>
              </md-table-row>
            </md-table-body>
          </md-table>
        </div>
      </div>
    </div>
    <!-- dialog create comment -->
    <md-dialog id="dialogCreate" md-open-from="#custom" md-close-to="#custom" ref="dialogComment">
      <md-dialog-actions>
        <md-button class="md-icon-button md-dense" @click.native="closeDialog('dialogComment')">
          <md-icon style="margin-top: 4px;">clear</md-icon>
        </md-button>
      </md-dialog-actions>
      <md-dialog-title>Create Your Comment</md-dialog-title>
      <md-dialog-content>
        <md-input-container novalidate>
          <md-icon>forum</md-icon>
          <label>Comment</label>
          <md-textarea maxlength="200" v-model="comment"></md-textarea>
        </md-input-container>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="commentPost">Comment</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- /create comment-->
    <!-- dialog update comment -->
    <md-dialog id="dialogCreate" md-open-from="#custom" md-close-to="#custom" ref="dialogUpdateComment">
      <md-dialog-actions>
        <md-button class="md-icon-button md-dense" @click.native="closeDialog('dialogUpdateComment')">
          <md-icon style="margin-top: 4px;">clear</md-icon>
        </md-button>
      </md-dialog-actions>
      <md-dialog-title>Update Your Comment</md-dialog-title>
      <md-dialog-content>
        <md-input-container novalidate>
          <md-icon>forum</md-icon>
          <label>Comment</label>
          <md-textarea maxlength="200" v-model="updateComment[1]"></md-textarea>
        </md-input-container>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="update">Update</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- /update comment-->
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default {
  props: ['value'],
  data(){
    return{
      url_back : '/',
      login : false,
      comment : '',
      data: {},
      updateComment : [],
      status : '',
      vertical : 'top',
      horizontal : 'center',
      duration : 4000,
      idUser : ''
    }
  },
  methods : {
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    vote(id, actions){
      Vue.axios.post('http://localhost:3000/comment/vote/'+id, {
          vote : actions
        },{headers : { token : localStorage.getItem('token') }}
      ).then((response)=>{
        if(response.data.hasOwnProperty('status')){
          this.status = response.data.status
          this.openDialog('snackbarVote')
        } else {
          location.reload()
        }
      })
    },
    commentPost(){
      let id_posting = this.data._id
      this.closeDialog('dialogComment')
      Vue.axios.post('http://localhost:3000/comment/'+id_posting,{
        comment : this.comment
      },{
        headers : { token : localStorage.getItem('token')}
      }).then((response)=>{
        location.reload()
      })
    },
    deleteComment(id){
      Vue.axios.delete('http://localhost:3000/comment/'+id,{
        headers : { token : localStorage.getItem('token')}
      }).then((response)=>{
        if(response.data.hasOwnProperty('status')){
          location.reload()
        }
      })
    },
    openDialogUpdate(userId_Comment, idComment, data){
      console.log(userId_Comment, this.idUser);
      if(userId_Comment == this.idUser){
        this.updateComment.push(idComment)
        this.updateComment.push(data)
        this.openDialog('dialogUpdateComment')
      }
    },
    update(){
      let id = this.updateComment[0]
      Vue.axios.put('http://localhost:3000/comment/'+id,{
        comment : this.updateComment[1]
      },{headers : { token : localStorage.getItem('token')}}).then((response)=>{
        if(response.data.hasOwnProperty('status')){
          this.closeDialog('dialogUpdateComment')
        } else {
          location.reload()
        }
      })
    }
  },
  created(){
    let findById = this.$route.params.id
    // let token = localStorage.getItem('token')
    Vue.axios.get('http://localhost:3000/posting/'+findById,{
      headers : { token : localStorage.getItem('token') }
    }).then((response)=>{
      console.log(response.data);
      if(response.data.hasOwnProperty('id')){
        let doit = response.data
        console.log();
        this.data = doit.post
        this.idUser = doit.id
        this.login = true
        // console.log(this.data.commentid[0].vote_up.length);

      } else {
        console.log(response.data.user_id._id);
        this.idUser = response.data.user_id._id
        this.data = response.data
        this.login = true
        // console.log(this.data);

      }
    })
  }
}
</script>

<style lang="css" scoped>
#icon{
  margin-top: 5px;
  margin-left: 8px
}
#answers{
  border-radius: 14px 14px 14px 14px;
  border: 1px solid;
}
</style>
