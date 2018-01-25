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
          <Tab-pane label="新增短租配置">
            <div class="setting-wrap">
              <ul>
                <li class="setting-item">
                  <b>社区: </b>
                  <Select v-model="stationCommunity" style="width:180px">
                    <Option v-for="community in  stationSelectList" :value="community.communityId"
                            :key="community.communityId">{{ community.communityName }}
                    </Option>
                  </Select>
                </li>
                <li class="setting-item">
                  <b>长租房名称: </b>
                  <Select v-model="stationCommunity" style="width:180px">
                    <Option v-for="community in  stationSelectList" :value="community.communityId"
                            :key="community.communityId">{{ community.communityName }}
                    </Option>
                  </Select>
                </li>
                <li class="setting-item">
                  <b>短租房名称: </b>
                  <Input style="width: 225px;"></Input>
                </li>
                <li class="setting-item">
                  <b>房间信息: </b>
                  <p style="display: inline-block">
                    户型面积:<Input style="width: 100px;margin-right: 20px;"></Input>
                    床数:<Input style="width: 100px;margin-right: 20px;"></Input>
                    床:<Input style="width: 100px;"></Input>
                  </p>
                </li>
                <li class="setting-item" style="position: relative">
                  <b style="position:absolute;">公寓设施: </b>
                  <div class="room-setting">
                    <el-checkbox-group v-model="selectListData">
                      <el-checkbox v-for="select in checkBoxArr2" :label="select.dataName"></el-checkbox>
                    </el-checkbox-group>
                  </div>
                </li>
                <li class="setting-item">
                  <b style="position:absolute;">服务说明: </b>
                  <textarea style="width: 600px;height:120px;resize: none;margin-left: 150px;" ></textarea>
                </li>
                <li class="setting-item">
                  <b></b>
                  <Button type="primary" style="width: 120px;height: 36px;">提交</Button>
                </li>
              </ul>
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
    },
    data() {
      return {
        stationSelectList:[],//社区列表
        stationCommunity:'',//被选中的社区
        selectListData:["空调"],
        checkBoxArr2:[{dataName:"空调",dataId:1},{dataName:"空调1",dataId:2},{dataName:"空调3",dataId:3}],

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

  .setting-wrap{
    padding: 30px 100px;
    width: 100%;
    min-height: 1300px;
    .setting-item{
      margin: 40px 0;
      b{
        display: inline-block;
        width: 120px;
        text-align: right;
        margin-right: 30px;
      }
      .room-setting{
        display: inline-block;
        width: 600px;
        margin-left: 150px;
        .el-checkbox{
          margin: 0;
          margin-right: 15px;
        }
      }
    }
  }


</style>
