<template>

	<div>
		<menu-box></menu-box>
		
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 ></span>
		          <router-link  class="active" to="/apartment/communityManagement">个人信息</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>个人信息</h3>
		          
		        </div>
		        <div class="message-tis">
		        	<div class="uploading">
                    	<a class="upload" href="javascript:void(0);">
                    		<input type="file" class="upfile">
                    	
                    		<img :src="imgPath1" />
                    		<span class="iconfont icon-jiahao1"></span>
                    		<span class="iconfont icon-jiahao2"></span>
                    		<span class="jiahao3">上传照片</span></a>
               		</div>

		        	<ul class="fromss">
		        		<li>
		        			<span>用户姓名：</span><span>{{user.userName}}</span>
		        		</li>
		        		<li>
		        			<span>手机号码：</span><span>{{user.userPhone}}</span>
		        		</li>
		        		<li>
		        			<span>所属社区：</span><span v-for="item in user.cxkjCommunityList">{{item.communityName}}</span>
		        		</li>
		        		<li>
		        			<span>所在部门：</span><span>{{user.departmentName}}</span>
		        		</li>
		        		<li>
		        			<span>部门职位：</span><span>{{user.officePosition}}</span>
		        		</li>
		        	</ul>
		        	
		        	
		        	<router-link to="/lognPhone" class="inste inste1">修改手机号</router-link>
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
    import axios from 'axios';
    import { hostAuthor,imgPath } from '../api.js';
    import '../../sass/style/communityPersonal.css';
    
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
    			user:null,  //用户信息
    			imgPath1:null
    		}
    	},
    	mounted(){
    		let vm = this
    		
    		this.$http.get(hostAuthor)
    		.then((response)=>{
    			console.log(response);
    			vm.user = response.data.entity;
    			vm.imgPath1 = imgPath + response.data.entity.headPic;
    		})
    		.catch((error)=>{
    			console.log(error);
    		})
    	},
    	methods:{
    		
    	}
    	
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  
</style>