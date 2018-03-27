<template>
  <div id="loginBack">
    <div class="login-warp">
      <div class="login-main">
        <div class="pull-left">
          <div class="logins">
              <img src="/static/images/icon/logins.png">
          </div>
            <div class="code">
              <img src="/static/images/temp/login_code.png">
            </div>
           <div class="btn-app">
             <router-link to="/">下载管家APP </router-link>
           </div>
        </div>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <Form-item class="ivu-item-title">
            <h3>密码登录</h3>
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
          <Form-item class="ivu-form-bottom">
              <a @click="shownote">忘记登录密码？</a>
          </Form-item>
          <Form-item>
            <Button type="primary" @click="handleSubmit">登录</Button>
          </Form-item>
          <span class="versions">版本号：{{pcVersion}}</span>
          <!-- <el-button type="text" @click="open3">版本号：{{pcVersion}}</el-button> -->
          <p class="Copy">Copyright © 2017 佳兆业创享空间科技（深圳）有限公司版权所有 粤ICP备16035093号</p>
        </Form>
      </div>
    </div>
      <!--<el-button type="text" @click="open3">点击打开 Message Box</el-button>-->
    <div class="shade" v-if="noteShow">
      
    </div>
    <div class="forgetPassword" v-if="noteShow">
     <i class="el-icon-close icon-guanbis" @click="closenotem"></i>
      <Form ref="ruleInline2" :model="formInline2" :rules="ruleInline2">
          <Form-item class="ivu-item-title">
            <h3>找回密码</h3>
          </Form-item>
          <Form-item prop="phone">
            <Input type="text" v-model="formInline2.phone" @on-blur="Phone(formInline2.phone)" placeholder="请输入手机号码">
            <Icon class="iconfont icon-shouji" slot="prepend"></Icon>
            </Input>
            <i class="el-icon-circle-check" style="color: #00afcc;" v-show="mistake"></i><i class="el-icon-circle-cross" style="color: red;" v-show="mistake2"></i>
          </Form-item>
          <Form-item prop="username">
            <Input type="text" v-model="formInline2.username" placeholder="请输入用户姓名">
            <Icon class="iconfont icon-yonghu" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <Form-item>
            <p class="titem">请输入短信验证码</p>
            <Input type="text" v-model="formInline2.codes" placeholder="请输入短信验证码" class="notepass"></Input><a class="gainnote" @click="gain" :disabled="disabled">{{notetitle}}</a>
          </Form-item>
          <Form-item prop="newpassword">
            <p class="titem">请输入新密码</p>
            <Input type="password" v-model="formInline2.newpassword" placeholder="请输入新密码">
            <Icon class="iconfont icon-mima" slot="prepend"></Icon>
            </Input>
          </Form-item>
          <Form-item>
            <Button type="primary" @click="resetSubmit">重置密码</Button>
          </Form-item>
        </Form>
    </div>
    <warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
  </div>
</template>

<script>

import {hostlogin,pcVersion} from './api.js';
import successModal from '../components/successModal.vue';
	import warningModal from '../components/warningModal.vue';
