<template>
	<div class="bugbox">
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置： </span>
					<router-link class="active" to="/system/systems">系统管理</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>人员配备</h3>
					<span v-if="communityName">{{communityName}}</span>
				</div>
				<div id="staffdeploy">
					<table>
						<tr>
							<td style="vertical-align: top;color: #000;font-weight: bold;line-height: 30px;">店长：</td>
							<td>
								<el-select v-model="tableConferen.value1" filterable placeholder="请选择" @change="actives(tableConferen.value1)">
									<el-option v-for="item in tableConferen.option1" :key="item.userName +' ' + item.userAliase + item.userPhone+' (' + item.positionName+')'" :value="item.userName +' '+ item.userAliase + item.userPhone+' (' + item.positionName+')'">
									</el-option>
								</el-select>
								<div class="uploading">
									<a class="upload" href="javascript:void(0);" v-loading.body="loading">
										<input type="file" class="upfile" @change="loadfile" accept="image/png,image/jpg">

										<img :src='imgPath + tableConferen.srcs' v-show="mus" />
										<span class="iconfont icon-jiahao1" v-if="chen"></span>
										<span class="iconfont icon-jiahao2" v-if="chen"></span>
										<span class="jiahao3" v-if="chen">{{tableConferen.deletect2}}</span>
									</a>
								</div>
								<textarea placeholder="请输入店长介绍" v-model="tableConferen.inputValue" maxlength="140"></textarea>
							</td>
						</tr>
					</table>
					<p class="xuexian"></p>
					<table>
						<tr v-for="(item,index) in tableConferences">
							<td style="vertical-align: top;color: #000;font-weight: bold;line-height: 30px;">管家：</td>
							<td>
								<a class="addploy" @click="addstaff" v-if="item.deletect == '继续添加管家'">{{item.deletect}}</a>
								<a class="addploy" @click="details(item,index)" v-else>{{item.deletect}}</a>
								<el-select v-model="item.value2" filterable placeholder="请选择" @change="actives2(item.value2,index)">
									<el-option v-for="ites in item.option2" :key="ites.userName +' ' + ites.userAliase + ites.userPhone+' (' + ites.positionName+')'" :value="ites.userName +' '+ item.userAliase + ites.userPhone+' (' + ites.positionName+')'">
									</el-option>
								</el-select>
								<div class="uploading">
									<a class="upload" href="javascript:void(0);" v-loading.body="loadList[index]">
										<input type="file" class="upfile" @change="loadfile2($event,index)" accept="image/png,image/jpg">

										<img :src='imgPath + item.srcs' v-show="mus2" />
										<span class="iconfont icon-jiahao1" v-if="item.chen"></span>
										<span class="iconfont icon-jiahao2" v-if="item.chen"></span>
										<span class="jiahao3" v-if="item.chen">{{item.deletect2}}</span>
									</a>
								</div>
								<textarea placeholder="请输入管家介绍" v-model="item.inputValue" maxlength="140"></textarea>
							</td>
						</tr>

					</table>
					<p class="xuexian"></p>
					<div class="dibs">
						<div class="div1s" v-show="arr.length != 0">
							<span style="vertical-align: top;color: #000;font-weight: bold;position: absolute;left: 113px;top: 60px;">公寓维修设置：</span>
							<ul v-show="ulsConfer[0].title != ''">
								<li v-for="(item,index) in ulsConfer">
									<span v-if="item.title != ''">{{item.title}}维修：</span>
									<el-select v-model="item.value3" filterable placeholder="请选择" @change="activem(item.value3,index)" v-if="item.title != ''">
										<el-option v-for="ites in item.option3" :key="ites.userName +' ' + ites.userAliase + ites.userPhone+' (' + ites.positionName+')'" :value="ites.userName+' ' + item.userAliase +ites.userPhone+' (' + ites.positionName+')'">
										</el-option>
									</el-select>
								</li>
							</ul>
						</div>
						<div class="div2s" v-show="arr2.length != 0">
							<span style="vertical-align: top;color: #000;font-weight: bold;position: absolute;left: 93px;top: 60px;">办公室维修设置：</span>
							<ul v-show="ulsConfer2[0].title != ''">
								<li v-for="(item,index) in ulsConfer2">
									<span v-if="item.title != ''">{{item.title}}维修：</span>
									<el-select v-model="item.value3" filterable placeholder="请选择" @change="activem2(item.value3,index)" v-if="item.title != ''">
										<el-option v-for="ites in item.option3" :key="ites.userName +' ' + ites.userAliase + ites.userPhone+' (' + ites.positionName+')'" :value="ites.userName+' ' + item.userAliase +ites.userPhone+' (' + ites.positionName+')'">
										</el-option>
									</el-select>
								</li>
							</ul>
						</div>
					</div>
					<p class="xuexian" v-if="ulsConfer[0].title != ''"></p>
					<!-- <p style="width: 92%;margin-left: 4%;border: 1px dashed #DCDCDC;"></p> -->
					<a class="confirm" style="margin-left: 250px;" @click="confirms" v-if="jurisdiction('STAFFING_UPDATE')">确定</a>
					<router-link class="confirm" to="/system/systems" v-if="jurisdiction('STAFFING_UPDATE')">取消</router-link>
				</div>
			</div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
	</div>
