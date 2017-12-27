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
      <span style="position: absolute;left: 358px;bottom: 27px;color:#fff;" @click="open3">版本号：{{pcVersion}}</span>
        <!--<el-button type="text" @click="open3">版本号：{{pcVersion}}</el-button>-->
      <p class="Copy">Copyright © 2017 佳兆业创享空间科技（深圳）有限公司版权所有 粤ICP备16035093号</p>
    </div>
      <!--<el-button type="text" @click="open3">点击打开 Message Box</el-button>-->
  </div>
</template>

<script>

import {hostlogin,pcVersion} from './api.js';
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
       	ins:0,
        pcVersion:''
      }
    },
    mounted() {
    	sessionStorage.clear();
      this.pcVersion = pcVersion
    },
    methods: {
      modelShow(){

      },
      open3() {
        this.$prompt('请输入口令', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
//          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
//          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          if(value == 527){
            this.$message({
              type: 'success',
              message: '进入测试版'
            });
            sessionStorage.setItem('urlType','测试')
            window.location.reload();
          }else {
            this.$message({
              type: 'info',
              message: '口令错误'
            });
          }

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
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
              sessionStorage.setItem("success",JSON.stringify(res.data.entity));
      				that.$router.push({path:"/apartment/workbench"});
      				//把token上传到sessionStorage

      		}
      		else{
      			that.title = res.data.content;//把错误信息赋给当前的title
      			that.isShow = true;
      			console.log(that.isShow);
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
    top: 51.6%;
    display: inline-block;
    height: 20px;
    font-size: 12px;
    color:red;
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
