<template>
    <div class="main">
      <div>
        <h1>注册</h1>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm2.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="toLogin">
          <router-link to='/signin'>已有账号，前去登录</router-link>
        </div>
      </div>
    </div>
    
</template>

<script>
  export default {
    data() {
      var checkAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }
        setTimeout(() => {
          if (value.length<6) {
            callback(new Error('账号由至少6位的字符组成'));
          } else {
            callback();
          }
        }, 500);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value.length<6) {
            callback(new Error('密码由至少6位的字符组成'));
        }else{
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          account: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
            //'blur'失去焦点时触发
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          account: [
            { validator: checkAccount, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      register:function(){
        this.$http.post('/api/register',{
          account:this.ruleForm2.account,
          password:this.ruleForm2.pass
        }).then((response)=>{
          alert(response.body.msg)
          if(response.body.status===2){
            //status=2时注册成功
            this.$router.push({ path: 'signin' })
          }
        })
      }
    },
    created:function(){
      if(localStorage.username){
        alert('您已登录，直接进入房间')
        this.$router.push('room')
      }
    }
  }
</script>
<style scoped>
div.main{
  margin-top: 5%;
  display: flex;
  justify-content: center;
}
div.main>div{
  width: 25%;
}
div.toLogin{
  display: flex;
  justify-content: flex-end;
}
</style>