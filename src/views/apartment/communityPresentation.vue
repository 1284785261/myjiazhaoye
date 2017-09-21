<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置：</span>
					<router-link class="active" to="/apartment/communityManagement">社区管理</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>社区介绍</h3>
					<span>佳兆业航运WEWA空间</span>
				</div>
				<div class="ivu-warp-Community">
					<div class="ivu-main-img">
						<h4>社区图片：</h4>
						<div class="item-img">
							<span class="fl">公寓：</span>
							<div class="demo-upload-list" v-for="item in uploadList">
								<template>
									<img :src="imgPath+item">
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView1(imgPath+item)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove4(item)"></Icon>
									</div>
								</template>
								<template>
									<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
								</template>
							</div>
							<div class="demo-upload-list" v-for="item in uploadList4">
								<template>
									<img :src="item">
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView1(item)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove1(item)"></Icon>
									</div>
								</template>
								<template>
									<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
								</template>
							</div>
							<div class="uplodas">
								<div>
								<input type="file"  accept="image/png,image/jpg" name="file" class="file" @change="uploadfile"/>	
								<Icon type="camera" class="icons"></Icon>
								</div>
							</div>
									
							<Modal v-model="visible">
								<img :src="imgName" v-if="visible">
							</Modal>
						</div>
						<div class="item-img">
							<span class="fl">社区门面：</span>
							<div class="demo-upload-list" v-for="item in uploadList2">
								<template>
									<img :src="imgPath+item">
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView2(imgPath+item)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove5(item)"></Icon>
									</div>
								</template>
								<template>
									<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
								</template>
							</div>
							<div class="demo-upload-list" v-for="item in uploadList5">
								<template>
									<img :src="item">
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView2(item)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove2(item)"></Icon>
									</div>
								</template>
								<template>
									<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
								</template>
							</div>
							<div class="uplodas">
								<div>
								<input type="file"  accept="image/png,image/jpg" name="file" class="file" @change="uploadfile2"/>	
								<Icon type="camera" class="icons"></Icon>
								</div>
							</div>
							<Modal v-model="visible">
								<img :src="imgName" v-if="visible">
							</Modal>
						</div>
						<div class="item-img">
							<span class="fl">办公区：</span>
							<div class="demo-upload-list" v-for="item in uploadList3">
								<template>
									<img :src="imgPath+item">
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView3(imgPath+item)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove6(item)"></Icon>
									</div>
								</template>
								<template>
									<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
								</template>
							</div>
							<div class="demo-upload-list" v-for="item in uploadList6">
								<template>
									<img :src="item">
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView3(item)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove3(item)"></Icon>
									</div>
								</template>
								<template>
									<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
								</template>
							</div>
							<div class="uplodas">
								<div>
								<input type="file"  accept="image/png,image/jpg" name="file" class="file" @change="uploadfile3"/>	
								<Icon type="camera" class="icons"></Icon>
								</div>
							</div>
							<Modal v-model="visible">
								<div style="text-align:center">
									<img :src="imgName" v-if="visible">
								</div>
							</Modal>
						</div>
					</div>

					<h4 class="bts">详情描述：</h4>
					<div class="components-container">

						<div class="info"></div>
						<div class="editor-container">
							
							<UE :defaultMsg=defaultMsg :config=config ref="ue"></UE>
						</div>
					</div>
					<button class="confirm" @click="click">确定</button>
					<button class="call">取消</button>
				</div>
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>
<script>
</script>
<script>
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import UE from '../../components/uedit.vue';
	import axios from 'axios';
	import {hostPresent,imgPath,hostTitle} from '../api.js';
	import qs from 'qs';
	export default {
		components: {
			rightHeader,
			menuBox,
			footerBox,
			UE
		},
		data() {
			return {
				content:'',
				defaultList2:[],
				filelist1:[],
				filelist2:[],
				filelist3:[],
				imgName: '',
				visible: false,
				uploadList: [],
				uploadList2: [],
				uploadList3: [],
				uploadList4: [],
				uploadList5: [],
				uploadList6: [],
				config: {
					initialFrameWidth: null,
					initialFrameHeight: 350
				},
				communityId:null, //社区ID
				community:null, //当前页面数据
				url:hostPresent,
				param:null,
				imgPath:'',
				defaultMsg: '',
			}

		},
		mounted() {
			//this.uploadList = this.$refs.upload.fileList;
			this.communityId = this.$route.query.id;
			this.present();	
			//console.log(this.uploadList);
			this.param = new FormData();
			this.imgPath = imgPath
		},
		methods: {
			click(){
				let vm = this
//				this.getUEContent()
//			
//				console.log(this.communityId);
//				console.log(this.content)
//				console.log(this.filelist1)
//				console.log(this.uploadList)
//				console.log(111111111111111);
//				console.log(this.filelist2)
//				console.log(this.uploadList2)
//				console.log(this.filelist3)
//				console.log(this.uploadList2)
				//console.log('开始')
				//vm.content = this.$refs.ue.getUEEditor(); 
				
				vm.content = this.$refs.ue.getUEContent(); 
				
//				this.$notify({
//					title: '获取成功，可在控制台查看！',
//					message: vm.content,
//					type: 'success'
//				});
			
				console.log(vm.content)
				this.param.append("communityId",vm.communityId);
				this.param.append("communityInfo",vm.content);
				this.param.append("communityFlatHide",vm.uploadList);
				this.param.append("communityFaceHide",vm.uploadList2);
				this.param.append("communityWorkHide",vm.uploadList3);
				if(vm.filelist1.length){
					for(let i in vm.filelist1) {
						vm.param.append('communityFlatFiles', vm.filelist1[i]);
					}
					//console.log(vm.filelist1);
				}
				if(vm.filelist2.length){
					for(let i in vm.filelist2) {
						vm.param.append('communityFaceFiles', vm.filelist2[i]);
					}
					//console.log(vm.filelist2);
				}
				if(vm.filelist3.length){
					for(let i in vm.filelist3) {
						vm.param.append('communityWorkFiles', vm.filelist3[i]);
					}
					//console.log(vm.filelist3);
				}
				
				
				this.$http.post( hostPresent, vm.param).then((response) =>{
					console.log(response);
					if(response.status == 200 && response.data.code == 10000){
						alert('操作成功');
						//vm.$router.push({path:"/apartment/communityManagement"});
					}
//					else{
//						alert('操作失败，请检查信息完整');
//					}
				})
				.catch((error) =>{
					console.log(error);
				})
			},
			handleView1(name) {
				console.log(name);
				this.imgName = name;
				this.visible = true;
			},
			handleView2(name) {
				console.log(name);
				this.imgName = name;
				this.visible = true;
			},
			handleView3(name) {
				console.log(name);
				this.imgName = name;
				this.visible = true;
			},
			handleRemove1(item){
				let fileIndex = this.uploadList4.findIndex(items => items == item);
				this.uploadList4.splice(fileIndex,1);
				this.filelist1.splice(fileIndex,1);
				console.log(this.uploadList4);
				console.log(this.filelist1);
			},
			handleRemove2(item){
				let fileIndex = this.uploadList5.findIndex(items => items == item);
				this.uploadList5.splice(fileIndex,1);
				this.filelist2.splice(fileIndex,1);
			},
			handleRemove3(item){
				let fileIndex = this.uploadList6.findIndex(items => items == item);
				this.uploadList6.splice(fileIndex,1);
				this.filelist3.splice(fileIndex,1);
			},
			handleRemove4(item){
				let fileIndex = this.uploadList.findIndex(items => items == item);
				this.uploadList.splice(fileIndex,1);
				console.log(this.uploadList);
				
			},
			handleRemove5(item){
				let fileIndex = this.uploadList2.findIndex(items => items == item);
				this.uploadList2.splice(fileIndex,1);
				console.log(this.uploadList2);
				
			},
			handleRemove6(item){
				let fileIndex = this.uploadList3.findIndex(items => items == item);
				this.uploadList3.splice(fileIndex,1);
				console.log(this.uploadList3);
				
			},
			uploadfile(e){
				let vm = this;
				let file = e.target.files[0];
				let files = [file, file.name];
				
				//console.log(this.filelist1);
				let windowURL = window.URL || window.webkitURL;
				
				if(vm.uploadList.length + vm.uploadList4.length<5){
					this.filelist1.push(file);
//					console.log(111111);
				console.log(this.filelist1);
					vm.uploadList4.push(windowURL.createObjectURL(e.target.files[0]));
				}
				else{
					alert('最多可以上传5张图片');
				}
//				console.log(this.uploadList);
			},
			uploadfile2(e){
				let vm = this;
				let file = e.target.files[0];
				let files = [file, file.name];
				
				let windowURL = window.URL || window.webkitURL;
				
				if(vm.uploadList2.length + vm.uploadList5.length<5){
					this.filelist2.push(file);
					vm.uploadList5.push(windowURL.createObjectURL(e.target.files[0]));
				}
				else{
					alert('最多可以上传5张图片');
				}
//				console.log(this.uploadList);
			},
			uploadfile3(e){
				let vm = this;
				let file = e.target.files[0];
				let files = [file, file.name];
				
				let windowURL = window.URL || window.webkitURL;
				
				if(vm.uploadList3.length + vm.uploadList6.length<5){
					this.filelist3.push(file);
					vm.uploadList6.push(windowURL.createObjectURL(e.target.files[0]));
				}
				else{
					alert('最多可以上传5张图片');
				}
			},
			present(){
				let vm = this
				
				axios.post(hostTitle,
					qs.stringify({
						communityId:vm.communityId
				}))
				.then((response)=>{
					console.log(response);
					if(response.status == 200 && response.data.code == 10000){
						vm.community = response.data.result.community;
						vm.defaultMsg = response.data.result.community.communityInfo;
						let arr = [];
						let arr2 = [];
						let arr3 = [];
						
						arr2 = vm.community.communityFace.split(",");
						arr3 = vm.community.communityWork.split(",");
						arr = vm.community.communityFlat.split(",");
						//console.log(arr);
//						console.log(arr);
//						console.log(arr2);
//						console.log(arr3);
						vm.uploadList = [];
						vm.uploadList2 = [];
						vm.uploadList3 = [];
						if(arr.length){
							arr.forEach(function(item){
							vm.uploadList.push(item);
							})
						}
						if(arr2.length){
							arr2.forEach(function(item,index){
								vm.uploadList2.push(item);
							})
						}
						if(arr3.length){
							arr3.forEach(function(item,index){
								vm.uploadList3.push(item);
							})
						}
					}
					
				})
				.catch((error)=>{
					console.log(error);
				})
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
	@import '../../sass/page/_communityPresentation.scss';
</style>
<style>
	.ivu-warp-Community {
		width: 100%;
		min-height: 1000px;
		background: #fff;
		overflow: hidden;
		box-shadow: 0 3px 1px #ccc;
		position: relative;
	}
	
	.info {
		border-radius: 10px;
		line-height: 20px;
		padding: 10px;
		margin: 10px;
		background-color: #ffffff;
	}
	
	.components-container {
		margin-left: 170px;
		width: 900px;
		margin-bottom: 50px;
	}
	
	#edui1_iframeholder {
		height: 240px!important;
	}
	
	.bts {
		display: inline-block;
		position: absolute;
		left: 0;
		top: 600px;
		padding-left: 91px;
		font-size: 14px;
		color: black;
		font-weight: bold;
	}
	
	.confirm {
		width: 140px;
		height: 40px;
		border: none;
		border-radius: 5px;
		background: #038be2;
		color: white;
		line-height: 40px;
		text-align: center;
		margin-left: 500px;
		margin-right: 30px;
	}
	
	.call {
		width: 140px;
		height: 40px;
		border: none;
		border: 1px solid #666;
		border-radius: 5px;
		background: #f8f8f8;
		color: #666666;
		line-height: 40px;
		text-align: center;
	}
	
	#right-content {
		padding-bottom: 80px!important;
	}
	
	.ivu-modal-footer {
		display: none;
	}
	
	.ivu-modal-wrap .ivu-modal {
		width: 800px!important;
		height: 600px;
	}
	
	.ivu-modal-wrap .ivu-modal .ivu-modal-content .ivu-modal-close {
		display: inline-block;
		background: #333333;
		width: 30px;
		border-radius: 50%;
		text-align: center;
		position: absolute;
		top: -5%;
		right: -5%;
	}
	
	.ivu-modal-wrap .ivu-modal .ivu-modal-content .ivu-modal-body {
		width: 800px;
		height: 600px;
		overflow: hidden;
	}
	
	.ivu-modal-wrap .ivu-modal .ivu-modal-content .ivu-modal-body img {
		width: 100%;
		height: 550px;
	}
</style>