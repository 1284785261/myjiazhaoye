<template>
	<div id="communityPesents">
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置：</span>
					<router-link class="active" to="/apartment/communityManagement">社区管理</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>社区介绍</h3>
					<span>{{communityName}}</span>
				</div>
				<div class="ivu-warp-Community">
					<div class="ivu-main-img">
						<h4>社区图片：</h4>
						<div class="item-img">
							<span class="fl">社区门面：</span>
							<div class="demo-upload-list" v-for="item in uploadList2">
								<template>
									<img :src="item.url">
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView2(item)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove5(item)"></Icon>
									</div>
								</template>
								<template>
									<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
								</template>
							</div>
							<div class="demo-upload-list" v-for="item in uploadList5">
								<template v-if="item.status === 'finished'">
									<img :src="item.url">
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView2(item)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove2(item)"></Icon>
									</div>
								</template>
								<template v-else>
									<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
								</template>
							</div>
							<Upload
						        ref="upload2"
						        :show-upload-list="false"
						        :default-file-list="defaultList2"
						        :on-success="handleSuccess2"
						        :format="['jpg','jpeg','png']"
						        :max-size="2048"
						        :on-format-error="handleFormatError2"
						        :on-exceeded-size="handleMaxSize2"
						        :before-upload="handleBeforeUpload2"
						        multiple
						        type="drag"
						        :action='host3'
						        :data='data'
						        style="display: inline-block;width:160px;">
						        <div style="width: 160px;height:120px;line-height: 120px;">
						            <Icon type="camera" size="20"></Icon>
						        </div>
						  </Upload>
							<Modal v-model="visible">
								<img :src="imgName" v-if="visible">
							</Modal>
						</div>
						<div class="item-img" v-if="hides1">
							<span class="fl">公寓：</span>
							<div class="demo-upload-list" v-for="item in uploadList1">
								<template>
									<img :src="item.url">
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView1(item)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove4(item)"></Icon>
									</div>
								</template>
							</div>
							<div class="demo-upload-list" v-for="item in uploadList">
								<template v-if="item.status === 'finished'">
									<img :src="item.url">
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView1(item)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove1(item)"></Icon>
									</div>
								</template>
								<template v-else>
									<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
								</template>
				
							</div>
							<Upload
						        ref="upload"
						        :show-upload-list="false"
						        :default-file-list="defaultList"
						        :on-success="handleSuccess"
						        :format="['jpg','jpeg','png']"
						        :max-size="2048"
						        :on-format-error="handleFormatError"
						        :on-exceeded-size="handleMaxSize"
						        :before-upload="handleBeforeUpload"
						        multiple
						        type="drag"
						        :action='host3'
						        :data='data'
						        style="display: inline-block;width:160px;">
						        <div style="width: 160px;height:120px;line-height: 120px;">
						            <Icon type="camera" size="20"></Icon>
						        </div>
						  </Upload>
							<Modal v-model="visible">
								<img :src="imgName" v-if="visible">
							</Modal>
						</div>
						
						<div class="item-img" v-if="hides2">
							<span class="fl">办公区：</span>
							<div class="demo-upload-list" v-for="item in uploadList3">
								<template>
									<img :src="item.url">
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView3(item)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove6(item)"></Icon>
									</div>
								</template>
								<template>
									<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
								</template>
							</div>
							<div class="demo-upload-list" v-for="item in uploadList6">
								<template v-if="item.status === 'finished'">
									<img :src="item.url">
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView3(item)"></Icon>
										<Icon type="ios-trash-outline" @click.native="handleRemove3(item)"></Icon>
									</div>
								</template>
								<template v-else>
									<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
								</template>
							</div>
							<Upload
						        ref="upload3"
						        :show-upload-list="false"
						        :default-file-list="defaultList3"
						        :on-success="handleSuccess3"
						        :format="['jpg','jpeg','png']"
						        :max-size="2048"
						        :on-format-error="handleFormatError3"
						        :on-exceeded-size="handleMaxSize3"
						        :before-upload="handleBeforeUpload3"
						        multiple
						        type="drag"
						        :action='host3'
						        :data='data'
						        style="display: inline-block;width:160px;">
						        <div style="width: 160px;height:120px;line-height: 120px;">
						            <Icon type="camera" size="20"></Icon>
						        </div>
						  </Upload>
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
						<div class="editor-container" v-if="defaultMsg">
							
							<UE :defaultMsg='defaultMsg' :config=config ref="ue"></UE>
						</div>
					</div>
					<button class="confirm" @click="click" :disabled="disabled" v-if="jurisdiction('COMMUNITY_UPDATE')">确定</button>
					<button class="call" @click="goBack" v-if="jurisdiction('COMMUNITY_UPDATE')">取消</button>
				</div>
			</div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
	</div>
