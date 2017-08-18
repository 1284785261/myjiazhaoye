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
		          <h3><i class="icon icon-iden"></i>编辑房间</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		        <div class="message-tis">
		        	<table>
		        		<tr>
		        			<td>房间：</td>
		        			<td>1层   103房间 </td>
		        		</tr>
		        		<tr>
		        			<td>户型：</td>
		        			<td class="hx">
		        				<el-select v-model="value" filterable placeholder="请输入或选择">
								    <el-option
								      v-for="item in options"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								</el-select>
		        			</td>
		        		</tr>
		        		
		        		<tr>
		        			<td>面积：</td>
		        			<td><input type="text" placeholder="请输入面积" class="complie_name2">  m²</td>
		        		</tr>
		        		<tr>
		        			<td>租金：</td>
		        			<td><input type="text" placeholder="请输入租金" class="complie_name3">  元/月</td>
		        		</tr>
		        		
		        		<tr>
		        			<td>家用电器：</td>
		        			<td class="jiayong">
		        				<el-checkbox v-model="checked">床</el-checkbox>
		        				<el-checkbox v-model="checked">洗衣机</el-checkbox>
		        				<el-checkbox v-model="checked">书桌</el-checkbox>
		        				<el-checkbox v-model="checked">空调</el-checkbox>
		        				<el-checkbox v-model="checked">电视</el-checkbox>
		        				<el-checkbox v-model="checked">衣柜</el-checkbox>
		        			</td>
		        		</tr>
		        		<tr class="waters">
		        			<td class="ts">
		        				水费设置:
		        			</td>
		        			<td class="water">
		        				
		        					<p class="water1">水表状态：<i>在线</i></p>
		        					<span class="water2">计费方式：</span>
		        					<div class="water3">
								   		<el-radio class="radio" v-model="radio" label="1">按用量</el-radio><br>
	  									<el-radio class="radio" v-model="radio" label="2">按合租人数</el-radio>
		        					</div>
							  		
			        				<div class="water4">
				        				<input type="text" v-model="input" placeholder="请填写金额"></input><span>元/m²</span><br>
									 	<input type="text" v-model="input" placeholder="请填写金额"></input><span>元/人</span>
								 	</div>
		        			</td>
		        		</tr>
		        		<tr class="waters">
		        			<td class="ts">
		        				电费设置:
		        			</td>
		        			<td class="water">
		        				
		        					<p class="water1">电表状态：<i>在线</i></p>
		        					<span class="water2">计费方式：</span>
		        					<div class="water3">
								   		<el-radio class="radio" v-model="radio" label="1">按用量</el-radio><br>
	  									<el-radio class="radio" v-model="radio" label="2">按合租人数</el-radio>
		        					</div>
							  		
			        				<div class="water4">
				        				<input type="text" v-model="input" placeholder="请填写金额"></input><span>元/度</span><br>
									 	<input type="text" v-model="input" placeholder="请填写金额"></input><span>元/人</span>
								 	</div>
		        			</td>
		        		</tr>
		        	</table>
		        	<div class="operation-box">
		        	  
		              <Button type="primary" @click="Complie">确定</Button>
		        	  
		             
		            </div>  
		        </div>
		        
		        
		    
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	import menuBox from '../../components/menuBox.vue';
    import  rightHeader from '../../components/rightHeader.vue';
    import  footerBox from '../../components/footerBox.vue';
    import api from '../api.js';
    import '../../sass/style/communityRoom.css';
    
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
    			options: [{
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
		        value: '',
		        input: '',
                radio: '1'
		   	}
    	},
    	methods:{
    		Complie:function(){
    			
    		}
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  
</style>