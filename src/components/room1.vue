<template>
  <div class="room">
    <div class="seat one" >
        <player>  </player>  
    </div>
    <div class="seat two" >
        <player>  </player> 
    </div>
    <div class="seat three" >
        <player>  </player> 
    </div>
    <div class="seat four" >
        <player>  </player> 
    </div>
    <div class="seat five" >
        <player>  </player> 
    </div>
    <div class="seat six" >
        <player>  </player> 
    </div>
    <div class="bottom">
        <div class="myseat" >
            <div class="left">
                <span>lzl</span>
                <div class="myScore">
                    <img class="gold" src="../assets/img/gold.png" alt="gold">
                    <span>score</span>
                </div>
            </div>
            <div class="right">
                <img class="card" src="../assets/img/1.jpg" alt="card1">
                <img class="card" src="../assets/img/2.jpg" alt="card2">
            </div>
                
        </div>
        <div class="chatroom"></div>
    </div>
        
  </div>
</template>
<script>
import player from './player'
export default {
    data () {
        return {
            players:[]
        }
    },
    components:{
        player
    }
}
</script>
<style scoped>

div.room{
    height: 100%;
    width: 100%; 
    /*background-color: red;*/
    background-image: url(../assets/img/牌桌.jpg);
    background-size:cover;  
    display: flex;
    align-items: flex-end;
}

div.seat{
    position: absolute;
    height: 20%;
    width: 16%;
    /*background-color: #efefef;*/
}
div.seat img.gold{
    height: 10%;
    width: 10%;
}

/*bottom层调整*/
div.bottom{
    height: 25%;
    width: 100%;
    display: flex;
    justify-content:space-between;
}


/*div.myseat调整*/
div.myseat{
    height: 100%;
    width:25%;
    background-color: red;
    position: relative;
    left:40%;
    display: flex;

}
div.myseat div.left{
    display: block;
    height: 100%;
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items:space-between;
}
/*myseat的left*/
div.myseat div.right{
    display: block;
    height: 100%;
    width: 75%;
    background-color: blue;
}
div.myScore{
    height: 20%;
}
div.myseat img.gold{
    height: 50%;
}
/*myseat的right*/


/*div.chatroom调整*/
div.chatroom{
    height: 100%;
    width:30%;
    
}




/*各个座位位置调整*/
div.one{
    left:5%;
    top:70%;
}
div.two{
    left:2%;
    top:30%;
}
div.three{
    left:25%;
    top:2%;
}
div.four{
    right:25%;
    top:2%;
}
div.five{
    right:2%;
    top:30%;
}
div.six{
    right:5%;
    top:70%;
}
</style>
