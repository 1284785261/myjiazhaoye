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
				<Tabs type="card" class="Management">
					<Tab-pane label="社区管理">
            <!--<el-tabs v-model="activeItem" type="card">-->
              <!--<el-tab-pane label="社区管理" name="1">-->
						    <div class="message-ti">
							<div class="form-search-criteria">
								<div class="form-item">

									<router-link to="/apartment/communityComplie" class="add" v-if="jurisdiction('COMMUNITY_INCREASE')"><span>+</span>添加社区</router-link>

								</div>
								<div class="form-item">
									<span>开业日期：</span>
									<Date-picker type="date" :options="option4" placeholder="选择日期" v-model="start"></Date-picker>
									<span class="inline-block spanBar">-</span>
									<Date-picker type="date"  :options="option1" placeholder="选择日期" v-model="over"></Date-picker>
								</div>
								<div class="form-item">
									<div class="form-search">
										<i class="iconfont icon-sousuo"></i>
										<Input v-model="vague" placeholder="搜索社区名称"></Input>
										<input type="button" value="搜索" @click="btns()">
									</div>
								</div>
							</div>
							<table class="table ivu-table">
								<tr>
									<th width="50px;">序号</th>
									<th>社区信息</th>
									<th width="140px;">资源概况</th>
									<th>人员配备</th>
									<th>社区设置</th>
									<th width="175px;">操作</th>
								</tr>
								<tr v-for="(item,index) in commint">
									<td>{{index+1}}</td>
									<td>
										<dl>
											<dt v-if="item.communityName">{{item.communityName}}</dt>
											<dd>社区类型：<span> {{item.communityType | Form(item.communityType)}}</span></dd>
											<dd>开业日期：<span> {{item.communityOpeningDate | imata(item.communityOpeningDate)}}</span></dd>
											<dd>物业合同截止：<span> {{item.communityLeaseEnd | imata}}</span></dd>
											<dd>地址：
												<span v-if="item.province.areaName == item.city.areaName"> {{item.province.areaName + item.district.areaName +item.communityAddress}}</span>
												<span v-else> {{item.province.areaName + item.city.areaName + item.district.areaName +item.communityAddress}}</span>
											</dd>
										</dl>
									</td>
									<td>
										<dl>
											<dd>公寓：<span>{{item.roomSize}}套</span></dd>
											<dd>工位：
												<span v-if="item.cxkjCommunityPlaceSize != null">{{item.cxkjCommunityPlaceSize}}套</span>
												<span v-else>0套</span>
											</dd>
											<dd>办公室：<span> {{item.cxkjCommunityListOfficeSize}}间</span></dd>
											<dd>会议室：<span> {{item.cxkjCommunityListMeetingSize}}间</span></dd>
										</dl>
									</td>
									<td>
										<dl>
											<dd v-if="item.shopkeeper != null">店长：<span> {{item.shopkeeper.userName}}</span></dd>
											<dd v-else>店长：<span> <!--{{item.shopkeeper.userName}}--></span></dd>
											<dd v-if="item.shopkeeper != null">店长联系电话：<span> {{item.shopkeeper.userPhone}}</span></dd>
											<dd v-else>店长联系电话：<span> <!--{{item.shopkeeper.userName}}--></span></dd>
											<dd>社区服务电话：<span> {{item.communityPhone}}</span></dd>
											<dd>员工：<span>{{item.userRelationNum}}人</span></dd>
										</dl>
									</td>
									<td>
										<dl>
											<dd><p v-if="item.communityType == 0">
													<span v-if="item.payment != null">公寓付款方式：{{item.payment | payment}}</span>
													<span v-else>公寓付款方式：未设置</span>
												</p>
												<p v-else-if="item.communityType == 1">
													<span v-if="item.paymentOffice != null">办公付款方式：{{item.paymentOffice | paymentOffice}}</span>
													<span v-else>办公付款方式：未设置</span>
												</p>
												<p v-else-if="item.communityType == 0,1">
													<span v-if="item.payment != null">公寓付款方式：{{item.payment | payment}}</span>
													<span v-else>公寓付款方式：未设置</span><br>
													<span v-if="item.paymentOffice != null">办公付款方式：{{item.paymentOffice | paymentOffice}}</span>
													<span v-else>办公付款方式：未设置</span>
												</p>
											</dd>
											<dd v-if="item.serviceCostMap && (item.communityType == 0 || item.communityType == '0,1')">公寓服务费：
												<span v-if="item.serviceCostMap.roomServiceCost">{{item.serviceCostMap.roomServiceCost}}元/月</span>
												<span v-else>未设置</span>
											</dd>

											<dd v-if="item.serviceCostMap && (item.communityType == 1 || item.communityType == '0,1')">办公室服务费：
												<span v-if="item.serviceCostMap.officeServiceCost">{{item.serviceCostMap.officeServiceCost}}元/月</span>
												<span v-else>未设置</span>
											</dd>

											<dd>会议室套餐：<span>  {{item.meetingSuit | Fors(item.meetingSuit)}}</span></dd>
											<dd>维修项：<span> {{item.maintain | Fors(item.maintain)}}</span></dd>
										</dl>
									</td>
									<td>
										<router-link :to="{path:'/apartment/communityMessage',query:{id:item.communityId}}">基本信息</router-link>
										<router-link :to="{path:'/apartment/communityPresentation',query:{id:item.communityId,type:item.communityType,Name:item.communityName}}">社区介绍</router-link>
										<router-link :to="{path:'/apartment/communitySettings',query:{id:item.communityId,type:item.communityType,Name:item.communityName}}">社区设置</router-link>
										<router-link :to="{path:'/communityHouse',query:{communityId:item.communityId,type:item.communityType}}">资源管理</router-link>
										<router-link v-if="item.communityType != 1" :to="{name:'equipmentManage',query:{communityId:item.communityId}}">设备管理</router-link>
										<router-link :to="{path:'/system/staffdeploy',query:{id:item.communityId,communityName:item.communityName}}" v-if="jurisdiction('STAFFING_UPDATE')">人员配置</router-link>
                    <!--<a @click="getCommunityMessage(item.communityId)" >基本信息</a>-->
                    <!--<a @click="getPresentation(item.communityId,item.communityType,item.communityName)" >社区介绍</a>-->
                    <!--<a @click="" :to="{path:'/apartment/communitySettings',query:{id:item.communityId,type:item.communityType,Name:item.communityName}}">社区设置</a>-->
                    <!--<a @click="" :to="{path:'/communityHouse',query:{communityId:item.communityId,type:item.communityType}}">资源管理</a>-->
                    <!--<a @click="" v-if="item.communityType != 1" :to="{name:'equipmentManage',query:{communityId:item.communityId}}">设备管理</a>-->
                    <!--<a @click="" :to="{path:'/system/staffdeploy',query:{id:item.communityId,communityName:item.communityName}}" v-if="jurisdiction('STAFFING_UPDATE')">人员配置</a>-->
										<a href="javascript:;" @click="hub(community={id:item.communityId,Close:item.communityIsClose,Name:item.communityName})" v-if="jurisdiction('COMMUNITY_DELETE')">关闭社区</a>
									</td>
								</tr>

							</table>
							<div class="block">
								<el-pagination @current-change="handleCurrentChange" :current-page="currentPage1" :page-size="3" layout=" prev, pager, next, total,jumper" :total=totalNum>
								</el-pagination>
							</div>
						</div>
              <!--</el-tab-pane>-->
              <!--<el-tab-pane label="基本信息" name="2">-->
                <!--<community-msg></community-msg>-->
              <!--</el-tab-pane>-->
              <!--<el-tab-pane label="社区介绍" name="3">-->
                <!--<presentation></presentation>-->
              <!--</el-tab-pane>-->
              <!--<el-tab-pane label="社区设置" name="4">-->
                <!--<community-settings></community-settings>-->
              <!--</el-tab-pane>-->
              <!--<el-tab-pane label="资源管理" name="5">-->
                <!--<community-settings></community-settings>-->
              <!--</el-tab-pane>-->
              <!--<el-tab-pane label="设备管理" name="6">-->
                <!--<community-settings></community-settings>-->
              <!--</el-tab-pane>-->
              <!--<el-tab-pane label="人员配置" name="7">-->
                <!--<community-settings></community-settings>-->
              <!--</el-tab-pane>-->
              <!--<el-tab-pane label="关闭社区" name="8">-->
                <!--<community-settings></community-settings>-->
              <!--</el-tab-pane>-->
            <!--</el-tabs>-->
					</Tab-pane>

					<Tab-pane label="已关闭的社区">
						<div class="message-ti">
							<div class="form-search-criteria">
								<div class="form-item">
									<span>开业日期：</span>
									<Date-picker type="date" :options="option5" placeholder="选择日期" v-model="start1"></Date-picker>
									<span class="inline-block spanBar">-</span>
									<Date-picker type="date" :options="option2" placeholder="选择日期" v-model="over1"></Date-picker>
								</div>
								<div class="form-item">
									<div class="form-search">
										<i class="iconfont icon-sousuo"></i>
										<Input v-model="vague2" placeholder="搜索社区名称"></Input>
										<input type="button" value="搜索" @click="btusy2">
									</div>
								</div>
							</div>
							<table class="table ivu-table">
								<tr>
									<th width="50px;">序号</th>
									<th>社区信息</th>
									<th width="140px;">资源概况</th>
									<th>人员配备</th>
									<th>社区设置</th>
									<th width="175px;">操作</th>
								</tr>
								<tr v-for="(item,index) in commint2">
									<td>{{index+1}}</td>
									<td>
										<dl>
											<dt v-if="item.communityName">{{item.communityName}}</dt>
											<dd>社区类型：<span> {{item.communityType | Form(item.communityType)}}</span></dd>
											<dd>开业日期：<span> {{item.communityOpeningDate | imata(item.communityOpeningDate)}}</span></dd>
											<dd>物业合同截止：<span> {{item.communityLeaseEnd | imata}}</span></dd>
											<dd>地址：
												<span v-if="item.province.areaName == item.city.areaName"> {{item.province.areaName + item.district.areaName +item.communityAddress}}</span>
												<span v-else> {{item.province.areaName + item.city.areaName + item.district.areaName +item.communityAddress}}</span>
											</dd>
										</dl>
									</td>
									<td>
										<dl>
											<dd>公寓：<span>{{item.roomSize}}套</span></dd>
											<dd>工位：
												<span v-if="item.cxkjCommunityPlaceSize != null">{{item.cxkjCommunityPlaceSize}}套</span>
												<span v-else>0套</span>
											</dd>
											<dd>办公室：<span> {{item.cxkjCommunityListOfficeSize}}间</span></dd>
											<dd>会议室：<span> {{item.cxkjCommunityListMeetingSize}}间</span></dd>
										</dl>
									</td>
									<td>
										<dl>
											<dd v-if="item.shopkeeper != null">店长：<span> {{item.shopkeeper.userName}}</span></dd>
											<dd v-else>店长：<span> <!--{{item.shopkeeper.userName}}--></span></dd>
											<dd v-if="item.shopkeeper != null">店长联系电话：<span> {{item.shopkeeper.userPhone}}</span></dd>
											<dd v-else>店长联系电话：<span> <!--{{item.shopkeeper.userName}}--></span></dd>
											<dd>社区服务电话：<span> {{item.communityPhone}}</span></dd>
											<dd>员工：<span>{{item.userRelationNum}}人</span></dd>
										</dl>
									</td>
									<td>
										<dl>
											<dd><p v-if="item.communityType == 0">
													<span v-if="item.payment != null">公寓付款方式：{{item.payment | payment}}</span>
													<span v-else>公寓付款方式：未设置</span>
												</p>
												<p v-else-if="item.communityType == 1">
													<span v-if="item.paymentOffice != null">办公付款方式：{{item.paymentOffice | paymentOffice}}</span>
													<span v-else>办公付款方式：未设置</span>
												</p>
												<p v-else-if="item.communityType == 0,1">
													<span v-if="item.payment != null">公寓付款方式：{{item.payment | payment}}</span>
													<span v-else>公寓付款方式：未设置</span><br>
													<span v-if="item.paymentOffice != null">办公付款方式：{{item.paymentOffice | paymentOffice}}</span>
													<span v-else>办公付款方式：未设置</span>
												</p>
											</dd>
											<dd v-if="item.serviceCostMap">公寓服务费：
												<span v-if="item.serviceCostMap.roomServiceCost">{{item.serviceCostMap.roomServiceCost}}元/月</span>
												<span v-else>未设置</span>
											</dd>

											<dd v-if="item.serviceCostMap">办公室服务费：
												<span v-if="item.serviceCostMap.officeServiceCost">{{item.serviceCostMap.officeServiceCost}}元/月</span>
												<span v-else>未设置</span>
											</dd>
											<dd v-else>办公室服务费：<span>未设置</span></dd>
											<dd>会议室套餐：<span>  {{item.meetingSuit | Fors(item.meetingSuit)}}</span></dd>
											<dd>维修项：<span> {{item.maintain | Fors(item.maintain)}}</span></dd>
										</dl>
									</td>
									<td>
										<router-link :to="{path:'/apartment/communityMessage',query:{id:item.communityId}}">基本信息</router-link>
										<router-link :to="{path:'/apartment/communityPresentation',query:{id:item.communityId,Name:item.communityName}}">社区介绍</router-link>
										<router-link :to="{path:'/apartment/communitySettings',query:{id:item.communityId,type:item.communityType,Name:item.communityName}}">社区设置</router-link>
										<router-link :to="{path:'/communityHouse',query:{communityId:item.communityId,type:item.communityType}}">资源管理</router-link>
										<router-link :to="{name:'equipmentManage',query:{communityId:item.communityId}}">设备管理</router-link>
										<router-link :to="{path:'/system/staffdeploy',query:{id:item.communityId,communityName:item.communityName}}" v-if="jurisdiction('STAFFING_UPDATE')">人员配置</router-link>
										<a href="javascript:;" @click="hub(community={id:item.communityId,Close:item.communityIsClose,Name:item.communityName})" v-if="jurisdiction('COMMUNITY_UPDATE')">开放社区</a>
									</td>
								</tr>

							</table>
							<div class="block">
								<el-pagination @current-change="handleCurrentChange2" :current-page="currentPage1" :page-size="3" layout=" prev, pager, next, total,jumper" :total=totalNum2>
								</el-pagination>
							</div>
						</div>
					</Tab-pane>

					<Tab-pane label="社区评价">
						<div class="message-ti">
							<div class="form-search-criteria">
								<div class="form-item">
									<b>社区：</b>
									<Select v-model="model1" style="width:200px">
										<Option v-for="community in  communitys" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
									</Select>
								</div>
								<div class="form-item">
									<span>评价时间：</span>
									<Date-picker type="date" :options="option6" placeholder="选择日期" v-model="createtimes"></Date-picker>
									<span class="inline-block spanBar">-</span>
									<Date-picker type="date" :options="option3" placeholder="选择日期" v-model="commentDate"></Date-picker>
								</div>
								<div class="form-item">
									<div class="form-search" style="margin-left: 0;">
										<i class="iconfont icon-sousuo"></i>
										<Input v-model="searchKey" placeholder="搜索用户"></Input>
										<input type="button" value="搜索" @click="btusys">
										<a class="exports" :href="host3">导出</a>
									</div>
								</div>
							</div>
							<table class="table ivu-table">
								<tr>
									<th>评价时间</th>
									<th style="text-align: center">社区</th>
									<th style="text-align: center">用户</th>
									<th style="text-align: center">订单/账单</th>
									<th>评价内容</th>
									<th>操作</th>
								</tr>
								<tr v-for="tableEvaluate in tableEvaluates">
									<td><span class="text-default">{{tableEvaluate.createtime | createtime}}</span></td>
									<td style="text-align: center"><span class="text-black" v-if="tableEvaluate.cxkjCommunity">{{tableEvaluate.cxkjCommunity.communityName}}</span></td>
									<td style="text-align: center"><span class="text-black" v-if="tableEvaluate.userInfo">{{tableEvaluate.userInfo.userName}}</span></td>
									<td style="text-align: center">
										<span class="text-default" v-if="tableEvaluate.cxkjBill != null">{{tableEvaluate.cxkjBill.billName}}</span>
										<span class="text-default" v-if="tableEvaluate.cxkjOfficeOrder != null">{{tableEvaluate.cxkjOfficeOrder.orderName}}</span>
										<span class="text-default" v-else>--</span>
									</td>
									<td><span class="text-black">{{tableEvaluate.content}}</span></td>
									<td>
										<router-link :to="{path:'/apartment/commentdetails',query:{id:tableEvaluate.commentId}}">查看详情</router-link>
									</td>
								</tr>
							</table>
							<div class="block">
								<el-pagination @current-change="handleCurrentChange3" :current-page="currentPage1" :page-size="10" layout=" prev, pager, next, total,jumper" :total=totalNum3>
								</el-pagination>
							</div>
						</div>
					</Tab-pane>
					<Tab-pane label="短租评价">
						<div class="message-ti">
							<div class="form-search-criteria">
								<div class="form-item">
									<b>社区：</b>
									<Select v-model="model2" style="width:200px">
										<Option v-for="community in  communitys" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
									</Select>
								</div>
								<div class="form-item">
									<b>房型：</b>
									<Select v-model="typevalue" style="width:200px">
										<Option v-for="typem in  houseType" :value="typem.id" :key="typem.id">{{ typem.name }}</Option>
									</Select>
								</div>
								<div class="form-item">
									<span>评价时间：</span>
									<Date-picker type="date" :options="option7" placeholder="选择日期" v-model="shortcreatetimes"></Date-picker>
									<span class="inline-block spanBar">-</span>
									<Date-picker type="date" :options="option8" placeholder="选择日期" v-model="shortcommentDate"></Date-picker>
								</div>
								<div class="form-item">
									<div class="form-search" style="margin-left: 0;">
										<i class="iconfont icon-sousuo"></i>
										<Input v-model="shortsearchKey" placeholder="搜索用户"></Input>
										<input type="button" value="搜索" @click="shortEvaluate">
										<!--<a class="exports" :href="host+communityId">导出</a>-->
									</div>
								</div>
								<div class="form-item">
									<a class="exportm" :href="host4">导出</a>
								</div>
							</div>
							<table class="table ivu-table">
								<tr>
									<th>评价时间</th>
									<th style="text-align: center">社区</th>
									<th style="text-align: center">用户</th>
									<th style="text-align: center">房型</th>
									<th>评价内容</th>
									<th>操作</th>
								</tr>
								<tr v-for="tableEvaluate in shorttableEvaluates">
									<td><span class="text-default">{{tableEvaluate.createTime | createtime}}</span></td>
									<td style="text-align: center"><span class="text-black" v-if="tableEvaluate.communityName">{{tableEvaluate.communityName}}</span></td>
									<td style="text-align: center"><span class="text-black" v-if="tableEvaluate.userName">{{tableEvaluate.userName}}</span></td>
									<td style="text-align: center">
										<span class="text-default" v-if="tableEvaluate.name">{{tableEvaluate.name}}</span>
										<span v-else>--</span>
									</td>
									<td><span class="text-black">{{tableEvaluate.content}}</span></td>
									<td>
										<a @click="delectEvaluation(tableEvaluate)">删除</a>
									</td>
								</tr>
							</table>
							<div class="block">
								<el-pagination @current-change="handleCurrentChange4" :current-page="currentPage1" :page-size="10" layout=" prev, pager, next, total,jumper" :total=totalNum4>
								</el-pagination>
							</div>
						</div>
					</Tab-pane>
				</Tabs>
			</div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
		<div class="lose" v-show="isShow">
			<span>确认<i>{{community.Close | mv(community.Close)}}</i>以下社区吗？</span>
			<p>{{community.Name}}</p>
			<a @click="qsm()">确定</a>
			<a @click="qb()">取消</a>
		</div>
		<div class="lose" v-show="isShow2">
			<span>确认删除此条评价吗？</span>
			<p></p>
			<a @click="delectEvaluationm()">确定</a>
			<a @click="notdelectEvaluationm()">取消</a>
		</div>
		<div class="zhezhao" v-show="isShow"></div>
		<div class="zhezhao" v-show="isShow2"></div>
	</div>

