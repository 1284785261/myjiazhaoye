
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
                    <router-link to="/apartment/communityMessage">基本信息</router-link>
                    <router-link to="/apartment/communityPresentation">社区介绍</router-link>
                    <router-link to="/communityHouse">资源管理</router-link>
                    <router-link to="/apartment/communitySettings">社区设置</router-link>
                    <a href="javascript:;">设备管理</a>
                    <Button @click="closeCommunity = true" >关闭社区</Button>
                    <Modal v-model="closeCommunity" class-name="vertical-center-modal" width="280" :closable="false">
                      <p>确认 <em style="color:#038be2;">关闭</em> 以下社区吗？</p>
                      <p><b>佳兆业航运WEWA空间</b></p>
                    </Modal>
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
                  <Button @click="closeCommunity = true" >关闭社区</Button>
                  <Modal v-model="closeCommunity" class-name="vertical-center-modal" width="280" :closable="false">
                    <p>确认 <em style="color:#038be2;">关闭</em> 以下社区吗？</p>
                    <p><b>佳兆业航运WEWA空间</b></p>
                  </Modal>
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
                  <Button @click="closeCommunity = true" >关闭社区</Button>
                  <Modal v-model="closeCommunity" class-name="vertical-center-modal" width="280" :closable="false">
                    <p>确认 <em style="color:#038be2;">关闭</em> 以下社区吗？</p>
                    <p><b>佳兆业航运WEWA空间</b></p>
                  </Modal>
                </td>
              </tr>
            </table>
            <Page :total="100" show-elevator></Page>
          </Tab-pane>

          <Tab-pane label="已关闭的社区">
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
                  <Button @click="closeCommunity = true" >开发社区</Button>
                  <Modal v-model="closeCommunity" class-name="vertical-center-modal" width="280" :closable="false">
                    <p>确认 <em style="color:#038be2;">关闭</em> 以下社区吗？</p>
                    <p><b>佳兆业航运WEWA空间</b></p>
                  </Modal>
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
                  <Button @click="closeCommunity = true" >开发社区</Button>
                  <Modal v-model="closeCommunity" class-name="vertical-center-modal" width="280" :closable="false">
                    <p>确认 <em style="color:#038be2;">关闭</em> 以下社区吗？</p>
                    <p><b>佳兆业航运WEWA空间</b></p>
                  </Modal>
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
                  <Button @click="closeCommunity = true" >开发社区</Button>
                  <Modal v-model="closeCommunity" class-name="vertical-center-modal" width="280" :closable="false">
                    <p>确认 <em style="color:#038be2;">关闭</em> 以下社区吗？</p>
                    <p><b>佳兆业航运WEWA空间</b></p>
                  </Modal>
                </td>
              </tr>
            </table>
            <Page :total="100" show-elevator></Page>
          </Tab-pane>

          <Tab-pane label="社区评价">
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
  import {hostCommint} from '../api.js';
    
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
      closeCommunity:false,
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
  	console.log('hostAuthor')
  	console.log(hostCommint)
  	console.log('hostAuthor')
//		this.$http.post(hostAuthor)//请求用户个人信息数据
//		.then(function(response){
//			console.log(response);
//		})
//		.catch(function(error){
//			console.log(error);
//		})

		this.$http.post(hostCommint)  //请求社区管理数据
		.then(function(response){
			console.log(response);
		})
		.catch(function(error){
			console.log(error);
		})
 }
}
</script>



<style lang="scss" rel="stylesheet/scss" >
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  @import '../../sass/page/_communityManagement.scss';
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal{
      top: 0;
    }
  }
  
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
  
</style>
