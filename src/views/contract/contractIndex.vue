
<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">合同管理</router-link>
        </div>
        <Tabs type="card">

          <Tab-pane label="公寓合同">
          	
	            <div class="form-search-criteria">
	                <div class="form-item">
	                <b>社区：</b>
	                <Select v-model="model1" style="width:200px">
	                  <Option v-for="community in  communitys" :value="community.value" :key="community.value">{{ community.label }}</Option>
	                </Select>
	               </div>
	               <div class="form-item">
	                 <span>签约日期：</span>
	                 <Date-picker type="date" placeholder="选择日期"></Date-picker>
	                 <span class="inline-block spanBar">--</span>
	                 <Date-picker type="date" placeholder="选择日期"></Date-picker>
	               </div>
	               <div class="form-item">
	                 <div class="form-search">
	                   <i class="iconfont icon-sousuo"></i>
	                   <Input v-model="value" placeholder="搜索合同的联系人或联系电话"></Input>
	                   <input type="button" value="搜索">
	                 </div>
	               </div>
	            </div>
	            <table class="table ivu-table">
	                <tr>
	                  <th width="50px;">合同编号</th>
	                  <th>签约日期</th>
	                  <th>所属社区</th>
	                  <th>公寓房间</th>
	                  <th>租期</th>
	                  <th>承租人</th>
	                  <th>租金(元/月)</th>
	                  <th>状态</th>
	                  <th width="175px;">操作</th>
	                </tr>
	                <tr>
	                  <td>SZ1234567890</td>
	                  <td>
	                    2017-02-04
	                  </td>
	                  <td>
	                  	佳兆业航运WEWA空间
	                  </td>
	                  <td>
	                    2层201
	                  </td>
	                  <td>
	                    2017.03.02-2017.05.01
	                  </td>
	                  <td>赵大师</td>
	                  <td>1000.00</td>
	                  <td>待确认</td>
	                  <td>
	                    <router-link to="/apartment/communityMessage">查看详情</router-link>
	                  </td>
	                </tr>
	                <tr>
	                  <td>SZ1234567890</td>
	                  <td>
	                    2017-02-04
	                  </td>
	                  <td>
	                  	佳兆业航运WEWA空间
	                  </td>
	                  <td>
	                    2层201
	                  </td>
	                  <td>
	                    2017.03.02-2017.05.01
	                  </td>
	                  <td>赵大师</td>
	                  <td>1000.00</td>
	                  <td>待确认</td>
	                  <td>
	                    <router-link to="/apartment/communityMessage">查看详情</router-link>
	                  </td>
	                </tr>
	                <tr>
	                  <td>SZ1234567890</td>
	                  <td>
	                    2017-02-04
	                  </td>
	                  <td>
	                  	佳兆业航运WEWA空间
	                  </td>
	                  <td>
	                    2层201
	                  </td>
	                  <td>
	                    2017.03.02-2017.05.01
	                  </td>
	                  <td>赵大师</td>
	                  <td>1000.00</td>
	                  <td>待确认</td>
	                  <td>
	                    <router-link to="/apartment/communityMessage">查看详情</router-link>
	                  </td>
	                </tr>
	                <tr>
	                  <td>SZ1234567890</td>
	                  <td>
	                    2017-02-04
	                  </td>
	                  <td>
	                  	佳兆业航运WEWA空间
	                  </td>
	                  <td>
	                    2层201
	                  </td>
	                  <td>
	                    2017.03.02-2017.05.01
	                  </td>
	                  <td>赵大师</td>
	                  <td>1000.00</td>
	                  <td>待确认</td>
	                  <td>
	                    <router-link to="/apartment/communityMessage">查看详情</router-link>
	                  </td>
	                </tr>
	                <tr>
	                  <td>SZ1234567890</td>
	                  <td>
	                    2017-02-04
	                  </td>
	                  <td>
	                  	佳兆业航运WEWA空间
	                  </td>
	                  <td>
	                    2层201
	                  </td>
	                  <td>
	                    2017.03.02-2017.05.01
	                  </td>
	                  <td>赵大师</td>
	                  <td>1000.00</td>
	                  <td>待确认</td>
	                  <td>
	                    <router-link to="/apartment/communityMessage">查看详情</router-link>
	                  </td>
	                </tr>
	                <tr>
	                  <td>SZ1234567890</td>
	                  <td>
	                    2017-02-04
	                  </td>
	                  <td>
	                  	佳兆业航运WEWA空间
	                  </td>
	                  <td>
	                    2层201
	                  </td>
	                  <td>
	                    2017.03.02-2017.05.01
	                  </td>
	                  <td>赵大师</td>
	                  <td>1000.00</td>
	                  <td>待确认</td>
	                  <td>
	                    <router-link to="/apartment/communityMessage">查看详情</router-link>
	                  </td>
	                </tr>
	            </table>
	            <Page :total="100" show-elevator></Page>
          	
          </Tab-pane>

          <Tab-pane label="联合办公合同">
            <div class="form-search-criteria">
              <div class="form-item">
                <b>社区：</b>
                <Select v-model="model1" style="width:200px">
                  <Option v-for="community in  communitys" :value="community.value" :key="community.value">{{ community.label }}</Option>
                </Select>
              </div>
              <div class="form-item">
                <span>签约日期：</span>
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
                  <th width="50px;">合同编号</th>
                  <th>签约日期</th>
                  <th>社区        租期</th>
                  <th>办公室</th>
                  <th>公司</th>
                  <th>联系人</th>
                  <th>联系电话</th>
                  <th>租金(元/月)</th>
                  <th>状态</th>
                  <th width="175px;">操作</th>
                </tr>
                <tr>
                  <td>SZ1234567890</td>
                  <td>
                    2017-02-04
                  </td>
                  <td>
                  	<p>佳兆业航运空间</p>
                  	<p>租期：2017.03.02-2017.03.20</p>
                  </td>
                  <td>
                    2层201
                  </td>
                  <td>
                  	深圳市向阳传媒有限公司
                  </td>
                  <td>赵大师</td>
                  <td>1111111111111</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td>
                    <router-link to="/apartment/communityMessage">查看详情</router-link>
                  </td>
                </tr>
                <tr>
                  <td>SZ1234567890</td>
                  <td>
                    2017-02-04
                  </td>
                  <td>
                  	<p>佳兆业航运空间</p>
                  	<p>租期：2017.03.02-2017.03.20</p>
                  </td>
                  <td>
                    2层201
                  </td>
                  <td>
                  	深圳市向阳传媒有限公司
                  </td>
                  <td>赵大师</td>
                  <td>1111111111111</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td>
                    <router-link to="/apartment/communityMessage">查看详情</router-link>
                  </td>
                </tr>
                <tr>
                  <td>SZ1234567890</td>
                  <td>
                    2017-02-04
                  </td>
                  <td>
                  	<p>佳兆业航运空间</p>
                  	<p>租期：2017.03.02-2017.03.20</p>
                  </td>
                  <td>
                    2层201
                  </td>
                  <td>
                  	深圳市向阳传媒有限公司
                  </td>
                  <td>赵大师</td>
                  <td>1111111111111</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td>
                    <router-link to="/apartment/communityMessage">查看详情</router-link>
                  </td>
                </tr>
                <tr>
                  <td>SZ1234567890</td>
                  <td>
                    2017-02-04
                  </td>
                  <td>
                  	<p>佳兆业航运空间</p>
                  	<p>租期：2017.03.02-2017.03.20</p>
                  </td>
                  <td>
                    2层201
                  </td>
                  <td>
                  	深圳市向阳传媒有限公司
                  </td>
                  <td>赵大师</td>
                  <td>1111111111111</td>
                  <td>1000.00</td>
                  <td>待支付</td>
                  <td>
                    <router-link to="/apartment/communityMessage">查看详情</router-link>
                  </td>
                </tr> 
            </table>
            <Page :total="100" show-elevator></Page>
          </Tab-pane>

          <Tab-pane label="物业合同">
            <div class="form-search-criteria">
              <div class="form-item">
                <b>社区：</b>
                <Select v-model="model1" style="width:200px">
                  <Option v-for="community in  communitys" :value="community.value" :key="community.value">{{ community.label }}</Option>
                </Select>
              </div>
              <div class="form-item">
                <span>签约时间：</span>
                <Date-picker type="date" placeholder="选择日期"></Date-picker>
                <span class="inline-block spanBar">--</span>
                <Date-picker type="date" placeholder="选择日期"></Date-picker>
              </div>
              <div class="form-item">
                <div class="form-search" style="margin-left: 0;">
                  <i class="iconfont icon-sousuo"></i>
                  <Input v-model="value" placeholder="搜索用户"></Input>
                  <input type="button" value="搜索">
                  
                </div>
              </div>
            </div>
           <table class="table ivu-table">
                <tr>
                  <th width="50px;">合同编号</th>
                  <th>签约日期</th>
                  <th>所属社区</th>
                  <th>公寓房间</th>
                  <th>租期</th>
                  <th>承租人</th>
                  <th>租金(元/月)</th>
                  <th>状态</th>
                  <th width="175px;">操作</th>
                </tr>
                <tr>
                  <td>SZ1234567890</td>
                  <td>
                    2017-02-04
                  </td>
                  <td>
                  	佳兆业航运WEWA空间
                  </td>
                  <td>
                    2层201
                  </td>
                  <td>
                    2017.03.02-2017.05.01
                  </td>
                  <td>赵大师</td>
                  <td>1000.00</td>
                  <td>待确认</td>
                  <td>
                    <router-link to="/apartment/communityMessage">查看详情</router-link>
                  </td>
                </tr>
                <tr>
                  <td>SZ1234567890</td>
                  <td>
                    2017-02-04
                  </td>
                  <td>
                  	佳兆业航运WEWA空间
                  </td>
                  <td>
                    2层201
                  </td>
                  <td>
                    2017.03.02-2017.05.01
                  </td>
                  <td>赵大师</td>
                  <td>1000.00</td>
                  <td>待确认</td>
                  <td>
                    <router-link to="/apartment/communityMessage">查看详情</router-link>
                  </td>
                </tr>
                <tr>
                  <td>SZ1234567890</td>
                  <td>
                    2017-02-04
                  </td>
                  <td>
                  	佳兆业航运WEWA空间
                  </td>
                  <td>
                    2层201
                  </td>
                  <td>
                    2017.03.02-2017.05.01
                  </td>
                  <td>赵大师</td>
                  <td>1000.00</td>
                  <td>待确认</td>
                  <td>
                    <router-link to="/apartment/communityMessage">查看详情</router-link>
                  </td>
                </tr>
                <tr>
                  <td>SZ1234567890</td>
                  <td>
                    2017-02-04
                  </td>
                  <td>
                  	佳兆业航运WEWA空间
                  </td>
                  <td>
                    2层201
                  </td>
                  <td>
                    2017.03.02-2017.05.01
                  </td>
                  <td>赵大师</td>
                  <td>1000.00</td>
                  <td>待确认</td>
                  <td>
                    <router-link to="/apartment/communityMessage">查看详情</router-link>
                  </td>
                </tr>
                <tr>
                  <td>SZ1234567890</td>
                  <td>
                    2017-02-04
                  </td>
                  <td>
                  	佳兆业航运WEWA空间
                  </td>
                  <td>
                    2层201
                  </td>
                  <td>
                    2017.03.02-2017.05.01
                  </td>
                  <td>赵大师</td>
                  <td>1000.00</td>
                  <td>待确认</td>
                  <td>
                    <router-link to="/apartment/communityMessage">查看详情</router-link>
                  </td>
                </tr>
                <tr>
                  <td>SZ1234567890</td>
                  <td>
                    2017-02-04
                  </td>
                  <td>
                  	佳兆业航运WEWA空间
                  </td>
                  <td>
                    2层201
                  </td>
                  <td>
                    2017.03.02-2017.05.01
                  </td>
                  <td>赵大师</td>
                  <td>1000.00</td>
                  <td>待确认</td>
                  <td>
                    <router-link to="/apartment/communityMessage">查看详情</router-link>
                  </td>
                </tr>
            </table>
            <Page :total="100" show-elevator></Page>
          </Tab-pane>

        </Tabs>
      </div>
      <footer-box></footer-box>
    </div>
    
  </div>
  
</template>

<script>


  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import {hostAuthor,hostCommint} from '../api.js';
    
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
      }]
      
      }
   },
  methods: {
		
  },
  created(){
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
