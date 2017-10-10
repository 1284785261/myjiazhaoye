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
					<h3><i class="icon icon-iden"></i>编辑社区信息</h3>
				</div>
				<div class="message-tis">
					<table class="cop">
						<tr>
							<td><span class="btxs">*</span>社区名称：</td>
							<td><input type="text" placeholder="请输入社区名称" class="complie_name" v-model="communityName"></td>
						</tr>
						<tr>
							<td><span class="btxs">*</span>地址：</td>
							<td>
								<el-select v-model="province" placeholder="请选择省" @change='isActive(province)'>
									<el-option v-for="item in parent" :key="item.areaName" :label="item.areaName" :value="item.areaName">
									</el-option>
								</el-select>
								<el-select v-model="city" placeholder="请选择市" @change='isActive2(city)'>
									<el-option v-for="item in parents" :key="item.areaName" :label="item.areaName" :value="item.areaName">
									</el-option>
								</el-select>
								<el-select v-model="valuem" placeholder="请选择区" @change='isActive3(valuem)'>
									<el-option v-for="item in countyList" :key="item.areaName" :label="item.areaName" :value="item.areaName">
									</el-option>
								</el-select><br>
							</td>
						</tr>
						<tr>
							<td></td>
							<td class="xiangxi">
								<el-input v-model="communityAddress" placeholder="请填写详细地址"></el-input>
							</td>
						</tr>
						<tr>
							<td><span class="btxs">*</span>社区类型：</td>
							<td>
								<el-checkbox-group v-model="checkList" @change="types(checkList)">
									<el-checkbox label="公寓"></el-checkbox>
									<el-checkbox label="办公空间"></el-checkbox>

								</el-checkbox-group>
							</td>
						</tr>
						<tr>
							<td><span class="btxs">*</span>开业日期：</td>
							<td>
								<div class="form-item">
									<Date-picker type="date" placeholder="选择日期" v-model="communityOpeningDate"></Date-picker>
								</div>
							</td>
						</tr>
						<tr>
							<td><span class="btxs">*</span>社区服务电话：</td>
							<td><input type="text" placeholder="请输入社区服务电话" class="complie_name2" v-model="communityPhone"></td>
						</tr>
						<tr>
							<td><span class="btxs">*</span>物业合同编号：</td>
							<td><input type="text" placeholder="请输入物业合同编号" class="complie_name3" v-model="communityContractNum"></td>
						</tr>
						<tr>
							<td>
								<span class="btxs">*</span>租期：
							</td>
							<td>
								<Date-picker type="date" placeholder="请选择日期" v-model="communityLeaseBegin"></Date-picker>
								<span class="inline-block spanBar">-</span>
								<Date-picker type="date" placeholder="请选择日期" v-model="communityLeaseEnd"></Date-picker>
							</td>
						</tr>
						<tr>
							<td>
								<span class="btxs">*</span>免租期：
							</td>
							<td>
								<Date-picker type="date" placeholder="请选择日期" v-model="communityFreeLeaseBegin"></Date-picker>
								<span class="inline-block spanBar">-</span>
								<Date-picker type="date" placeholder="请选择日期" v-model="communityFreeLeaseEnd"></Date-picker>
							</td>
						</tr>
						<tr>
							<td valign="top">
								<span class="btxs">*</span>物业合同：
							</td>
							<td class="bargain">
								<!--<span class="mn">请选择文件<input type="file" class="file" multiple="true" accept=".pdf,.png" @change='uploadFile' /></span>-->
								<!--<span class="md"><i class="el-icon-information"></i>只能上传.pdf,.png文件</span>-->
								<el-upload class="upload-demo" :action='host3' :data='data' :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList3" :on-success='success' :on-error='error' >
									<el-button size="small" type="primary">点击上传</el-button>
									<div slot="tip" class="el-upload__tip"><i class="el-icon-information"></i>只能上传jpg/png文件</div>
								</el-upload>

							</td>
						</tr>
					</table>
					<div class="operation-box2">
						<!--<el-button type="primary" @click="Complie" v-loading.fullscreen.lock="fullscreenLoading">
							确定
						</el-button>-->
						<Button type="primary" @click="Complie" v-if="communityId == '' ">确定</Button>
						<Button type="primary" @click="Complie2" v-else>确定</Button>
						<Button>取消</Button>
					</div>
				</div>

			</div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
	</div>
</template>

