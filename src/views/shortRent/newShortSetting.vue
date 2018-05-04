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
          <Tab-pane  :label="tableName">
            <div class="setting-wrap">
              <ul>
                <li class="setting-item">
                  <b><span style="color: red;">*</span>社区: </b>
                  <Select v-model="communityId" style="width:180px" @on-change="changeCommunityId" :disabled="selectCom" >
                    <Option v-for="community in  stationSelectList" :value="community.communityId" :key="community.communityId">{{ community.communityName }}
                    </Option>
                  </Select>
                </li>
                <li class="setting-item">
                  <b><span style="color: red;">*</span>长租房名称: </b>
                  <Select v-model="housetypeId" style="width:180px" @on-change="changeLengthName" :disabled="selectCom">
                    <Option v-for="lengthName in  lengthNameList" :value="lengthName.housetypeId"
                            :key="lengthName.housetypeId">{{ lengthName.housetypeName }}
                    </Option>
                  </Select>
                </li>
                <li class="setting-item">
                  <b><span style="color: red;">*</span>短租房名称: </b>
                  <Input style="width: 225px;" v-model="name"></Input>
                </li>
                <li class="setting-item">
                  <b>房间信息: </b>
                  <p style="display: inline-block">
                    户型面积:<Input style="width: 100px;margin-right: 20px;" v-model="housetypeArea" :disabled="true"></Input>
                    床数:<Input style="width: 100px;margin-right: 20px;" v-model="bedNum"></Input>
                    床:<Input style="width: 100px;" v-model="bedLength"></Input>米
                  </p>
                </li>
                <li class="setting-item" style="position: relative">
                  <b style="position:absolute;">公寓设施: </b>
                  <div class="room-setting">
                    <el-checkbox-group v-model="selectListData">
                      <el-checkbox v-for="select in configMapSelects" :label="select.dataName"></el-checkbox>
                    </el-checkbox-group>
                  </div>
                </li>
                <li class="setting-item">
                  <b style="position:absolute;">服务说明: </b>
                  <textarea style="width: 600px;height:120px;resize: none;margin-left: 150px;" v-model="serviceInfo"></textarea>
                </li>
                <li class="setting-item">
                  <b></b>
                  <Button type="primary" style="width: 120px;height: 36px;" @click="submit">提交</Button>
                </li>
              </ul>
            </div>
          </Tab-pane>
        </Tabs>
      </div>
      <footer-box></footer-box>
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
  import axios from 'axios';
  import { CxkjCommunityPmsRoomTypeInfo200188,allCommunity,CxkjCommunityPmsRoom200187,CxkjCommunityPmsRoomTypesubmit200189,CxkjCommunityPmsType200186,host } from '../api.js';
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
        tableName:"新增短租配置",
        stationSelectList:[],//社区列表
        communityId:'',//被选中的社区
        selectListData:[],
        configMapSelects:[],

        housetypeId:"",
        roomTypeInfo:[],//房间配置信息
        name:"",//短租房名称
        housetypeArea:"",//户型面积
        bedNum:"",//床数
        bedLength:"",//床长
        communityName:"",//社区名称
        serviceInfo:"",//短租服务介绍
        lengthNameList:[],//长租名称下拉选
        furniture:"",
        isEdit:false,//是否为编辑（true：编辑，false：新增）
        time:0,//次数
        selectCom:false,
        warningMessage:"",
        successMessage:"",
        successModal:false,
        warningModal:false,
      }
    },
    mounted() {
      this.housetypeId = parseInt(this.$route.query.housetypeId);
      if(this.housetypeId){
        this.isEdit = true;
        this.tableName = "编辑短租配置";
        this.selectCom = true;
     }
      this.getRoomTypeInfo();
      this.getCommunityData();
    },
    methods: {
      //获取社区id
      getCommunityData(){
        var that = this;
        this.$http.get(allCommunity)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.stationSelectList = res.data.entity;
              if(that.$route.query.communityId){
                that.communityId = parseInt(that.$route.query.communityId);
              }else{
                that.communityId = parseInt(that.stationSelectList[0].communityId);
              }
            }
          })
      },
      //获取配置详情
      getRoomTypeInfo(){
        let vm  = this;
        this.$http.post(
          CxkjCommunityPmsRoomTypeInfo200188,qs.stringify({housetypeId:this.housetypeId})
        ).then(function(res){
          if(res.data.code == 10000){
            vm.roomTypeInfo = res.data.entity;
            vm.housetypeArea = vm.roomTypeInfo.housetypeArea;
            vm.name = vm.roomTypeInfo.name;
            vm.bedNum = vm.roomTypeInfo.bedNum;
            vm.bedLength = vm.roomTypeInfo.bedLength;
            vm.communityName = vm.roomTypeInfo.communityName;
            vm.serviceInfo = vm.roomTypeInfo.serviceInfo;

            vm.furniture = vm.roomTypeInfo.furniture;
            let configMap = vm.roomTypeInfo.configMap;
            let arr = vm.furniture.split(",");

            vm.selectListData = [];
            for(let i =0;i<arr.length;i++){
              for(let j =0;j<configMap.length;j++){
                  if(arr[i] == configMap[j].dataId){
                    vm.selectListData.push(configMap[j].dataName);
                    break;
                  }
              }
            }
          }
        })
      },
      //改变长租名称监听
      changeLengthName(housetypeId){
        for(let i =0;i<this.lengthNameList.length;i++){
            if(this.lengthNameList[i].housetypeId == housetypeId){
                this.housetypeArea = this.lengthNameList[i].housetypeArea;
            }
        }
      },
      //改变社区监听
      changeCommunityId(CommunityId){
        let vm = this;
        this.$http.post(
          CxkjCommunityPmsRoom200187,qs.stringify({communityId:CommunityId})
        ).then(function(res){
          if(res.data.code == 10000){
            vm.lengthNameList = res.data.entity;
            vm.configMapSelects = res.data.result.configMap;
            vm.time++;
            if(vm.time > 1){
              vm.selectListData = [];
            }
          }
        })
      },

      //提交按钮
      submit(){
        let furniture = "";
        for(let i =0;i<this.selectListData.length;i++){
          for(let j =0;j<this.configMapSelects.length;j++){
            if(this.selectListData[i] == this.configMapSelects[j].dataName){
              furniture += this.configMapSelects[j].dataId+",";
              break;
            }
          }
        }
        if(furniture){
          furniture = furniture.substring(0,furniture.length-1);
        }
        //防空判断

        if(this.bedNum == "" || this.communityId == "" || this.name == ""){
          this.warningMessage ="信息填入不完整，请补充完信息";
          this.warningModal = true;
          return;
        }
        let param = {
          communityId:this.communityId,
          housetypeId:this.housetypeId,
          furniture:furniture,
          name:this.name,
          serviceInfo:this.serviceInfo,
          bedNum:this.bedNum,
          bedLength:this.bedLength,
        };
        if(this.isEdit){
          this.edit(param);
        }else{
          this.create(param);
        }
      },
      //编辑
      edit(param){
        let that = this;
        this.$http.post(
          CxkjCommunityPmsRoomTypesubmit200189,qs.stringify(param)
        ).then(function(res){
          that.successMessage = "编辑短租配置成功！";
          that.successModal = true;
          setTimeout(function(){
            that.successModal = false;
            history.go(-1);
          },1000)
        })
      },
      //新增
      create(param){
        let that  = this;
        let housetypeName = "";
        for(let i =0;i<this.lengthNameList.length;i++){
            if(this.lengthNameList[i].housetypeId == this.housetypeId){
              housetypeName = this.lengthNameList[i].housetypeName;
            }
        }
        param.housetypeId = this.housetypeId;
        param.housetypeName = housetypeName;
        param.housetypeArea = this.housetypeArea;
        this.$http.post(
          CxkjCommunityPmsType200186,qs.stringify(param)
        ).then(function(res){debugger
          that.successMessage = "新增短租配置成功！";
          that.successModal = true;
          setTimeout(function(){
            that.successModal = false;
            history.go(-1);
          },1000)
        })
      },
      //关闭提醒弹窗
      closeWarningModal(){
        this.warningModal = false;
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
