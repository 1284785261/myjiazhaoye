<template>
	<div>
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置：</span>
					<router-link class="active" to="/apartment/communityManagement">社区管理</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>社区设置</h3>
					<span>{{Name}}</span>
				</div>
				<div id="communitySettingwrap">
					<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
						<el-tab-pane label="公寓设置" name="first" v-if="Type1">
							<div class="vue-warp-settings">
                                <div class="ivu-floor floor01">
                                    <div class="floor-main">
                                        <span class="fl"><span class="btxs">*</span>租期折扣：</span>
                                        <div class="floor-item">
                                            <table class="table ivu-table">
                                                <tr v-for="(tableRepair,index) in leaseDiscount">
                                                    <td style="width:30px;"><label><span class="myRadio"><input type="checkbox" name="radio" v-model="tableRepair.checkValue"><i class="icon icon-radio"></i></span></label></td>
                                                    <td style="width: 185px;">
                                                        <input class="ivu-input" v-model="tableRepair.option1.dataName" style="width:168px;">
                                                        <!-- <el-select v-model="tableRepair.value1" placeholder="请选择付款方式" @change="mus(tableRepair.value1,index)">
                                                            <el-option v-for="item in tableRepair.option1" :key="item.dataName" :value="item.dataName">
                                                            </el-option>
                                                        </el-select> -->
                                                    </td>

                                                    <td style="width: 180px;"><input class="ivu-input" v-model="tableRepair.date" placeholder="租金折扣/浮动比例" style="width: 140px" maxlength="5" @blur="lease(tableRepair.date,index)"><span class="baifen">%</span></td>
                                                    <td>
                                                        <!-- <button class="btn_bar" @click="deleteRepair(tableRepair,index)">{{tableRepair.deletect}}</button> -->
                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- <div class="add-formItem">
                                                <Button @click="addRepairs"><Icon type="plus"></Icon>继续添加</Button>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
								<div class="ivu-floor floor01">
									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>付款方式设置：</span>
										<div class="floor-item">
											<table class="table ivu-table">
												<tr v-for="(tableRepair,index) in tableRepairs">
													<td style="width:30px;"><label><span class="myRadio"><input type="checkbox" name="radio" v-model="tableRepair.checkValue"><i class="icon icon-radio"></i></span></label></td>
													<td style="width: 185px;">
														<input class="ivu-input" v-model="tableRepair.option1.dataName" style="width:168px;">
														<!-- <el-select v-model="tableRepair.value1" placeholder="请选择付款方式" @change="mus(tableRepair.value1,index)">
															<el-option v-for="item in tableRepair.option1" :key="item.dataName" :value="item.dataName">
															</el-option>
														</el-select> -->
													</td>

													<td style="width: 180px;"><input class="ivu-input" v-model="tableRepair.date" placeholder="租金折扣/浮动比例" style="width: 140px" maxlength="5" @blur="yanzhens(tableRepair.date,index)"><span class="baifen">%</span></td>
													<td>
														<!-- <button class="btn_bar" @click="deleteRepair(tableRepair,index)">{{tableRepair.deletect}}</button> -->
													</td>
												</tr>
											</table>
											<!-- <div class="add-formItem">
												<Button @click="addRepairs"><Icon type="plus"></Icon>继续添加</Button>
											</div> -->
										</div>
									</div>
								</div>
								<div class="ivu-floor floor03">
									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>维修项目设置：</span>
										<div class="floor-item">
											<table class="table ivu-table">
												<tr v-for="(tableRepair,index) in tableRepairs2">
													<td style="width:40px;"><label><span class="myRadio"><input type="checkbox" name="radio" v-model="tableRepair.checkValue"><i class="icon icon-radio"></i></span></label></td>
													<td style="width: 298px;">
														<input class="ivu-input" v-model="tableRepair.option2.dataName" placeholder="请输入内容">
														<!-- <el-select v-model="tableRepair.value2" placeholder="请选择维修项目" @change="mvs(tableRepair.value2,index)">
															<el-option v-for="item in tableRepair.option2" :key="item.dataName" :value="item.dataName">
															</el-option>
														</el-select> -->
													</td>
													<td style="width: 185px;"><span class="text-default">{{tableRepair.element}}</span></td>
													<td style="width: 185px;"><input class="ivu-input" v-model="tableRepair.date" placeholder="24小时内" style="width: 120px" maxlength="5" @blur="hours(tableRepair.date,index)">小时</td>
													<td style="width: 185px;">
														<!-- <button class="btn_bar" @click="deleteRepair2(tableRepair,index)">{{tableRepair.deletect}}</button> -->
													</td>
												</tr>
											</table>
											<!-- <div class="add-formItem">
												<Button @click="addRepairs2"><Icon type="plus"></Icon>继续添加</Button>
											</div> -->
										</div>
									</div>
								</div>

								<div class="ivu-floor floor02">
									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>家具/家电：</span>
										<div class="floor-item form-item">
											<el-checkbox-group v-model="checkList">
												<el-checkbox v-for="item in option3" :label=item.dataName style="margin-left:0px;margin-right:15px;"></el-checkbox>
											</el-checkbox-group>
										</div>
									</div>
									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>押金：</span>
										<div class="floor-item form-item" style="padding-top:2px;">
											<span class="item-date"><input type="text" placeholder="请输入押金月数" v-model="deposit" maxlength="10">月 </span>
										</div>
									</div>
									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>服务费设置：</span>
										<div class="floor-item form-item" style="padding-top:2px;">
											<span class="item-date"><input type="text" placeholder="请输入服务费" v-model="serviceCost" maxlength="10">元/月 </span>
										</div>
									</div>
									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>水电账单日设置：</span>
										<div class="floor-item">
											<Date-picker type="date" format="dd" placeholder="选择日期" v-model="waterEnergyPayDate" style="margin-top: 10px;"></Date-picker>
											<span class="ivu-yellow"><i class="ivu-icon ivu-icon-information-circled"></i>每月提醒管家收取水费、电费、服务费的日期</span>
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
											<input class="inputs" type="text" v-model="sect" placeholder="请填写金额" maxlength="10"><span>元/立方米</span><br>
											<input class="inputs inputs2" type="text" v-model="sect2" placeholder="请填写金额" maxlength="10"><span>元/人</span>
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
											<input class="inputs" type="text" v-model="input1" placeholder="请填写金额" maxlength="10"><span>元/度</span><br>
											<input class="inputs inputs2" type="text" v-model="input2" placeholder="请填写金额" maxlength="10"><span>元/人</span>
										</div>
									</div>
								</div>
								<div class="operation-box">
									<Button type="primary" @click="house()" :disabled="disabled" v-if="jurisdiction('COMMUNITY_UPDATE')">确定</Button>
									<Button @click="gos">取消</Button>
								</div>
							</div>
						</el-tab-pane>
						<el-tab-pane label="办公设置" name="second" v-if="Type2">

							<div class="vue-warp-settings">
								<div class="ivu-floor floor01">
                                    <div class="floor-main">
                                        <span class="fl"><span class="btxs">*</span>租期折扣：</span>
                                        <div class="floor-item">
                                            <table class="table ivu-table">
                                                <tr v-for="(tableRepair,index) in officesDiscount">
                                                    <td style="width:30px;"><label><span class="myRadio"><input type="checkbox" name="radio" v-model="tableRepair.checkValue"><i class="icon icon-radio"></i></span></label></td>
                                                    <td style="width: 185px;">
                                                        <input class="ivu-input" v-model="tableRepair.option1.dataName" style="width:168px;">
                                                        <!-- <el-select v-model="tableRepair.value1" placeholder="请选择付款方式" @change="mus(tableRepair.value1,index)">
                                                            <el-option v-for="item in tableRepair.option1" :key="item.dataName" :value="item.dataName">
                                                            </el-option>
                                                        </el-select> -->
                                                    </td>

                                                    <td style="width: 180px;"><input class="ivu-input" v-model="tableRepair.date" placeholder="租金折扣/浮动比例" style="width: 140px" maxlength="5" @blur="lease(tableRepair.date,index)"><span class="baifen">%</span></td>
                                                    <td>
                                                        <!-- <button class="btn_bar" @click="deleteRepair(tableRepair,index)">{{tableRepair.deletect}}</button> -->
                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- <div class="add-formItem">
                                                <Button @click="addRepairs"><Icon type="plus"></Icon>继续添加</Button>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
								<div class="ivu-floor floor01">
									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>付款方式设置：</span>
										<div class="floor-item">
											<table class="table ivu-table">
												<tr v-for="(tableRepair,index) in tableRepairs3">
													<td style="width:30px;"><label><span class="myRadio"><input type="checkbox" name="radio" v-model="tableRepair.checkValue"><i class="icon icon-radio"></i></span></label></td>
													<td style="width: 185px;">
														<input class="ivu-input" v-model="tableRepair.option1.dataName" style="width:168px;">
														<!-- <el-select v-model="tableRepair.value6" placeholder="请选择付款方式" @change="communit1(tableRepair.value6,index)">
															<el-option v-for="item in tableRepair.option6" :key="item.dataName" :value="item.dataName">
															</el-option>
														</el-select> -->
													</td>

													<td style="width: 180px;"><input class="ivu-input" v-model="tableRepair.date" placeholder="租金折扣/浮动比例" style="width: 140px" maxlength="5" @blur="moins(tableRepair.date,index)"><span class="baifen">%</span></td>
													<td>
														<!-- <button class="btn_bar" @click="deleteRepair3(tableRepair,index)">{{tableRepair.deletect}}</button> -->
													</td>
												</tr>
											</table>
											<!-- <div class="add-formItem">
												<Button @click="addRepairs3"><Icon type="plus"></Icon>继续添加</Button>
											</div>  -->
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
														<input class="ivu-input" v-model="tableRepair.option4[index].dataName" placeholder="请输入内容">
														<!-- <el-select v-model="tableRepair.value4" placeholder="请选择套餐名称" style="width: 160px" @change="communit2(tableRepair.value4,index)">
															<el-option v-for="item in tableRepair.option4" :key="item.dataName" :value="item.dataName">
															</el-option>
														</el-select> -->
													</td>
													<td><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入金额" style="width: 120px" maxlength="5" @blur="moins2(tableRepair.date,index)"><span class="baifen2">元/</span></td>
													<td>
														<el-select v-model="tableRepair.value8" placeholder="请选择次数" style="width: 140px" class="tbs" @change="communit3(tableRepair.value8,index)">
															<el-option v-for="item in tableRepair.option8" :key="item.dataName" :value="item.dataName">
															</el-option>
														</el-select>
													</td>
													<td width="50px">
														<!-- <button class="btn_bar" @click="deleteConference(tableRepair,index)">{{tableRepair.deletect}}</button>	 -->
													</td>
												</tr>
											</table>
											<!-- <div class="add-formItem">
												<Button @click="addRoom"><Icon type="plus"></Icon>继续添加</Button>
											</div> -->
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
														<input class="ivu-input" v-model="tableRepair.option7.dataName" placeholder="请输入内容">
														<!-- <el-select v-model="tableRepair.value7" placeholder="请选择维修项目" @change="communit4(tableRepair.value7,index)">
															<el-option v-for="item in tableRepair.option7" :key="item.dataName" :value="item.dataName">
															</el-option>
														</el-select> -->
													</td>
													<td><span class="text-default">{{tableRepair.element}}</span></td>
													<td><input class="ivu-input" v-model="tableRepair.date" placeholder="24小时内" style="width: 120px" maxlength="5" @blur="moins3(tableRepair.date,index)">小时</td>
													<td width="90px">
														<!-- <button class="btn_bar" @click="deleteRepair5(tableRepair,index)">{{tableRepair.deletect}}</button> -->
													</td>
												</tr>
											</table>
											<!-- <div class="add-formItem">
												<Button @click="addRepairs5"><Icon type="plus"></Icon>继续添加</Button>
											</div> -->
										</div>
									</div>
								</div>
								<div class="ivu-floor floor02">
									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>押金：</span>
										<div class="floor-item form-item" style="padding-top:2px;">
											<span class="item-date"><input type="text" placeholder="请输入押金月数" v-model="deposit2" maxlength="10">月 </span>
										</div>
									</div>
									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>服务费设置：</span>
										<div class="floor-item form-item" style="padding-top:2px;">
											<span class="item-date"><input type="text" placeholder="请输入服务费" v-model="serviceCost2" maxlength="10">元/月 </span>
										</div>
									</div>

									<div class="floor-main">
										<span class="fl"><span class="btxs">*</span>办公物资：</span>
										<div class="floor-item form-item">
											<el-checkbox-group v-model="checkList2">
												<el-checkbox v-for="item in option5" :label='item.dataName'></el-checkbox>
											</el-checkbox-group>
										</div>
									</div>
								</div>
								<div class="operation-box">
									<Button type="primary" @click="refer()" :disabled="disabled2" v-if="jurisdiction('COMMUNITY_UPDATE')">确定</Button>
									<Button @click="gos">取消</Button>
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
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import { hostWay, hostRoom, hostRooms,CommunitySytem200226 } from '../api.js';
	import axios from 'axios';
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
				radio1: 1,
				radio2: 1,
				checkList: [],
				checkList2: [],
				tableConferences: [{ //会议室套餐数据
					checkValue: "",
					inputValue: "",
					inputValue2: "",
					communityMeetingSuitId: null,
					numValue: "",
					element: "元/",
					option4: [],
					value4: '',
					deletect: "删除",
					option8: [],
					value8: '',
					date: "",
				},{
					checkValue: "",
					inputValue: "",
					inputValue2: "",
					communityMeetingSuitId: null,
					numValue: "",
					element: "元/",
					option4: [],
					value4: '',
					deletect: "删除",
					option8: [],
					value8: '',
					date: "",
				}],
				option3: [],
				value3: '',
				option5: [],
				value5: '',
				deletect: "删除",
				tableRepairs: [{ //公寓付款方式
					checkValue: false,
					inputValue: "",
					date: "",
					communityPayWayId: null,
					deletect: "删除",
					option1:{
						dataName: '月付',
						dataId: 1
					},
					value1: ''
				},{
					checkValue: false,
					inputValue: "",
					date: "",
					communityPayWayId: null,
					deletect: "删除",
					option1:{
						dataName: '季付',
						dataId: 2
					},
					value1: ''
				},{
					checkValue: false,
					inputValue: "",
					date: "",
					communityPayWayId: null,
					deletect: "删除",
					option1:{
						dataName: '半年付',
						dataId: 3
					},
					value1: ''
				},{
					checkValue: false,
					inputValue: "",
					date: "",
					communityPayWayId: null,
					deletect: "删除",
					option1:{
						dataName: '年付',
						dataId: 4
					},
					value1: ''
				}],
				tableRepairs3: [{ //办公付款方式
					checkValue: false,
					inputValue: "",
					date: "",
					communityPayWayId: null,
					deletect: "删除",
					option1:{
						dataName: '月付',
						dataId: 1
					},
					value1: ''
				},{
					checkValue: false,
					inputValue: "",
					date: "",
					communityPayWayId: null,
					deletect: "删除",
					option1:{
						dataName: '季付',
						dataId: 2
					},
					value1: ''
				},{
					checkValue: false,
					inputValue: "",
					date: "",
					communityPayWayId: null,
					deletect: "删除",
					option1:{
						dataName: '半年付',
						dataId: 3
					},
					value1: ''
				},{
					checkValue: false,
					inputValue: "",
					date: "",
					communityPayWayId: null,
					deletect: "删除",
					option1:{
						dataName: '年付',
						dataId: 4
					},
					value1: ''
				}],
				//公寓租期折扣
				leaseDiscount: [{
					checkValue: false,
					date: "",
					option1:{
					dataName: '1个月',
					dataId: 1
					}
				},{
					checkValue: false,
					date: "",
					option1:{
					dataName: '3个月',
					dataId: 2
					}
				},{
					checkValue: false,
					date: "",
					option1:{
					dataName: '六个月',
					dataId: 3
					}
				},{
					checkValue: false,
					date: "",
					option1:{
					dataName: '一年',
					dataId: 4
					}
				}],
				//办公租期折扣
				officesDiscount: [{
					checkValue: false,
					date: "",
					option1:{
					dataName: '1个月',
					dataId: 1
					}
				},{
					checkValue: false,
					date: "",
					option1:{
					dataName: '3个月',
					dataId: 2
					}
				},{
					checkValue: false,
					date: "",
					option1:{
					dataName: '六个月',
					dataId: 3
					}
				},{
					checkValue: false,
					date: "",
					option1:{
					dataName: '一年',
					dataId: 4
					}
				}],
			    //公寓维修服务
				tableRepairs2: [],
				//办公区维修项目设置
				tableRepairs5: [],
				activeName2: 'first',
				cxkjCommunityListPayway: [], //公寓付款方式
				cxkjCommunityListPayway2:[],//办公付款方式
				cxkjCommunityListMaintain: [], //公寓维修项目
				cxkjCommunityListMaintain2: [], //办公维修项目
				cxkjCommunityListMeetingSuit: [], //会议室套餐设置
				deposit:'',
				serviceCost: '', //公寓服务费
				serviceCost2: '',
				deposit2:'',
				waterEnergyPayDate: '', //公寓水电账单日设置
				sect: null, //公寓水费用量1
				sect2: null, //公寓水费用量2
				input1: null, //公寓电费用量1
				input2: null, //公寓电费用量1
				waterChargeType: null, //公寓水费类型
				energyChargeType: null, //公寓电费类型
				waterPrice: '', //公寓水费
				energyPrice: '', //公寓电费
				communityId: null, //社区ID
				communityType: '',
				successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
				Type1: true,
				Type2: true,
				Name: '',
				disabled: false,
				disabled2: false
			}
		},
		mounted() {
			this.communityId = this.$route.query.id;
			this.communityType = this.$route.query.type;
			this.Name = this.$route.query.Name;
			let arr = this.communityType.split(',');
			// console.log(arr);
			this.seting();
			this.seting2();
			this.befors();
			this.compile();
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

		},
		watch: {
			serviceCost: function() {
				this.serviceCost = this.serviceCost.replace(/[^\d.]/, '');
			},
			serviceCost2: function() {
				this.serviceCost2 = this.serviceCost2.replace(/[^\d.]/, '');
			},
			sect: function() {
				this.sect = this.sect.replace(/[^\d.]/, '');
			},
			sect2: function() {
				this.sect2 = this.sect2.replace(/[^\d.]/, '');
			},
			input1: function() {
				this.input1 = this.input1.replace(/[^\d.]/, '');
			},
			input2: function() {
				this.input2 = this.input2.replace(/[^\d.]/, '');
			}
		},
		methods: {
			gos(){
		    	this.$router.go(-1);
		    },
		    yanzhens(value,index){
		    	let str = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
		    	if(str.test(value) == true){
		    		this.tableRepairs[index].date = value;
		    	}
		    	else{
		    		this.tableRepairs[index].date = '';
		    	}
			},
			lease(value,index){
		    	let str = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
		    	if(str.test(value) == true){
		    		this.leaseDiscount[index].date = value;
		    	}
		    	else{
		    		this.leaseDiscount[index].date = '';
		    	}
			},
		    hours(value,index){
		    	let str = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
		    	if(str.test(value) == true){
		    		this.tableRepairs2[index].date = value;
		    	}
		    	else{
		    		this.tableRepairs2[index].date = '';
		    	}
		    },
		    moins(value,index){
		    	let str = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
		    	if(str.test(value) == true){
		    		this.tableRepairs3[index].date = value;
		    	}
		    	else{
		    		this.tableRepairs3[index].date = '';
		    	}
		    },
		    moins2(value,index){
		    	// console.log(value);
		    	// console.log(index);
		    	let str = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
		    	if(str.test(value) == true){
		    		this.tableConferences[index].date = value;
		    	}
		    	else{
		    		this.tableConferences[index].date = '';
		    	}
		    },
		    moins3(value,index){
		    	let str = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
		    	if(str.test(value) == true){
		    		this.tableRepairs5[index].date = value;
		    	}
		    	else{
		    		this.tableRepairs5[index].date = '';
		    	}
		    },
			befors() {
				let vm = this
				this.cxkjCommunityListPayway = [];
				this.cxkjCommunityListMaintain = [];
				axios.post(hostRooms, //获取编辑社区公寓设置的全部数据
						qs.stringify({
							communityId: vm.communityId,
							communityType: 0
						})
					)
					.then((response) => {
						console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							if(response.data.entity[0]) {
								if(response.data.entity[0].serviceCost) {
									vm.serviceCost = response.data.entity[0].serviceCost;
								}
								if(response.data.entity[0].deposit){
									vm.deposit = response.data.entity[0].deposit;
								}
								if(response.data.entity[0].waterEnergyPayDate) {
									vm.waterEnergyPayDate = response.data.entity[0].waterEnergyPayDate;
								}

								if(response.data.entity[0].waterChargeType == 1) {
									vm.radio1 = 1;
									vm.sect = response.data.entity[0].waterPrice;
								} else {
									vm.radio1 = 2;
									vm.sect2 = response.data.entity[0].waterPrice;
								}
								if(response.data.entity[0].energyChargeType == 1) {
									vm.radio2 = 1;
									vm.input1 = response.data.entity[0].energyPrice;
								} else {
									vm.radio2 = 2;
									vm.input2 = response.data.entity[0].energyPrice;
								}

								for(let i = 0; i < response.data.entity[0].cxkjCommunityListConfig.length; i++) { //公寓家电集合
									vm.checkList.push(response.data.entity[0].cxkjCommunityListConfig[i].systemData.dataName);
								}
								for(let i = 0; i< vm.leaseDiscount.length;i++){
									for(let m = 0; m < response.data.entity[0].cxkjCommunityListLeasePayway.length; m++) { //公寓折扣方式集合
										if(vm.leaseDiscount[i].option1.dataId == response.data.entity[0].cxkjCommunityListLeasePayway[m].dataId){
											vm.leaseDiscount[i].checkValue = true;
											vm.leaseDiscount[i].date = response.data.entity[0].cxkjCommunityListLeasePayway[m].discount;
										}
									}
								}
								for(let i = 0; i < vm.tableRepairs.length;i++){
									for(let m = 0; m < response.data.entity[0].cxkjCommunityListPayway.length; m++) { //公寓支付方式集合
										if(vm.tableRepairs[i].option1.dataId == response.data.entity[0].cxkjCommunityListPayway[m].dataId){
											vm.tableRepairs[i].checkValue = true;
											vm.tableRepairs[i].date = response.data.entity[0].cxkjCommunityListPayway[m].discount;
											vm.tableRepairs[i].communityPayWayId = response.data.entity[0].cxkjCommunityListPayway[m].communityPayWayId;
										}

									}
								}
								// console.log(this.tableRepairs);

								for(let i = 0; i < this.tableRepairs2.length;i++){        //公寓维修项目
									for(let m = 0; m < response.data.entity[0].cxkjCommunityListMaintain.length; m++) {
										if(this.tableRepairs2[i].option2.dataName == response.data.entity[0].cxkjCommunityListMaintain[m].systemData.dataName){
											this.tableRepairs2[i].checkValue = true;
											this.tableRepairs2[i].date = response.data.entity[0].cxkjCommunityListMaintain[m].onSiteTime;
											this.tableRepairs2[i].communityMaintainId = response.data.entity[0].cxkjCommunityListMaintain[m].communityMaintainId;
										}
									}
								}
								// console.log(this.tableRepairs2);
							}
						}
					})
					.catch((error) => {
						// console.log(error);
					})
			},
			compile() {
				let vm = this
				this.cxkjCommunityListPayway = [];
				this.cxkjCommunityListMaintain = [];
				axios.post(hostRooms, //获取编辑社区办公设置的全部数据
						qs.stringify({
							communityId: vm.communityId,
							communityType: 1
						})
					)
					.then((response) => {
						// console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							if(response.data.entity[0]) {
								if(response.data.entity[0].serviceCost) {
									vm.serviceCost2 = response.data.entity[0].serviceCost;
								}
								if(response.data.entity[0].deposit){
									vm.deposit2 = response.data.entity[0].deposit;
								}
								for(let i = 0; i < response.data.entity[0].cxkjCommunityListConfig.length; i++) { //办公物资集合
									vm.checkList2.push(response.data.entity[0].cxkjCommunityListConfig[i].systemData.dataName);
								}
								for(let i = 0; i < vm.tableRepairs3.length;i++){     //办公支付方式集合
									for(let m = 0; m < response.data.entity[0].cxkjCommunityListPayway.length; m++) {
										if(vm.tableRepairs3[i].option1.dataId == response.data.entity[0].cxkjCommunityListPayway[m].dataId){
											vm.tableRepairs3[i].checkValue = true;
											vm.tableRepairs3[i].date = response.data.entity[0].cxkjCommunityListPayway[m].discount;
											vm.tableRepairs3[i].communityPayWayId = response.data.entity[0].cxkjCommunityListPayway[m].communityPayWayId;
										}

									}
								}
								for(let i = 0; i< vm.officesDiscount.length;i++){
									for(let m = 0; m < response.data.entity[0].cxkjCommunityListLeasePayway.length; m++) { //办公折扣方式集合
										if(vm.officesDiscount[i].option1.dataId == response.data.entity[0].cxkjCommunityListLeasePayway[m].dataId){
											vm.officesDiscount[i].checkValue = true;
											vm.officesDiscount[i].date = response.data.entity[0].cxkjCommunityListLeasePayway[m].discount;
										}
									}
								}
								for(let i = 0; i < vm.tableConferences.length;i++){//办公套餐集合
									for(let m = 0; m < response.data.entity[0].cxkjCommunityListMeetingSuit.length; m++) {
										if(vm.tableConferences[i].option4[i].dataName == response.data.entity[0].cxkjCommunityListMeetingSuit[m].mettingSuitSystemData.dataName){
											vm.tableConferences[i].checkValue = true;
											vm.tableConferences[i].value8 = response.data.entity[0].cxkjCommunityListMeetingSuit[m].meetingSuitUnitSystemData.dataName;
											vm.tableConferences[i].date = response.data.entity[0].cxkjCommunityListMeetingSuit[m].meetingSuitPrice;
											vm.tableConferences[i].communityMeetingSuitId = response.data.entity[0].cxkjCommunityListMeetingSuit[m].communityMeetingSuitId;
										}
									}
								}
								// console.log(this.tableConferences);
								for(let i = 0; i < vm.tableRepairs5.length;i++){        //办公维修项目
									for(let m = 0; m < response.data.entity[0].cxkjCommunityListMaintain.length; m++) {
										if(vm.tableRepairs5[i].option7.dataName == response.data.entity[0].cxkjCommunityListMaintain[m].systemData.dataName){
											vm.tableRepairs5[i].checkValue = true;
											vm.tableRepairs5[i].date = response.data.entity[0].cxkjCommunityListMaintain[m].onSiteTime;
											vm.tableRepairs5[i].communityMaintainId = response.data.entity[0].cxkjCommunityListMaintain[m].communityMaintainId;
										}
									}
								}
								// console.log(this.tableRepairs5);
							}

						}
					})
					.catch((error) => {
						// console.log(error);
					})
			},
			handleClick(tab, event) {
				this.cxkjCommunityListPayway = []; //公寓付款方式
				this.cxkjCommunityListMaintain= []; //公寓维修项目
				this.cxkjCommunityListMeetingSuit= []; //会议室套餐设置
			},
			closeWarningModal() {
				this.warningModal = false;
			},
			// addRoom() { //添加会议室套餐类别
			// 	this.tableConferences.push({
			// 		checkValue: "",
			// 		inputValue: "",
			// 		inputValue2: "",
			// 		communityMeetingSuitId: null,
			// 		numValue: "",
			// 		element: "元/",
			// 		deletect: "删除",
			// 		option4: [],
			// 		value4: '',
			// 		option8: [],
			// 		value8: '',
			// 		date: "",
			// 	})
			// 	this.seting();
			// 	this.seting2();
			// },
			// addRepairs() { //添加公寓付款方式设置
			// 	this.tableRepairs.push({
			// 		checkValue: false,
			// 		inputValue: "",
			// 		date: "",
			// 		communityPayWayId: null,
			// 		deletect: "删除",
			// 		option1: [{
			// 			dataName: '押二付一',
			// 			dataId: 1
			// 		}, {
			// 			dataName: '押一付一',
			// 			dataId: 2
			// 		}, {
			// 			dataName: '季付',
			// 			dataId: 3
			// 		}, {
			// 			dataName: '年付',
			// 			dataId: 4
			// 		}],
			// 		value1: ''
			// 	})
			// 	this.seting();
			// },
			addRepairs2() { //添加公寓维修项目
				this.tableRepairs2.push({
					checkValue: "",
					inputValue: "",
					element: "预计上门时间：",
					date: "",
					communityMaintainId: null,
					deletect: "删除",
					option2: [],
					value2: ''
				})
			},
			// addRepairs3() { //添加办公付款方式
			// 	this.tableRepairs3.push({
			// 		checkValue: "",
			// 		inputValue: "",
			// 		date: "",
			// 		communityPayWayId: null,
			// 		deletect: "删除",
			// 		option6: [{
			// 			dataName: '押二付一',
			// 			dataId: 1
			// 		}, {
			// 			dataName: '押一付一',
			// 			dataId: 2
			// 		}, {
			// 			dataName: '季付',
			// 			dataId: 3
			// 		}, {
			// 			dataName: '年付',
			// 			dataId: 4
			// 		}],
			// 		value6: ''
			// 	})
			// 	this.seting();
			// },
			addRepairs5() {
				this.tableRepairs5.push({ //添加办公维修项目
					checkValue: "",
					inputValue: "",
					element: "预计上门时间：",
					date: "",
					communityMaintainId: null,
					deletect: "删除",
					option7: [],
					value7: ''
				})
			},
			seting() {
				let vm = this //获取付款方式以及维修项目的数据
				axios.post(CommunitySytem200226,
						qs.stringify({
							dataCode:'repair',
							dataKey: '0'
						})
					).then((response) => {
						let arr = response.data.entity;
						for(let i = 0; i < arr.length; i++) {
							vm.addRepairs2();
						}
						for(let i = 0; i < arr.length; i++) {
							vm.tableRepairs2[i].option2 = {dataId:arr[i].dataId,dataName:arr[i].dataName};
						}
				})
				axios.post(CommunitySytem200226,
						qs.stringify({
							dataCode:'repair',
							dataKey: '1'
						})
					).then((response) => {
						let arr = response.data.entity;
						for(let i = 0; i < arr.length; i++) {
							vm.addRepairs5();
						}
						for(let i = 0; i < arr.length; i++) {
							vm.tableRepairs5[i].option7 = {dataId:arr[i].dataId,dataName:arr[i].dataName};
						}

				})
				axios.post(hostWay,
						qs.stringify({
							parentId: 40
						})
					).then((response) => {
						for(let i = 0; i < vm.tableConferences.length; i++) {
							vm.tableConferences[i].option8 = response.data.entity;
							// console.log(vm.tableConferences[i].option8);
						}
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
					})
					.catch((error) => {
						// console.log(error);
					})
				axios.post(hostWay,
						qs.stringify({
							parentId: 26
						})
					).then((response) => {
						for(let i = 0; i < vm.tableConferences.length; i++) {
							vm.tableConferences[i].option4 = response.data.entity;
							// console.log(vm.tableConferences[i].option4);
						}
					})
					.catch((error) => {
						// console.log(error);
					})
				axios.post(hostWay,
						qs.stringify({
							parentId: 29
						})
					).then((response) => {
						vm.option5 = response.data.entity;
					})
					.catch((error) => {
						// console.log(error);
					})
			},

			/* mus(vul, index) {
				//公寓付款方式
				console.log(vul);
				for(let i = 0; i < this.tableRepairs[index].option1.length; i++) {
					if(vul == this.tableRepairs[index].option1[i].dataName) {
						this.tableRepairs[index].inputValue = this.tableRepairs[index].option1[i].dataId;

					}
				}
				console.log(this.tableRepairs);
			},
			mvs(val, index) {
				//公寓维修项目
				for(let i = 0; i < this.tableRepairs2[index].option2.length; i++) {
					if(val == this.tableRepairs2[index].option2[i].dataName) {
						this.tableRepairs2[index].inputValue = this.tableRepairs2[index].option2[i].dataId;

					}
				}
				console.log(this.tableRepairs2);
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
						console.log(this.tableConferences);
					}
				}
			}, */
			communit3(val, index) {
				for(let i = 0; i < this.tableConferences[index].option8.length; i++) {
					if(val == this.tableConferences[index].option8[i].dataName) {
						this.tableConferences[index].inputValue2 = this.tableConferences[index].option8[i].dataId;
						// console.log(this.tableConferences);
					}
				}
			},
			/* communit4(val, index) {
				for(let i = 0; i < this.tableRepairs5[index].option7.length; i++) {
					if(val == this.tableRepairs5[index].option7[i].dataName) {
						this.tableRepairs5[index].inputValue = this.tableRepairs5[index].option7[i].dataId;
						console.log(this.tableRepairs5);
					}
				}
			},
			deleteConference(tableRepair, index) { //删除会议室选项
				this.tableConferences.splice(index, 1);
				let index2 = this.tableConferences.findIndex(item => item == tableRepair);
				this.cxkjCommunityListMeetingSuit.splice(index2, 1);
			},
			deleteRepair(tableRepair, index) { //删除公寓付款方式
				console.log(tableRepair);
				this.tableRepairs.splice(index, 1);
				let index2 = this.tableRepairs.findIndex(item => item == tableRepair);
				this.cxkjCommunityListPayway.splice(index2, 1);
				console.log(this.cxkjCommunityListPayway);
			},
			deleteRepair2(tableRepair, index) { //删除公寓维修项目
				this.tableRepairs2.splice(index, 1);
				let index2 = this.tableRepairs2.findIndex(item => item == tableRepair);
				this.cxkjCommunityListMaintain.splice(index2, 1);
			},
			deleteRepair3(tableRepair, index) { //删除社区付款方式
				this.tableRepairs3.splice(index, 1);
				let index2 = this.tableRepairs3.findIndex(item => item == tableRepair);
				this.cxkjCommunityListPayway2.splice(index2, 1);
			},
			deleteRepair5(tableRepair, index) { //删除社区办公维修项目
				this.tableRepairs5.splice(index, 1);
				let index2 = this.tableRepairs5.findIndex(item => item == tableRepair);
				this.cxkjCommunityListPayway2.splice(index2, 1);
			}, */
			//公寓提交设置信息
			house() {
				let vm = this
				this.disabled = false;
				this.cxkjCommunityListPayway = [];
				this.cxkjCommunityListMaintain = [];
				let cxkjCommunityListConfig = [];
				let cxkjCommunityListLeasePayway = [];

				for(let i = 0;i< vm.leaseDiscount.length;i++){
					if(this.leaseDiscount[i].checkValue == true){
						cxkjCommunityListLeasePayway.push({
							dataId:this.leaseDiscount[i].option1.dataId,
							discount:this.leaseDiscount[i].date
						})
					}
				}
				console.log(this.leaseDiscount);
				console.log(cxkjCommunityListLeasePayway);
				for(let i = 0; i < vm.tableRepairs.length; i++) {
					if(this.tableRepairs[i].checkValue == true) { //添加公寓付款方式编号
						vm.cxkjCommunityListPayway.push({
							dataId: i+1,
							discount: this.tableRepairs[i].date,
							communityPayWayId: this.tableRepairs[i].communityPayWayId
						});

					}
				}
				for(let i = 0; i < vm.tableRepairs2.length; i++) { //添加公寓维修项目编号
					if(this.tableRepairs2[i].checkValue == true) {
						vm.cxkjCommunityListMaintain.push({
							communityMaintainDataId: this.tableRepairs2[i].option2.dataId,
							onSiteTime: this.tableRepairs2[i].date,
							communityMaintainId: this.tableRepairs2[i].communityMaintainId
						});

					}
				}
				for(let i = 0; i < vm.checkList.length; i++) {
					cxkjCommunityListConfig.push({
						configDataId: this.option3[this.option3.findIndex(item => item.dataName == vm.checkList[i])].dataId
					});
				}
				// console.log(vm.cxkjCommunityListPayway);
				// console.log(vm.cxkjCommunityListMaintain);
				if(vm.radio1 == 1) {
					this.waterChargeType = 1;
					vm.waterPrice = vm.sect;
				} else if(vm.radio1 == 2) {
					this.waterChargeType = 2;
					vm.waterPrice = vm.sect2;
				}

				if(vm.radio2 == 1) {
					this.energyChargeType = 1;
					vm.energyPrice = vm.input1;

				} else if(vm.radio2 == 2) {
					this.energyChargeType = 2;
					vm.energyPrice = vm.input2;
				}
				if(this.waterEnergyPayDate) {
					this.waterEnergyPayDate = new Date(this.waterEnergyPayDate).Format('yyyy-MM-dd');
				}
				// console.log(this.cxkjCommunityListPayway);
				// console.log(this.cxkjCommunityListMaintain);
				console.log(cxkjCommunityListConfig);
				// console.log(this.serviceCost);
				// console.log(this.waterEnergyPayDate);
				// console.log(this.waterChargeType);
				// console.log(this.waterPrice);
				// console.log(this.energyChargeType);
				// console.log(this.energyPrice);
				if( cxkjCommunityListLeasePayway.length == 0 || vm.cxkjCommunityListPayway.length == 0 || vm.serviceCost == '' || vm.waterEnergyPayDate == '' || vm.waterChargeType == null || vm.waterPrice == '' || vm.energyChargeType == null || vm.energyPrice == '') {
					this.warningMessage = '信息填入不完整，都不能为空';
					this.warningModal = true;
				} else {
					axios.post(hostRoom, {
							communityId: vm.communityId,
							cxkjCommunityListPayway: vm.cxkjCommunityListPayway,
							cxkjCommunityListMaintain: vm.cxkjCommunityListMaintain,
							cxkjCommunityListConfig: cxkjCommunityListConfig,
							cxkjCommunityListLeasePayway:cxkjCommunityListLeasePayway,
							serviceCost: vm.serviceCost,
							deposit:vm.deposit,
							communityType: 0,
							waterEnergyPayDate: vm.waterEnergyPayDate,
							waterChargeType: vm.waterChargeType,
							waterPrice: vm.waterPrice,
							energyChargeType: vm.energyChargeType,
							energyPrice: vm.energyPrice
						})
						.then((response) => {
							// console.log(response);
							if(response.status == 200 && response.data.code == 10000) {
								vm.successMessage = '公寓设置成功';
								vm.disabled = true;
								vm.successModal = true;
								setTimeout(() => {
									vm.successModal = false;
									if(this.communityType == '0') {
										vm.$router.push('/apartment/communityManagement');
									}else if(this.communityType == '0,1'){
										vm.activeName2 = 'second';
									}

								}, 2000);
							} else {
								this.warningMessage = response.data.content;
								this.warningModal = true;
							}
						})
						.catch((error) => {
							// console.log(error);
							this.warningMessage = '公寓设置失败,服务器出现异常';
							this.warningModal = true;
						})
				}

			},
			//办公提交设置信息
			refer() {
				let vm = this
				this.disabled2 = false;
				let cxkjCommunityListConfig = [];
				let cxkjCommunityListLeasePayway = [];

				for(let i = 0;i< vm.officesDiscount.length;i++){
					if(this.officesDiscount[i].checkValue == true){
						cxkjCommunityListLeasePayway.push({
							dataId:this.officesDiscount[i].option1.dataId,
							discount:this.officesDiscount[i].date
						})
					}
				}
				for(let i = 0; i < vm.tableRepairs3.length; i++) {
					if(this.tableRepairs3[i].checkValue == true) { //添加办公付款方式编号
						vm.cxkjCommunityListPayway2.push({
							dataId: i+1,
							discount: this.tableRepairs3[i].date,
							communityPayWayId: this.tableRepairs3[i].communityPayWayId
						});
						// console.log(vm.cxkjCommunityListPayway);
					}
				}

				for(let i = 0; i < vm.tableConferences.length; i++) {
					if(this.tableConferences[i].checkValue == true) { //添加会议室套餐设置编号
						vm.cxkjCommunityListMeetingSuit.push({
							mettingSuitDataId: this.tableConferences[i].option4[i].dataId,
							meetingSuitPrice: this.tableConferences[i].date,
							meetingSuitUnitDataId: this.tableConferences[i].inputValue2,
							communityMeetingSuitId: this.tableConferences[i].communityMeetingSuitId
						});

					}
				}
				console.log(vm.cxkjCommunityListMeetingSuit);
				for(let i = 0; i < vm.tableRepairs5.length; i++) { //添加办公维修项目编号
					if(this.tableRepairs5[i].checkValue == true) {
						vm.cxkjCommunityListMaintain2.push({
							communityMaintainDataId: this.tableRepairs5[i].option7.dataId,
							onSiteTime: this.tableRepairs5[i].date,
							communityMaintainId: this.tableRepairs5[i].communityMaintainId
						});
						console.log(vm.cxkjCommunityListMaintain);
					}
				}
				for(let i = 0; i < vm.checkList2.length; i++) {
					cxkjCommunityListConfig.push({
						configDataId: this.option5[this.option5.findIndex(item => item.dataName == vm.checkList2[i])].dataId
					});
				}
				// console.log(vm.cxkjCommunityListMaintain2);
				// console.log(vm.cxkjCommunityListMeetingSuit);
				// console.log(vm.serviceCost2);
				if(vm.serviceCost2 == '' || cxkjCommunityListLeasePayway.length == 0 || vm.cxkjCommunityListPayway2.length == 0) {
					this.warningMessage = '信息填入不完整，都不能为空';
					this.warningModal = true;
				} else {
					axios.post(hostRoom, {
							communityId: vm.communityId,
							cxkjCommunityListMaintain: vm.cxkjCommunityListMaintain2,
							cxkjCommunityListConfig: cxkjCommunityListConfig,
							cxkjCommunityListMeetingSuit: vm.cxkjCommunityListMeetingSuit,
							serviceCost: vm.serviceCost2,
							deposit: vm.deposit2,
							communityType: 1,
							cxkjCommunityListLeasePayway:cxkjCommunityListLeasePayway,
							cxkjCommunityListPayway:vm.cxkjCommunityListPayway2
						})
						.then((response) => {
							// console.log(response);
							let code = parseInt(response.data.code)
							if(code == 10000) {
								this.successMessage = '办公设置成功';
								vm.disabled2 = true;
								this.successModal = true;
								setTimeout(() => {
									this.successModal = false;
									if(this.communityType == '1' || this.communityType == '0,1') {
										vm.$router.push('/apartment/communityManagement');
									}
								}, 2000);
							} else {
								this.warningMessage = response.data.content;
								this.warningModal = true;
							}
						})
						.catch((error) => {
							// console.log(error);
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
