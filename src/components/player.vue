<template>
    <div class="playerPanel">
        <div class="topPanelPerson">
            <img src="../assets/img/user.png" class="user" alt="user">
            <span>{{username}}</span>
        </div>
        <div class="middlePanelPerson">
            <img :src="srcLeft" class="pokerLeft " >
            <img :src="srcRight" class="pokerRight" >
        </div>
        <div class="bottomPanelPerson">
            <span>{{score}}</span>
        </div>    
    </div>
</template>


<script>
export default {
  data:function(){
      return {
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
    height: 120%;
}
img.pokerLeft,img.pokerRight{
    height: 80%;
}
img.pokerLeft{
    transform:rotate(-15deg);
}
img.pokerRight{
    transform:rotate(15deg);
}

</style>


