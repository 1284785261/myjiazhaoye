
<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">社区管理</router-link>
        </div>
        <Tabs type="card">

          <Tab-pane label="社区管理">
          	<div class="message-ti">
	            <div class="form-search-criteria">
	                <div class="form-item">
	
	                  	<router-link to="/apartment/communityComplie" class="add"><span>+</span>添加社区</router-link>
	
	                </div>
	               <div class="form-item">
	                 <span>开业日期：</span>
	                 <Date-picker type="date" placeholder="选择日期"></Date-picker>
	                 <span class="inline-block spanBar">-</span>
	                 <Date-picker type="date" placeholder="选择日期"></Date-picker>
	               </div>
	               <div class="form-item">
	                 <div class="form-search">
	                   <i class="iconfont icon-sousuo"></i>
	                   <Input v-model="value" placeholder="搜索联系人或联系电话"></Input>
	                   <input type="button" value="搜索">
	                 </div>
	               </div>
	            </div>
	            <table class="table ivu-table">
	                <tr>
	                  <th width="50px;">序号</th>
	                  <th>社区信息</th>
	                  <th width="140px;">资源概况</th>
	                  <th>人员配备</th>
	                  <th>社区设置</th>
	                  <th width="175px;">操作</th>
	                </tr>
	                <tr v-for="item in commint">
	                  <td>1</td>
	                  <td>
	                    <dl>
	                      <dt>{{item.communityName}}</dt>
	                      <dd>社区类型：<span> {{item.communityType | Form(item.communityType)}}</span></dd>
	                      <dd>开业日期：<span> {{item.communityOpeningDate | imata(item.communityOpeningDate)}}</span></dd>
	                      <dd>物业合同截止：<span> 2027年6月27日</span></dd>
	                      <dd>地址：<span> {{item.communityAddress}}</span></dd>
	                    </dl>
	                  </td>
	                  <td>
	                    <dl>
	                      <dd>公寓：<span>100套</span></dd>
	                      <dd>工位：<span> 100套</span></dd>
	                      <dd>办公室：<span> 100间</span></dd>
	                      <dd>会议室：<span> 15间</span></dd>
	                    </dl>
	                  </td>
	                  <td>
	                    <dl>
	                      <dd>店长：<span> <!--{{item.shopkeeper.userName}}--></span></dd>
	                      <dd>店长联系电话：<span> <!--{{item.shopkeeper.userPhone}}--></span></dd>
	                      <dd>社区服务电话：<span> {{item.communityPhone}}</span></dd>
	                      <dd>员工：<span> 30人</span></dd>
	                    </dl>
	                  </td>
	                  <td>
	                    <dl>
	                      <dd>付款方式：<span>  押二付一 ，押一付一</span></dd>
	                      <dd>服务费：<span>  {{item.serviceCost.toFixed(2)}}元/月</span></dd>
	                      <dd>会议室套餐：<span>  {{item.meetingSuit | Fors(item.meetingSuit)}}</span></dd>
	                      <dd>维修项：<span> {{item.maintain | Fors(item.maintain)}}</span></dd>
	                    </dl>
	                  </td>
	                  <td>
	                    <router-link to="/apartment/communityMessage">基本信息</router-link>
	                    <router-link to="/apartment/communityPresentation">社区介绍</router-link>
	                    <router-link to="/communityHouse">资源管理</router-link>
	                    <router-link to="/apartment/communitySettings">社区设置</router-link>
	                    <a href="javascript:;">设备管理</a>
	                    <a href="javascript:;" @click="hub()">关闭社区</a>
	                  </td>
	                </tr>
	             
	            </table>
	            <Page :total="100" show-elevator></Page>
	          </div>
          </Tab-pane>

          <Tab-pane label="已关闭的社区">
          	<div class="message-ti">
            <div class="form-search-criteria">
              <div class="form-item">
                <b>社区：</b>
                <Select v-model="model1" style="width:200px">
                  <Option v-for="community in  communitys" :value="community.value" :key="community.value">{{ community.label }}</Option>
                </Select>
              </div>
              <div class="form-item">
                <span>开业日期：</span>
                <Date-picker type="date" placeholder="选择日期"></Date-picker>
                <span class="inline-block spanBar">-</span>
                <Date-picker type="date" placeholder="选择日期"></Date-picker>
              </div>
              <div class="form-item">
                <div class="form-search">
                  <i class="iconfont icon-sousuo"></i>
                  <Input v-model="value" placeholder="搜索联系人或联系电话"></Input>
                  <input type="button" value="搜索">
                </div>
              </div>
            </div>
            <table class="table ivu-table">
              <tr>
                <th width="50px;">序号</th>
                <th>社区信息</th>
                <th width="140px;">资源概况</th>
                <th>人员配备</th>
                <th>社区设置</th>
                <th width="175px;">操作</th>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  <dl>
                    <dt>佳兆业航运WEWA空间</dt>
                    <dd>社区类型：<span> 公寓+办公室</span></dd>
                    <dd>开业日期：<span> 2017年6月27日</span></dd>
                    <dd>物业合同截止：<span> 2027年6月27日</span></dd>
                    <dd>地址：<span> 广东省深圳市罗湖区嘉宾路4025号航运综合楼</span></dd>
                  </dl>
                </td>
                <td>
                  <dl>
                    <dd>公寓：<span>100套</span></dd>
                    <dd>工位：<span> 100套</span></dd>
                    <dd>办公室：<span> 100间</span></dd>
                    <dd>会议室：<span> 15间</span></dd>
                  </dl>
                </td>
                <td>
                  <dl>
                    <dd>店长：<span> 张明辉</span></dd>
                    <dd>店长联系电话：<span> 15812345678</span></dd>
                    <dd>社区服务电话：<span> 15858585858</span></dd>
                    <dd>员工：<span> 30人</span></dd>
                  </dl>
                </td>
                <td>
                  <dl>
                    <dd>付款方式：<span>  押二付一 ，押一付一</span></dd>
                    <dd>服务费：<span>  20.00元/月</span></dd>
                    <dd>会议室套餐：<span>  已设置</span></dd>
                    <dd>维修项：<span> 已设置</span></dd>
                  </dl>
                </td>
                <td>
                  <a href="javascript:;">基本信息</a>
                  <router-link to="/apartment/communityPresentation">社区介绍</router-link>
                  <router-link to="/communityHouse">资源管理</router-link>
                  <router-link to="/apartment/communitySettings">社区设置</router-link>
                  <a href="javascript:;">设备管理</a>
                	<a href="javascript:;" @click="hub()">关闭社区</a>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <dl>
                    <dt>佳兆业航运WEWA空间</dt>
                    <dd>社区类型：<span> 公寓+办公室</span></dd>
                    <dd>开业日期：<span> 2017年6月27日</span></dd>
                    <dd>物业合同截止：<span> 2027年6月27日</span></dd>
                    <dd>地址：<span> 广东省深圳市罗湖区嘉宾路4025号航运综合楼</span></dd>
                  </dl>
                </td>
                <td>
                  <dl>
                    <dd>公寓：<span>100套</span></dd>
                    <dd>工位：<span> 100套</span></dd>
                    <dd>办公室：<span> 100间</span></dd>
                    <dd>会议室：<span> 15间</span></dd>
                  </dl>
                </td>
                <td>
                  <dl>
                    <dd>店长：<span> 张明辉</span></dd>
                    <dd>店长联系电话：<span> 15812345678</span></dd>
                    <dd>社区服务电话：<span> 15858585858</span></dd>
                    <dd>员工：<span> 30人</span></dd>
                  </dl>
                </td>
                <td>
                  <dl>
                    <dd>付款方式：<span>  押二付一 ，押一付一</span></dd>
                    <dd>服务费：<span>  20.00元/月</span></dd>
                    <dd>会议室套餐：<span>  已设置</span></dd>
                    <dd>维修项：<span> 已设置</span></dd>
                  </dl>
                </td>
                <td>
                  <a href="javascript:;">基本信息</a>
                  <router-link to="/apartment/communityPresentation">社区介绍</router-link>
                  <router-link to="/communityHouse">资源管理</router-link>
                  <router-link to="/apartment/communitySettings">社区设置</router-link>
                  <a href="javascript:;">设备管理</a>
                  <a href="javascript:;" @click="hub()">关闭社区</a>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  <dl>
                    <dt>佳兆业航运WEWA空间</dt>
                    <dd>社区类型：<span> 公寓+办公室</span></dd>
                    <dd>开业日期：<span> 2017年6月27日</span></dd>
                    <dd>物业合同截止：<span> 2027年6月27日</span></dd>
                    <dd>地址：<span> 广东省深圳市罗湖区嘉宾路4025号航运综合楼</span></dd>
                  </dl>
                </td>
                <td>
                  <dl>
                    <dd>公寓：<span>100套</span></dd>
                    <dd>工位：<span> 100套</span></dd>
                    <dd>办公室：<span> 100间</span></dd>
                    <dd>会议室：<span> 15间</span></dd>
                  </dl>
                </td>
                <td>
                  <dl>
                    <dd>店长：<span> 张明辉</span></dd>
                    <dd>店长联系电话：<span> 15812345678</span></dd>
                    <dd>社区服务电话：<span> 15858585858</span></dd>
                    <dd>员工：<span> 30人</span></dd>
                  </dl>
                </td>
                <td>
                  <dl>
                    <dd>付款方式：<span>  押二付一 ，押一付一</span></dd>
                    <dd>服务费：<span>  20.00元/月</span></dd>
                    <dd>会议室套餐：<span>  已设置</span></dd>
                    <dd>维修项：<span> 已设置</span></dd>
                  </dl>
                </td>
                <td>
                  <a href="javascript:;">基本信息</a>
                  <router-link to="/apartment/communityPresentation">社区介绍</router-link>
                  <router-link to="/communityHouse">资源管理</router-link>
                  <router-link to="/apartment/communitySettings">社区设置</router-link>
                  <a href="javascript:;">设备管理</a>
                  <a href="javascript:;" @click="hub()">关闭社区</a>
                </td>
              </tr>
            </table>
            <Page :total="100" show-elevator></Page>
            </div>
          </Tab-pane>

          <Tab-pane label="社区评价">
          	<div class="message-ti">
            <div class="form-search-criteria">
              <div class="form-item">
                <b>社区：</b>
                <Select v-model="model1" style="width:200px">
                  <Option v-for="community in  communitys" :value="community.value" :key="community.value">{{ community.label }}</Option>
                </Select>
              </div>
              <div class="form-item">
                <span>评价时间：</span>
                <Date-picker type="date" placeholder="选择日期"></Date-picker>
                <span class="inline-block spanBar">-</span>
                <Date-picker type="date" placeholder="选择日期"></Date-picker>
              </div>
              <div class="form-item">
                <div class="form-search" style="margin-left: 0;">
                  <i class="iconfont icon-sousuo"></i>
                  <Input v-model="value" placeholder="搜索用户"></Input>
                  <input type="button" value="搜索">
                  <Button class="ivu-btn-export">导出</Button>
                </div>
              </div>
            </div>
            <table class="table ivu-table">
              <tr>
                <th>评价时间</th>
                <th style="text-align: center">社区</th>
                <th style="text-align: center">用户</th>
                <th style="text-align: center">订单/账单</th>
                <th>评价内容</th>
                <th>操作</th>
              </tr>
              <tr v-for="tableEvaluate in tableEvaluates">
                <td><span class="text-default">{{tableEvaluate.date}}</span></td>
                <td style="text-align: center"><span class="text-black">{{tableEvaluate.community}}</span></td>
                <td style="text-align: center"><span class="text-black">{{tableEvaluate.user}}</span></td>
                <td style="text-align: center"><span class="text-default">{{tableEvaluate.order}}</span></td>
                <td><span class="text-black">{{tableEvaluate.evaluate}}</span></td>
                <td><router-link to="/">{{tableEvaluate.operation}}</router-link></td>
              </tr>
            </table>
            <Page :total="100" show-elevator></Page>
            </div>
          </Tab-pane>

        </Tabs>
      </div>
      <footer-box></footer-box>
    </div>
    <div class="lose" v-show="isShow">
    	<span>确认<i>关闭</i>以下社区吗？</span>
    	<p>佳兆业</p>
    	<a @click="qs()">确定</a>
    	<a @click="qb()">取消</a>
    </div>
    <div class="zhezhao"v-show="isShow">
  	
 		</div>
  </div>
  
