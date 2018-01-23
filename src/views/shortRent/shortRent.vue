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

                        </div>
                    </Tab-pane>

                    <Tab-pane label="产品日历">
                        <div class="message-ti">
                        </div>
                    </Tab-pane>

                    <Tab-pane label="哑房账">
                        <div class="message-ti">
                        </div>
                    </Tab-pane>
                    <Tab-pane label="价格设置">
                        <div class="message-ti">
                        </div>
                    </Tab-pane>
                    <Tab-pane label="社区短租配置">
                        <div class="message-ti">
                        </div>
                    </Tab-pane>

                </Tabs>
            </div>
            <footer-box></footer-box>
        </div>

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
      shortOrderList
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

      }
    },
    mounted() {
    },
    methods: {

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



</style>