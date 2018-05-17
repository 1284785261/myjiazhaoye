<template>
	<div id="artificialCertification">
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置：工作台 > </span>
					<router-link class="active" to="/signed/artificialCertification">人工认证列表</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>人工认证列表</h3>
					<span>{{Name}}</span>
				</div>
				<div id="artificialCertifications">
					<div>
						<table>
							<thead>
								<td>合同编号</td>
								<td>房间号</td>
								<td>认证状态</td>
								<td>姓名</td>
								<td>证件号码</td>
								<td>操作</td>
							</thead>
							<tr v-for="item in surrList">
								<td>{{item.contractNumber}}</td>
								<td>{{item.buildingNum}}</td>
								<td>{{item.status | CertificateStatus}}</td>
								<td>{{item.userName}}</td>
								<td>{{item.userCertificate}}</td>
								<td>
									<a v-if="item.status == 0" @click="showCertification(item.authId)">认证通过</a>
									<a v-if="item.status == 0" @click="opennotThrough(item.authId)">不通过</a>
									<router-link :to="{name:'Certificationdetaile',query:{authId:item.authId,Name:Name}}">查看详情</router-link>
								</td>
							</tr>
						</table>
						<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size=pageSize layout="prev, pager, next,total,jumper" :total=totalNum>
						</el-pagination>
					</div>
				</div>
			</div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
    	<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
		<div class="scherm" v-show="ishide">
		</div>
        <div class="Certification" v-show="ishideCertification">
            <h3>确定通过认证</h3>
            <a @click="determineCertification">确定</a>
            <a @click="noishideCertification">取消</a>
        </div>
		<div class="notThrough" v-show="notThrough">
            <textarea v-text="texts" v-model="texts" placeholder="请填写认证失败原因"></textarea>
            <a @click="notThroughs">确定</a>
            <a @click="closes">取消</a>
        </div>
	</div>
</template>

<script>
	import '../../sass/style/artificialCertification.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import  successModal from '../../components/successModal.vue';
  	import  warningModal from '../../components/warningModal.vue';
	import axios from 'axios';
	import { CxkjAuthList300225,AuthSuccess300228,AuthFail300227 } from '../api.js';
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
				surrList: {},
				Name:'',
				ishideCertification:false,
				authId:'',
				successModal:false,
				successMessage:"",
				warningModal:false,
				warningMessage:"",
				notThrough:false,
				texts:''
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
				// if((this.isOffice && this.isOffice != '-1') || this.isOffice == 0) {
				// 	param.append("isOffice", this.isOffice);
				// }
				// if((this.refundStatus && this.refundStatus != '-1') || this.refundStatus == 0) {
				// 	param.append("refundStatus", this.refundStatus);
				// }
				// if(this.startDate) {
				// 	let startDate = new Date(this.startDate).Format('yyyy-MM-dd');
				// 	param.append("startDate", startDate);
				// }
				// if(this.endDate) {
				// 	this.endDate = new Date(this.endDate).Format('yyyy-MM-dd');
				// 	param.append("endDate", this.endDate);
				// }
				// if(this.keyWord != null) {
				// 	param.append("keyWord", this.keyWord);
				// }
				param.append("pageNum", this.pageNum);
				param.append("pageSize", this.pageSize);
				// console.log(param);
				axios.post(CxkjAuthList300225, param).then((res) => {
					// console.log(res);
					if(res.data.code == 10000 && res.status == 200) {
						this.surrList = res.data.pageBean.page;
						this.totalNum = res.data.pageBean.totalNum;
					}
				}).catch((err) => {
					// console.log(err);
				})
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.datas();
			},
			closeWarningModal(){
				this.warningModal = false;
			},
			//弹出确定认证框
			showCertification(id){
				this.authId = id;
				this.ishide = true;
				this.ishideCertification = true;

			},
			//取消认证框
			noishideCertification(){
				this.ishide = false;
				this.ishideCertification = false;
			},
			//确定认证通过
			determineCertification(){
			  let vm = this
				axios.post(AuthSuccess300228,
				{
					authId:this.authId
				}).then((res)=>{
					// console.log(res);
					if(res.data.code == 10000 && res.status == 200){
						this.ishide = false;
						this.ishideCertification = false;
						this.successMessage = '认证通过!';
						this.successModal = true;
						setTimeout(function(){
              vm.successModal = false;
              vm.datas();
						},2000)
					}else{
						this.ishide = false;
						this.ishideCertification = false;
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				})
			},
			opennotThrough(id){
				this.authId = id;
				this.ishide = true;
				this.notThrough = true;
			},
			closes(){
				this.ishide = false;
				this.notThrough = false;
			},
			notThroughs(){
			  let vm = this
				axios.post(AuthFail300227,
          qs.stringify({
					authId:this.authId,
					remark:this.texts
				})).then((res)=>{
					// console.log(res);
					if(res.data.code == 10000 && res.status == 200){
						this.ishide = false;
						this.notThrough = false;
						this.successMessage = '认证不通过成功!';
						this.successModal = true;
						setTimeout(function(){
              vm.successModal = false;
              vm.datas();
						},2000)
					}else{
						this.ishide = false;
						this.notThrough = false;
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				})
				this.texts = ''
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
