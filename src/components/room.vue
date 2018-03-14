<template>

  <div class="room">
    <div class="readyDiv">
        <el-button type="primary" round @click="readyFunc" v-show="flag.readyShow">准备</el-button>
    </div>
    <div class="seats">
        <div class="seat one" >
            <player :userinfo="player1" :begin-flag="flag.bottomPokersFlag" :actionFlag="actionFlag[0]">  </player>  
        </div>
        <div class="seat two" >
            <player :userinfo="player2" :begin-flag="flag.bottomPokersFlag" :actionFlag="actionFlag[1]">  </player> 
        </div>
        <div class="seat three" >
            <player :userinfo="player3" :begin-flag="flag.bottomPokersFlag" :actionFlag="actionFlag[2]">  </player> 
        </div>
        <div class="seat four" >
            <player :userinfo="player4" :begin-flag="flag.bottomPokersFlag" :actionFlag="actionFlag[3]">  </player> 
        </div>
        <div class="seat five" >
            <player :userinfo="player5" :begin-flag="flag.bottomPokersFlag" :actionFlag="actionFlag[4]">  </player> 
        </div>
    </div>

    <div class="signout">
        <button @click="signout">退出房间</button>
    </div>
    
    <div class="publicPokers">
        <img :src="public1" alt="第一张公共牌" v-show="publicPokerFlag.flop">
        <img :src="public2" alt="第二张公共牌" v-show="publicPokerFlag.flop">
        <img :src="public3" alt="第三张公共牌" v-show="publicPokerFlag.flop">
        <img :src="public4" alt="第四张公共牌" v-show="publicPokerFlag.turn">
        <img :src="public5" alt="第五张公共牌" v-show="publicPokerFlag.river">
    </div>
    
    <div class="bottom" >
        <div class="actionPanel" v-if="flag.actionPanel">
            <el-button type="primary" :disabled="disabled.Check" round @click="checkFunc" >让牌</el-button>    
            <el-button type="primary" :disabled="disabled.Fold" round @click="foldFunc" >弃牌</el-button>     
            <el-button type="primary" :disabled="disabled.Call" round @click="callFunc" >跟住</el-button>   
            <el-button type="primary" :disabled="disabled.Raise" round @click="raiseFunc" >加注</el-button>  
            <el-button type="primary" :disabled="disabled.AllIn" round @click="allInFunc" >all in</el-button>       
        </div>
        <div class="actionTime" v-show="actionTime.show">{{this.actionTime.time}}</div>
        <div class="myseat" >
            <div class="left">
                <span>{{this.username}}</span>
                <div class="myScore">
                    <img class="gold" src="../assets/img/gold.png" alt="gold">
                    <span>{{this.score}}</span>
                </div>
            </div>
            <div class="right">
                <div class="myBet">{{this.myBet}}</div>
                <div>
                    <img class="card" :src="srcBottomPoker0" id="poker0" v-show="flag.bottomPokersFlag">
                    <img class="card" :src="srcBottomPoker1" id="poker1"  v-show="flag.bottomPokersFlag">
                </div>
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
                bottomPokersFlag:false,
                actionPanel:false
            },
            disabled:{
                Check:true,
                Fold:false,
                Call:false,
                Raise:false,
                AllIn:false,
            },
            actionTime:{
                time:20,
                show:false
            },
            bottomPoker0:'pokerBack',
            bottomPoker1:'pokerBack',
            //我的押注
            myBet:0,
            //底池
            Pot:0,
            //盲注
            blind:10,
            //上个玩家的押注
            lastBet:0,
            //定时器
            timer:{}, 
            //正在行动标志
            actionFlag:[false,false,false,false,false],
            
            //公共牌组
            pokerDefault:{
                pokerDefault1:'pokerBack',
                pokerDefault2:'pokerBack',
                pokerDefault3:'pokerBack',
                pokerDefault4:'pokerBack',
                pokerDefault5:'pokerBack',
            },
            publicPokerFlag:{
                flop:false,
                turn:false,
                river:false
            }
        }
    },
    computed:{
        srcBottomPoker0:function(){
            return require("../assets/img/"+this.bottomPoker0+".jpg")
        },
        srcBottomPoker1:function(){
            return require("../assets/img/"+this.bottomPoker1+".jpg")
        },
        public1:function(){
            return require("../assets/img/"+this.pokerDefault.pokerDefault1+".jpg")
        },
        public2:function(){
            return require("../assets/img/"+this.pokerDefault.pokerDefault2+".jpg")
        },
        public3:function(){
            return require("../assets/img/"+this.pokerDefault.pokerDefault3+".jpg")
        },
        public4:function(){
            return require("../assets/img/"+this.pokerDefault.pokerDefault4+".jpg")
        },
        public5:function(){
            return require("../assets/img/"+this.pokerDefault.pokerDefault5+".jpg")
        },
    },
    methods:{
        signout:function(){
            if(confirm("确定要退出房间吗？")){
                this.$http.post('/api/signout',{
                    username:localStorage.username,
                    seatNum:this.seatNum
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
                    username:this.username,
                    seatNum:this.seatNum
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
        },
        actionOver:function(){
            clearInterval(this.timer)
            this.timer={}
            this.actionTime.time=20
            this.actionTime.show=false
            this.flag.actionPanel=false
        },
        checkFunc:function(){
            this.actionOver()
            this.$socket.emit('actionOver', {status:3,num:this.lastBet});
        },
        callFunc:function(){
            this.actionOver()
            this.score=this.score-(this.lastBet-this.myBet)
            this.myBet=this.lastBet
            this.$socket.emit('actionOver', {status:1,num:this.lastBet});
        },
        foldFunc:function(){
            this.actionOver()
            this.$socket.emit('actionOver', {status:2,num:this.lastBet});
        },
        raiseFunc:function(){
            this.actionOver()
            this.score=this.score-(this.lastBet+20-this.myBet)
            this.myBet=this.lastBet+20 
            this.$socket.emit('actionOver', {status:1,num:this.myBet});
        },
        allInFunc:function(){
            this.actionOver()
            this.myBet+=this.score
            this.score=0

            //传递给服务器的最大值
            let sendBet=this.myBet>this.lastBet?this.myBet:this.lastBet 

            this.$socket.emit('actionOver', {status:4,num:sendBet})
        },
        getPlayers:function(){
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
                    _this.player1={}
                    _this.player2={}
                    _this.player3={}
                    _this.player4={}
                    _this.player5={}
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
        }
        
    },
    created:function(){
        
        if(localStorage.flag){
            let flag=JSON.parse(localStorage.flag)
            this.flag.ready=flag.ready
            this.flag.readyShow=flag.readyShow
            this.flag.bottomPokersFlag=flag.bottomPokersFlag
            this.flag.actionPanel=flag.actionPanel
            if(flag.bottomPokersFlag){
                this.bottomPoker0=localStorage.bottomPoker0
                this.bottomPoker1=localStorage.bottomPoker1
            }
        }else{
            localStorage.setItem('flag',JSON.stringify(this.flag))
        }
        this.getPlayers()
    },
    beforeDestroy:function(){
        //很多东西代写，如果刷新要保存哪些东西到localstorage；如果退出要怎样
        localStorage.removeItem('bottomPoker0')
        localStorage.removeItem('bottomPoker1')
    },
    components:{
        player,chatroom
    },
    sockets:{
        actionFlag:function(data){
            let seatNum=data.seatNum
            this.actionFlag=[false,false,false,false,false]
            let arr=this.actionFlag
            arr[seatNum]=true
            this.actionFlag=arr
        },
        getPlayers:function(){
            this.getPlayers()
        },
        bottomPokers:function(data){
            this.flag.readyShow=false
            this.flag.bottomPokersFlag=true
            let flag=JSON.parse(localStorage.flag)
            flag.readyShow=false
            flag.bottomPokersFlag=true
            localStorage.setItem('flag',JSON.stringify(flag))
            let bottomPokers=data
            localStorage.setItem('bottomPoker0',bottomPokers[0])
            localStorage.setItem('bottomPoker1',bottomPokers[1])
            this.sendBottomPokers() 
        },
        action:function(data){
            console.log(data)
            this.$socket.emit('takingAction',{
                seatNum:this.seatNum,
            })
            this.lastBet=data.lastBet
            if(this.seatNum===data.smallBlindPosition){
                console.log('小盲注')
                this.myBet=this.blind
                this.score-=this.myBet
                this.$socket.emit('actionOver', {status:0,num:this.blind});
            }else if(this.seatNum===(data.smallBlindPosition+1)){
                console.log('大盲注')
                this.myBet=this.blind*2
                this.score-=this.myBet
                this.$socket.emit('actionOver', {status:0,num:this.blind*2});
            }else{
                //点了操作面板，此timer失效
                console.log('非大小盲注')
                this.actionTime.show=true
                let _this=this
                this.timer=setInterval(function(){
                    if(_this.actionTime.time>0){
                        _this.actionTime.time--
                    }else{
                        _this.actionOver()
                    }
                },1000)

                this.flag.actionPanel=true
                this.disabled.Check=true
                this.disabled.Call=false
                this.disabled.Raise=false
                //如果筹码不足，使部分按钮失效
                console.log('data.lastBet:'+data.lastBet)
                console.log('this.myBet:'+this.myBet)
                console.log(typeof data.lastBet)
                console.log(typeof this.myBet)
                if((this.score+this.myBet)<=data.lastBet){
                    console.log('1')
                    this.disabled.Call=true
                }else if(this.score<=(data.lastBet+20)){
                    console.log('2')
                    this.disabled.Raise=true
                }else if(this.myBet===data.lastBet){
                    console.log('3')
                    this.disabled.Check=false
                    this.disabled.Call=true
                }else{
                    console.log('4')
                    //没想好
                }

            }
        },
        sendPlayerInfo:function(playerInfo){
            console.log('sendPlayerInfo中playerInfo:'+playerInfo)
            let seatNum=playerInfo.seatNum
            if(!playerInfo.username){
                playerInfo={}
            }
            if(seatNum===(this.seatNum+1)%6){
                this.player1=playerInfo
            }else if(seatNum===(this.seatNum+2)%6){
                this.player2=playerInfo
            }else if(seatNum===(this.seatNum+3)%6){
                this.player3=playerInfo
            }else if(seatNum===(this.seatNum+4)%6){
                this.player4=playerInfo
            }else if(seatNum===(this.seatNum+5)%6){
                this.player5=playerInfo
            }else{
                alert(this.seatNum)
                alert('排序出错')
            }
        },
        flop:function(data){
            let arrPoker=data.arrPoker
            this.publicPokerFlag.flop=true
            this.pokerDefault.pokerDefault1=arrPoker[0]
            this.pokerDefault.pokerDefault2=arrPoker[1]
            this.pokerDefault.pokerDefault3=arrPoker[2]
        },
        turn:function(data){
            let arrPoker=data.arrPoker
            this.publicPokerFlag.turn=true
            this.pokerDefault.pokerDefault4=arrPoker[0]
        },
        river:function(data){
            let arrPoker=data.arrPoker
            this.publicPokerFlag.river=true
            this.pokerDefault.pokerDefault5=arrPoker[0]
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

/*公共牌区域*/
div.publicPokers{
    height: 30%;
    width: 40%;
    position: absolute;
    left: 31%;
    top: 37%; 
}
div.publicPokers img{
    height: 70%;
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
    height: 90%;
    width:25%;
    background:rgba(58,174,224,0.2);
    position: relative;
    left:35%;
    display: flex;
    border: 1px solid black
}
div.myseat div.left{
    display: block;
    height: 100%;
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items:space-between;
    padding-top: 5%;
}
div.myseat div.right{
    display: block;
    height: 100%;
    width: 75%;
}
div.myScore{
    height: 20%;
    margin-top: 15%;
    /*margin-bottom: 5%;*/
}
div.myseat img.gold{
    height: 50%;
    position: relative;
    top: 8%;
}
div.myBet{
    margin-top: 2%;
    margin-bottom: 3%;
    font-size: 20px;
    color: yellow
}



/*div.chatroom调整*/
div.chatroom{
    position: relative;
    bottom:20%;
    height: 120%;
    width:25%;   
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

/*准备键*/
div.readyDiv{
    position: absolute;
    top: 80%;
    left:26%;
}
div.readyDiv button{
    height: 200%;
    width: 120%;
    font-size: 150%;
}

/*操作面板*/
div.actionPanel{
    position: absolute;
    bottom:27%;
    left:36%
}

/*剩余时间*/
div.actionTime{
    position: absolute;
    bottom:27%;
    left:62%;
    font-size: 35px;
    color:red;
}
</style>
