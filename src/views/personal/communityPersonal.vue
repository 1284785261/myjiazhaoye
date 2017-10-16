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
                    	<a class="upload" href="javascript:void(0);"  v-loading.body="loading">
                    		<input type="file" class="upfile" @change="loadfile" accept="image/png,image/jpg">
                    	
                    		<img :src=imgPath1 />
                    		<span class="iconfont icon-jiahao1" v-if="chen"></span>
                    		<span class="iconfont icon-jiahao2" v-if="chen"></span>
                    		<span class="jiahao3" v-if="chen">上传照片</span>
                    	</a>
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
		        	<a class="inste inste2" @click="emss">修改登录密码</a>
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
    import axios from 'axios';
    import { hostAuthor,imgPath,hostportrait,host } from '../api.js';
    import '../../sass/style/communityPersonal.css';
    import qs from 'qs'
    
    
    
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
    			user:{},  //用户信息
    			imgPath1:null,
    			chen:true,
    			defaultList: [],
                imgName: '',
                visible: false,
                uploadList: [],
                host3:'',
                filelist:[],
                imageUrl: '',
                loading:false,
                param:{}
    		}
    	},
    	mounted(){
    		this.host3 = host + '/cxkj-room/apis/system/file/SystemFileUpload100023';
    		this.param = new FormData();
    		this.datas();
    		
    	},
    	methods:{
    		datas(){
	    		let vm = this
	    		vm.user = null;
	    		this.$http.get(hostAuthor)
	    		.then((response)=>{
	    			//console.log(response);
	    			if(response.status == 200 && response.data.code == 10000){
		    			vm.user = response.data.entity;
		    			sessionStorage.setItem("phone",this.user.userPhone);
		    			if(response.data.entity.headPic != null){
		    				vm.imgPath1 = imgPath + response.data.entity.headPic;
		    				vm.chen=false;
		    			}
		    			else{
		    				vm.chen=true;
		    			}
	    			}
	    		})
	    		.catch((error)=>{
	    			console.log(error);
	    		})
    		},
    		loadfile(e){
    			let vm = this
    			vm.filelist = [];
    			let file = e.target.files[0];
    			let files = [file,file.name];
    			this.filelist.push(files);
    			vm.chen = false;
    			
//  			let windowURL = window.URL || window.webkitURL;
//  			this.imgPath1 = windowURL.createObjectURL(e.target.files[0]);
    			this.param.append('file',file);
    			this.param.append('module','user');
    			this.$http.post(vm.host3,vm.param).then(res =>{
    				vm.loading = true
    				let imgUser = res.data.result.virtualPath
    				vm.userImg(imgUser)
    			}).catch(err=>{
    				console.log(err)
    			})
    		},
    		userImg(imgUser){
    			let vm = this;
    			this.$http.post(hostportrait,qs.stringify({
    				headPic:imgUser
    			})).then(res => {
    				if(res.status == 200 && res.data.code == 10000){
    					vm.loading = false
    					alert('上传头像成功');
    					location.reload();   
    				}
    				else{
    					alert('上传头像失败');
    				}
    			})
    			.catch(error => {
    				console.log(error);
    			})
    		},
    		emss(){
    			this.$router.push('/loginPassword');
    		}
    	}
    	
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  
</style>