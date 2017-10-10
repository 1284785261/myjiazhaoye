<template>
	<div id="housesubscrib">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置： </span>
					<router-link class="active" to="/apartment/workbench">活动管理</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>活动管理</h3>
					<span>佳兆业航运WEWA空间</span>
				</div>
				<div id="activitys">
					<div class="activitys1">
						<router-link to="/activity/addactivity" class="refund"> + 新增活动</router-link>
					</div>
					<table>
						<thead>
							<td>序号</td>
							<td>活动ID</td>
							<td>开始日期</td>
							<td>活动主题</td>
							<td width="500px">活动详情</td>
							<td>活动规则</td>
							<td>发起人</td>
							<td>发起日期</td>
							<td>状态</td>
							<td>操作</td>

						</thead>
						<tr v-for="(item,index) in Userlist">
							<td>{{item.activityId}}</td>
							<td>{{item.activityNum}}</td>
							<td>{{item.beginDate | time}}</td>
							<td>{{item.activityTheme}}</td>
							<td>{{item.activityContent}}</td>
							<td>{{item.endRule | endRule}}</td>
							<td>{{item.user.userName}}</td>
							<td v-if="item.createTime">{{item.createTime | time}}</td>
							<td v-else>--</td>
							<td :class="[{'ats':item.activityStatus == 0},{'ats2':item.activityStatus == 3},{'ats3':item.activityStatus == 2}]">{{item.activityStatus | Status}}</td>
							<td>
								<router-link :to="{path:'/activity/lookactivity',query:{id:item.activityId}}" style="margin-right: 15px;">查看</router-link>
								<a>作废</a>
							</td>
						</tr>
					</table>
					<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size=pageSize2 layout="prev, pager, next,total,jumper" :total=totalNum>

					</el-pagination>
				</div>
			</div>
			<footer-box></footer-box>
		</div>

	</div>
</template>

<script>
	import '../../sass/style/activitys.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import axios from 'axios';
	import { hostActivity } from '../api.js';
	import qs from 'qs';

	export default {
		components: {
			rightHeader,
			menuBox,
			footerBox
		},
		data() {
			return {
				currentPage3: 1,
				radio: '1',
				ishide: false,
				ishide2: false,
				ishide3: false,
				options8: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				value: '',
				pageSize2: 10,
				totalNum: 0,
				pageNum: '1',
				Userlist: {}
			}
		},
		mounted() {
			this.datas();
		},
		filters: {
			time(val) {
				if(val) {
					return new Date(val).Format('yyyy-MM-dd');
				}
			},
			Status(val){
				if(val == '1'){
					return '有效';
				}
				else if(val == '2'){
					return '结束';
				}
				else if(val == '3'){
					return '作废';
				}
			},
			endRule(val){
				if(val == '0'){
					return '到期结束'
				}
				else if(val == '1'){
					return '送完即止'
				}
				else if(val == '2'){
					return '长期有效'
				}
				else if(val == '0,1'){
					return '到期结束+送完即止'
				}
				else if(val == '0,2'){
					return '到期结束+长期有效'
				}
				else if(val == '1,2'){
					return '送完即止+长期有效'
				}
				else if(val == '0,1,2'){
					return '到期结束+送完即止+长期有效'
				}
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.pageNum = val;
			},
			adddian() {
				this.ishide = !this.ishide;
				this.ishide2 = !this.ishide2;
			},
			adddian2() {
				this.ishide = !this.ishide;
				this.ishide3 = !this.ishide3;
			},
			datas() {
				let pageNum = this.pageNum; //获取活动的列表信息
				let pageSize = this.pageSize2;
				axios.post(hostActivity,
					qs.stringify({
						pageNum: pageNum,
						pageSize: pageSize
					})
				).then((res) => {
					console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						this.Userlist = res.data.entity.page;
						this.totalNum = res.data.entity.totalNum;
					}
				}).catch((err) => {
					console.log(err);
				})
			}
		},
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
</style>