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
				<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
					<el-tab-pane label="员工管理" name="first">
						<div class="systems">
							<div>
								<a> + 新增员工</a>
								<a>批量删除</a>
								<a>批量开放</a>
								<a>批量关闭</a>
							</div>
							<table>
								<thead>
									<td>
										<Checkbox v-model="single"></Checkbox>
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
								<tr>
									<td>
										<Checkbox v-model="sing"></Checkbox>
									</td>
									<td>jay</td>
									<td>jay</td>
									<td>jay</td>
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
									<td>jay</td>
									<td>jay</td>
									<td>jay</td>
									<td>
										<a>编辑</a>
										<a>关闭</a>
									</td>
								</tr>
							</table>
							<el-pagination @current-change="handleCurrentChange" :current-page="currentPage1" :page-size="3" layout="prev, pager, next, total,jumper" :total='20'>
							</el-pagination>
						</div>
					</el-tab-pane>
					<el-tab-pane label="部门管理" name="second">
						<div class="systems">
							<div>
								<a @click="addsection"> + 新增</a>
								<a @click="details">批量删除</a>
								<a @click="opens">批量开放</a>
								<a @click ='closes'>批量关闭</a>
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
							<el-pagination @current-change="handleCurrentChange" :current-page="currentPage1" :page-size=pageSize layout=" prev, pager, next, total,jumper" :total=totalNum>
							</el-pagination>
						</div>
					</el-tab-pane>
					<el-tab-pane label="社区人员配备" name="third">
						<div class="systems">
							<a> + 新增员工</a>
							<a>批量删除</a>
							<a>批量开放</a>
							<a>批量关闭</a>
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
							<el-pagination @current-change="handleCurrentChange" :current-page="currentPage1" :page-size="3" layout=" prev, pager, next, total,jumper" :total='20'>
							</el-pagination>
						</div>
					</el-tab-pane>
					<el-tab-pane label="审核设置" name="fourth5">定时任务补偿</el-tab-pane>
				</el-tabs>
			</div>
			<footer-box></footer-box>
		</div>
		<div class="lose" v-show="isShow">
			<span>确认<i>{{closr.departmentStatus | Status2}}</i>以下社区吗？</span>
			<p></p>
			<a @click="qsm">确定</a>
			<a @click="qb">取消</a>
		</div>
		<div class="lose" v-show="isShow2">
			<span>确认<i>批量删除</i>以下社区吗？</span>
			<p></p>
			<a @click="qsm2">确定</a>
			<a @click="qb2">取消</a>
		</div>
		<div class="lose" v-show="isShow3">
			<span>确认<i>{{titles}}</i>以下社区吗？</span>
			<p></p>
			<a @click="qsm3">确定</a>
			<a @click="qb3">取消</a>
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
	import { hostDepartment, hostaddDepart, hostEditDepar, hostOffDepartment,hostDeleteDepart,hostDepartments,hostSuperiorDepart } from '../api.js';
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
				titles:'批量开放',
				activeName2: 'first',
				single: false,
				sing: true,
				sings: true,
				pageNum: '1',
				pageSize: 10,
				data: null,
				totalNum: 0,
				isHide: false,
				isShow: false,
				isShow2:false,
				isShow3:false,
				isShowadd: false,
				options: [],
				value: '',
				parentId: 0,
				test: '',
				test2: '',
				amends: false,
				id: '',
				id2:null,
				closr: {},
				departmentList: [], //关闭列表

			}
		},
		mounted() {
			this.datas();
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
			handleClick(tab, event) {
				console.log(tab, event);
			},
			handleCheckAll() { //全选
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
			checkAllGroupChange(item, index) { //单选
				console.log(item);
				var flag = true;
				for(let i = 0; i < this.data.length; i++) {
					if(this.data[i].sing != this.sings){
						flag = false;
						break;
					}
				}
				if(this.data.length){
					this.single = flag;
				}
				else{
					this.single = false;
				}
			},
			handleCurrentChange(val) {
				this.pageNum = val;
			},
			details(){
				this.isHide = true;
				this.isShow2 = true;
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
					console.log(response);
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
			addsection() {
				this.isHide = true;             //请求上级部门
				this.isShowadd = true;
			},
			closeWarningModal() {
				this.warningModal = false;
			},
			bub(item){
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
					console.log(response);
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
					}
					else{
						this.warningMessage = response.data.content,
						this.warningModal = true;
					}
				}).catch((error) => {
					console.log(error);
				})
			},
			returns(){
				let id = this.id2;         //返回上级
				console.log(id);
				axios.post(hostSuperiorDepart,
					qs.stringify({
						parentId:this.id2
					})
				).then((response) => {
					console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.data = response.data.entity.page;
						this.totalNum = response.data.entity.totalNum;
						this.id2 = this.data[0].parentId;
						for(let i = 0; i < this.data.length; i++) {
							this.$set(this.data[i], "sing", false);
						}
//						this.successMessage = '进入子部门成功'
//						this.successModal = true;
//						setTimeout(() => {
//							this.successModal = false;
//							this.test = ''
//						}, 1000);
					}
					else{
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
							parentId:id
						})
					)
					.then((response) => {
						console.log(response);
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
				console.log(item)
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
					console.log(response);
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
			close(item) {
				this.isHide = true;
				this.isShow = true;
				this.closr = item;
				if(this.closr.departmentStatus == 1) {
					this.departmentList.push({
						departmentId: this.closr.departmentId,
						departmentStatus: 0
					});
				} else if(this.closr.departmentStatus == 0) {
					this.departmentList.push({
						departmentId: this.closr.departmentId,
						departmentStatus: 1
					});
				}
				console.log(this.closr);
				console.log(this.departmentList);
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
						this.successMessage = '关闭部门成功'
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							this.datas();
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
			qsm2(){
				this.departmentList = [];       //部门批量删除
				//hostDeleteDepart
				//console.log(this.data);
				for(let i=0;i<this.data.length;i++){
					if(this.data[i].sing == true){
						this.departmentList.push({departmentId:this.data[i].departmentId});
					}
				}
				axios.post(hostDeleteDepart,
					{
						departmentList:this.departmentList
					}
				).then((response)=>{
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
					}
					else{
						this.isHide = false;
						this.isShow2 = false;
						this.warningMessage = '批量删除部门失败，请选择',
						this.warningModal = true;
					}
				}).catch((error)=>{
					console.log(error);
				})
			},
			opens(){
				this.titles = '批量开放';
				this.isHide = true;
				this.isShow3 = true;
			},
			closes(){
				this.titles = '批量关闭';
				this.isHide = true;
				this.isShow3 = true;
			},
			qsm3(){
				let mt = 0;
				if(this.titles == '批量开放'){
					mt = 1;
				}else if(this.titles == '批量关闭'){
					mt = 0;
				}
				
				this.departmentList = [];
				for(let i=0;i<this.data.length;i++){
					if(this.data[i].sing == true){
						this.departmentList.push({departmentId:this.data[i].departmentId,departmentStatus:mt});
					}
				}
				console.log(this.departmentList);
				axios.post(hostOffDepartment,
					{
						departmentList: this.departmentList
					}
				).then((response) => {
					console.log(response);
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
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
</style>