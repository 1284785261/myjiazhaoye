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
          <span class="titp" v-show="isShow">{{title}}</span>
          <Form-item>

            <Button type="primary" @click="handleSubmit">登录</Button>

          </Form-item>
          <Form-item class="ivu-form-bottom">
              <router-link to="/password">忘记密码？</router-link>
          </Form-item>
        </Form>
      </div>
      <p class="Copy">Copyright © 2017 佳兆业创享空间科技（深圳）有限公司版权所有 粤ICP备16035093号</p>
    </div>
  </div>
</template>

<script>

import {hostlogin} from './api.js';
import qs from 'qs';


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
        isShow:false, //控制是否弹出错误信息
       	ins:0
      }
    },
    mounted() {
    	sessionStorage.clear();
    },
    methods: {
      handleSubmit:function() {
      	var that = this;
      	this.$http.post(hostlogin,
      		qs.stringify(
      			{
      				userPhone:this.formInline.user,
      				password:this.formInline.password,
      				user_type:2
      			}
      		))
      	.then((res)=>{
      		console.log(res);
      			if(parseInt(res.data.code)==10000){
      				sessionStorage.setItem("token",res.data.result.token);
      				that.$router.push({path:"/apartment/communityManagement"});
      				//把token上传到sessionStorage

      		}
      		else{
      			that.title = res.data.content;//把错误信息赋给当前的title
      			that.isShow = true;
      			console.log(that.isShow);

      			setInterval(function(){//设置定时器控制title消失

      				that.isShow = false;
      			},3000);
      		}
      	})
      	.catch((error)=>{
      		console.log(error);
      	})
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
  .titp{
  	position: absolute;
    top: 51.5%;
    display: inline-block;
    width: 100px;
    height: 20px;
    font-size: 12px;
    color: red;
  }
  #loginBack{
  	height: 1000px;
  }
  .Copy{
  	color: white;
  	font-size: 14px;
  	margin-top: 60px;
  	margin-left: 145px;
  }
</style>