</template>

<script>
	import '../../sass/style/staffdeploy.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import axios from 'axios';
	import { hostEmpRelation, hostMaintainRe, host, imgPath, hostAddUserRelation } from '../api.js';
	import qs from 'qs';

	export default {
		components: {
			rightHeader,
			menuBox,
			footerBox,
			successModal,
			warningModal
		},
		data() {
			return {
				activeTabName:"communityManagement",
				tableConferen: {
					option1: [],
					value1: '',
					deletect: '继续添加管家',
					deletect2: '上传照片',
					srcs: '',
					inputValue: '',
					id: ''
				},
				tableConferences: [{
					option2: [],
					value2: '',
					deletect: '继续添加管家',
					deletect2: '上传照片',
					srcs: '',
					inputValue: '',
					chen: true,
					id: ''
				}],
				ulsConfer: [{
					title: '',
					repairDataId: '',
					type: '',
					option3: [],
					value3: '',
					id: ''
				}],
				ulsConfer2: [{
					title: '',
					repairDataId: '',
					type: '',
					option3: [],
					value3: '',
					id: ''
				}],
				communityId: '',
				host3: '',
				chen: true,
				filelist: [],
				param: {},
				loading: false,
				loading2: false,
				loadList: [],
				imgPath: imgPath,
				cxkjCommunityUserRelationList: [],
				cxkjCommunityUserRelationRepair: [],
				successModal: false,
				warningModal: false,
				successMessage: '设置成功',
				warningMessage: '',
				mus: false,
				mus2: false,
				arr:[],
				arr2:[],
				communityName:null
			}
		},
		mounted() {
			this.host3 = host + '/cxkj-room/apis/system/file/SystemFileUpload100023';

			this.communityId = this.$route.query.id;
			this.communityName = this.$route.query.communityName;
			this.$set(this.loadList, 0, false)
			this.datas();
			this.datam();
		},
		filters: {},
		methods: {
			addstaff() {
				this.tableConferences.push({
					option2: [],
					value2: '',
					deletect: '删除',
					deletect2: '上传照片',
					srcs: '',
					inputValue: '',
					chen: true,
					id: ''
				})
				this.$set(this.loadList, this.loadList.length, false)
				this.datas();
			},
			addstas() {
				this.ulsConfer.push({
					title: '',
					repairDataId: '',
					type: '',
					option3: [],
					value3: '',
					id: ''
				})
			},
			addstas2() {
				this.ulsConfer2.push({
					title: '',
					repairDataId: '',
					type: '',
					option3: [],
					value3: '',
					id: ''
				})
			},
			closeWarningModal() {
				this.warningModal = false;
			},
			details(item, index) {
				this.tableConferences.splice(index, 1);
			},
			datas() {
				//				officePositionDataId
				axios.post(hostEmpRelation) //员工信息
					.then((response) => {
						console.log(response);
						if(response.data.code == 10000 && response.status == 200) {
							this.tableConferen.option1 = response.data.entity;
							// console.log(this.tableConferen.option1);
							for(let i = 0; i < this.tableConferences.length; i++) {
								this.tableConferences[i].option2 = response.data.entity;
							}
							for(let i = 0; i < this.ulsConfer.length; i++) {
								this.ulsConfer[i].option3 = response.data.entity;
							}
							for(let i = 0; i < this.ulsConfer2.length; i++) {
								this.ulsConfer2[i].option3 = response.data.entity;
							}
						}
					}).catch((error) => {
						// console.log(error);
					})
			},
			datam() {
				axios.post(hostMaintainRe,
						qs.stringify({ //维修项信息
							communityId: this.communityId
						})
					)
					.then((response) => {

						// console.log(response);
						if(response.data.code == 10000 && response.status == 200) {
							console.log(response.data.entity.cxkjCommunityUserRelationShopowner);
							if(response.data.entity.cxkjCommunityUserRelationShopowner.length) {
								if(response.data.entity.cxkjCommunityUserRelationShopowner[0].userPic){
									this.tableConferen.srcs = response.data.entity.cxkjCommunityUserRelationShopowner[0].userPic;
									this.mus = true;
									this.chen = false;
								}
								this.tableConferen.id = response.data.entity.cxkjCommunityUserRelationShopowner[0].userId;
								this.tableConferen.inputValue = response.data.entity.cxkjCommunityUserRelationShopowner[0].userIntro;
								if(response.data.entity.cxkjCommunityUserRelationShopowner[0].userName != null && response.data.entity.cxkjCommunityUserRelationShopowner[0].userPhone != null) {
									this.tableConferen.value1 = response.data.entity.cxkjCommunityUserRelationShopowner[0].userName + ' '+response.data.entity.cxkjCommunityUserRelationShopowner[0].userAliase + response.data.entity.cxkjCommunityUserRelationShopowner[0].userPhone + ' (' + response.data.entity.cxkjCommunityUserRelationShopowner[0].positionName + ')';
								}

							}
							if(response.data.entity.cxkjCommunityUserRelationHousekeeper.length) {
								for(let i = 0; i < response.data.entity.cxkjCommunityUserRelationHousekeeper.length; i++) {
									if(this.tableConferences.length < response.data.entity.cxkjCommunityUserRelationHousekeeper.length) {
										this.addstaff();
									}
									if(response.data.entity.cxkjCommunityUserRelationHousekeeper[i].userPic) {
										this.tableConferences[i].srcs = response.data.entity.cxkjCommunityUserRelationHousekeeper[i].userPic;
										this.tableConferences[i].chen = false;
										this.mus2 = true;
									}
									this.tableConferences[i].id = response.data.entity.cxkjCommunityUserRelationHousekeeper[i].userId;
									this.tableConferences[i].inputValue = response.data.entity.cxkjCommunityUserRelationHousekeeper[i].userIntro;
									if(response.data.entity.cxkjCommunityUserRelationHousekeeper[i].userName != null && response.data.entity.cxkjCommunityUserRelationHousekeeper[i].userPhone != null) {
										this.tableConferences[i].value2 = response.data.entity.cxkjCommunityUserRelationHousekeeper[i].userName + ' '+response.data.entity.cxkjCommunityUserRelationHousekeeper[0].userAliase + response.data.entity.cxkjCommunityUserRelationHousekeeper[i].userPhone + ' (' + response.data.entity.cxkjCommunityUserRelationHousekeeper[0].positionName + ')';
									}

								}
								console.log(this.tableConferences);
							}
							if(response.data.entity.cxkjCommunityUserRelationRepair.length) {
								this.arr = [];
								this.arr2 = [];
								for(let i = 0; i < response.data.entity.cxkjCommunityUserRelationRepair.length; i++) {

									if(response.data.entity.cxkjCommunityUserRelationRepair[i].type == 0) {
										this.arr.push(response.data.entity.cxkjCommunityUserRelationRepair[i]);
									} else if(response.data.entity.cxkjCommunityUserRelationRepair[i].type == 1) {
										this.arr2.push(response.data.entity.cxkjCommunityUserRelationRepair[i]);
									}
								}
								//console.log(this.arr);
								//console.log(this.arr2);
								for(let i = 0; i < this.arr.length; i++) {
									if(this.ulsConfer.length < this.arr.length) {
										this.addstas();
									}
									this.datas();
									this.ulsConfer[i].id = this.arr[i].userId;
									this.ulsConfer[i].title = this.arr[i].dataName;
									this.ulsConfer[i].repairDataId = this.arr[i].communityMaintainId;
									this.ulsConfer[i].type = this.arr[i].type;
									if(this.arr[i].userName != null && this.arr[i].userPhone != null) {
										this.ulsConfer[i].value3 = this.arr[i].userName +' '+this.arr[i].userAliase + this.arr[i].userPhone + ' (' + this.arr[0].positionName + ')';
									}
								}
								for(let i = 0; i < this.arr2.length; i++) {
									if(this.ulsConfer2.length < this.arr2.length) {
										this.addstas2();
									}
									this.datas();
									this.ulsConfer2[i].id = this.arr2[i].userId;
									this.ulsConfer2[i].title = this.arr2[i].dataName;
									this.ulsConfer2[i].repairDataId = this.arr2[i].communityMaintainId;
									this.ulsConfer2[i].type = this.arr2[i].type;
									if(this.arr[i].userName != null && this.arr2[i].userPhone != null) {
										this.ulsConfer2[i].value3 = this.arr2[i].userName +' '+this.arr2[i].userAliase + this.arr2[i].userPhone + ' (' + this.arr2[0].positionName + ')';
									}
								}
								
								//							console.log(11111111111111);
								//console.log(this.ulsConfer2);
							}
							this.cxkjCommunityUserRelationRepair = response.data.entity.cxkjCommunityUserRelationRepair;

						}
					}).catch((error) => {
						// console.log(error);
					})
			},
			loadfile(e) { //店长上传头像
				let vm = this
				vm.filelist = [];
				let file = e.target.files[0];
				let param = new FormData();
				let files = [file, file.name];
				this.filelist.push(files);
				vm.chen = false;

				param.append('file', file);
				param.append('module', 'personnel');
				this.$http.post(vm.host3, param).then(res => {
					vm.loading = true
					//console.log(res);
					if(res.data.code == 10000 && res.status == 200) {
						setTimeout(function() {
							vm.loading = false;
							vm.mus = true;
						}, 1000)
						this.tableConferen.srcs = res.data.result.virtualPath;
					}

				}).catch(err => {
					// console.log(err);
				})
			},
			loadfile2(e, index) { //管家上传头像
				//console.log(index);
				let vm = this
				vm.filelist = [];
				let file = e.target.files[0];
				if(!file) {
					return
				}
				let files = [file, file.name];
				let param = new FormData();
				this.filelist.push(files);
				//  			vm.loadList[index] = true
				this.$set(this.loadList, index, true)
				this.tableConferences[index].chen = false;
				param.append('file', file);
				//console.log(param)
				this.$http.post(vm.host3, param).then(res => {
					if(res.data.code == 10000 && res.status == 200) {
						setTimeout(function() {
							vm.$set(vm.loadList, index, false);
							vm.mus2 = true;
						}, 1000)
						this.tableConferences[index].srcs = res.data.result.virtualPath;
					}
					//console.log(this.tableConferences);
				}).catch(err => {
					// console.log(err);
				})
			},
			actives(value) {
				let str = value.split(' ');
				// console.log(str);
				this.tableConferen.id = this.tableConferen.option1[this.tableConferen.option1.findIndex(item => item.userName == str[0])].userId;
				let str2 = this.tableConferen.option1[this.tableConferen.option1.findIndex(item => item.userName == str[0])].headPic;
				if(str2){
					this.tableConferen.srcs = str2;
					this.chen = false;
				}
				else{
					this.tableConferen.srcs = '';
				}
				// console.log(this.tableConferen);
			},
			actives2(value, index) {
				let str = value.split(' ');
				this.tableConferences[index].id = this.tableConferences[index].option2[this.tableConferences[index].option2.findIndex(item => item.userName == str[0])].userId;
				let str2 = this.tableConferences[index].option2[this.tableConferences[index].option2.findIndex(item => item.userName == str[0])].headPic;
				if(str2){
					this.tableConferences[index].srcs = str2;
					this.tableConferences[index].chen = false;
				}
				else{
					this.tableConferences[index].srcs = '';
				}
				//console.log(this.tableConferences);
			},
			activem(value, index) {
				let str = value.split(' ');
				this.ulsConfer[index].id = this.ulsConfer[index].option3[this.ulsConfer[index].option3.findIndex(item => item.userName == str[0])].userId;
				//console.log(this.ulsConfer);
			},
			activem2(value, index) {
				let str = value.split(' ');
				this.ulsConfer2[index].id = this.ulsConfer2[index].option3[this.ulsConfer2[index].option3.findIndex(item => item.userName == str[0])].userId;
				//console.log(this.ulsConfer2);
			},
			confirms() {
				let vm = this
				this.cxkjCommunityUserRelationList.push({
					communityId: this.communityId,
					userId: this.tableConferen.id,
					userType: 0,
					userPic: this.tableConferen.srcs,
					userIntro: this.tableConferen.inputValue
				});
				for(let i = 0; i < this.tableConferences.length; i++) {
					this.cxkjCommunityUserRelationList.push({
						communityId: this.communityId,
						userId: this.tableConferences[i].id,
						userType: 1,
						userPic: this.tableConferences[i].srcs,
						userIntro: this.tableConferences[i].inputValue
					});
				}
				for(let i = 0; i < this.ulsConfer.length; i++) {
					this.cxkjCommunityUserRelationList.push({
						communityId: this.communityId,
						userId: this.ulsConfer[i].id,
						userType: 2,
						repairDataId: this.ulsConfer[i].repairDataId
					});
				}
				for(let i = 0; i < this.ulsConfer2.length; i++) {
					this.cxkjCommunityUserRelationList.push({
						communityId: this.communityId,
						userId: this.ulsConfer2[i].id,
						userType: 2,
						repairDataId: this.ulsConfer2[i].repairDataId
					});
				}
				// console.log(this.cxkjCommunityUserRelationList);
				axios.post(hostAddUserRelation, {
					cxkjCommunityUserRelationList: this.cxkjCommunityUserRelationList,
					communityId: this.communityId
				}).then((res) => {
					// console.log(res);
					this.cxkjCommunityUserRelationList = [];
					if(res.data.code == 10000 && res.status == 200) {
						vm.successMessage = '操作成功';
						vm.successModal = true;
						setTimeout(() => {
							vm.successModal = false;
							vm.$router.push('/system/systems');
						}, 2000)
					} else {
						vm.warningMessage = res.data.content;
						vm.warningModal = true;
					}
				}).catch((err) => {

					// console.log(err);
					this.cxkjCommunityUserRelationList = [];
				})
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
</style>