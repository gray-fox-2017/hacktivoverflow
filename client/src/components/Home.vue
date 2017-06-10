<template>
  <div class="flex-container" style="margin-left:5%;">

      <div class="flex-item" style="width:30%; margin-top:15px;">
        <div class="ui items">
          <div class="item floating">

            <div class="ui special cards">
              <div class="card">
                <div class="blurring dimmable image">
                  <div class="ui dimmer">
                    <div class="content">

                    </div>
                  </div>

                </div>
                <div class="content center aligned ">
                  <a class="header" style="font-size:30px">2</a>
                  <div class="meta">
                    <span>PERTANYAAN</span>
                  </div>
                </div>
              </div>
          </div>
        </div>

      </div>
      </div>

      <div  class="flex-item ui segment" style="width:65%; background-color:white; border-radius:5px; margin-right:5%">

        <div class="ui tabular menu">
          <a class="active item">
            Terpopuler
          </a>
          <a class="item">
            Terbaru
          </a>
        </div>

        <div class="ui celled list" style="margin-top:5%;">
          <div class="item">
            <div class="content" style="margin-top:1%;margin-bottom:1%;">
              <div class="ui grid">
                <div class="row">
                  <div class="column" style="width:10%">
                    <div class="ui small compact message flex-item">
                      <div class="header">
                        0
                      </div>
                      <p style="font-size:10px">Votes</p>
                    </div>
                  </div>
                  <div class="column" style="width:10%">
                    <div class="ui small compact positive message flex-item" >
                      <div class="header">
                        0
                      </div>
                      <p style="font-size:10px">Answers</p>
                    </div>
                  </div>
                  <div class="column" style="width:70%; margin-top:2.5%">
                    <a href="#">Pertanyaan1</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="item" style="width:100%;">
            <div class="content" style="margin-top:1%;margin-bottom:1%;">
              <div class="ui grid">
                <div class="row">
                  <div class="column" style="width:10%">
                    <div class="ui small compact message flex-item">
                      <div class="header">
                        0
                      </div>
                      <p style="font-size:10px">Votes</p>
                    </div>
                  </div>
                  <div class="column" style="width:10%">
                    <div class="ui small compact positive message flex-item" >
                      <div class="header">
                        0
                      </div>
                      <p style="font-size:10px">Answers</p>
                    </div>
                  </div>
                  <div class="column" style="width:70%; margin-top:2.5%">
                    <a href="#">Pertanyaan2</a>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {

    }
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
