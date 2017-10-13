<template>
	<div id="housesubscrib">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/signed/housesubscribe">我的业绩</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>我的业绩</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="perform">
		    		<div class="perform1">
		    			<span class="bsc">日期：</span>
		    			<Date-picker type="date" placeholder="请选择日期" v-model="start" class="mvs"></Date-picker>
						<span class="inline-block spanBar">-</span>
						<Date-picker type="date" placeholder="请选择日期" v-model="over" class="mvs"></Date-picker>
						<span class="bsc">筛选：</span>
						<a v-for="(item,index) in tite" @click="classify(index)" :class="{'active':isAicat == index}">{{item}}</a>
		    		</div>
		    		<table>
		    			<thead>
		    				<td>日期</td>
		    				<td>类型</td>
		    				<td>房间</td>
		    				<td>是否由中介介绍</td>
		    				<td>中介公司</td>
		    				<td>中介人</td>
		    				<td>中介费</td>
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
		    				<td><a @click="adddian">查看合同</a></td>
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
	
	import '../../sass/style/performance.css';
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
				radio: '1',
				tite:['全部','公寓合同','联合办公合同'],
		   	}
    	},
    	mounted(){

    	},
    	filters:{
   
    	},
    	methods:{
			classify(){
				
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