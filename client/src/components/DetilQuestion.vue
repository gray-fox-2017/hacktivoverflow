<template>
  <div class="flex-container" style="margin-left:5%;">

      <div class="flex-item" style="width:15%; margin-top:15px;">
        <div class="ui item">
            <i class="angle up icon"></i>
        </div>
      </div>

      <div  class="flex-item ui segment" style="width:80%; background-color:white; border-radius:5px; margin-right:5%">
        <div class="ui card">
          <div class="content">
            <div class="header">Cute Dog</div>
            <div class="meta">
              <span>2 days ago</span>
              <a>Animals</a>
            </div>
            <p></p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'DetilQuestion',
  props:['id'],
  data() {
    return {
      detil_question:''
    }
  },
  methods:{

  },
  created(){
    let self = this
    let token = window.localStorage.getItem('token');
    axios.get(`http://localhost:3000/questions/${this.id}`,{
      headers:{
        token:token
      }
    })
    .then(response =>{
      self.detil_question=response.data;
      console.log('DetilQuestion',self.detil_question);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.ui.middle.aligned{
  width: 30%;
  margin-left: 35%;
  margin-top: 3%;
}

.flex-container{
   display: flex;
   flex-wrap: wrap;
}

.flex-item {
  flex-direction: row;
  float: left;
  border-radius: 5px;
}

</style>
