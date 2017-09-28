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
						<div class="item-img">
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
								</template v-else>
								<template>
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
	import {hostPresent,imgPath,hostTitle,host} from '../api.js';
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
				data: {
					module: 'introduce'
				},
				host3:'',
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
					initialFrameWidth: null,
					initialFrameHeight: 350
				},
				communityId:null, //社区ID
				community:null, //当前页面数据
				url:hostPresent,
				param:null,
				imgPath:'',
				defaultMsg:'',
				defaultList: [],
				defaultList2: [],
				defaultList3: [],

			}

		},
		mounted() {
			this.uploadList = this.$refs.upload.fileList;
			this.uploadList5 = this.$refs.upload2.fileList;
			this.uploadList6 = this.$refs.upload3.fileList;
			this.host3 = host + '/cxkj-room/apis/system/file/SystemFileUpload100023';
			this.communityId = this.$route.query.id;
			this.present();	
			this.param = new FormData();
			this.imgPath = imgPath
		},
		methods: {
			click(){
				let vm = this

				vm.content = this.$refs.ue.getUEContent(); 
				
//				this.$notify({
//					title: '获取成功，可在控制台查看！',
//					message: vm.content,
//					type: 'success'
//				});
			
				console.log(vm.content)
				this.param.append("communityId",vm.communityId);
				this.param.append("communityInfo",vm.content);
//				this.param.append("communityFlatHide",vm.uploadList);
//				this.param.append("communityFaceHide",vm.uploadList2);
//				this.param.append("communityWorkHide",vm.uploadList3);
				console.log(100);
				console.log(this.filelist1.join(','));
				console.log(this.filelist2.join(','));
				console.log(this.filelist3.join(','));
				vm.param.append('communityFlat', this.filelist1.join(','));
				vm.param.append('communityFace', this.filelist2.join(','));
				vm.param.append('communityWork', this.filelist3.join(','));
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
				this.imgName = name.url;
				this.visible = true;
			},
            handleSuccess (res, file) {
            	//console.log(res);
            	if(res.code == 10000){
            		file.url = imgPath + res.result.virtualPath;
            		let len = res.result.virtualPath.split("/");
	                file.name = len[len.length-1];
            		this.filelist1.push(res.result.virtualPath);
            	}
            	console.log(this.uploadList);
            	//console.log(this.filelist1);
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
            	//console.log(res);
            	if(res.code == 10000){
            		file.url = imgPath + res.result.virtualPath;
            		let len = res.result.virtualPath.split("/");
	                file.name = len[len.length-1];
            		this.filelist2.push(res.result.virtualPath);
            	}
            	console.log(this.uploadList2);
            	//console.log(this.filelist1);
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
            	//console.log(res);
            	if(res.code == 10000){
            		file.url = imgPath + res.result.virtualPath;
            		let len = res.result.virtualPath.split("/");
	                file.name = len[len.length-1];
            		this.filelist3.push(res.result.virtualPath);
            	}
            	console.log(this.uploadList3);
            	//console.log(this.filelist1);
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
                const check = this.uploadList3.length+this.uploadList6.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 5 张图片。'
                    });
                }
                return check;
            },
			handleRemove4(item){
				let fileIndex = this.uploadList1.findIndex(items => items == item);
				console.log(this.filelist1)
				console.log(this.uploadList1);
				
				this.uploadList1.splice(fileIndex,1);
				this.filelist1.splice(fileIndex,1);
				console.log(this.filelist1)
				console.log(this.uploadList1);
			},
			handleRemove1(item){
				let fileIndex = this.uploadList.findIndex(items => items == item);
				this.uploadList.splice(fileIndex,1);
				this.filelist1.splice(fileIndex,1);
				console.log(this.filelist1);
				console.log(this.uploadList);
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
				console.log(this.uploadList2);
				
			},
			handleRemove6(item){
				let fileIndex = this.uploadList3.findIndex(items => items == item);
				this.uploadList3.splice(fileIndex,1);
				this.filelist3.splice(fileIndex,1);
				console.log(this.uploadList3);
				
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
//					  console.log(111)
//					  console.log(response.data.result.community.communityInfo)
//                      console.log(111)
						vm.community = response.data.result.community;
					  if(response.data.result.community.communityInfo){

                        vm.defaultMsg=response.data.result.community.communityInfo
                        console.log(vm.defaultMsg)
//                        vm.defaultMsg = response.data.result.community.communityInfo;
                      }else {
                       vm.defaultMsg='请输入社区介绍'
                      }

						let arr = [];
						let arr2 = [];
						let arr3 = [];
						
						arr2 = vm.community.communityFace.split(",");
						arr3 = vm.community.communityWork.split(",");
						arr = vm.community.communityFlat.split(",");
						//console.log(arr);
						console.log(arr);
						console.log(arr2);
						console.log(arr3);
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
							console.log(vm.uploadList1);
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

<!--<template>
	<div>	
    <div class="demo-upload-list" v-for="item in uploadList">
        <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
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
        :action="host + '/cxkj-room/apis/system/file/SystemFileUpload100023'"
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="camera" size="20"></Icon>
        </div>
    </Upload>
    <Modal title="查看图片" v-model="visible">
        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
    </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                defaultList: [
          
                ],
                imgName: '',
                visible: false,
                uploadList: [],
                host:'http://120.78.16.234:8060'
            }
        },
        methods: {
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                // 从 upload 实例删除数据
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                // 因为上传过程为实例，这里模拟添加 url
                console.log(res)
                file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
                file.name = '7eb99afb9d5f317c912f08b5212fd69a';
                console.log(this.uploadList);
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
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多只能上传 5 张图片。'
                    });
                }
                return check;
            }
        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
        }
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>-->