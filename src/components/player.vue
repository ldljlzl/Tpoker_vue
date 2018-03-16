<template>
    <div class="main">
        <div class="playerPanel" v-if="flag">
            
            <div class="topPanelPerson">
                <img src="../assets/img/user.png" class="user" alt="user">
                <span>{{this.username}}</span>
            </div>
            <div class="middlePanelPerson" v-if="readyShowFlag">
                <img :src="srcLeft" class="pokerLeft " >
                <img :src="srcRight" class="pokerRight" >
                <div class="actionFlag" v-show="actionFlag">
                    <img src="../assets/img/hand.png" alt="hand">
                </div>
                <div class="actionText">{{this.actionText}}</div>
                <div class="betNum">押注：{{this.betNum}}</div>

            </div>
            <div class="middlePanelPerson" v-if="!readyShowFlag">
                <div class="noReady" v-if="!ready">未准备</div>
                <div class="noReady" v-if="ready">已准备</div>
            </div>
            <div class="bottomPanelPerson">
                <img class="gold" src="../assets/img/gold.png" alt="gold">
                <span>{{this.score}}</span>
            </div>    
        </div>
        <div class="noPlayer" v-if="!flag">
            <div class="blank">空位</div>

        </div>
    </div>
        
</template>


<script >
export default {
  props:{
      userinfo:{
          type:Object,
          default:function(){
              return{
                  username:'',
                  score:0,
                  readyFlag:false
              }
          }
      },
      beginFlag:Boolean,
      actionFlag:Boolean,
      actionText:String,
      betNum:Number
  },
  data:function(){
      return {
        pokerDefault:'pokerBack',
      }
  },
  computed:{
      srcLeft:function(){
          return require('../assets/img/'+this.pokerDefault+'.jpg')
      },
      srcRight:function(){
          return require('../assets/img/'+this.pokerDefault+'.jpg')
      }, 
      username:function(){
          return this.userinfo.username
      },
      score:function(){
          return this.userinfo.score
      },
      flag:function(){
          return Boolean(this.userinfo.username)
      },
      readyShowFlag:function(){
          return this.beginFlag
      },
      ready:function(){
          return this.userinfo.readyFlag
      },
  }
}
</script>

<style scoped>
.main{
    height: 100%;
    width: 100%;
}

div.noPlayer{
    height: 100%;
    width: 100%;
    background-color: #efefef;
    opacity: 0.3;
}
div.noPlayer div.blank{
    padding-top: 15%;
    margin-bottom: 6%;
    font-size: 400%;
    display: flex;
    justify-content:center;
    align-items:center;
}


.playerPanel{
    height: 100%;
    width: 100%
}


.topPanelPerson{
    height: 10%;
    margin-bottom: 5%;
    margin-top: 5%;
    position: relative;
    bottom: 5%;
}
.middlePanelPerson{
    height: 60%;
}
.bottomPanelPerson{
    height: 10%;
    margin-bottom: 5%;
    /*position: relative;
    top: 5%;*/
}
img.user{
    height: 10%;
}
img.pokerLeft,img.pokerRight{
    height: 100%;
}
img.pokerLeft{
    transform:rotate(-15deg);
}
img.pokerRight{
    transform:rotate(15deg);
}
span{
    font-size: 200%;
    color: yellow
}
img.gold{
    width: 15%;
    position: relative;
    top: 30%;
    right: 10%;
}
.noReady{
    font-size: 250%;
    position: relative;
    top: 20%;
    left: 20%;
    background-color: #51ffff;
    opacity: 0.3;
    width: 60%;
    display: flex;
    justify-content:center;
    align-items:center;
}

/*准备标志*/
.actionFlag img{
    width: 15%;
    position: relative;
    left:35%;
    background-color: blue
}

/*action提示*/
.actionText{
    color: #f45b9c;
    font-size: 30px;
    position: relative;
    bottom: 160%;
    left: 40%;
}

/*押注*/
.betNum{
    color: #cdc8a0;
    font-size: 20px;
    position: relative;
    bottom: 130%;
    left: 45%;
}


</style>


