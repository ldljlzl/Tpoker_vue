cd C:\Program Files\MongoDB\Server\3.4\bin
mongod --dbpath=C:\Users\Administrator\tpoker_vue\db --port=28017


// 1.计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。
// 这也同样意味着下面的计算属性将不再更新，因为 Date.now() 不是响应式依赖：
computed: {
  now: function () {
    return Date.now()
  }
}

// 2.使用 watch 选项允许我们执行异步操作 (访问一个 API)，在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。
https://cn.vuejs.org/v2/guide/computed.html#侦听器

3.v-if 和 v-show
// v-show 只是简单地切换元素的 CSS 属性 display。

// 4.由于 JavaScript 的限制，Vue 不能检测对象属性的添加或删除,   根级别   的响应式属性
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的

// 但是，可以使用 Vue.set(object, key, value)向   嵌套对象   添加响应式属性
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
Vue.set(vm.userProfile, 'age', 27)


4.body-parser
// body-parser是非常常用的一个express中间件，作用是对post请求的请求体进行解析。使用非常简单，以下两行代码已经覆盖了大部分的使用场景
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//一个接受form请求，一个接受json请求，解析的规则不一样

5.app.vue中不要<style scoped>
子组件用<style scoped>


6.
// webpack 大部分是 vue-cli 自动生成的，添加了让前后端http请求都转到node的3000端口，而不是前端的8080端口的配置。

devServer: {
    historyApiFallback: true,
    noInfo: true,

    //让前后端http请求都转到node的3000端口，而不是前端的8080端口
    proxy: {
      '/': {
        target: 'http://localhost:3000/'
      }
    }
  }

7.socket.io
socket.io官网若使用Express 3/4代码为
// var app = require('express')();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);

// server.listen(80);

//改为
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);

8.vue路由params传参
//  this.$router.push() 方法中 path不能和params一起使用，否则params将无效。需要用name来指定页面。

9.localstorage
// 存：localStorage.setItem('mydata',JSON.stringify(data.body.data))
// 取：var mydata = JSON.parse(localStorage.mydata)
// 删：storage.removeItem("mydata");
// 改：storage.setItem("mydata","again data"); 
// 存localStorage记得不要存对象，要转换成字符串

10.钩子
// beforecreate : 举个栗子：可以在这加个loading事件 
// created ：在这结束loading，还做一些初始化，实现函数自执行 
// mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情
// beforeDestory： 你确认删除XX吗？ destoryed ：当前组件已被删除，清空相关内容

11.路由钩子
// 1）当页面中有未关闭的窗口, 或未保存的内容时, 阻止页面跳转
beforeRouteLeave (to, from, next) {
 //判断是否弹出框的状态和保存信息与否
 if (this.dialogVisibility === true) {
  this.dialogVisibility = false //关闭弹出框
  next(false) //回到当前页面, 阻止页面跳转
 }else if(this.saveMessage === false) {
  alert('请保存信息后退出!') //弹出警告
  next(false) //回到当前页面, 阻止页面跳转
 }else {
  next() //否则允许跳转
 }
}

// 2）当用户需要关闭页面时, 可以将公用的信息保存到session或Vuex中
beforeRouteLeave (to, from, next) {
  localStorage.setItem(name, content); //保存到localStorage中
  next()
}

12.函数中this指向发生变化
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
    }
},

13.vue使用element-ui的el-input监听不了键盘事件，
// 原因应该是element-ui自身封装了一层div在input标签外面，把原来的事件隐藏了，所以要加.native，如@keyup.enter.native="sendMsg"


14.
// vue中methods一个方法调用另外一个方法，如test(),需要
this.$options.methods.test()

15.透明度
// 背景和后代（比如文字）都透明，用opcity
// 背景透明，文字不透明，用background:rgba(0-255,0-255,0-255,0-1)，其中最后一项为透明度

16.滚动条
// 在CSS中设置，得到滚动条
div{
  overflow:auto;
}
// 设置滚动的距离，使滚动条位于底部
showMsgDiv.scrollTop = 9999;

17.获取点击事件的元素，修改文本
ready:function(elem){
    // console.log(elem)为该点击事件
    // console.log(elem.target)当前点击的元素
    // console.log(elem.currentTarget)绑定事件的元素
    elem.target.innerText='取消准备'
    // 或者
    elem.target.innerHTML='取消准备'
    
} 


18.v-if vs v-show
// v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
// v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
// 相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS display进行切换。
// 一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

19.Boolean
Boolean('false')为true
