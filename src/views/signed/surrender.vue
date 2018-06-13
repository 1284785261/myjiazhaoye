<template>
	<div id="surrend">
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置：</span>
					<router-link class="active" to="/apartment/workbench">工作台</router-link><span>>用户退租</span>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>用户退租</h3>
					<span>{{Name}}</span>
				</div>
				<div id="surrender">
					<div class="surrender1">
						<span class="bsc">类型：</span>
						<el-select v-model="value" placeholder="请选择" @change="select(value)">
							<el-option v-for="item in options" :key="item.dataName" :value="item.dataName">
							</el-option>
						</el-select>
						<span class="bsc">状态：</span>
						<el-select v-model="value2" placeholder="请选择" @change="select2(value2)">
							<el-option v-for="item in options2" :key="item.dataName" :value="item.dataName">
							</el-option>
						</el-select>
						<span class="bsc">申请时间：</span>
						<Date-picker type="date" :options="option2" placeholder="请选择日期" class="dev" v-model="startDate"></Date-picker>
						<span class="inline-block spanBar">-</span>
						<Date-picker type="date" :options="option1" placeholder="请选择日期" class="dev" v-model="endDate"></Date-picker>
						<div class="form-item" style="margin-left: 30px;">
							<div class="form-search">
								<i class="iconfont icon-sousuo"></i>
								<Input v-model="keyWord" placeholder="搜索联系人/手机号"></Input>
								<input type="button" value="搜索" @click="sous()">
							</div>
						</div>
					</div>
					<div v-if="surrList">
						<table>
							<thead>
								<td>申请时间</td>
								<td>类型</td>
								<td>承租人/联系人</td>
								<td>联系电话</td>
								<td>租期</td>
								<td>剩余</td>
								<td>租金和支付情况</td>
								<td>状态</td>
								<td>操作</td>
							</thead>
							<tr v-for="item in surrList">
								<td>{{item.createTime | time}}</td>
								<td>{{item.isOffice | ofice}}</td>
								<td>{{item.userName}}</td>
								<td>{{item.userPhone}}</td>
								<td>{{item.beginDate | times}}-{{item.endDate | times}}</td>
								<td style="color: red;" v-if="item.surplusDay > 0">{{item.surplusDay}}天</td>
								<td v-else>--</td>
								<td>{{item.cyclePayMoney | Money}} 已付{{item.payStage}}/{{item.stage}}</td>
								<td :class="[{'kust':item.refundStatus == 0},{'kust1':item.refundStatus == 2}]">{{item.refundStatus | Status}}</td>
								<td>
									<router-link :to="{path:'/signed/affirmsurrend',query:{id:item.throwLeaseId,Name:Name}}" v-if="item.refundStatus == 0">确认退租</router-link>
									<router-link :to="{path:'/signed/surredendetal',query:{id:item.throwLeaseId,Name:Name}}" v-else>查看退租</router-link>
									<router-link :to="{name:'contractDetail',query:{contractSignId:item.contractSignId,isOffice:item.isOffice}}">查看合同</router-link>
								</td>
							</tr>
						</table>
						<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size=pageSize layout="prev, pager, next,total,jumper" :total=totalNum>
						</el-pagination>
					</div>
					<div v-else class="kbt">
		    			<img src="../../../static/images/icon/tms_03.png" style="margin-top: 150px;">
		    		</div>
				</div>
			</div>
			<footer-box></footer-box>
		</div>
		<div class="scherm" v-show="ishide">
		</div>
	</div>
</template>

<script>
	import '../../sass/style/surrender.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import axios from 'axios';
	import { hostThrowLease } from '../api.js';
	import qs from 'qs';

	export default {
		components: {
			rightHeader,
			menuBox,
			footerBox
		},
		data() {
			let _this = this
			return {
				activeTabName:"workbench",
				currentPage3: 1,
				radio: '1',
				ishide: false,
				communityId: '',
				isOffice: null,
				refundStatus: null,
				startDate: '',
				endDate: '',
				keyWord: '',
				pageNum: '1',
				pageSize: 10,
				totalNum: 0,
				options: [{
					dataName: '全部',
					id: -1
				},{
					dataName: '公寓',
					id: 0
				}, {
					dataName: '办公室',
					id: 1
				}],
				value: '全部',
				options2: [{
					dataName: '全部',
					id: -1
				},{
					dataName: '待处理',
					id: 0
				}, {
					dataName: '待用户确认',
					id: 1
				}, {
					dataName: '已办结',
					id: 2
				}],
				value2: '全部',
				surrList: {},
				Name:'',
				option1: {
					disabledDate (date) {
						return date && date.valueOf() < _this.startDate;
					}
				},
				option2: {
                    disabledDate(date){
						if(_this.endDate){
							return date &&  _this.endDate < date.valueOf();
						}
                    }
                },
			}
		},
		mounted() {
			this.communityId = this.$route.query.communityId;
			this.Name = this.$route.query.Name;
			this.datas();
		},
		filters: {
			ofice(val) {
				if(val == 0) {
					return '公寓'
				} else if(val == 1) {
					return '办公室'
				}
			},
			time(val) {
				return new Date(val).Format('yyyy-MM-dd');
			},
			times(val) {
				return new Date(val).Format('yyyy.MM.dd');
			},
			Money(val) {
				return val.toFixed(2) + '元/月';
			},
			Status(val) {
				if(val == 0) {
					return '待处理';
				} else if(val == 1) {
					return '待用户确认'
				} else if(val == 2) {
					return '已办结'
				}
			}
		},
		methods: {
			datas() {
				let param = new FormData();
				param.append("communityId", this.communityId);
				if((this.isOffice && this.isOffice != '-1') || this.isOffice == 0) {
					param.append("isOffice", this.isOffice);
				}
				if((this.refundStatus && this.refundStatus != '-1') || this.refundStatus == 0) {
					param.append("refundStatus", this.refundStatus);
				}
				if(this.startDate) {
					let startDate = new Date(this.startDate).Format('yyyy-MM-dd');
					param.append("startDate", startDate);
				}
				if(this.endDate) {
					this.endDate = new Date(this.endDate).Format('yyyy-MM-dd');
					param.append("endDate", this.endDate);
				}
				if(this.keyWord != null) {
					param.append("keyWord", this.keyWord);
				}
				param.append("pageNum", this.pageNum);
				param.append("pageSize", this.pageSize);
				// console.log(param);
				axios.post(hostThrowLease, param).then((res) => {
					// console.log(res);
					if(res.data.code == 10000 && res.status == 200) {
						this.surrList = res.data.result.leaseList;
						this.totalNum = res.data.result.totalNum;
					}
				}).catch((err) => {
					// console.log(err);
				})
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.datas();
			},
			select(val) {
				this.isOffice = this.options[this.options.findIndex(item => item.dataName == val)].id;
			},
			select2(val) {
				this.refundStatus = this.options2[this.options2.findIndex(item => item.dataName == val)].id;
				console.log(this.refundStatus);
			},
			sous(){
				this.datas();
			}
		},
		created() {

		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
	@import '../../sass/page/_communityManagement.scss';
</style>
