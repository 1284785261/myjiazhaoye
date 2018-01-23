<template>
	<div class="hous">
		<menu-box  :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/signed/houseState">公寓状态</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>公寓状态</h3>
		          <span>{{name}}</span>
		        </div>
		    	<div id="shortDetail">
		    		<div class="shortdetail1">
		    			<span>{{Datas.roomNum}}房间</span>
		    			<span>{{Datas.cxkjCommunityHousetype.housetypeName}}</span>
		    			<span>操作</span>
		    		</div>
		    		<table>
		    			<tr>
		    				<td width="15%">房间信息：</td>
		    				<td v-if="Datas.cxkjCommunityHousetype">
		    					<p>格局：{{Datas.cxkjCommunityHousetype.roomId}}室{{Datas.cxkjCommunityHousetype.housetypeHall}}厅{{Datas.cxkjCommunityHousetype.housetypeHygienism}}卫 {{Datas.cxkjCommunityHousetype.housetypeWindow}}</p>
		    					<p>面积：{{Datas.cxkjCommunityHousetype.housetypeArea}}m²</p>
		    					<p>租金：<span>{{Datas.roomRent | roomRent}}</span></p>
		    				</td>
		    				<td width="20%" rowspan="2">
		    					<a @click="instas()">入住登记</a>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>配置：</td>
		    				<td><span>{{Datas.roomFurniture}}</span></td>
		    				
		    			</tr>
		    			<tr>
		    				<td>租约信息：</td>
		    				<td v-if="Datas.cxkjContractSign">
		    					<p>合同编码：{{Datas.cxkjContractSign.contractNumber}}</p>
		    					<p>状态：<span>{{Datas.cxkjContractSign.contractState | contractState}}</span></p>
		    					<p>租期：{{Datas.cxkjContractSign.beginDate | beginDate}}--{{Datas.cxkjContractSign.endDate | endDate}}</p>
		    				</td>
		    				<td v-else>
		    					<p>合同编码：无</p>
		    					<p>状态：<span>无</span></p>
		    					<p>租期：无</p>
		    				</td>
		    				<td rowspan="3">
		    					<a>一键换房</a>
		    					<a @click="openrelet">续租</a>
                                <a>添加收款</a>
                                <a>添加退款</a>
		    					<a>退房确认</a>
		    					<a>开发票</a>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>承租人：</td>
		    				<td v-if="Datas.cxkjContractSign">
		    					<span >{{Datas.cxkjContractSign.user.userName}}</span>
		    					<span>联系电话：{{Datas.cxkjContractSign.user.userPhone}}</span>
		    				</td>
		    				<td v-else>
								<span >无</span>
		    					<span>联系电话：无</span>
							</td>
		    			</tr>
		    			<tr>
		    				<td>
		    					支付：
		    				</td>
		    				<td>
		    					<p v-if="Datas.cxkjContractSign != null">押金：{{Datas.cxkjContractSign.deposit | deposit}}<span>租金：{{Datas.cxkjContractSign.cyclePayMoney | cyclePayMoney}}</span></p>
		    					<p v-else>押金：无<span>租金：无</span></p>
		    					<p v-if="Datas.cxkjContractSign != null && Datas.cxkjContractSign.serviceCost != null">服务费：{{Datas.cxkjContractSign.serviceCost | cyclePayMoney}}</p>
								<p v-else>服务费：无</p>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>
		    				</td>
		    				<td>
		    					<p v-if="Datas.cxkjBill != null">租金账单{{Datas.cxkjBill.billState | billState}}</p>
		    					<p v-else></p>
		    					<p v-if="Datas.waterEnergyBill != null">水电账单{{Datas.waterEnergyBill.payStatus | payStatus}}</p>
		    					<p v-else></p>
		    				</td>
		    				<td>
		    					<a>增值服务操作</a>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>门锁状态：</td>
		    				<td v-if="roomLockWaterElect"><span v-if="roomLockWaterElect.lockStatus">{{roomLockWaterElect.lockStatus | Status}}</span>
		    					<span v-else>离线</span>
		    					<span>序列号：{{roomLockWaterElect.sn}}</span>
		    				</td>
		    				<td v-else>
		    					暂无
		    				</td>
		    				<td rowspan="3">
		    					<router-link :to="{name:'doorRecord',query:{roomLockId:roomLockWaterElect.roomLockId}}" v-if="roomLockWaterElect">开门记录</router-link>
		    					<a>获取门锁密码</a>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>水表状态：</td>
		    				<td v-if="roomLockWaterElect">
		    					<span>{{roomLockWaterElect.waterStatus | Status2}}</span>
		    					<span>序列号：{{roomLockWaterElect.waterMeterSn}}</span>
		    					<p>{{roomLockWaterElect.waterType | type}} <b> {{roomLockWaterElect.waterPrice | Price}}</b>元/吨</p>
		    				</td>
		    				<td v-else>
		    					<span>暂无</span>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>电表状态：</td>
		    				<td v-if="roomLockWaterElect">
		    					<span>{{roomLockWaterElect.electricityStatus | Status2}}</span>
		    					<span>序列号：{{roomLockWaterElect.electricityMeterSn}}</span>
		    					<p>{{roomLockWaterElect.electricType | type}} <b> {{roomLockWaterElect.energyPrice | Price}}</b>元/度</p>
		    				</td>
		    				<td v-else>
		    					<span>暂无</span>
		    				</td>
		    			</tr>
		    		</table>
		    		
		    	</div> 
		        
		    
			</div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
		<div class="zhezha" v-show="isHide">
			
		</div>
		<div class="checkIn" v-show="isHide1">
			<p>房号：101<span style="margin-left: 40px;">标准大单间</span></p>
            <p>房间信息：<span class="span1">格局：daodjaod </span><span class="span1">面积：35.00 m²</span></p>
            <p>定房电话：<input class="ivu-input" style="width:130px;"> 定房姓名：王大妈</p>
            <p>门市价：</p>
            <p>入住时间：<Date-picker type="date" :options="option3" placeholder="选择日期"></Date-picker></p>
            <p>预计退房日期：<Date-picker type="date" :options="option3" placeholder="选择日期"></Date-picker> 
               入住天数： 
                <Select v-model="stationCommunity" style="width:70px">
                    <Option v-for="community in  stationSelectList" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                </Select>
            </p>
            <p>备注：<input class="ivu-input" style="width:300px;"> 
                市场细分：
                <Select v-model="stationCommunity" style="width:180px">
                    <Option v-for="community in  stationSelectList" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                </Select>
            </p>
            <p>入住人：
                <ul>
                    <li>
                        姓名：<input class="ivu-input " style="width:80px;">
                        <el-radio class="radio" v-model="radio" label="1">男</el-radio>
                        <el-radio class="radio" v-model="radio" label="2">女</el-radio>
                        <Select v-model="stationCommunity" style="width:120px">
                            <Option v-for="community in  stationSelectList" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                        </Select>
                        <input class="ivu-input" style="width:250px;">
                    </li>
                </ul>
            </p>
            <a @click="checkIn()">提交</a>
            <a @click="notcheckIn()">取消</a>
            <span style="margin-left: 40px;color:red;">点击提交发送密码短信至登录人的手机中</span>
		</div>
        <div class="relet" v-show="isHide2">
            <i class="el-icon-circle-close"></i>
            <ul>
                <li>
                    <p>入住时间：1207/6/03 <span>已住天数：3天</span></p>
                </li>
                <li>
                    原预计离店日期<Date-picker type="date" :options="option3" placeholder="选择日期"></Date-picker>
                </li>
                <li>
                    续租天数：
                    <Select v-model="stationCommunity" style="width:70px;height:35px;">
                        <Option v-for="community in  stationSelectList" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                    </Select>
                    预计退房日期：
                    <Date-picker type="date" :options="option3" placeholder="选择日期"></Date-picker>
                </li>
            </ul>
            <a @click="checkIn()">提交</a>
            <a @click="notcheckIn()">取消</a>
        </div>
	</div>
