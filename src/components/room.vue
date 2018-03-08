<template>

  <div class="room">
    <div class="readyDiv">
        <el-button type="primary" round @click="readyFunc" v-show="flag.readyShow">准备</el-button>
    </div>
    <div class="seats">
        <div class="seat one" >
            <player :userinfo="player1" :begin-flag="flag.bottomPokersFlag">  </player>  
        </div>
        <div class="seat two" >
            <player :userinfo="player2" :begin-flag="flag.bottomPokersFlag">  </player> 
        </div>
        <div class="seat three" >
            <player :userinfo="player3" :begin-flag="flag.bottomPokersFlag">  </player> 
        </div>
        <div class="seat four" >
            <player :userinfo="player4" :begin-flag="flag.bottomPokersFlag">  </player> 
        </div>
        <div class="seat five" >
            <player :userinfo="player5" :begin-flag="flag.bottomPokersFlag">  </player> 
        </div>
    </div>

    <div class="signout">
        <button @click="signout">退出房间</button>
    </div>
    
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
                <img class="card" :src="srcBottomPoker0" id="poker0" v-show="flag.bottomPokersFlag">
                <img class="card" :src="srcBottomPoker1" id="poker1"  v-show="flag.bottomPokersFlag">
            </div>
                
        </div>
        <chatroom :usernameProps="username"></chatroom>
    </div>
        
  </div>
</template>
<script>
import player from './player'
import chatroom from './chatroom'
export default {
    data () {
        return {
            player1:{},
            player2:{},
            player3:{},
            player4:{},
            player5:{},
            seatNum:100,
            score:10000,
            username:'lzl',
            flag:{
                ready:false,
                readyShow:true,
                bottomPokersFlag:false
            },
            bottomPoker0:'pokerBack',
            bottomPoker1:'pokerBack',
            //我的押注
            myBet:0,
            //底池
            Pot:0,
            //盲注
            blind:10,
                
            
        }
    },
    computed:{
        srcBottomPoker0:function(){
            return require("../assets/img/"+this.bottomPoker0+".jpg")
        },
        srcBottomPoker1:function(){
            return require("../assets/img/"+this.bottomPoker1+".jpg")
        }
    },
    methods:{
        signout:function(){
            if(confirm("确定要退出房间吗？")){
                this.$http.post('/api/signout',{
                    username:localStorage.username
                }).then((response=>{
                    // 要求退出响应正确回调
                    localStorage.removeItem('username')
                    localStorage.removeItem('bottomPoker0')
                    localStorage.removeItem('bottomPoker1')
                    localStorage.removeItem('flag')
                    alert(response.body.msg)
                    this.$router.push('/')
                }),(response)=>{
                    // 要求退出响应失败
                    alert('退出房间错误')
                })
            }  
        },  
        readyFunc:function(elem){
            console.log(this.flag)
            console.log(localStorage.flag)
            let flag=JSON.parse(localStorage.flag)
            if(this.flag.ready){
                console.log('取消准备')
                flag.ready=false
                this.flag.ready=false
                localStorage.setItem('flag',JSON.stringify(flag))
                elem.target.innerText='准备'
                this.$http.post('/api/cancelReady',{
                    username:this.username
                }).then((response)=>{
                    if(response.body.status===2){
                        console.log('取消准备成功')
                    }else{
                        console.log('取消准备失败')
                    }
                })
            }else{
                let _this=this 
                this.$http.post('/api/ready',{
                    username:this.username
                }).then((response)=>{
                    if(response.body.status===2){
                        flag.ready=true
                        _this.flag.ready=true
                        localStorage.setItem('flag',JSON.stringify(flag))
                        elem.target.innerText='取消准备'
                        console.log('准备成功')
                    }else{
                        alert(response.body.msg)
                    }
                })
            }
        },
        sendBottomPokers:function(){
            let bottomPoker0=document.getElementById('poker0')
            let bottomPoker1=document.getElementById('poker1')
            let src0='../static/img/'+localStorage.bottomPoker0+'.jpg'
            let src1='../static/img/'+localStorage.bottomPoker1+'.jpg'
            bottomPoker0.src=src0
            bottomPoker1.src=src1 
        }
    },
    created:function(){
        if(localStorage.flag){
            let flag=JSON.parse(localStorage.flag)
            this.flag.ready=flag.ready
            this.flag.readyShow=flag.readyShow
            this.flag.bottomPokersFlag=flag.bottomPokersFlag
            if(flag.bottomPokersFlag){
                this.bottomPoker0=localStorage.bottomPoker0
                this.bottomPoker1=localStorage.bottomPoker1
            }
        }else{
            localStorage.setItem('flag',JSON.stringify(this.flag))
        }
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
                        _this.$socket.emit('sendSeatNum',{
                            seatNum:_this.seatNum,
                        })
                    }
                })
                players.filter((item)=>(item.username!==localStorage.username)).forEach(function(item){
                    if(item.seatNum===(_this.seatNum+1)%6){
                        _this.player1=item
                    }else if(item.seatNum===(_this.seatNum+2)%6){
                        _this.player2=item
                    }else if(item.seatNum===(_this.seatNum+3)%6){
                        _this.player3=item
                    }else if(item.seatNum===(_this.seatNum+4)%6){
                        _this.player4=item
                    }else if(item.seatNum===(_this.seatNum+5)%6){
                        _this.player5=item
                    }else{
                        alert(_this.seatNum)
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
        player,chatroom
    },
    sockets:{
        bottomPokers:function(data){
            this.flag.readyShow=false
            this.flag.bottomPokersFlag=true
            let flag=JSON.parse(localStorage.flag)
            flag.readyShow=false
            flag.bottomPokersFlag=true
            localStorage.setItem('flag',JSON.stringify(flag))
            let bottomPokers=data
            console.log(bottomPokers)
            localStorage.setItem('bottomPoker0',bottomPokers[0])
            localStorage.setItem('bottomPoker1',bottomPokers[1])
            this.$options.methods.sendBottomPokers() 
        },
        action:function(smallBlindPosition){
            if(this.seatNum===smallBlindPosition){
                this.myBet=this.blind
                this.$socket.emit('actionOver', {status:0,num:this.blind});
            }else if(this.seatNum===(smallBlindPosition+1)){
                this.myBet=this.blind*2
                this.$socket.emit('actionOver', {status:0,num:this.blind*2});
            }else{

            }
        }
    },
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
    position: relative;
    bottom:20%;
    height: 120%;
    width:25%;
    /*background-color: red;*/
    
}
div.showMsg{
    height: 87%;
    background-color: #c6c2fe;
    opacity: 0.4;
    /*background-color: red;*/
}
div.inputMsg{
    height: 13%;
    opacity: 0.7;
    background-color: #c3c3c3;
    display: flex;
}
div.inputMsg el-input{
    /*height: 120%;*/
    width: 80%;
    margin-bottom: 0;
    padding-bottom: 0;
}
div.inputMsg el-button{
    width: 20%;
    opacity: 1;
    height: 15px;
}
/*.lzl{
    position: absolute;
    height: 200px;
}*/


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

/*准备键*/
div.readyDiv{
    position: absolute;
    top: 80%;
    left:30%;
}
div.readyDiv button{
    height: 200%;
    width: 120%;
    font-size: 150%;
}
</style>
