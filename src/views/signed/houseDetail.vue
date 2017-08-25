<template>
	<div class="hous">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/apartment/communityManagement">公寓状态</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>公寓状态</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="houseDetail">
		    		<div class="housedetail1">
		    			<span>101房间</span>
		    			<span>标准大单间</span>
		    			<span>操作</span>
		    		</div>
		    		<table>
		    			<tr>
		    				<td width="15%">房间信息：</td>
		    				<td>
		    					<p>格局：1室0厅1卫 有窗</p>
		    					<p>面积：35.00m²</p>
		    					<p>租金：<span>1800.00元/月</span></p>
		    				</td>
		    				<td width="20%" rowspan="2">
		    					<a>新签租约</a>
		    					<a @click="instas()">调价</a>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>配置：</td>
		    				<td><span>床</span><span>床</span><span>床</span><span>床</span><span>床</span></td>
		    				
		    			</tr>
		    			<tr>
		    				<td>租约信息：</td>
		    				<td>
		    					<p>合同编码：GYdlaskdla</p>
		    					<p>状态：<span>履约中</span></p>
		    					<p>租期：20163165-161316</p>
		    				</td>
		    				<td rowspan="3">
		    					<a>查看租约</a>
		    					<a>续租</a>
		    					<a>退房</a>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>承租人：</td>
		    				<td><span>叶晓婷</span><span>联系电话：186461366</span></td>
		    			</tr>
		    			<tr>
		    				<td>
		    					首笔支付：
		    				</td>
		    				<td>
		    					<p>押金：1800.00元<span>租金：1800.00元</span></p>
		    					<p>预存：300.00元<span>服务费：300.00元</span></p>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>
		    					账单状态：
		    				</td>
		    				<td>
		    					<p>租金账单已欠3天</p>
		    					<p>水电账单已支付</p>
		    				</td>
		    				<td>
		    					<a>查看租金账单</a>
		    					<a>查看水电账单</a>
		    					<span>向用户发送交费提醒(5)</span>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>门锁状态：</td>
		    				<td><span>在线</span><span>序列号：2153135131313</span></td>
		    				<td rowspan="3">
		    					<router-link to="/signed/houseRecord">开门记录</router-link>
		    					<a>冻结</a>
		    					<a>获取临时密码</a>
		    				</td>
		    			</tr>
		    			<tr>
		    				<td>水表状态：</td>
		    				<td>
		    					<span>在线</span><span>序列号：2153135131313</span>
		    					<p>按人计费<b>50.00</b>元/人</p>
		    				</td>
		    				
		    			</tr>
		    			<tr>
		    				<td>电表状态：</td>
		    				<td>
		    					<span>在线</span><span>序列号：2153135131313</span>
		    					<p>按量计费<b>2.20</b>元/度</p>
		    				</td>
		    				
		    			</tr>
		    		</table>
		    		
		    	</div> 
		        
		    
			</div>
			<footer-box></footer-box>
		</div>
		<div class="zhezha" v-show="isHide">
			
		</div>
		<div class="insta" v-show="isHide">
				<i class="el-icon-circle-close"  @click="instas()"></i>
				<p>调价</p>
				<table>
					<tr>
						<td>房间：</td>
						<td>2层201</td>
					</tr>
					<tr>
						<td>原价：</td>
						<td>1800元/月</td>
					</tr>
					<tr>
						<td>新价格：</td>
						<td><input type="text" />元/月
						</td>
					</tr>
					<tr>
						<td>调价原因：</td>
						<td>
							<textarea>
								
							</textarea>
						</td>
					</tr>
				</table>
				<a>提交</a>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/houseDetail.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
    			isHide:false
		   	}
    	},
    	methods:{
    		instas:function(){
    			
    			this.isHide = !this.isHide;
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