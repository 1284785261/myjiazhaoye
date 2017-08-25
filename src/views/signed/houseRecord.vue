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
		          <h3><i class="icon icon-iden"></i>开门记录</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="houseRecord">
		    		<div class="houserecord1">
		    			<span>房间：<i>3层 301</i></span>
		    			<span>智能锁状态：<i class="zx">在线</i></span>
		    			<span>序列号：<i>123654654646</i></span>
		    		</div>
		    		<table>
		    			<thead>
		    				<td width="200px">时间</td>
		    				<td width="200px">操作人</td>
		    				<td width="200px">状态</td>
		    				
		    			</thead>
		    			<tr>
		    				<td>202042042</td>
		    				<td>租客</td>
		    				<td>成功</td>
		    			</tr>
		    			<tr>
		    				<td>202042042</td>
		    				<td>租客</td>
		    				<td>成功</td>
		    			</tr>
		    			<tr>
		    				<td>202042042</td>
		    				<td>租客</td>
		    				<td>成功</td>
		    			</tr>
		    			<tr>
		    				<td>202042042</td>
		    				<td>租客</td>
		    				<td>成功</td>
		    			</tr>
		    		</table>
		    	</div> 
		        
		    
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/houseRecord.css';
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
    		
    	
    	},
    	created(){
    		
			
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  
</style>