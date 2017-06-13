<template lang="html">
  <div id="main">
    <form novalidate >
      <md-snackbar :md-position="vertical + ' ' + horizontal" ref="snackbarVote" :md-duration="duration">
        <span>{{ status }}</span>
        <md-button class="md-accent" md-theme="light-blue" @click.native="$refs.snackbarVote.close()">Close</md-button>
      </md-snackbar>
    </form>

    <div class="container">
      <div class="content" v-for="content in contents">
        <div class="post">
          <md-dialog-actions v-if="login" id="action-up" >
            <md-button v-if="you == content.user_id._id" class="md-icon-button md-dense" @click.native="deletePost(content._id)">
              <md-icon style="margin-top: 4px;">delete</md-icon>
            </md-button>
          </md-dialog-actions>
          <md-dialog-title >
            <div id="title-main">
              <h3 id="title-h3">Title :</h3> {{ content.title }}
            </div>
          </md-dialog-title>
          <md-dialog-title id="title-quest">
            <label ><h3 id="question">Question :</h3></label>
          </md-dialog-title>
          <md-dialog-title>
            {{ content.message }}
          </md-dialog-title>
          <md-dialog-actions>
            <span style="font-size:23px" v-if="you">{{ content.vote_up.length }}</span>
            <md-button v-if="you" style="margin-right: 10px;" class="md-icon-button md-dense" @click.native="vote(content._id,'up')">
              <md-icon style="margin-top: auto;">thumb_up</md-icon>
            </md-button>
            <span style="font-size:23px" v-if="you">{{ content.vote_down.length }}</span>
            <md-button v-if="you" style="margin-right: 10px;"class="md-icon-button md-dense" @click.native="vote(content._id,'down')">
              <md-icon style="margin-top: auto;">thumb_down</md-icon>
            </md-button>
              <md-button v-if="you == content.user_id._id" @click.native="showDialog(content._id)" style="margin-right:10px" class="md-raised md-primary">Edit</md-button>
            <router-link :to="{path: '/comment/'+content._id}">
              <md-button v-if="login" class="md-raised md-primary">Show</md-button>
            </router-link>
          </md-dialog-actions>
        </div>
      </div>
      <!-- /end of content -->
    </div>
    <!-- dialog update post -->
    <md-dialog id="dialogCreate" md-open-from="#custom" md-close-to="#custom" ref="dialogUpdate">
      <md-dialog-actions>
        <md-button class="md-icon-button md-dense" @click.native="closeDialog('dialogUpdate')">
          <md-icon style="margin-top: 4px;">clear</md-icon>
        </md-button>
      </md-dialog-actions>
      <md-dialog-title>Update Your Post</md-dialog-title>
      <md-dialog-content>
        <md-input-container>
          <md-icon>forum</md-icon>
          <label>Title</label>
          <md-input placeholder="Title Post" v-model="title_post"></md-input>
        </md-input-container>
        <md-input-container novalidate>
          <md-icon>label_outline</md-icon>
          <label>Description</label>
          <md-textarea maxlength="200" v-model="description"></md-textarea>
        </md-input-container>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button class="md-primary" @click.native="update(id_content)">Update</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- /update post-->
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
export default {
  data() {
    return {
      login : false,
      contents : [],
      you : '',
      title_post : '',
      description : '',
      id_content : '',
      status : '',
      vertical : 'top',
      horizontal : 'center',
      duration : 4000
    }
  },
  methods : {
    vote(id, action){
      console.log(id, action);
      Vue.axios.post('http://localhost:3000/posting/vote/'+id,{
          vote : action
        },{ headers : { token : localStorage.getItem('token')}}
      ).then((response)=>{
        if(response.data.hasOwnProperty('status')){
          this.status = response.data.status
          console.log(this.status);
          this.openDialog('snackbarVote')
        } else {
          location.reload()
        }
      })
    },
    deletePost(id) {
      Vue.axios.delete('http://localhost:3000/posting/'+id,{
        headers : {token : localStorage.getItem('token')}
      }).then((response)=>{
      if(response.data.message !== 'not authorized'){
        location.href = '/'
        }
      })
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    showDialog(id) {
      // console.log(id);
      Vue.axios.get('http://localhost:3000/posting/'+id,{
        headers : { token : localStorage.getItem('token') }
      }).then((response)=>{
        // console.log(response.data.post);
        let data = response.data.post
        this.title_post = data.title
        this.description = data.message
        this.id_content = data._id
        this.openDialog('dialogUpdate')
      })
    },
    update(id){
      Vue.axios.put('http://localhost:3000/posting/'+id,{
        title : this.title_post,
        message : this.description
      }).then((response)=>{
        this.closeDialog('dialogUpdate')
        location.reload()
      })
    }
  },
  created(){
    let token = localStorage.getItem('token')
      Vue.axios.get('http://localhost:3000/posting').then((response)=>{
        // console.log(response.data[2]);
        this.contents = response.data
        if(token){
          Vue.axios.get('http://localhost:3000/users/'+token).then((user)=>{
            this.you = user.data.id
            this.login = true
          })
        }
      })
  }
}
</script>

<style lang="css">
#question{
margin-bottom: 0px;
}
#title-quest{
  margin-bottom: -12px;
  padding-top: 0px
}
#title-h3{
  margin-top: 0px;
  margin-right:  4px;
  float: left
}
#title-main{
  border-bottom: 1px solid
}
.post{
  padding-top: 2px;
  border: 1px solid;
  border-radius: 14px 14px 14px 14px;
}
#action-up{
padding: 0px 15px;
min-height: 10px;
}
#main{
  min-height: 45rem
}
.container{
  padding: 0px 12rem;
}
.content{
  margin-top: 20px;
  padding: 1px 26px
}
</style>
