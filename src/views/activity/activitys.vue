<template>
	<div id="housesub">
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置： </span>
					<router-link class="active" to="/activity/activitys">活动管理</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>活动管理</h3>
					<!--<span>佳兆业航运WEWA空间</span>-->
				</div>
				<div id="activitys">
					<div class="activitys1">
						<router-link to="/activity/addactivity" class="refund" v-if="jurisdiction('ACTIVITY_INCREASE')"> + 新增活动</router-link>
						<!-- <router-link :to="{path:'/activity/lookactivity',query:{id:item.activityId}}" style="margin-right: 15px;">查看</router-link> -->
					</div>
					<div v-if="Userlist != null">
						<table v-if="Userlist != null">
							<thead>
								<td width="80px">序号</td>
								<td>活动ID</td>
								<td>开始日期</td>
								<td>活动主题</td>
								<td>活动详情</td>
								<td>活动规则</td>
								<td>发起人</td>
								<td>发起日期</td>
								<td>状态</td>
								<td style="width:140px;">操作</td>

							</thead>
							<tr v-for="(item,index) in Userlist">
								<td>{{index+1}}</td>
								<td>{{item.activityNum}}</t d>
								<td>{{item.beginDate | time}}</td>
								<td>{{item.activityTheme}}</td>
								<td>{{item.activityContent}}</td>
								<td>{{item.endRule | endRule}}</td>
								<td v-if="item.userName">{{item.userName}}</td>
								<td v-if="item.createTime">{{item.createTime | time}}</td>
								<td v-else>--</td>
								<td :class="[{'ats':item.activityStatus == 0},{'ats2':item.activityStatus == 3},{'ats3':item.activityStatus == 2}]">{{item.activityStatus | Status}}</td>
								<td>
									<router-link :to="{path:'/activity/lookactivity',query:{id:item.activityId}}" style="padding:5px;">查看 </router-link>
									<a @click="zuofei(item)" v-if="item.activityStatus != 3 && jurisdiction('ACTIVITY_DELETE')" style="padding:5px;"> 作废</a>
									<a style="padding:5px;" v-if="item.activityStatus != 3 && jurisdiction('ACTIVITY_DELETE')" @click="binding(item)">绑定</a>
								</td>
							</tr>
						</table>
						<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size=pageSize2 layout="prev, pager, next,total,jumper" :total=totalNum>
						</el-pagination>
					</div>
					<div v-else class="kbt">
		    			<img src="../../../static/images/icon/kts_03.png" style="margin-top: 150px;">
		    		</div>
				</div>
			</div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
		<div class="lose" v-show="isShow1">
			<span>确认<i>作废</i>以下活动吗？</span>
			<p></p>
			<a @click="qsm1">确定</a>
			<a @click="qb1">取消</a>
		</div>
		<div class="scherm" v-show="isHide">
		</div>
		<div class="scherm" v-show="isHide2" @click="mt">
		</div>
		<div class="lose2" v-show="isShow2">
			<p>新增活动推广入口</p>
			<table>
				<tr>
					<td>活动ID：</td>
					<td>{{ids}}</td>
				</tr>
				<tr>
					<td>URL：</td>
					<td><Input v-model="acitveurl"  placeholder="请填写活动URL"></Input></td>
				</tr>
			</table>
			<a @click="generalize">确定</a>
		</div>
	</div>
</template>

<script>
	import '../../sass/style/activitys.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import axios from 'axios';
	import { hostActivity,hostActivityModify,hostActivityInvite } from '../api.js';
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
				activeTabName:"activitys",
				successModal: false,
				warningModal: false,
				successMessage: '添加部门成功',
				warningMessage: '添加部门失败，请检查是否重复',
				currentPage3: 1,
				radio: '1',
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
				pageSize2: 5,
				totalNum: 0,
				pageNum: '1',
				Userlist: null,
				isHide:false,
				isHide2:false,
				isShow1:false,
				isShow2:false,
				activityId:'',
				acitveurl:'',
				ids:'',
				idss:''
			}
		},
		mounted() {
			this.datas();
		},
		filters: {
			time(val) {
					return new Date(val).Format('yyyy-MM-dd');
			},
			Status(val){
				if(val == '0'){
					return '即将开始';
				}
				else if(val == '1'){
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
				if(val){
					let arr=[];
					arr = val.split(",");
					for(let i = 0 ;i<arr.length;i++){
						if(arr[i] == '0' && arr.length ==1){
							return '到期结束'
						}
						else if(arr[i] == '1' && arr.length ==1){
							return '送完即止'
						}
						else if(arr[0] == '2' && arr.length ==1){
							return '长期有效'
						}
						else if(arr[i] == '0' || arr[i] == '1'){
							return '到期结束 + 送完即止'
						}
					}
				}

			}
		},
		methods: {
			handleCurrentChange(val) {
				this.pageNum = val;
				this.datas();
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
						this.Userlist = res.data.result.activityList;
						this.totalNum = res.data.result.totalNum;
					}
				}).catch((err) => {
					// console.log(err);
				})
			},
			closeWarningModal() {
				this.warningModal = false;
			},
			zuofei(item){
				this.isHide = true;
				this.isShow1 = true;
				// console.log(item);
				this.activityId = item.activityId;
			},
			binding(item){
				this.ids = item.activityNum;
				this.idss = item.activityId;
				this.acitveurl = item.inviteUrl?item.inviteUrl:'';
				this.isHide2 = true;
				this.isShow2 = true;
			},
			generalize(){
				let param = new FormData();
				if(this.idss){
					param.append('activityId',this.idss);
				}
				if(this.acitveurl){
					param.append('inviteUrl',this.acitveurl);
				}
				axios.post(hostActivityInvite, param).then((res)=>{
					if(res.status == 200 && res.data.code == 10000){
						this.isHide2 = false;
						this.isShow2 = false;
						this.successMessage = '设置成功'
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
						}, 1000);
					}
					else{
						this.warningMessage = res.data.content;
//                         this.successModal = false
						this.warningModal = true;
                      this.isHide2 = false;
                      this.isShow2 = false;
                      return

					}
				}).catch((err)=>{
					console.log(err);
				})
			},
			mt(){
				this.isHide2 = false;
				this.isShow2 = false;
			},
			qb1(){
				this.isHide = false;
				this.isShow1 = false;
			},
			qsm1(){
				//hostActivityModify
				this.isHide = false;
				this.isShow1 = false;
				axios.post(hostActivityModify,
					qs.stringify({
						activityId:this.activityId,
						activityStatus:3
					})
				).then((res)=>{
					// console.log(res);
					if(res.status == 200 &&res.data.code == 10000){
						this.successMessage = '操作成功'
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							this.datas();
						}, 1000);
					}
					else{
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				}).catch((err)=>{
					// console.log(err);
					this.warningMessage = '操作失败，服务器异常';
					this.warningModal = true;
				})
			}
		},
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
</style>
