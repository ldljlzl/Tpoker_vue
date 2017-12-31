// https://router.vuejs.org/zh-cn/essentials/passing-props.html
// https://github.com/k55k32/you-draw-i-guess/blob/master/src/WebSocketClient.js
// http://www.baidu.com/baidu?tn=02049043_69_pg&ie=utf-8&word=websocket
// http://blog.csdn.net/frank_good/article/details/50856585
// https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
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
                    <p>用户名：{{this.$route.params.username}}</p>
                    <p>积分：{{this.$route.params.score}}</p>
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
            players:[]
        }
    },
    components:{
        player
    }
}
</script>

<style >
*{
    padding: 0;
    margin: 0
}
html,body{
    height: 100%;  
    width: 100%; ;
    overflow:hidden;
    background-image: url(../assets/img/background.jpg);
}




/*使lobby占满屏幕*/
div.lobby{  

    height: 100%;  
    width: 100%;  

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

