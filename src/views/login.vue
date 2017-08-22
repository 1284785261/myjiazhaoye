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
          <span class="tit" v-show="isShow">{{this.title}}</span>
          <Form-item>
          	
            <Button type="primary" @click="handleSubmit">登录</Button>
          	
          </Form-item>
          <Form-item class="ivu-form-bottom">
              <router-link to="/">忘记密码？</router-link>
              <em>还没有账号？<router-link to="/">请立即注册<i class="iconfont icon-youjiantou"></i></router-link></em>
          </Form-item>
        </Form>
      </div>
      <p class="Copy">Copyright © 2017 佳兆业创享空间科技（深圳）有限公司版权所有 粤ICP备16035093号</p>
    </div>
  </div>
</template>

<script>

import {hostlogin} from './api.js';
import qs from 'qs'


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
        },
        title:null,//接受登录错误的信息
        isShow:false //控制是否弹出错误信息
       
      }
    },
    methods: {
      handleSubmit:function() {
      	var that = this;
      	//console.log('login1')
      	this.$http.post(hostlogin,
      		qs.stringify(
      			{
      				userPhone:this.formInline.user,
      				password:this.formInline.password
      			}
      		)).then(
      		function(res){
      		if(parseInt(res.data.code)==10000){
      				sessionStorage.setItem("token",res.data.result.token);
      				that.$router.push({path:"/apartment/communityManagement"});
      				//把token上传到sessionStorage
      			
      		}
      		else if(parseInt(res.data.code)==10002){ 			
      			that.title = res.content;//把错误信息赋给当前的title
      			that.isShow = true;
      			
      			
      			setInterval(function(){//设置定时器控制title消失
      			
      				that.isShow = false;
      			},3000);
      		}
      	}
      	)
      	
      }

			
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" >
  @import '../sass/base/_mixin.scss';
  @import '../sass/page/_login.scss';
  body,html{
  	width: 100%;
  	height: 100%;
  }
  .tit{
  	position: absolute;
    top: 51.5%;
    font-size: 12px;
    color: red;
   
  }
  #loginBack{
  	height: 1000px;
  }
  .ivu-input-group-prepend{
  	background-color: #038be2!important;
  }
  .Copy{
  	color: white;
  	font-size: 14px;
  	margin-top: 60px;
  	margin-left: 145px;
  }
</style>
