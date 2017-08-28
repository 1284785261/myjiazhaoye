<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">会员信息</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>会员信息</h3>
        </div>
        <div id="member-information-wrap">
          <div class="memeber-conten-wrap">
            <ul class="member-information-content">
              <li class="member-content-first-li">
                <h3><i class="icon icon-iden"></i>个人信息</h3>
                <div class="member-img-content">
                  <div class="member-img">
                    <img src="" alt="">
                  </div>
                  <table class="member-information-table">
                    <tr>
                      <td><span>会员名称 :</span><span style="font-weight: 700">不死鸟</span></td>
                      <td><span>会员性别 :</span><span>男</span></td>
                    </tr>
                    <tr>
                      <td><span>会员手机 :</span><span>13801380138</span></td>
                      <td><span>会员年龄 :</span><span>24岁</span></td>
                    </tr>
                    <tr>
                      <td><span>会员邮箱 :</span><span>138013801@163.com</span></td>
                      <td><span>会员身份证 :</span><span>440881199305143568</span></td>
                    </tr>
                  </table>
                </div>
              </li>
              <li v-if="true">
                <h3><i class="icon icon-iden"></i>个人记录</h3>
                <ul class="time-step-list">
                  <li>
                    <span class="step-icon"></span>
                    <span class="step-time">2016-05-30</span>
                    <span class="step-content">入住19号小区24栋6楼6号</span>
                    <div class="time-line"></div>
                  </li>
                  <li>
                    <span class="step-icon"></span>
                    <span class="step-time">2017-05-30</span>
                    <span class="step-content">合同期满，退房</span>
                    <div class="time-line"></div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
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
  import api from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        value5: 4.8
      }
    },
    methods:{

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';


  #member-information-wrap {
    padding-bottom: 50px;
    width: 100%;
    min-height: 1000px;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .memeber-conten-wrap{
      padding: 40px 50px;
      .member-information-content{
        /*margin: 40px 50px;*/
        height: 100%;
        .member-content-first-li{
          border-bottom:1px dashed #ccc;
          /*margin-top: 30px;*/
        }
        li:after{
          content: "";
          clear: both;
          display: block;
        }
        li:last-child{
          border-bottom: none;
        }
      }
      .member-information-content{
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
        .member-img-content{
          .member-img{
            float: left;
            width: 140px;
            height: 160px;
            padding: 30px 20px;
            img{
              border-radius: 10px;
              width: 100%;
              height: 100%;
              background-color: red;
              border: none;
            }
          }
          .member-information-table{
            float: left;
          }
          table{
            padding-top: 30px;
            tr{
              td{
                padding: 5px 50px 5px 0;
                span{
                  display: inline-block;
                }
                span:first-child{
                  width: 85px;
                  text-align: right;
                }
                span:nth-child(2){
                  color: black;
                  padding-left: 10px;
                }
              }
            }
          }
        }
      }
    }
    .time-step-list{
      margin: 30px 20px;
      li{
        width: 100%;
        border: none;
        .step-icon{
          display: inline-block;
          width: 15px;
          height: 15px;
          border-radius: 100%;
          border: solid 1px rgb(3,139,226);
        }
        .step-time{
          padding-left: 20px;
          padding-right: 30px;
        }
        .time-line{
          height: 26px;
          width: 100%;
          margin-left: 7px;
          border-left: dashed 1px #ccc;
          position: relative;
          top: -3px;
        }
      }
      li:last-child{
        .step-icon{
          background-color: rgb(3,139,226);
        }
        .time-line{
          display: none;
        }
      }
    }


  }
</style>
