<template>
    <div >
        <menu-box></menu-box>
        <div class="right-content" id="right-content">
            <right-header></right-header>
            <div class="wordbench-box">
                <div class="ivu-site">
                    <span>您现在的位置：</span>
                    <router-link class="active" to="/shortRent">短租管理</router-link>
                </div>
                <Tabs type="card">
                    <Tab-pane label="订单列表">
                        <div class="message-ti">
                            <div class="finance-header-kong">
                                <short-order-list></short-order-list>
                            </div>
                        </div>
                    </Tab-pane>

                    <Tab-pane label="入住列表">
                        <div class="message-ti">
                            <short-stay-list></short-stay-list>
                        </div>
                    </Tab-pane>

                    <Tab-pane label="产品日历">
                        <div class="message-ti">
                            <short-product-calendar></short-product-calendar>
                        </div>
                    </Tab-pane>

                    <Tab-pane label="哑房账">
                        <div class="message-ti">
                            <short-Room-Bill-list></short-Room-Bill-list>
                        </div>
                    </Tab-pane>
                    <Tab-pane label="价格设置">
                        <div class="message-ti">
                            <short-price-set @shortprice ="shortprice()"></short-price-set>
                        </div>
                    </Tab-pane>
                    <Tab-pane label="社区短租配置">
                        <div class="message-ti">
                          <short-setting-list @successUpload ="successUpload()"></short-setting-list>
                        </div>
                    </Tab-pane>

                </Tabs>
            </div>
            <footer-box></footer-box>
        </div>
        <div class="scherm" v-show="isHide">
          </div>
          <div class="setmeal" v-show="isHide">
              <p>设置</p>
              <i class="el-icon-circle-close" @click="inst5"></i>
              <span class="state">开始时间：</span><Date-picker type="date" placeholder="请选择日期" v-model="communityLeaseBegin"></Date-picker>
              <span class="out">结束时间：</span><Date-picker type="date" placeholder="请选择日期" v-model="communityLeaseBegin"></Date-picker>

              <el-checkbox-group v-model="checkList">
                  <span style="margin-left:10px;line-height: 38px;">开始时间：</span>
                  <el-checkbox label="一"></el-checkbox>
                  <el-checkbox label="二"></el-checkbox>
                  <el-checkbox label="三"></el-checkbox>
                  <el-checkbox label="四"></el-checkbox>
                  <el-checkbox label="五"></el-checkbox>
                  <el-checkbox label="六"></el-checkbox>
                  <el-checkbox label="日"></el-checkbox>
              </el-checkbox-group>
              <Checkbox v-model="single2" @click.prevent.native="handleCheckAll2" class="all">全选</Checkbox>
              <div class="form-item">
                  <b>套系名称：</b>
                  <Select v-model="stationCommunity" style="width:90px" @on-change="selectCommunity(stationCommunity)">
                      <Option v-for="community in  stationSelectList" :value="community.communityId"
                              :key="community.communityId">{{ community.communityName }}
                      </Option>
                  </Select>
              </div>
              <a class="commlun">确定</a>
              <a class="commlun commlun2">关闭</a>
          </div>
        <warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
	    <success-modal :success-message="successMessage" v-if="successModal"></success-modal>
    </div>
</template>

<script>
  import '../../sass/style/activitys.css';
  import menuBox from '../../components/menuBox.vue';
  import rightHeader from '../../components/rightHeader.vue';
  import footerBox from '../../components/footerBox.vue';
  import successModal from '../../components/successModal.vue';
  import warningModal from '../../components/warningModal.vue';
  import shortOrderList from './shortOrderList.vue';
  import shortStayList from './shortStayList.vue';
  import shortRoomBillList from './shortRoomBillList.vue';
  import shortSettingList from './shortSettingList.vue';
  import shortPriceSet from './shortPriceSet.vue';
  import shortProductCalendar from './shortProductCalendar.vue';
  import axios from 'axios';
  import { hostActivity,hostActivityModify,hostActivityInvite } from '../api.js';
  import qs from 'qs';

  export default {
    components: {
      rightHeader,
      menuBox,
      footerBox,
      successModal,
      warningModal,
      shortOrderList,
      shortStayList,
      shortRoomBillList,
      shortSettingList,
      shortPriceSet,
      shortProductCalendar
    },
    data() {
      return {
        activeTabName:"shortRent",
        successModal: false,
        warningModal: false,
        successMessage: '添加部门成功',
        warningMessage: '添加部门失败，请检查是否重复',
        currentPage3: 1,
        radio: '1',
        ishide3: false,
        isHide:false

      }
    },
    mounted() {
    },
    methods: {
        closeWarningModal() {
            this.warningModal = false;
        },
        shortprice(){
          this.successModal = true;
        },
        successUpload(){
          let vm = this;
          vm.successMessage = "上传图片成功!";
          vm.successModal = false;
          setTimeout(function(){
            vm.successModal = false;
           },1500)

        },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../sass/base/_mixin.scss';
    @import '../../sass/base/_public.scss';
    @import '../../sass/page/_communityManagement.scss';
    #right-content{
        height: 100%!important;
        min-height: 1300px;
        .message-tix{
            width: 100%;
            min-height: 1000px;
            background-color: #fff;
            overflow: hidden;
            box-shadow: 0 2px 1px #ccc!important;
        }
    }
    .ivu-tabs-tabpane{
        width: 100%;
        height: 100%;
        background-color: #fff;
        box-shadow: 0 2px 1px #ccc;
    }
    .ivu-tabs-card{
        // box-shadow: 0 0 0px #0CC!important;
    }

    .message-ti {
        position: relative;
    }

    .message-ti .block {
        position: absolute;
        left: 50%;
        margin-top: 120px;
        transform: translate(-50%, -50%);
    }

    .message-ti .block .el-pagination {
        text-align: center;
        margin-top: 40px;
    }

    .message-ti .block .el-pagination .el-pager .number {
        margin: 0 5px;
        border: 1px solid #DCDCDC;
    }

    .message-ti .block .el-pagination button {
        border: 1px solid #DCDCDC;
    }


    .setmeal{
        width: 526px;
        height: 240px;
        background: white;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        z-index: 9999;
        .el-icon-circle-close{
            position: absolute;
            right: -40px;
            top: -40px;
            font-size: 20px;
            line-height: 50px;
            cursor: pointer;
        }
        p{
            height: 50px;
            line-height: 50px;
            width: 100%;
            padding-left: 10px;
            background: #038be2;
            color: white;
            font-size: 16px;
        }
        .ivu-date-picker{
            width: 156px;
            height: 30px;
            margin-right: 10px;
        }
        .state{
            line-height: 60px;
            margin-left: 10px;
        }
        .out{
            margin-left: 10px;
            line-height: 60px;
        }
        .el-checkbox{
            margin-left: 8px;
        }
        .all{
            position: absolute;
            right: 26px;
            top: 118px;
            font-size: 14px;
            .ivu-checkbox-inner{
                width: 18px;
                height: 18px;
            }
        }
        .form-item{
            b{
                margin-left: 10px;
                font-weight: initial;
            }
        }
        .commlun{
            position: absolute;
            left: 104px;
            bottom: 9px;
            width: 110px;
            height: 32px;
            display: block;
            text-align: center;
            line-height: 32px;
            font-size: 16px;
            color: white;
            background: #038BE2;
            border-radius: 5px;
            cursor: pointer;
        }
        .commlun2{
            left: 300px;
        }
    }
    .scherm {
        width: 100%;
        height: 100%;
        background: #000;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        opacity: 0.5;
    }
</style>
