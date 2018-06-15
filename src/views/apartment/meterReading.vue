<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置： </span>
		          <router-link  class="active" to="/apartment/communityManagement">社区管理</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>电表抄表记录</h3>
		          <!--<span>佳兆业航运WEWA空间</span>-->
		        </div>
		    	<div id="doorRecord">
		    		<div class="doorrecord">
		    			<ul>
		    				<li><span>房间：</span><span>3层 301</span></li>
		    				<li><span>电表状态：</span><span>3层 301</span></li>
		    				<li><span>电表序列号：</span><span>3层 301</span></li>
		    				<li><span>网关名称：</span><span>3层 301</span></li>
		    				<li><span>供应商：</span><span>3层 301</span></li>
		    			</ul>
		    		</div>
		    		<table>
		    			<thead>
		    				<td width="33%">时间</td>
		    				<td width="33%">操作人</td>
		    				<td width="33%">读数</td>
		    			</thead>
		    			<tr>
		    				<td>2017-07-02 18:40:05</td>
		    				<td>租客</td>
		    				<td>成功</td>
		    			</tr>
		    			<tr>
		    				<td>2017-07-02 18:40:05</td>
		    				<td>租客</td>
		    				<td>成功</td>
		    			</tr>
		    			<tr>
		    				<td>2017-07-02 18:40:05</td>
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

	import '../../sass/style/doorRecord.css';
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
