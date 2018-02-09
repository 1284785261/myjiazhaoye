<template>
    <div>
        <menu-box></menu-box>
        <div class="right-content" id="right-content">
            <right-header></right-header>
            <div class="wordbench-box">
                <div class="ivu-bar-title">
                    <h3><i class="icon icon-iden"></i>短租订单详情</h3>
                </div>
                <div class="ivu-site">
                    <span>您现在的位置：短租订单管理 ></span>
                    <router-link class="active" to="/shortRent">订单详情</router-link>
                </div>
                <div id="order-detail-wrap">
                    <div class="order-detail-wrap-head">
                        <img v-if="detailData.orderState==2" src="../../../static/images/icon/orderDetail_03.png" alt="订单详情-已支付">
                        <img v-else-if="detailData.orderState==4" src="../../../static/images/icon/orderDetail_02.png" alt="订单详情-已使用">
                        <img v-else-if="detailData.orderState==1" src="../../../static/images/icon/orderDetail_01.png" alt="订单详情-待支付">
                        <img v-else-if="detailData.orderState==3" src="../../../static/images/icon/orderDetail_04.png" alt="订单详情-未使用">
                        <div class="order-detail-wrap-head-content">
                            <h3>
                                <label>短租订单</label>
                                <span v-if="detailData.orderState==2">已支付</span>
                                <span v-else-if="detailData.orderState==4">已使用</span>
                                <span v-else-if="detailData.orderState==1">待支付</span>
                                <span v-else-if="detailData.orderState==3">未使用</span>
                            </h3>
                        </div>
                    </div>

                <ul class="order-detail-content">
                    <li>
                        <h3><i class="icon icon-iden"></i>用户信息</h3>
                        <ul class="userInfo">
                            <li>
                                <span>联系人名称：</span><em>{{detailData.bookName}}</em>
                            </li>
                            <li>
                                <span>联系人手机号：</span><em>{{detailData.bookPhone}}</em>
                            </li>
                            <li class="contactInfoList">
                                <span>入住人名称</span><em>证件类型</em><span>证件号码</span>
                            </li>
                            <li v-for="item in detailData.personnelList">
                                <span>{{item.name}}</span><em>{{item.dataName}}</em><span>{{item.certificateNumber}}</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h3><i class="icon icon-iden"></i>订单信息</h3>
                        <ul class="userInfo">
                            <li>
                                <span>订单编号：</span><em>{{detailData.orderNum}}</em>
                            </li>
                            <li>
                                <span>房号：</span><em v-if="detailData.roomInfoList">{{detailData.roomInfoList[0].roomNum}}</em>
                            </li>
                            <li>
                                <span>房型：</span><em v-if="detailData.roomInfoList">{{detailData.roomInfoList[0].name}}</em>
                            </li>
                            <li>
                                <span>市场细分：</span>
                                <em v-if="detailData.marketType == 0">门市散客</em>
                                <em v-if="detailData.marketType == 1">内部员工</em>
                                <em v-if="detailData.marketType == 2">协议单位</em>
                            </li>
                            <li>
                                <span>门市价：</span><em>¥ 268</em>
                            </li>
                            <li>
                                <span>增值服务收款：</span><em>¥ 180</em>
                            </li>
                            <li>
                                <span>其他收款：</span><em>¥ 300</em>
                            </li>
                            <li>
                                <span>退款金额：</span><em>¥ 200</em>
                            </li>
                            <li>
                                <span>预付金额：</span><em>¥ {{detailData.payMoney}}</em>
                            </li>
                            <li>
                                <span>总消费金额：</span><em>¥ 600</em>
                            </li>
                            <li>
                                <span>入住状态：</span><em>已离店</em>
                            </li>
                            <li>
                                <span>入住时间：</span><em>{{detailData.arriveTime | timefilter('yyyy-MM-dd')}}</em>
                            </li>
                            <li>
                                <span>离店时间：</span><em>{{detailData.leaveTime | timefilter('yyyy-MM-dd')}}</em>
                            </li>
                        </ul>
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
  import qs from 'qs';
  import {CxkjGetOrderDetail300182} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        activeTabName: "shortRent",//右侧导航栏选中状态
        detailData:{
          orderState:4
        },
        orderDatail:{},
        id:"",
      }
    },
    mounted(){
      this.id = this.$route.query.orderId;
      this.getOrderDetail({id:this.id});
    },
    methods:{
      getOrderDetail(params){
        let vm = this;
        this.$http.get(CxkjGetOrderDetail300182,{params:params}).then(res=>{
          if(res.data.code == 10000){
            vm.detailData = res.data.entity;debugger
          }
        })
      },
    },
    filters:{
      timefilter(value,format){
        if(value){
          return new Date(value).Format(format)
        }
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../sass/base/_mixin.scss';
    @import '../../sass/base/_public.scss';
    @import '../../sass/page/orderDetail.scss';


</style>