</template>

<script>
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import communitySettings from './communitySettings'
	import communityMsg from './communityMessage'
	import presentation from './communityPresentation'
	import { hostAuthor, hostCommint, hostOpen, allCommunity, hostComment, host,ShortComment300203,ShorthouseType300205,ShortPmsDelComment300207 } from '../api.js';
	import axios from 'axios';
	import qs from 'qs';

	export default {
		components: {
			rightHeader,
			menuBox,
			footerBox,
			successModal,
			warningModal,
      communitySettings,
      communityMsg,
      presentation
		},
		data() {
			let _this = this;
			return {
        activeItem:1,
				currentPage1: 1,
				communitys: [{
					communityId: -1,
					communityName: '全部'
				}], //社区介绍社区分类
				model1: -1,
				model2: -1,
				isShow: false,
				isShow2: false,
				tableEvaluates: [],
				shorttableEvaluates:[],//短租评价数据
				host3: '',
				commint: [], //社区管理全部数据展示
				commint2: [], //已关闭社区数据
				pageNum: 1, //第几页的数据
				pageNum2: 1, //已关闭社区第几页的数据
				pageNum3: 1, //社区评价第几页
				pageNum4: 1, //社区短租评价第几页
				totalNum: null, //数据总条数
				totalNum2: null, //已关闭社区数据条数
				totalNum3: null, //社区评价数据条数
				totalNum4: null, //社区短租评价数据条数
				pageSize: 3, //每页显示的数据数量
				community: {
					Close: null,
					id: 0,
					Name: '佳兆业'
				}, //确定后需要的参数
				start: null, //模糊查询开业开始时间
				over: null, //模糊查询开业关闭时间
				start1: null, //ganbi模糊查询开业开始时间
				over1: null, //模糊查询开业关闭时间
				vague: null, //模糊查询内容,
				vague2: null, //模糊查询内容
				valu: null,
				createtimes: null,
				commentDate: null,
				shortcreatetimes: null,
				shortcommentDate: null,
				communityId: null,
				searchKey: '',
				shortsearchKey:'',
				successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
				option1: {
					disabledDate (date) {
						return date && date.valueOf() < _this.start;
					}
				},
				option2: {
					disabledDate (date) {
						return date && date.valueOf() < _this.start1;
					}
				},
				option3: {
					disabledDate (date) {
						return date && date.valueOf() < _this.createtimes;
					}
				},
				option4: {
                    disabledDate(date){
						if(_this.over){
							return date &&  _this.over < date.valueOf();
						}
                    }
				},
				option5: {
                    disabledDate(date){
						if(_this.over1){
							return date &&  _this.over1 < date.valueOf();
						}
                    }
				},
				option6: {
                    disabledDate(date){
						if(_this.commentDate){
							return date &&  _this.commentDate < date.valueOf();
						}
                    }
				},
				option7: {
                    disabledDate(date){
						if(_this.shortcommentDate){
							return date &&  _this.shortcommentDate < date.valueOf();
						}
                    }
				},
				option8: {
					disabledDate (date) {
						return date && date.valueOf() < _this.shortcreatetimes;
					}
				},
				houseType:[{
					id:'-1',
					name:'全部'
				}],
				typevalue:'-1',
				shortId:'',
				host4:''
			}
		},
		filters: { //过滤器
			Fors(data) {
				if(data == false) {
					return '未设置';
				} else if(data == true) {
					return '已设置';
				}
			},
			Form(data) {
				if(data == '0,1') {
					return '公寓+办公室'
				} else if(data == '0') {
					return '公寓'
				} else if(data == '1') {
					return '办公室'
				}
			},
			imata(ms) {
				if(ms != null) {
					var date = new Date(ms);
					var Y = date.getFullYear() + '年';
					var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
					var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日';
					return Y + M + D;

				}
				return null;
			},

			mv(val) {
				if(val == '1') {
					return '关闭';
				} else if(val == '0') {
					return '开放';
				}
			},
			createtime(val) {
				if(val != null) {
					var date = new Date(val);
					var Y = date.getFullYear() + '.';
					var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
					var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
					var H = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
					var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
					var ss = ((date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()));
					return Y + M + D + '   ' + H + mm + ss;
				}
				return null;
			},
			timefilter(value, format) {
				if(value) {
					return new Date(value).Format(format)
				}
			},
			payment(val){
				let arr = [];
				let arr2 = [];
				arr = val.split(',');
				for(let i = 0;i<arr.length;i++){
					if(arr[i] == '1'){
						arr2.push('月付');
					}
					if(arr[i] == '2'){
						arr2.push('季付');
					}
					if(arr[i] == '3'){
						arr2.push('半年付');
					}
					if(arr[i] == '4'){
						arr2.push('年付');
					}
				}
				return arr2.join(',');
			},
			paymentOffice(val){
				let arr = [];
				let arr2 = [];
				arr = val.split(',');
				for(let i = 0;i<arr.length;i++){
					if(arr[i] == '1'){
						arr2.push('月付');
					}
					if(arr[i] == '2'){
						arr2.push('季付');
					}
					if(arr[i] == '3'){
						arr2.push('半年付');
					}
					if(arr[i] == '4'){
						arr2.push('年付');
					}
				}
				return arr2.join(',');
			}
		},

		mounted() {
			//初始化数据
      this.activeItem = sessionStorage.getItem('activeItem') &&sessionStorage.getItem('activeItem') !='null' ?sessionStorage.getItem('activeItem'):'1';
			this.host3 = host+'/cxkj-room/apis/pc/communityMgrDownload/CxkjCommunityCommentDownload200071?'
			this.host4 = host+ '/cxkj-pms/apis/pc/pmsordercomment/CxkjDownloadPmsComment300204?';
			this.btns();
			this.btusy2();
			this.classifys();
			this.btusys();
			this.shortHousetype();
			this.shortEvaluate();
		},
		methods: {
		  /**
       * 去基本信息
       * **/
      getCommunityMessage(communityId){
        this.activeItem = '2'
        sessionStorage.setItem('communityMangementId',communityId)
        // this.$router.push('/apartment/communityMessage')
      },
      /**
       * 去社区介绍
       * **/
      getPresentation(communityId,communityType,communityName){
        this.activeItem = '3'
        sessionStorage.setItem('communityMangementId',communityId)
        sessionStorage.setItem('communityMangementName',communityName)
        sessionStorage.setItem('communityType',communityType)
      },

			classifys() {
				axios.post(allCommunity).then((response) => { //获取社区分类数据
						if(response.status == 200 && response.data.code == 10000) {
							this.communitys = this.communitys.concat(response.data.entity);
						}
					})
			},
			btns() { //社区管理模糊搜索数据
				let vm = this
				vm.commint = [];
				let param = new FormData();
				if(this.pageNum){
					param.append('pageNum',vm.pageNum);
				}
				if(this.pageSize){
					param.append('pageSize',vm.pageSize);
				}
				if(this.start){
					let start = new Date(this.start).Format('yyyy-MM-dd');
					param.append('communityOpeningDate',start);
				}
				if(this.over){
					this.over = new Date(this.over).Format('yyyy-MM-dd');
					param.append('communityNewOpeningDate',this.over);
				}
				param.append('communityIsClose',0);
				if(this.vague){
					param.append('communityLikeName',vm.vague);
				}
				axios.post(hostCommint, param).then((response) => {//请求数据列
						if(response.status == 200 && response.data.code == 10000) {
							vm.commint = response.data.result.communityData.page;
							vm.totalNum = response.data.result.communityData.totalNum;
						}
						else {
							vm.commint = [];
							vm.totalNum = 0;
						}
					})
			},
			btusy2() { //已关闭社区页面模糊查询
				let vm = this
				vm.commint2 = [];
				let param = new FormData();
				if(this.pageNum2){
					param.append('pageNum',vm.pageNum2);
				}
				if(this.pageSize){
					param.append('pageSize',vm.pageSize);
				}
				if(this.start1){
					let start = new Date(this.start1).Format('yyyy-MM-dd');
					param.append('communityOpeningDate',start);
				}
				if(this.over1){
					let over = new Date(this.over1).Format('yyyy-MM-dd');
					param.append('communityNewOpeningDate',over);
				}
				param.append('communityIsClose',1);
				if(this.vague2){
					param.append('communityLikeName',vm.vague2);
				}
				axios.post(hostCommint, param).then((response) => {//请求数据列表
						if(response.status == 200 && response.data.code == 10000) {
							vm.commint2 = response.data.result.communityData.page;
							vm.totalNum2 = response.data.result.communityData.totalNum;
						}
						else {
							vm.commint2 = [];
							vm.totalNum2 = 0;
						}
					})
			},
			hub(val) { //关闭社区按钮事件
				this.isShow = !this.isShow;
				let vm = this
				if(val.Close == 0) {
					vm.community.Close = 1;
				} else if(val.Close == 1) {
					vm.community.Close = 0;
				}
				this.community.id = val.id;
				this.community.Name = val.Name;
			},
			qsm() { //关闭社区按钮确定
				this.isShow = false;
				let vm = this
				axios.post(hostOpen,
						qs.stringify({
							communityId: vm.community.id,
							communityIsClose: vm.community.Close
						})
					)
					.then((response) => {
						if(response.status == 200 && response.data.code == 10000) {

							this.successMessage = '操作成功';
							this.successModal = true;
							setTimeout(() => {
								this.successModal = false;
								vm.btns();
								vm.btusy2();
							}, 2000);
						} else {
							this.warningMessage = response.data.content;
							this.warningModal = true;
						}

					})
					.catch((error) => {
						this.warningMessage = '操作失败,服务器出现异常';
						this.warningModal = true;
					})
			},
			qb() {
				this.isShow = false;
			},
			closeWarningModal() {
				this.warningModal = false;
			},
			handleCurrentChange(val) { //分页事件
				this.pageNum = val;
				this.btns();
			},
			handleCurrentChange2(val) {
				this.pageNum2 = val;
				this.btusy2();

			},
			handleCurrentChange3(val) {
				this.pageNum3 = val;
				this.btusys();
			},
			handleCurrentChange4(val) {
				this.pageNum4 = val;
				this.shortEvaluate();
			},
			btusys() {
				this.host3 = host+'/cxkj-room/apis/pc/communityMgrDownload/CxkjCommunityCommentDownload200071?'
				let vm = this
				var data = {
					pageNum: this.pageNum3 || 1
				};
				this.host3 +='&pageNum='+this.pageNum3;
				if(this.model1 !== -1) {
					data.communityId = this.model1;
					this.host3 +='&communityId='+data.communityId;
				}

				if(this.createtimes) {
					data.createtime = new Date(this.createtimes).Format("yyyy-MM-dd");
					this.host3 +='&createtime='+data.createtime;
				}
				if(this.commentDate) {
					data.commentEndDate = new Date(this.commentDate).Format("yyyy-MM-dd");
					this.host3 +='&commentEndDate='+data.commentEndDate;
				}
				if(this.searchKey) {
					data.userNamePhone = this.searchKey;
					this.host3 +='&userNamePhone='+data.userNamePhone;
				}
				axios.post(hostComment,
					qs.stringify(data)
					).then((response) => {
						if(response.status == 200 && response.data.code == 10000) {
							vm.tableEvaluates = response.data.entity.page;
							vm.totalNum3 = response.data.entity.totalNum;
						} else {
							vm.tableEvaluates = [];
							vm.totalNum3 = 0;
						}
					}).catch((error) => {
					}
				)
			},
			shortHousetype(){
				axios.get(ShorthouseType300205,
				qs.stringify({
					communityId:this.model2
				})
				).then((response)=>{
					if(response.status == 200 && response.data.code == 10000) {
						for(let i=0;i<response.data.pageBean.length;i++){
							this.houseType.push(response.data.pageBean[i]);
						}

					}
				})


			},
			//获取短租评价数据
			shortEvaluate(){
				this.host4 = host+ '/cxkj-pms/apis/pc/pmsordercomment/CxkjDownloadPmsComment300204?';
				let vm = this
				var data = {
					pageNum: this.pageNum4 || 1
				};
				this.host4 +='&pageNum='+this.pageNum4;
				if(this.model2 != -1) {
					data.communityId = this.model2;
					this.host4 += '&communityId=' + data.communityId;
				}
				if(this.typevalue != -1){
					data.roomTypeId = this.typevalue;
					this.host4 += '&roomTypeId=' + data.roomTypeId;
				}
				if(this.shortcreatetimes) {
					data.beginDate = new Date(this.shortcreatetimes).Format("yyyy-MM-dd");
					this.host4 += '&beginDate=' + data.beginDate;
				}
				if(this.shortcommentDate) {
					data.endDate = new Date(this.shortcommentDate).Format("yyyy-MM-dd");
					this.host4 += '&endDate=' + data.endDate;
				}
				if(this.shortsearchKey) {
					data.keyWord = this.shortsearchKey;
					this.host4 += '&keyWord=' + data.keyWord;
				}
				axios.post(ShortComment300203,
					qs.stringify(data)
					).then((response) => {
						if(response.status == 200 && response.data.code == 10000) {
							vm.shorttableEvaluates = response.data.pageBean.page;
							vm.totalNum4 = response.data.pageBean.totalNum;
						} else {
							vm.shorttableEvaluates = [];
							vm.totalNum4 = 0;
						}
					}).catch((error) => {
					}
				)
			},
			//删除短租评价
			delectEvaluation(value){
				this.isShow2 = true;
				this.shortId = value.id;
			},
			//确定删除短租评价
			delectEvaluationm(){
				axios.post(ShortPmsDelComment300207,
					qs.stringify({
						id:this.shortId
					})
				).then((response)=>{
					if(response.status == 200 && response.data.code == 10000) {
						this.successMessage = '删除短租评价成功';
						this.successModal = true;
						this.isShow2 = false;
						setTimeout(() => {
							this.successModal = false;
							this.shortEvaluate();
						}, 2000);
					} else {
						this.isShow2 = false;
						this.warningMessage = response.data.content;
						this.warningModal = true;
					}
				}).catch((err)=>{
					this.isShow2 = false;
					this.warningMessage = '删除短租评价失败';
					this.warningModal = true;
				})
			},
			//取消删除短租评价
			notdelectEvaluationm(){
				this.isShow2 = false;
			}
		},

	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
	@import '../../sass/page/_communityManagement.scss';
	.form-item .add {
		display: inline-block;
		width: 140px;
		height: 34px;
		border-radius: 5px;
		border: 1px solid #038be2;
		text-align: center;
		line-height: 34px;
		font-size: 12px;
		font-weight: bold;
		span {
			font-size: 16px;
		}
	}

	.zhezhao {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: #666;
		opacity: 0.5;
		z-index: 999;
	}

	.lose {
		z-index: 1000;
		position: fixed;
		top: 50%;
		left: 50%;
		width: 280px;
		height: 180px;
		border-radius: 10px;
		background: #fff;
		transform: translate(-50%, -50%);
		text-align: center;
	}

	.lose span {
		display: block;
		font-size: 12px;
		margin-top: 42px;
		margin-bottom: 18px;
	}

	.lose span i {
		font-style: normal;
		font-size: 10px;
		margin: 0 5px;
		color: #038be2;
	}

	.lose p {
		font-size: 12px;
		font-weight: bold;
		margin-bottom: 35px;
	}

	.lose a {
		display: inline-block;
		width: 90px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		font-size: 12px;
		border-radius: 5px;
	}

	.lose a:nth-child(3) {
		background: #038be2;
		color: white;
		margin-right: 20px;
	}

	.lose a:nth-child(4) {
		background: #f8f8f8;
		color: #666;
		border: 1px solid #dcdcdc;
	}

	.message-ti {
		position: relative;
	}

	.message-ti .block {
		position: absolute;
		left: 50%;
		margin-top: 120px;
		transform: translate(-50%, -50%);
	}

	.message-ti .block .el-pagination {
		text-align: center;
		margin-top: 40px;
	}

	.message-ti .block .el-pagination .el-pager .number {
		margin: 0 5px;
		border: 1px solid #DCDCDC;
	}

	.message-ti .block .el-pagination button {
		border: 1px solid #DCDCDC;
	}

</style>
