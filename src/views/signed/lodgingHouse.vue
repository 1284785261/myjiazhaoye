<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content" style="height: 100%;">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置：工作台  > </span>
					<router-link class="active" to="/apartment/communityManagement"> 签约</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>公寓租客签约</h3>
					<span>佳兆业航运WEWA空间</span>
				</div>
				<div id="lodgingHouse">
					<div class="ivu-floor loadin1">
						<table>
							<tr>
								<td>所属社区:</td>
								<td>{{Name}}</td>
							</tr>
							<tr>
								<td>房间:</td>
								<td>
									<el-select v-model="roomNum" filterable placeholder="输入或选择" @change="room(roomNum)">
										<el-option v-for="item in options1" :key="item.roomNum" :value="item.roomNum">
										</el-option>
									</el-select>
								</td>
							</tr>
							<tr>
								<td>户型:</td>
								<td>{{housetderta.housetypeName}}</td>
							</tr>
							<tr>
								<td>合同编号:</td>
								<td><input type="text" name="" id="" placeholder="请输入合同编号" v-model="contract"/></td>
							</tr>
							<tr>
								<td>租客类型:</td>
								<td>
									<el-radio class="radio" v-model="radios" label="1">个人租客</el-radio>
									<el-radio class="radio" v-model="radios" label="2">公司租客</el-radio>
								</td>
							</tr>
						</table>
					</div>
					
					<!--公寓租客-->
					<div v-if="radios == 1">
						<div class="ivu-floor loadin2">
							<p>承租人信息:</p>
							<table  v-for="userInfos in aaduserInfo">
								<tr>
									<td>已注册手机号:</td>
									<td><input type="text" placeholder="请输入手机号" v-model="userInfos.phone" @blur="User(userInfos.phone)"></td>
								</tr>
								<tr>
									<td>姓名:</td>
									<td>
										<input type="text" placeholder="请输入姓名" v-if="userInfo != null" v-model="userInfo.userName">
										<input type="text" placeholder="请输入姓名" v-else v-model="userInfos.username">
									</td>
								</tr>
								<tr>
									<td>性别:</td>
									<td>
										<el-radio class="radio" v-model="userInfos.radio2" label="1">男</el-radio>
										<el-radio class="radio" v-model="userInfos.radio2" label="2">女</el-radio>
									</td>
								</tr>
								<tr>
									<td>证件类型:</td>
									<td>
										<el-select v-model="value" placeholder="请选择证件类型">
											<el-option v-for="item in userInfos.options2" :key="item.dataName" :value="item.dataName">
											</el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<td>证件号码:</td> 
									<td>
										<input type="text" placeholder="请输入证件号码" v-if="userInfo != null" v-model="userInfo.userCertificate">
										<input type="text" placeholder="请输入证件号码" v-else v-model="userInfos.userCertificate">
									</td>
								</tr>
							</table>
							
							<a> + 添加合租人</a>
						</div>
						<div class="ivu-floor loadin3">
							<p>租期信息:</p>
							<ul class="zq">
								<li><span class="qzr">起租日：</span>
									<Date-picker type="date" placeholder="请选择日期" v-model="onhrie"></Date-picker>
								</li>
								<li><span class="qzr">到期日：</span>
									<Date-picker type="date" placeholder="请选择日期" v-model="expire"></Date-picker>
								</li>
								<ul class="apartment">
									<li v-for="(apps,index) in apartments">
										<a @click="apart(index)" :class="{'hus':activ == index}">{{apps.dats}}</a>
									</li>
								</ul>
							</ul>
	
						</div>
						<div class="ivu-floor loadin4">
							<div class="div1">
								<p>租金和付款方式:</p>
								<table>
									<tr>
										<td>首笔支付:</td>
										<td>
											<el-select v-model="value2" placeholder="请选择支付方式" @change="way(value2)">
												<el-option v-for="item in options3" :key="item.name" :value="item.name">
												</el-option>
											</el-select>
										</td>
									</tr>
									<tr>
										<td>租金:</td>
										<td><input type="text" placeholder="请输入租金" v-model="housetderta.roomRent"><span>元/月</span></td>
									</tr>
									<tr>
										<td>租金折扣/浮动比例:</td>
										<td><input type="text" placeholder="请输入百分比" v-model="discount"><span>%</span></td>
									</tr>
									<tr>
										<td>服务费:</td>
										<td><input type="text" placeholder="请输入服务费" v-model="serve"><span>元/月</span></td>
									</tr>
								</table>
							</div>
							<div class="div2">
								<p>其他费用:</p>
								<div class="floor-item">
									<table class="table ivu-table">
										<tr v-for="tableRepair in tableRepairs">
	
											<td width="200px">
												<input type="text" placeholder="请输入费用名称" />
											</td>
	
											<td width="180px"><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入金额" style="width: 120px"><span>元</span></td>
											<td width="80px"><button class="btn_bar">{{tableRepair.deletect}}</button></td>
											<td></td>
										</tr>
									</table>
									<Button @click="addRepairs" class="addm"><Icon type="plus"></Icon>添加费用</Button>
								</div>
								<div class="clear"></div> 
								
							</div>
							
						</div>
						<div class="ivu-floor loadin5">
							<table>
								<tr>
									<td>用户需支付首款:</td>
									<td style="color: #00FF00;">{{firstmoney}}</td>
								</tr>
								<tr>
									<td>首款支付方式:</td>
									<td>
										<el-radio class="radio" v-model="radio3" label="1" :change="ones(firstmoney)">一次付清</el-radio>
										<el-radio class="radio" v-model="radio3" label="2" :change="ones(firstmoney)">两次付清</el-radio>
									</td>
								</tr>
								<tr>
									<td></td>
									<td>
										<ul>
											<li><span>第一次支付:</span><input type="text" placeholder="请输入金额" v-model="housetderta.onemoney" @blur="alway(firstmoney,housetderta.onemoney)"><span>元</span></li>
											<li><span>第二次支付:</span><input type="text" placeholder="请输入金额" v-model="housetderta.twomoney"><span>元</span></li>
											<li><span class="dt">付款期限:</span><input type="text" placeholder="请填写天数" v-model="dat"><span>日内</span></li>
										</ul>
									</td>
								</tr>
								<tr>
									<td>水电费用:</td>
									<td>
										<ul class="uls">
											<li><span>水费:</span><span>{{housetderta.waterPrice}}元/人/月</span></li>
											<li><span>电费:</span><span>{{housetderta.energyPrice}}元/度</span>
												<span>初始:</span><input type="text" v-model="housetderta.roomWater"/><span>度</span>
											</li>
										</ul>
									</td>
								</tr>
							</table>
						</div>
						<div class="ivu-floor loadin6">
							<table>
								<tr>
									<td>是否签署纸质合同:</td>
									<td>
										<el-radio class="radio" v-model="radio4" label="1">是</el-radio>
										<el-radio class="radio" v-model="radio4" label="2">否</el-radio>
									</td>
								</tr>
								<tr>
									<td>上传证明:</td>
									<td class="boxs">
										<div class="ivu-main-img">
											<div class="item-img">
												<div class="uplodas">
													<div>
													<input type="file"  accept="image/png,image/jpg" name="file" class="file" @change="uploadfile"/>	
													<Icon type="camera" class="icons"></Icon>
													<span class="titew">上传身份证照片</span>
													</div>
												</div>
												<div class="uplodas">
													<div>
													<input type="file"  accept="image/png,image/jpg" name="file" class="file" @change="uploadfile2"/>	
													<Icon type="camera" class="icons"></Icon>
													<span class="titew">上传合同照片/扫描件</span>
													</div>
												</div>
												<div class="demo-upload-list" v-for="item in uploadList">
											        <template>
											            <img :src="item">
											            <div class="demo-upload-list-cover">
											                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
											            </div>
											        </template>
											    </div> 
											    
												<div class="demo-upload-list" v-for="item in uploadList2">
											        <template>
											            <img :src="item">
											            <div class="demo-upload-list-cover">
											                <Icon type="ios-trash-outline" @click.native="handleRemove2(item)"></Icon>
											            </div>
											        </template>
											    </div>
											</div>
										</div>
									</td>
								</tr>
							</table>
	
						</div>
						<div class="ivu-floor loadin7">
							<div class="div2">
								<p>物资清点:</p>
								<div class="floor-item">
									<table class="table ivu-table">
										<tr v-for="tableRepair in tableRepairs2">
											<td width="150px">
												<input type="text" placeholder="请输入物品名称" />
											</td width="140px">
											<td><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入数量" style="width: 120px"></td>
											<td></td>
										</tr>
									</table>
								<Button @click="addRepairs2" class="addm"><Icon type="plus"></Icon>新增物品</Button>
								<Button class="addm addj">保存</Button>
								</div>
								<div class="clear"></div> 
							</div>
							
						</div>
						<div class="ivu-floor loadin8">
							
							
								<p class="hint">中介方:</p>
								<table>
									<tr>
										<td>中介公司:</td>
										<td><input type="text" placeholder="请输入中介公司名称"></td>
									</tr>
									<tr>
										<td>中介人:</td>
										<td><input type="text" placeholder="请输入中介人"></td>
									</tr>
									<tr>
										<td>中介费:</td>
										<td><input type="text" placeholder="请输入中介费"></td>
									</tr>
								</table>
								<p class="hints"><i class="el-icon-information"></i><span>提交后,系统将向用户端app、用户微信、用户手机短信发送提醒通知</span></p>
								<Button class="addm">提交</Button>
			
								
							
						</div>
					</div>
					
					<!--公司租客-->
					<div v-if="radios == 2">
						<div class="ivu-floor loadin2">
							<p>经办人信息:</p>
							<table>
								<tr>
									<td>已注册手机号:</td>
									<td><input type="text" placeholder="请输入手机号"></td>
								</tr>
								<tr>
									<td>姓名:</td>
									<td><input type="text" placeholder="请输入姓名"></td>
								</tr>
								<tr>
									<td>性别:</td>
									<td>
										<el-radio class="radio" v-model="radio" label="1">女</el-radio>
										<el-radio class="radio" v-model="radio" label="2">男</el-radio>
									</td>
								</tr>
								<tr>
									<td>证件类型:</td>
									<td>
										<el-select v-model="value" placeholder="请选择证件类型">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<td>证件号码:</td>
									<td><input type="text" placeholder="请输入证件号码"></td>
								</tr>
							</table>
							<a> + 添加合租人</a>
						</div>
						<div class="ivu-floor loadinv">
							<p>公司信息:</p>
							<table>
								<tr>
									<td>已注册手机号:</td>
									<td><input type="text" placeholder="请输入手机号"></td>
								</tr>
								<tr>
									<td>姓名:</td>
									<td><input type="text" placeholder="请输入姓名"></td>
								</tr>
							</table>
						</div>
						<div class="ivu-floor loadin3">
							<p>租期信息:</p>
							<ul class="zq">
								<li><span class="qzr">起租日：</span>
									<Date-picker type="date" placeholder="请选择日期"></Date-picker>
								</li>
								<li><span class="qzr">到期日：</span>
									<Date-picker type="date" placeholder="请选择日期"></Date-picker>
								</li>
								<ul class="apartment">
									<li>
										<a>一年</a>
									</li>
									<li>
										<a>6个月</a>
									</li>
									<li>
										<a>3个月</a>
									</li>
									<li>
										<a>1个月</a>
									</li>
								</ul>
							</ul>
	
						</div>
						<div class="ivu-floor loadin4">
							<div class="div1">
								<p>租金和付款方式:</p>
								<table>
									<tr>
										<td>首笔支付:</td>
										<td>
											<el-select v-model="value" placeholder="请选择证件类型">
												<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
												</el-option>
											</el-select>
										</td>
									</tr>
									<tr>
										<td>租金:</td>
										<td><input type="text" placeholder="请输入租金"><span>元/月</span></td>
									</tr>
									<tr>
										<td>租金折扣/浮动比例:</td>
										<td><input type="text" placeholder="请输入百分比"><span>%</span></td>
									</tr>
									<tr>
										<td>服务费:</td>
										<td><input type="text" placeholder="请输入服务费"><span>元/月</span></td>
									</tr>
								</table>
							</div>
							<div class="div2">
								<p>其他费用:</p>
								<div class="floor-item">
									<table class="table ivu-table">
										<tr v-for="tableRepair in tableRepairs">
	
											<td width="250px">
												<input type="text" placeholder="请输入费用名称" />
											</td>
	
											<td width="200px"><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入金额" style="width: 120px"><span>元</span></td>
											<td width="90px"><button class="btn_bar">{{tableRepair.deletect}}</button></td>
										</tr>
									</table>
								</div>
							</div>
							<Button @click="addRepairs" class="addm"><Icon type="plus"></Icon>添加费用</Button>
						</div>
						<div class="ivu-floor loadin5">
							<table>
								<tr>
									<td>用户需支付首款:</td>
									<td style="color: #00FF00;">5500.00元</td>
								</tr>
								<tr>
									<td>首款支付方式:</td>
									<td>
										<el-radio class="radio" v-model="radio" label="1">一次付清</el-radio>
										<el-radio class="radio" v-model="radio" label="2">两次付清</el-radio>
									</td>
								</tr>
								<tr>
									<td></td>
									<td>
										<ul>
											<li><span>第一次支付:</span><input type="text" placeholder="请输入金额"><span>元</span></li>
											<li><span>第一次支付:</span><input type="text" placeholder="请输入金额"><span>元</span></li>
											<li><span class="dt">付款期限:</span><input type="text" placeholder="请填写天数"><span>日内</span></li>
										</ul>
									</td>
								</tr>
								<tr>
									<td>水电费用:</td>
									<td>
										<ul class="uls">
											<li><span>水费:</span><span>30.00元/人/月</span></li>
											<li><span>电费:</span><span>2.20元/度</span>
												<span>初始:</span><input type="text" /><span>度</span>
											</li>
										</ul>
									</td>
								</tr>
							</table>
						</div>
						<div class="ivu-floor loadin6">
							<table>
								<tr>
									<td>是否签署纸质合同:</td>
									<td>
										<el-radio class="radio" v-model="radio" label="1">是</el-radio>
										<el-radio class="radio" v-model="radio" label="2">否</el-radio>
									</td>
								</tr>
								<tr>
									<td>上传证明:</td>
									<td>
										<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
											<i class="el-icon-plus"></i>
	
										</el-upload>
										<el-dialog v-model="dialogVisible" size="tiny">
											<img width="100%" :src="dialogImageUrl" alt="">
										</el-dialog>
									</td>
								</tr>
							</table>
	
						</div>
						<div class="ivu-floor loadin7">
							<div class="div2">
								<p>物资清点:</p>
								<div class="floor-item">
									<table class="table ivu-table">
										<tr v-for="tableRepair in tableRepairs2">
											<td>
												<input type="text" placeholder="请输入物品名称" />
											</td>
											<td><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入数量" style="width: 120px"></td>
										</tr>
									</table>
								</div>
							</div>
							<Button @click="addRepairs2" class="addm"><Icon type="plus"></Icon>新增物品</Button>
							<Button class="addm addj">保存</Button>
						</div>
						<div class="ivu-floor loadin8">
							
							
								<p class="hint">中介方:</p>
								<table>
									<tr>
										<td>中介公司:</td>
										<td><input type="text" placeholder="请输入中介公司名称"></td>
									</tr>
									<tr>
										<td>中介人:</td>
										<td><input type="text" placeholder="请输入中介人"></td>
									</tr>
									<tr>
										<td>中介费:</td>
										<td><input type="text" placeholder="请输入中介费"></td>
									</tr>
								</table>
								<p class="hints"><i class="el-icon-information"></i><span>提交后,系统将向用户端app、用户微信、用户手机短信发送提醒通知</span></p>
								<Button class="addm">提交</Button>
			
								
							
						</div>
					</div>
				</div>
			</div>
			<footer-box></footer-box>
		</div>
	</div>

