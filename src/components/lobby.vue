<template>
    <!--<div>-->
        <div class="lobby">
            <div class="topPanel ">
                <div>
                    <div class="seat top">
                        <div class="topPanelPerson">
                            <img src="../assets/img/user.png" class="user" alt="user">
                            <span>namasde</span>
                        </div>
                            
                        <div class="middlePanelPerson">
                            <img src="../assets/img/pokerBack.jpg" class="pokerBackLeft " alt="pokerBack">
                            <img src="../assets/img/pokerBack.jpg" class="pokerBackRight" alt="pokerBack">
                        </div>
                        <div class="bottomPanelPerson">
                            <span>135分</span>
                        </div>    
                    </div>
                    <div class="seat top">
                        
                    </div>
                    <div class="seat top">
                        
                    </div>
                    <div class="seat top">
                        
                    </div>
                </div>  
            </div>
            <div class="middlePanel">
                <!--<div>-->
                    <div class="seat">
                        
                    </div>
                    <div class="public">
                        
                    </div>
                    <div class="seat">
                        
                    </div>
                <!--</div>-->
                    
            </div>
            <div class="bottomPanel">
                <div class="myseat">
                    
                </div>
                <div class="chatroom">
                    
                </div>
            </div>
        </div>
    <!--</div>    -->
</template>
<script>
export default {
    data () {
        return {
        }
    },
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
img.pokerBackLeft,img.pokerBackRight{
    height: 80%;
}
img.pokerBackLeft{
    transform:rotate(-15deg);
}
img.pokerBackRight{
    transform:rotate(15deg);
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

