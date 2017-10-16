<template>
	<div id="addirmsurrends">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/signed/housesubscribe">用户退租</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>确认退租</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="addirmsurrend">
		    		<div class="addirmsurrend1">
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
		    		<div class="addirmsurrend2">
		    			
		    		</div>
		    	</div>
		    </div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/affirmsurrend.css';
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
				ishide2:false,
				ishide3:false
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