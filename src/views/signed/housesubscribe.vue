<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/signed/housesubscribe">看房预约</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>看房预约</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="housesubscribe">
		    		<div class="housesubscribe1">
		    			<span class="bsc">预约时间：</span>
		    			<Date-picker type="date" placeholder="请选择日期" v-model="start" class="mvs"></Date-picker>
						<span class="inline-block spanBar">-</span>
						<Date-picker type="date" placeholder="请选择日期" v-model="over" class="mvs"></Date-picker>
						<span class="bsc">看房时间：</span>
						<Date-picker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择日期" class="dev"></Date-picker>
						<span class="inline-block spanBar">-</span>
						<Date-picker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="请选择日期" class="dev"></Date-picker>
						<input type="text"  placeholder="搜索联系人/手机号" class="mv"/>
						<i class="el-icon-search"></i>
						<a>搜索</a>
		    		</div>
		    		<table>
		    			<thead>
		    				<td>预约时间</td>
		    				<td>联系人姓名</td>
		    				<td>手机号码</td>
		    				<td>看房时间</td>
		    				<td>已选户型</td>
		    				<td>接待管家</td>
		    				<td>状态</td>
		    				<td>操作</td>
		    			</thead>
		    			<tr>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>未分配</td>
		    				<td><a>我要接待</a></td>
		    			</tr>
		    			<tr>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>111111</td>
		    				<td>未分配</td>
		    				<td><a>立即签约</a><a>确认接待</a></td>
		    			</tr>
		    		</table>
		    		<el-pagination
				      @current-change="handleCurrentChange"
				      :current-page.sync="currentPage3"
				      :page-size="5"
				      layout="prev, pager, next,total,jumper"
				      :total="20">
				    
				    </el-pagination>
		    	</div>
		    </div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/housesubscribe.css';
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
				currentPage3: 1,
		   	}
    	},
    	mounted(){

    	},
    	filters:{
   
    	},
    	methods:{

    	},
    	created(){
    		
			
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
</style>