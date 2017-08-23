<template>

	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：</span>
		          <router-link  class="active" to="/apartment/communityManagement">社区管理>公寓</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>社区资源</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		        <div class="message-tis">
		        	<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
					    <el-tab-pane label="公寓(1000)" name="first">
					    	<div class="house_hu">
						  		<router-link to="apartment/communityHouseType" class="hux">管理户型</router-link>
						  		<a href="#" class="adds">添加楼层</a>
						  	</div>
						  	<div class="ls">
						  		<div class="lishi">
							  	<div class="house_xq">
							  			<img src="../../../static/images/temp/logo2_03.png">
							  			<a href="#" class="ceng">1层</a>
							  			<a href="#" class="del">删除楼层</a>
							  			<a href="#" class="isste">快速复制楼层</a>
							  			<a href="#" class="adda">批量添加房间</a>
							  	</div>
							  	<div class="house_xqb">
								  	<el-table
								      :data="tableData"
								      border
								      style="width: 100%">
								      <el-table-column
								        prop="date"
								        label="房间"
								        width="180">
								      </el-table-column>
								      <el-table-column
								        prop="hx"
								        label="户型"
								        width="180">
								      </el-table-column>
								      <el-table-column
								        prop="address"
								        label="家具电器">
								      </el-table-column>
								      <el-table-column
								        prop="monery"
								        label="租金(元/月)">
								      </el-table-column>
								      <el-table-column
								        prop="watch"
								        label="水表/水费">
								      </el-table-column>
								      <el-table-column
								        prop="dian"
								        label="电表/电费">
								      </el-table-column>
								      <el-table-column
								        prop="open"
								        label="智能门锁">
								      </el-table-column>
								      <el-table-column
								        prop="opes"
								        label="状态">
								      </el-table-column>
								      <el-table-column
									      label="操作">
									      <template scope="scope">
									        <el-button @click="handleClick" type="text" size="small">编辑</el-button>
									        <el-button type="text" size="small">删除</el-button>
									      </template>
									  </el-table-column>
								    </el-table>
							  	</div>
							</div>
								<div class="lishi">
							  	<div class="house_xq">
							  			<img src="../../../static/images/temp/logo2_03.png">
							  			<a href="#" class="ceng">1层</a>
							  			<a href="#" class="del">删除楼层</a>
							  			<a href="#" class="isste">快速复制楼层</a>
							  			<a href="#" class="adda">批量添加房间</a>
							  	</div>
							  	<div class="house_xqb">
								  	<el-table
								      :data="tableData"
								      border
								      style="width: 100%">
								      <el-table-column
								        prop="date"
								        label="房间"
								        width="180">
								      </el-table-column>
								      <el-table-column
								        prop="hx"
								        label="户型"
								        width="180">
								      </el-table-column>
								      <el-table-column
								        prop="address"
								        label="家具电器">
								      </el-table-column>
								      <el-table-column
								        prop="monery"
								        label="租金(元/月)">
								      </el-table-column>
								      <el-table-column
								        prop="watch"
								        label="水表/水费">
								      </el-table-column>
								      <el-table-column
								        prop="dian"
								        label="电表/电费">
								      </el-table-column>
								      <el-table-column
								        prop="open"
								        label="智能门锁">
								      </el-table-column>
								      <el-table-column
								        prop="opes"
								        label="状态">
								      </el-table-column>
								      <el-table-column

									      label="操作"
									     >
									      <template scope="scope">
									        <el-button @click="handleClick" type="text" size="small">编辑</el-button>
									        <el-button type="text" size="small">删除</el-button>
									      </template>
									  </el-table-column>
								    </el-table>
							  	</div>
							</div>
						  		<div class="lishi">
							  	<div class="house_xq">
							  			<img src="../../../static/images/temp/logo2_03.png">
							  			<a href="#" class="ceng">1层</a>
							  			<a href="#" class="del">删除楼层</a>
							  			<a href="#" class="isste">快速复制楼层</a>
							  			<a href="#" class="adda">批量添加房间</a>
							  	</div>
							  	<div class="house_xqb">
								  	<el-table
								      :data="tableData"
								      border
								      style="width: 100%">
								      <el-table-column
								        prop="date"
								        label="房间"
								        width="180">
								      </el-table-column>
								      <el-table-column
								        prop="hx"
								        label="户型"
								        width="180">
								      </el-table-column>
								      <el-table-column
								        prop="address"
								        label="家具电器">
								      </el-table-column>
								      <el-table-column
								        prop="monery"
								        label="租金(元/月)">
								      </el-table-column>
								      <el-table-column
								        prop="watch"
								        label="水表/水费">
								      </el-table-column>
								      <el-table-column
								        prop="dian"
								        label="电表/电费">
								      </el-table-column>
								      <el-table-column
								        prop="open"
								        label="智能门锁">
								      </el-table-column>
								      <el-table-column
								        prop="opes"
								        label="状态">
								      </el-table-column>
								      <el-table-column

									      label="操作"
									      >
									      <template scope="scope">
									        <el-button @click="handleClick" type="text" size="small">编辑</el-button>
									        <el-button type="text" size="small">删除</el-button>
									      </template>
									  </el-table-column>
								    </el-table>
							  	</div>
							</div>
						  	</div>
					    </el-tab-pane>
					    <el-tab-pane label="开放工位" name="second">
					    	<ul>
					    		<li>
					    			<span>开放工位：</span><input type="text" placeholder="请输入开放工位数"/><span>个</span>
					    		</li>
					    		<li>
					    			<span>工位租金：</span><input type="text" placeholder="请输入工位租金"/><span>元/天</span>
					    		</li>
					    	</ul>

					    	<a href="#" class="confirm2">确定</a>
					    	<a href="#" class="call">取消</a>
					    </el-tab-pane>
					    <el-tab-pane label="办公室" name="third">
					    	<table class="bgs">
					    		<thead>
					    			<tr>
					    				<td>门牌号</td>
					    				<td>工位数</td>
					    				<td>租金(元/月)</td>
					    				<td>操作</td>
					    			</tr>
					    		</thead>
					    		<tr class="mps">
					    			<td>
					    				<input type="text" placeholder="请输入门牌号">
					    			</td>
					    			<td>
					    				<input type="text" placeholder="请输入工位数">
					    			</td>
					    			<td>
					    				<input type="text" placeholder="请输入租金">
					    			</td>
					    			<td>
					    				<a href="#">删除</a>
					    			</td>
					    		</tr>
					    		<tr class="mps">
					    			<td>
					    				<input type="text" placeholder="请输入门牌号">
					    			</td>
					    			<td>
					    				<input type="text" placeholder="请输入工位数">
					    			</td>
					    			<td>
					    				<input type="text" placeholder="请输入租金">
					    			</td>
					    			<td>
					    				<a href="#">删除</a>
					    			</td>
					    		</tr>
					    		<tr class="mps">
					    			<td>
					    				<input type="text" placeholder="请输入门牌号">
					    			</td>
					    			<td>
					    				<input type="text" placeholder="请输入工位数">
					    			</td>
					    			<td>
					    				<input type="text" placeholder="请输入租金">
					    			</td>
					    			<td>
					    				<a href="#">删除</a>
					    			</td>
					    		</tr>
					    		<tr class="add_a">
					    			<td width= "25% " colspan="4">
					    				<span>继续添加</span><input type="text" value="1"/> <span>行</span><a href="#">确定</a>
					    			</td>
					    		</tr>
					    	</table>
					    	<a class="qd" href="#">确定</a>
					    	<a class="qx" href="#">取消</a>
					    </el-tab-pane>
					    <el-tab-pane label="会议室" name="fourth">
					    	<table class="bgs">
					    		<thead>
					    			<tr>
					    				<td>门牌号</td>
					    				<td>人数</td>
					    				<td>租金(元/小时)</td>
					    				<td>操作</td>
					    			</tr>
					    		</thead>
					    		<tr class="mps">
					    			<td>
					    				<input type="text" placeholder="请输入门牌号">
					    			</td>
					    			<td>
					    				<input type="text" placeholder="请输入人数">
					    			</td>
					    			<td>
					    				<input type="text" placeholder="请输入租金">
					    			</td>
					    			<td>
					    				<a href="#">删除</a>
					    			</td>
					    		</tr>
					    		<tr class="mps">
					    			<td>
					    				<input type="text" placeholder="请输入门牌号">
					    			</td>
					    			<td>
					    				<input type="text" placeholder="请输入人数">
					    			</td>
					    			<td>
					    				<input type="text" placeholder="请输入租金">
					    			</td>
					    			<td>
					    				<a href="#">删除</a>
					    			</td>
					    		</tr>
					    		<tr class="mps">
					    			<td>
					    				<input type="text" placeholder="请输入门牌号">
					    			</td>
					    			<td>
					    				<input type="text" placeholder="请输入人数">
					    			</td>
					    			<td>
					    				<input type="text" placeholder="请输入租金">
					    			</td>
					    			<td>
					    				<a href="#">删除</a>
					    			</td>
					    		</tr>
					    		<tr class="add_a">
					    			<td width= "25% " colspan="4">
					    				<span>继续添加</span><input type="text" value="1"/> <span>行</span><a href="#">确定</a>
					    			</td>
					    		</tr>
					    	</table>
					    	<a class="qd" href="#">确定</a>
					    	<a class="qx" href="#">取消</a>
					    </el-tab-pane>
				  	</el-tabs>

		        </div>
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>

	import '../../sass/style/communityHouse.css';
	import menuBox from '../../components/menuBox.vue';
    import  rightHeader from '../../components/rightHeader.vue';
    import  footerBox from '../../components/footerBox.vue';
    import api from '../api.js';

	export default{
		components:{
			rightHeader,
			menuBox,
			footerBox
		},
		data(){
			return{
				activeName2: 'first',
				tableData: [{
		            date: '101',
		            hx: '王小虎',
		            address: '18 弄',
		            monery:'10',
		            watch:'aaa',
		            dian:'44',
		            open:'在线',
		            opes:'关闭'
		          },{
		            date: '101',
		            hx: '王小虎',
		            address: '1518 弄',
		            monery:'10',
		            watch:'aaa',
		            dian:'44',
		            open:'在线',
		            opes:'关闭'
		          },{
		            date: '101',
		            hx: '王小虎',
		            address: '上海518 弄',
		            monery:'10',
		            watch:'aaa',
		            dian:'44',
		            open:'在线',
		            opes:'关闭'
		          },{
		            date: '101',
		            hx: '王小虎',
		            address: '上海518 弄',
		            monery:'10',
		            watch:'aaa',
		            dian:'44',
		            open:'在线',
		            opes:'关闭'
		          },{
		            date: '101',
		            hx: '王小虎',
		            address: '上海518 弄',
		            monery:'10',
		            watch:'aaa',
		            dian:'44',
		            open:'在线',
		            opes:'关闭'
		          },{
		            date: '101',
		            hx: '王小虎',
		            address: '上海8 弄',
		            monery:'10',
		            watch:'aaa',
		            dian:'44',
		            open:'在线',
		            opes:'关闭'
		          },]
			}
		},
		methods:{
			handleClick(tab, event){
				//this.$router.push({path:"/apartment/communityRoom"});
				console.log(tab, event);
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

</style>
