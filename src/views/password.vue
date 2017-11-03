<template>
	<div id="loginBack2">
		<div class="login-warp">
			<div class="logo">
				<img src="../../static/images/temp/s_03.png">
			</div>
			<div class="login-main">
				<Steps :current="current">
					<Step></Step>
					<Step></Step>
					<Step></Step>
				</Steps>
				<div class="tits">
					<span>身份验证</span>
					<span>重置密码</span>
					<span>完成</span>
				</div>
				<div class="qhs" v-if="current == 0">
					<table>
						<tr>
							<td>你的手机号：</td>
							<td><input type="text" placeholder="请输入手机号" style="width: 298px;height: 42px;" v-model="phone" @blur="Phone(phone)" /><i class="el-icon-circle-check" v-show="mistake"></i><i class="el-icon-circle-cross" style="color: red;" v-show="mistake2"></i></td>
						</tr>
						<tr>
							<td>手机验证码：</td>
							<td><input type="text" placeholder="请输入短信验证码" style="width: 168px;height: 42px;" v-model="codes" />
								<a class="hq" :disabled="disabled" @click="gain">{{ tis }}</a><i class="el-icon-warning" style="color: #ff6612;" v-show="tites"></i><span v-show="tites">验证码已发送至你的手机，{{time}}s内输入有效</span></td>
						</tr>
					</table>
					<a class="xyb" @click="next1">下一步</a>
				</div>
				<div class="qhs" v-else-if="current == 1">
					<table>
						<tr>
							<td>新密码：</td>
							<td><input type="password" placeholder="请输入新密码" style="width: 298px;height: 42px;" v-model="test1" @blur="password"/><i class="el-icon-circle-check" v-show="pass"></i></td>
						</tr>
						<tr>
							<td>确认新密码：</td>
							<td><input type="password" placeholder="请再次输入新密码" style="width: 298px;height: 42px;" v-model="test2" @blur="password2"/><i class="el-icon-circle-check" v-show="pass1"></i><i class="el-icon-circle-close" style="color: red;" v-show="pass2"></i><span v-show="pass2">你两次输入密码不一致，请重新输入</span></td>
						</tr>
					</table>
					<a class="xyb" @click="next2">提交</a>
				</div>
				<div class="qhs" v-else-if="current == 2">
					<img src="../../static/images/icon/house_type_success.png">
					<p>你的登录密码修改成功，自动跳转登录页</p>
					<p>如果浏览器未自动跳转，请点击
						<router-link to="/"> 登录 →</router-link>
					</p>
				</div>
			</div>
			<p class="Copy">Copyright © 2017 佳兆业创享空间科技（深圳）有限公司版权所有 粤ICP备16035093号</p>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
	</div>
</template>

<script>
	import '../sass/style/password.css';
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
		data() {
			return {
				successModal: false,
				warningModal: false,
				successMessage: '添加部门成功',
				warningMessage: '添加部门失败，请检查是否重复',
				current: 0,
				mistake: false,
				mistake2: false,
				phone: null,
				time: 120,
				disabled: false,
				tites: false,
				tis: '获取短信验证码',
				codes:'',
				test1:'',
				test2:'',
				pass:false,
				pass1:false,
				pass2:false
			}
		},
		methods: {
			gain() {
				let vm = this
				vm.time = 120;
				this.disabled = true;
				if(this.mistake == true) {
					axios.post(hostSendcode,
						qs.stringify({
							phone: vm.phone,
							messageType: 0
						})
					).then((res) => {
						console.log(res);
						if(res.data.code == 10000 && res.status == 200) {
							vm.tites = true;
							vm.tis = '已发送'
						} else {
							this.disabled = false;
							this.warningMessage = res.data.content;
							this.warningModal = true;
						}
					}).catch((err) => {
						console.log(err);
						this.disabled = false;
					})
				}
				let times = setInterval(function() {
					vm.time--;
					if(vm.time <= 0) {
						clearInterval(times);
						vm.tis = '获取短信验证码'
						vm.tites = false;
						vm.disabled = false;
					}
				}, 1000)

			},
			next() {
				if(this.current == 2) {
					this.current = 0;
				} else {
					this.current += 1;
				}
			},
			next1() {
				axios.post(hostOldphone,
					qs.stringify({
						userPhone:this.phone,
						verifyCode:this.codes
					})
				).then((res)=>{
					console.log(res);
					if(res.data.code == 10000 && res.status == 200){
						this.current += 1;
					}
					else{
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				}).catch((err)=>{
					console.log(err);
					this.warningMessage = '验证手机失败';
					this.warningModal = true;
				})
				
			},
			closeWarningModal() {
				this.warningModal = false;
			},
			Phone(value) { //验证手机号
				let str = /^1(3|4|5|7|8)\d{9}$/;
				console.log(str.test(value));
				if(this.phone) {
					if(str.test(value) == true) {
						this.phone = value;
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
			password(){
				if(this.test1 != ''){
					this.pass = true;
				}
				else{
					this.pass = false;
				}
			},
			password2(){
				if(this.test2 != '' && this.test2 == this.test1){
					this.pass1 = true;
					this.pass2 = false;
				}
				else{
					this.pass1 = false;
					this.pass2 = true;
				}
			},
			next2(){
				axios.post(hostForgotPass,
					qs.stringify({
						phone:this.phone,
						newPassword:this.test1,
						confirmNewPassword:this.test2
					})
				).then((res)=>{
					console.log(res);
					if(res.data.code == 10000 && res.status == 200){
						this.current += 1;
						setTimeout(() => {
							this.$router.push('/');
						}, 3000);
					}
					else{
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				}).catch((err)=>{
					console.log(err);
					this.warningMessage = '重置密码失败';
					this.warningModal = true;
				})
			}

		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../sass/base/_mixin.scss';
</style>