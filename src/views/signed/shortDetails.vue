<template>
	<div class="hous">
		<menu-box  :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<!-- <div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/signed/houseState">公寓状态</router-link>
		        </div> -->
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>短租状态</h3>
		        </div>
		    	<div id="shortDetail">
		    		<div class="shortdetail1">
		    			<span v-if="Datas.roomNum">{{Datas.roomNum}}房间</span>
		    			<span>{{Datas.name}}</span>
		    			<span>操作</span>
		    		</div>
		    		<table>
		    			<tr>
		    				<td width="15%">房间信息：</td>
		    				<td>
		    					<p>房型：{{Datas.name}}</p>
		    					<p>面积：{{Datas.housetypeArea}}m²</p>
		    					<p>租金：<span>{{Datas.price | roomRent}}</span></p>
		    				</td>
		    				<td width="20%" rowspan="2">
		    					<a @click="instas()">入住登记</a>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>配置：</td>
		    				<td><span v-for="item in roomconfiguration" :key="item" style="line-height:40px;">{{item }} </span></td>
		    				
		    			</tr>
		    			<tr>
		    				<td>租约信息：</td>
		    				<td v-if="Datas.pmsOrder">
		    					<p>订单编号：{{Datas.pmsOrder.orderNum}}</p>
		    					<p>状态：<span>{{Datas.pmsOrder.orderState | orderState}}</span></p>
		    					<p>租期：{{Datas.pmsOrder.inTime | inTime}}--{{Datas.pmsOrder.leaveTime | leaveTime}}<span>{{Datas.pmsOrder.day}}天</span></p>
		    				</td>
		    				<td v-else>
		    					<p>订单编号：</p>
		    					<p>状态：<span>无</span></p>
		    					<p>租期：无</p>
		    				</td>
		    				<td rowspan="3">
		    					<a @click="openroom">一键换房</a>
		    					<a @click="openrelet">续租</a>
                                <a @click="opengathering">添加收款</a>
                                <a @click="openrefund">添加退款</a>
		    					<a @click="opencheckout">退房确认</a>
		    					<a>开发票</a>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>承租人：</td>
		    				<td v-if="Datas.pmsOrder">
		    					<span v-if="Datas.pmsOrder.userName">{{Datas.pmsOrder.userName}}</span>
		    					<span v-if="Datas.pmsOrder.userPhone">联系电话：{{Datas.pmsOrder.userPhone}}</span>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>
		    					支付：
		    				</td>
		    				<td>
		    					<p>罚款金额：</p>
								<ul>
									<li>aaa</li>
								</ul>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>
		    				</td>
		    				<td>
								<ul v-for="item in pmsRoomService">
									<li><span>{{item.serviceName}} *{{item.count}} </span><span style="color:#ef751b;">￥{{item.totalMoney}}</span></li>
								</ul>
		    				</td>
		    				<td>
		    					<a @click="openservices">增值服务操作</a>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>门锁状态：</td>
		    				<td v-if="lockWaterElectricity">
								<span v-if="lockWaterElectricity.lockStatus">{{lockWaterElectricity.lockStatus | Status}}</span>
		    					<span v-else>离线</span>
		    					<span v-if="lockWaterElectricity.sn">序列号：{{lockWaterElectricity.sn}}</span>
								<span v-else>序列号：暂无</span>
		    				</td>
		    				<td v-else>
		    					暂无
		    				</td>
		    				<td rowspan="3">
		    					<router-link :to="{name:'doorRecord',query:{roomLockId:lockWaterElectricity.roomLockId}}" v-if="lockWaterElectricity" class="butsbr">开门记录</router-link>
		    					<a class="butsbr">获取门锁密码</a>
								<ul>
									<li><a>设置为【配置中】</a></li>
									<li><a>设置为【脏房】</a></li>
									<li><a>设置为【待出租】</a></li>
								</ul>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>水表状态：</td>
		    				<td v-if="lockWaterElectricity">
		    					<span v-if="lockWaterElectricity.waterStatus">{{lockWaterElectricity.waterStatus | Status2}}</span>
		    					<span v-if="lockWaterElectricity.waterMeterSn">序列号：{{lockWaterElectricity.waterMeterSn}}</span>
								<span v-else>序列号：暂无</span>
		    					<p>{{lockWaterElectricity.waterType | type}} <b> {{lockWaterElectricity.waterPrice | Price}}</b>元/吨</p>
		    				</td>
		    				<td v-else>
		    					<span>暂无</span>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>电表状态：</td>
		    				<td v-if="lockWaterElectricity">
		    					<span v-if="lockWaterElectricity.electricityStatus">{{roomLockWaterElect.electricityStatus | Status2}}</span>
		    					<span v-if="lockWaterElectricity.electricityMeterSn">序列号：{{roomLockWaterElect.electricityMeterSn}}</span>
								<span v-else>序列号：暂无</span>
		    					<p>{{lockWaterElectricity.electricType | type}} <b> {{lockWaterElectricity.energyPrice | Price}}</b>元/度</p>
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
		<check-In @notcheckIn="notcheckIn()" v-show="isHide1"></check-In>
        <div class="relet" v-show="isHide2">
            <i class="el-icon-circle-close"></i>
            <ul style="margin-top: 15px;">
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
            <a @click="relet()">提交</a>
            <a @click="notrelet()">取消</a>
        </div>
		<room-Change @notroomChange="notroomChange()" v-show="isHide3"></room-Change>
		<div class="addgathering" v-show="isHide4">
			<table>
				<tr>
					<td>收款金额：</td>
					<td><input class="ivu-input" style="width:100px;"></td>
				</tr>
				<tr>
					<td>收款原因：</td>
					<td><input class="ivu-input" style="width:200px;"></td>
				</tr>
			</table>
			<a @click="addgathering()">提交</a>
            <a @click="closegathering()">取消</a>
		</div>
		<div class="addrefund" v-show="isHide5">
			<table>
				<tr>
					<td>退款金额：</td>
					<td><input class="ivu-input" style="width:100px;"></td>
				</tr>
				<tr>
					<td>退款原因：</td>
					<td><input class="ivu-input" style="width:200px;"></td>
				</tr>
			</table>
			<a @click="addrefund()">提交</a>
            <a @click="closerefund()">取消</a>
		</div>
		<div class="checkout" v-show="isHide6">
			<div></div>
			<h2>确认要退房吗？</h2>
			<a @click="checkout()">确认退房</a>
            <a @click="closecheckout()">取消</a>
		</div>
		<div class="addservices" v-show="isHide7">
			<p>
				增值服务
			</p>
			<el-checkbox-group v-model="checkList">
				<el-checkbox label="双人早餐"></el-checkbox><span class="money">￥20</span>
				<el-checkbox label="早餐"></el-checkbox><span class="money">￥20</span>
				<el-checkbox label="唱吧"></el-checkbox><span class="money">￥20</span>
				<el-checkbox label="自助餐"></el-checkbox><span class="money">￥20</span>
				<el-checkbox label="咖啡"></el-checkbox><span class="money">￥20</span>
			</el-checkbox-group>
			<a @click="addservices()">提交</a>
            <a @click="closeservices()">取消</a>
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
	import checkIn from '../../components/checkIn.vue';
	import roomChange from '../../components/roomChange.vue';
    import axios from 'axios';
    import { hostRoominfo,hostPrice,ShortPmsRoomInfo200213 } from '../api.js';
    import qs from 'qs';
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox,
    		successModal,
			warningModal,
			checkIn,
			roomChange
    	},
    	data(){
    		return{
				activeTabName:"workbench",
                isHide:false,
                isHide1:false,
				isHide2:false,
				isHide3:false,
				isHide4:false,
				isHide6:false,
				isHide7:false,
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
                lockWaterElectricity:null,
				radio: '1',
				checkList: [],
				roomconfiguration:[],//房间配置信息
				pmsRoomService:[]//房间增值服务信息
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
    		inTime(val){
				var date = new Date(val);
				var Y = date.getFullYear() + '/';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
				return Y + M + D;
    		},
    		leaveTime(val){
    			var date = new Date(val);
				var Y = date.getFullYear() + '/';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
				return Y + M + D;
    		},
    		serviceCost(val){
    			if(val != null){
    				return parseFloat(val).toFixed(2)+'元';
    			}
    		},
    		orderState(val){
    			if(val == 1){
    				return '待支付'
    			}
    			else if(val == 2){
    				return '已支付'
    			}
    			else if(val == 3){
    				return '已取消'
    			}
    			else if(val == 4){
    				return '应到未到'
    			}
    			else if(val == 5){
    				return '已完结'
    			}
    			else if(val == 6){
    				return '已退未结'
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
			// console.log(this.$route.query);
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
    			axios.post(ShortPmsRoomInfo200213,
    				qs.stringify({
    					roomId:this.roomid
    				})
    			)
    			.then((response) => {
    				console.log(response);
    				if(response.status == 200 && response.data.code == 10000){
						this.Datas = response.data.entity;
						if(this.Datas.lockWaterElectricity){
							this.lockWaterElectricity = this.Datas.lockWaterElectricity;
						}
						
						let arr = JSON.parse(this.Datas.materials);
						console.log(arr);
						for(let i = 0;i<arr.length;i++){
							this.roomconfiguration.push(arr[i].materialName);
						}
    					if(this.Datas.pmsOrder.pmsRoomService){
    						this.pmsRoomService = this.Datas.pmsOrder.pmsRoomService;
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
			},
			notrelet(){
				this.isHide = false;
                this.isHide2 = false;
			},
			notroomChange(){
				this.isHide = false;
                this.isHide3 = false;
			},
			openroom(){
				this.isHide = true;
                this.isHide3 = true;
			},
			opengathering(){
				this.isHide = true;
                this.isHide4 = true;
			},
			closegathering(){
				this.isHide = false;
                this.isHide4 = false;
			},
			openrefund(){
				this.isHide = true;
                this.isHide5 = true;
			},
			closerefund(){
				this.isHide = false;
                this.isHide5 = false;
			},
			opencheckout(){
				this.isHide = true;
                this.isHide6 = true;
			},
			closecheckout(){
				this.isHide = false;
                this.isHide6 = false;
			},
			openservices(){
				this.isHide = true;
                this.isHide7 = true;
			},
			closeservices(){
				this.isHide = false;
                this.isHide7 = false;
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