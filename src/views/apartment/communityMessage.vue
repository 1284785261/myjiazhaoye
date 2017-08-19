<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：</span>
		          <router-link  class="active" to="/apartment/communityManagement">社区管理</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>社区信息</h3>
		        </div>
		        <div class="message-tis">
		        	<table class="cops">
		        		<tr>
		        			<td>社区名称：</td>
		        			<td>社区名称：</td>
		        		</tr>
		        		<tr>
		        			<td>社区名称：</td>
		        			<td>社区名称：</td>
		        		</tr>
		        		<tr>
		        			<td>社区名称：</td>
		        			<td>社区名称：</td>
		        		</tr>
		        		<tr>
		        			<td>社区名称：</td>
		        			<td>社区名称：</td>
		        		</tr>
		        		<tr>
		        			<td>社区名称：</td>
		        			<td>社区名称：</td>
		        		</tr>
		        		<tr>
		        			<td>社区名称：</td>
		        			<td>社区名称：</td>
		        		</tr>
		        		<tr>
		        			<td>社区名称：</td>
		        			<td>社区名称：</td>
		        		</tr>
		        		<tr>
		        			<td>物业合同：</td>
		        			<td>
		        				<img src="../../../static/images/temp/message.png" class="mess"><a>航运综合楼租赁合同.pdf</a>
		        			</td>
		        		</tr>
		        	</table>
		        	<div class="operation-box">
		        	  
		              	<Button type="primary" @click="Complie">编辑</Button>
		        	  
		              <Button>取消</Button>
		            </div>  
		        </div>
		        
		        
		    
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/communityMessage.css';
	import menuBox from '../../components/menuBox.vue';
    import  rightHeader from '../../components/rightHeader.vue';
    import  footerBox from '../../components/footerBox.vue';
    import api from '../api.js';
    
    
    export default {
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
    		Complie:function(){
    			this.$router.push({path:"/apartment/communityComplie"});
    		}
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  @import '../../sass/page/_communityManagement.scss';
</style>