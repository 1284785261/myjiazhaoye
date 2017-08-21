<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：</span>
		          <router-link  class="active" to="/apartment/communityManagement">工作台 > 个人信息</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>修改手机号</h3>
		          
		        </div>
		        <div class="message-tis">
		        	<div class="logins">
		        		<table>
		        			<tr>
		        				<td>当前手机号码:</td>
		        				<td>1111111111</td>
		        			</tr>
		        			<tr>
		        				<td>验证码:</td>
		        				<td><input type="text" name="" id="yzm" placeholder="请输入短信验证码"/><a>获取验证码</a></td>
		        			</tr>
		        			<tr class="yzms">
		        				
		        			</tr>
		        			<tr>
		        				<td>新手机号码:</td>
		        				<td><input type="text" placeholder="请输入新手机号"><i class="el-icon-circle-check zqs"></i></td>
		        			</tr>
		        			<tr>
		        				<td>验证码:</td>
		        				<td><input type="text" id="yzm" placeholder="请输入短信验证码"><a>获取验证码</a></td>
		        			</tr>
		        		</table>
		        		<div class="yz3">
		        			<i class="el-icon-warning"></i><span>验证码已发送，120s内输入有效</span>
		        		</div>
		        		<div class="yz3 yz4">
		        			<i class="el-icon-circle-close"></i><span>你输入的验证码错误，请重新获取</span>
		        		</div>
		        		<button @click="amendwin()" class="tj">提交</button>
		        		
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
    	},
    	methods:{
    		amendwin(){
    			this.$router.push({path:"/amendWin"});
    		}
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  
  
.yz3{
	position: absolute;
	left: 208px;
	top: 104px;
	color: #ff6612;
}
.yz3 i{
	color: #ff6612;
	font-size: 16px;
	margin-right: 8px;
}
.yz3 span{
	font-size: 12px;
	font-weight: 700;
}
.yz4{
	margin-top:5px;
	color: #ee120e;
	top: 230px;
}
.yz4 i{
	color: #ee120e;
}
.logins .tj{
	margin-left: 204px;
}
.logins table tr td .zqs{
	color: #2abb7c;
	margin-left: 5px;
	font-size: 16px;
}
</style>