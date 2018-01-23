<template>
	<div>
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：工作台 > </span>
		          <router-link  class="active" to="/apartment/communityManagement">公寓状态</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>短租房状态</h3>
		          <span>{{Name}}</span>
		        </div>
		    	<div id="shortTerm">
		    		<div class="shortTerm1">
		    			<div class="form-search-criteria">
							<router-link :to="{path:'/signed/shortresident',query:{id:communityId}}">住户列表</router-link>
                            <div class="form-item">
                                <b>房型：</b>
                                <Select v-model="stationCommunity" style="width:150px">
                                    <Option v-for="community in  stationSelectList" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                                </Select>
                            </div>
                            <div class="form-item">
                                <b>更多查询：</b>
                                <Select v-model="stationCommunity" style="width:80px">
                                    <Option v-for="community in  stationSelectList" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                                </Select>
                            </div>
                            <div class="form-item">
                                <div class="form-search">
                                    <i class="iconfont icon-sousuo"></i>
                                    <Input v-model="stationKeyWord" placeholder="搜索联系人或联系电话"></Input>
                                    <input type="button" @click="searchStation()" value="搜索">
                                </div>
                            </div>
                        </div>
		    		</div>
		    		<div class="shortTerm2" v-for="(item,index) in bigdata">
			        	<div class="state1">
			        		<span>{{item.floorName}}</span><span>层</span><span>{{item.cxkjCommunityListRoomSize}}间</span>
			        		<i :class="[item.hais ? clas:clas2]" @click="shrink(index,item.hais)"></i>
			        	</div>
			        	<transition name="el-zoom-in-top">
			        	<ul class="state2 transition-box" v-show='item.hais'>
			        		<li v-for="its in item.cxkjCommunityListRoom" >
			        			<div>
                                        
					        			<p>{{its.roomNum}}</p>
                                        <span class="short">短租</span>
					        			<p v-if="its.cxkjCommunityHousetype != null">{{its.cxkjCommunityHousetype.housetypeName}}</p>
					        			<p v-else></p>
					        			<span v-if="its.cxkjContractSign != null && its.cxkjContractSign.RentArrears != null">{{its.cxkjContractSign.RentArrears}}</span>
					        			<span v-else></span>
					        			<span v-if="its.cxkjContractSign != null && its.cxkjContractSign.endDay > 0">租期剩余{{its.cxkjContractSign.endDay}}天</span>
					        			<span v-else></span>
					        			<p>￥{{its.roomRent}}.00
					        				<i :class="[{'act':its.roomStatus == 0},{'act2':its.roomStatus == 1}]">{{its.roomStatus | states(its.roomStatus)}}</i>
					        			</p>
			        			</div>
			        			
				        		<router-link :to="{path:'/signed/shortDetails',query:{id:its.roomId,ids:communityId,name:Name}}" class="sex">
				        				<span>房间</span>
				        				<span>点击弹出房间信息</span>
				        		</router-link>
			        		</li>
			        	</ul>
			       		 </transition>
		    		</div>
		    	</div>
		        
		    
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
	
	import '../../sass/style/shortTerm.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostState,imgPath } from '../api.js';
    import qs from 'qs';
    
    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
				activeTabName:"workbench",
    			communityId:null,
    			hides:true,
    			bigdata:[],
    			hide:false,
    			clas:'el-icon-arrow-up',
    			clas2:'el-icon-arrow-down',
    			Name:''
		   	}
    	},
    	filters:{
    		states(val){
    			if(val == 0){
    				return '配置中'
    			}
    			else if(val == 1){
    				return '待出租'
    			}
    			else if(val == 2){
    				return '已出租'
    			}
    		}
    	},
    	mounted(){
    		this.communityId = this.$route.query.communityId;
    		this.Name = this.$route.query.Name;
    		//console.log(this.communityId);
    		this.datas();
    		
    	},
    	methods:{
    		shrink(index,els){
			let vm =this
			this.$set(vm.bigdata[index],"hais",!vm.bigdata[index].hais);
    		//console.log(this.bigdata[index].hais);
    		},
    		datas(){
    			let vm = this
    			axios.post(hostState,
    				qs.stringify({
    					communityId:this.communityId
    				})
    			)
    			.then((response)=>{
    			// console.log(response);
    			if(response.status == 200 && response.data.code == 10000){
    				this.bigdata= response.data.entity;
	    				for(var i=0;i<this.bigdata.length;i++){
	    					this.$set(this.bigdata[i],"hais",true);
	    				}
	    				//console.log("sdafadsa");
	    				//console.log(this.bigdata);
    				
    			}
 				})
    			.catch((error)=>{
    				// console.log(error);
    			})
    		},
    		tsa(){
    			this.hide = !this.hide;
    		}
    		
    	
    	},
    	created(){
    		
			
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  #shortTerm{
    .form-search-criteria{
        position: relative;
        padding: 0 0 0px 30px;
        .form-item{
        display: inline-block;
        margin-right: 20px;
        .form-search{
            position: relative;
            margin-left: 50px;
            .ivu-input-wrapper{
            width: auto;
            }
            input[type="text"]{
            width: 208px;
            height: 36px;
            border-radius: 0;
            padding-left: 30px;
            }
            i{
            position: absolute;
            left: 5px;
            top: 7px;
            z-index: 99;
            font-size: 18px;
            color: #999;
            }
            input[type=button]{
            width: 70px;
            text-align: center;
            height: 36px;
            line-height: 36px;
            background-color: #038be2;
            color:#fff;
            border:none;
            position: relative;
            left: -5px;
            top: 1px;
            }
        }
        }
    }
  }
</style>