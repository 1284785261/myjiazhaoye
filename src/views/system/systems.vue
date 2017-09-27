<template>
	<div id="housesubscrib">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box mps">
				<div class="ivu-site">
		          <span>您现在的位置： </span>
		          <router-link  class="active" to="/apartment/workbench">系统管理</router-link>
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
				    				<td><a>编辑</a><a>关闭</a></td>
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
				    				<td><a>编辑</a><a>关闭</a></td>
				    			</tr>
				    		</table>
				    		<el-pagination 
				    			@current-change="handleCurrentChange" 
				    			:current-page="currentPage1" 
				    			:page-size="3" 
				    			layout="prev, pager, next, total,jumper" 
				    			:total='20'>
							</el-pagination>
				    	</div>
				    </el-tab-pane>
				    <el-tab-pane label="部门管理" name="second">
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
				    				<td>部门</td>
				    				<td>上级部门</td>
				    				<td>子集数</td>
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
				    				<td>jay</td>
				    				<td><a>进入子部门</a><a>编辑</a><a>关闭</a></td>
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
				    				<td><a>进入子部门</a><a>编辑</a><a>关闭</a></td>
				    			</tr>
				    		</table>
				    		<el-pagination 
				    			@current-change="handleCurrentChange" 
				    			:current-page="currentPage1" 
				    			:page-size="3" 
				    			layout=" prev, pager, next, total,jumper" 
				    			:total='20'>
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
				    				<td><a>编辑</a><a>关闭</a></td>
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
				    				<td><a>编辑</a><a>关闭</a></td>
				    			</tr>
				    		</table>
				    		<el-pagination 
				    			@current-change="handleCurrentChange" 
				    			:current-page="currentPage1" 
				    			:page-size="3" 
				    			layout=" prev, pager, next, total,jumper" 
				    			:total='20'>
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
				    				<td><a>分配权限</a></td>
				    			</tr>
				    			<tr>
				    				<td>
				    					<Checkbox v-model="sing"></Checkbox>
				    				</td>
				    				<td>jay</td>
				    				<td>jay</td>
				    				<td>jay</td>
				    				<td>jay</td>
				    				<td><a>分配权限</a></td>
				    			</tr>
				    		</table>
				    		<el-pagination 
				    			@current-change="handleCurrentChange" 
				    			:current-page="currentPage1" 
				    			:page-size="3" 
				    			layout=" prev, pager, next, total,jumper" 
				    			:total='20'>
							</el-pagination>
				    	</div>
				    </el-tab-pane>
				    <el-tab-pane label="审核设置" name="fourth5">定时任务补偿</el-tab-pane>
				</el-tabs>
		    </div>
			<footer-box></footer-box>
		</div>
		
	</div>
</template>

<script>
	
	import '../../sass/style/systems.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostHousehold } from '../api.js';
    import qs from 'qs';
    
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
				currentPage1: 1,
				activeName2: 'first',
				single: false,
				sing:false

			}
    	},
    	mounted(){

    	},
    	filters:{
   
    	},
    	methods:{
			handleClick(tab, event) {
		        console.log(tab, event);
		    },
		    handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = ['香蕉', '苹果', '西瓜'];
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === 3) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
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