</template>

<script>
	import '../../sass/style/lodgingHouse.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import qs from 'qs';
	import axios from 'axios';
	import { hostController,hostRoomList,hostRoomUser,hostWay,imgPath } from '../api.js';
	
	export default {
		components: {
			rightHeader,
			menuBox,
			footerBox
		},
		data() {
			return {
				radios: '1',
				radio:'1',
				radio3:'1',
				radio4:'1',
				options1: [],
				options3:[],
				tableRepairs: [{
					checkValue: "",
					inputValue: "",
					date: "",
					deletect: "删除"
				}],
				tableRepairs2: [{
					checkValue: "",
					inputValue: "",
					date: "",
				}],
				dialogImageUrl: '',
				dialogVisible: false,
				value:'',
				roomNum:'',
				communityId:'',
				Name:'',
				housetderta:{
					housetypeName:'',
					roomWater:'',
					roomElectric:'',
					waterPrice:'',
					energyPrice:'',
					waterType:'',
					electricType:'',
					materials:'',
					roomFurniture:'',
					roomRent:'',
					onemoney:null,
					twomoney:null,
					firstmoneys:null
					
				},
				userInfo:null,
				aaduserInfo:[{
					userCertificate:'',
					username:'',
					phone:null,
					radio2: '1',
					options2:[],
				}],
				value2:'',
				onhrie:null,   //起租日
				expire:null,  //到租日
				apartments:[{
						dats:'一年'
					},
					{
						dats:'六个月'
					},
					{
						dats:'三个月'
					},
					{
						dats:'一个月'
				}],
				activ:'0',
				costInfo:null,
				contract:'', //合同
				serve:null,  //服务费
				discount:null,   //折扣
				uploadList: [],
				uploadList2:[],
				finished:false,
				imgName:'',
//				firstmoney:'',
				filelist:[],
				filelist2:[],
				dat:null
			}
		},
		mounted(){
			this.communityId = this.$route.query.communityId;
			this.Name = this.$route.query.Name;
			this.datas();
			this.uploadList = this.$refs.upload.fileList;
		},
		computed:{
			firstmoney:function(){
				let vm = this
				if(this.value2 == '押二付一'){
					return (vm.housetderta.roomRent * vm.discount * 3 / 100 + vm.serve).toFixed(2) + '元';
				}
				else if(this.value2 == '押一付一'){
					return (vm.housetderta.roomRent * vm.discount * 2 / 100 + vm.serve).toFixed(2) + '元';
				}
				else if(this.value2 == '季付'){
					return (vm.housetderta.roomRent * vm.discount * 3 / 100 + vm.serve).toFixed(2) + '元';
				}
				else if(this.value2 == '年付'){
					return (vm.housetderta.roomRent * vm.discount * 12 / 100 +vm.serve).toFixed(2) + '元';
				}
			},
			twomoney:function(){
				return this.housetderta.twomoney;
			}
		},
		watch:{
			twomoney:function(val,oldval){
//				handler:function(val,oldval){
					console.log(2222222);
					console.log(val);
					console.log(oldval);
					this.housetderta.twomoney = (parseFloat(this.housetderta.firstmoneys) - parseFloat(this.housetderta.onemoney)).toFixed(2);
//				},
				deep:true
				
			}
		},
		methods: {
			addRepairs() {
				this.tableRepairs.push({
					checkValue: "",
					inputValue: "",
					date: "",
					deletect: "删除"
				})
			},
			addRepairs2(){
				this.tableRepairs2.push({
					checkValue: "",
					inputValue: "",
					date: "",
				})
			},
			User(val){
				axios.post(hostRoomUser,
					qs.stringify({           //获取用户信息
						userPhone:val
					})
				)
				.then((response)=>{
					//console.log(response);
					if(response.status == 200 && response.data.code == 10000){
						this.userInfo = response.data.result.userInfo;
						this.aaduserInfo[0].radio2 = this.userInfo.gender + '';
						let id = this.userInfo.certificateId;
						this.value = this.aaduserInfo[0].options2[this.aaduserInfo[0].options2.findIndex(item => item.dataId == id)].dataName;
					}
				})
				.catch((error)=>{
					console.log(error);
				})
			},
			datas(){
				let vm = this
				axios.post(hostRoomList,        //获取未出租的房间
					qs.stringify({         
						communityId:this.communityId
					})
				)
				.then((response)=>{
					//console.log(response);
					if(response.status == 200 && response.data.code == 10000){
						this.options1 = response.data.result.rentRoomList;
					}
				})
				.catch((error)=>{
					console.log(error);
				})
				axios.post(hostController,    //  获取签约的合同及付款方式
					qs.stringify({
						communityId:this.communityId,
						signType:0
					})
				)
				.then((response)=>{
					//console.log(response);
					if(response.status == 200 && response.data.code == 10000){
						this.costInfo = response.data.result;
						this.contract = this.costInfo.contractNumber;
						this.serve = this.costInfo.costInfo.serviceCost;
						this.options3 = this.costInfo.paywayList;
						for(let i = 0;i<vm.options3.length;i++){
							if(this.options3[i].data_id == '1'){
								vm.options3[i].name = '押二付一';
							}
							if(this.options3[i].data_id == 2){
								vm.options3[i].name = '押一付一';
							}
							if(this.options3[i].data_id == 3){
								vm.options3[i].name = '季付';
							}
							if(this.options3[i].data_id == 4){
								vm.options3[i].name = '年付';
							}
						}
					}
					
				})
				.catch((error)=>{
					console.log(error);
				})
				
				axios.post(hostWay,               //证件类型
					qs.stringify({
						parentId:35
					})
				)
				.then((response)=>{
					//console.log(response);
					if(response.status == 200 && response.data.code == 10000){
						this.aaduserInfo[0].options2 = response.data.entity;
					}
				})
				.catch((error)=>{
					console.log(error);
				})
			},
			room(Num){
				this.housetderta = this.options1[this.options1.findIndex(item => item.roomNum == Num)];
				//console.log(this.housetderta);
			},
			way(val){
				this.discount = this.options3[this.options3.findIndex(item => item.name == val)].discount;
			},
			apart(index){
				this.activ = index;
				
				if(this.onhrie != null){
					var nes = new Date(this.onhrie);
					if(index == 0){
						nes.setFullYear(nes.getFullYear()+1);
						this.expire = nes;
					}
					else if(index == 1){
						nes.setMonth(nes.getMonth()+6);
						this.expire = nes;
					}
					else if(index == 2){
						nes.setMonth(nes.getMonth()+3);
						this.expire = nes;
					}
					else if(index == 3){
						nes.setMonth(nes.getMonth()+1);
						this.expire = nes;
					}
				}
			},
            handleRemove(item) {
               let fileIndex = this.uploadList.findIndex(items => items == item);
               this.uploadList.splice(fileIndex,1);
            },
            handleRemove2(item) {
               let fileIndex = this.uploadList2.findIndex(items => items == item);
               this.uploadList2.splice(fileIndex,1);
            },
			uploadfile(e){
				let vm = this;
				let file = e.target.files[0];
				let files = [file, file.name];
				console.log(111111111);
				let windowURL = window.URL || window.webkitURL;
				
				if(vm.uploadList.length<5){
					this.filelist.push(file);
					//console.log(this.filelist);
					vm.uploadList.push(windowURL.createObjectURL(e.target.files[0]));
					console.log(vm.uploadList);
				}
				else{
					alert('最多可以上传5张图片');
				}
			},
			uploadfile2(e){
				let vm = this;
				let file = e.target.files[0];
				let files = [file, file.name];
				console.log(111111111);
				let windowURL = window.URL || window.webkitURL;
				
				if(vm.uploadList.length<5){
					this.filelist2.push(file);
					//console.log(this.filelist);
					vm.uploadList2.push(windowURL.createObjectURL(e.target.files[0]));
					console.log(vm.uploadList2);
				}
				else{
					alert('最多可以上传5张图片');
				}
			},
			ones(val){
				//console.log(val);
				this.housetderta.firstmoneys = val;
				if(val != null){
					if(this.radio3 == '1'){
						this.housetderta.onemoney = parseFloat(val).toFixed(2);
						this.housetderta.twomoney = 0;
					}
					else{
						this.housetderta.twomoney = null;
					}
				}
				else{
					return false;
				}
				
			},
			alway(fires,val){
				let vm = this
				if(fires != null){
					if(this.radio3 == '2'){
						this.housetderta.twomoney = (parseFloat(fires) - parseFloat(val)).toFixed(2);
					
						console.log(111111111);
						console.log(this.housetderta.twomoney);
					}
				}
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
</style>