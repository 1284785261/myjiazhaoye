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
		          <h3><i class="icon icon-iden"></i>个人信息</h3>
		          
		        </div>
		        <div class="message-tis">
		        	<div class="uploading">
                    	<a class="upload" href="javascript:void(0);">
                    		<input type="file" class="upfile">
                    		<span class="iconfont icon-jiahao1"></span>
                    		<span class="iconfont icon-jiahao2"></span>
                    		<span class="jiahao3">上传照片</span></a>
               		</div>

		        	<ul class="fromss">
		        		<li>
		        			<span>用户姓名：</span><span>张小米</span>
		        		</li>
		        		<li>
		        			<span>用户姓名：</span><span>张小米</span>
		        		</li>
		        		<li>
		        			<span>用户姓名：</span><span>张小米</span>
		        		</li>
		        		<li>
		        			<span>用户姓名：</span><span>张小米</span>
		        		</li>
		        		<li>
		        			<span>用户姓名：</span><span>张小米</span>
		        		</li>
		        	</ul>
		        	
		        	
		        	<a class="inste inste1">修改手机号</a>
		        	<router-link to="/loginPassword" class="inste inste2">修改登录密码</router-link>
		        </div>
		        
		        
		    
			</div>
		</div>
		<footer-box></footer-box>
	</div>
</template>

<script>
	
	
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import api from '../api.js';
    import '../../sass/style/communityPersonal.css';
    
    export default {
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