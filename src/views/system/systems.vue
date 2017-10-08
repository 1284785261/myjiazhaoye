<template>
	<div id="housesubscrib">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box mps">
				<div class="ivu-site">
					<span>您现在的位置： </span>
					<router-link class="active" to="/apartment/workbench">系统管理</router-link>
				</div>
				<el-tabs v-model="activeName2" type="card">
					<el-tab-pane label="员工管理" name="first">
						<div class="systems">
							<div>
								<a @click="addstaff"> + 新增员工</a>
								<a @click="detailstaff">批量删除</a>
								<a @click="opens2">批量开放</a>
								<a @click="closes2">批量关闭</a>
							</div>
							<table>
								<thead>
									<td>
										<Checkbox v-model="single2" @click.prevent.native="handleCheckAll2"></Checkbox>
									</td>
									<td>账号</td>
									<td>用户名</td>
									<td>所属部门</td>
									<td>职位</td>
									<td>权限组</td>
									<td>创建人</td>
									<td>创建日期</td>
									<td>状态</td>
									<td width="110px">操作 </td>
								</thead>
								<tr v-for="(item,index) in data2">
									<td>
										<Checkbox v-model="item.sing" @on-change="checkAllGroupChange2(item.sing,index)"></Checkbox>
									</td>
									<td>{{item.userPhone}}</td>
									<td>{{item.userName}}</td>
									<td>{{item.departmentName}}</td>
									<td>{{item.positionName}}</td>
									<td>{{item.powerName}}</td>
									<td>{{item.createName}}</td>
									<td>{{item.createtime | time}}</td>
									<td :class="{acts:item.employeeStatus == 1}">{{item.employeeStatus | Status}}</td>
									<td>
										<a @click="amend2(item)">编辑</a>
										<a @click="close2(item)" v-if="item.employeeStatus == 1">关闭</a>
										<a @click="close2(item)" v-else-if="item.employeeStatus == 0">开启</a>
									</td>
								</tr>
							</table>
							<el-pagination @current-change="handleCurrentChange1" :current-page="currentPage1" :page-size=pageSize2 layout="prev, pager, next, total,jumper" :total=totalNum2>
							</el-pagination>
						</div>
					</el-tab-pane>
					<el-tab-pane label="部门管理" name="second">
						<div class="systems">
							<div>
								<a @click="addsection"> + 新增</a>
								<a @click="details">批量删除</a>
								<a @click="opens">批量开放</a>
								<a @click='closes'>批量关闭</a>
								<a @click="returns">返回上级</a>
							</div>
							<table>
								<thead>
									<td>
										<Checkbox v-model="single" @click.prevent.native="handleCheckAll"></Checkbox>
									</td>
									<td>部门</td>
									<td>上级部门</td>
									<td>子集数</td>
									<td>创建人</td>
									<td>创建日期</td>
									<td>状态</td>
									<td width="200px">操作 </td>
								</thead>
								<tr v-for="(item,index) in data">
									<td>
										<Checkbox v-model="item.sing" @on-change="checkAllGroupChange(item.sing,index)"></Checkbox>
									</td>
									<td>{{item.departmentName}}</td>
									<td v-if="item.parentDepartmentName != null">{{item.parentDepartmentName}}</td>
									<td v-else>根节点</td>
									<td>{{item.childNum}}</td>
									<td>{{item.departmentCreateName}}</td>
									<td>{{item.createtime | time}}</td>
									<td :class="{acts:item.departmentStatus == 1}">{{item.departmentStatus | Status}}</td>
									<td>
										<a @click="bub(item)">进入子部门</a>
										<a @click="amend(item)">编辑</a>
										<a @click="close(item)" v-if="item.departmentStatus == 1">关闭</a>
										<a @click="close(item)" v-else-if="item.departmentStatus == 0">开启</a>
									</td>
								</tr>
							</table>
							<el-pagination @current-change="handleCurrentChange" :current-page="currentPage2" :page-size=pageSize layout=" prev, pager, next, total,jumper" :total=totalNum>
							</el-pagination>
						</div>
					</el-tab-pane>
					<el-tab-pane label="社区人员配备" name="third">
						<div class="systems">
							<table class="equip">
								<thead>
									<td>社区</td>
									<td>地址</td>
									<td>店长</td>
									<td>店长联系电话</td>
									<td>员工数</td>
									<td>操作</td>
								</thead>
								<tr v-for="item in users">
									<td>{{item.communityName}}</td>
									<td v-if="item.province == item.city">{{item.province}}{{item.district}}{{item.address}}</td>
									<td v-else>{{item.province}}{{item.city}}{{item.district}}{{item.address}}</td>
									<td>{{item.userName}}</td>
									<td>{{item.userPhone}}</td>
									<td>{{item.employeeNum}}</td>
									<td><router-link :to="{path:'/system/staffdeploy',query:{id:item.communityId}}">委派人员</router-link></td>
								</tr>
							</table>
							<el-pagination @current-change="handleCurrentChange2" :current-page="currentPage2" :page-size=pageSize layout=" prev, pager, next, total,jumper" :total=totalNum3>
							</el-pagination>
						</div>
					</el-tab-pane>
					<el-tab-pane label="职位管理" name="fourth">
						<div class="systems">
							<div>
								<a> + 新增</a>
								<a>批量删除</a>
								<a>批量开放</a>
								<a>批量关闭</a>
								<a>返回上级</a>
							</div>
							<table>
								<thead>
									<td>
										<Checkbox v-model="single"></Checkbox>
									</td>
									<td>职位名称</td>
									<td>权限组</td>
									<td>创建人</td>
									<td>创建日期</td>
									<td>状态</td>
									<td width="200px">操作 </td>
								</thead>
								<tr>
									<td>
										<Checkbox v-model="sing"></Checkbox>
									</td>
									<td>jay</td>
									<td>jay</td>
									<td>jay</td>
									<td>jay</td>
									<td>jay</td>
									<td>
										<a>编辑</a>
										<a>关闭</a>
									</td>
								</tr>
								<tr>
									<td>
										<Checkbox v-model="sing"></Checkbox>
									</td>
									<td>jay</td>
									<td>jay</td>
									<td>jay</td>
									<td>jay</td>
									<td>jay</td>
									<td>
										<a>编辑</a>
										<a>关闭</a>
									</td>
								</tr>
							</table>
							<el-pagination @current-change="handleCurrentChange" :current-page="currentPage1" :page-size="3" layout=" prev, pager, next, total,jumper" :total='20'>
							</el-pagination>
						</div>
					</el-tab-pane>
					<el-tab-pane label="权限管理" name="fourth3">
						<div class="systems">
							<div>
								<a> + 新增</a>
								<a>批量删除</a>
								<a>批量开放</a>
								<a>批量关闭</a>
							</div>
							<table>
								<thead>
									<td>
										<Checkbox v-model="single"></Checkbox>
									</td>
									<td>权限组名称</td>
									<td>创建人</td>
									<td>创建日期</td>
									<td>状态</td>
									<td width="200px">操作 </td>
								</thead>
								<tr>
									<td>
										<Checkbox v-model="sing"></Checkbox>
									</td>
									<td>jay</td>
									<td>jay</td>
									<td>jay</td>
									<td>jay</td>
									<td>
										<a>分配权限</a>
									</td>
								</tr>
								<tr>
									<td>
										<Checkbox v-model="sing"></Checkbox>
									</td>
									<td>jay</td>
									<td>jay</td>
									<td>jay</td>
									<td>jay</td>
									<td>
										<a>分配权限</a>
									</td>
								</tr>
							</table>
							<el-pagination @current-change="handleCurrentChange" :current-page="currentPage1" :page-size=pageSize3 layout=" prev, pager, next, total,jumper" :total='20'>
							</el-pagination>
						</div>
					</el-tab-pane>
					<el-tab-pane label="审核设置" name="fourth5">
						<div class="systems">
							
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
			<footer-box></footer-box>
		</div>
		<div class="lose" v-show="isShow">
			<span>确认<i>{{titls}}</i>该部门吗？</span>
			<p></p>
			<a @click="qsm">确定</a>
			<a @click="qb">取消</a>
		</div>
		<div class="lose" v-show="isShows">
			<span>确认<i>{{titls}}</i>该账号吗？</span>
			<p></p>
			<a @click="qsmd">确定</a>
			<a @click="qbs">取消</a>
		</div>
		<div class="lose" v-show="isShow2">
			<span>确认<i>批量删除</i>以下部门吗？</span>
			<p></p>
			<a @click="qsm2">确定</a>
			<a @click="qb2">取消</a>
		</div>
		<div class="lose" v-show="isShow4">
			<span>确认<i>批量删除</i>以下账号吗？</span>
			<p></p>
			<a @click="qsm5">确定</a>
			<a @click="qb5">取消</a>
		</div>
		<div class="lose" v-show="isShow3">
			<span>确认<i>{{titles}}</i>以下部门吗？</span>
			<p></p>
			<a @click="qsm3">确定</a>
			<a @click="qb3">取消</a>
		</div>
		<div class="lose" v-show="isShow1">
			<span>确认<i>{{titles}}</i>以下账号吗？</span>
			<p></p>
			<a @click="qsm1">确定</a>
			<a @click="qb1">取消</a>
		</div>
		<div class="addsection" v-show="isShowadd">
			<i class="el-icon-circle-close" @click="inst"></i>
			<p>新增部门</p>
			<table>
				<tr>
					<td>部门：</td>
					<td><input type="text" placeholder="请设置部门" v-model="test" /></td>
				</tr>
			</table>
			<a class="tjss" @click="adds">确定</a>
		</div>
		<div class="addsection" v-show="amends">
			<i class="el-icon-circle-close" @click="inst2"></i>
			<p>编辑部门</p>
			<table>
				<tr>
					<td>部门：</td>
					<td><input type="text" placeholder="请设置部门" v-model="test2" /></td>
				</tr>
			</table>
			<a class="tjss" @click="edit">确定</a>
		</div>
		<div class="addsection" v-show="staffs">
			<i class="el-icon-circle-close" @click="inst3"></i>
			<p>{{adds2}}</p>
			<table>
				<tr>
					<td>账号：</td>
					<td><input type="text" placeholder="请输入账号" v-model="Employ.account" /></td>
				</tr>
				<tr>
					<td>用户姓名：</td>
					<td><input type="text" placeholder="请输入用户名称" v-model="Employ.userName" /></td>
				</tr>
				<tr v-if="adds2 == '新增员工'">
					<td>密码：</td>
					<td><input type="text" placeholder="请输入密码" v-model="Employ.password" /></td>
				</tr>
				<tr>
					<td>所属部门：</td>
					<td>
						<el-select v-model="value" placeholder="请选择" @change="select(value)">
							<el-option v-for="item in options" :key="item.departmentId" :value="item.departmentName">
							</el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td>所属职位：</td>
					<td>
						<el-select v-model="value1" placeholder="请选择" @change="select2(value1)">
							<el-option v-for="item in options1" :key="item.positionId" :value="item.positionName">
							</el-option>
						</el-select>
					</td>
				</tr>
			</table>
			<a class="tjss" @click="addEmploy" v-if="adds2 == '新增员工'">确定</a>
			<a class="tjss" @click="addEmploy2" v-else-if="adds2 == '编辑员工'">确定</a>
		</div>

		<div class="scherm" v-show="isHide">
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
	</div>
