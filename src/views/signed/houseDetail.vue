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
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="houseDetail">
		    		<div class="housedetail1">
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
		    					<a>新签租约</a>
		    					<a @click="instas()">调价</a>
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
		    					<!--<a>查看租约</a>-->
		    					<router-link :to="{name:'contractDetail',query:{contractSignId:Datas.cxkjContractSign.contractSignId,isOffice:'0'}}" v-if="Datas.cxkjContractSign">查看租约</router-link>
		    					<a>续租</a>
		    					<a>退房</a>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>承租人：</td>
		    				<td v-if="Datas.cxkjContractSign">
		    					<span >{{Datas.cxkjContractSign.user.userName}}</span>
		    					<span>联系电话：{{Datas.cxkjContractSign.user.userPhone}}</span>
		    				</td>
		    				<td v-else><span >无</span>
		    					<span>联系电话：无</span></td>
		    			</tr>
		    			<tr>
		    				<td>
		    					首笔支付：
		    				</td>
		    				<td>
		    					<p v-if="Datas.cxkjContractSign != null">押金：{{Datas.cxkjContractSign.deposit | deposit}}<span>租金：{{Datas.cxkjContractSign.cyclePayMoney | cyclePayMoney}}</span></p>
		    					<p v-else>押金：无<span>租金：无</span></p>
		    					<p >预存：300.00元<span v-if="Datas.cxkjContractSign != null && Datas.cxkjContractSign.serviceCost != null">服务费：{{Datas.cxkjContractSign.serviceCost | cyclePayMoney}}</span>
		    						<span v-else> 服务费：无</span>
		    					</p>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>
		    					账单状态：
		    				</td>
		    				<td>
		    					<p v-if="Datas.cxkjBill != null">租金账单{{Datas.cxkjBill.billState | billState}}</p>
		    					<p v-else></p>
		    					<p v-if="Datas.waterEnergyBill != null">水电账单{{Datas.waterEnergyBill.payStatus | payStatus}}</p>
		    					<p v-else></p>
		    				</td>
		    				<td>
		    					<router-link :to="{name:'billDetail',query:{billId:Datas.cxkjBillSys.billId,type:0}}" v-if="Datas.cxkjBillSys">查看租金账单</router-link>
		    					<a>查看水电账单</a>
		    					<span style="color: red;">向用户发送交费提醒(5)</span>
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
		    					<a>冻结</a>
		    					<a>获取临时密码</a>
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
		<div class="insta" v-show="isHide">
				<i class="el-icon-circle-close"  @click="instas()"></i>
				<p>调价</p>
				<table >
					<tr>
						<td>房间：</td>
						<td v-if="Datas">{{Datas.cxkjCommunityFloor.floorName}}层{{Datas.roomNum}}</td>
					</tr>
					<tr>
						<td>原价：</td>
						<td v-if="Datas">{{Datas.roomRent | roomRent}}</td>
					</tr>
					<tr>
						<td>新价格：</td>
						<td><input type="text" v-model="money"/>元/月
						</td>
					</tr>
					<tr>
						<td style="vertical-align: text-top;line-height: 50px;">调价原因：</td>
						<td>
							<textarea v-model="texs">
								
							</textarea>
						</td>
					</tr>
				</table>
				<a @click="bus()">提交</a>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/houseDetail.css';
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
    			roomid:null,
    			Datas:null,
    			money:null,
    			texs:null,
    			communityId:null,
    			successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
				roomLockWaterElect:null
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
    		this.datas();
    	},
    	methods:{
    		instas:function(){
    			this.isHide = !this.isHide;
    		},
    		datas(){
    			axios.post(hostRoominfo,
    				qs.stringify({
    					roomId:this.roomid
    				})
    			)
    			.then((response) => {
    				console.log(response);
    				if(response.status == 200 && response.data.code == 10000){
    					this.Datas = response.data.entity;
    					if(this.Datas.roomLockWaterElect){
    						this.roomLockWaterElect = this.Datas.roomLockWaterElect;
    					}
    				}
    			})
    			.catch((error) => {
    				console.log(error);
    			})
    		},
    		closeWarningModal() {
				this.warningModal = false;
			},
    		bus(){
    			if(this.money ==null ||this.texs == null){
    				this.warningMessage = '信息填入不完整，请补充完信息';
					this.warningModal = true;
    			}
    			else{
    				axios.post(hostPrice,
    				qs.stringify({
    					communityId:this.communityId,
    					roomId:this.roomid,
    					newPrice:this.money,
    					reason:this.texs
    				})
	    			).then((response) =>{
	    				console.log(response);
	    				if(response.status == 200 && response.data.code == 10000){
	    					this.successMessage = '申请调价成功';
							this.successModal = true;
	    					setTimeout(() => {
								this.successModal = false;
								this.isHide = !this.isHide;
							}, 2000);
	    				}
	    				else{
	    					this.warningMessage = res.data.content;
							this.warningModal = true;
	    				}
	    				
	    			})
	    			.catch((error)=>{
	    				console.log(error);
	    				this.warningMessage = '申请调价失败';
						this.warningModal = true;
	    			})
    			}
    			
    		}
    	
    	},
    	created(){
    		
			
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  
</style>