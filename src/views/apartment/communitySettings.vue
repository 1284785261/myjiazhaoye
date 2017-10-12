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
					<h3><i class="icon icon-iden"></i>社区设置</h3>
					<span>佳兆业航运WEWA空间</span>
				</div>
				<div id="communitySettingwrap">
					<el-tabs v-model="activeName2" type="card" @tab-click='qkDate'>
						<el-tab-pane label="公寓设置" name="first" v-if="Type1">
							<div class="vue-warp-settings">
								<div class="ivu-floor floor01">
									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>付款方式设置：</span>
										<div class="floor-item">
											<table class="table ivu-table">
												<tr v-for="(tableRepair,index) in tableRepairs">
													<td><label><span class="myRadio"><input type="checkbox" name="radio" v-model="tableRepair.checkValue"><i class="icon icon-radio"></i></span></label></td>
													<td>
														<el-select v-model="tableRepair.value1" placeholder="请选择付款方式" @change="mus(tableRepair.value1,index)">
															<el-option v-for="item in tableRepair.option1" :key="item.dataName" :value="item.dataName">
															</el-option>
														</el-select>
													</td>

													<td><input class="ivu-input" v-model="tableRepair.date" placeholder="租金折扣/浮动比例" style="width: 140px"><span class="baifen">%</span></td>
													<td width="90px"><button class="btn_bar" @click="deleteRepair(tableRepair)">{{tableRepair.deletect}}</button></td>
												</tr>
											</table>
											<div class="add-formItem">
												<Button @click="addRepairs"><Icon type="plus"></Icon>继续添加</Button>
											</div>
										</div>
									</div>
								</div>
								<div class="ivu-floor floor03">
									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>维修项目设置：</span>
										<div class="floor-item">
											<table class="table ivu-table">
												<tr v-for="(tableRepair,index) in tableRepairs2">
													<td><label><span class="myRadio"><input type="checkbox" name="radio" v-model="tableRepair.checkValue"><i class="icon icon-radio"></i></span></label></td>
													<td>
														<el-select v-model="tableRepair.value2" placeholder="请选择维修项目" @change="mvs(tableRepair.value2,index)">
															<el-option v-for="item in tableRepair.option2" :key="item.dataName" :value="item.dataName">
															</el-option>
														</el-select>
													</td>
													<td><span class="text-default">{{tableRepair.element}}</span></td>
													<td><input class="ivu-input" v-model="tableRepair.date" placeholder="24小时内" style="width: 120px"></td>
													<td width="90px"><button class="btn_bar" @click="deleteRepair2(tableRepair)">{{tableRepair.deletect}}</button></td>
												</tr>
											</table>
											<div class="add-formItem">
												<Button @click="addRepairs2"><Icon type="plus"></Icon>继续添加</Button>
											</div>
										</div>
									</div>
								</div>

								<div class="ivu-floor floor02">
									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>家用电器：</span>
										<div class="floor-item form-item">
											<el-checkbox-group v-model="checkList" @change="mms(checkList)">
												<el-checkbox v-for="item in option3" :label=item.dataName></el-checkbox>
											</el-checkbox-group>
										</div>
									</div>

									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>服务费设置：</span>
										<div class="floor-item form-item">
											<span class="item-date"><input type="text" placeholder="请输入服务费" v-model="serviceCost">元/月 </span>
										</div>
									</div>
									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>水电账单日设置：</span>
										<div class="floor-item">
											<Date-picker type="date" placeholder="选择日期" v-model="waterEnergyPayDate"></Date-picker>
											<span class="ivu-yellow"><i class="ivu-icon ivu-icon-information-circled"></i>提醒管家收取水费、电费、服务费</span>
										</div>
									</div>
								</div>

								<div class="ivu-floor floor03">
									<div class="floor-main">
										<div class="floor-main1">
											<span class="fl"><span class="btxs">*</span>水费设置：</span>
											<span class="f5">计费方式：</span>
											<el-radio-group v-model="radio1">
												<el-radio :label="1">按用量</el-radio><br>
												<el-radio :label="2">按合租人数</el-radio>
											</el-radio-group>
											<input class="inputs" type="text" v-model="sect" placeholder="请填写金额"></input><span>元/m²</span><br>
											<input class="inputs inputs2" type="text" v-model="sect2" placeholder="请填写金额"></input><span>元/人</span>
										</div>
									</div>
								</div>
								<div class="ivu-floor floor03">
									<div class="floor-main">
										<div class="floor-main1">
											<span class="fl"><span class="btxs">*</span>电费设置：</span>
											<span class="f5">计费方式：</span>
											<el-radio-group v-model="radio2">

												<el-radio :label="1">按用量</el-radio><br>
												<el-radio :label="2">按合租人数</el-radio>
											</el-radio-group>
											<input class="inputs" type="text" v-model="input1" placeholder="请填写金额"></input><span>元/度</span><br>
											<input class="inputs inputs2" type="text" v-model="input2" placeholder="请填写金额"></input><span>元/人</span>
										</div>
									</div>
								</div>
								<div class="operation-box">
									<Button type="primary" @click="house()">确定</Button>
									<Button>取消</Button>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane label="办公设置" name="second" v-if="Type2">

							<div class="vue-warp-settings">
								<div class="ivu-floor floor01">
									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>付款方式设置：</span>
										<div class="floor-item">
											<table class="table ivu-table">
												<tr v-for="(tableRepair,index) in tableRepairs3">
													<td><label><span class="myRadio"><input type="checkbox" name="radio" v-model="tableRepair.checkValue"><i class="icon icon-radio"></i></span></label></td>
													<td>
														<el-select v-model="tableRepair.value6" placeholder="请选择付款方式" @change="communit1(tableRepair.value6,index)">
															<el-option v-for="item in tableRepair.option6" :key="item.dataName" :value="item.dataName">
															</el-option>
														</el-select>
													</td>

													<td><input class="ivu-input" v-model="tableRepair.date" placeholder="租金折扣/浮动比例" style="width: 140px"><span class="baifen">%</span></td>
													<td width="90px"><button class="btn_bar" @click="deleteRepair3(tableRepair)">{{tableRepair.deletect}}</button></td>
												</tr>
											</table>
											<div class="add-formItem">
												<Button @click="addRepairs3"><Icon type="plus"></Icon>继续添加</Button>
											</div>
										</div>
									</div>
								</div>
								<div class="ivu-floor floor03">
									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>会议室套餐设置：</span>
										<div class="floor-item">
											<table class="table ivu-table">
												<tr v-for="(tableRepair,index) in tableConferences">
													<td><label><span class="myRadio"><input type="checkbox" name="radio" v-model="tableRepair.checkValue"><i class="icon icon-radio"></i></span></label></td>
													<td>
														<el-select v-model="tableRepair.value4" placeholder="请选择套餐名称" style="width: 160px" @change="communit2(tableRepair.value4,index)">
															<el-option v-for="item in tableRepair.option4" :key="item.dataName" :value="item.dataName">
															</el-option>
														</el-select>
													</td>
													<td><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入金额" style="width: 120px"><span class="baifen2">元/</span></td>
													<td>
														<el-select v-model="tableRepair.value8" placeholder="请选择次数" style="width: 140px" class="tbs" @change="communit3(tableRepair.value8,index)">
															<el-option v-for="item in tableRepair.option8" :key="item.dataName" :value="item.dataName">
															</el-option>
														</el-select>
													</td>
													<td width="50px"><button class="btn_bar" @click="deleteConference(tableRepair)">{{tableRepair.deletect}}</button></td>
												</tr>
											</table>
											<div class="add-formItem">
												<Button @click="addRoom"><Icon type="plus"></Icon>继续添加</Button>
											</div>
										</div>
									</div>
								</div>
								<div class="ivu-floor floor03">
									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>维修项目设置：</span>
										<div class="floor-item">
											<table class="table ivu-table">
												<tr v-for="(tableRepair,index) in tableRepairs5">
													<td><label><span class="myRadio"><input type="checkbox" name="radio" v-model="tableRepair.checkValue"><i class="icon icon-radio"></i></span></label></td>
													<td>
														<el-select v-model="tableRepair.value7" placeholder="请选择维修项目" @change="communit4(tableRepair.value7,index)">
															<el-option v-for="item in tableRepair.option7" :key="item.dataName" :value="item.dataName">
															</el-option>
														</el-select>
													</td>
													<td><span class="text-default">{{tableRepair.element}}</span></td>
													<td><input class="ivu-input" v-model="tableRepair.date" placeholder="24小时内" style="width: 120px"></td>
													<td width="90px"><button class="btn_bar" @click="deleteRepair5(tableRepair)">{{tableRepair.deletect}}</button></td>
												</tr>
											</table>
											<div class="add-formItem">
												<Button @click="addRepairs5"><Icon type="plus"></Icon>继续添加</Button>
											</div>
										</div>
									</div>
								</div>
								<div class="ivu-floor floor02">
									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>服务费设置：</span>
										<div class="floor-item form-item">
											<span class="item-date"><input type="text" placeholder="请输入服务费" v-model="serviceCost2">元/月 </span>
										</div>
									</div>
									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>办公物资：</span>
										<div class="floor-item form-item">
											<el-checkbox-group v-model="checkList2" @change="mmu(checkList2)">
												<el-checkbox v-for="item in option5" :label=item.dataName></el-checkbox>
											</el-checkbox-group>
										</div>
									</div>
								</div>
								<div class="operation-box">
									<Button type="primary" @click="refer()">确定</Button>
									<Button>取消</Button>
								</div>
							</div>
						</el-tab-pane>
					</el-tabs>
				</div>

			</div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
	</div>