</template>

<script>
	import '../../sass/style/systems.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import axios from 'axios';
	import { hostDepartment, hostaddDepart, hostEditDepar, hostOffDepartment, hostDeleteDepart, hostDepartments, hostSuperiorDepart } from '../api.js'; //部门接口
	import { hostManagement, hostAllPosition, hostEmployee, hostoffEmployee, hostDeleteEmployee, hostEditEmployee } from '../api.js'; //员工接口
	import { hostUserRelation } from '../api.js';     //社区人员配备
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
			return {
				successModal: false,
				warningModal: false,
				successMessage: '添加部门成功',
				warningMessage: '添加部门失败，请检查是否重复',
				currentPage1: 1,
				currentPage2: 1,
				titles: '批量开放',
				activeName2: 'first',
				single: false, //部门选择
				sing: true,
				single2: false, //员工选择
				sings: true,
				pageNum: '1',
				pageSize: 10,
				pageNum2: '1',
				pageSize2: 10,
				pageNum3: '1',
				pageSize3: 10,
				data: null, //部门的数据展示
				data2: null, //员工的数据展示
				users:null,   //社区人员配备
				totalNum: 0,
				totalNum2: 0,
				totalNum3: 0,
				isHide: false,
				isShow: false,
				isShow1: false,
				isShow2: false,
				isShow3: false,
				isShow4: false,
				isShows: false,
				isShowadd: false,
				options: [],
				value: '',
				options1: [],
				value1: '',
				parentId: 0,
				test: '',
				test2: '',
				amends: false,
				id: '',
				id2: null,
				userid:null,
				closr: {},
				adds2: '新增员工',
				titls:'开启',
				staffs: false,
				departmentList: [], //部门选中的列表集合
				cxkjUserEmployeeList: [], //员工选中的列表集合
				Employ: {
					account: '',
					password: '',
					userName: '',
					departmentId: '',
					officePositionDataId: '',
					id:''
				}
			}
		},
		mounted() {
			this.datat();
			this.datas();
			this.Users();
		},
		filters: {
			Status(val) {
				if(val == 1) {
					return '开启'
				} else if(val == 0) {
					return '关闭'
				}
			},
			Status2(val) {
				if(val == 1) {
					return '关闭'
				} else if(val == 0) {
					return '开启'
				}
			},
			time(val) {
				return new Date(val).Format('yyyy-MM-dd hh:mm:ss');
			}
		},
		methods: {
			handleCheckAll() { //部门全选
				this.single = !this.single;
				if(this.single == true) {
					for(let i = 0; i < this.data.length; i++) {
						this.$set(this.data[i], "sing", true);
					}
				} else {
					for(let i = 0; i < this.data.length; i++) {
						this.$set(this.data[i], "sing", false);
					}
				}
			},
			checkAllGroupChange(item, index) { //部门单选
				console.log(item);
				var flag = true;
				for(let i = 0; i < this.data.length; i++) {
					if(this.data[i].sing != this.sings) {
						flag = false;
						break;
					}
				}
				if(this.data.length) {
					this.single = flag;
				} else {
					this.single = false;
				}
			},
			handleCheckAll2() { //员工全选
				this.single2 = !this.single2;
				if(this.single2 == true) {
					for(let i = 0; i < this.data2.length; i++) {
						this.$set(this.data2[i], "sing", true);
					}
				} else {
					for(let i = 0; i < this.data2.length; i++) {
						this.$set(this.data2[i], "sing", false);
					}
				}

			},
			checkAllGroupChange2(item, index) { //员工单选
				console.log(item);
				var flag = true;
				for(let i = 0; i < this.data2.length; i++) {
					if(this.data2[i].sing != this.sings) {
						flag = false;
						break;
					}
				}
				if(this.data2.length) {
					this.single2 = flag;
				} else {
					this.single2 = false;
				}
			},
			select(val) {
				this.Employ.departmentId = this.options[this.options.findIndex(item => item.departmentName == val)].departmentId;
				console.log(this.Employ.departmentId);
			},
			select2(val) {

				this.Employ.officePositionDataId = this.options1[this.options1.findIndex(item => item.positionName == val)].positionId;
				console.log(this.Employ.officePositionDataId);
			},
			addEmploy() {
				if(this.Employ.account == '' || this.Employ.password == '' || this.Employ.userName == '' || this.Employ.departmentId == '' || this.Employ.officePositionDataId == '') {
					this.isHide = false;
					this.staffs = false;
					this.warningMessage = '信息填写不完整',
						this.warningModal = true;
				} else {
					axios.post(hostEmployee, //添加员工信息
							qs.stringify({
								userPhone: this.Employ.account,
								password: this.Employ.password,
								userName: this.Employ.userName,
								departmentId: this.Employ.departmentId,
								officePositionDataId: this.Employ.officePositionDataId
							})
						).then((response) => {
							console.log(response);
							if(response.status == 200 && response.data.code == 10000) {
								this.isHide = false;
								this.staffs = false;
								this.successMessage = '添加员工成功';
								this.successModal = true;
								this.Employ.account = '';
								this.Employ.password = '';
								this.Employ.userName = '';
								setTimeout(() => {
									this.successModal = false;
									this.datat();
								}, 2000);
							} else {
								this.isHide = false;
								this.staffs = false;
								this.Employ.account = '';
								this.Employ.password = '';
								this.Employ.userName = '';
								this.warningMessage = response.data.content,
									this.warningModal = true;
							}
						})
						.catch((error) => {
							console.log(error);
						})
				}

			},
			addEmploy2() {
				//console.log(this.Employ);
				console.log(this.id2);
				axios.post(hostEditEmployee,              //编辑员工信息
					qs.stringify({
						id: this.id2,
						userPhone: this.Employ.userPhone,
						userName: this.Employ.userName,
						departmentId: this.Employ.departmentId,
						officePositionDataId: this.Employ.officePositionDataId
					})
				).then((response) => {
						console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.isHide = false;
							this.staffs = false;
							this.successMessage = '编辑员工成功'
							this.successModal = true;
							this.value = '';
							this.value1 = '';
							this.Employ.account = '';
							this.Employ.userName = '';
							setTimeout(() => {
								this.successModal = false;
								this.datat();
							}, 2000);
						} else {
							this.isHide = false;
							this.staffs = false;
							this.value = '';
							this.value1 = '';
							this.Employ.account = '';
							this.Employ.userName = '';
							this.warningMessage = response.data.content,
								this.warningModal = true;
						}
					
				})
		},
		handleCurrentChange(val) {
			this.pageNum = val;
			this.datas();
		},
		handleCurrentChange1(val) {
			this.pageNum2 = val;
			this.datat();
		},
		handleCurrentChange2(val){
			this.pageNum3 = val;
			this.Users();
		},
		details() {
			this.isHide = true;
			this.isShow2 = true;
		},
		Users(){
			let pageNum = this.pageNum3 | 1; //获取社区人员配备的列表信息
			let pageSize = this.pageSize3 | 10;
			axios.post(hostUserRelation,
				qs.stringify({
					pageNum: pageNum,
					pageSize: pageSize
				})
			).then((response) => {
				console.log(response);
				if(response.status == 200 && response.data.code == 10000) {
					this.users = response.data.entity.page;
					this.totalNum3 = response.data.entity.totalNum;
				}
			}).catch((error) => {
				console.log(error);
			})
		},
		datat() {
			let pageNum = this.pageNum2 | 1; //获取员工的列表信息
			let pageSize = this.pageSize2 | 10;
			axios.post(hostManagement,
				qs.stringify({
					pageNum: pageNum,
					pageSize: pageSize
				})
			).then((response) => {
				//console.log(response);
				if(response.status == 200 && response.data.code == 10000) {
					this.data2 = response.data.entity.page;
					this.totalNum2 = response.data.entity.totalNum;
					for(let i = 0; i < this.data2.length; i++) {
						this.$set(this.data2[i], "sing", false);
					}
				}
			}).catch((error) => {
				console.log(error);
			})
			
			axios.post(hostDepartments).then((response) => {
				//console.log(response);
				if(response.status == 200 && response.data.code == 10000) {
					this.options = response.data.entity;
				}
			}).catch((error) => {
				console.log(error);
			})
			axios.post(hostAllPosition).then((response) => {
				//console.log(response);
				if(response.status == 200 && response.data.code == 10000) {
					this.options1 = response.data.entity;
				}
			}).catch((error) => {
				console.log(error);
			})
		},
		datas() {
			let pageNum = this.pageNum | 1; //获取部门的列表信息
			let pageSize = this.pageSize | 10;
			axios.post(hostDepartment,
				qs.stringify({
					pageNum: pageNum,
					pageSize: pageSize,
					parentId: this.parentId
				})
			).then((response) => {
				//console.log(response);
				if(response.status == 200 && response.data.code == 10000) {
					this.data = response.data.entity.page;
					this.totalNum = response.data.entity.totalNum;
					for(let i = 0; i < this.data.length; i++) {
						this.$set(this.data[i], "sing", false);
					}
				}
			}).catch((error) => {
				console.log(error);
			})
		},
		addstaff() { //员工新增
			this.isHide = true;
			this.staffs = true;
			this.adds2 = '新增员工';
		},
		addsection() {
			this.isHide = true; //部门请求上级部门
			this.isShowadd = true;
		},
		closeWarningModal() {
			this.warningModal = false;
		},
		bub(item) {
			this.id2 = item.departmentId;
			console.log(this.id2);
			let pageNum = this.pageNum | 1; //获取子部门的列表信息
			let pageSize = this.pageSize | 10;
			axios.post(hostDepartment,
				qs.stringify({
					pageNum: pageNum,
					pageSize: pageSize,
					parentId: this.id2
				})
			).then((response) => {
				//console.log(response);
				if(response.status == 200 && response.data.code == 10000) {
					this.data = response.data.entity.page;
					this.totalNum = response.data.entity.totalNum;
					for(let i = 0; i < this.data.length; i++) {
						this.$set(this.data[i], "sing", false);
					}
					this.successMessage = '进入子部门成功'
					this.successModal = true;
					setTimeout(() => {
						this.successModal = false;
						this.test = ''
					}, 1000);
				} else {
					this.warningMessage = response.data.content,
						this.warningModal = true;
				}
			}).catch((error) => {
				console.log(error);
			})
		},
		returns() {
			let id = this.id2; //返回上级
			let pageNum = this.pageNum | 1;
			let pageSize = this.pageSize | 10;
			console.log(id);
			axios.post(hostSuperiorDepart,
				qs.stringify({
					pageNum: pageNum,
					pageSize: pageSize,
					parentId: this.id2
				})
			).then((response) => {
				//console.log(response);
				if(response.status == 200 && response.data.code == 10000) {
					this.data = response.data.entity.page;
					this.totalNum = response.data.entity.totalNum;
					this.id2 = this.data[0].parentId;
					for(let i = 0; i < this.data.length; i++) {
						this.$set(this.data[i], "sing", false);
					}
				} else {
					this.warningMessage = response.data.content,
						this.warningModal = true;
				}
			}).catch((error) => {
				console.log(error);
			})
		},
		adds() {
			let id = this.id2 | 0;
			axios.post(hostaddDepart, //添加部门
					qs.stringify({
						departmentName: this.test,
						parentId: id
					})
				)
				.then((response) => {
					//console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.isHide = false;
						this.isShowadd = false;
						this.successMessage = '添加部门成功'
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							this.test = ''
							this.datas();
						}, 2000);
					} else {
						this.isHide = false;
						this.isShowadd = false;
						this.warningMessage = '添加部门失败，请检查是否重复',
							this.warningModal = true;
					}
				})
				.catch((error) => {
					console.log(error);
				})
		},
		amend(item) {
			this.isHide = true;
			this.amends = true;
			//console.log(item)
			this.test2 = item.departmentName;
			this.id = item.departmentId;
			this.parentId = item.parentId;
		},
		edit() {
			axios.post(hostEditDepar,
				qs.stringify({ //编辑部门
					departmentName: this.test2,
					departmentId: this.id,
					parentId: this.parentId
				})
			).then((response) => {
				//console.log(response);
				if(response.status == 200 && response.data.code == 10000) {
					this.isHide = false;
					this.amends = false;
					this.successMessage = '编辑部门成功'
					this.successModal = true;

					setTimeout(() => {
						this.successModal = false;
						this.datas();
					}, 2000);
				} else {
					this.isHide = false;
					this.amends = false;
					this.warningMessage = '编辑部门失败',
						this.warningModal = true;
				}
			}).catch((error) => {
				console.log(error);
			})
		},
		amend2(item) {            //编辑员工
			this.isHide = true;
			this.staffs = true;
			this.adds2 = '编辑员工';
			console.log(item);
			this.id2 = item.userId;
			this.Employ.account = item.userPhone;
			this.Employ.userName = item.userName;
			this.Employ.departmentId = this.options[this.options.findIndex(ite => ite.departmentName == item.departmentName)].departmentId;
			this.value = item.departmentName;
			this.Employ.officePositionDataId = this.options1[this.options1.findIndex(ite => ite.positionName == item.positionName)].positionId;
			this.value1 = item.positionName;
		},
		close(item) {
			this.isHide = true;
			this.isShow = true;
			this.closr = item;
			if(this.closr.departmentStatus == 1) {
				this.titls = '关闭';
				this.departmentList.push({
					departmentId: this.closr.departmentId,
					departmentStatus: 0
				});
			} else if(this.closr.departmentStatus == 0) {
				this.titls = '开启';
				this.departmentList.push({
					departmentId: this.closr.departmentId,
					departmentStatus: 1
				});
			}
			//console.log(this.closr);
			//console.log(this.departmentList);
		},
		close2(item) {
			this.isHide = true;
			this.isShows = true;
			this.closr = item;
			console.log(this.closr);
			if(this.closr.employeeStatus == 1) {
				this.titls = '关闭';
				this.cxkjUserEmployeeList.push({
					employeeId: this.closr.employeeId,
					employeeStatus: 0
				})
			}
			if(this.closr.employeeStatus == 0) {
				this.titls = '开启';
				this.cxkjUserEmployeeList.push({
					employeeId: this.closr.employeeId,
					employeeStatus: 1
				})
			}
		},
		inst3() {
			this.isHide = false;
			this.staffs = false;
			this.value = '';
			this.value1 = '';
			this.Employ.account = '';
			this.Employ.userName = '';
		},
		inst() {
			this.isHide = false;
			this.isShowadd = false;
		},
		inst2() {
			this.isHide = false;
			this.amends = false;
		},
		qb() {
			this.isHide = false;
			this.isShow = false;
			this.departmentList = [];
		},
		qbs() {
			this.isHide = false;
			this.isShows = false;
			this.cxkjUserEmployeeList = [];
		},
		qb1() {
			this.isHide = false;
			this.isShow1 = false;
			this.cxkjUserEmployeeList = [];
		},
		qb2() {
			this.isHide = false;
			this.isShow2 = false;
			this.departmentList = [];
		},
		qb3() {
			this.isHide = false;
			this.isShow3 = false;
			this.departmentList = [];
		},
		qb5() {
			this.isHide = false;
			this.isShow4 = false;
			this.cxkjUserEmployeeList = [];
		},
		qsm() {
			axios.post(hostOffDepartment, //关闭单个部门
				{
					departmentList: this.departmentList
				}
			).then((response) => {
				console.log(response);
				if(response.status == 200 && response.data.code == 10000) {
					this.isHide = false;
					this.isShow = false;
					if(this.departmentList[0].departmentStatus == 0){
						this.successMessage = '关闭部门成功'
					}
					else{
						this.successMessage = '开启部门成功'
					}
					this.successModal = true;
					setTimeout(() => {
						this.successModal = false;
						this.datas();
						this.departmentList = [];
					}, 2000);
				} else {
					this.isHide = false;
					this.isShow = false;
					this.warningMessage = '关闭部门失败',
						this.warningModal = true;
				}
			}).catch((error) => {
				console.log(error);
			})
		},
		qsmd() {
			axios.post(hostoffEmployee, //员工账号单个关闭
				{
					cxkjUserEmployeeList: this.cxkjUserEmployeeList
				}
			).then((response) => {
				console.log(response);
				if(response.status == 200 && response.data.code == 10000) {
					this.isHide = false;
					this.isShows = false;
					if(this.cxkjUserEmployeeList[0].employeeStatus == 0){
						this.successMessage = '关闭账号成功'
					}
					else{
						this.successMessage = '开启账号成功'
					}
					
					this.successModal = true;
					setTimeout(() => {
						this.successModal = false;
						this.datat();
						this.cxkjUserEmployeeList = [];
					}, 2000);
				} else {
					this.isHide = false;
					this.isShows = false;
					this.warningMessage = '关闭账号失败',
						this.warningModal = true;
				}
			}).catch((error) => {
				console.log(error);
			})
		},
		qsm2() {
			this.departmentList = []; //部门批量删除
			//hostDeleteDepart
			//console.log(this.data);
			for(let i = 0; i < this.data.length; i++) {
				if(this.data[i].sing == true) {
					this.departmentList.push({
						departmentId: this.data[i].departmentId
					});
				}
			}
			axios.post(hostDeleteDepart, {
				departmentList: this.departmentList
			}).then((response) => {
				console.log(response);
				if(response.status == 200 && response.data.code == 10000) {
					this.isHide = false;
					this.isShow2 = false;
					this.successMessage = '批量删除部门成功';
					this.successModal = true;
					setTimeout(() => {
						this.successModal = false;
						this.datas();
					}, 2000);
				} else {
					this.isHide = false;
					this.isShow2 = false;
					this.warningMessage = '批量删除部门失败，请选择',
						this.warningModal = true;
				}
			}).catch((error) => {
				console.log(error);
			})
		},
		detailstaff() {
			this.isHide = true;
			this.isShow4 = true;
		},
		qsm5() {
			this.cxkjUserEmployeeList = []; //批量删除账号
			for(let i = 0; i < this.data2.length; i++) {
				if(this.data2[i].sing == true) {
					this.cxkjUserEmployeeList.push({
						employeeId: this.data2[i].employeeId
					})
				}
			}
			axios.post(hostDeleteEmployee, {
				cxkjUserEmployeeList: this.cxkjUserEmployeeList
			}).then((response) => {
				console.log(response);
				if(response.status == 200 && response.data.code == 10000) {
					this.isHide = false;
					this.isShow4 = false;
					this.successMessage = '批量删除账号成功';
					this.successModal = true;
					setTimeout(() => {
						this.successModal = false;
						this.datat();
					}, 2000);
				} else {
					this.isHide = false;
					this.isShow4 = false;
					this.warningMessage = '批量删除账号失败，请确认是否选中',
						this.warningModal = true;
				}
			}).catch((error) => {
				console.log(error);
			})
		},
		opens() {
			this.titles = '批量开放';
			this.isHide = true;
			this.isShow3 = true;
		},
		closes() {
			this.titles = '批量关闭';
			this.isHide = true;
			this.isShow3 = true;
		},
		opens2() {
			this.titles = '批量开放';
			this.isHide = true;
			this.isShow1 = true;
		},
		closes2() {
			this.titles = '批量关闭';
			this.isHide = true;
			this.isShow1 = true;
		},
		qsm1() {
			let mt = 0;
			if(this.titles == '批量开放') {
				mt = 1;
			} else if(this.titles == '批量关闭') {
				mt = 0;
			}
			this.cxkjUserEmployeeList = [];
			for(let i = 0; i < this.data2.length; i++) {
				if(this.data2[i].sing == true) {
					this.cxkjUserEmployeeList.push({
						employeeId: this.data2[i].employeeId,
						employeeStatus: mt
					});
				}
			}
			if(this.cxkjUserEmployeeList.length) {
				axios.post(hostoffEmployee, {
					cxkjUserEmployeeList: this.cxkjUserEmployeeList
				}).then((response) => {
					//console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.isHide = false;
						this.isShow1 = false;
						this.successMessage = '批量操作账号成功'
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							this.datat();
						}, 2000);
					} else {
						this.isHide = false;
						this.isShow1 = false;
						this.datat();
						this.warningMessage = '批量操作账号失败,开启和关闭不能同时操作',
							this.warningModal = true;
					}
				}).catch((error) => {
					console.log(error);
				})
			} else {
				this.isHide = false;
				this.isShow1 = false;
				this.datat();
				this.warningMessage = '你没有选中要操作的账号',
					this.warningModal = true;
			}

		},
		qsm3() {
			let mt = 0;
			if(this.titles == '批量开放') {
				mt = 1;
			} else if(this.titles == '批量关闭') {
				mt = 0;
			}

			this.departmentList = [];
			for(let i = 0; i < this.data.length; i++) {
				if(this.data[i].sing == true) {
					this.departmentList.push({
						departmentId: this.data[i].departmentId,
						departmentStatus: mt
					});
				}
			}
			console.log(this.departmentList);
			if(this.departmentList.length) {
				axios.post(hostOffDepartment, {
					departmentList: this.departmentList
				}).then((response) => {
					//console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.isHide = false;
						this.isShow3 = false;
						this.successMessage = '批量操作部门成功'
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							this.datas();
						}, 2000);
					} else {
						this.isHide = false;
						this.isShow3 = false;
						this.datas();
						this.warningMessage = '批量操作部门失败,开启和关闭不能同时操作',
							this.warningModal = true;
					}
				}).catch((error) => {
					console.log(error);
				})
			} else {
				this.isHide = false;
				this.isShow3 = false;
				this.datas();
				this.warningMessage = '你没有选中要操作的部门',
					this.warningModal = true;
			}

		}
	}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
</style>