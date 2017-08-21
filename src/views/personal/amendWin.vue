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
		        	<div class="amendwin">
		        		<i class="el-icon-circle-check"></i>
		        		<p>登录密码修改成功，即将回到工作台</p>
		        		<p>如果浏览器未自动跳转，请点击 <a>工作台 →</a></p>
		        	</div>
		        </div>
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	import '../../sass/style/amendWin.css';
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

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
</style>