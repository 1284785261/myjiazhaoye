<template>
  <div id="loginBack">
    <div class="login-warp">
      <div class="logo">
        <img src="/static/images/temp/lonin_logo.png">
      </div>
      <div class="login-main">
        <div class="pull-left">
            <div class="code">
              <img src="/static/images/temp/login_code.png">
            </div>
           <div class="btn-app">
             <router-link to="/">下载管家APP </router-link>
           </div>
        </div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <Form-item class="ivu-item-title">
            <h3>登录</h3>
          </Form-item>
          <Form-item prop="user">
            <Input type="text" v-model="formInline.user" placeholder="请输入手机号码">
            <Icon class="iconfont icon-shouji" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <Form-item prop="password">
            <Input type="password" v-model="formInline.password" placeholder="请输入登录密码">
            <Icon class="iconfont icon-mima" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <Form-item>
            <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
          </Form-item>
          <Form-item class="ivu-form-bottom">
              <router-link to="/">忘记密码？</router-link>
              <em>还没有账号？<router-link to="/">请立即注册<i class="iconfont icon-youjiantou"></i></router-link></em>
          </Form-item>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
$(document).ready(function () {
  $("#loginBack").height($(window).height());
});

  export default {
    data () {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: '请填写手机号码', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('登录成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" >
  @import '../sass/base/_mixin.scss';
  @import '../sass/page/_login.scss';
</style>