</template>
<script>
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import UE from '../../components/uedit.vue';
	import axios from 'axios';
	import {hostPresent,imgPath,hostTitle,host} from '../api.js';
	import qs from 'qs';
	export default {
		components: {
			rightHeader,
			menuBox,
			footerBox,
			successModal,
			warningModal,
			UE
			
		},
		data() {
			return {
				data: {
					module: 'introduce'
				},
				activeTabName:"communityManagement",
				host3:'',
				successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
				content:'',
				filelist1:[],
				filelist2:[],
				filelist3:[],
				imgName: '',
				visible: false,
				uploadList: [],
				uploadList1:[],
				uploadList2: [],
				uploadList3: [],
				uploadList4: [],
				uploadList5: [],
				uploadList6: [],
				config: {
					autoHeightEnabled: false,
            		autoFloatEnabled: true,　　//是否工具栏可浮动
					initialFrameWidth: null,
					initialFrameHeight: 350,
					BaseUrl: '',
            		UEDITOR_HOME_URL: '/static/UE/'
				},
				communityId:null, //社区ID
				community:null, //当前页面数据
				url:hostPresent,
				imgPath:'',
				defaultMsg:'',
				defaultList: [],
				defaultList2: [],
				defaultList3: [],
				disabled:false,
				communityName:'',
				type:null,
				hides1:true,
				hides2:true
			}

		},
		mounted() {
			this.uploadList = this.$refs.upload.fileList;
			this.uploadList5 = this.$refs.upload2.fileList;
			this.uploadList6 = this.$refs.upload3.fileList;
			this.host3 = host + '/cxkj-room/apis/system/file/SystemFileUpload100023';
			this.communityId = this.$route.query.id;
			this.communityName = this.$route.query.Name;
			this.present();	
			this.imgPath = imgPath;
			let type = this.$route.query.type;
			if(type == '0'){
			this.hides2 = false;
			}
			else if(type == '1'){
			this.hides1 = false;
			}
			else{
			this.hides1 = true;
			this.hides2 = true;
			}
		},
		methods: {
			click(){
				let vm = this
				vm.disabled = false;
				vm.content = this.$refs.ue.getUEContent(); 
				let param = new FormData();
//				this.$notify({
//					title: '获取成功，可在控制台查看！',
//					message: vm.content,
//					type: 'success'
//				});
				// console.log(vm.content)
				param.append("communityId",vm.communityId);
				param.append("communityInfo",vm.content);
				// console.log(100);
				// console.log(this.filelist1.join(','));
				// console.log(this.filelist2.join(','));
				// console.log(this.filelist3.join(','));
				param.append('communityFlat', this.filelist1.join(','));
				param.append('communityFace', this.filelist2.join(','));
				param.append('communityWork', this.filelist3.join(','));
				this.$http.post( hostPresent, param).then((response) =>{
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000){
						this.successMessage = '操作成功';
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							vm.disabled = true;
							vm.$router.push('/apartment/communityManagement');
						}, 2000);
						//vm.$router.push({path:"/apartment/communityManagement"});
					}
					else{
						this.warningMessage = response.data.content;
						this.warningModal = true;
					}
				})
				.catch((error) =>{
					// console.log(error);
					this.warningMessage = '操作失败,服务器出现异常';
					this.warningModal = true;
				})
			},
			handleView1(name) {
				this.imgName = name.url;
				this.visible = true;
			},
			goBack(){
				this.$router.push('/apartment/communityManagement');
			},
            handleSuccess (res, file) {
            	console.log(res);
            	if(res.code == 10000){
            		file.url = imgPath + res.result.virtualPath;
            		let len = res.result.virtualPath.split("/");
	                file.name = len[len.length-1];
            		this.filelist1.push(res.result.virtualPath);
            	}
            	// console.log(this.uploadList);
            	// console.log(this.filelist1);
            },
            closeWarningModal() {
				this.warningModal = false;
			},
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length+this.uploadList1.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 5 张图片。'
                    });
                }
                return check;
            },
			handleView2(name) {
				this.imgName = name.url;
				this.visible = true;
			},
			handleSuccess2 (res, file) {
            	console.log(res);
            	if(res.code == 10000){
            		file.url = imgPath + res.result.virtualPath;
            		let len = res.result.virtualPath.split("/");
	                file.name = len[len.length-1];
            		this.filelist2.push(res.result.virtualPath);
            	}
            	// console.log(this.uploadList2);
            	// console.log(this.filelist1);
            },
            handleFormatError2 (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize2 (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleBeforeUpload2 () {
                const check = this.uploadList2.length+this.uploadList5.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 5 张图片。'
                    });
                }
                return check;
            },
			handleView3(name) {
				this.imgName = name.url;
				this.visible = true;
			},
			handleSuccess3 (res, file) {
            	console.log(res);
            	if(res.code == 10000){
            		file.url = imgPath + res.result.virtualPath;
            		let len = res.result.virtualPath.split("/");
	                file.name = len[len.length-1];
            		this.filelist3.push(res.result.virtualPath);
            	}
            	// console.log(this.uploadList3);
            	// console.log(this.filelist1);
            },
            handleFormatError3 (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
                });
            },
            handleMaxSize3 (file) {
                this.$Notice.warning({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
                });
            },
            handleBeforeUpload3 () {
                const check = this.uploadList3.length + this.uploadList6.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 5 张图片。'
                    });
                }
                return check;
            },
			handleRemove4(item){
				let fileIndex = this.uploadList1.findIndex(items => items == item);
				// console.log(this.filelist1)
				// console.log(this.uploadList1);
				
				this.uploadList1.splice(fileIndex,1);
				this.filelist1.splice(fileIndex,1);
				// console.log(this.filelist1)
				// console.log(this.uploadList1);
			},
			handleRemove1(item){
				let fileIndex = this.uploadList.findIndex(items => items == item);
				this.uploadList.splice(fileIndex,1);
				this.filelist1.splice(fileIndex,1);
				// console.log(this.filelist1);
				// console.log(this.uploadList);
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
			handleRemove5(item){
				let fileIndex = this.uploadList2.findIndex(items => items == item);
				this.uploadList2.splice(fileIndex,1);
				this.filelist2.splice(fileIndex,1);
				// console.log(this.uploadList2);
				
			},
			handleRemove6(item){
				let fileIndex = this.uploadList3.findIndex(items => items == item);
				this.uploadList3.splice(fileIndex,1);
				this.filelist3.splice(fileIndex,1);
				// console.log(this.uploadList3);
				
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
				// console.log(this.uploadList);
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
					// console.log(response);

					if(response.status == 200 && response.data.code == 10000){
						vm.community = response.data.result.community;
					  if(response.data.result.community.communityInfo){

                        vm.defaultMsg=response.data.result.community.communityInfo
                        // console.log(vm.defaultMsg)
//                        vm.defaultMsg = response.data.result.community.communityInfo;
                      }
					  else {
                       vm.defaultMsg='请输入社区介绍'
                      }

						let arr = [];
						let arr2 = [];
						let arr3 = [];
						// console.log(vm.community.communityWork);
						arr2 = vm.community.communityFace.split(",");
						arr3 = vm.community.communityWork.split(",");
						arr = vm.community.communityFlat.split(",");
						// console.log(arr);
						// console.log(arr2);
						// console.log(arr3);
//						let imgUrl=response.data.result.community.communityContract.split(",");
						vm.uploadList1 = [];
						if(arr.length && arr[0] != ''){
							for(let k = 0; k < arr.length; k++){
	                              let item= {}
	                              let len= arr[k].split("/");
	                              item.name=len[len.length-1]
	                              item.url =imgPath + arr[k]
	                              item.status = 'finished'
	                              vm.uploadList1.push(item);
	                              vm.filelist1.push(arr[k]);
	                        }
							// console.log(vm.uploadList1);
						}
						
						vm.uploadList2 = [];
						vm.uploadList3 = [];
						if(arr2.length && arr2[0] != ''){
							for(let k = 0; k < arr2.length; k++){
	                              let item= {}
	                              let len= arr2[k].split("/");
	                              item.name=len[len.length-1]
	                              item.url =imgPath + arr2[k]
	                              item.status = 'finished'
	                              vm.uploadList2.push(item);
	                              vm.filelist2.push(arr2[k]);
	                        }
						}
						if(arr3.length && arr3[0] != ''){
							for(let k = 0; k < arr3.length; k++){
	                              let item= {}
	                              let len= arr3[k].split("/");
	                              item.name=len[len.length-1]
	                              item.url =imgPath + arr3[k]
	                              item.status = 'finished'
	                              vm.uploadList6.push(item);
	                              vm.filelist3.push(arr3[k]);
	                        }
						}
					}
					
				})
				.catch((error)=>{
					// console.log(error);
				})
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
	@import '../../sass/page/_communityPresentation.scss';
	#communityPesents .ivu-warp-Community {
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
		width: 965px;
		margin-bottom: 50px;
	}
	
	#edui1_iframeholder {
		height: 240px!important;
	}
	
	.bts {
		display: inline-block;
		position: absolute;
		left: -21px;
    	top: 523px;
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
		cursor: pointer;
	}
	
	.call {
		width: 140px;
		height: 40px;
		border: none;
		border: 1px solid #dcdcdc;
		border-radius: 5px;
		background: #f8f8f8;
		color: #666666;
		line-height: 40px;
		text-align: center;
		cursor: pointer;
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
	.edui-editor{
		z-index: 100!important;
	}
</style>
