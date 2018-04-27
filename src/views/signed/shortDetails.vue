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
		    			<span>{{Datas.roomNum}}房间</span>
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
		    					<a @click="openroom">一键换房</a>
		    					<a @click="openrelet">续租</a>
                                <a @click="opengathering">添加收款</a>
                                <a @click="openrefund">添加退款</a>
		    					<a @click="opencheckout">退房确认</a>
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
		    					<p v-if="!fineProject">罚款金额：</p>
								<ul>
									<li v-for="(item,index) in fineProject">
										<span>{{item.content}} </span><span style="width:60px;"> {{item.price}}元</span>
										<img src="../../../static/images/temp/icon jia.png" @click="ShortfineProject(item)">
						
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
									<li v-if="Datas.roomStatus == '脏房' || Datas.roomStatus == '待出租' || Datas.roomStatus == '已出租'"><a @click="setShortstatus(0)">设置为【配置中】</a></li>
									<li v-if="Datas.roomStatus == '配置中' || Datas.roomStatus == '脏房' || Datas.roomStatus == '已出租'"><a @click="setShortstatus(1)">设置为【待出租】</a></li>
									<li v-if="Datas.roomStatus == '配置中' || Datas.roomStatus == '待出租' || Datas.roomStatus == '已出租'"><a @click="setShortstatus(3)">设置为【脏房】</a></li>
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
		<!-- <check-In @notcheckIn="notcheckIn()" v-show="isHide1"></check-In> -->
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
    import { ShortPmsRoomInfo200213,ShortOrderFinance200214,ShortFinanceUpdate200215,ShortRoomUpdate200216,ShortOrderRoomUpdate200217,ShortServiceInfo300212 } from '../api.js';
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
				isHide3:false,
				isHide4:false,
				isHide6:false,
				isHide7:false,
				isHide8:false,
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
    		}
    	},
    	mounted(){
    		this.roomid = this.$route.query.id;
			this.communityId = this.$route.query.ids;
			// console.log(this.$route.query);
			this.datas();
			this.addedservices();
    	},
    	methods:{
			//入住登记，ID暂时为固定数据
    		instas(){
				// if(this.pmsOrder){
					this.$router.push({name:'checkIn',query:{orderId:366,roomId:28}})
				// }else{
				// 	this.warningMessage = '当前没有订单可以添加入住';
				// 	this.warningModal = true;
				// }
				
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
    					roomId:this.roomid
    				})
    			)
    			.then((response) => {
    				// console.log(response);
    				if(response.status == 200 && response.data.code == 10000){
						this.Datas = response.data.entity;
						this.orderId = this.Datas.pmsOrder.orderId;
						if(this.Datas.lockWaterElectricity){
							this.lockWaterElectricity = this.Datas.lockWaterElectricity;
						}
						
						let arr = JSON.parse(this.Datas.materials);
						// console.log(arr);
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
    			.catch((error) => {
    				// console.log(error);
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
				param.append('orderRoomId',this.pmsOrder.orderRoomId);
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
				param.append('orderRoomId',this.pmsOrder.orderRoomId);
				axios.post(ShortOrderFinance200214, param).then((res)=>{
					// console.log(res);
					if(res.status == 200 && res.data.code == 10000){
						vm.isHide = false;
						vm.isHide5 = false;
						vm.successMessage = '添加退款成功';
						vm.successModal = true;
						setTimeout(() => {
							vm.successModal = false;
							// this.datas();
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
					console.log(res);
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
				// if(this.Datas.pmsOrder && this.Datas.pmsOrder.orderState == 8){
				// 	this.warningMessage = '当前房间非退租状态，无法退租';
				// 	this.warningModal = true;
				// 	return
				// }else{
				// 	if(vm.Datas.pmsOrder && vm.Datas.pmsOrder.orderNum){
						axios.post(ShortOrderRoomUpdate200217,
						qs.stringify({
							id:vm.Datas.pmsOrder.orderNum
						})
						).then((res)=>{
							// console.log(res);
							if(res.status == 200 && res.data.code == 10000){
								this.successMessage = '退房确认成功';
								this.successModal = true;
								this.isHide = false;
								this.isHide6 = false;
								setTimeout(() => {
									this.successModal = false;
									this.datas();
								}, 2000);
							}else{
								this.warningMessage = res.data.content;
								this.warningModal = true;
							}
						}).catch((error)=>{
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
				axios.get(ShortServiceInfo300212,{
					params:{communityId:this.communityId,id:366}
				}).then((res) => {
					if(res.status == 200 && res.data.code == 10000){
						this.AlladdedServices = res.data.entity.communitySvcList;
						this.setaddedServices = res.data.entity.orderServiceList;
						for(let i = 0;i<this.AlladdedServices.length;i++){
							this.AlladdedServices[i].count = '';
							for(let j = 0;j<this.setaddedServices.length;j++){
								if(this.setaddedServices[j].serviceId == this.AlladdedServices[i].serviceId){
									this.checkList.push(this.AlladdedServices[i].serviceName);
									this.AlladdedServices[i].count = this.setaddedServices[j].count;
								}
							}
						}
					}
				})
			},
			handleCheckedCitiesChange(list){
				console.log(list);
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
				this.addedservices();
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