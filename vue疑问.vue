1.$event  介绍
  <button v-on:click="warn('Form cannot be submitted yet.', $event)">
    Submit
  </button>


  methods: {
    warn: function (message, event) {
      // 现在我们可以访问原生事件对象
      if (event) event.preventDefault()
      alert(message)
    }
  }