<template>
	<div>
		<menu-box :active-tab-name="activeTabName"></menu-box>
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
		    				<td style="vertical-align: top;line-height:44px;">上传banner图：</td>
		    				<td>
								<div class="bt" v-loading.body="loading">
									<img v-show="imageUrl"  :src='imgPath+imageUrl' />
									<div :class="{opacity:imageUrl!=''}">
									<i class="el-icon-plus avatar-uploader-icon"></i>
									<span class="sb">上传图片</span>
									<input type="file" accept="image/png,image/jpeg" name="file" class="files" @change='uploadFile'/>
									</div>
								</div>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>图片链接：</td>
		    				<td><input type="text" placeholder="请输入链接" v-model="links" maxlength="50"></td>
		    			</tr>
		    			<tr>
		    				<td style="vertical-align: top;line-height:32px;">图片说明：</td>
		    				<td>
		    					<textarea placeholder="请输入图片说明" v-model="title" maxlength="140" style="line-height:32px;">
		    						
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
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
	</div>
</template>

<script>
	
	import '../../sass/style/addBanner.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
    import qs from 'qs';
	import axios from 'axios';
	import { hostAddadvert,hostamend,imgPath,hostAlter,host } from '../api.js';
	
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox,
    		successModal,
			warningModal
    	},
    	data(){
    		return{
				activeTabName:"advertiset",
    			imgPath:'',
    			whirt:'添加Banner',
    			isHide:false,
    			imageUrl: '',
    			radio: '0',
    			links:null,
    			title:null,
    			listNumber:null,
    			filelist:[],
    			id:null,
    			loading:false,
    			successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
				host3:''
		   	}
    	},
    	watch: {
			listNumber:function(){
				this.listNumber = this.listNumber.replace(/[^\d]/,'');
			}
		},
    	mounted(){
    		this.imgPath = imgPath;
    		this.host3 = host + '/cxkj-room/apis/system/file/SystemFileUpload100023';
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
    				// console.log(response);
    				if(response.status == 200 && response.data.code == 10000){
    					vm.imageUrl = response.data.entity.bannerPic;
	    				vm.links = response.data.entity.imgUrl;
	    				vm.title = response.data.entity.imgExplain;
	    				vm.listNumber = response.data.entity.listNumber;
	    				vm.radio = response.data.entity.isClose+'';
    				}
    				
    				
    			})
    			.catch((error)=>{
    				// console.log(error);
    			})
    		}
    	},
    	methods:{
    		uploadFile(e){
    			let vm = this
    			let param = new FormData();
    			vm.loading = true;
    			vm.filelist = [];
    			this.isHide = true;
    			let file = e.target.files[0];   //添加新的banner数据
    			
    			let files = [file,file.name];
    			this.filelist.push(files);
    			if(file.size > 1024 * 521) {
			        vm.warningMessage = '图片大小不能超过 500KB!';
              		vm.warningModal = true;
              		vm.loading = false;
			        return false;
			    }
//  			let windowURL = window.URL || window.webkitURL;
//  			this.imageUrl =  windowURL.createObjectURL(e.target.files[0]);
				param.append('file',file);
    			param.append('module','banner');
    			axios.post(vm.host3, param).then(res =>{
    				
    				if(res.data.code == 10000 && res.status == 200){
    					vm.loading = false;
    					vm.imageUrl = res.data.result.virtualPath;
    				}
    				// console.log(res);
    				// console.log(imgUser);
    				//vm.userImg(imgUser)
    			}).catch(err=>{
    				// console.log(err)
    			})
    		},
    		closeWarningModal() {
				this.warningModal = false;
			},
    		adds:function(){
    				let vm= this
    				let param = new FormData();
    				// console.log(this.links);
    				// console.log(this.title);
    				// console.log(this.radio);
    				// console.log(this.listNumber);
    				param.append('bannerPic',vm.imageUrl);
    				
	    			param.append("imgUrl",this.links);
	    			param.append("imgExplain",this.title);
	    			param.append("isClose",this.radio);
	    			param.append("listNumber",this.listNumber);
					console.log(this.param);
					if(this.id != null){
						param.append('adId',this.id);
						this.$http.post(hostAlter, param).then(res => {
		    				// console.log(res);
		    				if(res.status == 200 && res.data.code == 10000){
		    					
		    					this.successMessage = '修改成功';
								this.successModal = true;
								setTimeout(() => {
									this.successModal = false;
									vm.$router.push('/advertising/advertiset');
								}, 2000);
		    				}
		    				else{
		    					this.warningMessage = res.data.content;
              					this.warningModal = true;
		    				}
		    			})
		    			.catch(error =>{
		    				// console.log(error);
		    				this.warningMessage = '修改失败';
              				this.warningModal = true;
		    			})
					}
					else{
						if(this.filelist == [] || this.links == null || this.title == null || this.radio == '' || this.listNumber == null){
		    				this.warningMessage = '信息填入不完整';
              				this.warningModal = true;
		    			}
						else{
							this.$http.post(hostAddadvert, param).then(res => {
		    				// console.log(res);
		    				if(res.status == 200 && res.data.code == 10000){
		    					this.successMessage = '添加成功';
								this.successModal = true;
								setTimeout(() => {
									this.successModal = false;
									vm.$router.push('/advertising/advertiset');
								}, 2000);
		    				}
		    				else{
		    					this.warningMessage = res.data.content;
              					this.warningModal = true;
		    				}
		    				
			    			})
			    			.catch(error =>{
			    				// console.log(error);
			    				this.warningMessage = '添加失败';
              					this.warningModal = true;
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