</template>

<script>


  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import {hostAuthor,hostCommint} from '../api.js';
  import axios from 'axios'
    
export default {
  components:{
    rightHeader,
    menuBox,
    footerBox
  },
  data () {
    return {
      communitys: [
        {
          value: 'beijing',
          label: '北京市'
        },
        {
          value: 'shanghai',
          label: '上海市'
        },
        {
          value: 'shenzhen',
          label: '深圳市'
        },
        {
          value: 'hangzhou',
          label: '杭州市'
        },
        {
          value: 'nanjing',
          label: '南京市'
        },
        {
          value: 'chongqing',
          label: '重庆市'
        }
      ],
      model1: '',
      isShow:false,
      tableEvaluates:[{
          date:"2017-06-27  12:00",
          community:"佳兆业航运WEWA空间",
          user:"叶晓琳",
          order:"公寓租金账单  7月",
          evaluate:"离地铁口近，交通方便，管理员认真负责，周围配套设施齐全",
          operation:"查看详情"
      },{
        date:"2017-06-27  12:00",
        community:"佳兆业航运WEWA空间",
        user:"叶晓琳",
        order:"公寓租金账单  7月",
        evaluate:"离地铁口近，交通方便，管理员认真负责，周围配套设施齐全",
        operation:"查看详情"
      },{
        date:"2017-06-27  12:00",
        community:"佳兆业航运WEWA空间",
        user:"叶晓琳",
        order:"公寓租金账单  7月",
        evaluate:"离地铁口近，交通方便，管理员认真负责，周围配套设施齐全",
        operation:"查看详情"
      },{
        date:"2017-06-27  12:00",
        community:"佳兆业航运WEWA空间",
        user:"叶晓琳",
        order:"公寓租金账单  7月",
        evaluate:"离地铁口近，交通方便，管理员认真负责，周围配套设施齐全",
        operation:"查看详情"
      },{
        date:"2017-06-27  12:00",
        community:"佳兆业航运WEWA空间",
        user:"叶晓琳",
        order:"公寓租金账单  7月",
        evaluate:"离地铁口近，交通方便，管理员认真负责，周围配套设施齐全",
        operation:"查看详情"
      }],
      commint:[]      //社区管理数据展示
      
      }
   },
   filters:{
   		Fors(data){
   			if(data == false){
   				return '未设置';
   			}
   			if(data == true){
   				return '已设置';
   			}
   		},
   		Form(data){
   			if(data == '0,1'){
   				return '公寓+办公室'
   			}
   			if(data == '0'){
   				return '公寓'
   			}
   			if(data == '1'){
   				return '办公室'
   			}
   		},
   		imata(ms){
   			if(ms!=null){
   				var date = new Date(ms);
	   			var Y=date.getFullYear()+'年';
	   			var M=(date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'月';
	   			var D=(date.getDate()<10?'0'+date.getDate():date.getDate())+'日';
	   			return Y+M+D;
   			}
   			return null;
   			
   		}
   },
  methods: {
		hub(){
			this.isShow = !this.isShow;
		},
		qs(){
			this.isShow =false;
		},
		qb(){
			this.isShow =false;
		}
  },
  created(){
  	
//	console.log('hostAuthor')
//	console.log(11)
//	console.log('hostAuthor')
//	console.log(hostAuthor)
//		this.$http.post(hostAuthor)//请求用户个人信息数据
//		.then(function(response){
//			console.log(111)
//			//console.log(sessionStorage.getItem('token'))
//			console.log(response.data);
//		})
//		.catch(function(error){
//			console.log(error);
//		})

		axios.get(hostCommint)  //请求社区管理数据
		.then((response)=>{
			console.log(222)
			//console.log(response);
			this.commint = response.data.result.communityData;
			console.log(this.commint);
		})
		.catch((error)=>{
			console.log(error);
		})
 }
}
</script>



<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  @import '../../sass/page/_communityManagement.scss';
 
  
  .form-item .add{
  	display: inline-block;
  	width: 140px;
  	height: 34px;
  	border-radius: 5px;
  	border: 1px solid #038be2;
  	text-align: center;line-height: 34px;
  	font-size: 12px;
  	font-weight: bold;
  	span{
  		font-size:16px;
  	}
  }
  .zhezhao{
  	width: 100%;
  	height: 100%;
  	position: fixed;
  	top: 0;
  	bottom: 0;
  	left: 0;
  	right: 0;
  	background: #666;
  	opacity: 0.5;
  	z-index: 999;
  }
  .lose{
  	z-index: 1000;
  	position: fixed;
  	top: 50%;
  	left: 50%;
  	width: 280px;
  	height: 180px;
  	border-radius: 10px;
  	background: #fff;
  	transform: translate(-50%,-50%);
  	text-align: center;
  }
  .lose span{
  	display: block;
  	font-size: 12px;
  	margin-top: 42px;
  	margin-bottom: 18px;
  }
  .lose span i{
  	font-style: normal;
  	font-size: 10px;
  	margin: 0 5px;
  	color: #038be2;
  }
  .lose p{
  	font-size: 12px;
  	font-weight: bold;
  	margin-bottom: 35px;
  }
  .lose a{
  	display: inline-block;
  	width: 90px;
  	height: 30px;
  	text-align: center;
  	line-height: 30px;
  	font-size: 12px;
  	border-radius: 5px;
  }
  .lose a:nth-child(3){
  	background: #038be2;
  	color: white;
  	margin-right: 20px;
  }
  .lose a:nth-child(4){
  	background: #f8f8f8;
  	color: #666;
  	border: 1px solid #dcdcdc;
  }
</style>
