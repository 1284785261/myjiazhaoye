<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置： </span>
		          <router-link  class="active" to="/apartment/communityManagement">广告设置</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>{{whirt}}</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="addbanner">
		    		<table>
		    			<tr>
		    				<td>上传banner图：</td>
		    				<td>
								<div class="bt">
									<img v-show="imageUrl"  :src=imageUrl />
									<div :class="{opacity:imageUrl!=''}">
									<i class="el-icon-plus avatar-uploader-icon"></i>
									<span class="sb">上传图片</span>
									<input type="file" accept="image/png,image/jpg" name="file" class="files" @change='uploadFile'/>
									</div>
								</div>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>图片链接：</td>
		    				<td><input type="text" placeholder="请输入链接" v-model="links"></td>
		    			</tr>
		    			<tr>
		    				<td>图片说明：</td>
		    				<td>
		    					<textarea placeholder="请输入图片说明" v-model="title">
		    						
		    					</textarea>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>状态：</td>
		    				<td>
		    					<el-radio class="radio" v-model="radio" label="0">开放</el-radio>
  								<el-radio class="radio" v-model="radio" label="1">关闭</el-radio>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>排序：</td>
		    				<td><input type="text" placeholder="请输入排序号" class="px" v-model="listNumber"></td>
		    			</tr>
		    		</table>
		    		<a class="tj" @click="adds">确定</a>
		    		<p class="tis"><i class="el-icon-warning"></i>请添加大小不超过500k、分辨率为750*450px、图片格式为JPG或PNG等</p>
		    	</div>
		        
		    
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/addBanner.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import qs from 'qs';
	import axios from 'axios';
	import { hostAddadvert,hostamend,imgPath,hostAlter } from '../api.js';
	
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
    			whirt:'添加Banner',
    			isHide:false,
    			imageUrl: '',
    			radio: '0',
    			links:null,
    			title:null,
    			listNumber:null,
    			filelist:[],
    			id:null,
    			param:[]
		   	}
    	},
    	mounted(){
    		this.param = new FormData();
    		let vm = this
    		if(this.$route.query.id !=null){   //修改banner页面
    			this.id = this.$route.query.id;
    			this.isHide = true;
    			vm.whirt ='修改Banner';
    			axios.post(hostamend,
    			qs.stringify({
    				adId:this.id
    			}))
    			.then((response)=>{
    				console.log(response);
    				if(response.status == 200 && response.data.code == 10000){
    					vm.imageUrl =imgPath + response.data.entity.bannerPic;
	    				vm.links = response.data.entity.imgUrl;
	    				vm.title = response.data.entity.imgExplain;
	    				vm.listNumber = response.data.entity.listNumber;
	    				vm.radio = response.data.entity.isClose+'';
    				}
    				
    				
    			})
    			.catch((error)=>{
    				console.log(error);
    			})
    		}
    	},
    	methods:{
    		uploadFile(e){
    			let vm = this
    			vm.filelist = [];
    			this.isHide = true;
    			let file = e.target.files[0];   //添加新的banner数据
    			
    			let files = [file,file.name];
    			this.filelist.push(files);
    			if(file.size > 1024 * 521) {
			        alert('图片大小不能超过 500KB!');
			        return false;
			    }
    			let windowURL = window.URL || window.webkitURL;
    			this.imageUrl =  windowURL.createObjectURL(e.target.files[0]);
    			console.log(this.filelist);
    		},
    		adds:function(){
    				let vm= this
    				console.log(this.links);
    				console.log(this.title);
    				console.log(this.radio);
    				console.log(this.listNumber);
    				if(this.filelist.length){
    					this.param.append('adPicFile',this.filelist[0][0]);
    				}else{
    					this.param.append('adPicFile','');
    				}
//	    			this.param.append('adPicFile',this.filelist[0][0]);
	    			this.param.append("imgUrl",this.links);
	    			this.param.append("imgExplain",this.title);
	    			this.param.append("isClose",this.radio);
	    			this.param.append("listNumber",this.listNumber);
					//console.log(this.param);
					if(this.id != null){
						this.param.append('adId',this.id);
						this.$http.post(hostAlter,this.param).then(res => {
		    				console.log(res);
		    				if(res.status == 200 && res.data.code == 10000){
		    					alert('修改成功');
		    					vm.$router.push('/advertising/advertiset');
		    				}
		    				else{
		    					alert('修改失败');
		    				}
		    			})
		    			.catch(error =>{
		    				console.log(error);
		    			})
					}
					else{
						if(this.filelist == [] || this.links == null || this.title == null || this.radio == '' || this.listNumber == null){
		    				alert('信息填入不完整');
		    			}
						else{
							this.$http.post(hostAddadvert,this.param).then(res => {
		    				console.log(res);
		    				if(res.status == 200 && res.data.code == 10000){
		    					alert('添加成功');
		    					vm.$router.push('/advertising/advertiset');
		    				}
		    				else{
		    					alert('添加失败');
		    				}
		    				
			    			})
			    			.catch(error =>{
			    				console.log(error);
			    			})
						}
		    			
	    		}
    		}
    	},
    	created(){
    		
			
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  
</style>