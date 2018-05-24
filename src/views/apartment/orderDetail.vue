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
          <h3><i class="icon icon-iden"></i>订单详情</h3>
        </div>
        <div id="order-detail-wrapm">
          <div class="order-detail-wrap-head">
            <img v-if="detailData.orderState==2" src="../../../static/images/icon/orderDetail_03.png" alt="订单详情-已支付">
            <img v-else-if="detailData.orderState==4" src="../../../static/images/icon/orderDetail_02.png" alt="订单详情-已取消">
            <img v-else-if="detailData.orderState==1" src="../../../static/images/icon/orderDetail_01.png" alt="订单详情-待支付">
            <img v-else-if="detailData.orderState==3" src="../../../static/images/icon/orderDetail_04.png" alt="订单详情-已使用">
            <div class="order-detail-wrap-head-content">
              <h3>
                <label v-if="detailType==1">工位订单</label>
                <label v-if="detailType==0">会议室订单</label>
                <span v-if="detailData.orderState==1">待支付</span>
                <span v-else-if="detailData.orderState==2">已支付</span>
                <span v-else-if="detailData.orderState==3">已使用</span>
                <span v-else-if="detailData.orderState==4">已取消</span>
              </h3>
            </div>
            <div v-if="detailData.orderState==2" class="order-detail-wrap-head-btn" @click="useOrder">
              确认用户已使用
            </div>
          </div>
          <ul class="order-detail-content">
            <li>
              <h3><i class="icon icon-iden"></i>{{detailData.communityName}}</h3>
              <table>
                <tr v-if="detailType==1">
                  <td>工位 :</td>
                  <td>{{detailData.count}}个</td>
                </tr>
                <tr v-if="detailType==0">
                  <td>会议室 :</td>
                  <td>{{detailData.meetingPersonNum}}人间</td>
                </tr>

                <tr v-if="detailData.orderState != 3 && detailType==1">
                  <td>使用时间 :</td>
                  <td v-for="(item,index) in detailData.orderDateList">{{item.beginDate | timefilter("yyyy.MM.dd")}}-{{item.endDate | timefilter("yyyy.MM.dd")}}</td>
                </tr>
                <tr v-if="detailType==0">
                  <td>预定时间 :</td>
                  <td>{{detailData.meetingTimes}}小时</td>
                </tr>

                <tr v-if="detailType==1">
                  <td>价格 :</td>
                  <td>{{detailData.placeRent}}元/位·天</td>
                </tr>
                <tr v-if="detailType==0">
                  <td>价格 :</td>
                  <td>{{detailData.meetingRent}}元/小时</td>
                </tr>
                <tr>
                  <td>小计 :</td>
                  <td v-if="detailType==1" style="color: red">{{detailData.rentSubtotal || detailData.count*detailData.placeRent}}元</td>
                  <td v-if="detailType==0" style="color: red">{{detailData.meetingTimes*detailData.meetingRent}}元</td>
                </tr>
              </table>
            </li>
            <li v-if="detailData.suitList  && detailData.suitList.length>0">
              <h3><i class="icon icon-iden"></i>已选套餐</h3>
              <table>
                <tr v-for="suit in detailData.suitList">
                  <td>{{suit.suitName}} :</td>
                  <td>{{suit.totalMoney}}元</td>
                </tr>
                <tr>
                  <td>合计 :</td>
                  <td style="color: red;">{{suitTotalMoney}}元</td>
                </tr>
              </table>
            </li>
            <li>
              <h3><i class="icon icon-iden"></i>联系人信息</h3>
              <table>
                <tr>
                  <td>姓名 :</td>
                  <td>{{detailData.userName}}</td>
                </tr>
                <tr>
                  <td>联系电话 :</td>
                  <td>{{detailData.userPhone}}</td>
                </tr>
              </table>
            </li>
            <li v-if="detailData.orderState == 3 && detailData.content">
              <h3><i class="icon icon-iden"></i>用户评价</h3>
              <table>
                <tr>
                  <td>评价 :</td>
                  <td>
                    <el-rate
                      v-model="detailData.score"
                      disabled
                      show-text
                      text-color="#ff9900"
                      text-template="{value}">
                    </el-rate>
                  </td>
                </tr>
                <tr>
                  <td>评价内容 :</td>
                  <td>{{detailData.content}}</td>
                </tr>
              </table>
            </li>
            <li>
              <h3><i class="icon icon-iden"></i>订单信息</h3>
              <table>
                <tr>
                  <td>订单时间 :</td>
                  <td>{{detailData.createTime | timefilter("yyyy-MM-dd hh:mm:ss") }}</td>
                </tr>
                <tr>
                  <td>订单编号 :</td>
                  <td>{{detailData.officeOrderNum}}</td>
                </tr>
                <tr v-if="detailData.orderState != 1">
                  <td>支付时间 :</td>
                  <td>{{detailData.paySuccessTime | timefilter("yyyy-MM-dd hh:mm:ss") }}</td>
                </tr>
                <tr v-if="detailData.orderState != 1">
                  <td>支付方式 :
                  </td>
                  <td>
                    <span v-if="detailData.payType == 1">支付宝</span>
                    <span v-else-if="detailData.payType == 2">微信</span>
                    <span v-else-if="detailData.payType == 3">银联</span>
                    <span v-else-if="detailData.payType == 4">其他方式</span>
                  </td>
                </tr>
      
                <tr v-if="detailData.orderState != 1">
                  <td>实付 :</td>
                  <td style="color: red;font-size: 20px;">{{detailData.payMoney}}元</td>
                </tr>
                
                <tr>
                  <td>给管家的留言 :</td>
                  <td>{{detailData.message}}</td>
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
  import {officeDetail,placeDetail,officeOrderUsed} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        activeTabName:"orderManagement",
        detailType:0,
        officeOrderId:0,
        detailData:{}
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      init(){
        this.detailType = this.$route.query.type;
        this.officeOrderId = this.$route.query.id;
        if(this.detailType == 0){
          this.getOfficeDetail({officeOrderId:this.officeOrderId})
        }else{
          this.getPlaceDetail({officeOrderId:this.officeOrderId})
        }

      },
      getOfficeDetail(data){
        var that = this;
        this.$http.get(officeDetail,{params:data})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.detailData = res.data.entity;
            }
            // console.log(that.detailData)
          })
      },
      getPlaceDetail(data){
        var that = this;
        this.$http.get(placeDetail,{params:data})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.detailData = res.data.entity;
            }
            // console.log(that.detailData)
          })
      },
      useOrder(){
        var that = this;
        this.$http.get(officeOrderUsed,{params:{officeOrderId:this.officeOrderId}})
          .then(function(res){
            that.init();
          })

      }
    },
    filters:{
      timefilter(value,format){
        if(value){
          return new Date(value).Format(format);
        }
      }
    },
    computed:{
      suitTotalMoney:function(){
        if(this.detailData.suitList && this.detailData.suitList.length>0){
            var count = 0;
            for(var i =0;i<this.detailData.suitList.length;i++){
                count += this.detailData.suitList[i].totalMoney;
            }
            return count;
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  @import '../../sass/page/orderDetail.scss';



</style>
