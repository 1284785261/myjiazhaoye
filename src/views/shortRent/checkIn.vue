<template>
  <div>
    <menu-box :active-tab-name="activeTabName"></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">订单详情</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>添加入住信息</h3>
        </div>
        <div id="order-detail-wrap">
          <ul class="order-detail-content">
            <li class="ul-item">
              <h3><i class="icon icon-iden"></i>房间信息</h3>
              <table>
                <tr>
                  <td>格局 :</td>
                  <td></td>
                </tr>
                <tr>
                  <td>面积 :</td>
                  <td></td>
                </tr>
                <tr>
                  <td>定房电话 :</td>
                  <td></td>
                </tr>
                <tr>
                  <td>订房姓名 :</td>
                  <td></td>
                </tr>
                <tr>
                  <td>门市价 :</td>
                  <td></td>
                </tr>
              </table>
            </li>
            <li class="ul-item">
              <h3><i class="icon icon-iden"></i>入住信息</h3>
              <table>
                <tr>
                  <td>入住时间:</td>
                  <td></td>
                </tr>
                <tr>
                  <td>入住天数:</td>
                  <td></td>
                </tr>
                <tr>
                  <td>预计退房日期:</td>
                  <td></td>
                </tr>
                <tr>
                  <td>市场细分:</td>
                  <td></td>
                </tr>
                <tr>
                  <td>备注:</td>
                  <td></td>
                </tr>
              </table>
            </li>
            <li class="ul-item">
              <h3><i class="icon icon-iden"></i>入住人信息</h3>
              <table>
                <tr>
                  <td>
                    <ul>
                      <li>
                        <span>房号：101 标准大单间 </span>
                        <span>入住人：</span>
                        姓名：<input class="ivu-input " style="width:80px;" v-model="name">
                        <el-radio class="radio" v-model="radio" label="1">男</el-radio>
                        <el-radio class="radio" v-model="radio" label="2">女</el-radio>
                        <Select v-model="stationCommunity" style="width:120px;">
                          <Option v-for="community in  stationSelectList" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                        </Select>
                        <input class="ivu-input" style="width:250px;">
                        <Button type="primary" style="display: inline-block">+ 添加入住人</Button>
                      </li>
                    </ul>
                  </td>
                </tr>
              </table>
            </li>

          </ul>
        </div>
      </div>
      <footer-box></footer-box>
    </div>
  </div>
</template>

<script>
  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import {CxkjGetInRoomInfo300198} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        radio:"1",
        orderId:null,
        roomInfoData:{},
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      init(){
        this.orderId = this.$route.query.orderId;
        this.getRoomInfo();
      },
      getRoomInfo(){
        var that = this;
        this.$http.get(CxkjGetInRoomInfo300198,{params:{id:this.orderId}})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.roomInfoData = res.data.entity;debugger
            }

          })
      },
    },
    filters:{
      timefilter(value,format){
        if(value){
          return new Date(value).Format(format);
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #order-detail-wrap {
    padding-bottom: 50px;
    width: 100%;
    height: 100%;
    min-height: 1000px;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .order-detail-content{
      padding: 30px 50px;
      height: 100%;
      .ul-item{
        border-bottom:1px dashed #ccc;
        margin-top: 30px;
      }
      .ul-item:last-child{
        border-bottom: none;
      }
    }
    .order-detail-content{
      h3{
        display: inline-block;
        color: rgb(3,139,226);
        i{
          margin-right: 10px;
          background:url("/static/images/icon/iden.png") no-repeat;
          background-size: 80%;
          width: 6px;
          height: 24px;
        }
      }
      table{
        tr>td:nth-child(1){
          text-align: right;
        }
        tr{
          td{
            text-align: left;
            padding: 10px;
          }
        }
      }
    }
    .userInfo{
      margin: 0;
      height: 100%;
      li{
        border-bottom:0;
        margin-top: 10px;
        span{
          display: inline-block;
          min-width: 110px;
        }
        em{
          display: inline-block;
          min-width: 110px;
        }
      }
      li:last-child{
        border-bottom: none;
        margin-bottom: 30px;
      }
      .contactInfoList{
        color: #000;
      }
    }
  }



</style>
