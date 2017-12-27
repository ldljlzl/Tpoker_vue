<template>
    <div class="main">
      <div>
        <h1>登录</h1>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm2.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="button"  type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          </el-form-item>
        </el-form>
        <div class="toRegister">
          <router-link to='/register'>没有账号，前去注册</router-link>
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
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style>
div.main{
  display: flex;
  justify-content: center;
}
div.main>div{
  width: 25%;
}
h1{
  position: relative;
  left: 9%;
}
div.toRegister{
  display: flex;
  justify-content: flex-end;
}
.button{
    width: 100%
}
</style>