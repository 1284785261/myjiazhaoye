<template>
	<div id="Certificationdetaile">
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置：工作台 > </span>
					<router-link class="active" to="/signed/artificialCertification">人工认证详情</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>人工认证详情</h3>
					<span>{{Name}}</span>
				</div>
				<div id="Certificationdetailes">
					<div class="Certificationdetailes1">
						<h3>基本信息</h3>
						<table>
							<tr>
								<td>姓名：</td>
								<td>{{surrList.userName}}</td>
							</tr>
							<tr>
								<td>证件号码：</td>
								<td>{{surrList.userCertificate}}</td>
							</tr>
							<tr>
								<td>认证状态：</td>
								<td>{{surrList.status | status}}</td>
							</tr>
						</table>
					</div>
					<div class="Certificationdetailes2">
						<h3>证件信息</h3>
						<table>
							<tr v-for="item in imglist">
								<td style="vertical-align:top;">{{item.title}}</td>
								<td>
									<img :src="item.img">
								</td>
							</tr>
						</table>
						<a style="margin-left:160px;" @click="determineCertification" v-if="surrList.status == 0">通过验证</a>
						<a  @click="showCertification" v-if="surrList.status == 0">验证不通过</a>
						<a @click="closes" v-if="surrList.status == 0">取消</a>
					</div>
				</div>
			</div>
			<footer-box></footer-box>
		</div>
    <div class="scherm" v-show="ishide"></div>
    <div class="notThrough" v-show="notThrough">
      <textarea  v-model="texts" placeholder="请填写认证失败原因"></textarea>
      <a @click="notThroughs">确定</a>
      <a @click="shutDown">取消</a>
    </div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
    	<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
	</div>
</template>

<script>
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import  successModal from '../../components/successModal.vue';
  	import  warningModal from '../../components/warningModal.vue';
	import axios from 'axios';
	import { CxkjAuthList300225,AuthSuccess300228,AuthFail300227,AuthInfo300226,imgPath } from '../api.js';
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
				surrList: {},
				Name:'',
				authId:'',
				successModal:false,
				successMessage:"",
				warningModal:false,
				warningMessage:"",
				imglist:[{
					img:'',
					title:'身份证正面照：'
				},{
					img:'',
					title:'身份证反面照：'
				},{
					img:'',
					title:'手持身份证正面照：'
				}],
        ishide:false,
        notThrough:false,
        texts:''
			}
		},
		mounted() {
			this.authId = this.$route.query.authId;
			this.Name = this.$route.query.Name;
			this.datas();
		},
		filters: {
			status(val){
				if(val == 0){
					return '未认证';
				}else if(val == 1){
					return '认证通过'
				}else if(val == 2){
					return '认证失败'
				}
			}
		},
		methods: {
			datas() {
				axios.post(AuthInfo300226,
				qs.stringify({
					authId:this.authId
				})).then((res) => {
					// console.log(res);
					if(res.data.code == 10000 && res.status == 200) {
						this.surrList = res.data.entity;
						let arr = this.surrList.certificateImage.split(',');
						for(let i = 0;i<arr.length;i++){
							this.imglist[i].img = imgPath + arr[i];
						}
					}
				})
			},
			closeWarningModal(){
				this.warningModal = false;
			},
			//确定认证通过
			determineCertification(){
				axios.post(AuthSuccess300228,
          qs.stringify({
					authId:this.authId
				})).then((res)=>{
					// console.log(res);
					if(res.data.code == 10000 && res.status == 200){
						this.successMessage = '认证通过!';
						this.successModal = true;
						setTimeout(function(){
							this.successModal = false;
							this.datas();
						},2000)
					}else{
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				})
			},
      /**
       * 认证不通过弹框
       * **/
      showCertification(){
        this.ishide = true;
        this.notThrough = true;
      },
      /**
       * 认证不通过提交事件
       **/
      notThroughs(){
        let vm = this
        this.$http.post(AuthFail300227,
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
      },
      /**
       * 认证不通过取消事件
       **/
      shutDown(){
        this.ishide = false;
        this.notThrough = false;
      },
			closes(){
				this.$router.back(-1);
			}
		},
		created() {

		}
	}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
	@import '../../sass/page/_communityManagement.scss';

	#Certificationdetaile{
		#Certificationdetailes{
			width: 100%;
			min-height: 1000px;
			background: #fff;
			overflow: hidden;
			box-shadow: 0 3px 1px #ccc;
			position: relative;
			.Certificationdetailes1{
				width: 95%;
				margin-left: 2.5%;
				min-height: 185px;
				border-bottom: 1px dashed #666;
				h3{
					font-size: 20px;
					line-height: 50px;
				}
				table{
					margin-left: 20px;
					tr{
						line-height: 40px;
						font-size: 16px;
						text-align: left;
						td:nth-child(1){
							text-align: right;
						}
						td:nth-child(2){
							text-align: left;
						}
					}
				}
			}
			.Certificationdetailes2{
				width: 95%;
				margin-left: 2.5%;
				h3{
					font-size: 20px;
					line-height: 50px;
				}
				table{
					margin-left: 20px;
					tr{
						font-size: 16px;
						text-align: left;
						td:nth-child(1){
							text-align: right;
						}
						td:nth-child(2){
							text-align: left;
						}
						td{
							img{
								width: 350px;
								height: 180px;
								margin-bottom: 20px;

							}
						}
					}
				}
				a{
					width: 140px;
					height: 36px;
					margin-left: 70px;
					line-height: 36px;
					border-radius: 5px;
					display: inline-block;
					background: #038BE2;
					border: 1px solid #038BE2;
					color: #fff;
					margin-top: 30px;
					text-align: center;

				}
			}
		}
	}
</style>
