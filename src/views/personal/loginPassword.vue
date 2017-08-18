<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：</span>
		          <router-link  class="active" to="/apartment/communityManagement">工作台>个人信息</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>修改登录密码</h3>
		          
		        </div>
		        <div class="message-tis">
		        	<div class="logins">
		        		<table>
		        			<tr>
		        				<td>手机号码:</td>
		        				<td>1111111111</td>
		        			</tr>
		        			<tr>
		        				<td>验证码:</td>
		        				<td><input type="text" name="" id="" placeholder="请输入短信验证码"/><a>获取验证码</a></td>
		        			</tr>
		        			<tr>
		        				<td>新登录密码:</td>
		        				<td><input type="text" placeholder="请输入新登录密码"></td>
		        			</tr>
		        			<tr>
		        				<td>确认新密码:</td>
		        				<td><input type="text" placeholder="请再次确认新密码"></td>
		        			</tr>
		        		</table>
		        		
		        		<button>提交</button>
		        		
		        	</div>
		        </div>
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	import '../../sass/style/loginPassword.css';
	import menuBox from '../../components/menuBox.vue';
    import  rightHeader from '../../components/rightHeader.vue';
    import  footerBox from '../../components/footerBox.vue';
    import api from '../api.js';
    
    
    export default{
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
    			
    		}
    	}
    }
</script>

<style>
	
</style>