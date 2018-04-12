<template>
	<div id="housesubscrib">
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box mps">
				<div class="ivu-site">
					<span>您现在的位置： </span>
					<router-link class="active" to="/apartment/workbench">系统管理</router-link>
				</div>
				<el-tabs type="card">
					<el-tab-pane label="员工管理" v-if="jurisdiction('STAFF_QUERY')">
						<div class="systems">
							<div class="adad">
								<a @click="addstaff" v-if="jurisdiction('STAFF_INCREASE')"> + 新增员工</a>
								<a @click="detailstaff" v-if="jurisdiction('STAFF_DELETE')">批量删除</a>
								<a @click="opens2" v-if="jurisdiction('STAFF_UPDATE')">批量开放</a>
								<a @click="closes2" v-if="jurisdiction('STAFF_UPDATE')">批量关闭</a>
							</div>
							<div v-if="data2 != null">
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
										<td width="190px">操作 </td>
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
											<a @click="amend2(item)" v-if="jurisdiction('STAFF_UPDATE')">编辑</a>
											<a @click="close2(item)" v-if="item.employeeStatus == 1 && jurisdiction('STAFF_UPDATE')">关闭</a>
											<a @click="close2(item)" v-else-if="item.employeeStatus == 0 && jurisdiction('STAFF_UPDATE')">开启</a>
                                            <a @click="updatePwd(item)" >重置密码</a>
										</td>
									</tr>
								</table>
								<el-pagination @current-change="handleCurrentChange1" :current-page="currentPage1" :page-size=pageSize2 layout="prev, pager, next, total,jumper" :total=totalNum2>
								</el-pagination>
							</div>
							<div v-else class="kbt">
				    			<img src="../../../static/images/icon/kbt_03.png" style="margin-top: 150px;">
				    		</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="部门管理" v-if="jurisdiction('DEPARTMENT_QUERY')">
						<div class="systems">
							<div class="adad">
								<a @click="addsection" v-if="jurisdiction('DEPARTMENT_INCREASE')"> + 新增</a>
								<a @click="details" v-if="jurisdiction('DEPARTMENT_DELETE')">批量删除</a>
								<a @click="opens" v-if="jurisdiction('DEPARTMENT_UPDATE')">批量开放</a>
								<a @click='closes' v-if="jurisdiction('DEPARTMENT_UPDATE')">批量关闭</a>
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
										<a @click="amend(item)" v-if="jurisdiction('DEPARTMENT_UPDATE')">编辑</a>
										<a @click="close(item)" v-if="item.departmentStatus == 1 && jurisdiction('DEPARTMENT_UPDATE')">关闭</a>
										<a @click="close(item)" v-else-if="item.departmentStatus == 0 && jurisdiction('DEPARTMENT_UPDATE')">开启</a>
									</td>
								</tr>
							</table>
							<el-pagination @current-change="handleCurrentChange" :current-page="currentPage2" :page-size=pageSize layout=" prev, pager, next, total,jumper" :total=totalNum>
							</el-pagination>
							<!--<div v-else class="kbt">
				    			<img src="../../../static/images/icon/kbt_03.png" style="margin-top: 150px;">
				    		</div>-->
						</div>
					</el-tab-pane>
					<el-tab-pane label="社区人员配备" v-if="jurisdiction('STAFFING_QUERY')">
						<div class="systems">
							<div v-if="users != null">
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
										<td v-if="item.userName">{{item.userName}}</td>
										<td v-else>--</td>
										<td v-if="item.userPhone">{{item.userPhone}}</td>
										<td v-else>--</td>
										<td>{{item.employeeNum}}</td>
										<td>
											<router-link :to="{path:'/system/staffdeploy',query:{id:item.communityId,communityName:item.communityName}}" v-if="jurisdiction('STAFFING_UPDATE')">委派人员</router-link>
										</td>
									</tr>
								</table>
								<el-pagination @current-change="handleCurrentChange2" :current-page="currentPage3" :page-size=pageSize3 layout=" prev, pager, next, total,jumper" :total=totalNum3>
								</el-pagination>
							</div>
							<div v-else class="kbt">
				    			<img src="../../../static/images/icon/kbt_03.png" style="margin-top: 150px;">
				    		</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="职位管理" v-if="jurisdiction('POSITION_QUERY')">
						<div class="systems">
							<div class="adad">
								<a @click="addPosition" v-if="jurisdiction('POSITION_INCREASE')"> + 新增</a>
								<a @click="delPosition" v-if="jurisdiction('POSITION_DELETE')">批量删除</a>
								<a @click="opePosition" v-if="jurisdiction('POSITION_UPDATE')">批量开放</a>
								<a @click="cloPosition" v-if="jurisdiction('POSITION_UPDATE')">批量关闭</a>
							</div>
							<div v-if="Positions != null">
								<table>
									<thead>
										<td>
											<Checkbox v-model="single3" @click.prevent.native="handleCheckAll3"></Checkbox>
										</td>
										<td>职位名称</td>
										<td>权限组</td>
										<td>创建人</td>
										<td>创建日期</td>
										<td>状态</td>
										<td width="200px">操作 </td>
									</thead>
									<tr v-for="(item,index) in Positions">
										<td>
											<Checkbox v-model="item.sing" @on-change="checkAllGroupChange3(item.sing,index)"></Checkbox>
										</td>
										<td>{{item.positionName}}</td>
										<td>{{item.powerName}}</td>
										<td>{{item.userName}}</td>
										<td>{{item.createtime | time}}</td>
										<td :class="{acts:item.positionStatus == 1}">{{item.positionStatus | Status}}</td>
										<td>
											<a @click="compilePosit(item)" v-if="jurisdiction('POSITION_UPDATE')">编辑</a>
											<a @click="closem(item)" v-if="item.positionStatus == 1 && jurisdiction('POSITION_UPDATE')">关闭</a>
											<a @click="closem(item)" v-else-if="item.positionStatus == 0 && jurisdiction('POSITION_UPDATE')">开启</a>
										</td>
									</tr>
								</table>
								<el-pagination @current-change="handleCurrentChange4" :current-page="currentPage4" :page-size=pageSize4 layout=" prev, pager, next, total,jumper" :total=totalNum4>
								</el-pagination>
							</div>
							<div v-else class="kbt">
				    			<img src="../../../static/images/icon/kbt_03.png" style="margin-top: 150px;">
				    		</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="权限管理" v-if="jurisdiction('POWER_QUERY')">
						<div class="systems">
							<div class="adad">
								<a @click="addCommunity" v-if="jurisdiction('POWER_INCREASE')"> + 新增</a>
								<a @click="delCommunity" v-if="jurisdiction('POWER_DELETE')">批量删除</a>
								<a @click="opeCommunity" v-if="jurisdiction('POWER_UPDATE')">批量开放</a>
								<a @click="cloCommunity" v-if="jurisdiction('POWER_UPDATE')">批量关闭</a>
							</div>
							<div v-if="Communitys != null">
								<table>
									<thead>
										<td>
											<Checkbox v-model="single4" @click.prevent.native="handleCheckAll4"></Checkbox>
										</td>
										<td>权限组名称</td>
										<td>创建人</td>
										<td>创建日期</td>
										<td>状态</td>
										<td width="200px">操作 </td>
									</thead>
									<tr v-for="(item,index) in Communitys">
										<td>
											<Checkbox v-model="item.sing" @on-change="checkAllGroupChange4(item.sing,index)"></Checkbox>
										</td>
										<td>{{item.powerName}}</td>
										<td>{{item.userName}}</td>
										<td>{{item.createtime | time}}</td>
										<td :class="{acts:item.powerStatus == 1}">{{item.powerStatus | Status}}</td>
										<td>
											<router-link :to="{path:'/system/allotjuris',query:{id:item.powerId}}" v-if="jurisdiction('POWER_UPDATE')">分配权限</router-link>
										</td>
									</tr>
								</table>
								<el-pagination @current-change="handleCurrentChange5" :current-page="currentPage5" :page-size=pageSize5 layout=" prev, pager, next, total,jumper" :total=totalNum5>
								</el-pagination>
							</div>
							<div v-else class="kbt">
				    			<img src="../../../static/images/icon/kbt_03.png" style="margin-top: 150px;">
				    		</div>
						</div>
					</el-tab-pane>
                    <el-tab-pane label="公司管理" v-if="jurisdiction('POWER_QUERY')">
						<div class="systems">
							<div class="adad">
								<a @click="addCompanys" v-if="jurisdiction('POWER_INCREASE')"> + 新增</a>
								<!--<a @click="delCommunity" v-if="jurisdiction('POWER_DELETE')">批量删除</a>-->
								<a @click="opeCompanys" v-if="jurisdiction('POWER_UPDATE')">批量开放</a>
								<a @click="cloCompanys" v-if="jurisdiction('POWER_UPDATE')">批量关闭</a>
							</div>
							<div v-if="Companys != null">
								<table>
									<thead>
										<td>
											<Checkbox v-model="single5" @click.prevent.native="handleCheckAll5"></Checkbox>
										</td>
										<td>公司名称</td>
										<td>上级公司</td>
										<td>微信账号</td>
										<td>支付宝账号</td>
										<td>操作者</td>
										<td>创建日期</td>
										<td>状态</td>
										<td width="100px">操作 </td>
									</thead>
									<tr v-for="(item,index) in Companys">
										<td>
											<Checkbox v-model="item.sing" @on-change="checkAllGroupChange5(item.sing,index)"></Checkbox>
										</td>
										<td>{{item.name}}</td>
										<td>{{item.parentName}}</td>
										<td>{{item.wxpayAppId}}</td>
										<td>{{item.alipayAppId}}</td>
										<td>{{item.userName}}</td>
										<td>{{item.createTime | time}}</td>
										<td :class="{acts:item.status == 0}">{{item.status | Status2}}</td>
										<td>
											<a v-if="jurisdiction('POWER_UPDATE')" @click="compileCompany(item.id)">编辑</a>
										</td>
									</tr>
								</table>
								<el-pagination @current-change="handleCurrentChange6" :current-page="currentPage6" :page-size=pageSize6 layout=" prev, pager, next, total,jumper" :total=totalNum6>
								</el-pagination>
							</div>
							<div v-else class="kbt">
				    			<img src="../../../static/images/icon/kbt_03.png" style="margin-top: 150px;">
				    		</div>
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
		<div class="lose" v-show="isShow6">
			<span>确认<i>批量删除</i>以下职位吗？</span>
			<p></p>
			<a @click="qsm6">确定</a>
			<a @click="qb6">取消</a>
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
		<div class="lose" v-show="isShow7">
			<span>确认<i>{{titles}}</i>以下职位吗？</span>
			<p></p>
			<a @click="qsm7">确定</a>
			<a @click="qb7">取消</a>
		</div>
		<div class="lose" v-show="isShow5">
			<span>确认<i>{{titls}}</i>该职位吗？</span>
			<p></p>
			<a @click="clos">确定</a>
			<a @click="clos2">取消</a>
		</div>
		<div class="lose" v-show="isShow8">
			<span>确认<i>批量删除</i>以下权限组吗？</span>
			<p></p>
			<a @click="qsm8">确定</a>
			<a @click="qb8">取消</a>
		</div>
		<div class="lose" v-show="isShow9">
			<span>确认<i>{{titles}}</i>以下权限组吗？</span>
			<p></p>
			<a @click="qsm9">确定</a>
			<a @click="qb9">取消</a>
		</div>
        <div class="lose" v-show="isShow10">
            <span>确认重置该用户的密码吗？</span>
            <p></p>
            <a @click="qsm10">确定</a>
            <a @click="qb10">取消</a>
        </div>
		<div class="lose" v-show="CompanyisShow">
			<span>确认<i>{{titles}}</i>以下公司吗？</span>
			<p></p>
			<a @click="confirmCompany">确定</a>
			<a @click="closeCompanys">取消</a>
		</div>
		<div class="addsection" v-show="isShowadd">
			<i class="el-icon-circle-close" @click="inst"></i>
			<p>新增部门</p>
			<table class="mttable">
				<tr>
					<td>部门：</td>
					<td><input type="text" placeholder="请设置部门" v-model="test" /></td>
				</tr>
				<tr>
					<td>上级部门：</td>
					<td>
						<el-select v-model="value4" placeholder="不填为根节点" @change="selectm(value4)">
							<el-option v-for="item in options" :key="item.departmentId" :value="item.departmentName">
							</el-option>
						</el-select>
					</td>
				</tr>
			</table>
			<a class="tjss" @click="adds">确定</a>
		</div>
		<div class="addsection" v-show="amends">
			<i class="el-icon-circle-close" @click="inst2"></i>
			<p>编辑部门</p>
			<table class="mttable">
				<tr>
					<td>部门：</td>
					<td><input type="text" placeholder="请设置部门" v-model="test2" /></td>
				</tr>
				<tr>
					<td>上级部门：</td>
					<td>
						<el-select v-model="value5" placeholder="请选择" @change="selectm2(value5)">
							<el-option v-for="item in options" :key="item.departmentId" :value="item.departmentName">
							</el-option>
						</el-select>
					</td>
				</tr>
			</table>
			<a class="tjss" @click="edit">确定</a>
		</div>
		<div class="addsection" v-show="staffs">
			<i class="el-icon-circle-close" @click="inst3"></i>
			<p>{{adds2}}</p>
			<table class="mttable">
				<tr>
					<td>账号：</td>
					<td><input type="text" placeholder="请输入手机账号" v-model="Employ.account" @blur='Phone(Employ.account)'/></td>
				</tr>
				<tr>
					<td>用户姓名：</td>
					<td><input type="text" placeholder="请输入用户名称" v-model="Employ.userName" /></td>
				</tr>
				<tr v-if="adds2 == '新增员工'">
					<td>密码：</td>
					<td><input type="password" placeholder="请输入密码" v-model="Employ.password" /></td>
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
		<div class="addsection" v-show="stafus">
			<i class="el-icon-circle-close" @click="inst4"></i>
			<p>{{adds3}}</p>
			<table class="mttable">
				<tr>
					<td>职位名称：</td>
					<td><input type="text" placeholder="请输入职位名称" v-model="posit.positionName" /></td>
				</tr>
				<tr>
					<td>权限选择：</td>
					<td>
						<el-select v-model="value2" placeholder="请选择" @change="select3(value2)">
							<el-option v-for="item in options2" :key="item.powerName" :value="item.powerName">
							</el-option>
						</el-select>
					</td>
				</tr>
			</table>
			<a class="tjss" @click="addpositn" v-if="adds3 == '新增职位'">确定</a>
			<a class="tjss" @click="addpositn2" v-else-if="adds3 == '编辑职位'">确定</a>
		</div>
		<div class="addsection" v-show="addcommuni">
			<i class="el-icon-circle-close" @click="inst5"></i>
			<p>新增权限组</p>
			<table class="mttable">
				<tr>
					<td>权限组：</td>
					<td><input type="text" placeholder="请输入权限组名称" v-model="test3" /></td>
				</tr>
			</table>
			<a class="tjss" @click="addcommunis">确定</a>
		</div>
		<div class="addsection" v-show="isShow11">
			<i class="el-icon-circle-close" @click="closeCompany"></i>
			<P>{{adds4}}</P>
			<table class="Companymessage">
				<tr>
					<td>公司名：<input type="text" placeholder="请输入公司名" v-model="addCompany.name"></td>
				</tr>
				<tr>
					<td>
						上级公司：
						<el-select v-model="superiorvalue" placeholder="请选择" @change="superiorCompany(superiorvalue)">
							<el-option v-for="item in Companys" :key="item.id" :value="item.name">
							</el-option>
						</el-select>
					</td>
				</tr>
			</table>
			<table class="Companymessage1">
				<tr>
					<td>
						微信号：<input type="text" style="margin-right:12px;margin-left: 4px;" placeholder="请输入微信号" v-model="addCompany.wxpayAppid"> 微信密钥：<input type="password" v-model="addCompany.wxpayMchid">
					</td>
				</tr>
				<tr>
					<td>
						支付宝：<input type="text" style="margin-left: 4px;" placeholder="请输入支付宝" v-model="addCompany.alipayAppid"> 支付宝密钥：<input type="password" v-model="addCompany.alipayPrivatekey">
					</td>
				</tr>
			</table>
			<a class="Companybutton" @click="addsCompany">确定</a>
			<a class="Companybutton" @click="closeCompany">取消</a>
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
	import { hostPositionManage, hostPowerPosit, hostPositionMan, hostAddPosition, hostEditPosition, hostOffPosition, hostDeletePosition } from '../api.js'; //职位管理
	import { hostCommunityMan,hostAddCommunityMan,hostdelCommunityMan,hostOffManagement } from '../api.js'; //权限管理
	import { CompanyController500149,Company500150,addCompany500151,amendCompany500152,detailsCompany500153,batchCompany500154 } from '../api.js'; //公司管理
	import { hostUserRelation,passwordReurn } from '../api.js'; //社区人员配备
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
				activeTabName:"systems",
				successModal: false,
				warningModal: false,
				successMessage: '添加部门成功',
				warningMessage: '添加部门失败，请检查是否重复',
				currentPage1: 1,
				currentPage2: 1,
				currentPage3: 1,
				currentPage4: 1,
				currentPage5: 1,
				currentPage6: 1,
				titles: '批量开放',
				single: false, //部门选择
				sing: true,
				single2: false, //员工选择
				single3: false, //职位选择
				single4: false, //权限选择
				single5: false, //公司选择
				sings: true,
				pageNum: '1',
				pageSize: 10,
				pageNum2: '1',
				pageSize2: 10,
				pageNum3: '1',
				pageSize3: 10,
				pageNum4: '1',
				pageSize4: 10,
				pageNum5: '1',
				pageSize5: 10,
				pageNum6: '1',
				pageSize6: 10,
				data: [], //部门的数据展示
				data2: null, //员工的数据展示
				users: null, //社区人员配备
				Positions: null, //职位的数据展示
				Communitys: null, //权限的数据展示
				Companys:null, //公司的数据展示
				totalNum: 0,
				totalNum2: 0,
				totalNum3: 0,
				totalNum4: 0,
				totalNum5: 0,
				totalNum6: 0,
				isHide: false,
				isShow: false,
				isShow1: false,
				isShow2: false,
				isShow3: false,
				isShow4: false,
				isShow5: false,
				isShow6: false,
				isShow7: false,
				isShow8:false,
				isShow9:false,
				isShow10:false,
				isShow11:false,
				isShows: false,
				isShowadd: false,
				addcommuni:false,
				options: [],
				value: '',
				options1: [],
				value1: '',
				options2: [],
				value2: '',
				options3: [],
				value3: '',
				value4:'',
				value5:'',
				parentId: 0,
				test: '',
				test2: '',
				test3: '',
				amends: false,
				id: '',
				id2: null,
				userid: null,
				closr: {},
				adds2: '新增员工',
				adds3: '新增职位',
				adds4: '新增公司',
				titls: '开启',
				staffs: false,
				stafus: false,
				departmentList: [], //部门选中的列表集合
				cxkjUserEmployeeList: [], //员工选中的列表集合
				cxkjUserPositionList: [], //职位选中的列表集合
				cxkjCenterPowerList: [], //权限组选择列表集合
				Employ: { //员工新增或编辑信息
					account: '',
					password: '',
					userName: '',
					departmentId: '',
					officePositionDataId: '',
					id: ''
				},
				posit: {
					positionName: '',
					powerId: '',
					positionId: ''
				},
				addCompany:{
					name:'',
					parentId:'',
					wxpayAppid:'',
					wxpayMchid:'',
					alipayAppid:'',
					alipayPrivatekey:''
				},
				msg:'',
				superior:'',   //上级部门id
				superior2:'',   //编辑上级部门ID
				activeUserId:'',
				superiorvalue:'',
				CompanyID:'',
				CompanyisShow:false
 			}
		},
		mounted() {
			this.datat();   //获取员工信息
			this.datas();	//获取部门信息
			this.Users();	//获取社区人员配备信息
			this.Position();	//获取职位信息
			this.Community();	//获取权限信息
			this.Company();  //获取公司信息
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
			Phone(value) { //验证手机号
				let str = /^1(3|4|5|7|8)\d{9}$/;
				// console.log(str.test(value));
				if(str.test(value) == true){
					this.Employ.account = value;
				}
				else{
					this.Employ.account = '';
				}
			},
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
				// console.log(item);
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
				// console.log(item);
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
			handleCheckAll3() { //职位全选
				this.single3 = !this.single3;
				if(this.single3 == true) {
					for(let i = 0; i < this.Positions.length; i++) {
						this.$set(this.Positions[i], "sing", true);
					}
				} else {
					for(let i = 0; i < this.Positions.length; i++) {
						this.$set(this.Positions[i], "sing", false);
					}
				}

			},
			checkAllGroupChange3(item, index) { //职位单选
				// console.log(item);
				var flag = true;
				for(let i = 0; i < this.Positions.length; i++) {
					if(this.Positions[i].sing != this.sings) {
						flag = false;
						break;
					}
				}
				if(this.Positions.length) {
					this.single3 = flag;
				} else {
					this.single3 = false;
				}
			},
			handleCheckAll4() { //权限全选
				this.single4 = !this.single4;
				if(this.single4 == true) {
					for(let i = 0; i < this.Communitys.length; i++) {
						this.$set(this.Communitys[i], "sing", true);
					}
				} else {
					for(let i = 0; i < this.Communitys.length; i++) {
						this.$set(this.Communitys[i], "sing", false);
					}
				}

			},
			checkAllGroupChange4(item, index) { //权限单选
				// console.log(item);
				var flag = true;
				for(let i = 0; i < this.Communitys.length; i++) {
					if(this.Communitys[i].sing != this.sings) {
						flag = false;
						break;
					}
				}
				if(this.Communitys.length) {
					this.single4 = flag;
				} else {
					this.single4 = false;
				}
			},
			handleCheckAll5(){   //公司全选
				this.single5 = !this.single5;
				if(this.single5 == true) {
					for(let i = 0; i < this.Companys.length; i++) {
						this.$set(this.Companys[i], "sing", true);
					}
				} else {
					for(let i = 0; i < this.Companys.length; i++) {
						this.$set(this.Companys[i], "sing", false);
					}
				}
			},
			checkAllGroupChange5(item, index){  //公司单选
				// console.log(item);
				var flag = true;
				for(let i = 0; i < this.Companys.length; i++) {
					if(this.Companys[i].sing != this.sings) {
						flag = false;
						break;
					}
				}
				if(this.Companys.length) {
					this.single5 = flag;
				} else {
					this.single5 = false;
				}
			},
			select(val) {
				this.Employ.departmentId = this.options[this.options.findIndex(item => item.departmentName == val)].departmentId;
				// console.log(this.Employ.departmentId);
			},
			select2(val) {
				this.Employ.officePositionDataId = this.options1[this.options1.findIndex(item => item.positionName == val)].positionId;
				// console.log(this.Employ.officePositionDataId);
			},
			select3(val) {
				this.posit.powerId = this.options2[this.options2.findIndex(item => item.powerName == val)].powerId;
				// console.log(this.posit.powerId);
			},
			selectm(val){
				this.superior = this.options[this.options.findIndex(item => item.departmentName == val)].departmentId;
			},
			selectm2(val){
				this.superior2 = this.options[this.options.findIndex(item => item.departmentName == val)].departmentId;
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
							// console.log(response);
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
								this.warningMessage = response.data.content;
								this.warningModal = true;
							}
						})
						.catch((error) => {
							// console.log(error);
						})
				}

			},
			addEmploy2() {
				// console.log(this.Employ);
				// console.log(this.id2);
				axios.post(hostEditEmployee, //编辑员工信息
					qs.stringify({
						id: this.id2,
						userPhone: this.Employ.userPhone,
						userName: this.Employ.userName,
						departmentId: this.Employ.departmentId,
						officePositionDataId: this.Employ.officePositionDataId
					})
				).then((response) => {
					// console.log(response);
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
						this.warningMessage = response.data.content;
						this.warningModal = true;
					}

				})
			},
			addcommunis(){
				axios.post(hostAddCommunityMan,   //添加权限
					qs.stringify({
						powerName:this.test3
					})
				).then((res) => {
					// console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						this.isHide = false;
						this.addcommuni = false;
						this.successMessage = '添加权限组成功';
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							this.datat();
							this.datas();
							this.Users();
							this.Position();
							this.Community();
						}, 2000);
					}
				}).catch((err) => {
					// console.log(err);
					this.isHide = false;
					this.addcommuni = false;
					this.warningMessage = response.data.content;
					this.warningModal = true;
				})
			},
			addpositn() {
				axios.post(hostAddPosition, //添加职位
					qs.stringify({
						positionName: this.posit.positionName,
						powerId: this.posit.powerId
					})
				).then((res) => {
					// console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						this.isHide = false;
						this.stafus = false;
						this.successMessage = '添加职位成功';
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							this.datat();
							this.datas();
							this.Users();
							this.Position();
							this.Community();
						}, 2000);
					}
				}).catch((err) => {
					// console.log(err);
					this.isHide = false;
					this.stafus = false;
					this.warningMessage = response.data.content;
					this.warningModal = true;
				})
			},
			addpositn2() {
				axios.post(hostEditPosition, //编辑职位
					qs.stringify({
						positionId: this.posit.positionId,
						positionName: this.posit.positionName,
						powerId: this.posit.powerId
					})
				).then((res) => {
					// console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						this.isHide = false;
						this.stafus = false;
						this.successMessage = '编辑职位成功';
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							this.datat();
							this.datas();
							this.Users();
							this.Position();
							this.Community();
						}, 2000);
					}
				}).catch((err) => {
					// console.log(err);
					this.isHide = false;
					this.stafus = false;
					this.warningMessage = response.data.content;
					this.warningModal = true;
				})
			},
			//新增公司
			addCompanys(){
				this.isHide = true;
				this.isShow11 = true;
				this.adds4 = '新增公司';
			},
			handleCurrentChange(val) {
				this.pageNum = val;
				this.datas();
			},
			handleCurrentChange1(val) {
				this.pageNum2 = val;
				this.datat();
			},
			handleCurrentChange2(val) {
				this.pageNum3 = val;
				this.Users();
			},
			handleCurrentChange4(val) {
				this.pageNum4 = val;
				this.Position();
			},
			handleCurrentChange5(val) {
				this.pageNum5 = val;
				this.Community();
			},
			handleCurrentChange6(val) {
				this.pageNum6 = val;
				this.Company();
			},
			details() {
				this.isHide = true;
				this.isShow2 = true;
			},
			delPosition() {
				this.isHide = true;
				this.isShow6 = true;
			},
			delCommunity(){
				this.isHide = true;
				this.isShow8 = true;
			},
			compilePosit(item) {
				this.isHide = true;
				this.stafus = true;
				this.adds3 = '编辑职位';
				this.posit.positionName = item.positionName;
				this.posit.positionId = item.positionId;
				this.value2 = item.powerName;
				// console.log(item);
			},
			Community() {
				let pageNum = this.pageNum5; //获取权限管理的列表信息
				let pageSize = this.pageSize5;
				axios.post(hostCommunityMan,
					qs.stringify({
						pageNum: pageNum,
						pageSize: pageSize
					})
				).then((response) => {
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.Communitys = response.data.entity.page;
						this.totalNum5 = response.data.entity.totalNum;
						for(let i = 0; i < this.Communitys.length; i++) {
							this.$set(this.Communitys[i], "sing", false);
						}
					}
				}).catch((error) => {
					// console.log(error);
				})
			},
			Position() {
				let pageNum = this.pageNum4; //获取职位管理的列表信息
				let pageSize = this.pageSize4;
				// console.log(pageNum);
				axios.post(hostPositionManage,
					qs.stringify({
						pageNum: pageNum,
						pageSize: pageSize
					})
				).then((response) => {
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.Positions = response.data.entity.page;
						this.totalNum4 = response.data.entity.totalNum;
						for(let i = 0; i < this.Positions.length; i++) {
							this.$set(this.Positions[i], "sing", false);
						}
					}
				}).catch((error) => {
					// console.log(error);
				})

				axios.post(hostPowerPosit).then((response) => {
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.options2 = response.data.entity;
					}
				}).catch((error) => {
					// console.log(error);
				})
			},
			Users() {
				let pageNum = this.pageNum3; //获取社区人员配备的列表信息
				let pageSize = this.pageSize3;
				axios.post(hostUserRelation,
					qs.stringify({
						pageNum: pageNum,
						pageSize: pageSize
					})
				).then((response) => {
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.users = response.data.entity.page;
						this.totalNum3 = response.data.entity.totalNum;
					}
				}).catch((error) => {
					// console.log(error);
				})
			},
			datat() {
				let pageNum = this.pageNum2; //获取员工的列表信息
				let pageSize = this.pageSize2;
				axios.post(hostManagement,
					qs.stringify({
						pageNum: pageNum,
						pageSize: pageSize
					})
				).then((response) => {
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.data2 = response.data.entity.page;
						this.totalNum2 = response.data.entity.totalNum;
						for(let i = 0; i < this.data2.length; i++) {
							this.$set(this.data2[i], "sing", false);
						}
					}
				}).catch((error) => {
					// console.log(error);
				})

				axios.post(hostDepartments).then((response) => {
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.options = response.data.entity;
						// console.log(this.options);
					}
				}).catch((error) => {
					// console.log(error);
				})
				axios.post(hostAllPosition).then((response) => {
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.options1 = response.data.entity;
					}
				}).catch((error) => {
					// console.log(error);
				})
			},
			datas() {
				let pageNum = this.pageNum; //获取部门的列表信息
				let pageSize = this.pageSize;
				axios.post(hostDepartment,
					qs.stringify({
						pageNum: pageNum,
						pageSize: pageSize,
						parentId: this.parentId
					})
				).then((response) => {
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.data = response.data.entity.page;
						this.totalNum = response.data.entity.totalNum;
						for(let i = 0; i < this.data.length; i++) {
							this.$set(this.data[i], "sing", false);
						}
					}
				}).catch((error) => {
					// console.log(error);
				})
			},
			//获取公司列表信息
			Company(){           
				let pageNum = this.pageNum6;
				let pageSize = this.pageSize6;
				axios.post(CompanyController500149,
					qs.stringify({
						pageNum: pageNum,
						pageSize: pageSize,
					})
				).then((response) => {
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.Companys = response.data.pageBean.page;
						this.totalNum6 = response.data.pageBean.totalNum;
						for(let i = 0; i < this.Companys.length; i++) {
							this.$set(this.Companys[i], "sing", false);
						}
					}
					console.log(this.Companys);
				}).catch((error) => {
					// console.log(error);
				})
			},
			addCommunity() {
				this.isHide = true;
				this.addcommuni = true;
				this.test3 = '';
			},
			addstaff() { //员工新增
				this.isHide = true;
				this.staffs = true;
				this.adds2 = '新增员工';
			},
			addPosition() {
				this.isHide = true;
				this.stafus = true;
				this.posit.positionName = '';
				this.value2 = '';
				this.adds3 = '新增职位';
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
				// console.log(this.id2);
				let pageNum = this.pageNum; //获取子部门的列表信息
				let pageSize = this.pageSize;
				axios.post(hostDepartment,
					qs.stringify({
						pageNum: pageNum,
						pageSize: pageSize,
						parentId: this.id2
					})
				).then((response) => {
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						if(response.data.entity){
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

					}
				}).catch((error) => {
					// console.log(error);
				})
			},
			returns() {
				let id = this.id2; //返回上级
				let pageNum = this.pageNum;
				let pageSize = this.pageSize;
				// console.log(id);
				axios.post(hostSuperiorDepart,
					qs.stringify({
						pageNum: pageNum,
						pageSize: pageSize,
						parentId: this.id2
					})
				).then((response) => {
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.data = response.data.entity.page;
						this.totalNum = response.data.entity.totalNum;
						this.id2 = this.data[0].parentId;
						for(let i = 0; i < this.data.length; i++) {
							this.$set(this.data[i], "sing", false);
						}
					} else {
						this.warningMessage = response.data.content;
						this.warningModal = true;
					}
				}).catch((error) => {
					// console.log(error);
				})
			},
			adds() {
				axios.post(hostaddDepart, //添加部门
						qs.stringify({
							departmentName: this.test,
							parentId: this.superior
						})
					)
					.then((response) => {
						// console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.isHide = false;
							this.isShowadd = false;
							this.successMessage = '添加部门成功'
							this.successModal = true;
							setTimeout(() => {
								this.successModal = false;
								this.test = ''
								this.datat();
								this.datas();
								this.Users();
								this.Position();
								this.Community();
							}, 2000);
						} else {
							this.isHide = false;
							this.isShowadd = false;
							this.warningMessage = '添加部门失败，请检查是否重复';
							this.warningModal = true;
						}
					})
					.catch((error) => {
						// console.log(error);
					})
			},
			amend(item) {
				this.isHide = true;
				this.amends = true;
				// console.log(item)
				this.test2 = item.departmentName;
				if(item.parentDepartmentName){
					this.value5 = item.parentDepartmentName;
				}else{
					this.value5 = '根节点'
				}

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
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.isHide = false;
						this.amends = false;
						this.successMessage = '编辑部门成功'
						this.successModal = true;

						setTimeout(() => {
							this.successModal = false;
							this.datat();
							this.datas();
							this.Users();
							this.Position();
							this.Community();
						}, 2000);
					} else {
						this.isHide = false;
						this.amends = false;
						this.warningMessage = '编辑部门失败';
						this.warningModal = true;
					}
				}).catch((error) => {
					// console.log(error);
				})
			},
			amend2(item) { //编辑员工
				this.isHide = true;
				this.staffs = true;
				this.adds2 = '编辑员工';
				// console.log(item);
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
			},
			close2(item) {
				this.isHide = true;
				this.isShows = true;
				this.closr = item;
				// console.log(this.closr);
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
          /***重置密码***/
          updatePwd(item){
            this.isHide = true;
            this.isShow10 = true;
            this.activeUserId = item.userId;
          },
			closem(item) {
				this.isHide = true;
				this.isShow5 = true;
				this.closr = item;
				if(this.closr.positionStatus == 1) {
					this.titls = '关闭';
					this.cxkjUserPositionList.push({
						positionId: this.closr.positionId,
						positionStatus: 0
					});
				} else if(this.closr.positionStatus == 0) {
					this.titls = '开启';
					this.cxkjUserPositionList.push({
						positionId: this.closr.positionId,
						positionStatus: 1
					});
				}
			},
			inst5(){
				this.isHide = false;
				this.addcommuni = false;
			},
			inst4() {
				this.isHide = false;
				this.stafus = false;
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
			qb6() {
				this.isHide = false;
				this.isShow6 = false;
				this.cxkjUserEmployeeList = [];
			},
			qb7() {
				this.isHide = false;
				this.isShow7 = false;
				this.cxkjUserEmployeeList = [];
			},
			qb8() {
				this.isHide = false;
				this.isShow8 = false;
				this.cxkjCenterPowerList = [];
			},
			qb9(){
				this.isHide = false;
				this.isShow9 = false;
				this.cxkjCenterPowerList = [];
			},
			clos2() {
				this.isHide = false;
				this.isShow5 = false;
				this.cxkjUserPositionList = [];
			},
			clos() {
				axios.post(hostOffPosition, //单个职位关闭或者开启
					{
						cxkjUserPositionList: this.cxkjUserPositionList
					}
				).then((response) => {
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.isHide = false;
						this.isShow5 = false;
						if(this.cxkjUserPositionList[0].positionStatus == 0) {
							this.successMessage = '关闭职位成功'
						} else {
							this.successMessage = '开启职位成功'
						}
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							this.datat();
							this.datas();
							this.Users();
							this.Position();
							this.Community();
							this.cxkjUserPositionList = [];
						}, 2000);
					}
				}).catch((error) => {
					// console.log(error);
				})
			},
			qsm() {
				axios.post(hostOffDepartment, //关闭单个部门
					{
						departmentList: this.departmentList
					}
				).then((response) => {
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.isHide = false;
						this.isShow = false;
						if(this.departmentList[0].departmentStatus == 0) {
							this.successMessage = '关闭部门成功'
						} else {
							this.successMessage = '开启部门成功'
						}
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							this.datat();
							this.datas();
							this.Users();
							this.Position();
							this.Community();
							this.departmentList = [];
						}, 2000);
					} else {
						this.isHide = false;
						this.isShow = false;
						this.warningMessage = '关闭部门失败';
						this.warningModal = true;
					}
				}).catch((error) => {
					// console.log(error);
				})
			},
			qsmd() {
				axios.post(hostoffEmployee, //员工账号单个关闭
					{
						cxkjUserEmployeeList: this.cxkjUserEmployeeList
					}
				).then((response) => {
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.isHide = false;
						this.isShows = false;
						if(this.cxkjUserEmployeeList[0].employeeStatus == 0) {
							this.successMessage = '关闭账号成功'
						} else {
							this.successMessage = '开启账号成功'
						}

						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							this.datat();
							this.datas();
							this.Users();
							this.Position();
							this.Community();
							this.cxkjUserEmployeeList = [];
						}, 2000);
					} else {
						this.isHide = false;
						this.isShows = false;
						this.warningMessage = '关闭账号失败';
						this.warningModal = true;
					}
				}).catch((error) => {
					// console.log(error);
				})
			},
			qsm2() {
				this.departmentList = []; //部门批量删除
				//hostDeleteDepart
				// console.log(this.data);
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
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.isHide = false;
						this.isShow2 = false;
						this.successMessage = '批量删除部门成功';
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							this.datat();
							this.datas();
							this.Users();
							this.Position();
							this.Community();
						}, 2000);
					} else {
						this.isHide = false;
						this.isShow2 = false;
						this.warningMessage = '批量删除部门失败，请选择';
						this.warningModal = true;
					}
				}).catch((error) => {
					// console.log(error);
				})
			},
			detailstaff() {
				this.isHide = true;
				this.isShow4 = true;
			},
			qsm6() {
				// console.log(this.Positions);
				this.cxkjUserPositionList = []; //批量删除职位
				for(let i = 0; i < this.Positions.length; i++) {
					if(this.Positions[i].sing == true) {
						this.cxkjUserPositionList.push({
							positionId: this.Positions[i].positionId
						})
					}
				}

				// console.log(this.cxkjUserPositionList);
				axios.post(hostDeletePosition, {
					cxkjUserPositionList: this.cxkjUserPositionList
				}).then((response) => {
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.isHide = false;
						this.isShow6 = false;
						this.successMessage = '批量删除职位成功';
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							this.datat();
							this.datas();
							this.Users();
							this.Position();
							this.Community();
						}, 2000);
					} else {
						this.isHide = false;
						this.isShow6 = false;
						this.warningMessage = '批量删除职位失败，请确认是否选中';
						this.warningModal = true;
					}
				}).catch((error) => {
					// console.log(error);
				})
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
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.isHide = false;
						this.isShow4 = false;
						this.successMessage = '批量删除账号成功';
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							this.datat();
							this.datas();
							this.Users();
							this.Position();
							this.Community();
						}, 2000);
					} else {
						this.isHide = false;
						this.isShow4 = false;
						this.warningMessage = '批量删除账号失败，请确认是否选中';
						this.warningModal = true;
					}
				}).catch((error) => {
					// console.log(error);
				})
			},
			qsm8(){
				this.cxkjCenterPowerList = []; //批量删除权限组
				for(let i= 0; i<this.Communitys.length;i++){
					if(this.Communitys[i].sing == true) {
						this.cxkjCenterPowerList.push({
							powerId: this.Communitys[i].powerId
						})
					}
				}
				axios.post(hostdelCommunityMan,{
					cxkjCenterPowerList:this.cxkjCenterPowerList
				}).then((response) => {
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						this.isHide = false;
						this.isShow8 = false;
						this.successMessage = '批量删除权限组成功';
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							this.datat();
							this.datas();
							this.Users();
							this.Position();
							this.Community();
						}, 2000);
					} else {
						this.isHide = false;
						this.isShow8 = false;
						this.warningMessage = '批量删除权限组失败，请确认是否选中';
						this.warningModal = true;
					}
				}).catch((error) => {
					// console.log(error);
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
			opePosition() {
				this.titles = '批量开放';
				this.isHide = true;
				this.isShow7 = true;
			},
			cloPosition() {
				this.titles = '批量关闭';
				this.isHide = true;
				this.isShow7 = true;
			},
			opeCommunity(){
				this.titles = '批量开放';
				this.isHide = true;
				this.isShow9 = true;
			},
			cloCommunity(){
				this.titles = '批量关闭';
				this.isHide = true;
				this.isShow9 = true;
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
						// console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.isHide = false;
							this.isShow1 = false;
							this.successMessage = '批量操作账号成功';
							this.successModal = true;
							setTimeout(() => {
								this.successModal = false;
								this.datat();
								this.datas();
								this.Users();
								this.Position();
								this.Community();
							}, 2000);
						} else {
							this.isHide = false;
							this.isShow1 = false;
							this.datat();
							this.warningMessage = '批量操作账号失败,开启和关闭不能同时操作';
							this.warningModal = true;
						}
					}).catch((error) => {
						// console.log(error);
					})
				} else {
					this.isHide = false;
					this.isShow1 = false;
					this.datat();
					this.warningMessage = '你没有选中要操作的账号';
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
				// console.log(this.departmentList);
				if(this.departmentList.length) {
					axios.post(hostOffDepartment, {
						departmentList: this.departmentList
					}).then((response) => {
						// console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.isHide = false;
							this.isShow3 = false;
							this.successMessage = '批量操作部门成功';
							this.successModal = true;
							setTimeout(() => {
								this.successModal = false;
								this.datat();
								this.datas();
								this.Users();
								this.Position();
								this.Community();
							}, 2000);
						} else {
							this.isHide = false;
							this.isShow3 = false;
							this.datas();
							this.warningMessage = '批量操作部门失败,开启和关闭不能同时操作';
							this.warningModal = true;
						}
					}).catch((error) => {
						// console.log(error);
					})
				} else {
					this.isHide = false;
					this.isShow3 = false;
					this.datas();
					this.warningMessage = '你没有选中要操作的部门';
					this.warningModal = true;
				}

			},
			qsm7() { //批量开放或者关闭·职位
				let mt = 0;
				if(this.titles == '批量开放') {
					mt = 1;
				} else if(this.titles == '批量关闭') {
					mt = 0;
				}
				this.cxkjUserPositionList = [];
				for(let i = 0; i < this.Positions.length; i++) {
					if(this.Positions[i].sing == true) {
						this.cxkjUserPositionList.push({
							positionId: this.Positions[i].positionId,
							positionStatus: mt
						});
					}
				}
				if(this.cxkjUserPositionList.length) {
					axios.post(hostOffPosition, {
						cxkjUserPositionList: this.cxkjUserPositionList
					}).then((response) => {
						// console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.isHide = false;
							this.isShow7 = false;
							this.successMessage = '批量操作职位成功';
							this.successModal = true;
							setTimeout(() => {
								this.successModal = false;
								this.datat();
								this.datas();
								this.Users();
								this.Position();
								this.Community();
							}, 2000);
						} else {
							this.isHide = false;
							this.isShow7 = false;
							this.Position();
							this.warningMessage = '批量操作职位失败,开启和关闭不能同时操作';
							this.warningModal = true;
						}
					}).catch((error) => {
						// console.log(error);
					})
				} else {
					this.isHide = false;
					this.isShow7 = false;
					this.Position();
					this.warningMessage = '你没有选中要操作的职位';
					this.warningModal = true;
				}
			},
          /****确认重置密码***/
            qsm10(){
            this.isShow10 = false;
            this.isHide = false;
            axios.post(passwordReurn,
              qs.stringify({id: this.activeUserId})
            ).then((response) => {
              this.successMessage = '密码重置成功！';
              this.successModal = true;
              setTimeout(() => {
                this.successModal = false;
              }, 1500);
            }).catch((error) => {
            //   console.log(error);
            })

           },
			/****取消重置密码*****/
			qb10(){
				this.isShow10 = false
				this.isHide = false
			},
			qsm9(){
				let mt = 0;
				if(this.titles == '批量开放') {
					mt = 1;
				} else if(this.titles == '批量关闭') {
					mt = 0;
				}
				this.cxkjCenterPowerList = [];
				for(let i = 0; i < this.Communitys.length; i++) {
					if(this.Communitys[i].sing == true) {
						this.cxkjCenterPowerList.push({
							powerId: this.Communitys[i].powerId,
							powerStatus: mt
						});
					}
				}
				if(this.cxkjCenterPowerList.length) {
					axios.post(hostOffManagement, {
						cxkjCenterPowerList: this.cxkjCenterPowerList
					}).then((response) => {
						// console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.isHide = false;
							this.isShow9 = false;
							this.successMessage = '批量操作权限组成功';
							this.datat();
							this.datas();
							this.Users();
							this.Position();
							this.Community();
							this.successModal = true;
							setTimeout(() => {
								this.successModal = false;
							}, 2000);
						} else {
							this.isHide = false;
							this.isShow9 = false;
							this.Community();
							this.warningMessage = '批量操作权限组失败,开启和关闭不能同时操作';
							this.warningModal = true;
						}
					}).catch((error) => {
						// console.log(error);
					})
				} else {
					this.isHide = false;
					this.isShow7 = false;
					this.Position();
					this.warningMessage = '你没有选中要操作的权限组';
					this.warningModal = true;
				}
			},
			//弹出公司编辑窗口
			compileCompany(ids){
				this.isHide = true;
				this.isShow11 = true;
				this.adds4 = '编辑公司';
				this.CompanyID = ids;
				if(ids){
					axios.post(detailsCompany500153,
						qs.stringify({
							id:ids
						})
					).then((res)=>{
						// console.log(res);
						if(res.status == 200 && res.data.code == 10000) {
							let datas = res.data.entity;
							this.addCompany.name = datas.name;
							this.superiorvalue = datas.parentName;
							this.addCompany.wxpayAppid = datas.wxpayAppId;
							this.addCompany.wxpayMchid = datas.wxpayMchid;
							this.addCompany.alipayAppid = datas.alipayAppId;
							this.addCompany.alipayPrivatekey = datas.alipayPrivateKey;
							// console.log(this.addCompany);
						}
					})
				}
			},
			//关闭或者取消公司编辑窗口
			closeCompany(){
				this.isHide = false;
				this.isShow11 = false;
				this.superiorvalue = '';
				this.addCompany.name = '';
				this.addCompany.parentId = '';
				this.addCompany.wxpayAppid = '';
				this.addCompany.wxpayMchid = '';
				this.addCompany.alipayAppid = '';
				this.addCompany.alipayPrivatekey = '';
			},
			//选择上级公司获取公司ID
			superiorCompany(id){
				this.addCompany.parentId = this.Companys[this.Companys.findIndex(item => item.name == id)].id;
			},
			addsCompany(){
				if(this.adds4 == '新增公司'){
					axios.post(addCompany500151,
						qs.stringify({
							name:this.addCompany.name,
							parentId:this.addCompany.parentId,
							wxpayAppid:this.addCompany.wxpayAppid,
							wxpayMchid:this.addCompany.wxpayMchid,
							alipayAppid:this.addCompany.alipayAppid,
							alipayPrivatekey:this.addCompany.alipayPrivatekey,
						})
					).then((res)=>{
						console.log(res);
						if(res.status == 200 && res.data.code == 10000) {
							this.isHide = false;
							this.isShow11 = false;
							this.successMessage = '新增公司成功'
							this.successModal = true;

							setTimeout(() => {
								this.successModal = false;
								this.Company();
							}, 2000);
						} else {
							this.isHide = false;
							this.isShow11 = false;
							this.warningMessage = res.data.content;
							this.warningModal = true;
						}
					}).catch((err)=>{
							this.isHide = false;
							this.isShow11 = false;
							this.warningMessage = '新增公司失败';
							this.warningModal = true;
					})
					this.superiorvalue = '';
					this.addCompany.name = '';
					this.addCompany.parentId = '';
					this.addCompany.wxpayAppid = '';
					this.addCompany.wxpayMchid = '';
					this.addCompany.alipayAppid = '';
					this.addCompany.alipayPrivatekey = '';
				}
				else if(this.adds4 == '编辑公司'){
					// console.log(this.addCompany);
					axios.post(amendCompany500152,
						qs.stringify({
							id:this.CompanyID,
							name:this.addCompany.name,
							parentId:this.addCompany.parentId,
							wxpayAppid:this.addCompany.wxpayAppid,
							wxpayMchid:this.addCompany.wxpayMchid,
							alipayAppid:this.addCompany.alipayAppid,
							alipayPrivatekey:this.addCompany.alipayPrivatekey,
						})
					).then((res)=>{
						// console.log(res);
						if(res.status == 200 && res.data.code == 10000) {
							this.isHide = false;
							this.isShow11 = false;
							this.successMessage = '编辑公司成功'
							this.successModal = true;

							setTimeout(() => {
								this.successModal = false;
								this.Company();
							}, 2000);
						} else {
							this.isHide = false;
							this.isShow11 = false;
							this.warningMessage = res.data.content;
							this.warningModal = true;
						}
					}).catch((err)=>{
							this.isHide = false;
							this.isShow11 = false;
							this.warningMessage = '编辑公司失败';
							this.warningModal = true;
					})
				}
			},
			//批量开放公司
			opeCompanys(){
				this.isHide = true;
				this.CompanyisShow = true;
				this.titles = '批量开放'
			},
			//批量关闭公司
			cloCompanys(){
				this.isHide = true;
				this.CompanyisShow = true;
				this.titles = '批量关闭'
			},
			confirmCompany(){
				let idArray = [];
				for(let i = 0; i < this.Companys.length; i++) {
					if(this.Companys[i].sing == true) {
						idArray.push(this.Companys[i].id);
					}
				}
				let idm = idArray.join(',');
				// console.log(idm);
				if(idArray.length>0){
					if(this.titles == '批量开放'){
						axios.post(batchCompany500154,
							qs.stringify({
								ids:idm,
								status:0
							})
						).then((res)=>{
							// console.log(res);
							if(res.status == 200 && res.data.code == 10000) {
								this.isHide = false;
								this.CompanyisShow = false;
								this.successMessage = '批量操作公司成功';
								this.successModal = true;
								setTimeout(() => {
									this.successModal = false;
									this.Company();
								}, 2000);
							} else {
								this.isHide = false;
								this.CompanyisShow = false;
								this.Company();
								this.warningMessage = '批量操作公司失败,开启和关闭不能同时操作';
								this.warningModal = true;
							}
							
						})
					}
					else if(this.titles == '批量关闭'){
						axios.post(batchCompany500154,
							qs.stringify({
								ids:idm,
								status:1
							})
						).then((res)=>{
							// console.log(res);
							if(res.status == 200 && res.data.code == 10000) {
								this.isHide = false;
								this.CompanyisShow = false;
								this.successMessage = '批量操作公司成功';
								this.successModal = true;
								setTimeout(() => {
									this.successModal = false;
									this.Company();
								}, 2000);
							} else {
								this.isHide = false;
								this.CompanyisShow = false;
								this.Company();
								this.warningMessage = '批量操作公司失败,开启和关闭不能同时操作';
								this.warningModal = true;
							}
						})
					}
				}else{
					this.isHide = false;
					this.CompanyisShow = false;
					this.warningMessage = '你没有选中要操作的公司';
					this.warningModal = true;
				}
				
			},
			//批量公司操作取消
			closeCompanys(){
				this.isHide = false;
				this.CompanyisShow = false;
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
</style>
