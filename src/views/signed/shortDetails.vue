<template>
	<div class="hous">
		<menu-box  :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>短租状态</h3>
		        </div>
		    	<div id="shortDetail">
		    		<div class="shortdetail1">
		    			<span v-if="Datas.roomNum != null">{{Datas.roomNum}}房间</span>
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
		    				<td><span v-for="item in roomconfiguration" :key="item" style="line-height:40px;">{{item}} </span></td>

		    			</tr>
		    			<tr v-show="Datas.roomStatus == '已出租'">
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
		    					<a @click="openroom(Datas.pmsOrder.orderId)" v-if="Datas.pmsOrder">一键换房</a>
								<a @click="notopenroom" v-else>一键换房</a>
		    					<!-- <a @click="openrelet">续租</a> -->
                                <a @click="opengathering">添加收款</a>
                                <a @click="openrefund">添加退款</a>
		    					<a @click="opencheckout(Datas)">申请退房</a>
		    					<a>开发票</a>
		    				</td>
		    			</tr>
		    			<tr v-show="Datas.roomStatus == '已出租'">
		    				<td>承租人：</td>
		    				<td v-if="Datas.pmsOrder">
		    					<span v-if="Datas.pmsOrder.userName">{{Datas.pmsOrder.userName}}</span>
		    					<span v-if="Datas.pmsOrder.userPhone">联系电话：{{Datas.pmsOrder.userPhone}}</span>
		    				</td>
		    			</tr>
		    			<tr v-show="Datas.roomStatus == '已出租'">
		    				<td>
		    					支付：
		    				</td>
		    				<td>
								<!-- <p>协议价：258.00元</p> -->
		    					<p v-if="fineProject.length > 0">罚款金额：</p>
								<ul>
									<li v-for="(item,index) in fineProject">
										<span>{{item.content}} </span><span style="width:60px;"> {{item.price}}元</span>
										<img src="../../../static/images/temp/icon jian.png" @click="ShortfineProject(item)">

									</li>
								</ul>
		    				</td>
		    			</tr>
		    			<tr v-show="Datas.roomStatus == '已出租'">
		    				<td>
		    				</td>
		    				<td>
								<ul v-for="item in setaddedServices">
									<li><span>{{item.serviceName}} *{{item.count}} </span><span style="color:#ef751b;font-size:14px;">￥{{item.totalMoney}}</span></li>
								</ul>
		    				</td>
		    				<td >
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
									<li v-if="Datas.roomStatus == '脏房' || Datas.roomStatus == '待出租' || Datas.roomStatus == '已出租'"><a @click="setShortstatus(0)">设置为【配置中】</a></li>
									<li v-if="Datas.roomStatus == '配置中' || Datas.roomStatus == '脏房' || Datas.roomStatus == '已出租'"><a @click="setShortstatus(1)">设置为【待出租】</a></li>
									<li v-if="Datas.roomStatus == '配置中' || Datas.roomStatus == '待出租' || Datas.roomStatus == '已出租'"><a @click="setShortstatus(3)">设置为【脏房】</a></li>
								</ul>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>水表状态：</td>
		    				<td v-if="Datas.lockWaterElectricity">
		    					<span v-if="Datas.lockWaterElectricity">{{Datas.lockWaterElectricity.waterStatus | Status2}}</span>
		    					<span v-if="Datas.lockWaterElectricity.waterMeterSn">序列号：{{Datas.lockWaterElectricity.waterMeterSn}}</span>
								<span v-else>序列号：暂无</span>
		    					<p>{{Datas.lockWaterElectricity.waterType | type}} <b> {{Datas.lockWaterElectricity.waterPrice | Price}}</b>元/吨</p>
		    				</td>
		    				<td v-else>
		    					<span>暂无</span>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>电表状态：</td>
		    				<td v-if="Datas.lockWaterElectricity">
		    					<span v-if="Datas.lockWaterElectricity.electricityStatus">{{Datas.lockWaterElectricity.electricityStatus | Status2}}</span>
		    					<span v-if="Datas.lockWaterElectricity.electricityMeterSn">序列号：{{Datas.lockWaterElectricity.electricityMeterSn}}</span>
								<span v-else>序列号：暂无</span>
		    					<p>{{Datas.lockWaterElectricity.electricType | type}} <b> {{Datas.lockWaterElectricity.energyPrice | Price}}</b>元/度</p>
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
		<!-- <check-In @notcheckIn="notcheckIn()" v-show="isHide1"></check-In> -->
        <div class="relet" v-show="isHide2">
            <i class="el-icon-circle-close"></i>
            <ul style="margin-top: 15px;">
                <li>
                    <p>入住时间：1207/6/03 <span>已住天数：3天</span></p>
                </li>
                <li>
                    原预计离店日期<Date-picker type="date" placeholder="选择日期"></Date-picker>
                </li>
                <li>
                    续租天数：
                    <!-- <Select v-model="stationCommunity" style="width:70px;height:35px;">
                        <Option v-for="community in  stationSelectList" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                    </Select> -->
                    预计退房日期：
                    <Date-picker type="date" placeholder="选择日期"></Date-picker>
                </li>
            </ul>
            <a @click="relet()">提交</a>
            <a @click="notrelet()">取消</a>
        </div>
		<div class="addgathering" v-show="isHide4">
			<table>
				<tr v-for="(item,index) in addcollectionProject">
					<td>收款金额：</td>
					<td><input class="ivu-input" style="width:100px;margin-right:20px;" v-model="item.money" @blur="jiage(item.money,index)"></td>
					<td>收款原因：</td>
					<td>
						<input class="ivu-input" style="width:100px;" v-model="item.moneyWhy">
						<img :src="item.classname" v-if="item.classname == '../../../static/images/temp/icon jia.png'" @click="addcollection">
						<img :src="item.classname" v-else @click="Reduction(index)">
						<!-- <i :class="item.classname" v-if="item.classname == 'iconfont icon-jia'" @click="addcollection"></i>
						<i :class="item.classname" v-else @click="Reduction(index)"></i> -->
					</td>
				</tr>
			</table>
			<a @click="addgathering()">提交</a>
            <a @click="closegathering()">取消</a>
		</div>
		<div class="addrefund" v-show="isHide5">
			<table>
				<tr>
					<td>退款金额：</td>
					<td><input class="ivu-input" style="width:100px;" v-model="addrefundProject[0].money" @blur="moneys(addrefundProject[0].money)"></td>
				</tr>
				<tr>
					<td>退款原因：</td>
					<td><input class="ivu-input" style="width:200px;" v-model="addrefundProject[0].moneyWhy"></td>
				</tr>
			</table>
			<a @click="addrefund()">提交</a>
            <a @click="closerefund()">取消</a>
		</div>
		<div class="checkout" v-show="isHide6">
			<h2>用户退房信息</h2>
			<table v-if="Checkinformation">
				<tr v-if="Checkinformation.roomieInfo">联系人：{{Checkinformation.roomieInfo.name}}</tr>
				<tr>联系电话：{{Datas.pmsOrder.userPhone}}</tr>
				<tr v-if="Checkinformation.roomieInfo">{{Checkinformation.roomieInfo.certificateName}}：{{Checkinformation.roomieInfo.certificateNumber}}</tr>
				<tr>入住时间：{{Checkinformation.inTime | time}}</tr>
				<tr>退房时间：<Date-picker type="date" placeholder="选择日期" v-model="CheckDates" @on-change="calculateRefundMoneym"></Date-picker></tr>
				<tr>应退天数：<input class="ivu-input" style="width:80px;" v-model="dayam" @input="calculateRefundMoney(dayam)"> 天</tr>
				<tr>协议价：{{Checkinformation.orderRoomFee}} 元</tr>
				<!-- <tr>增值服务总价：{{Checkinformation.serviceFee}}元</tr> -->
				<tr v-if="stateHide == 1">退款金额：{{Checkinformation.refundFee}} 元</tr>
				<tr v-if="stateHide == 2">退款金额：<input class="ivu-input" style="width:100px;" v-model="Checkinformation.refundFee"> 元</tr>
				<tr v-if="stateHide == 1">罚款金额：{{Checkinformation.gatheringFee}} 元</tr>
				<tr v-if="stateHide == 2">罚款金额：<input class="ivu-input" style="width:100px;" v-model="Checkinformation.gatheringFee"> 元</tr>
				<tr v-if="refundMoney > 0">应退款：{{refundMoney}}元</tr>
				<tr v-if="refundMoney <= 0">应收款：{{refundMoney | Money}} 元</tr>
			</table>
			<a class="mtsf" v-if="stateHide == 1" @click="setstates">编辑</a>
			<a class="mtsf" v-if="stateHide == 2" @click="setstatesm">保存</a>
			<span style="margin:20px 0 20px 10px;display:inline-block;"  v-if="refundMoney < 0">支付方式：</span>
			<el-radio-group v-if=" refundMoney < 0" v-model="radio2"  >
				<el-radio :label="2">微信</el-radio>
				<el-radio :label="1">支付宝</el-radio>
				<el-radio :label="3">银联</el-radio>
				<el-radio :label="5">现金</el-radio>
				<el-radio :label="4">其他</el-radio>
			</el-radio-group>
			<a class="butons" @click="checkout">提交</a>
            <a class="butons" @click="closecheckout()">取消</a>
		</div>
		<div class="addservices" v-show="isHide7">
			<p>
				增值服务
			</p>
			<el-checkbox-group v-model="checkList">
				<el-checkbox :label=item.serviceName v-for="(item,index) in AlladdedServices" :key="index" @change="handleCheckedCitiesChange(checkList)">{{item.serviceName}}<span class="money">￥{{item.singlePrice}}</span><input type="text" style="width:30px;height:20px;margin-top:10px;margin-left:10px;font-size:10px;padding-left:5px;" v-model="item.count"></el-checkbox>
			</el-checkbox-group>
			<a @click="addservices()">提交</a>
            <a @click="closeservices()">取消</a>
		</div>
		<div class="setShortstatus" v-show="isHide8">
			<p>确定修改当前房间状态吗？</p>
			<a @click="setShortShowpass">确定</a>
			<a @click="setShortshow">取消</a>
		</div>

		<!--排房-->
		<div class="upload-modal"  v-if="roomChangeHide" @click="closeRoomChange()"></div>
		<div class="roomchange" v-if="roomChangeHide">
			<ul class="state2 transition-box">
			<li>
				<div v-for="(item,index) in paiFangList" :class="{'active-color':hasRoom(index)}" @click="selectRoom(index)">
				<p></p>
				<span class="short">短租</span>
				<p style="font-size: 16px;">{{item.roomNum}}</p>
				<!-- <p v-else></p> -->
				<span></span>
				<!-- <span v-else></span> -->
				<span>{{item.name}}</span>
				<!-- <span v-else></span> -->
				<p>￥{{item.subTotal}}
					<i v-if="item.roomStatus == 0">维护中</i>
					<i v-if="item.roomStatus == 1">待出租</i>
					<i v-if="item.roomStatus == 2">已出租</i>
					<i v-if="item.roomStatus == 3">脏房</i>
				</p>
				</div>

			</li>
			</ul>
			<a @click="submit()">提交</a>
			<a @click="closeRoomChange()" style="left: 600px;">取消</a>
		</div>
		<!--排房-->
	</div>
