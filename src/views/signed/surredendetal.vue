<template>
	<div id="addirmsurrends">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/signed/surrender">用户退租</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>确认退租</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="surrendetal">
		    		<div class="surrendetal1">
		    			<Icon type="android-home"></Icon><p>公寓201</p>
		    			<ul>
		    				<li style="margin-left: 66px;"><span>承租人：承租人</span></li>
		    				<li><span>承租人：承租人</span></li>
		    				<li><span>承租人：承租人</span></li>
		    				<li><span>承租人：承租人</span></li>
		    				<li><span>承租人：承租人</span></li>
		    			</ul>
		    			
		    			<a>查看合同</a>
		    		</div>
		    		<div class="surrendetal2">
		    			<div>
		    				<img src="../../../static/images/icon/info.png" /><h3>租金和押金结算</h3>
		    				<ul>
		    					<li><span>押金：3600.00元</span></li>
		    					<li><span>租金：3600.00元/月   已缴12/12</span></li>
		    					<li><span>共计：21600.00元</span></li>
		    				</ul>
		    				<p>应退租金：3600.00元</p>
		    			</div>
		    			<div>
		    				<img src="../../../static/images/icon/info.png" /><h3>退租前水电费结算</h3>
		    				<table>
		    					<tr>
		    						<td>水表读数：<span>390</span></td>
		    						<td>用水量：<span>39m³</span></td>
		    						<td>水费：<span>312.00元</span></td>
		    					</tr>
		    					<tr>
		    						<td>电表读数：<span>390</span></td>
		    						<td>用电量：<span>39度</span></td>
		    						<td>电费：<span>312.00元</span></td>
		    					</tr>
		    				</table>
		    				
		    				<p>应扣水电费:371.41元</p>
		    			</div>
		    			<div>
		    				<img src="../../../static/images/icon/info.png" /><h3>物资清点</h3>
		    				<table class="wuzi">
		    					<tr>
		    						<td>床</td>
		    						<td>x<span>1</span></td>
		    						<td>应扣：0.00元</td>
		    					</tr>
		    					<tr>
		    						<td>电视</td>
		    						<td>x<span>1</span></td>
		    						<td>应扣：0.00元</td>
		    					</tr>
		    					<tr>
		    						<td>冰箱</td>
		    						<td>x<span>1</span></td>
		    						<td>应扣：0.00元</td>
		    					</tr>
		    					<tr>
		    						<td>洗衣机</td>
		    						<td>x<span>1</span></td>
		    						<td>应扣：0.00元</td>
		    					</tr>
		    				</table>
		    				<p>应扣物品折扣:371.41元</p>
		    			</div>
		    			<div class="qts">
		    				<img src="../../../static/images/icon/info.png" /><h3>物资清点</h3>
		    				<ul style="min-height: 30px;">
		    					<li><span>房间翻新</span>应扣：<span>0.00元</span></li>
		    				</ul>
		    				<p>应扣其他费用:371.41元</p>
		    			</div>
		    			<div>
		    				<p  class="zong">应退金额总计:<span>0.00元</span></p>
		    				<p class="titus">应退金额总计 = 押金 + 应退租金 + 应扣水电费 + 应扣物品折扣 + 其他费用</p>
		    			</div>
		    		</div>
		    	</div>
		    </div>
			<footer-box></footer-box>
		</div>
	</div>
</template>


<script>
	
	import '../../sass/style/surrendetal.css';
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
				ishide:false,

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