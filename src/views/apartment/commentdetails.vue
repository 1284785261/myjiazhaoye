<template>
	<div class="bugbox">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置： </span>
		          <router-link  class="active" to="/apartment/communityManagement">社区管理</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>评价详情</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="commentdetails">
		    		<div>
		    			<h4>社区信息</h4>
		    			<ul>
		    				<li>
		    					<span>社区名称：<b>{{Datas.cxkjCommunity.communityName}}</b></span>
		    				</li>
		    				<li>
		    					<span>社区类型：{{Datas.cxkjCommunity.communityType | communityType}}</span>
		    				</li>
		    				<li>
		    					<span>社区服务电话：{{Datas.cxkjCommunity.communityPhone}}</span>
		    				</li>
		    				<li>
		    					<span>开业日期：{{Datas.cxkjCommunity.communityOpeningDate | communityOpeningDate}}</span>
		    				</li>
		    				<li>
		    					<span>租期：{{Datas.cxkjCommunity.communityLeaseBegin | communityLeaseBegin}}--{{Datas.cxkjCommunity.communityLeaseEnd | communityLeaseEnd}}</span>
		    				</li>
		    				<li>
		    					<span>社区地址：{{communityAddress}}</span>
		    				</li>
		    				<li>
		    					<span>物业合同编号：{{Datas.cxkjCommunity.communityContractNum}}</span>
		    				</li>
		    			</ul>
		    		</div>
		    		<div>
		    			<h4>租户信息</h4>
		    			<ul>
		    				<li>
		    					<span>用户姓名：{{Datas.userInfo.userName}}</span>
		    				</li>
		    				<li>
		    					<span>联系电话：{{Datas.userInfo.userPhone}}</span>
		    				</li>
		    			</ul>
		    		</div>
		    		<div>
		    			<h4>订单/账单信息</h4>
		    			<ul>
		    				<li>
		    					<span v-if="Datas.cxkjBill.billName != null">账单类型：{{Datas.cxkjBill.billName}}</span>
		    					<span v-else></span>
		    				</li>
		    				<li>
		    					<span v-if="Datas.cxkjBill.cxkjCommunityOffice != null">租金：<i>{{Datas.cxkjBill.cxkjCommunityOffice.officeRent | officeRent}}</i></span>
		    					<span v-else></span>
		    				</li>
		    				<li>
		    					<span v-if="Datas.cxkjOfficeOrder">租期：{{Datas.cxkjOfficeOrder.cxkjOfficeOrderDetails.beginDate | beginDate}}--{{Datas.cxkjOfficeOrder.cxkjOfficeOrderDetails.endDate | endDate}}</span>
		    				</li>
		    			</ul>
		    		</div>
		    		<div class="pingj">
		    			<h4>用户评价</h4>
		    			<ul>
		    				<li>
		    					<span>评价：	<el-rate
											  v-model="score"
											  disabled
											  text-color="#ff9900"
											  text-template="{value}">
											</el-rate>

		    						</span>
		    				</li>
		    				<li>
		    					<span class="des">评价内容：{{Datas.content}}</span>
		    				</li>
		    			</ul>
		    		</div>
		    	</div>


			</div>
			<footer-box></footer-box>
		</div>

	</div>
</template>

<script>
	import '../../sass/style/commentdetails.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostCommentInfo } from '../api.js';
    import qs from 'qs';

    export default{
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
		        communityId:null,
		   		Datas:null,
		   		communityAddress:'',
		   		score:null
    		}
    	},
    	mounted(){
    		this.communityId = this.$route.query.id;
    		this.datas();
    	},
    	filters:{
    		communityType(val){
    			if(val == '0,1'){
    				return '公寓+办公室'
    			}
    			else if(val == '0'){
    				return '公寓'
    			}
    			else if(val == '1'){
    				return '办公室'
    			}
    		},
    		communityOpeningDate(val){
    			if(val != null) {
					var date = new Date(val);
					var Y = date.getFullYear() + '-';
					var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
					var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
					return Y + M + D;

				}
    			return null;
    		},
    		communityLeaseBegin(val){
    			if(val != null) {
					var date = new Date(val);
					var Y = date.getFullYear() + '.';
					var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
					var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
					return Y + M + D;

				}
    			return null;
    		},
    		communityLeaseEnd(val){
    			if(val != null) {
					var date = new Date(val);
					var Y = date.getFullYear() + '.';
					var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
					var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
					return Y + M + D;

				}
    			return null;
    		},
    		beginDate(val){
    			if(val != null) {
					var date = new Date(val);
					var Y = date.getFullYear() + '.';
					var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
					var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
					return Y + M + D;

				}
    			return null;
    		},
    		endDate(val){
    			if(val != null) {
					var date = new Date(val);
					var Y = date.getFullYear() + '.';
					var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
					var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
					return Y + M + D;

				}
    			return null;
    		},
    		officeRent(val){
    			if(val != null){
    				return val.toFixed(2)+'元'
    			}
    			return null
    		}
    	},
    	methods:{
			datas(){
				axios.post(hostCommentInfo,  //获取当前社区的所有评论信息
					qs.stringify({
						commentId:this.communityId
					})
				).then((response)=>{
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000){

						this.Datas = response.data.entity;
						// console.log(this.Datas)
						this.score = this.Datas.score;
						if(this.Datas.cxkjCommunity.province.areaName == this.Datas.cxkjCommunity.city.areaName){
							this.communityAddress = this.Datas.cxkjCommunity.province.areaName + this.Datas.cxkjCommunity.district.areaName + this.Datas.cxkjCommunity.communityAddress;
						}
						else{
							this.communityAddress = this.Datas.cxkjCommunity.province.areaName + this.Datas.cxkjCommunity.city.areaName + this.Datas.cxkjCommunity.district.areaName + this.Datas.cxkjCommunity.communityAddress;
						}
					}
				}).catch((error)=>{
					// console.log(error);
				})
			}
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

</style>
