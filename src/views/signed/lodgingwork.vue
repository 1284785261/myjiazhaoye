<template>
	<div>
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置：工作台 > </span>
					<router-link class="active" to="/apartment/workbench">签约</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>联合办公签约</h3>
					<span>{{Name}}</span>
				</div>
				<div id="lodgingwork">
					<div class="ivu-floor loadin1">
						<table>
							<tr>
								<td>所属社区:</td>
								<td>{{Name}}</td>
							</tr>
							<tr>
								<td>办公室:</td>
								<td>
									<el-select v-model="roomNum" filterable placeholder="输入或选择" @change="room(roomNum)">
										<el-option v-for="item in options1" :key="item.roomNum" :value="item.roomNum">
										</el-option>
									</el-select>
								</td>
							</tr>
							<tr>
								<td>类型:</td>
								<td>{{housetderta.housetypeName}}人间</td>
							</tr>
							<tr>
								<td>合同编号:</td>
								<td><input type="text" name="" id="" placeholder="请输入合同编号" v-model="contract" /></td>
							</tr>

						</table>
					</div>
					<div class="ivu-floor loadin2">
						<p>经办人信息:</p>
						<table v-for="(userInfos,index) in aaduserInfo">
							<tr>
								<td>已注册手机号:</td>
								<td><input type="text" placeholder="请输入手机号" v-model="userInfos.phone" @blur="User(userInfos.phone)" maxlength="13"></td>
							</tr>
							<tr>
								<td>姓名:</td>
								<td><input type="text" placeholder="请输入姓名" v-model="userInfos.username" maxlength="10"></td>
							</tr>
							<tr>
								<td>性别:</td>
								<td>
									<el-radio class="radio" v-model="userInfos.radio2" label="2">女</el-radio>
									<el-radio class="radio" v-model="userInfos.radio2" label="1">男</el-radio>
								</td>
							</tr>
							<tr>
								<td>证件类型:</td>
								<td>
									<el-select v-model="value" placeholder="请选择证件类型" @change="selectCommunity(value,index)">
										<el-option v-for="item in userInfos.options2" :key="item.dataName" :value="item.dataName">
										</el-option>
									</el-select>
								</td>
							</tr>
							<tr>
								<td>证件号码:</td>
								<td><input type="text" placeholder="请输入证件号码" v-model="userInfos.userCertificate" maxlength="24"></td>
							</tr>
						</table>

					</div>
					<div class="ivu-floor loadinv">
						<p>公司信息:</p>
						<table>
							<tr>
								<td>公司信息:</td>
								<td><input type="text" placeholder="请输入公司信息" v-model="companyInfo" maxlength="30"></td>
							</tr>
							<tr>
								<td>法人姓名:</td>
								<td><input type="text" placeholder="请输入法人姓名" v-model="companylegalPerson" maxlength="10"></td>
							</tr>
						</table>
					</div>
					<div class="ivu-floor loadin3">
						<p>租期信息:</p>
						<ul class="zq">
							<li><span class="qzr">起租日：</span>
								<Date-picker type="date" :options="option1" placeholder="请选择日期" v-model="onhrie"></Date-picker>
								<input type="text" placeholder="请输入月数" v-model="letMounted" maxlength="5" style="width:100px;height:36px;margin-right:5px;" @blur="countdatas(letMounted)"><span>月</span>
							</li>
							<li><span class="qzr">到期日：</span>
								<Date-picker type="date" :options="option2" placeholder="请选择日期" v-model="expire" disabled></Date-picker>
							</li>
							<ul class="apartment">
								<li v-for="(apps,index) in apartments">
									<a @click="apart(index)" :class="{'hus':activ == index}">{{apps.dats}}  {{apps.discount}}%</a>
								</li>
							</ul>
						</ul>
					</div>
					<div class="ivu-floor loadin4">
						<div class="div1">
							<p>租金和付款方式:</p>
							<table>
								<tr>
									<td>租金原价:</td>
									<td><input type="text" placeholder="请输入租金" v-model="housetderta.roomRent" maxlength="10"><span>元/月</span></td>
								</tr>
								<tr>
									<td>押金:</td>
									<td><input type="text" placeholder="请输入月数" v-model="depositmonth" maxlength="10" style="width:120px;"><span>月</span></td>
								</tr>
								<tr>
									<td>支付方式:</td>
									<td>
										<el-select v-model="value2" placeholder="请选择支付方式" @change="way(value2)">
											<el-option v-for="item in options3" :key="item.name" :value="item.name">
											</el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<td>租金折扣/浮动比例:</td>
									<td><input type="text" placeholder="请输入百分比" v-model="discount" maxlength="5"><span>%</span></td>
								</tr>
								<tr>
									<td>免租期:</td>
									<td><input type="text" placeholder="请输入月数" v-model="freeMonth" maxlength="10" style="width:120px;" @blur="monitorfree(freeMonth)"><span>月</span><span v-if="giveMonth" style="margin-left:0;">(赠送日期：{{giveMonth}})</span></td>
								</tr>
								<tr>
									<td>服务费:</td>
									<td><input type="text" placeholder="请输入服务费" v-model="serve" maxlength="10"><span>元/月</span></td>
								</tr>
							</table>
						</div>
						<div class="div2">
							<p>其他费用:</p>
							<table>
								<tr v-for="(tableRepair,index) in tableRepairs">

									<td width="200px">
										<input type="text" placeholder="请输入费用名称" v-model="tableRepair.inputValue" maxlength="10"/>
									</td>

									<td width="180px"><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入金额" style="width: 120px" maxlength="10"><span>元</span></td>
									<td width="80px"><button class="btn_bar" @click="delet(index)">{{tableRepair.deletect}}</button></td>
									<td></td>
								</tr>
							</table>
							<div class="clear"></div>
							<Button @click="addRepairs" class="addm"><Icon type="plus"></Icon>添加费用</Button>						
						</div>
						<div class="formulasb" v-if="formula">
							<h3>计算方式</h3>
							<div>
								<p v-if ="this.deposit != 0">押金：{{deposit}}元 = {{deposittext}}</p>
								<p>首月房费：{{roommonry}}元 = {{roommonryg}}</p>
								<p>首月服务费：{{fwmonry}}元 = {{fwmonryg}}</p>
								<p v-if="letcup">剩余月租金：{{residuerent}}元 = {{residuerentg}}</p>
								<p>其他费用：{{cyclePayOtherCost}}元</p>
								<p>合计：{{firstmoney}}</p>
							</div>
						</div>
					</div>
					<div class="ivu-floor loadin5">
						<table>
							<tr>
								<td>用户需支付首款:</td>
								<td style="color: red;">{{firstmoney}}</td>
							</tr>
							<tr>
								<td>首款支付方式:</td>
								<td>
									<el-radio class="radio" v-model="radio3" label="1" :change="ones(firstmoney)">一次付清</el-radio>
									<!-- <el-radio class="radio" v-model="radio3" label="2" :change="ones(firstmoney)">两次付清</el-radio> -->
								</td>
							</tr>
							<tr v-show="radio3 == 2">
								<td></td>
								<td>
									<ul>
										<li><span>第一次支付:</span><input type="text" placeholder="请输入金额" v-model="onemoney" @blur="alway(firstmoney,onemoney)" maxlength="10"><span>元</span></li>
										<li><span>第二次支付: </span><span>{{twomoney}}</span><span>元</span></li>
										<li><span class="dt">付款期限:</span><input type="text" placeholder="请填写天数" v-model="dat" maxlength="10"><span>日内</span></li>
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

								<td style="vertical-align: top;line-height: 40px;">上传证明:</td>
								<td class="boxs">
									<div class="ivu-main-img">
										<div class="item-img">
											<div class="uplodas" v-for="(item,index) in labelList" v-if="radio4 == '1'">
												<div  v-if="!imgList[index]" @click="indexs = index">
													<input type="file" accept="image/*" name="file" class="file" @change="uploadfile" />
													<Icon type="camera" class="icons"></Icon>
													<span class="titew">上传{{item}}</span>
												</div>
                                                <div class="demo-upload-list" v-if="imgList[index]" v-loading.body="loadList[index]">
                                                    <template >
                                                        <img :src="imgList[index]">
                                                        <div class="demo-upload-list-cover">
                                                            <Icon type="ios-trash-outline" @click.native="handleRemoven(index)"></Icon>
                                                        </div>
                                                    </template>
                                                </div>
											</div>
											<div class="uplodas" v-for="(item,index) in labelList2" v-if="radio4 == '2'">
												<div  v-if="!imgList[index]" @click="indexs = index">
													<input type="file" accept="image/*" name="file" class="file" @change="uploadfile" />
													<Icon type="camera" class="icons"></Icon>
													<span class="titew">上传{{item}}</span>
												</div>
                                                <div class="demo-upload-list" v-if="imgList[index]" v-loading.body="loadList[index]">
                                                    <template >
                                                        <img :src="imgList[index]">
                                                        <div class="demo-upload-list-cover">
                                                            <Icon type="ios-trash-outline" @click.native="handleRemoven(index)"></Icon>
                                                        </div>
                                                    </template>
                                                </div>
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
											<input type="text" placeholder="请输入物品名称" v-model="tableRepair.inputValue" maxlength="10" disabled/>
										</td width="140px">
										<td><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入数量" style="width: 120px" maxlength="10"></td>
										<td></td>
									</tr>
								</table>
								<Button @click="addRepairs2" class="addm"><Icon type="plus"></Icon>新增物品</Button>
								<Button class="addm addj" @click="save">保存</Button>
							</div>
							<div class="clear"></div>
						</div>

					</div>
					<div class="ivu-floor loadin8">

						<p class="hints"><i class="el-icon-information"></i><span>提交后,系统将向用户端app、用户微信、用户手机短信发送提醒通知</span></p>
						<Button class="addm" @click="SigController2" :disabled="disabledm">提交</Button>

					</div>
				</div>
			</div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
	</div>

