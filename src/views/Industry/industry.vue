<template>
	<div>
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置：</span>
		          <router-link  class="active" to="/Industry/industry">工商注册</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>工商注册申请</h3>
		        </div>
		        <div class="message-tis industry">
                    <div class="form-search">
                        <i class="iconfont icon-sousuo"></i>
                        <Input v-model="vague" placeholder="搜索投诉人或联系电话"></Input>
                        <input type="button" value="搜索" @click="btns">
                    </div>
		        	<table>
                        <thead>
                            <td>序号</td>
                            <td>申请公司名</td>
                            <td>所属社区</td>
                            <td>申请人</td>
                            <td>审核人</td>
                            <td>申请手机号</td>
                            <td>申请时间</td>
                            <td>状态</td>
                            <td>备注</td>
                        </thead>
                        <tr v-for="(item,index) in Datas">
                            <td>{{index+1}}</td>
                            <td>{{item.companyName}}</td>
                            <td>{{item.communityName}}</td>
                            <td>{{item.userName}}</td>
                            <td>{{item.manangerName}}</td>
                            <td>{{item.userPhone}}</td>
                            <td>{{item.createTime | time}}</td>
                            <td v-if="item.status == 0" style="color:#ff1212;">{{item.status | status}}</td>
							<td v-else-if="item.status == 1" style="color:#1fbba6;">{{item.status | status}}</td>
							<td v-else-if="item.status == 2" style="color:#ff6612;">{{item.status | status}}</td>
                            <td>{{item.remark}}</td>

                        </tr>
                    </table>
                    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size=pageSize layout=" prev, pager, next, total,jumper" :total=totalNum>
					</el-pagination>
		        </div>



			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>

	import '../../sass/style/industry.css';
	import menuBox from '../../components/menuBox.vue';
    import  rightHeader from '../../components/rightHeader.vue';
    import  footerBox from '../../components/footerBox.vue';
    import axios from 'axios';
    import { hostCompanyb,imgPath } from '../api.js';
    import qs from 'qs';

    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
				activeTabName:"industry",
    			communityId:null,
                currentPage:1,
                totalNum:0,
    			Datas:null,
    			site:null,
    			contart:[],
    			Name:null,
    			imgPath:'',
                pageSize:8,
    			mv:[],
				vague:'',
				pageNum:'1'
    		}
    	},
    	mounted(){
            this.datas();
            this.imgPath = imgPath;
    	},
    	methods:{
            datas(){
				let param = new FormData(); //创建form对象
				if(this.vague != ''){
					param.append('keyWord',this.vague);
				}
				param.append('pageNum',this.pageNum);
				param.append('pageSize',this.pageSize);

                axios.post(hostCompanyb,param).then((res)=>{
                    console.log(res);
                    if(res.status == 200 && res.data.code == 10000){
                        this.Datas = res.data.result.companyList;
						this.totalNum = res.data.result.totalNum;
                        //console.log(this.totalNum);
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            },
            handleCurrentChange(val) {
				this.pageNum = val;
				this.datas();
			},
			btns(){
				this.datas();
			}
    	},
    	filters:{
			time(val){
				return new Date(val).Format('yyyy-MM-dd');
			},
			status(val){
				if(val == 0){
					return '待审核'
				}
				else if(val == 1){
					return '审核通过'
				}
				else if(val == 2){
					return '审核不通过'
				}
			}
    	},
    	computed:{
    		
    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  .form-search {
			position: relative;
			margin-top: 20px;
			margin-bottom: 20px;
			margin-left: 50px;
			display: inline-block;
			.ivu-input-wrapper {
				width: auto;
			}
			input[type="text"] {
				width: 208px;
				height: 36px;
				border-radius: 0;
				padding-left: 30px;
			}
			i {
				position: absolute;
				left: 5px;
				top: 7px;
				z-index: 99;
				font-size: 18px;
				color: #999;
			}
			input[type=button] {
				width: 70px;
				text-align: center;
				height: 36px;
				line-height: 36px;
				background-color: #038be2;
				color: #fff;
				border: none;
				position: relative;
				left: -5px;
				top: 2px;
			}
		}
</style>
