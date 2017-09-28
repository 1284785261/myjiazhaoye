<template>
	<div id="housesubscrib">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/apartment/workbench">用户报修</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>报修详情</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="repairsdetails">
		    		<div class="repairsdetails1">
		    			<Icon type="home"></Icon><span class="mv">公寓201</span><span class="ms">待处理</span>
		    			<ul>
		    				<li>用户：<span>叶晓婷</span></li>
		    				<li style="margin-right: 297px;">用户联系电话：<span>1635164154</span></li>
		    				<li>提交时间：<span>13156651651651</span></li>
		    			</ul>
		    		</div>
		    		<table>
		    			<tr>
		    				<td><Icon type="settings"></Icon><span>维修项目</span></td>
		    				<td><span>热水器</span></td>
		    				<td><span>预约上门时间：</span></td>
		    			</tr>
		    			<tr>
		    				<td><Icon type="android-contact"></Icon><span>维修师傅</span></td>
		    				<td><span style="margin-right: 50px;">张大嘴</span><span>联系电话：</span><Icon type="ios-telephone"></Icon></td>
		    				<td></td>
		    			</tr>
		    			<tr>
		    				<td><Icon type="settings"></Icon><span>问题描述</span></td>
		    				<td><span>热水器</span></td>
		    				<td></td>
		    			</tr>
		    		</table>
		    		<div v-if="mts == 1">
		    			<a class="refund">确认跟踪</a>
		    		</div>
		    		<div v-else-if="mts == 2" class="mts">
			    		<span>备注：</span>
			    		<textarea placeholder="请输入备注内容"></textarea>
			    		<a class="refund">确认办结</a>
		    		</div>
		    		<div v-else-if="mts == 3" class="mts">
			    		<span>备注：</span>
			    		<textarea placeholder="请输入备注内容"></textarea>
			    		<a class="refund">保存</a>
		    		</div>
		    	</div>
		    </div>
			<footer-box></footer-box>
		</div>
		
	</div>
</template>

<script>
	
	import '../../sass/style/repairsdetails.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostRefunddetal } from '../api.js';
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
				mts:3,
				radio: '1',
				ishide:false,
				ishide2:false,
				ishide3:false,
				options8: [{
		          value: '选项1',
		          label: '黄金糕'
		        }, {
		          value: '选项2',
		          label: '双皮奶'
		        }, {
		          value: '选项3',
		          label: '蚵仔煎'
		        }, {
		          value: '选项4',
		          label: '龙须面'
		        }, {
		          value: '选项5',
		          label: '北京烤鸭'
		        }],
		        value: ''
			}
    	},
    	mounted(){

    	},
    	filters:{
   
    	},
    	methods:{
			adddian(){
				this.ishide = ! this.ishide;
				this.ishide2 = ! this.ishide2;
			},
			adddian2(){
				this.ishide = ! this.ishide;
				this.ishide3 = ! this.ishide3;
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