<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/apartment/communityManagement">个人信息</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>修改登录密码</h3>
		          
		        </div>
		        <div class="message-tis">
		        	<div class="amendwin">
		        		<i class="el-icon-circle-check"></i>
		        		<p>{{ title }}修改成功，即将回到工作台</p>
		        		<p>如果浏览器未自动跳转，请点击 <router-link to="/apartment/workbench">工作台 →</router-link></p>
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
    			title:null
    		}
    	},
    	mounted(){
    		this.scrll();
    		this.title = this.$route.query.names;
    	},
    	methods:{
    		scrll(){
    			let vm = this;
	    		setTimeout(function(){
	    			vm.$router.push('/apartment/workbench');
	    		},3000);	
    		}
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
</style>