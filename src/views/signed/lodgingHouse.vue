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
								<td><input type="text" name="" id="" placeholder="请输入合同编号" /></td>
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
							<table>
								<tr>
									<td>已注册手机号:</td>
									<td><input type="text" placeholder="请输入手机号" v-model="aaduserInfo.phone" @blur="User(aaduserInfo.phone)"></td>
								</tr>
								<tr>
									<td>姓名:</td>
									<td>
										<input type="text" placeholder="请输入姓名" v-if="userInfo != null" v-model="userInfo.userName">
										<input type="text" placeholder="请输入姓名" v-else v-model="aaduserInfo.username">
									</td>
								</tr>
								<tr>
									<td>性别:</td>
									<td>
										<el-radio class="radio" v-model="aaduserInfo.radio2" label="1">男</el-radio>
										<el-radio class="radio" v-model="aaduserInfo.radio2" label="2">女</el-radio>
									</td>
								</tr>
								<tr>
									<td>证件类型:</td>
									<td>
										<el-select v-model="value" placeholder="请选择证件类型">
											<el-option v-for="item in aaduserInfo.options2" :key="item.dataName" :value="item.dataName">
											</el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<td>证件号码:</td> 
									<td>
										<input type="text" placeholder="请输入证件号码" v-if="userInfo != null" v-model="userInfo.userCertificate">
										<input type="text" placeholder="请输入证件号码" v-else v-model="aaduserInfo.userCertificate">
									</td>
								</tr>
							</table>
							
							<a> + 添加合租人</a>
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
											<el-select v-model="value2" placeholder="请选择支付方式">
												<el-option v-for="item in options3" :key="item.dataName" :value="item.dataName">
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
										<tr>
											<td width="250px">
												<input type="text" placeholder="请输入费用名称" />
											</td>
											<td width="200px"><input class="ivu-input" placeholder="请输入金额" style="width: 120px"><span>元</span></td>
										</tr>
										<tr v-for="tableRepair in tableRepairs">
	
											<td width="250px">
												<input type="text" placeholder="请输入费用名称" />
											</td>
	
											<td width="200px"><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入金额" style="width: 120px"><span>元</span></td>
											<td width="90px"><button class="btn_bar" @click="deleteRepair">{{tableRepair.deletect}}</button></td>
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
										<tr v-for="tableRepair in tableRepairs">
											<td >
												<input type="text" value="床" />
											</td>
											<td><input class="ivu-input" v-model="tableRepair.date" style="width: 120px"></td>
										</tr>
										<tr v-for="tableRepair in tableRepairs">
											<td>
												<input type="text" placeholder="请输入物品名称" />
											</td>
											<td><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入数量" style="width: 120px"></td>
										</tr>
									</table>
								</div>
							</div>
							<Button @click="addRepairs" class="addm"><Icon type="plus"></Icon>新增物品</Button>
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
										<tr>
											<td width="250px">
												<input type="text" placeholder="请输入费用名称" />
											</td>
											<td width="200px"><input class="ivu-input" placeholder="请输入金额" style="width: 120px"><span>元</span></td>
										</tr>
										<tr v-for="tableRepair in tableRepairs">
	
											<td width="250px">
												<input type="text" placeholder="请输入费用名称" />
											</td>
	
											<td width="200px"><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入金额" style="width: 120px"><span>元</span></td>
											<td width="90px"><button class="btn_bar" @click="deleteRepair">{{tableRepair.deletect}}</button></td>
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
										<tr v-for="tableRepair in tableRepairs">
											<td >
												<input type="text" value="床" />
											</td>
											<td><input class="ivu-input" v-model="tableRepair.date" style="width: 120px"></td>
										</tr>
										<tr v-for="tableRepair in tableRepairs">
											<td>
												<input type="text" placeholder="请输入物品名称" />
											</td>
											<td><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入数量" style="width: 120px"></td>
										</tr>
									</table>
								</div>
							</div>
							<Button @click="addRepairs" class="addm"><Icon type="plus"></Icon>新增物品</Button>
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
	import { hostController,hostRoomList,hostRoomUser,hostWay } from '../api.js';
	
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
				options1: [],
				options3:[],
				options: [{
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
				tableRepairs: [{
					checkValue: "",
					inputValue: "",
					element: "预计上门时间：",
					date: "",
					deletect: "删除"
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
					roomRent:''
				},
				userInfo:null,
				aaduserInfo:{
					userCertificate:'',
					username:'',
					phone:null,
					radio2: '1',
					options2:[],
				},
				value2:''
			}
		},
		mounted(){
			this.communityId = this.$route.query.communityId;
			this.Name = this.$route.query.Name;
			this.datas();
			this.credentials();
		},
		methods: {
			addRepairs() {
				this.tableRepairs.push({
					checkValue: "",
					inputValue: "",
					element: "预计上门时间：",
					date: "",
					deletect: "删除"
				})
			},
			credentials(){
				axios.post(hostWay,
					qs.stringify({
						parentId:1
					})
				)
				.then((response)=>{
					console.log(response);
					if(response.status == 200 && response.data.code == 10000){
						this.options3 = response.data.entity;
					}
				})
				.catch((error)=>{
					console.log(error);
				})
			},
			addperson(){
				
			},
			User(val){
				axios.post(hostRoomUser,
					qs.stringify({           //获取用户信息
						userPhone:val
					})
				)
				.then((response)=>{
					console.log(response);
					if(response.status == 200 && response.data.code == 10000){
						this.userInfo = response.data.result.userInfo;
						this.aaduserInfo.radio2 = this.userInfo.gender + '';
						let id = this.userInfo.certificateId;
						this.value = this.aaduserInfo.options2[this.aaduserInfo.options2.findIndex(item => item.dataId == id)].dataName;
					}
				})
				.catch((error)=>{
					console.log(error);
				})
			},
			datas(){
				axios.post(hostRoomList,        //获取未出租的房间
					qs.stringify({         
						communityId:this.communityId
					})
				)
				.then((response)=>{
					console.log(response);
					if(response.status == 200 && response.data.code == 10000){
						this.options1 = response.data.result.rentRoomList;
					}
				})
				.catch((error)=>{
					console.log(error);
				})
				axios.post(hostController,    //
					qs.stringify({
						communityId:this.communityId,
						signType:0
					})
				)
				.then((response)=>{
					//console.log(response);
					
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
					console.log(response);
					if(response.status == 200 && response.data.code == 10000){
						this.aaduserInfo.options2 = response.data.entity;
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
			deleteRepair(item) {
				this.tableRepairs.splice(item, 1);
			},
			handleRemove(file, fileList) {
				//console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
</style>