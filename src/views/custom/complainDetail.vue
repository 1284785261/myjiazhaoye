<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">投诉详情</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>投诉详情</h3>
        </div>
        <div id="complain-detail-wrap">
          <div class="order-detail-wrap-head">
            <img  src="../../../static/images/icon/custom_yihuifang.png" alt="投诉详情-已回访">
            <!--<img  src="../../../static/images/icon/custom_chulizhong.png" alt="投诉详情-已回访">-->
            <!--<img  src="../../../static/images/icon/custom_huifang.png" alt="投诉详情-已回访">-->
            <div class="order-detail-wrap-head-content">
              <h3>
                <span style="padding-right: 10px;">工号:23165468954623156</span>
                <span class="colorSpan" style="color: #96a5af;">已回访</span>
                <!--<span class="colorSpan" style="color: #FF6612;">待回访</span>-->
                <!--<span class="colorSpan" style="color: #3dc4b2;">客服处理中</span>-->
              </h3>
              <p>发起投诉时间:2017-07-07 14:30</p>
            </div>
          </div>
          <ul class="order-detail-content">
            <li style="position: relative">
              <h3><i class="icon icon-iden"></i>用户信息</h3>
              <table >
                <tr>
                  <td>姓名 :</td>
                  <td >叶晓琳</td>
                </tr>
                <tr>
                  <td>已注册手机 :</td>
                  <td>13570762623</td>
                </tr>
                <tr>
                  <td><b>事情经过 :</b></td>
                  <td><p>sfdgsdfgsdgsdfgsdgdfsgfff</p></td>
                </tr>
              </table>
            </li>
            <li>
              <h3><i class="icon icon-iden"></i>处理记录</h3>
              <table>
                <tr>
                  <td>店长确认接受 :</td>
                  <td>2017-09-20 17:50</td>
                </tr>
              </table>
            </li>
            <li>
              <table>
                <tr>
                  <td>店长完成处理 :</td>
                  <td>2017-09-20 17:50</td>
                </tr>
                <tr>
                  <td><b>处理结果 :</b></td>
                  <td>确认处理完毕</td>
                </tr>
                <tr>
                  <td><b>反馈 :</b></td>
                  <td>满意</td>
                </tr>
                <tr>
                  <td></td>
                  <td>用户满意内容满意满意满意满意满意满意满意满意满意</td>
                </tr>
              </table>
            </li>
            <li>
              <table>
                <tr>
                  <td>客服回访 :</td>
                  <td>2017-09-20 17:50</td>
                </tr>
                <tr>
                  <td><b>回访反馈 :</b></td>
                  <td>确认处理完毕</td>
                </tr>
              </table>
            </li>
            <li>
              <table>
                <tr>
                  <td style="position: relative;top: -60px"><b>客服介入处理 :</b></td>
                  <td><textarea name="remarks" style="width:400px;height: 140px;padding: 5px;" placeholder="请填写处理结果" ></textarea></td>
                </tr>
                <tr>
                  <td></td>
                  <td><Button type="primary" style="width: 120px;" @click="test()">确认回访</Button></td>
                </tr>
              </table>
            </li>
          </ul>
        </div>
        <success-modal :success-message="successMessage" v-if="true"></success-modal>
        <warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="testModal"></warning-modal>
      </div>
      <footer-box></footer-box>
    </div>
  </div>
</template>

<script>
  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import  successModal from '../../components/successModal.vue';
  import  warningModal from '../../components/warningModal.vue';
  import {roomBillDetail,officeBillDetail} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox,
      successModal,
      warningModal
    },
    data(){
      return{
        warningMessage:"厉害了!",
        successMessage:"成功了",
        testModal:false,
      }
    },
    mounted(){

    },
    methods:{
      test(){
        this.testModal = true;
      },
      closeWarningModal(){
        this.testModal = false;
      }
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


  #complain-detail-wrap {
    padding-bottom: 50px;
    width: 100%;
    min-height: 1000px;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .order-detail-wrap-head{
      position: relative;
      height: 160px;
      width: 100%;
      background-color: rgb(247,251,255);
      border-bottom: 1px solid rgb(220,220,220);
      img{
        margin:25px 45px
      }
      .order-detail-wrap-head-content{
        height: 100%;
        display: inline-block;
        h3{
          span.colorSpan{
            padding-left: 150px;
          }
        }
        p{
          position: relative;
          top: 10px;
        }
      }
    }

    ul{
      margin: 40px 50px;
      height: 100%;
      li{
        border-bottom:1px dashed #ccc;
        margin-top: 30px;
      }
      li:last-child{
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
            padding: 10px;
          }
          td:first-child{
            width:115px;
          }
          td.payInfo{
            text-align: left;
            padding-left: 40px;
            color: red;
          }
        }
      }
    }
  }
</style>
