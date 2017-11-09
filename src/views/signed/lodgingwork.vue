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
						<table v-for="userInfos in aaduserInfo">
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
									<el-select v-model="value" placeholder="请选择证件类型">
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
									<td><input type="text" placeholder="请输入租金" v-model="housetderta.roomRent" maxlength="10"><span>元/月</span></td>
								</tr>
								<tr>
									<td>租金折扣/浮动比例:</td>
									<td><input type="text" placeholder="请输入百分比" v-model="discount" maxlength="10"><span>%</span></td>
								</tr>
								<tr>
									<td>服务费:</td>
									<td><input type="text" placeholder="请输入服务费" v-model="serve" maxlength="10"><span>元/月</span></td>
								</tr>
							</table>
						</div>
						<div class="div2">
							<p>其他费用:</p>
							<div class="floor-item">
								<table class="table ivu-table">
									<tr v-for="(tableRepair,index) in tableRepairs">

										<td width="200px">
											<input type="text" placeholder="请输入费用名称" v-model="tableRepair.inputValue" maxlength="10"/>
										</td>

										<td width="180px"><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入金额" style="width: 120px" maxlength="10"><span>元</span></td>
										<td width="80px"><button class="btn_bar" @click="delet(index)">{{tableRepair.deletect}}</button></td>
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
								<td style="color: red;">{{firstmoney}}</td>
							</tr>
							<tr>
								<td>首款支付方式:</td>
								<td>
									<el-radio class="radio" v-model="radio3" label="1" :change="ones(firstmoney)">一次付清</el-radio>
									<el-radio class="radio" v-model="radio3" label="2" :change="ones(firstmoney)">两次付清</el-radio>
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
											<div class="uplodas" v-for="(item,index) in labelList" >
												<div  v-if="!imgList[index]" @click="indexs = index">
													<input type="file" accept="image/png,image/jpg" name="file" class="file" @change="uploadfile" />
													<Icon type="camera" class="icons"></Icon>
													<span class="titew">上传{{item}}</span>
												</div>
                                                <div class="demo-upload-list" v-if="imgList[index]" v-loading.body="loadList[index]">
                                                    <template >
                                                        <img :src="imgList[index]">
                                                        <div class="demo-upload-list-cover">
                                                            <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
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
											<input type="text" placeholder="请输入物品名称" v-model="tableRepair.inputValue" maxlength="10"/>
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
						<Button class="addm" @click="SigController2">提交</Button>

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
					userCertificate: '',
					username: '',
					phone: null,
					radio2: '2',
					options2: [],
				}],
				value2: '',
				onhrie: null, //起租日
				expire: null, //到租日
				apartments: [{
						dats: '一年'
					},
					{
						dats: '六个月'
					},
					{
						dats: '三个月'
					},
					{
						dats: '一个月'
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
				user: {
					id: '',
					version: '',
					userPhone: '',
					userName: '',
					gender: '',
					certificateId: '',
					userCertificate: ''
				},
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
                labelList:['法人身份证','委托人身份证','委托书','服务协议','服务守则','工商证明','免责申明','合同'],
                imgShow:[],
                loadList:[],
              indexs:'',
              host3:'',
              imgList:[],
              imgPath:'',
              fileList:[],
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
				if(this.value2 == '押二付一') {
					let q = 0;
					for(let i = 0; i < this.tableRepairs.length; i++) {
						if(parseInt(this.tableRepairs[i].date) > 0) {
							q += parseInt(this.tableRepairs[i].date);
						}
					}
					return(vm.housetderta.roomRent * vm.discount * 3 / 100 + parseInt(vm.serve) + parseInt(q)).toFixed(2) +'元';
				} else if(this.value2 == '押一付一') {
					let q = 0;
					for(let i = 0; i < this.tableRepairs.length; i++) {
						if(parseInt(this.tableRepairs[i].date) > 0) {
							q += parseInt(this.tableRepairs[i].date);
						}
					}
					return(vm.housetderta.roomRent * vm.discount * 2 / 100 + parseInt(vm.serve) + parseInt(q)).toFixed(2) +'元';
				} else if(this.value2 == '季付') {
					let q = 0;
					for(let i = 0; i < this.tableRepairs.length; i++) {
						if(parseInt(this.tableRepairs[i].date) > 0) {
							q += parseInt(this.tableRepairs[i].date);
						}
					}
					return(vm.housetderta.roomRent * vm.discount * 3 / 100 + parseInt(vm.serve) + parseInt(q)).toFixed(2) +'元';
				} else if(this.value2 == '年付') {
					let q = 0;
					for(let i = 0; i < this.tableRepairs.length; i++) {
						if(parseInt(this.tableRepairs[i].date) > 0) {
							q += parseInt(this.tableRepairs[i].date);
						}
					}
					return(vm.housetderta.roomRent * vm.discount * 12 / 100 + parseInt(vm.serve) + parseInt(q)).toFixed(2) +'元';
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
			discount:function(){
				this.discount = this.discount.replace(/[^\d.]/,'');
			},
			serve:function(){
				this.serve = this.serve.replace(/[^\d.]/,'');
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
				console.log(this.tableRepairs);
			},
			addRepairs2() {
				this.tableRepairs2.push({
					checkValue: "",
					inputValue: "",
					date: "",
				})
				console.log(this.tableRepairs2);
			},
			deleteRepair(item) {
				this.tableRepairs.splice(item, 1);
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			datas() {
				let vm = this
				axios.post(hostOfficeList, //获取未出租的办公室列表
						qs.stringify({
							communityId: this.communityId
						})
					)
					.then((response) => {
						console.log(111111111);
						console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.options1 = response.data.result.rentRoomList;
							console.log(this.options1);
						}
					})
					.catch((error) => {
						console.log(error);
					})

				axios.post(hostController, //  获取签约的合同及付款方式
						qs.stringify({
							communityId: this.communityId,
							signType: 0
						})
					)
					.then((response) => {
						console.log(22222222222222);
						console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.costInfo = response.data.result;
							this.contract = this.costInfo.contractNumber;
							this.serve = this.costInfo.costInfo.serviceCost;
							this.options3 = this.costInfo.paywayList;
							for(let i = 0; i < vm.options3.length; i++) {
								if(this.options3[i].data_id == '1') {
									vm.options3[i].name = '押二付一';
								}
								if(this.options3[i].data_id == 2) {
									vm.options3[i].name = '押一付一';
								}
								if(this.options3[i].data_id == 3) {
									vm.options3[i].name = '季付';
								}
								if(this.options3[i].data_id == 4) {
									vm.options3[i].name = '年付';
								}
							}
						}

					})
					.catch((error) => {
						console.log(error);
					})

				axios.post(hostWay, //证件类型
						qs.stringify({
							parentId: 35
						})
					)
					.then((response) => {
						//console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.aaduserInfo[0].options2 = response.data.entity;
							this.options2 = response.data.entity;

						}
					})
					.catch((error) => {
						console.log(error);
					})
				axios.post(hostWay, //物资类型
						qs.stringify({
							parentId: 29
						})
					)
					.then((response) => {
						//console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.options4 = response.data.entity;
						}
					})
					.catch((error) => {
						console.log(error);
					})
			},
			room(val) {
				console.log(val);
				this.housetderta = this.options1[this.options1.findIndex(item => item.roomNum == val)];
				console.log(this.housetderta);
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
				console.log(index);
				this.tableRepairs.splice(index,1);
			},
			User(val) {
				axios.post(hostRoomUser,
						qs.stringify({ //获取用户信息
							userPhone: val
						})
					)
					.then((response) => {
						console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.userInfo = response.data.result.userInfo;
							console.log(this.userInfo);
							this.aaduserInfo[0].userCertificate = this.userInfo.userCertificate;
							this.aaduserInfo[0].username = this.userInfo.userName + '';
							this.aaduserInfo[0].radio2 = this.userInfo.gender + '';
							this.user.id = this.userInfo.id;
							this.user.version = this.userInfo.version;
							this.user.userPhone = this.userInfo.userPhone;
							this.user.userName = this.userInfo.userName;
							this.user.gender = this.userInfo.gender;
							this.user.certificateId = this.userInfo.certificateId;
							this.user.userCertificate = this.userInfo.userCertificate;
							let id = this.userInfo.certificateId;
							this.value = this.aaduserInfo[0].options2[this.aaduserInfo[0].options2.findIndex(item => item.dataId == id)].dataName;
						} else {
							console.log('该手机未注册用户')
						};
					})
					.catch((error) => {
						console.log(error);
					})
			},
			closeWarningModal() {
				this.warningModal = false;
			},
			way(val) {
				this.discount = this.options3[this.options3.findIndex(item => item.name == val)].discount;
				this.cyclePayType = this.options3[this.options3.findIndex(item => item.name == val)].data_id;

			},
			apart(index) {
				this.activ = index;

				if(this.onhrie != null) {
					var nes = new Date(this.onhrie);
					if(index == 0) {
						nes.setFullYear(nes.getFullYear() + 1);
						this.expire = nes;
					} else if(index == 1) {
						nes.setMonth(nes.getMonth() + 6);
						this.expire = nes;
					} else if(index == 2) {
						nes.setMonth(nes.getMonth() + 3);
						this.expire = nes;
					} else if(index == 3) {
						nes.setMonth(nes.getMonth() + 1);
						this.expire = nes;
					}
				}
			},
			handleRemove(item) {
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
                    vm.fileList.push({'filePath':'res.data.result.virtualPath','fileTitle':vm.labelList[vm.indexs]})
                  }
                }).catch(err => {
                alert(err)
              })
			},
			ones(val) {
				//console.log(val);
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
				let vm = this         //公寓公司租客签约
				let param = new FormData();
				let arr = [];
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
				if(this.fileList.length!=8){
                  this.successModal = true;
                  this.successMessage = '证明未上传完整';
                  return
                }
                param.append('credentialsImages',JSON.stringify(vm.fileList));
				this.furniture = JSON.stringify(arr3);
				this.onhrie = new Date(this.onhrie).Format('yyyy-MM-dd');
				this.expire = new Date(this.expire).Format('yyyy-MM-dd');
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
				
				param.append('waterChargeModel',this.housetderta.waterType);
				param.append('electricChargeModel',this.housetderta.electricType);
				param.append('isPaper',this.radio4);
				param.append('user.id',this.user.id);
				param.append('user.version',this.user.version);
				param.append('user.userPhone',this.user.userPhone);
				param.append('user.userName',this.user.userName);
				param.append('user.gender',this.user.gender);
				param.append('user.certificateId',this.user.certificateId);
				param.append('user.userCertificate',this.user.userCertificate);
				console.log(this.user);
				param.append('materials',this.materials);
				param.append('furniture',this.furniture);
				if(this.otherCostJson){
					param.append('otherCostJson',this.otherCostJson);
				}
				param.append('companyInfo',this.companyInfo);
				param.append('companylegalPerson',this.companylegalPerson);
		        axios.post(hostSignOffice,this.param).then(res =>{
		        	if(res.status == 200 && res.data.code == 10000){
						console.log(res);
						vm.successModal = true;
						setTimeout(()=>{
							vm.successModal = false;
							this.$router.push('/apartment/workbench');
						},3000);
					}
		        	else{
		        		vm.warningModal = true;
		        	}
				})
				.catch(error=>{
					console.log(error);
				})
		       
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
</style>