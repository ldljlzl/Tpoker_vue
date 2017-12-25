<template>
    <div>
        <el-radio-group v-model="labelPosition" size="small">
            <el-radio-button label="left">账号</el-radio-button>
            <el-radio-button label="right">密码</el-radio-button>
            <el-radio-button label="right">确认密码</el-radio-button>
        </el-radio-group>
        <div style="margin: 20px;"></div>
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="账号">
                <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
        </el-form>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">注册</el-button>
            <el-button>已有账号，前去登录</el-button>
        </el-form-item>
    </div>
</template>
<script>

export default {
    data(){
        return{

        }
    }
}
</script>
<style>
   
</style>
