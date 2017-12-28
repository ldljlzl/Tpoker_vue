<template>
        <div class="lobby">
            <div class="topPanel ">
                <div>
                    <div class="seat top">
                        <player>  </player>  
                    </div>
                    <div class="seat top">
                        <player>  </player>  
                    </div>
                    <div class="seat top">
                        <player>  </player> 
                    </div>
                    <div class="seat top">
                        <player>  </player> 
                    </div>
                </div>  
            </div>
            <div class="middlePanel">
                    <div class="seat">
                        <player>  </player> 
                    </div>
                    <div class="public">
                        
                    </div>
                    <div class="seat">
                        <player>  </player> 
                    </div>
            </div>
            <div class="bottomPanel">
                <div class="myseat">
                    
                </div>
                <div class="chatroom">
                    
                </div>
            </div>
        </div>
</template>
<script>
import player from './player'
export default {
    data () {
        return {
            players:[
                {
                    account:'hhaha',
                    seatNum:1,
                    cards:[],
                    score:500,

                }
            ]
        }
    },
    components:{
        player
    }
}
</script>

<style>
body {
  background-size:100%;
  background-image: url(../assets/img/background.jpg);
}

/*使lobby占满屏幕*/
div.lobby{  
    position: absolute;
    height: 100%;  
    width: 100%;  
    /*background: #EE6AA7;  */
} 

.topPanel{
    height: 20%;
    display: flex;
    justify-content: center;
}
.topPanel>div{
    height: 100%;  
    width: 85%;
    display: flex;
    justify-content: space-between;
}
div.top{
    display: block;
    width: 20%;
    height: 100%;
}



.middlePanel{
    height: 30%;
    display: flex;
    justify-content: space-between;
    margin-top: 4%;
}
.middlePanel div.seat{
    display: block;
    width: 17%;
    height: 67.8%;
}
.public{
    display: block;
    width: 50%;
    height: 100%;
}



.bottomPanel{
    display: flex;
    justify-content: space-between;
    height: 40%;
    margin-top: 4%;
}
.myseat{
    display: block;
    height: 60%;
    width: 25%;
    position: relative;
    left:30%;
}
div.seat,.myseat{
    border: 2px solid black;
    background-color: red; 
}





div.public{
    background-color: yellow;
}
div.chatroom{
    display: block;
    height: 70%;
    width: 25%;
    background-color: blue;
}


</style>