</template>

<script>

	import '../../sass/style/shortDetails.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import roomChange from '../../components/roomChange.vue';
    import axios from 'axios';
    import { ShortPmsRoomInfo200213,ShortOrderFinance200214,CxkjPmsAddCheckOutInfo300213,ShortFinanceUpdate200215,ShortRoomUpdate200216,ShortOrderRoomUpdate200217,ShortServiceInfo300212,BuyServices300216,CheckOutInfo300208,CxkjGetRoomListOfForRoom300195,CxkjAssignRoom300196 } from '../api.js';
    import qs from 'qs';
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox,
    		successModal,
			warningModal,
			roomChange
    	},
    	data(){
    		return{
				activeTabName:"shortRent",
                isHide:false,
				isHide2:false,
				isHide4:false,
				isHide5:false,
				isHide6:false,
				isHide7:false,
				isHide8:false,
				radio2: 2,
    			roomId:null,
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
				orderId:'',//账单ID
				checkList: [],
				roomconfiguration:[],//房间配置信息
				pmsRoomService:[],//房间增值服务信息
				fineProject:[],//罚款项目
				addcollectionProject:[{
					money:'',
					moneyWhy:'',
					classname:'../../../static/images/temp/icon jia.png'
				}],//添加收款项目
				addrefundProject:[{
					money:'',
					moneyWhy:''
				}],//添加退款项目
				setStatus:'',
				AlladdedServices:[], //全部增值服务数据
				setaddedServices:[], //已设置增值服务数据
				orderServiceIds:[], //已设置增值服务的ID
				Checkinformation:null, //退房详情信息
				CheckDates:'',
				refundMoney:0,//应收、应付
				roomDayPriceList:{},
				value:'',//退房时间
				roomChangeHide:false,
				stateHide:1,
				paiFangList:[],
				roomList:[],
				activeRoomCount:1,
				Moneytite:0,
				dayam:0
		   	}
		},
    	filters:{
    		Status(val){
    			if(val == 1){
    				return '在线'
    			}
    			else if(val == 0){
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
    			else if(val == 0){
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
				else if(val == 7){
    				return '申请退租'
				}
				else if(val == 8){
    				return '退租中'
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
			},
			time(val){
				return new Date(val).Format("yyyy-MM-dd");
			},
			Money(val){
				return Math.abs(val);
			}
		},
    	mounted(){
    		this.roomId = this.$route.query.id;
			this.communityId = this.$route.query.ids;
			// console.log(this.$route.query);
			this.datas();
		},
		computed:{
		},
    	methods:{
			//入住登记，ID暂时为固定数据
    		instas(){
				if(this.Datas.pmsOrder){
					this.$router.push({name:'checkIn',query:{orderId:this.orderId,roomId:this.roomId}})
				}else{
					this.warningMessage = '当前没有订单可以添加入住';
					this.warningModal = true;
				}

			},
			/**
			 * 计算总价
			 **/
			calculateRefundMoney(day){
				let vm = this
				let dayas = this.DateDiff(new Date(this.CheckDates).getTime(),this.Checkinformation.inTime);
				if(day > dayas){
					vm.dayam = 0;
					vm.warningMessage = '最大退租时间不能超过'+this.roomDayPriceList[this.roomDayPriceList.length-1].dayNum;
					vm.warningModal = true;
					return
				}
				let Money = 0;
				if(day > 0){
					for(let i = 0;i < (this.roomDayPriceList.length - (1 + day));i++){
						Money+=parseInt(this.roomDayPriceList[i].price);
					}
				}
				this.Moneytite = Money;
				this.refundMoney = (parseInt(this.Checkinformation.orderRoomFee) - parseInt(this.Checkinformation.refundFee) - parseInt(this.Checkinformation.gatheringFee) - this.Moneytite);
			},
			calculateRefundMoneym(value){
				let vm = this
				this.CheckDates = value;
				if(new Date(value).getTime() > new Date(this.roomDayPriceList[this.roomDayPriceList.length-1].dayNum).getTime()){
					vm.CheckDates = '';
					vm.warningMessage = '最大退租时间不能超过'+this.roomDayPriceList[this.roomDayPriceList.length-1].dayNum;
					vm.warningModal = true;
					return
				}
			},
			jiage(value,index){
				let str = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
				if(str.test(value) == true){
					this.addcollectionProject[index].money = value;
				}
				else{
					this.addcollectionProject[index].money = '';
				}
			},
			moneys(value){
				let str = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
				if(str.test(value) == true){
					this.addrefundProject[0].money = value;
				}
				else{
					this.addrefundProject[0].money = '';
				}
			},
			//获取单个房间的状态数据
    		datas(){
				this.roomconfiguration = [];
    			axios.post(ShortPmsRoomInfo200213,
    				qs.stringify({
    					roomId:this.roomId
    				})
    			)
    			.then((response) => {
    				console.log(response);
    				if(response.status == 200 && response.data.code == 10000){
						this.Datas = response.data.entity;
						if(this.Datas.pmsOrder){
							this.orderId = this.Datas.pmsOrder.orderId;
							this.addedservices();
						}
						if(this.Datas.lockWaterElectricity){
							this.lockWaterElectricity = this.Datas.lockWaterElectricity;
						}

						let arr = JSON.parse(this.Datas.materials);
						for(let i = 0;i<arr.length;i++){
							this.roomconfiguration.push(arr[i].materialName);
						}
    					if(this.Datas.pmsOrder.pmsRoomService){
    						this.pmsRoomService = this.Datas.pmsOrder.pmsRoomService;
						}
						if(this.Datas.pmsOrder.pmsOrderFinanceReceivablesInfo){
							this.fineProject = this.Datas.pmsOrder.pmsOrderFinanceReceivablesInfo;
						}
    				}
    			})
			},
			//添加收款项目数组
			addcollection(){
				this.addcollectionProject.push({
					money:'',
					moneyWhy:'',
					classname:'../../../static/images/temp/icon jian.png'
				})
			},
			//减少收款项目数组
			Reduction(index){
				this.addcollectionProject.splice(index,1);
			},
			//提交收款项目
			addgathering(){
				let cxkjPmsOrderFinanceLists =[];
				let param = new FormData();
				let vm = this;
				for(let i = 0;i<this.addcollectionProject.length;i++){
					param.append(`cxkjPmsOrderFinanceList[${i}].price`,this.addcollectionProject[i].money);
					param.append(`cxkjPmsOrderFinanceList[${i}].content`,this.addcollectionProject[i].moneyWhy);
				}
				// console.log(cxkjPmsOrderFinanceLists);
				param.append('orderId',this.orderId);
				param.append('type',1);
				param.append('orderRoomId',this.Datas.pmsOrder.orderRoomId);
				axios.post(ShortOrderFinance200214, param).then((res)=>{
					// console.log(res);
					if(res.status == 200 && res.data.code == 10000){
						vm.isHide = false;
						vm.isHide4 = false;
						vm.successMessage = '添加收款成功';
						vm.successModal = true;
						setTimeout(() => {
							vm.successModal = false;
							this.datas();
						}, 2000);
					}else{
						vm.isHide = false;
						vm.isHide4 = false;
						vm.warningMessage = res.data.content;
						vm.warningModal = true;
					}
				}).catch((err)=>{
					vm.isHide = false;
					vm.isHide4 = false;
					vm.warningMessage = '添加收款失败';
					vm.warningModal = true;
				})

				this.addcollectionProject=[{
					money:'',
					moneyWhy:'',
					classname:'../../../static/images/temp/icon jia.png'
				}]
			},
			//提交退款项目
			addrefund(){
				let param = new FormData();
				let vm = this;
				for(let i = 0;i<this.addrefundProject.length;i++){
					param.append(`cxkjPmsOrderFinanceList[${i}].price`,this.addrefundProject[i].money);
					param.append(`cxkjPmsOrderFinanceList[${i}].content`,this.addrefundProject[i].moneyWhy);
				}

				param.append('orderId',this.orderId);
				param.append('type',2);
				param.append('orderRoomId',this.Datas.pmsOrder.orderRoomId);
				axios.post(ShortOrderFinance200214, param).then((res)=>{
					// console.log(res);
					if(res.status == 200 && res.data.code == 10000){
						vm.isHide = false;
						vm.isHide5 = false;
						vm.successMessage = '添加退款成功';
						vm.successModal = true;
						setTimeout(() => {
							vm.successModal = false;
							this.datas();
						}, 2000);
					}else{
						vm.isHide = false;
						vm.isHide5 = false;
						vm.warningMessage = res.data.content;
						vm.warningModal = true;
					}
				}).catch((err)=>{
					vm.isHide = false;
					vm.isHide5 = false;
					vm.warningMessage = '添加退款失败';
					vm.warningModal = true;
				})
				this.addrefundProject = [{
					money:'',
					moneyWhy:''
				}]
			},
			//设置短租的支付收款删除
			ShortfineProject(val){
				// console.log(val);
				axios.post(ShortFinanceUpdate200215,
					qs.stringify({
						id:val.id
					})
				).then((res)=>{
					// console.log(res);
					if(res.status == 200 && res.data.code == 10000){
						this.datas();
					}
				})
			},
			//设置短租的房间状态弹框显示
			setShortstatus(value){
				this.isHide = true;
				this.isHide8 = true;
				this.setStatus = value;
			},
			//设置短租房间状态
			setShortShowpass(value){
				let vm = this
				axios.post(ShortRoomUpdate200216,
					qs.stringify({
						roomId:vm.Datas.roomId,
						roomStatus:vm.setStatus
					})
				).then((res)=>{
					// console.log(res);
					if(res.status == 200 && res.data.code == 10000){
						this.successMessage = '设置状态成功';
						this.successModal = true;
						this.isHide = false;
						this.isHide8 = false;
						setTimeout(() => {
							this.successModal = false;
							this.datas();
						}, 2000);
					}else{
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				}).catch((err)=>{
					this.warningMessage = '设置失败';
					this.warningModal = true;
				})
			},
			//设置短租的房间状态弹框隐藏
			setShortshow(){
				this.isHide = false;
				this.isHide8 = false;
			},
			//设置短租房间退房
			checkout(){
				let vm = this
				if(vm.CheckDates == ''){
					this.warningMessage = '请选择退房时间';
					this.warningModal = true;
				 	return
				}
				
				if( new Date(this.CheckDates).getTime() > new Date(this.roomDayPriceList[this.roomDayPriceList.length-1].dayNum).getTime()){
					vm.warningMessage = '最大退租时间不能超过'+this.roomDayPriceList[this.roomDayPriceList.length-1].dayNum;
					vm.warningModal = true;
					return
				}
				this.$http.post(CxkjPmsAddCheckOutInfo300213,
					qs.stringify({
					orderRoomId:vm.Datas.pmsOrder.orderRoomId,
					orderId:vm.orderId,
					userName:vm.Datas.pmsOrder.userName,
					userPhone:vm.Datas.pmsOrder.userPhone,
					roomPrice:vm.Checkinformation.orderRoomFee,
					inMoney:vm.Checkinformation.gatheringFee,
					outMoney:vm.Checkinformation.refundFee,
					serviceMoney:vm.Checkinformation.serviceFee,
					totalMoney:vm.Checkinformation.totalConsumeFee,
					refundMoney:vm.refundMoney,
					refundTime:vm.CheckDates,
					payType:vm.refundMoney<0?vm.radio2:0,
					roomNum:vm.Datas.roomNum,
					certificateType:vm.Checkinformation.roomieInfo.certificateType,
					certificateNumber:vm.Checkinformation.roomieInfo.certificateNumber
              // inTime:vm.Checkinformation.inTime
				})).then(res=>{
					// console.log(res);
					if( res.data.code == 10000){
						this.successMessage = '退房确认成功';
						this.successModal = true;
						this.isHide = false;
						this.isHide6 = false;
						setTimeout(() => {
							this.successModal = false;
							vm.$router.go(-1)
						}, 2000);
					}else{
						this.warningMessage = res.data.content+res.data.code;
						this.warningModal = true;
					}
				}).catch(error=>{
					this.warningMessage = '退房确认失败';
					this.warningModal = true;
				})
				// 	}

				// }

			},
			//获取短租增值服务的全部数据(订单ID暂时为死数据)
			addedservices(){
				this.AlladdedServices = [];
				this.checkList = [];
				this.setaddedServices = [];
				this.orderServiceIds = [];
				axios.get(ShortServiceInfo300212,{
					params:{communityId:this.communityId,id:this.orderId}
				}).then((res) => {
					if(res.status == 200 && res.data.code == 10000){
						this.AlladdedServices = res.data.entity.communitySvcList;
						this.setaddedServices = res.data.entity.orderServiceList;
						if(this.AlladdedServices.length > 0){
							for(let i = 0;i<this.AlladdedServices.length;i++){
								this.AlladdedServices[i].count = '';
								for(let j = 0;j<this.setaddedServices.length;j++){
									if(this.setaddedServices[j].serviceId == this.AlladdedServices[i].serviceId){
										this.checkList.push(this.AlladdedServices[i].serviceName);
										this.AlladdedServices[i].count = this.setaddedServices[j].count?this.setaddedServices[j].count:'';
										this.AlladdedServices[i].originCount = this.setaddedServices[j].count;
										this.AlladdedServices[i].orderServiceId = this.setaddedServices[j].orderServiceId?this.setaddedServices[j].orderServiceId:'';
										this.orderServiceIds.push(this.setaddedServices[j].orderServiceId);
									}
								}
							}
						}else{
							this.warningMessage = '暂无增值服务';
							this.warningModal = true;
						}
						

						// this.isHide = true;
						// this.isHide7 = true;
					}
				})
			},
			//提交增值服务的操作
			addservices(){
				let params = new FormData();
				for(let i = 0;i<this.AlladdedServices.length;i++){
					for(let j = 0;j<this.checkList.length;j++){
						if(this.AlladdedServices[i].serviceName == this.checkList[j]){
							this.AlladdedServices[i].totalMoney = this.AlladdedServices[i].singlePrice * this.AlladdedServices[i].count?this.AlladdedServices[i].singlePrice * this.AlladdedServices[i].count:0;
							params.append(`cxkjPmsOrderServices[${j}].id`,this.AlladdedServices[i].orderServiceId?this.AlladdedServices[i].orderServiceId:'');
							params.append(`cxkjPmsOrderServices[${j}].serviceId`,this.AlladdedServices[i].serviceId);
							params.append(`cxkjPmsOrderServices[${j}].serviceName`,this.AlladdedServices[i].serviceName);
							params.append(`cxkjPmsOrderServices[${j}].singlePrice`,this.AlladdedServices[i].singlePrice);
							params.append(`cxkjPmsOrderServices[${j}].count`,this.AlladdedServices[i].count);
							params.append(`cxkjPmsOrderServices[${j}].totalMoney`,this.AlladdedServices[i].totalMoney);
							params.append(`cxkjPmsOrderServices[${j}].originCount`,this.AlladdedServices[i].originCount?this.AlladdedServices[i].originCount:'');
						}
					}
				}
				if(this.orderId){
					params.append('orderId',this.orderId);//this.Datas.pmsOrder.orderId
				}
				
				params.append('orderRoomId',this.Datas.pmsOrder.orderRoomId);//this.Datas.pmsOrder.orderRoomId
				params.append('orderServiceIds',this.orderServiceIds.join(','));

				axios.post(BuyServices300216, params).then((res)=>{
					if(res.status == 200 && res.data.code == 10000){
						this.successMessage = '操作增值服务成功';
						this.successModal = true;
						this.isHide = false;
						this.isHide7 = false;
						setTimeout(() => {
							this.successModal = false;
							this.datas();
						}, 2000);
					}else{
						this.warningMessage = res.data.content;
						this.warningModal = true;
						this.isHide = false;
						this.isHide7 = false;
					}
				}).catch((error)=>{
					this.warningMessage = '操作增值服务失败';
					this.warningModal = true;
					this.isHide = false;
					this.isHide7 = false;
				})
			},
			handleCheckedCitiesChange(list){
			},
    		closeWarningModal() {
				this.warningModal = false;
            },
            openrelet(){
                this.isHide = true;
                this.isHide2 = true;
			},
			notrelet(){
				this.isHide = false;
                this.isHide2 = false;
			},
			//打开排房的窗口以及获取可排房的房间
			openroom(id){
				let vm = this;
				this.roomList = [];
				this.activeRoomCount = 1;
				let param = {id:id,pageNum:1}
				this.$http.get(CxkjGetRoomListOfForRoom300195,{params:param}).then(res=>{
					if(res.data.code == 10000 && res.status == 200){
						vm.paiFangList = res.data.pageBean.page;
						if(vm.paiFangList){
							vm.isHide = true;
							vm.roomChangeHide = true;
						}
					}else{
						this.warningMessage = '当前没有可换的房间';
						this.warningModal = true;
						vm.paiFangList = [];
					}
				})
				
			},
			notopenroom(){
				this.warningMessage = '当前没有可换的房间';
				this.warningModal = true;
			},
			closeRoomChange(){
				this.isHide = false;
				this.roomChangeHide = false;
			},
			opengathering(){
				this.isHide = true;
                this.isHide4 = true;
			},
			closegathering(){
				this.isHide = false;
				this.isHide4 = false;
				this.addcollectionProject=[{
					money:'',
					moneyWhy:'',
					classname:'../../../static/images/temp/icon jia.png'
				}]
			},
			openrefund(){
				this.isHide = true;
                this.isHide5 = true;
			},
			closerefund(){
				this.isHide = false;
				this.isHide5 = false;
				this.addrefundProject = [{
					money:'',
					moneyWhy:''
				}]
			},
			opencheckout(data){
				let params = {};
				if(data.pmsOrder){
					params.orderId = data.pmsOrder.orderId;
					params.roomId = data.id;
					axios.get(CheckOutInfo300208,{params:params}).then((res)=>{
						if(res.status == 200 && res.data.code == 10000){
							this.Checkinformation = res.data.entity;
							this.roomDayPriceList = res.data.entity.roomDayPriceList;
							this.isHide = true;
							this.isHide6 = true;
						}
					})
				}else{
					this.warningMessage = '当前没有订单可退的房间';
					this.warningModal = true;
				}
				
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
				this.datas();
				this.isHide = false;
				this.isHide7 = false;
			},
			hasRoom(index){
				for(let i=0;i<this.roomList.length;i++){
					if(this.roomList[i] == index){
					return true;
					break;
					}
				}
				return false;
			},
			selectRoom(index){
				if(this.activeRoomCount>0){
					if(this.roomList.length<this.activeRoomCount){
						if(this.roomList.indexOf(index)!=-1){
						this.roomList.splice(this.roomList.indexOf(index),1);
						}else{
						this.roomList.push(index);
						}
					}else{
						if(this.roomList.indexOf(index)!=-1){
						this.roomList.splice(this.roomList.indexOf(index),1);
						}else{
						this.roomList.splice(0,1);
						this.roomList.push(index);
						}
					}
				}
			},
			submit(){
				let ids = [];
				for(let i =0;i<this.roomList.length;i++){
					ids.push(this.paiFangList[this.roomList[i]].id)
				}

				this.$http.post(CxkjAssignRoom300196,qs.stringify({id:this.orderId,roomIds:ids})).then(res=>{
					if(res.data.code == 10000 && res.status == 200){
						this.successMessage = '换房成功!';
						this.successModal = true;
						this.closeRoomChange();
						setTimeout(()=>{
							this.successModal = false;
							this.datas();
							this.$router.go(-1);
						},1000)
						
					}else{
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				})
			},
			setstates(){
				this.stateHide = 2;
			},
			setstatesm(){
				this.stateHide = 1;
				this.refundMoney = (parseInt(this.Checkinformation.orderRoomFee) - parseInt(this.Checkinformation.refundFee)) - (parseInt(this.Checkinformation.serviceFee) + parseInt(this.Checkinformation.gatheringFee) + this.Moneytite);
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
	.roomchange{
      width: 900px;
      min-height: 300px;
      background: #fff;
      z-index: 9999;
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      border-radius: 5px;
    }
    .roomchange .state2{
      display: block;
    }
    .roomchange .state2 li{
      width: 194px;
      height: 160px;
      border: 1px solid #DCDCDC;
      border-radius: 5px;
      float: left;
      margin: 15px 15px;
      position: relative;
    }
    .roomchange .state2 li div{
      width: 194px;
      height: 160px;
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 5px;
      cursor: pointer;
    }
    .roomchange .state2 li div{
      width: 194px;
      height: 160px;
      background-color: #038be2;
      display: inline-block;
    }
    .roomchange .state2 li div .act{
      color: #1fbba6;
    }
    .roomchange .state2 li div .act2{
      color: #038be2;
    }
    .roomchange .state2 li div p:nth-child(1){
      font-size: 12px;
      font-weight: bold;
      margin:10px 0 7px 10px;
    }
    .roomchange .state2 li div p:nth-child(3){
      font-size: 12px;
      margin:0 0 8px 10px;
    }

    .roomchange .state2 li span{
      display: block;
      font-size: 12px;
      color: #ff1d10;
      margin:0 0 0 10px;
    }
    .roomchange .state2 li .short{
      position: absolute;
      right: 10px;
      top: 10px;
      width: 50px;
      height: 25px;
      display: inline-block;
      background: #ffffff;
      text-align: center;
      line-height: 25px;
      color: black;
    }
    .roomchange .state2 li p:nth-child(6){
      width: 100%;
      height: 46px;
      border-radius: 5px;
      border-top: 1px solid #dcdcdc;
      background: #1dc0e9;
      font-size: 12px;
      color: #000;
      line-height: 45px;
      padding-left: 10px;
      position: absolute;
      bottom: 0px;
    }
    .roomchange .state2 li p:nth-child(6) i{
      float: right;
      font-style: normal;
      margin-right: 10px;
    }
    .roomchange a{
      width: 100px;
      height: 30px;
      display: inline-block;
      text-align: center;
      line-height: 30px;
      font-size: 16px;
      color: white;
      background: #038BE2;
      border-radius: 5px;
      position: absolute;
      left: 200px;
      bottom: 20px;
    }
	.active-color{
      background-color: #1dc0e9!important;
    }
</style>
