# task-9

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
主要使用 `vue.js+element-ui+socket.io+express+momgodb`



## [任务说明](http://ife.baidu.com/course/detail/id/120)    
本项目来源于IFE（百度前端技术学院）的综合实战题目。由于只有一个题目，项目一切需从头开始设计，且没有IFE学员提交符合要求的作品，于是想尝试开发一个2-6人即时对战的德州扑克游戏系统，以锻炼自己开发复杂应用的能力。

### 任务目的
综合运用各种前端技术，实现一款复杂的大型应用：在线德州扑克

### 应用简介 
任务中的“在线德州扑克”类似于“微扑克”或“德扑圈”，是朋友间组织牌局的工具应用。
这一部分，我们通过使用JavaScript编写基础算法的方式，了解德州扑克的基本规则。规则介绍参考（[百度百科](http://baike.baidu.com/link?url=jKADh0XgSlQXR1l9WRPDNauZ1sBBSCcYdzhy-xDuJIbvimpNh6St0l3d34HZWLa1w_toImFXjZXycJzkyeSfHFXcuuDEKDHmjmY3GtyO33BAiT8wuk5Wwoc1pRp9DZ6LZiNLcjNPmwn5Io1xjP_iMU21Nni8CSUEhrrzfvmXLcgsFWdpHSs-gTeK_qhPeonWjJBrIB7uzSCUDQWFTgY02zK_q7CkEUv6QwCKELM1pfK) or [维基百科](https://zh.wikipedia.org/wiki/%E5%BE%B7%E5%B7%9E%E6%92%B2%E5%85%8B)）
### 主要难点
一.设计一套合理的`数据结构`代表52张牌和牌型，并实现和封装`牌型判定`和`牌面大小比较`的功能
二.实现各个玩家`游戏即时交互`


### 实现后的截图


<br> 
大厅（写的比较简单）

![Image 大厅](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/%E5%A4%A7%E5%8E%85.PNG)
<br><br> 
简单的注册，登录
![image 注册](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/%E6%B3%A8%E5%86%8C.PNG)
<br>
![image 登录](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/%E7%99%BB%E5%BD%95.PNG)
<br><br> 

进入游戏房间
![image 房间](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/%E6%88%BF%E9%97%B4.PNG)

<br><br> 
右下角的在线聊天室
![image 在线聊天室](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/%E5%9C%A8%E7%BA%BF%E8%81%8A%E5%A4%A9%E5%AE%A4.PNG)
<br><br> 
游戏开始
![image 游戏开始](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/%E6%B8%B8%E6%88%8F%E5%BC%80%E5%A7%8B.PNG)
<br><br> 
可以实时显示其他玩家情况（玩家名，筹码数，本局押注，上一步动作，正在行动标志（蓝手标志））
![image 玩家情况](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/玩家情况.PNG)

<br><br> 
flop
![image flop](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/flop.PNG)

<br><br> 
turn
![image turn](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/turn.PNG)

<br><br> 
river
![image river](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/river.PNG)

<br><br> 
胜利后的界面（即时完成筹码清算）
![image win](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/win.PNG)


<br><br> 
失败后的界面（即时完成筹码清算）
![image lose](https://github.com/ldljlzl/projectPic/blob/master/Tpoker/river.PNG)





For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