import { hostSendcode,hostOldphone,hostForgotPass } from './api.js';
import axios from 'axios';
import qs from 'qs';


  export default {
    components: {
			successModal,
			warningModal
		},
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
          ],
          
        },
        formInline2:{
          phone:'',
          username:'',
          codes:'',
          newpassword:''
        },
        ruleInline2:{
          phone: [
            { required: true, message: '请填写手机号码', trigger: 'blur' }
          ],
          username:[
            { required: true, message: '请填写用户名', trigger: 'blur' }
          ]
        },
        title:null,//接受登录错误的信息
        isShow:false, //控制是否弹出错误信息
       	ins:0,
        pcVersion:'',
        noteShow:false,
        phone:null,
        username:'',
        newpassword:'',
        time: 120,
        disabled: false,
        codes:'',
        mistake:false,
        mistake2:false,
        notetitle:'获取短信验证码',
        successModal: false,
				warningModal: false,
				successMessage: '添加部门成功',
				warningMessage: '添加部门失败，请检查是否重复'
      }
    },
    mounted() {
    	sessionStorage.clear();
      this.pcVersion = pcVersion
    },
    methods: {
      modelShow(){

      },
//      open3() {
//        this.$prompt('请输入口令', '提示', {
//          confirmButtonText: '确定',
//          cancelButtonText: '取消'
////          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
////          inputErrorMessage: '邮箱格式不正确'
//        }).then(({ value }) => {
//          if(value == 527){
//            this.$message({
//              type: 'success',
//              message: '进入测试版'
//            });
//            sessionStorage.setItem('urlType','测试')
//            window.location.reload();
//          }else {
//            this.$message({
//              type: 'info',
//              message: '口令错误'
//            });
//          }
//
//        }).catch(() => {
//          this.$message({
//            type: 'info',
//            message: '取消输入'
//          });
//        });
//      },
      handleSubmit:function() {
        var that = this;
        if(this.formInline.user == '' || this.formInline.password == ''){

        }else{
          this.$http.post(hostlogin,
            qs.stringify(
              {
                userPhone:this.formInline.user,
                password:this.formInline.password,
                user_type:2
              }
            ))
          .then((res)=>{
            // console.log(res);
            
              if(parseInt(res.data.code)==10000){
                sessionStorage.setItem("token",res.data.result.token);
                sessionStorage.setItem("success",JSON.stringify(res.data.entity));
                that.$router.push({path:"/apartment/workbench"});
                //把token上传到sessionStorage

            }
            else{
              that.title = res.data.content;//把错误信息赋给当前的title
              that.isShow = true;
              // console.log(that.isShow);
            }
          })
          .catch((error)=>{
              that.title = '用户不存在或密码错误';//把错误信息赋给当前的title
              that.isShow = true;
            // console.log(error);
          })
        }
      	
      },
      shownote(){
        this.noteShow = true;
      },
      closenotem(){
        this.noteShow = false;
      },
      closeWarningModal() {
				this.warningModal = false;
			},
      Phone(value) { //验证手机号
				let str = /^1(3|4|5|7|8)\d{9}$/;
				console.log(str.test(value));
				if(this.formInline2.phone) {
					if(str.test(value) == true) {
						this.formInline2.phone = value;
						this.mistake = true;
						this.mistake2 = false;
					} else {
						this.mistake = false;
						this.mistake2 = true;
					}
				} else {
					this.mistake = false;
					this.mistake2 = false;
				}
			},
      gain(){
        let vm = this
        vm.time = 120;
        vm.disabled = true;
				if(this.mistake == true) {
					axios.post(hostSendcode,
						qs.stringify({
							phone: vm.formInline2.phone,
							messageType: 0
						})
					).then((res) => {
						console.log(res);
						if(res.data.code == 10000 && res.status == 200) {
              vm.disabled = true;
							// vm.notetitle = time+'内有效'
						} else {
							this.disabled = false;
							vm.notetitle = '重新发送'
						}
					}).catch((err) => {
						  this.disabled = false;
							vm.notetitle = '重新发送'
          })
        }

        let times = setInterval(function() {
          vm.time--;
          // vm.disabled = true;
          vm.notetitle = vm.time+'内有效'
					if(vm.time <= 0) {
						clearInterval(times);
						vm.notetitle = '获取短信验证码'
						vm.disabled = false;
					}else{
            vm.disabled = true;
          }
				}, 1000)

      },
      resetSubmit(){
        axios.post(hostForgotPass,
					qs.stringify({
            phone:this.formInline2.phone,
            userName:this.formInline2.username,
            newPassword:this.formInline2.newpassword,
            verifyCode:this.formInline2.codes
					})
				).then((res)=>{
					console.log(res);
					if(res.data.code == 10000 && res.status == 200){
            this.successMessage = '重置密码成功';
            this.successModal = true;
            this.formInline2.phone = '';
            this.formInline2.username = '';
            this.formInline2.codes = '';
            this.formInline2.newpassword = '';
						setTimeout(() => {
              this.successModal = false;
              this.noteShow = false;
						}, 2000);
					}
					else{
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				}).catch((err)=>{
					// console.log(err);
					this.warningMessage = '重置密码失败';
					this.warningModal = true;
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
    top: 50%;
    display: inline-block;
    height: 20px;
    margin-left: 156px;
    margin-top: 24px;
    font-size: 12px;
    color:#ed3f14;
  }
  #loginBack{
    min-height: 900px;
    .shade{
      width: 100%;
      height: 100%;
      background: #000000;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0.6;
      z-index: 100;
    }
    .forgetPassword{
      width: 560px;
      height: 620px;
      background: #ffffff;
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%,-50%);
      z-index: 100;
      .icon-guanbis{
        cursor: pointer;
        position: absolute;
        right: -10px;
        top: 30px;
        font-size: 24px;
      }
      .ivu-form-item{
        margin-left: 50%;
        transform: translate(-50%,0);
        width: 300px;
      }
      .ivu-item-title{
        .ivu-form-item-content{
          text-align: center;
          h3{
            margin-top: 75px;
            margin-left: 50%;
            transform: translate(-50%,0);
            width: 300px;
            font-size: 20px;
            color:#666666;
            padding-bottom: 20px;
            font-weight: normal;
            border-bottom: 2px solid #00afcc;
          }
          
        }  
      }
      .ivu-form-item{
        .ivu-form-item-required{
          width: 300px;
          margin-left: 50%;
          transform: translate(-50%,0);
        }
      }
    }
  }
  .Copy{
    text-align: center;
    width: 356px;
  	color: #c2c2c2;
  	font-size: 12px;
    margin-left: 50%;
    transform: translate(-50%,0);
  }
  .versions{
    text-align: center;
    display: block;
    margin-top: 114px;
    line-height: 30px;
    color: #c2c2c2;
    font-size: 12px;
    margin-left: 50%;
    transform: translate(-50%,0);
  }
  .titem{
    font-size: 14px;
    color: #c2c2c2;
  }
  #loginBack{
    .ivu-form{
      .ivu-form-item{
        .notepass{
          width: 158px;
          border-radius: 5px;
          .ivu-input{
            height: 50px;
          }
        }
      }
    } 
    
  }
  
  .gainnote{
    width: 130px;
    height: 50px;
    border-radius: 5px;
    text-align: center;
    line-height: 50px;
    display: inline-block;
    font-size: 14px;
    color: #ffffff;
    margin-left: 10px;
    background: #00afcc;
    cursor: pointer;
  }
  .gainnote:hover{
    color: #ffffff;
  }
  .el-icon-circle-check,.el-icon-circle-cross{
    position: absolute;
    right: -27px;
    top: 15px;
    font-size: 18px;
  }
</style>
