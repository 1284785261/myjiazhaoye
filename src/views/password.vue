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
				<!--<Button type="primary" @click="next">下一步</Button>-->
				<div class="qhs" v-if="current == 0">
					<table>
						<tr>
							<td>你的手机号：</td>
							<td><input type="text" placeholder="请输入手机号" style="width: 298px;height: 42px;"/><i class="el-icon-circle-check"></i></td>
						</tr>
						<tr>
							<td>手机验证码：</td>
							<td><input type="text" placeholder="请输入短信验证码" style="width: 168px;height: 42px;"/><a class="hq">获取短信验证码</a><i class="el-icon-warning"></i><span>验证码已发送至你的手机，120s内输入有效</span></td>
						</tr>
					</table>
					<a class="xyb">下一步</a>
				</div>
				<div class="qhs" v-else-if="current == 1">
					<table>
						<tr>
							<td>新密码：</td>
							<td><input type="text" placeholder="请输入新密码" style="width: 298px;height: 42px;"/><i class="el-icon-circle-check"></i></td>
						</tr>
						<tr>
							<td>确认新密码：</td>
							<td><input type="text" placeholder="请再次输入新密码" style="width: 298px;height: 42px;"/><i class="el-icon-circle-close"></i><span>你再次输入的密码错误，请重新输入</span></td>
						</tr>
					</table>
					<a class="xyb">提交</a>
				</div>
				<div class="qhs" v-else-if="current == 2">
					<img src="../../static/images/icon/house_type_success.png">
					<p>你的登录密码修改成功，自动跳转登录页</p>
					<p>如果浏览器未自动跳转，请点击 <router-link to="/"> 登录 →</router-link></p>
				</div>
			</div>
			<p class="Copy">Copyright © 2017 佳兆业创享空间科技（深圳）有限公司版权所有 粤ICP备16035093号</p>
		</div>
	</div>
</template>

<script>
	import '../sass/style/password.css';
	import { hostlogin } from './api.js';
	import qs from 'qs';

	export default {
		data() {
			return {
				current: 2
			}
		},
		methods: {
			next() {
				if(this.current == 2) {
					this.current = 0;
				} else {
					this.current += 1;
				}
			}

		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../sass/base/_mixin.scss';
</style>
