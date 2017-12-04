<template>
	<div>
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
                        <Date-picker type="datetime" placeholder="请选择日期" format="yyyy-MM-dd HH:mm" v-model="start" class="dev"></Date-picker>
						<span style="margin: 0px 5px;">-</span>
						<Date-picker type="datetime" placeholder="请选择日期" format="yyyy-MM-dd HH:mm" v-model="over" class="dev"></Date-picker>
                        <a class="sous">搜索</a>
                    </div>
                    <ul class="lives">
                        <li v-for="item in Datas">
                            <img :src="imgPath + item.imgs" class="logs">
                            <video id="myvideo" :src="videoSrc" :poster="videoImg" :muted="muteStatus" :autoplay="playStatus" height="190" width="250">
                                your browser does not support the video tag
                            </video>
                        </li>
                    </ul>
                    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size=pageSize layout=" prev, pager, next, total,jumper" :total=totalNum>
					</el-pagination>
		        </div>



			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

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
                pageSize:8,
    			mv:[]
    		}
    	},
    	mounted(){
            this.datas();
            this.imgPath = imgPath;
    	},
    	methods:{
            datas(){
                axios.post(hostAllLiveList,
                    qs.stringify({
                        pageNum:1,
                        pageSize:this.pageSize
                    })
                ).then((res)=>{
                    console.log(res);
                    if(res.status == 200 && res.data.code == 10000){
                        this.Datas = res.data.pageBean.page;
						this.totalNum = res.data.pageBean.totalNum;
                        console.log(this.totalNum);
                        let arr = [];
                        for(let i = 0 ; i < this.Datas.length; i++){
                            arr =  this.Datas[i].communityFace.split(',');
                            this.$set(this.Datas[i], "imgs", arr[0]);
                        }
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            },
            handleCurrentChange(val) {
				this.pageNum = val;
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