</template>

<script>
	import '../../sass/style/communitSetting.css'
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import { hostWay, hostRoom, hostRooms } from '../api.js';
	import axios from 'axios';
	import qs from 'qs';
	export default {
		components: {
			rightHeader,
			menuBox,
			footerBox
		},
		data() {
			return {
				radio1: 1,
				radio2: 1,
				checkList: [],
				checkList2: [],
				tableConferences: [{ //会议室套餐数据
					checkValue: "",
					inputValue: "",
					inputValue2: "",
					numValue: "",
					element: "元/",
					option4: [],
					value4: '',
					option8: [],
					value8: ''
				}],
				option3: [],
				value3: '',
				option5: [],
				value5: '',
				deletect: "删除",
				tableRepairs: [{ //公寓付款方式
					checkValue: "",
					inputValue: "",
					date: "",
					deletect: "删除",
					option1: [],
					value1: ''
				}],
				tableRepairs2: [{ //公寓维修项目
					checkValue: "",
					inputValue: "",
					element: "预计上门时间：",
					date: "",
					deletect: "删除",
					option2: [],
					value2: ''
				}],
				tableRepairs3: [{ //社区办公付款方式
					checkValue: "",
					inputValue: "",
					date: "",
					deletect: "删除",
					option6: [],
					value6: ''
				}],
				tableRepairs5: [{ //办公区维修项目设置
					checkValue: "",
					inputValue: "",
					element: "预计上门时间：",
					date: "",
					deletect: "删除",
					option7: [],
					value7: ''
				}],
				activeName2: 'first',
				cxkjCommunityListPayway: [], //公寓付款方式
				cxkjCommunityListMaintain: [], //公寓维修项目	
				cxkjCommunityListConfig: [], //公寓电器选择
				cxkjCommunityListMeetingSuit: [], //会议室套餐设置
				serviceCost: '', //公寓服务费
				serviceCost2: '',
				waterEnergyPayDate: null, //公寓水电账单日设置
				sect: null, //公寓水费用量1
				sect2: null, //公寓水费用量2
				input1: null, //公寓电费用量1
				input2: null, //公寓电费用量1
				waterChargeType: null, //公寓水费类型
				energyChargeType: null, //公寓电费类型
				waterPrice: null, //公寓水费
				energyPrice: null, //公寓电费
				communityId: null, //社区ID
				communityType: '',
				successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
				Type1: true,
				Type2: true,
			}
		},
		mounted() {
			this.communityId = this.$route.query.id;
			this.communityType = this.$route.query.type;
			let arr = this.communityType.split(',');
			console.log(arr);
			for(let i = 0; i < arr.length; i++) {
				if(arr[0] == 0 && arr.length == 1) {
					this.Type1 = true;
					this.Type2 = false;
					this.activeName2 = 'first';
					return
				} else if(arr[0] == 1 && arr.length == 1) {
					this.Type1 = false;
					this.Type2 = true;
					this.activeName2 = 'second';
					return
				}
			}
			this.seting();
			this.seting2();
			this.befors();
			this.compile();

		},
		methods: {
			qkDate() {
				this.cxkjCommunityListPayway = [];
				this.cxkjCommunityListMaintain = [];
			},
			compile() {
				let vm = this
				axios.post(hostRooms, //获取编辑社区办公设置的全部数据
						qs.stringify({
							communityId: vm.communityId,
							communityType: 1
						})
					)
					.then((response) => {
						console.log(11111111111);
						console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							vm.serviceCost2 = response.data.entity[0].serviceCost;
							for(let i = 0; i < response.data.entity[0].cxkjCommunityListConfig.length; i++) {
								vm.checkList2.push(response.data.entity[0].cxkjCommunityListConfig[i].systemData.dataName);
							}
							if(this.tableRepairs3.length < response.data.entity[0].cxkjCommunityListPayway.length) {
								vm.addRepairs3();
							}
							for(let i = 0; i < response.data.entity[0].cxkjCommunityListPayway.length; i++) {
								this.tableRepairs3[i].checkValue = true;
								this.tableRepairs3[i].value6 = response.data.entity[0].cxkjCommunityListPayway[i].systemData.dataName;
								this.tableRepairs3[i].date = response.data.entity[0].cxkjCommunityListPayway[i].discount;
							}
							//console.log(this.tableRepairs3);
							if(this.tableConferences.length < response.data.entity[0].cxkjCommunityListMeetingSuit.length) {
								this.addRoom();
							}
							for(let i = 0; i < response.data.entity[0].cxkjCommunityListMeetingSuit.length; i++) {
								this.tableConferences[i].checkValue = true;
								this.tableConferences[i].value4 = response.data.entity[0].cxkjCommunityListMeetingSuit[i].mettingSuitSystemData.dataName;
								this.tableConferences[i].value8 = response.data.entity[0].cxkjCommunityListMeetingSuit[i].meetingSuitUnitSystemData.dataName;
								this.tableConferences[i].date = response.data.entity[0].cxkjCommunityListMeetingSuit[i].meetingSuitPrice;
							}

							if(this.tableRepairs5.length < response.data.entity[0].cxkjCommunityListMaintain.length) {
								vm.addRepairs5();
							}
							for(let i = 0; i < response.data.entity[0].cxkjCommunityListMaintain.length; i++) {
								this.tableRepairs5[i].checkValue = true;
								this.tableRepairs5[i].value7 = response.data.entity[0].cxkjCommunityListMaintain[i].systemData.dataName;
								this.tableRepairs5[i].date = response.data.entity[0].cxkjCommunityListMaintain[i].onSiteTime;
							}
							//console.log(this.tableRepairs5);

						}
					})
					.catch((error) => {
						console.log(error);
					})
			},
			closeWarningModal() {
				this.warningModal = false;
			},
			addRoom() { //添加会议室套餐类别
				this.tableConferences.push({
					checkValue: "",
					inputValue: "",
					inputValue2: "",
					numValue: "",
					element: "元/",
					option4: [],
					value4: '',
					option8: [],
					value8: ''
				})
				this.seting();
				this.seting2();
			},
			addRepairs() { //添加公寓付款方式设置
				this.tableRepairs.push({
					checkValue: "",
					inputValue: "",
					date: "",
					deletect: "删除",
					option1: [],
					value1: ''
				})
				this.seting();
			},
			addRepairs2() { //添加公寓维修项目
				this.tableRepairs2.push({
					checkValue: "",
					inputValue: "",
					element: "预计上门时间：",
					date: "",
					deletect: "删除",
					option2: [],
					value2: ''
				})
				this.seting();
			},
			addRepairs3() { //添加办公付款方式
				this.tableRepairs3.push({
					checkValue: "",
					inputValue: "",
					date: "",
					deletect: "删除",
					option6: [],
					value6: ''
				})
				this.seting();
			},
			addRepairs5() {
				this.tableRepairs5.push({ //添加办公维修项目
					checkValue: "",
					inputValue: "",
					element: "预计上门时间：",
					date: "",
					deletect: "删除",
					option7: [],
					value7: ''
				})
				this.seting();
			},
			seting() {
				let vm = this //获取付款方式以及维修项目的数据
				axios.post(hostWay,
						qs.stringify({
							parentId: 1
						})
					).then((response) => {
						//console.log(response);
						for(let i = 0; i < vm.tableRepairs.length; i++) {
							vm.tableRepairs[i].option1 = response.data.entity;
							//console.log(vm.tableRepairs);
						}
						for(let i = 0; i < vm.tableRepairs3.length; i++) {
							vm.tableRepairs3[i].option6 = response.data.entity;
						}

					})
					.catch((error) => {
						console.log(error);
					})
				axios.post(hostWay,
						qs.stringify({
							parentId: 15
						})
					).then((response) => {
						for(let i = 0; i < vm.tableRepairs2.length; i++) {
							vm.tableRepairs2[i].option2 = response.data.entity;
						}
						for(let i = 0; i < vm.tableRepairs5.length; i++) {
							vm.tableRepairs5[i].option7 = response.data.entity;
						}

					})
					.catch((error) => {
						console.log(error);
					})
				axios.post(hostWay,
						qs.stringify({
							parentId: 40
						})
					).then((response) => {
						for(let i = 0; i < vm.tableConferences.length; i++) {
							vm.tableConferences[i].option8 = response.data.entity;
						}
					})
					.catch((error) => {
						console.log(error);
					})
			},
			seting2() {
				let vm = this
				axios.post(hostWay,
						qs.stringify({
							parentId: 19
						})
					).then((response) => {
						vm.option3 = response.data.entity;
						//console.log(vm.option3);
					})
					.catch((error) => {
						console.log(error);
					})
				axios.post(hostWay,
						qs.stringify({
							parentId: 26
						})
					).then((response) => {
						for(let i = 0; i < vm.tableConferences.length; i++) {
							vm.tableConferences[i].option4 = response.data.entity;
						}
					})
					.catch((error) => {
						console.log(error);
					})
				axios.post(hostWay,
						qs.stringify({
							parentId: 29
						})
					).then((response) => {
						vm.option5 = response.data.entity;
					})
					.catch((error) => {
						console.log(error);
					})
			},
			befors() {
				let vm = this
				axios.post(hostRooms, //获取编辑社区公寓设置的全部数据
						qs.stringify({
							communityId: this.communityId,
							communityType: 0
						})
					)
					.then((response) => {
						console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							vm.serviceCost = response.data.entity[0].serviceCost;
							vm.waterEnergyPayDate = response.data.entity[0].waterEnergyPayDate;
							if(response.data.entity[0].waterChargeType == 1) {
								vm.radio1 = 1;
								vm.sect = response.data.entity[0].waterPrice;
							} else {
								vm.radio1 = 2;
								vm.sec2 = response.data.entity[0].waterPrice;
							}
							if(response.data.entity[0].energyChargeType == 1) {
								vm.radio2 = 1;
								vm.input1 = response.data.entity[0].waterPrice;
							} else {
								vm.radio2 = 2;
								vm.input2 = response.data.entity[0].waterPrice;
							}
							for(let i = 0; i < response.data.entity[0].cxkjCommunityListConfig.length; i++) {
								vm.checkList.push(response.data.entity[0].cxkjCommunityListConfig[i].systemData.dataName);
							}
							if(this.tableRepairs.length < response.data.entity[0].cxkjCommunityListPayway.length) {
								this.addRepairs();
							}
							for(let i = 0; i < response.data.entity[0].cxkjCommunityListPayway.length; i++) {
								this.tableRepairs[i].checkValue = true;
								this.tableRepairs[i].value1 = response.data.entity[0].cxkjCommunityListPayway[i].systemData.dataName;
								this.tableRepairs[i].date = response.data.entity[0].cxkjCommunityListPayway[i].discount;
							}

							if(this.tableRepairs2.length < response.data.entity[0].cxkjCommunityListMaintain.length) {
								this.addRepairs2();
							}
							for(let i = 0; i < response.data.entity[0].cxkjCommunityListMaintain.length; i++) {
								this.tableRepairs2[i].checkValue = true;
								this.tableRepairs2[i].value2 = response.data.entity[0].cxkjCommunityListMaintain[i].systemData.dataName;
								this.tableRepairs2[i].date = response.data.entity[0].cxkjCommunityListMaintain[i].onSiteTime;
							}

						}
					})
					.catch((error) => {
						console.log(error);
					})
			},
			mus(vul, index) {
				//公寓付款方式
				for(let i = 0; i < this.tableRepairs[index].option1.length; i++) {
					if(vul == this.tableRepairs[index].option1[i].dataName) {
						this.tableRepairs[index].inputValue = this.tableRepairs[index].option1[i].dataId;
						//console.log(this.tableRepairs);
					}
				}

			},
			mvs(val, index) {
				//公寓维修项目
				for(let i = 0; i < this.tableRepairs2[index].option2.length; i++) {
					if(val == this.tableRepairs2[index].option2[i].dataName) {
						this.tableRepairs2[index].inputValue = this.tableRepairs2[index].option2[i].dataId;
						//console.log(this.tableRepairs2);
					}
				}
			},
			mms(list) {
				//公寓配置物品设置
				let vm = this
				console.log(list);
				vm.cxkjCommunityListConfig = [];
				for(let i = 0; i < list.length; i++) {
					vm.cxkjCommunityListConfig.push({
						configDataId: this.option3[this.option3.findIndex(item => item.dataName == list[i])].dataId
					});
				}
				//console.log(vm.cxkjCommunityListConfig);
			},
			mmu(list2) {
				//办公配置物品设置
				let vm = this
				vm.cxkjCommunityListConfig = [];
				for(let i = 0; i < list2.length; i++) {
					vm.cxkjCommunityListConfig.push({
						configDataId: this.option5[this.option5.findIndex(item => item.dataName == list2[i])].dataId
					});
				}
			},
			communit1(val, index) {
				//社区付款方式
				for(let i = 0; i < this.tableRepairs3[index].option6.length; i++) {
					if(val == this.tableRepairs3[index].option6[i].dataName) {
						this.tableRepairs3[index].inputValue = this.tableRepairs3[index].option6[i].dataId;
						console.log(this.tableRepairs3);
					}
				}
			},
			communit2(val, index) {
				for(let i = 0; i < this.tableConferences[index].option4.length; i++) {
					if(val == this.tableConferences[index].option4[i].dataName) {
						this.tableConferences[index].inputValue = this.tableConferences[index].option4[i].dataId;
						//console.log(this.tableConferences);
					}
				}
			},
			communit3(val, index) {
				for(let i = 0; i < this.tableConferences[index].option8.length; i++) {
					if(val == this.tableConferences[index].option8[i].dataName) {
						this.tableConferences[index].inputValue2 = this.tableConferences[index].option8[i].dataId;
						//console.log(this.tableConferences);
					}
				}
			},
			communit4(val, index) {
				for(let i = 0; i < this.tableRepairs5[index].option7.length; i++) {
					if(val == this.tableRepairs5[index].option7[i].dataName) {
						this.tableRepairs5[index].inputValue = this.tableRepairs5[index].option7[i].dataId;
						//console.log(this.tableRepairs5);
					}
				}
			},
			deleteConference(tableRepair) { //删除会议室选项
				this.tableConferences.splice(this.tableConferences.length - 1, 1);
				let index = this.tableConferences.findIndex(item => item == tableRepair);
				this.cxkjCommunityListMeetingSuit.splice(index, 1);
			},
			deleteRepair(tableRepair) { //删除公寓付款方式
				//console.log(tableRepair);
				this.tableRepairs.splice(this.tableRepairs.length - 1, 1);
				let index = this.tableRepairs.findIndex(item => item == tableRepair);
				this.cxkjCommunityListPayway.splice(index, 1);
				//console.log(this.cxkjCommunityListPayway);
			},
			deleteRepair2(tableRepair) { //删除公寓维修项目
				this.tableRepairs2.splice(this.tableRepairs2.length - 1, 1);
				let index = this.tableRepairs2.findIndex(item => item == tableRepair);
				this.cxkjCommunityListMaintain.splice(index, 1);
			},
			deleteRepair3() { //删除社区付款方式
				this.tableRepairs3.splice(this.tableRepairs3.length - 1, 1);
				let index = this.tableRepairs3.findIndex(item => item == tableRepair);
				this.cxkjCommunityListPayway.splice(index, 1);
			},
			deleteRepair5(tableRepair) { //删除社区办公维修项目
				this.tableRepairs5.splice(this.tableRepairs5.length - 1, 1);
				let index = this.tableRepairs5.findIndex(item => item == tableRepair);
				this.cxkjCommunityListPayway.splice(index, 1);
			},
			house() {
				//公寓提交设置信息
				let vm = this
				this.cxkjCommunityListPayway = [];
				this.cxkjCommunityListMaintain = [];
				for(let i = 0; i < vm.tableRepairs.length; i++) {
					if(this.tableRepairs[i].checkValue == true) { //添加公寓付款方式编号
						vm.cxkjCommunityListPayway.push({
							dataId: this.tableRepairs[i].inputValue,
							discount: this.tableRepairs[i].date
						});
						console.log(vm.cxkjCommunityListPayway);
					}
				}
				for(let i = 0; i < vm.tableRepairs2.length; i++) { //添加公寓维修项目编号
					if(this.tableRepairs2[i].checkValue == true) {
						vm.cxkjCommunityListMaintain.push({
							communityMaintainDataId: this.tableRepairs2[i].inputValue,
							onSiteTime: this.tableRepairs2[i].date
						});
						console.log(vm.cxkjCommunityListMaintain);
					}
				}

				if(vm.radio1 == 1) {
					this.waterChargeType = 1;
					vm.waterPrice = vm.sect;
				} else {
					this.waterChargeType = 2;
					vm.waterPrice = vm.sect2;
				}

				if(vm.radio2 == 1) {
					this.energyChargeType = 1;
					vm.energyPrice = vm.input1;

				} else {
					this.energyChargeType = 2;
					vm.energyPrice = vm.input2;
				}
				if(vm.communityId == null || vm.cxkjCommunityListPayway == [] || vm.cxkjCommunityListMaintain == [] || vm.cxkjCommunityListConfig == [] || vm.serviceCost == '' || vm.waterEnergyPayDate == null || vm.waterChargeType == null || vm.waterPrice == null || vm.energyChargeType == null || vm.energyPrice == null) {
					this.warningMessage = '信息填入不完整，都不能为空';
					this.warningModal = true;
				} else {
					axios.post(hostRoom, {
							communityId: vm.communityId,
							cxkjCommunityListPayway: vm.cxkjCommunityListPayway,
							cxkjCommunityListMaintain: vm.cxkjCommunityListMaintain,
							cxkjCommunityListConfig: vm.cxkjCommunityListConfig,
							serviceCost: vm.serviceCost,
							communityType: 0,
							waterEnergyPayDate: vm.waterEnergyPayDate,
							waterChargeType: vm.waterChargeType,
							waterPrice: vm.waterPrice,
							energyChargeType: vm.energyChargeType,
							energyPrice: vm.energyPrice
						})
						.then((response) => {
							//console.log(response);
							if(response.status == 200 && response.data.code == 10000) {
								this.successMessage = '公寓设置成功';
								this.successModal = true;
								setTimeout(() => {
									this.successModal = false;
									if(this.communityType == '0'){
										vm.$router.push('/apartment/communityManagement');
									}
								}, 2000);
							} else {
								this.warningMessage = response.data.content;
								this.warningModal = true;
							}
						})
						.catch((error) => {
							console.log(error);
							this.warningMessage = '公寓设置失败,服务器出现异常';
							this.warningModal = true;
						})
				}

			},
			refer() {
				let vm = this
				this.cxkjCommunityListPayway = [];
				this.cxkjCommunityListMaintain = [];
				for(let i = 0; i < vm.tableRepairs3.length; i++) {
					if(this.tableRepairs3[i].checkValue == true) { //添加办公付款方式编号
						vm.cxkjCommunityListPayway.push({
							dataId: this.tableRepairs3[i].inputValue,
							discount: this.tableRepairs3[i].date
						});
						console.log(vm.cxkjCommunityListPayway);
					}
				}

				for(let i = 0; i < vm.tableConferences.length; i++) {
					if(this.tableConferences[i].checkValue == true) { //添加会议室套餐设置编号
						vm.cxkjCommunityListMeetingSuit.push({
							mettingSuitDataId: this.tableConferences[i].inputValue,
							meetingSuitPrice: this.tableConferences[i].date,
							meetingSuitUnitDataId: this.tableConferences[i].inputValue2
						});
						console.log(vm.cxkjCommunityListMeetingSuit);
					}
				}
				for(let i = 0; i < vm.tableRepairs5.length; i++) { //添加办公维修项目编号
					if(this.tableRepairs5[i].checkValue == true) {
						vm.cxkjCommunityListMaintain.push({
							communityMaintainDataId: this.tableRepairs5[i].inputValue,
							onSiteTime: this.tableRepairs5[i].date
						});
						console.log(vm.cxkjCommunityListMaintain);
					}
				}
				if(vm.communityId == null || vm.cxkjCommunityListPayway == [] || vm.cxkjCommunityListMaintain == [] || vm.cxkjCommunityListConfig == [] || vm.serviceCost2 == '' || vm.cxkjCommunityListMeetingSuit == []) {
					alert('信息填入不完整，不能为空');
				} else {
					console.log(vm.cxkjCommunityListPayway);
					console.log(vm.cxkjCommunityListMaintain);
					console.log(vm.cxkjCommunityListConfig);
					console.log(vm.cxkjCommunityListMeetingSuit);
					console.log(vm.communityId)
					debugger
					axios.post(hostRoom, {
							communityId: vm.communityId,
							cxkjCommunityListPayway: vm.cxkjCommunityListPayway,
							cxkjCommunityListMaintain: vm.cxkjCommunityListMaintain,
							cxkjCommunityListConfig: vm.cxkjCommunityListConfig,
							cxkjCommunityListMeetingSuit: vm.cxkjCommunityListMeetingSuit,
							serviceCost: vm.serviceCost2,
							communityType: 1
						})
						.then((response) => {
							//console.log(response);
							let code = parseInt(response.data.code)
							if(code == 10000) {
								this.successMessage = '办公设置成功';
								this.successModal = true;
								setTimeout(() => {
									this.successModal = false;
									if(this.communityType == '0' || this.communityType == '0,1'){
										vm.$router.push('/apartment/communityManagement');
									}
								}, 2000);
							} else {
								this.warningMessage = response.data.content;
								this.warningModal = true;
							}
						})
						.catch((error) => {
							console.log(error);
							this.warningMessage = '办公设置失败,服务器出现异常';
							this.warningModal = true;
						})
				}
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
	@import "../../sass/page/communitySettings.scss";
</style>