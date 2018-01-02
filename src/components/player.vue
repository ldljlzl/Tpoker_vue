<template>
    <div class="main">
        <div class="playerPanel" v-if="flag">
            <div class="topPanelPerson">
                <img src="../assets/img/user.png" class="user" alt="user">
                <span>{{username}}</span>
            </div>
            <div class="middlePanelPerson">
                <!--<img :src="srcLeft" class="pokerLeft " >
                <img :src="srcRight" class="pokerRight" >-->
            </div>
            <div class="bottomPanelPerson">
                <span>{{score}}</span>
            </div>    
        </div>
        <div class="noPlayer" v-if="!flag">
            <div class="blank">空位</div>

        </div>
    </div>
        
</template>


<script >
export default {
  data:function(){
      return {
        flag:false,  
        username:'lzl',
        score:134,
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
    font-size: 60px;
}


.playerPanel{
    height: 100%;
    width: 100%
}


.topPanelPerson{
    height: 10%;
    margin-bottom: 5%;
    margin-top: 5%;
}
.middlePanelPerson{
    height: 60%;
}
.bottomPanelPerson{
    height: 10%;
    margin-bottom: 5%;
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



</style>