</template>

<script>
	
	import '../../sass/style/shortDetails.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
    import axios from 'axios';
    import { hostRoominfo,hostPrice } from '../api.js';
    import qs from 'qs';
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox,
    		successModal,
			warningModal
    	},
    	data(){
    		return{
				activeTabName:"workbench",
                isHide:false,
                isHide1:false,
                isHide2:false,
    			roomid:null,
    			Datas:null,
    			money:null,
				texs:null,
				name:null,
    			communityId:null,
    			successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
                roomLockWaterElect:null,
                radio: '1'
		   	}
    	},
    	filters:{
    		Status(val){
    			if(val == 1){
    				return '在线'
    			}
    			else if(val == 2){
    				return '离线'
    			}
    			else if(val == 3){
    				return '关闭'
    			}
    		},
    		Status2(val){
    			if(val == 1){
    				return '在线'
    			}
    			else if(val == 2){
    				return '离线'
    			}
    			else if(val == 3){
    				return '关闭'
    			}
    		},
    		Price(val){
    			if(val){
    				return parseFloat(val).toFixed(2);
    			}else{
    				return 0;
    			}
    			
    		},
    		type(val){
    			if(val == 1){
    				return '按用量'
    			}
    			else if(val == 2){
    				return '按合租人数'
    			}
    		},
    		deposit(val){
    			if(val == null){
    				return '无'
    			}
    			else if(val !=null){
    				return parseFloat(val).toFixed(2)+'元';
    			}
    		},
    		cyclePayMoney(val){
    			if(val == null){
    				return '无'
    			}
    			else if(val !=null){
    				return parseFloat(val).toFixed(2)+'元';
    			}
    		},
    		beginDate(val){
				var date = new Date(val);
				var Y = date.getFullYear() + '.';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
				return Y + M + D;
    		},
    		endDate(val){
    			var date = new Date(val);
				var Y = date.getFullYear() + '.';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
				return Y + M + D;
    		},
    		serviceCost(val){
    			if(val != null){
    				return parseFloat(val).toFixed(2)+'元';
    			}
    		},
    		contractState(val){
    			if(val == 1){
    				return '待确认'
    			}
    			else if(val == 2){
    				return '待付款'
    			}
    			else if(val == 3){
    				return '待付首款'
    			}
    			else if(val == 4){
    				return '履约中'
    			}
    			else if(val == 5){
    				return '退租中'
    			}
    			else if(val == 6){
    				return '退组办结'
    			}
    			else if(val == 7){
    				return '违约'
    			}
    			else if(val == 8){
    				return '违约办结'
    			}
    			else if(val == 9){
    				return '到期办结'
    			}
    			
    		},
    		billState(val){
    			if(val == 1){
    				return '待支付'
    			}
    			else if(val == 2){
    				return '已支付'
    			}
    			else if(val == 3){
    				return '违约'
    			}
    			else if(val == 4){
    				return '违约办结'
    			}
    		},
    		payStatus(val){
    			if(val == 1){
    				return '待支付'
    			}
    			else if(val == 2){
    				return '已支付'
    			}
    			else if(val == 3){
    				return '违约'
    			}
    			else if(val == 4){
    				return '违约办结'
    			}
    		},
    		roomRent(val){
    			if(val != null){
    				return parseFloat(val).toFixed(2)+'元';
    			}
    		}
    	},
    	mounted(){
    		this.roomid = this.$route.query.id;
			this.communityId = this.$route.query.ids;
			this.name = this.$route.query.name;
    		this.datas();
    	},
    	methods:{
    		instas:function(){
                this.isHide = true;
    			this.isHide1 = true;
			},
			jiage(value){
				let str = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
				if(str.test(value) == true){
					this.money = value;
				}
				else{
					this.money = '';
				}
			},
    		datas(){
    			axios.post(hostRoominfo,
    				qs.stringify({
    					roomId:this.roomid
    				})
    			)
    			.then((response) => {
    				// console.log(response);
    				if(response.status == 200 && response.data.code == 10000){
    					this.Datas = response.data.entity;
    					if(this.Datas.roomLockWaterElect){
    						this.roomLockWaterElect = this.Datas.roomLockWaterElect;
    					}
    				}
    			})
    			.catch((error) => {
    				// console.log(error);
    			})
    		},
    		closeWarningModal() {
				this.warningModal = false;
				this.isHide = ! this.isHide;
			},
    		checkIn(){
    			if(this.money ==null ||this.texs == null){
    				this.warningMessage = '信息填入不完整，请补充完信息';
                    this.warningModal = true;
                    this.isHide = false;
                    this.isHide1 = false;
    			}
    			else{
					this.isHide = false;
    				axios.post(hostPrice,
    				qs.stringify({
    					communityId:this.communityId,
    					roomId:this.roomid,
    					newPrice:this.money,
    					reason:this.texs
    				})
	    			).then((response) =>{
	    				// console.log(response);
	    				if(response.status == 200 && response.data.code == 10000){
	    					this.successMessage = '申请调价成功';
							this.successModal = true;
							this.money = null;
							this.texs = null;
	    					setTimeout(() => {
								this.successModal = false;
							}, 2000);
	    				}
	    				else{
	    					this.warningMessage = res.data.content;
							this.warningModal = true;
                            this.isHide = false;
                            this.isHide1 = false;
	    				}
	    				
	    			})
	    			.catch((error)=>{
	    				// console.log(error);
	    				this.warningMessage = '申请调价失败';
						this.warningModal = true;
                        this.isHide = false;
                        this.isHide1 = false;
	    			})
				}
    			
            },
            notcheckIn(){
                this.isHide = false;
                this.isHide1 = false;
            },
            openrelet(){
                this.isHide = true;
                this.isHide2 = true;
            }
    	
    	},
    	created(){
    		
			
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  	.ivu-icon-ios-calendar-outline {
			color: #038be2;
			font-family: "iconfont" !important;
			font-size: 18px;
			font-style: normal;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			&:before {
				content: "\e60c";
			}
	}
  	.form-search {
			position: relative;
			margin-top: 20px;
			margin-bottom: 20px;
			margin-left: 50px;
			display: inline-block;
			.ivu-input-wrapper {
				width: auto;
			}
			input[type="text"] {
				width: 208px;
				height: 36px;
				border-radius: 0;
				padding-left: 30px;
			}
			i {
				position: absolute;
				left: 5px;
				top: 7px;
				z-index: 99;
				font-size: 18px;
				color: #999;
			}
			input[type=button] {
				width: 70px;
				text-align: center;
				height: 36px;
				line-height: 36px;
				background-color: #038be2;
				color: #fff;
				border: none;
				position: relative;
				left: -5px;
				top: 1px;
			}
		}
</style>