</template>

<script>
	import '../../sass/style/lodgingwork.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import qs from 'qs';
	import axios from 'axios';
	import { hostOfficeList, hostSignOffice, hostRoomUser, hostWay, hostController,host,imgPath } from '../api.js';

	export default {
		components: {
			rightHeader,
			menuBox,
			footerBox,
			successModal,
			warningModal
		},
		data() {
			var _this = this;
			return {
				activeTabName:"workbench",
				successModal: false,
				warningModal: false,
				successMessage: '签约成功',
				warningMessage: '签约信息不完整，请检查填写信息',
				radios: '1',
				radio: '1',
				radio3: '1',
				radio4: '1',
				options1: [],
				options2: [],
				options3: [],
				tableRepairs: [{
					checkValue: "",
					inputValue: "",
					date: "",
					deletect: "删除"
				}],
				tableRepairs2: [{
					checkValue: "",
					inputValue: "",
					date: ""
				}],
				dialogImageUrl: '',
				dialogVisible: false,
				value: '',
				roomNum: '',
				communityId: '',
				Name: '',
				housetderta: {
					housetypeName: '',
					roomWater: '',
					roomElectric: '',
					waterPrice: '0.00',
					energyPrice: '0.00',
					waterType: '',
					electricType: '',
					materials: '',
					roomFurniture: '',
					roomRent: '',
					twomoney: 0,
					firstmoneys: ''
				},
				onemoney: 0,
				userInfo: null,
				aaduserInfo: [{
					id: '',
					userCertificate: '',
					certificateId:'',
					username: '',
					phone: null,
					radio2: '2',
					options2: [],
					version: '',
				}],
				value2: '',
				onhrie: null, //起租日
				expire: null, //到租日
				apartments: [{
						datsid:4,
						dats: '一年',
						discount:'100',
						letMounted:12
					},
					{
						datsid:3,
						dats: '六个月',
						discount:'100',
						letMounted:6
					},
					{
						datsid:2,
						dats: '三个月',
						discount:'100',
						letMounted:3
					},
					{
						datsid:1,
						dats: '一个月',
						discount:'100',
						letMounted:1
					}
				],
				activ: '0',
				costInfo: null,
				contract: '', //合同
				serve: null, //服务费
				discount: null, //折扣
				uploadList: [],
				uploadList2: [],
				uploadList3: [],
				uploadList4: [],
				uploadList5: [],
				uploadList6: [],
				uploadList7: [],
				uploadList8: [],
				finished: false,
				imgName: '',
				filelist1: [],
				filelist2: [],
				filelist3: [],
				filelist4: [],
				filelist5: [],
				filelist6: [],
				filelist7: [],
				filelist8: [],
				dat: null,
				cyclePayType: '',
				credentialsImagesArray: [],
				credentialsTitle: [],
				otherCostJson: '',
				materials: '',
				options4: [],
				furniture: '',
				companyInfo: '', //公司信息
				companylegalPerson: '',
				dialogImageUrl: '',
				dialogVisible: false,
				labelList:['法人身份证正面','法人身份证反面','承租人身份证正面','承租人身份证反面','委托书','服务协议','服务守则','工商证明','免责申明','合同'],
				labelList2:['法人身份证正面','法人身份证反面','承租人身份证正面','承租人身份证反面','委托书','服务协议','服务守则','工商证明','免责申明'],
                imgShow:[],
                loadList:[],
				indexs:'',
				host3:'',
				imgList:[],
				imgPath:'',
				fileList:[],
				// option1: {
				// 	disabledDate (date) {
				// 		return date && date.valueOf() < Date.now() - 86400000;
				// 	}
				// },
				option2: {
					disabledDate (date) {
						return date && date.valueOf() <= _this.onhrie;
					}
				},
				formula:false,
				deposit:0,
				roommonryg:'',
				fwmonryg:'',
				roommonry:'',
				fwmonry:'',
				residuerent:'',
				residuerentg:'',
				cyclePayOtherCost:0,
				letMounted:null,
				depositmonth:null,  //押金月数
				freeMonth:null,  //免租期
				giveMonth:'', //赠送日期段
				letcup:true,
				deposittext:'',
				disabledm:false
			}
		},
		mounted() {
		    for(let k in this.labelList){
//		      this.$set(this.imgShow,k,false)
		      this.$set(this.loadList,k,false)
		      this.$set(this.imgList,k,0)
            }
            this.imgPath = imgPath
            this.host3 = host + '/cxkj-room/apis/system/file/SystemFileUpload100023';
			this.communityId = this.$route.query.communityId;
			this.Name = this.$route.query.Name;
			this.datas();
		},
		computed: {
			firstmoney: function() {
				let vm = this

				var date = new Date();
				//获取年份
				var datms = new Date(this.onhrie); //定义当前日期
				var expiredate = new Date(this.expire); //定义到期日期
				var year = date.getFullYear();
				//获取当前月份
				var mouth = date.getMonth() + 1;
				var daym = datms.getDate() - 1;
				var expireyear = expiredate.getFullYear();
				//获取到期日期月份
				var expiremouth = expiredate.getMonth() + 1;
				var expiredaym = expiredate.getDate();
				
				var days;//定义当月的天数；
				var expiredays;//定义到期月的天数；

				//当月份为二月时，根据闰年还是非闰年判断天数
				if (mouth == 2) {
					days = year % 4 == 0 ? 29 : 28;
				}
				else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
					//月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
					days = 31;
				}
				else {
					//其他月份，天数为：30.
					days = 30;
				}
				//到期月份总天数
				if (expiremouth == 2) {
					expiredays = expireyear % 4 == 0 ? 29 : 28;
				}
				else if (expiremouth == 1 || expiremouth == 3 || expiremouth == 5 || expiremouth == 7 || expiremouth == 8 || expiremouth == 10 || expiremouth == 12) {
					//月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
					expiredays = 31;
				}
				else {
					//其他月份，天数为：30.
					expiredays = 30;
				}

				//联合办公计算方式
				let q = 0;
				let fy = (vm.housetderta.roomRent * parseFloat((days-daym)/days).toFixed(10)) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100);//第一个月房费计算方式
				let fw = parseFloat(vm.serve * parseFloat((days-daym)/days).toFixed(10)).toFixed(2);//第一个月服务费计算方式
				this.roommonry = parseFloat(fy).toFixed(2);
				this.fwmonry = parseFloat(fw).toFixed(2);
				for(let i = 0; i < this.tableRepairs.length; i++) {   //其他费用总和
					if(parseInt(this.tableRepairs[i].date) > 0) {
						q += parseFloat(this.tableRepairs[i].date);
					}
				}
				this.cyclePayOtherCost = q;
				if(this.depositmonth > 0){
					this.deposit = parseInt(this.housetderta.roomRent * parseInt(this.depositmonth) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100)).toFixed(2);
					this.deposittext = this.housetderta.roomRent + '*'+ this.depositmonth +'*'+vm.discount+'%折扣'+'*'+vm.apartments[vm.activ].discount+'%折扣';
				}else{
					this.deposit = 0;
				}
				
				this.roommonryg = this.housetderta.roomRent+'/'+days +'*'+'('+days +'-' + daym +')天'+ '*'+this.discount+'%折扣' + '*'+vm.apartments[vm.activ].discount+'%折扣';
				this.fwmonryg = this.serve+'/'+days +'*('+days+'-'+daym+')天';
				if(this.value2 == '月付') {
					return(parseFloat(vm.deposit) + parseFloat(fy) + parseFloat(fw) + parseFloat(q)).toFixed(2) + '元';
					this.residuerent = '';
					this.residuerentg = '';	
				} else if(this.value2 == '季付') {
					if(datms.getDate() == 1){
						if(vm.apartments[vm.activ].letMounted >= 3 && vm.apartments[vm.activ].letMounted < 6){
							
							this.residuerent = parseFloat(parseFloat(vm.housetderta.roomRent * 2) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100)).toFixed(2);
							this.residuerentg = '('+vm.housetderta.roomRent +'*2+'+ vm.housetderta.roomRent +'*('+expiredaym+'/'+expiredays+')天)*'+vm.discount+'%折扣*'+vm.apartments[vm.activ].discount+'%折扣';
							return(parseFloat(vm.deposit) + parseFloat(vm.housetderta.roomRent * 2) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100) + parseFloat(fy) + parseFloat(fw) + parseFloat(q)).toFixed(2) + '元';
						}else if(vm.apartments[vm.activ].letMounted >= 6 && vm.apartments[vm.activ].letMounted <= 12){
							this.residuerent = parseFloat(parseFloat(vm.housetderta.roomRent * 2) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100)).toFixed(2);
							this.residuerentg = vm.housetderta.roomRent +'*2*'+vm.discount+'%折扣*'+vm.apartments[vm.activ].discount+'%折扣';
							return (parseFloat(vm.deposit) + parseFloat(vm.housetderta.roomRent * 2) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100) + parseFloat(fy) + parseFloat(fw) + parseFloat(q)).toFixed(2) + '元';						
						}
					}else{
						if(vm.apartments[vm.activ].letMounted >= 3 && vm.apartments[vm.activ].letMounted < 6){
							
							this.residuerent = parseFloat(parseFloat(vm.housetderta.roomRent * 2) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100) + parseFloat(vm.housetderta.roomRent) * parseFloat(expiredaym/expiredays) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100)).toFixed(2);
							this.residuerentg = '('+vm.housetderta.roomRent +'*2+'+ vm.housetderta.roomRent +'*('+expiredaym+'/'+expiredays+')天)*'+vm.discount+'%折扣*'+vm.apartments[vm.activ].discount+'%折扣';
							return(parseFloat(vm.deposit) + parseFloat(vm.housetderta.roomRent * 2) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100) + parseFloat(vm.housetderta.roomRent) * parseFloat(expiredaym/expiredays).toFixed(10) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100) + parseFloat(fy) + parseFloat(fw) + parseFloat(q)).toFixed(2) + '元';
						}else if(vm.apartments[vm.activ].letMounted >= 6 && vm.apartments[vm.activ].letMounted <= 12){
							this.residuerent = parseFloat(parseFloat(vm.housetderta.roomRent * 3) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100)).toFixed(2);
							this.residuerentg = vm.housetderta.roomRent +'*3*'+vm.discount+'%折扣*'+vm.apartments[vm.activ].discount+'%折扣';
							return (parseFloat(vm.deposit) + parseFloat(vm.housetderta.roomRent * 3) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100) + parseFloat(fy) + parseFloat(fw) + parseFloat(q)).toFixed(2) + '元';						
						}
					}
				} else if(this.value2 == '半年付') {
					if(datms.getDate() == 1){
						if(vm.apartments[vm.activ].letMounted >= 6 && vm.apartments[vm.activ].letMounted < 12){
							this.residuerent = parseFloat(parseFloat(vm.housetderta.roomRent * 5) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100)).toFixed(2);
							this.residuerentg = '('+vm.housetderta.roomRent +'*5+'+ vm.housetderta.roomRent +'*('+expiredaym+'/'+expiredays+')天)*'+vm.discount+'%折扣*'+vm.apartments[vm.activ].discount+'%折扣';
							return(parseFloat(vm.deposit) + parseFloat(vm.housetderta.roomRent * 5) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100) + parseFloat(fy) + parseFloat(fw) + parseFloat(q)).toFixed(2) + '元';
						}
						else if(vm.apartments[vm.activ].letMounted == 12){
							this.residuerent = parseFloat(parseFloat(vm.housetderta.roomRent * 5) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100)).toFixed(2);
							this.residuerentg = vm.housetderta.roomRent +'*5*'+vm.discount+'%折扣*'+vm.apartments[vm.activ].discount+'%折扣';
							return(parseFloat(vm.deposit) + parseFloat(vm.housetderta.roomRent * 5) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100) + parseFloat(fy) + parseFloat(fw) + parseFloat(q)).toFixed(2) + '元';	
						}
					}else{
						if(vm.apartments[vm.activ].letMounted >= 6 && vm.apartments[vm.activ].letMounted < 12){
							this.residuerent = parseFloat(parseFloat(vm.housetderta.roomRent * 5) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100) + parseFloat(vm.housetderta.roomRent) * parseFloat(expiredaym/expiredays) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100)).toFixed(2);
							this.residuerentg = '('+vm.housetderta.roomRent +'*5+'+ vm.housetderta.roomRent +'*('+expiredaym+'/'+expiredays+')天)*'+vm.discount+'%折扣*'+vm.apartments[vm.activ].discount+'%折扣';
							return(parseFloat(vm.deposit) + parseFloat(vm.housetderta.roomRent * 5) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100) + parseFloat(vm.housetderta.roomRent) * parseFloat(expiredaym/expiredays).toFixed(10) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100) + parseFloat(fy) + parseFloat(fw) + parseFloat(q)).toFixed(2) + '元';
						}
						else if(vm.apartments[vm.activ].letMounted == 12){
							this.residuerent = parseFloat(parseFloat(vm.housetderta.roomRent * 6) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100)).toFixed(2);
							this.residuerentg = vm.housetderta.roomRent +'*6*'+vm.discount+'%折扣*'+vm.apartments[vm.activ].discount+'%折扣';
							return(parseFloat(vm.deposit) + parseFloat(vm.housetderta.roomRent * 6) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100) + parseFloat(fy) + parseFloat(fw) + parseFloat(q)).toFixed(2) + '元';	
						}
					}
				} else if(this.value2 == '年付') {
					if(datms.getDate() == 1){
						if(vm.apartments[vm.activ].letMounted == 12){
							this.residuerent = parseFloat(parseFloat(vm.housetderta.roomRent * 11) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100)).toFixed(2);
							this.residuerentg = '('+vm.housetderta.roomRent +'*11+'+ vm.housetderta.roomRent +'*('+expiredaym+'/'+expiredays+')天)*'+vm.discount+'%折扣*'+vm.apartments[vm.activ].discount+'%折扣';
							return(parseFloat(vm.deposit) + parseFloat(vm.housetderta.roomRent * 11) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100) + parseFloat(fy) + parseFloat(fw) + parseFloat(q)).toFixed(2) + '元';
						}
					}else{
						if(vm.apartments[vm.activ].letMounted == 12){
							this.residuerent = parseFloat(parseFloat(vm.housetderta.roomRent * 11) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100) + parseFloat(vm.housetderta.roomRent) * parseFloat(expiredaym/expiredays) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100)).toFixed(2);
							this.residuerentg = '('+vm.housetderta.roomRent +'*11+'+ vm.housetderta.roomRent +'*('+expiredaym+'/'+expiredays+')天)*'+vm.discount+'%折扣*'+vm.apartments[vm.activ].discount+'%折扣';
							return(parseFloat(vm.deposit) + parseFloat(vm.housetderta.roomRent * 11) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100) + parseFloat(vm.housetderta.roomRent) * parseFloat(expiredaym/expiredays).toFixed(10) * (vm.discount / 100) * (parseFloat(vm.apartments[vm.activ].discount)/100) + parseFloat(fy) + parseFloat(fw) + parseFloat(q)).toFixed(2) + '元';
						}
					}
				}
			},
			twomoney: function() {
				if(this.onemoney && this.housetderta.firstmoneys) {
					this.housetderta.twomoney = (parseFloat(this.housetderta.firstmoneys) - parseFloat(this.onemoney)).toFixed(2);
					return this.housetderta.twomoney
				}else{
					return 0
				}
				
			}
		},
		watch: {
			onemoney(val) {
				if(val) {
					this.onemoney = parseFloat(val).toFixed(2);
				}
			},
			serve:function(){
				this.serve = this.serve.replace(/[^\d.]/,'');
			},
			freeMonth:function(){
				this.freeMonth = this.freeMonth.replace(/[^\d]/,'');
			},
			letMounted:function(){
				this.letMounted = this.letMounted.replace(/[^\d]/,'');
			},
			depositmonth:function(){
				this.depositmonth = this.depositmonth.replace(/[^\d]/,'');
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
				// console.log(this.tableRepairs);
			},
			addRepairs2() {
				this.tableRepairs2.push({
					checkValue: "",
					inputValue: "",
					date: "",
				})
				// console.log(this.tableRepairs2);
			},
			deleteRepair(item) {
				this.tableRepairs.splice(item, 1);
			},
			handleRemove(file, fileList) {
				// console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			selectCommunity(value,index){
				console.log(value,index);
				console.log(this.aaduserInfo);
				this.aaduserInfo[index].certificateId = this.aaduserInfo[index].options2[this.aaduserInfo[index].options2.findIndex(item => item.dataName == value)].dataId;
				console.log(this.aaduserInfo[index].certificateId);
			},
			datas() {
				let vm = this
				axios.post(hostOfficeList, //获取未出租的办公室列表
						qs.stringify({
							communityId: this.communityId
						})
					)
					.then((response) => {
						// console.log(111111111);
						// console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.options1 = response.data.result.rentRoomList;
							// console.log(this.options1);
						}
					})
					.catch((error) => {
						// console.log(error);
					})

				axios.post(hostController, //  获取签约的合同及付款方式
						qs.stringify({
							communityId: this.communityId,
							signType: 1
						})
					)
					.then((response) => {
						// console.log(22222222222222);
						console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.costInfo = response.data.result;
							this.contract = this.costInfo.contractNumber;
							this.serve = this.costInfo.costInfo.serviceCost;
							this.options3 = this.costInfo.paywayList;
							for(let i = 0; i < vm.options3.length; i++) {
								if(this.options3[i].data_id == '1') {
									vm.options3[i].name = '月付';
								}
								if(this.options3[i].data_id == '2') {
									vm.options3[i].name = '季付';
								}
								if(this.options3[i].data_id == '3') {
									vm.options3[i].name = '半年付';
								}
								if(this.options3[i].data_id == '4') {
									vm.options3[i].name = '年付';
								}
							}

							for(let i = 0;i < this.costInfo.datewayList.length;i++){
								for(let j = 0;j < this.apartments.length;j++){
									if(this.apartments[j].datsid == this.costInfo.datewayList[i].data_id){
										// console.log(1111111111);
										this.apartments[j].discount = this.costInfo.datewayList[i].discount;
									}
								}
								
							}
							// console.log(this.apartments);
						}

					})
					.catch((error) => {
						// console.log(error);
					})

				axios.post(hostWay, //证件类型
						qs.stringify({
							parentId: 35
						})
					)
					.then((response) => {
						// console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.aaduserInfo[0].options2 = response.data.entity;
							this.options2 = response.data.entity;

						}
					})
					.catch((error) => {
						// console.log(error);
					})
				axios.post(hostWay, //物资类型
						qs.stringify({
							parentId: 29
						})
					)
					.then((response) => {
						// console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.options4 = response.data.entity;
						}
					})
					.catch((error) => {
						// console.log(error);
					})
			},
			room(val) {
				//console.log(val);
				this.housetderta = this.options1[this.options1.findIndex(item => item.roomNum == val)];
				// console.log(this.housetderta);
				let arr = JSON.parse(this.housetderta.materials);
				for(let i = 0; i < this.tableRepairs2.length; i++) {
					if(this.tableRepairs2.length < arr.length) {
						this.addRepairs2();
					}
					this.tableRepairs2[i].inputValue = arr[i].materialName;
					this.tableRepairs2[i].date = arr[i].count;
				}
			},
			delet(index){
				// console.log(index);
				this.tableRepairs.splice(index,1);
			},
			User(val) {
				axios.post(hostRoomUser,
						qs.stringify({ //获取用户信息
							userPhone: val
						})
					)
					.then((response) => {
						// console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.userInfo = response.data.result.userInfo;
							console.log(this.userInfo);
							if(this.userInfo.userCertificate != 'null'){
								this.aaduserInfo[0].userCertificate = this.userInfo.userCertificate;
							}else{
								this.aaduserInfo[0].userCertificate = ''
							}
							if(this.userInfo.userName){
								this.aaduserInfo[0].username = this.userInfo.userName;
							}
							if(this.userInfo.gender){
								this.aaduserInfo[0].radio2 = this.userInfo.gender + '';
							}
							
							this.aaduserInfo[0].id = this.userInfo.id;
							this.aaduserInfo[0].version = this.userInfo.version;
							this.aaduserInfo[0].phone = this.userInfo.userPhone;
							this.aaduserInfo[0].certificateId = this.userInfo.certificateId;
							if(this.userInfo.userCertificate != 'null'){
								this.aaduserInfo[0].userCertificate = this.userInfo.userCertificate;
							}else{
								this.aaduserInfo[0].userCertificate = ''
							}
							if(this.userInfo.certificateId != null){
								let id = this.userInfo.certificateId;
								this.value = this.aaduserInfo[0].options2[this.aaduserInfo[0].options2.findIndex(item => item.dataId == id)].dataName;
							}
							
						} else {
							// console.log('该手机未注册用户')
						};
					})
					.catch((error) => {
						// console.log(error);
					})
			},
			closeWarningModal() {
				this.warningModal = false;
			},
			monitorfree(value){
				if(parseInt(value) >= parseInt(this.letMounted)){
					alert('免租期月不能大于租期月');
					this.freeMonth = 0;
				}
				let nes = new Date(this.expire);
				let nem = new Date(this.expire);
				let Month;
				let Months;
				console.log(nes.getMonth());
				nem.setDate(nem.getDate()+1);
				nes.setMonth(nes.getMonth() + parseInt(value));
				Month = nes;
				Months = nem;
				if(Month && value > 0){
					this.giveMonth = new Date(Months).Format("yyyy年MM月dd日") +'-'+ new Date(Month).Format("yyyy年MM月dd日");
				}else{
					this.giveMonth = null;
				}
				
			},
			way(val) {
				let vm = this
				this.formula = true;
				let date1 = new Date(this.onhrie).Format("yyyy-MM-dd");
				let date2 = new Date(this.expire).Format("yyyy-MM-dd");
				date1 = date1.split('-');
				date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
				date2 = date2.split('-');
				date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
				if(Math.abs(date2 - date1) < 2 && val  == '季付'){
					vm.warningModal = true;
					vm.warningMessage = '签约方式选择季付，租期不能小于三个月';
					vm.value2 = this.options3[0].name;
				}
				else if(Math.abs(date2 - date1) < 5 && val  == '半年付'){
					vm.warningModal = true;
					vm.warningMessage = '签约方式选择半年付，租期不能小于六个月';
					vm.value2 = this.options3[0].name;
				}
				else if(Math.abs(date2 - date1) < 11 && val  == '年付'){
					vm.warningModal = true;
					vm.warningMessage = '签约方式选择年付，租期不能小于一年';
					vm.value2 = this.options3[0].name;
				}
				else{
					this.discount = this.options3[this.options3.findIndex(item => item.name == val)].discount;
					this.cyclePayType = this.options3[this.options3.findIndex(item => item.name == val)].data_id;
				}

				if(val == '月付'){
					this.letcup = false;
				}else{
					this.letcup = true;
				}

			},
			apart(index) {
				let vm = this
				this.activ = index;
				if(this.onhrie) {
					if(this.value2  == '季付' && this.apartments[this.activ].letMounted < 3){
						this.warningModal = true;
						this.warningMessage = '签约方式选择季付，租期不能小于三个月';
						this.activ = 2;
					}
					else if(this.value2  == '半年付' && this.apartments[this.activ].letMounted < 6){
						this.warningModal = true;
						this.warningMessage = '签约方式选择半年付，租期不能小于六个月';
						this.activ = 1;
					}
					else if(this.value2  == '年付'&& this.apartments[this.activ].letMounted < 12){
						this.warningModal = true;
						this.warningMessage = '签约方式选择年付，租期不能小于十二个月';
						this.activ = 0;
					}else{
						
						var nes = new Date(this.onhrie);
						if(index == 0) {
							nes.setFullYear(nes.getFullYear() + 1);
							nes.setMonth(nes.getMonth(),nes.getDate()-1);
							this.expire = nes;
							this.letMounted = 12;
						} else if(index == 1) {
							nes.setMonth(nes.getMonth() + 6,nes.getDate()-1);
							this.expire = nes;
							this.letMounted = 6;
						} else if(index == 2) {
							nes.setMonth(nes.getMonth() + 3,nes.getDate()-1);
							this.expire = nes;
							this.letMounted = 3;
						} else if(index == 3) {
							nes.setMonth(nes.getMonth() + 1,nes.getDate()-1);
							this.expire = nes;
							this.letMounted = 1;
						}
					}
				}
				else{
					alert('请填写起租日');
				}
			},
			//计算月份得到到期日
			countdatas(value){
				if(this.onhrie || value){
					var nes = new Date(this.onhrie);
					// parseInt
					nes.setMonth(nes.getMonth() + parseInt(value),nes.getDate()-1);
					this.expire = nes;
				}

				if(value == 1){
					this.activ = 3;
				}else if(value == 3){
					this.activ = 2;
				}else if(value == 6){
					this.activ = 1;
				}else if(value == 12){
					this.activ = 0;
				}
			},
			handleRemoven(item) {
			  let vm = this;
              vm.$set(vm.imgList,vm.indexs,0)
              vm.fileList.splice(vm.indexs, 1);
			},
			uploadfile(e) {
				let vm = this;
				let file = e.target.files[0];
				let office ='office'
				if(!file){
				  return
                }
              vm.$set(vm.loadList,vm.indexs,true)
              let param = new FormData();
              param.append('file', file)
              param.append('module', office)
              vm.$http.post(vm.host3, param)
                .then(res => {
                  if (parseInt(res.data.code) == 10000) {
                    vm.$set(vm.imgList,vm.indexs,vm.imgPath+res.data.result.virtualPath)
                    setTimeout(function(){
                      vm.$set(vm.loadList,vm.indexs,false)
                    },500)
                    vm.fileList.push({'filePath':res.data.result.virtualPath,'fileTitle':vm.labelList[vm.indexs]})
                  }
                }).catch(err => {
                alert(err)
              })
			},
			ones(val) {
				// console.log(val);
				this.housetderta.firstmoneys = val;
				if(val != null) {
					if(this.radio3 == '1') {
						if(parseFloat(val)) {
							this.onemoney = parseFloat(val).toFixed(2);
							this.housetderta.twomoney = 0;
						}
					} else {
						this.housetderta.twomoney = null;
					}
				} else {
					return false;
				}

			},
			save() {
				alert('保存成功');
			},
			alway(fires, val) {
				let vm = this
				if(fires != null) {
					if(this.radio3 == '2') {
						if(parseFloat(val)) {
							this.housetderta.twomoney = (parseFloat(fires) - parseFloat(val)).toFixed(2);
						}
					}
				}
			},
			SigController2(){
				let vm = this         //办公室租客签约
				let param = new FormData();
				let arr = [];
				this.disabledm = true;
				for(let i = 0;i< this.tableRepairs.length;i++){
					if(this.tableRepairs[i].inputValue != '' && this.tableRepairs[i].date != ''){
						arr.push({"costName":this.tableRepairs[i].inputValue,"costAmount":this.tableRepairs[i].date});
					}
				}
				this.otherCostJson = JSON.stringify(arr);
				
				let arr2 = [];
				for(let i = 0;i<this.tableRepairs2.length;i++){
					if(this.tableRepairs2[i].inputValue != '' && this.tableRepairs2[i].date != ''){
						arr2.push({"materialName":this.tableRepairs2[i].inputValue,"count":this.tableRepairs2[i].date});
					}
				}
				let arr3 = [];
				this.materials = JSON.stringify(arr2);
				for(let i = 0;i<arr2.length;i++){
					arr3.push(this.options4[this.options4.findIndex(item => item.dataName == arr2[i].materialName)].dataId);
				}
				if(this.fileList.length < 9){
				  this.warningMessage = '证明未上传完整';
				  this.warningModal = true;
				  this.disabledm = false;
                  return
                }
                param.append('credentialsImages',JSON.stringify(vm.fileList));
				this.furniture = JSON.stringify(arr3);
				this.onhrie = new Date(this.onhrie).Format('yyyy-MM-dd');
				this.expire = new Date(this.expire).Format('yyyy-MM-dd');
				// console.log(this.communityId);
				// console.log(this.contract)
				// console.log(this.housetderta.roomId)
				// console.log(this.housetderta.version)
				param.append('communityId',this.communityId);
				param.append('contractNumber',this.contract);
				param.append('buildingId',this.housetderta.roomId);
				param.append('buildingVersion',this.housetderta.version);
				param.append('customerType',2);
				param.append('beginDate',this.onhrie);
				param.append('endDate',this.expire);
				param.append('cyclePayType',this.cyclePayType);
				param.append('cyclePayMoney',this.housetderta.roomRent);
				param.append('cyclePayDiscount',this.discount);
				param.append('serviceCost',this.serve);
				param.append('firstMoneyPayType',this.radio3);
				if(this.radio3 == '1'){
					param.append('firstPayMoney',this.onemoney);
				}else if(this.radio3 == '2'){
					param.append('firstMoney',this.onemoney);
					param.append('secondPayMoney',this.housetderta.twomoney);
					param.append('secondPayDate',this.dat);
				}
				param.append('isPaper',this.radio4);
				param.append('user.id',this.aaduserInfo[0].id);
				param.append('user.version',this.aaduserInfo[0].version);
				param.append('user.userPhone',this.aaduserInfo[0].phone);
				param.append('user.userName',this.aaduserInfo[0].username);
				param.append('user.gender',this.aaduserInfo[0].radio2);
				param.append('user.certificateId',this.aaduserInfo[0].certificateId);
				param.append('user.userCertificate',this.aaduserInfo[0].userCertificate);
				// console.log(this.user);
				param.append('materials',this.materials);
				param.append('furniture',this.furniture);
				if(this.otherCostJson){
					param.append('otherCostJson',this.otherCostJson);
				}
				param.append('companyInfo',this.companyInfo);
				param.append('companyLegalPerson',this.companylegalPerson);
				param.append('deposit',this.deposit);
				param.append('freeMonth',this.freeMonth);
				param.append('datewayDiscount',this.apartments[this.activ].discount);
				param.append('paywayDiscount',this.discount);
				if(!this.cyclePayType){
					vm.warningMessage = '未选择支付方式';
					vm.warningModal = true;
					vm.disabledm = false;
					return
				}else{
					axios.post(hostSignOffice,param).then(res =>{
						console.log(res);
						if(res.status == 200 && res.data.code == 10000){	
							vm.successModal = true;
							setTimeout(()=>{
								vm.successModal = false;
								vm.disabledm = false;
								this.$router.push('/contract/contractIndex');
							},3000);
						}
						else{
							vm.disabledm = false;
							vm.warningMessage = res.data.content;
							vm.warningModal = true;
						}
					})
					.catch(error=>{
						vm.warningMessage = '签约信息不完整,请检查信息填写';
						vm.warningModal = true;
						
						// console.log(error);
					})
				}
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
	.location_community{
    .ivu-icon-location{
      font-size: 38px;
      color: red;
      position: relative;
      top: 10px;
      left: 5px;
    }
  }
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
	.formulasb{
		position: absolute;
		left:800px;
		top:5%;
		h3{
			line-height: 50px;
		}
		p{
			line-height: 28px;
		}
	}
</style>