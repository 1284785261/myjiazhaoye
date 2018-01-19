<template>
	<div style="position: relative;">
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：</span>
		          <router-link  class="active" to="/Liverecording/recording">直播记录</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>直播记录</h3>
		        </div>
		        <div class="message-tis recording">
		        	<div class="tos">
                        <span class="bsf">直播时间：</span>
                        <Date-picker type="datetime" :options="option3" placeholder="请选择日期" format="yyyy-MM-dd HH:mm" v-model="start" class="dev"></Date-picker>
						<span style="margin: 0px 5px;">-</span>
						<Date-picker type="datetime" :options="option2" placeholder="请选择日期" format="yyyy-MM-dd HH:mm" v-model="over" class="dev"></Date-picker>
                        <a class="sous" @click="sousuos">搜索</a>
                    </div>
					<div style="width:100%;height:100%;clear:both;padding: 0 20px;">
						<ul class="lives">
							<li v-for="item in Datas" class="lis">
								<img :src="imgPath + item.imgs" class="logs" v-if="item.imgs">
								<img :src="imgPath + '/files/introduce/0io43171012150401.jpg'" class="logs" v-if="!item.imgs">
								<span class="hfs"> · 录播回放</span>
								<span class="commid">{{item.communityName?item.communityName:''}}</span>
								
								<div class="bfs">
									<div>
									</div>	
								</div>
								<img src="../../../static/images/icon/zb.png" class="btsg" @click="plays(item.thirdActivityId)">
							</li>
						</ul>
					</div>
                    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size=pageSize layout=" prev, pager, next, total,jumper" :total=totalNum>
					</el-pagination>

		        </div>
			</div>
			<footer-box></footer-box>
		</div>
		<div id="zbjs" style="height:500px;width:800px;">
			<i class="el-icon-circle-close" @click="inst"></i>
			<iframe border="0" style="border: 0px;" :src="url" width="100%" height="100%" v-if="url!=''"></iframe>
		</div>
	</div>
</template>
<script src="http://cnstatic01.e.vhall.com/3rdlibs/jquery/1.11.2/jquery.min.js" type="text/javascript"></script>
<script type="text/javascript" src="http://cnstatic01.e.vhall.com/jssdk/dist/2.3.3/vhallSDK.js"></script>
<script>

	import '../../sass/style/recording.css';
	import menuBox from '../../components/menuBox.vue';
    import  rightHeader from '../../components/rightHeader.vue';
    import  footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostAllLiveList,imgPath } from '../api.js';
    import qs from 'qs';

    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
			let _this = this;
    		return{
				activeTabName:"recording",
    			communityId:null,
                currentPage:1,
                totalNum:0,
    			Datas:null,
    			site:null,
    			contart:[],
    			Name:null,
    			imgPath:'',
                pageSize:10,
				mv:[],
				url:'',
				start:'',
				over:'',
				pageNum:1,
				option2: {
                    disabledDate(date){
                        return date && date.valueOf() < _this.start;
                    }
				},
				option3: {
                    disabledDate(date){
						if(_this.over){
							return date &&  _this.over < date.valueOf();
						}
                    }
                },
    		}
    	},
    	mounted(){
            this.datas();
            this.imgPath = imgPath;
    	},
    	methods:{
            datas(){
				let param = new FormData();
				let vm = this;
				if(this.start != ''){
					let start = new Date(this.start).Format('yyyy-MM-dd hh:mm');
					param.append('beginTimeParam',start);
				}
				if(this.over != ''){
					this.over = new Date(this.over).Format('yyyy-MM-dd hh:mm');
					param.append('endTimeParam',this.over);
				}
				param.append('pageNum',vm.pageNum);
				param.append('pageSize',vm.pageSize);
                axios.post(hostAllLiveList, param).then((res)=>{
                    // console.log(res);
                    if(res.status == 200 && res.data.code == 10000){
                        this.Datas = res.data.pageBean.page;
						this.totalNum = res.data.pageBean.totalNum;
                        // console.log(this.totalNum);
                        let arr = [];
                        for(let i = 0 ; i < this.Datas.length; i++){
                          if(this.Datas[i].communityFace){
                            arr =  this.Datas[i].communityFace.split(',');
                            this.$set(this.Datas[i], "imgs", arr[0]);
                          }

                        }
                    }
                }).catch((error)=>{
                    // console.log(error);
                })
            },
            handleCurrentChange(val) {
				this.pageNum = val;
				this.datas();
			},
			plays(id){
				// console.log(id);
				document.getElementById('zbjs').style.display = 'block';
				// this.url = "http://e.vhall.com/webinar/inituser/"+'858752857'+'test@vhall.com';
				this.url = "http://e.vhall.com/webinar/inituser/"+ id +"?email="+'test@vhall.com'+"&name="+'his.signObj.username';
			},
			inst(){
				document.getElementById('zbjs').style.display = 'none';
			},
			sousuos(){
				this.datas();
			}
    	},
    	filters:{
    	
    	},
    	computed:{
    		
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  .location_community{
    .ivu-icon-location{
      font-size: 38px;
      color: red;
      position: relative;
      top: 10px;
      left: 5px;
    }
  }
  .ivu-icon-ios-calendar-outline {
			color: #038be2;
			font-family: "iconfont" !important;
			font-size: 18px;
			font-style: normal;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			&:before {
				content: "\e60c";
			}
		}
</style>
