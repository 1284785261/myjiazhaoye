<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="main-home">
          <div class="home-item">
            <h3>张之如<span>管家</span></h3>
            <Select v-model="selectModel1" style="width:240px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <ul class="list-data">
            <li v-for="data in datas" :class="data.classD">
              <span class="title">{{data.title}}</span>
              <span class="num"><em>￥</em>{{data.num}}</span>
            </li>
          </ul>
        </div>
        <Row>
          <Col span="12">
          <div class="modular-box">
            <h3><i class="icon icon-info"></i>我的消息</h3>
            <ul class="info-list">
              <li v-for="myInfo in myInfos"> <span class="infoState"><i :class="myInfo.icon"></i>{{myInfo.state}}</span><router-link to="/">{{myInfo.content}}</router-link><span class="date">{{myInfo.date}}</span></li>
            </ul>
          </div>
          </Col>
          <Col span="12">
          <div class="modular-box">
            <h3><i class="icon icon-info"></i>公寓管理</h3>
            <ul class="apartment-list">
              <li><router-link to="/">看房预约</router-link></li>
              <li><router-link to="/signed/lodgingHouse">公寓签约</router-link></li>
              <li><router-link to="/signed/houseState">公寓状态</router-link></li>
              <li><router-link to="/">直播管理</router-link></li>
              <li><router-link to="/">公寓租金账单</router-link></li>
              <li><router-link to="/">公寓水电订单</router-link></li>
              <li><router-link to="/">用户报修</router-link></li>
              <li><router-link to="/">合同管理</router-link></li>
              <li><router-link to="/">退租管理</router-link></li>
              <li><router-link to="/">发起退款</router-link></li>
              <li><router-link to="/">发起收款</router-link></li>
              <li><router-link to="/">用户投诉</router-link></li>
            </ul>
          </div>
          </Col >
        </Row>

        <Row>
          <Col span="12">
          <div class="modular-box">
            <h3><i class="icon icon-info"></i>今日待办</h3>
            <ul class="remain-list">
              <li v-for="remain in remains"><router-link to="/">{{remain.content}}<span>{{remain.item.item1}}<span>{{remain.item.item2}}</span></span></router-link><i class="iconfont icon-you"></i></li>
            </ul>
          </div>
          </Col>
          <Col span="12">
          <div class="modular-box" style="height: 447px;">
            <h3><i class="icon icon-info"></i>联合办公管理</h3>
            <ul class="apartment-list">
              <li><router-link to="/">看房预约</router-link></li>
              <li><router-link to="/signed/lodgingwork">联合办公签约</router-link></li>
              <li><router-link to="/signed/workState">办公空间状态</router-link></li>
              <li><router-link to="/">直播管理</router-link></li>
              <li><router-link to="/">办公租金账单</router-link></li>
              <li><router-link to="/">办公订单</router-link></li>
              <li><router-link to="/">用户报修</router-link></li>
              <li><router-link to="/">合同管理</router-link></li>
              <li><router-link to="/">退租管理</router-link></li>
              <li><router-link to="/">发起退款</router-link></li>
              <li><router-link to="/">发起收款</router-link></li>
              <li><router-link to="/">用户投诉</router-link></li>
            </ul>
          </div>
          </Col >
        </Row>
      </div>
      <footer-box></footer-box>
    </div>
  </div>
</template>

<script>
  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';

export default {
  components:{
    rightHeader,
    menuBox,
    footerBox
  },
  data () {
    return {
      item2:true,
      cityList: [
        {
          value: 'jiazhaoye',
          label: '佳兆业航运WEWA空间'
        },
        {
          value: 'jiazhaoye1',
          label: '佳兆业航运WEWA空间1'
        },
        {
          value: 'jiazhaoye2',
          label: '佳兆业航运WEWA空间2'
        },
        {
          value: 'jiazhaoye3',
          label: '佳兆业航运WEWA空间3'
        }],
      model1: '123',
      datas:[{
          classD:"backOrange",
          title:"昨日收款",
          num:"273079.00"
      },{
        classD:"backGreen",
        title:"待收账单",
        num:"73079.00"
      },{
        classD:"backBlue",
        title:"昨日业绩",
        num:"30笔"
      }],
      myInfos:[{
        icon:"iconfont icon-baoxiu",
        state:"用户报修",
        content:"公寓 802 租客申请报修，请及时跟进",
        date:"17:30"
      },{
        icon:"iconfont icon-xiaoxi1",
        state:"系统消息",
        content:"佳兆业航运WEWA空间年中用户回馈活动的通知",
        date:"17:30"
      },{
        icon:"iconfont icon-xiaoxi1",
        state:"系统消息",
        content:"佳兆业航运WEWA空间年中用户回馈活动的通知",
        date:"17:30"
      },{
        icon:"iconfont icon-xiaoxi1",
        state:"系统消息",
        content:"佳兆业航运WEWA空间年中用户回馈活动的通知",
        date:"17:30"
      },{
        icon:"iconfont icon-xiaoxi1",
        state:"系统消息",
        content:"佳兆业航运WEWA空间年中用户回馈活动的通知",
        date:"17:30"
      }],
      
      remains:[{
        content:"新增看房预约",
        item:{
          item1:"20人"
        }
      },{
        content:"待收公寓租金",
        item:{
          item1:"17笔",
          item2:"33445.00元"
        }
      },{
        content:"待收联合办公租金",
        item:{
          item1:"17笔",
          item2:"33445.00元"
        }
      },{
        content:"待收水电账单",
        item:{
          item1:"17笔",
          item2:"33445.00元"
        }
      },{
        content:"用户报修",
       item:{
         item1:"20人"
       }
      },{
        content:"用户退房",
        item:{
            item1:"20人"
        }
      },{
        content:"合同将到期",
        item:{
            item1:"20户"
        }
      },{
        content:"今日直播时间",
        item:{
            item1:"18:00-19:00"
        }
      },{
        content:"待处理用户投诉",
        item:{
            item1:"6人"
        }
      }]
    }
  }
}
</script>



<style lang="scss" rel="stylesheet/scss" >
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/page/_workbench.scss';

  .ivu-row{
    margin: 20px -10px 0;
    overflow: hidden;
    .ivu-col-span-12{
      padding: 0 10px;
    }
  }
</style>
