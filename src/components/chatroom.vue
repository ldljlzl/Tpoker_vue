<template>
    <div class="chatroom">
        <div class="showMsg">
            
        </div>
        <div class="inputMsg">
            <el-input size="large" v-model="message" @keydown.enter.native="sendMsg" placeholder="请输入内容"></el-input>
            <el-button @click="sendMsg" type="primary">发送</el-button>
        </div>
    </div>
</template>
<script>
import player from './player'
import chatroom from './chatroom'
export default {
    props:{
        usernameProps:{
            type:String,
            default:''
        }
    },
    data () {
        return {
            message:''
        }
    },
    
    methods:{
        addMsgToPanel:function(username,msg){
            let showMsgDiv=document.getElementsByClassName("showMsg")[0]
            let myDiv=document.createElement("div")
            let text=document.createTextNode(username+": "+msg)
            myDiv.appendChild(text)
            showMsgDiv.appendChild(myDiv)
            myDiv.style.cssText='display:flex;font-size:130%;'
            showMsgDiv.scrollTop = 9999;
        },
        sendMsg:function(){
            if(this.message){
                
                this.$socket.emit('sendMessage',{
                    username:this.username,
                    msg:this.message
                })
                this.$options.methods.addMsgToPanel(this.username,this.message)
                this.message=''
            }else{
                alert('输入框不能为空')
            }
                
        },

        
    },
    computed:{
        username:function(){
            return this.usernameProps
        },
    },
    //监听socket.io事件
    sockets:{
        connect:function(){
            console.log('socket connected')
        },
        receiveMsgSuccess:function(data){
            console.log('receiveMsgSuccess')
            this.$options.methods.addMsgToPanel(data.username,data.msg)
        }
    },
   
}
</script>
<style scoped>
/*div.chatroom调整*/
div.chatroom{
    position: relative;
    bottom:20%;
    height: 120%;
    width:25%;    
}
div.showMsg{
    height: 70%;
    background-color: #c6c2fe;
    background:rgba(198,194,254,0.4);
    padding: 5%;
    overflow:auto;

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




</style>
