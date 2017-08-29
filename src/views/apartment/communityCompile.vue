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
							<td>社区名称：</td>
							<td><input type="text" placeholder="请输入社区名称" class="complie_name" v-model="communityName"></td>
						</tr>
						<tr>
							<td>地址：</td>
							<td>
								<el-select v-model="province" placeholder="请选择省" @change='isActive(province)'>
									<el-option v-for="item in parent" :key="item.areaName" :label="item.areaName" :value="item.areaName">
									</el-option>
								</el-select>
								<el-select v-model="city" placeholder="请选择市" @change='isActive2(city)'>
									<el-option v-for="item in parents" :key="item.areaName" :label="item.areaName" :value="item.areaName">
									</el-option>
								</el-select>
								<el-select v-model="value" placeholder="请选择区">
									<el-option v-for="item in countyList" :key="item.areaName" :label="item.areaName" :value="item.areaName">
									</el-option>
								</el-select><br>
							</td>
						</tr>
						<tr>
							<td class="xiangxi">
								<el-input v-model="communityAddress" placeholder="请填写详细地址"></el-input>
							</td>
						</tr>
						<tr>
							<td>社区类型：</td>
							<td>
								<el-checkbox-group v-model="checkList" @change="types(checkList)">
									<el-checkbox label="公寓"></el-checkbox>
									<el-checkbox label="办公空间"></el-checkbox>

								</el-checkbox-group>
							</td>
						</tr>
						<tr>
							<td>开业日期：</td>
							<td>
								<div class="form-item">
									<Date-picker type="date" placeholder="选择日期" v-model="communityOpeningDate"></Date-picker>
								</div>
							</td>
						</tr>
						<tr>
							<td>社区服务电话：</td>
							<td><input type="text" placeholder="请输入社区服务电话" class="complie_name2" v-model="communityPhone"></td>
						</tr>
						<tr>
							<td>物业合同编号：</td>
							<td><input type="text" placeholder="请输入物业合同编号" class="complie_name3" v-model="communityContractNum"></td>
						</tr>
						<tr>
							<td>
								租期：
							</td>
							<td>
								<Date-picker type="date" placeholder="请选择日期" v-model="communityLeaseBegin"></Date-picker>
								<span class="inline-block spanBar">-</span>
								<Date-picker type="date" placeholder="请选择日期" v-model="communityLeaseEnd"></Date-picker>
							</td>
						</tr>
						<tr>
							<td>
								免租期：
							</td>
							<td>
								<Date-picker type="date" placeholder="请选择日期" v-model="communityFreeLeaseBegin"></Date-picker>
								<span class="inline-block spanBar">-</span>
								<Date-picker type="date" placeholder="请选择日期" v-model="communityFreeLeaseEnd"></Date-picker>
							</td>
						</tr>
						<tr>
							<td>
								物业合同：
							</td>
							<td>
								<span class="mn">请选择文件<input type="file" class="file" multiple="true" accept=".pdf" @change='uploadFile' /></span>
							</td>
						</tr>
						<tr>
								<ul class="unloading">
									<li v-for="(item,index) in fileList">
										<span>已上传： </span><a>{{item[1]}}</a><i class="el-icon-delete" @click='removeItem(item)'></i>
									</li>
								</ul>
						</tr>
					</table>
					<div class="operation-box2">

						<Button type="primary" @click="Complie">确定</Button>

						<Button>取消</Button>
					</div>
				</div>

			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	import '../../sass/style/communityComplie.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import { hostComplie, hostParent } from '../api.js';
	import qs from 'qs';

	export default {
		components: {
			rightHeader,
			menuBox,
			footerBox
		},
		data() {
			return {
				param: null,
				fileList: [],
				pdfName: [],
				province: '', //省
				city: '', //市
				value: '', //区
				areaId: null, //省ID
				parentId: null, //市ID,
				areas: null, //区ID
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
				communityContractFile: '' //物业合同
			}
		},
		mounted() {
			this.param = new FormData(); //创建form对象
		},
		methods: {

			Complie: function() {
				let vm = this
				this.areas = this.countyList[this.countyList.findIndex(item => item.areaName == this.value)].areaId;
				
//				console.log('vm.fileList.Length')
//				console.log(vm.fileList.length)
//				console.log('vm.fileList.Length')
				for(let i = 0; i < vm.fileList.length; i++) {
					//  				this.param.append('communityContractFiles',vm.fileList[i][0],vm.fileList[i][1]);
					vm.param.append('communityContractFiles', vm.fileList[i][0], vm.fileList[i][1]);
				}
				console.log('参数')
				console.log(vm.communityName)
				console.log(vm.areaId)
				console.log(vm.parentId)
				console.log(vm.areas)
				console.log(vm.communityAddress)
				console.log(vm.communityOpeningDate)
				console.log(vm.communityType)
				console.log(vm.communityPhone)
				console.log(vm.communityContractNum)
				console.log(vm.communityLeaseBegin)
				console.log(vm.communityLeaseEnd)
				console.log(vm.communityFreeLeaseBegin)
				//  			console.log(vm.communityContractFile)
				console.log('参数')
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
				this.$http.post('http://192.168.26.118:8080/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityAdd200002', vm.param).then(res => {
						console.log(res);
						alert('已添加成功！');
					})
					.catch(error => {
						console.log(error);
					})
			},
			uploadFile(e) {
				let vm = this
				let file = e.target.files[0];
				let files = [file, file.name];
				this.fileList.push(files);
				this.pdfName.push(e.currentTarget.files[0].name);
				//  			console.log(this.pdfName)
			},
			removeItem(item) {
				console.log(this.param)
				let fileIndex = this.pdfName.findIndex(items => items == item);
				this.fileList.splice(fileIndex, 1);
				this.pdfName.splice(fileIndex, 1);
				console.log(fileIndex)
			},
			isActive(value) { //获取市的数据

				this.areaId = this.parent[this.parent.findIndex(item => item.areaName == value)].areaId;
				this.httpPost(this.areaId, 1);
			},
			isActive2(value) { //获取区的数据
				this.parentId = this.parents[this.parents.findIndex(item => item.areaName == value)].areaId;
				this.httpPost(this.parentId, 2);
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
							//console.log(vm.parents);
						} else if(num == 2) {
							vm.countyList = response.data.result.areaList;
							//console.log(vm.countyList);
						}
					})
					.catch((error) => {
						console.log(126)
						console.log(error);
					})

			},
			types(mw) {
				console.log(mw);
				this.communityType = null;
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
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
</style>