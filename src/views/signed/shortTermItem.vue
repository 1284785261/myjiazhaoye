<template>
	<div>
		<!--<menu-box :active-tab-name="activeTabName"></menu-box>-->
		<!--<div class="right-content" id="right-content">-->
			<!--<right-header></right-header>-->
			<!--<div class="wordbench-box">-->
				<!--<div class="ivu-site">-->
		          <!--<span>您现在的位置：工作台 > </span>-->
		          <!--<router-link  class="active" to="/apartment/communityManagement">公寓状态</router-link>-->
		        <!--</div>-->
		        <!--<div class="ivu-bar-title">-->
		          <!--<h3><i class="icon icon-iden"></i>短租房状态</h3>-->
		          <!--<span>{{Name}}</span>-->
		        <!--</div>-->
		    	<div id="shortTerm">
		    		<div class="shortTerm1">
		    			<div class="form-search-criteria">
							<router-link :to="{path:'/signed/shortresident',query:{id:communityId}}">住户列表</router-link>
                            <div class="form-item">
                                <b>房型：</b>
                                <Select v-model="roomCategorvalue" style="width:150px">
                                    <Option v-for="community in  roomCategory" :value="community.housetypeId" :key="community.housetypeId">{{ community.name }}</Option>
                                </Select>
                            </div>
							<div class="form-item">
                                <b>房间状态：</b>
                                <Select v-model="roomStatevalue" style="width:150px">
                                    <Option v-for="community in  roomState" :value="community.roomStatus" :key="community.roomStatus">{{ community.name }}</Option>
                                </Select>
                            </div>
                            <div class="form-item">
                                <b>更多查询：</b>
                                <Select v-model="morequerievalue" style="width:100px">
                                    <Option v-for="community in  moreQueries" :value="community.moreId" :key="community.moreId">{{ community.name }}</Option>
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
			        		<span>{{item.floorName}}</span><span>层</span>
                            <span>{{item.roomList.length}}间</span>
			        		<i :class="[item.hais ? clas:clas2]" @click="shrink(index,item.hais)"></i>
			        	</div>
			        	<transition name="el-zoom-in-top">
			        	<ul class="state2 transition-box" v-show='item.hais'>
			        		<li v-for="its in item.roomList" >
			        			<div>

					        			<p>{{its.roomNum}}</p>
                                        <span class="short" v-if="its.isPmsRoom == '1'">短租</span>
										<span class="short" v-if="its.isPmsRoom == '0'">长租</span>
					        			<p v-if="its.name && its.isPmsRoom == '1'">{{its.name}}</p>
										<p v-else-if="its.housetypeName && its.isPmsRoom == '0'">{{its.housetypeName}}</p>
										<p v-else-if="its.isPmsRoom == '0'"></p>
					        			<span v-if="its.userName">姓名:{{its.userName}}</span>
										<span v-else></span>
					        			<span v-if="its.userPhone">手机号:{{its.userPhone}}</span>
										<span v-else></span>
					        			<p v-if="its.isPmsRoom == '1'">
                                            {{its.price | price}}
					        				<i :class="[{'act':its.roomStatus == 0},{'act2':its.roomStatus == 1}]"><em v-if="its.isPmsRoom == '1'">{{its.roomStatus | shortstates(its.roomStatus)}}</em></i>
					        			</p>
										<p v-if="its.isPmsRoom == '0'">
											<i :class="[{'act':its.status == 0},{'act2':its.status == 1}]"><em v-if="its.isPmsRoom == '0'"></em>{{its.status | statusm(its.status)}}</em></i>
										</p>
			        			</div>

				        		<router-link :to="{path:'/signed/shortDetails',query:{id:its.roomId,ids:communityId}}" class="sex">
				        				<span>房间</span>
				        				<span>点击弹出房间信息</span>
				        		</router-link>
			        		</li>
			        	</ul>
			       		 </transition>
		    		</div>
		    	</div>


			</div>
			<!--<footer-box></footer-box>-->
		<!--</div>-->
	</div>