<script>
	import '../../sass/style/communityComplie.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import axios from 'axios';
	import { hostComplie, hostParent, hostTitle ,host,imgPath,hostaddComplie} from '../api.js';
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
				data: {
					module: 'community'
				},
        		host3:'',
				successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
				fullscreenLoading: false,
				param: null,
				param2: null,
				pdfName: [],
				province: '', //省
				city: '', //市
				valuem: '', //区
				areaId: '', //省ID
				parentId: '', //市ID,
				areas: '', //区ID
				input: '',
				checked: true,
				file: null,
				loadingStatus: false,
				parent: [], //省的数据
				parents: [], //市的数据
				countyList: [], //县的数据
				checkList: [], //办公类型
				inputFunc: '',
				communityName: null, //社区名称
				communityAddress: null, //详细地址
				communityOpeningDate: null, //开业日期
				communityType: '', //社区类型
				communityPhone: null, //社区服务电话
				communityContractNum: null, //物业合同编号
				communityLeaseBegin: null, //租期开始时间
				communityLeaseEnd: null, //租期结束时间
				communityFreeLeaseBegin: null, //免租期开始时间
				communityFreeLeaseEnd: null, //免租期结束时间
				communityContract: '', //物业合同
				communityId:'',
              	fileList3: []
			}
		},
		mounted() {
      		this.host3 = host + '/cxkj-room/apis/system/file/SystemFileUpload100023';
      		this.param = new FormData(); //创建form对象
 			this.param2 = new FormData(); //创建form对象
			if(this.$route.query.id){
				this.communityId = this.$route.query.id;
				this.befor();
			}
			
		},
		methods: {
			befor(){
				let vm = this
				if(this.communityId != ''){
					axios.post(hostTitle,
				  	qs.stringify({
		    			communityId:vm.communityId
			    	}))
			    	.then((response)=>{
			    		console.log(response);
			    		if(response.status == 200 && response.data.code == 10000) {
							vm.communityName = response.data.result.community.communityName;
							vm.province = response.data.result.community.province.areaName;
							vm.areaId = response.data.result.community.province.areaId;
							vm.city = response.data.result.community.city.areaName;
							vm.parentId = response.data.result.community.city.areaId;
							this.httpPost(this.parentId, 2);
							vm.valuem = response.data.result.community.district.areaName;
							vm.areas = response.data.result.community.district.areaId;
							vm.communityAddress = response.data.result.community.communityAddress;
							this.pdfName = response.data.result.community.communityContract.split(',');
							let imgUrl=response.data.result.community.communityContract.split(",");
							for(let k = 0; k < imgUrl.length; k++){
                              let item= {}
                              let len= imgUrl[k].split("/");
                              item.name=len[len.length-1]
                              item.url =imgPath+imgUrl[k]
                              item.status = 'finished'
                              vm.fileList3.push(item)
                           }
							if(response.data.result.community.communityType == '0'){
								vm.checkList.push('公寓');
								vm.communityType = '0';
							}
							else if(response.data.result.community.communityType == '1'){
								vm.checkList.push('办公空间');
								vm.communityType = '1';
							}
							else if(response.data.result.community.communityType == '0,1'){
								vm.checkList.push('公寓');
								vm.checkList.push('办公空间');
								vm.communityType = '0,1';
							}
							vm.communityOpeningDate = response.data.result.community.communityOpeningDate;
							vm.communityPhone= response.data.result.community.communityPhone;
							vm.communityContractNum= response.data.result.community.communityPhone;
							vm.communityLeaseBegin= response.data.result.community.communityLeaseBegin;
							vm.communityLeaseEnd= response.data.result.community.communityLeaseEnd;
							vm.communityFreeLeaseBegin= response.data.result.community.communityFreeLeaseBegin;
							vm.communityFreeLeaseEnd= response.data.result.community.communityFreeLeaseEnd;
			    		}
			    	})
			    	.catch((error)=>{
			    		console.log(error);
			    	})
				}
			},
			handleRemove(file, fileList3) { //删除文件
				//console.log(file,fileList);
				if(file.response.code == 10000){
					this.pdfName.remove(file.response.result.virtualPath);
					//console.log(this.pdfName);
				}
			},
			success(response) { //上传文件成功
				if(response.code == 10000) {
					this.pdfName.push(response.result.virtualPath);
					console.log(this.pdfName);
				}
				
			},
			error(err) { //上传文件失败
				console.log(err);
			},
			handlePreview(file) {
				console.log(file);
			},
			Complie() {
				let vm = this
				console.log(this.pdfName);
				vm.communityContract = this.pdfName.join(',');

				console.log(vm.communityContract);
//				console.log(vm.communityOpeningDate)
//				console.log(vm.communityPhone)
//				console.log(vm.communityContractNum)
//				console.log(vm.communityLeaseBegin)
//				console.log(vm.communityLeaseEnd)
//				console.log(vm.communityFreeLeaseBegin)
//				console.log(vm.communityFreeLeaseEnd)
				console.log(vm.areaId)
				console.log(vm.communityAddress)
				console.log(vm.communityType)
				console.log(vm.parentId)
				console.log(vm.areas)
				this.communityOpeningDate = new Date(this.communityOpeningDate).Format('yyyy-MM-dd');
				this.communityLeaseBegin = new Date(this.communityLeaseBegin).Format('yyyy-MM-dd');
				this.communityLeaseEnd = new Date(this.communityLeaseEnd).Format('yyyy-MM-dd');
				this.communityFreeLeaseBegin = new Date(this.communityFreeLeaseBegin).Format('yyyy-MM-dd');
				this.communityFreeLeaseEnd = new Date(this.communityFreeLeaseEnd).Format('yyyy-MM-dd');
				this.param.append("communityName", vm.communityName);
				this.param.append("communityProvince", vm.areaId);
				this.param.append("communityCity", vm.parentId);
				this.param.append("communityDistrict", vm.areas);
				this.param.append("communityAddress", vm.communityAddress);
				this.param.append("communityOpeningDate", vm.communityOpeningDate);
				this.param.append("communityType", vm.communityType);
				this.param.append("communityPhone", vm.communityPhone);
				this.param.append("communityContractNum", vm.communityContractNum);
				this.param.append("communityLeaseBegin", vm.communityLeaseBegin);
				this.param.append("communityLeaseEnd", vm.communityLeaseEnd);
				this.param.append("communityFreeLeaseBegin", vm.communityFreeLeaseBegin);
				this.param.append("communityFreeLeaseEnd", vm.communityFreeLeaseEnd);
				this.param.append('communityContract',vm.communityContract)
				this.fullscreenLoading = true;
				if(vm.parentId == '' || vm.areas == '' || vm.communityAddress == null || vm.communityOpeningDate == null || vm.communityType == '' || vm.communityPhone == null || vm.communityContractNum == null || vm.communityLeaseBegin == null || vm.communityLeaseEnd == null || vm.communityFreeLeaseBegin == null || vm.communityFreeLeaseEnd == null || vm.communityContract == '') {
					this.fullscreenLoading = false;
					alert('信息填入不完整，请补充完信息');
				} else {
					this.$http.post(hostComplie, vm.param).then(res => {

							if(res.status == 200 && res.data.code == 10000) {
								setTimeout(() => {
									this.fullscreenLoading = false;
									alert('已添加成功！');
									vm.$router.push('/apartment/communityManagement');
								}, 3000);

							} else {
								this.fullscreenLoading = false;
								alert('添加失败！请检查错误信息')
							}
						})
						.catch(error => {
							console.log(error);
						})
				}
			},
			Complie2() {
				let vm = this
				//console.log(this.pdfName);
				if(vm.communityId != ''){
					vm.communityContract = this.pdfName.join(',');
					console.log(vm.communityName);
					console.log(vm.communityContract);
					console.log(vm.communityAddress)
					console.log(vm.communityType)
					console.log(vm.areaId)
					console.log(vm.parentId)
					console.log(vm.areas)
					console.log(vm.communityContractNum);
					console.log(vm.communityOpeningDate);
					console.log(vm.communityPhone);
					console.log(vm.communityLeaseBegin);
					console.log(vm.communityLeaseEnd);
					console.log(vm.communityFreeLeaseBegin);
					console.log(vm.communityFreeLeaseEnd);
					this.communityOpeningDate = new Date(this.communityOpeningDate).Format('yyyy-MM-dd');
					this.communityLeaseBegin = new Date(this.communityLeaseBegin).Format('yyyy-MM-dd');
					this.communityLeaseEnd = new Date(this.communityLeaseEnd).Format('yyyy-MM-dd');
					this.communityFreeLeaseBegin = new Date(this.communityFreeLeaseBegin).Format('yyyy-MM-dd');
					this.communityFreeLeaseEnd = new Date(this.communityFreeLeaseEnd).Format('yyyy-MM-dd');
					this.param2.append("communityId",vm.communityId);
					this.param2.append("communityName", vm.communityName);
					this.param2.append("communityProvince", vm.areaId);
					this.param2.append("communityCity", vm.parentId);
					this.param2.append("communityDistrict", vm.areas);
					this.param2.append("communityAddress", vm.communityAddress);
					this.param2.append("communityOpeningDate", vm.communityOpeningDate);
					this.param2.append("communityType", vm.communityType);
					this.param2.append("communityPhone", vm.communityPhone);
					this.param2.append("communityContractNum", vm.communityContractNum);
					this.param2.append("communityLeaseBegin", vm.communityLeaseBegin);
					this.param2.append("communityLeaseEnd", vm.communityLeaseEnd);
					this.param2.append("communityFreeLeaseBegin", vm.communityFreeLeaseBegin);
					this.param2.append("communityFreeLeaseEnd", vm.communityFreeLeaseEnd);
					this.param2.append('communityContract',vm.communityContract)
					this.fullscreenLoading = true;
					if(vm.parentId == '' || vm.areas == '' || vm.communityAddress == null || vm.communityOpeningDate == null || vm.communityType == '' || vm.communityPhone == null || vm.communityContractNum == null || vm.communityLeaseBegin == null || vm.communityLeaseEnd == null || vm.communityFreeLeaseBegin == null || vm.communityFreeLeaseEnd == null || vm.communityContract == '') {
						this.fullscreenLoading = false;
						alert('修改信息不完整，请补充完信息');
					} else {
					this.$http.post(hostaddComplie, vm.param2).then(res => {
							console.log(res.data)
							debugger
							if(res.status == 200 && res.data.code == 10000) {
								setTimeout(() => {
									this.fullscreenLoading = false;
									alert('修改成功！');
									vm.$router.push('/apartment/communityManagement');
								}, 3000);
	
							} else {
								this.fullscreenLoading = false;
								alert('修改失败！请检查错误信息')
							}
						})
						.catch(error => {
							console.log(error);
						})
					}
				}
				
			},
			closeWarningModal() {
				this.warningModal = false;
			},
			isActive(value) { //获取市的数据
				this.areaId = this.parent[this.parent.findIndex(item => item.areaName == value)].areaId;
				this.httpPost(this.areaId, 1);
			},
			isActive2(value) { //获取区的数据
				this.parentId = this.parents[this.parents.findIndex(item => item.areaName == value)].areaId;
				this.httpPost(this.parentId, 2);
			},
			isActive3(value) { 
				console.log(value);
				console.log(this.countyList);
				this.areas = this.countyList[this.countyList.findIndex(item => item.areaName == value)].areaId;
				
			},
			httpPost(id, num) { //获取省市区数据的方法调用
				let Id = parseInt(id);
				let vm = this
				this.$http.post(hostParent,
						qs.stringify({
							'parentId': Id
						})).then((response) => {
						if(num == 1) {
							vm.parents = response.data.result.areaList;
							console.log(vm.parents);
						}
						else if(num == 2) {
							vm.countyList = response.data.result.areaList;
							console.log(vm.countyList);
						}
					})
					.catch((error) => {
						console.log(126)
						console.log(error);
					})

			},
			types(mw) {
				console.log(mw);
				this.communityType = '';
				for(var i = 0; i < mw.length; i++) {
					if(mw[i] == "公寓" && mw.length == 1) {
						this.communityType = '0';
						//console.log('11'+this.communityType);
					} else if(mw[i] == "办公空间" && mw.length == 1) {
						this.communityType = '1';
						//console.log('11'+this.communityType);
					} else if(mw.length >= 2) {
						this.communityType = '0,1';
						//console.log('11'+this.communityType);
					}
				}
			}
		},
		created() {

			this.$http.post(hostParent, //获取省的数据
					qs.stringify({
						'parentId': 0
					})).then((response) => {
					//console.log(response);
					this.parent = response.data.result.areaList;
					//console.log(this.parent);
				})
				.catch((error) => {
					console.log(error);
				})
		},
		datas() {
			axios.post(hostTitle,
					qs.stringify({
						communityId: vm.communityId
					}))
				.then((response) => {
					//console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						vm.community = response.data.result.community;

					}

				})
				.catch((error) => {
					console.log(error);
				})
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
</style>
