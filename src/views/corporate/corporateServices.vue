<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="">企业服务</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>企业服务</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="corporate-service-list">
          <div class="corporate-service-content">
            <div class="add-corporate-btn" @click="goToAddCorporate()" v-if="jurisdiction('ENTERPRISE_INCREASE')"><span>+</span>新增企业</div>
            <table class="corporate-service-table"  cellspacing="0" width="100%">
              <tr class="table-heaher">
                <th>企业信息</th>
                <th>服务类别</th>
                <th>服务区域</th>
                <th>操作</th>
              </tr>
              <tr class="active">
                <td>
                  <div class="corporate-logo">
                    <img src="../../../static/images/icon/orderDetail_03.png" alt="">
                  </div>
                  <div class="corporate-info">
                    <h3>北京电子有限责任公司</h3>
                    <div class="address_position"><i class="diwei_map"></i><span>罗湖区东门南路150米金通大厦A座2楼</span></div>
                    <ul>
                      <li>政策咨询</li>
                      <li>薪酬及架构管理</li>
                      <li>知识产权保护</li>
                      <li>政府补贴申请</li>
                    </ul>
                  </div>
                </td>
                <td>金融服务</td>
                <td>罗湖区</td>
                <td>
                  <Button style="width: 80px;height: 30px" @click="goToAddCorporate()" v-if="jurisdiction('ENTERPRISE_UPDATE')">编辑</Button>
                  <Button style="width: 80px;height: 30px" @click="goToADetail()">查看详情</Button>
                </td>
              </tr>
              <tr class="active">
                <td>
                  <div class="corporate-logo">
                    <img src="../../../static/images/icon/orderDetail_03.png" alt="">
                  </div>
                  <div class="corporate-info">
                    <h3>北京电子有限责任公司</h3>
                    <div class="address_position"><i class="diwei_map"></i><span>罗湖区东门南路150米金通大厦A座2楼</span></div>
                    <ul>
                      <li>政策咨询</li>
                      <li>薪酬及架构管理</li>
                    </ul>
                  </div>
                </td>
                <td>金融服务</td>
                <td>罗湖区</td>
                <td>
                  <Button style="width: 80px;height: 30px">编辑</Button>
                  <Button style="width: 80px;height: 30px">查看详情</Button>
                </td>
              </tr>
              <tr class="active">
                <td>
                  <div class="corporate-logo">
                    <img src="../../../static/images/icon/orderDetail_03.png" alt="">
                  </div>
                  <div class="corporate-info">
                    <h3>北京电子有限责任公司</h3>
                    <div class="address_position"><i class="diwei_map"></i><span>罗湖区东门南路150米金通大厦A座2楼</span></div>
                    <ul>
                      <li>政策咨询</li>
                      <li>薪酬及架构管理</li>
                    </ul>
                  </div>
                </td>
                <td>金融服务</td>
                <td>罗湖区</td>
                <td>
                  <Button style="width: 80px;height: 30px">编辑</Button>
                  <Button style="width: 80px;height: 30px">查看详情</Button>
                </td>
              </tr>
              <tr class="active">
                <td>
                  <div class="corporate-logo">
                    <img src="../../../static/images/icon/orderDetail_03.png" alt="">
                  </div>
                  <div class="corporate-info">
                    <h3>北京电子有限责任公司</h3>
                    <div class="address_position"><i class="diwei_map"></i><span>罗湖区东门南路150米金通大厦A座2楼</span></div>
                    <ul>
                      <li>政策咨询</li>
                      <li>薪酬及架构管理</li>
                    </ul>
                  </div>
                </td>
                <td>金融服务</td>
                <td>罗湖区</td>
                <td>
                  <Button style="width: 80px;height: 30px">编辑</Button>
                  <Button style="width: 80px;height: 30px">查看详情</Button>
                </td>
              </tr>
              <tr class="active">
                <td>
                  <div class="corporate-logo">
                    <img src="../../../static/images/icon/orderDetail_03.png" alt="">
                  </div>
                  <div class="corporate-info">
                    <h3>北京电子有限责任公司</h3>
                    <div class="address_position"><i class="diwei_map"></i><span>罗湖区东门南路150米金通大厦A座2楼</span></div>
                    <ul>
                      <li>政策咨询</li>
                      <li>薪酬及架构管理</li>
                    </ul>
                  </div>
                </td>
                <td>金融服务</td>
                <td>罗湖区</td>
                <td>
                  <Button style="width: 80px;height: 30px">编辑</Button>
                  <Button style="width: 80px;height: 30px">查看详情</Button>
                </td>
              </tr>
            </table>
            <Page :total="complainTotalNum" :current="complainCurrent" :page-size="10" show-elevator show-total @on-change="search"></Page>
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
  import {allCommunity,complainList} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        complainTotalNum:10,
        complainCurrent:1,
      }
    },
    mounted(){

    },
    methods:{
      goToAddCorporate(){
        this.$router.push({name:"addCorporate"})
      },
      goToADetail(){
        this.$router.push({name:"corporateDetail"})
      },
      search(){

      }
    },
    filters:{
      timefilter(value,format){
        if(value){
          return new Date(value).Format(format)
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #corporate-service-list{
    height: 100%;
    min-height: 1000px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .corporate-service-content{
      padding-top: 75px;
      position: relative;
      .add-corporate-btn{
        position: absolute;
        top: 20px;
        right: 50px;
        width: 120px;
        height: 36px;
        border-radius: 5px;
        border: 1px solid rgb(3,139,226);
        line-height: 30px;
        text-align: center;
        color: rgb(3,139,226);
        cursor: pointer;
        span{
          font-size: 18px;
          padding-right: 10px;
        }
      }
      .corporate-service-table{
        border-collapse:collapse;
        text-align: center;
        .table-heaher{
          th{
            border: solid 1px #ccc;
          }
          th:nth-child(1){
            border-left: none;
          }
          th:nth-child(2),th:nth-child(3){
            padding-left: 10px;
            padding-right: 10px;
          }
          th:nth-child(4){
            border-right: none;
          }
        }
        tr{
          th{
            padding: 16px 0;
            background-color: rgb(248,248,248);
          }
          td{
            .corporate-logo{
              width: 90px;
              height: 90px;
              margin: 20px;
              float: left;
              img{
                width: 90px;
                height: 90px;
              }
            }
            .corporate-info{
              float: left;
              text-align: left;
              display: inline-block;
              h3{
                margin-top: 20px;
              }
              .address_position{
                margin: 5px 0 15px 0;
                display: inline-block;
                height: 19px;
                line-height: 19px;
                .diwei_map{
                  display: inline-block;
                  position: relative;
                  top: 3px;
                  width: 12px;
                  height: 19px;
                  background: url(../../../static/images/icon/service_map.png);
                }
                span{
                  padding-left: 10px;
                }
              }
              ul{
                li{
                  display: inline-block;
                  padding: 3px 10px;
                  border: solid 1px rgb(31,187,166);
                  color: rgb(31,187,166);
                  border-radius: 3px;
                  margin-right: 10px;
                }
              }
            }
          }
        }
        .active{
          border-bottom: 1px dashed #ccc;
        }
        .active:hover{
          background: rgb(248,252,255);
          h3{
            color: rgb(3,139,226);
          }
        }
      }
      .ivu-page{
        margin: 50px 0 160px 0;
        text-align: center;
      }
    }
  }



</style>