</template>

<script>

	import '../../sass/style/shortTerm.css';
	import menuBox from '../../components/menuBox.vue';
    import rightHeader from '../../components/rightHeader.vue';
    import footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostState,imgPath,ShortRentstate200211,ShortRoomTypes200208 } from '../api.js';
    import qs from 'qs';

    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
    			communityId:null,
    			hides:true,
    			bigdata:[],
    			hide:false,
    			clas:'el-icon-arrow-up',
    			clas2:'el-icon-arrow-down',
    			Name:'',
				stationKeyWord:'',
				roomCategory:[{
					housetypeId:'-1',
					name:'全部'
				}],
				roomState:[{
					roomStatus:'-1',
					name:'全部'
				},{
					roomStatus:'0',
					name:'维护中'
				},{
					roomStatus:'1',
					name:'待出租'
				},{
					roomStatus:'2',
					name:'已出租'
				},{
					roomStatus:'3',
					name:'脏房'
				}],
				moreQueries:[{
						moreId:'-1',
						name:'全部'
					},{
						moreId:'1',
						name:'房号'
					},{
						moreId:'2',
						name:'联系人手机号'
					},{
						moreId:'3',
						name:'姓名'
					}],
				roomCategorvalue:'-1',
				morequerievalue:'-1',
				roomStatevalue:'-1'
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
    		},
          shortstates(val){
            if(val == 0){
              return '维护中'
            }
            else if(val == 1){
              return '待出租'
            }
            else if(val == 2){
              return '已出租'
            }
            else if(val == 3){
              return '脏房'
            }
		  },
		  statusm(val){
			if(val == 0){
				return '配置中'
			}
			else if(val == 1){
				return '待出租'
			}
			else if(val == 2){
				return '已出租'
			}
		  },
		  price(val){
			  if(val){
				  return '￥'+val;
			  }else{
				  return '';
			  }
		  }
    	},
    	mounted(){
    		this.communityId = sessionStorage.getItem('communityId');
    		this.Name = this.$route.query.Name;
    		//console.log(this.communityId);
    		this.datas();
			this.shortList();
    	},
    	methods:{
    		shrink(index,els){
			let vm =this
			this.$set(vm.bigdata[index],"hais",!vm.bigdata[index].hais);
    		//console.log(this.bigdata[index].hais);
			},
			shortList(){
				
				axios.post(ShortRoomTypes200208,
					qs.stringify({
						communityId:this.communityId
					})
				).then((response)=>{
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000){
						for(let i=0;i<response.data.entity.length;i++){
							this.roomCategory.push(response.data.entity[i]);
						}
					}
				})
			},
    		datas(){
				let vm = this
				let param = new FormData();
				param.append("communityId", this.communityId);
				if(this.roomCategorvalue && this.roomCategorvalue != '-1'){
					param.append("housetypeId", this.roomCategorvalue);
				}
				if(this.roomStatevalue && this.roomStatevalue != '-1'){
					param.append("roomStatus", this.roomStatevalue);
				}
				if(this.morequerievalue && this.morequerievalue != '-1'){
					param.append("moreNumber", this.morequerievalue);
				}
				if(this.stationKeyWord){
					param.append('keyWord',this.stationKeyWord);
				}
    			axios.post(ShortRentstate200211, param)
    			.then((response)=>{
    			// console.log(response);
    			if(response.status == 200 && response.data.code == 10000){
    				this.bigdata = response.data.pageBean.page;
	    				for(var i=0;i<this.bigdata.length;i++){
	    					this.$set(this.bigdata[i],"hais",true);
	    				}
	    				//console.log("sdafadsa");
	    				// console.log(this.bigdata);

    			}
 				})
    			.catch((error)=>{
    				// console.log(error);
    			})
    		},
    		tsa(){
    			this.hide = !this.hide;
			},
			searchStation(){
				this.datas();
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
