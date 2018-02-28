<template>
  <div class="room">
    <div class="seat one" >
        <!--{{this.player1.username}}-->
        <player :userinfo="player1">  </player>  
    </div>
    <div class="seat two" >
        <player :userinfo="player2">  </player> 
    </div>
    <div class="seat three" >
        <player :userinfo="player3">  </player> 
    </div>
    <div class="seat four" >
        <player :userinfo="player4">  </player> 
    </div>
    <div class="seat five" >
        <player :userinfo="player5">  </player> 
    </div>
    <div class="seat six" >
        <player :userinfo="player6">  </player> 
    </div>
    <div class="signout">
        <button @click="signout">退出房间</button>
    </div>
    <!--<div>
        <ul>
            <li v-for="item in players">
                {{item.username}}
            </li>
        </ul>
    </div>-->
    <div class="bottom">
        <div class="myseat" >
            <div class="left">
                <span>{{this.username}}</span>
                <div class="myScore">
                    <img class="gold" src="../assets/img/gold.png" alt="gold">
                    <span>{{this.score}}</span>
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
            player1:{
                // ready:false,
                // flag:false,  
                // username:'default',
                // score:0,
                // pokerDefault:'pokerBack',    
            },
            player2:{
                // ready:false,
                // flag:false,  
                // username:'lzl',
                // score:100,
                // pokerDefault:'pokerBack', 
            },
            player3:{},
            player4:{},
            player5:{},
            player6:{},
            seatNum:100,
            score:10000,
            username:'lzl'
        }
    },
    methods:{
        signout:function(){
            this.$http.post('/api/signout',{
                username:localStorage.username
            }).then((response=>{
                // 要求退出响应正确回调
                localStorage.removeItem('username')
                alert(response.body.msg)
                this.$router.push('/')
            }),(response)=>{
                // 要求退出响应失败
                alert('退出房间错误')
            })
        },
    },
    computed:{
    },
    // beforeCreate:function(){
    //   if(!localStorage.username){
    //     alert('您还没登录，请先登录')
    //     this.$router.push('signin')
    //   }
    // },
    created:function(){
        // this.player3=this.player1
        // this.player4=this.player1
        // this.player5=this.player1
        // this.player6=this.player1

        let _this=this
        this.$http.get('/api/getPlayers').then((response)=>{
            // 响应正确回调
            if(response.body.status===2){
                let players=response.body.playersInRoom
                players.forEach(function(item){
                    if(item.username===localStorage.username){
                        //函数中this指向发生变化
                        _this.username=item.username
                        _this.seatNum=item.seatNum
                        _this.score=item.score
                    }
                })
                players.filter((item)=>(item.username!==localStorage.username)).forEach(function(item){
                    if(item.seatNum===(_this.seatNum+1)%7){
                        _this.player1=item
                        // alert(_this.player1.username)
                    }else if(item.seatNum===(_this.seatNum+2)%7){
                        _this.player2=item
                        // alert(_this.player2.username)
                    }else if(item.seatNum===(_this.seatNum+3)%7){
                        // alert('3')
                        _this.player3=item
                    }else if(item.seatNum===(_this.seatNum+4)%7){
                        // alert('4')
                        _this.player4=item
                    }else if(item.seatNum===(_this.seatNum+5)%7){
                        // alert('5')
                        _this.player5=item
                    }else if(item.seatNum===(_this.seatNum+6)%7){
                        // alert('6')
                        _this.player6=item
                    }else{
                        alert('排序出错')
                    }
                })

            }
        },
        (response)=>{
            // 响应错误回调
            alert('请求房间用户列表失败')
        })
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


/*退出键*/
div.signout{
    position: absolute;
    right:3%;
    top:3%;
    
}
div.signout button{
    height: 40px;
    width: 100px;
    font-size: 20px;
}


</style>
