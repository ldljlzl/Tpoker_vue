# 在线德州扑克
<br>  <br> 



## 项目来源
<br>  
本项目来源于IFE（百度前端技术学院）
<br>  
综合实战：在线德州扑克（一）http://ife.baidu.com/course/detail/id/120
<br>  
综合实战：在线德州扑克（二）http://ife.baidu.com/course/detail/id/121
<br>  
综合实战：在线德州扑克（三）http://ife.baidu.com/course/detail/id/122
<br>  

<br>  
由于只有一个题目，项目一切需从头开始设计，且没有IFE学员提交符合要求的作品，于是想尝试一下，锻炼开发复杂应用的能力。使用的技术栈为 `vue.js+element-ui+socket.io+express+momgodb`。实现了一个了一个2-6人即时对战的德州扑克游戏系统，附带即时通讯聊天室
<br>  <br>  <br>  
## 主要难点
一.设计一套合理的`数据结构`代表52张牌和牌型，并实现和封装 `牌型判定` 和 `牌面大小比较` 的功能
二.实现各个玩家`游戏即时交互`

<br>  <br>  
/server/step目录下的js文件分别代表
Perflop—先下大小盲注，然后给每个玩家发2张底牌，大盲注后面第一个玩家选择跟注、加注或者盖牌放弃，按照顺时针方向，其他玩家依次表态，大盲注玩家最后表态，如果玩家有加注情况，前面已经跟注的玩家需要再次表态甚至多次表态。

Flop—同时发三张公牌，由小盲注开始（如果小盲注已盖牌，由后面最近的玩家开始，以此类推），按照顺时针方向依次表态，玩家可以选择下注、加注、或者盖牌放弃。

Turn—发第4张牌，由小盲注开始，按照顺时针方向依次表态。

River—发第五张牌，由小盲注开始，按照顺时针方向依次表态，玩家可以选择下注、加注、或者盖牌放弃。

judge—经过前面4轮发牌和下注，剩余的玩家开始亮牌比大小，成牌最大的玩家赢取池底。


<br>  <br>  <br>  
大厅（写的比较简单）

![Image](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/%E5%A4%A7%E5%8E%85.PNG)
![image](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/大厅.png)
<br><br> 
简单的注册，登录
![image](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/注册.png)
<br>
![image](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/登录.png)
<br><br> 

进入游戏房间
![image](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/房间.png)

<br><br> 
右下角的在线聊天室
![image](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/在线聊天室.png)
<br><br> 
游戏开始
![image](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/游戏开始.png)
<br><br> 
可以实时显示其他玩家情况（玩家名，筹码数，本局押注，上一步动作，正在行动标志（蓝手标志））
![image](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/玩家情况.png)

<br><br> 
flop
![image](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/flop.png)

<br><br> 
turn
![image](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/turn.png)

<br><br> 
river
![image](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/river.png)

<br><br> 
胜利后的界面（即时完成筹码清算）
![image](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/win.png)


<br><br> 
失败后的界面（即时完成筹码清算）
![image](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/river.png)



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
