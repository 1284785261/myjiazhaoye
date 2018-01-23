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
                                <span>联系人名称：</span><em>李杨</em>
                            </li>
                            <li>
                                <span>联系人手机号：</span><em>13652141521</em>
                            </li>
                            <li class="contactInfoList">
                                <span>入住人名称</span><em>证件类型</em><span>证件号码</span>
                            </li>
                            <li>
                                <span>李杨</span><em>身份证</em><span>4212221331155510</span>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <h3><i class="icon icon-iden"></i>订单信息</h3>
                        <ul class="userInfo">
                            <li>
                                <span>订单编号：</span><em>D123456</em>
                            </li>
                            <li>
                                <span>房号：</span><em>1003</em>
                            </li>
                            <li>
                                <span>房型：</span><em>标准大单间</em>
                            </li>
                            <li>
                                <span>市场细分：</span><em>APP用户</em>
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
                                <span>预付金额：</span><em>¥ 500</em>
                            </li>
                            <li>
                                <span>总消费金额：</span><em>¥ 600</em>
                            </li>
                            <li>
                                <span>入住状态：</span><em>已离店</em>
                            </li>
                            <li>
                                <span>入住时间：</span><em>2018.1.23</em>
                            </li>
                            <li>
                                <span>离店时间：</span><em>2018.1.25</em>
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
  import {} from '../api.js';


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
        }
      }
    },
    mounted(){

    },
    methods:{

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../sass/base/_mixin.scss';
    @import '../../sass/base/_public.scss';
    @import '../../sass/page/orderDetail.scss';


</style>
