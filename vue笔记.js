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
