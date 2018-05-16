<template>
  <div>
    <menu-box :active-tab-name="activeTabName"></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">投诉管理</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>添加投诉</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="add-complain-wrap">
          <div class="add-complain-content">
            <table>
              <tr>
                <td><b>所属社区 :</b></td>
                <td>
                  <Select v-model="roomCommunity" style="width:220px">
                    <Option v-for="community in  allCommunity" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                  </Select>
                </td>
              </tr>
              <tr>
                <td><b>反馈类型 :</b></td>
                <td>
                  <Select v-model="complainType" style="width:220px">
                    <Option v-for="item in  complainTypeList" :value="item.value" :key="item.value">{{ item.lable }}</Option>
                  </Select>
                </td>
              </tr>
              <!--<tr>-->
                <!--<td><b>工单时间 :</b></td>-->
                <!--<td>-->
                  <!--<Date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择投诉时间" v-model="complainTime"></Date-picker>-->
                <!--</td>-->
              <!--</tr>-->
              <tr>
                <td><b>客户联系方式 :</b></td>
                <td>
                  <Input v-model="userPhone" placeholder="请输入用户注册手机号" style="width: 220px;" @on-blur="getSignedUserInfo" ></Input>
                </td>
              </tr>
              <tr>
                <td><b>客户姓名 :</b></td>
                <td>
                  <Input v-model="userName" placeholder="请输入投诉人姓名" style="width: 220px;" :disabled="userNameFlag"></Input>
                </td>
              </tr>
              <tr>
                <td class="position-relative"><b>反馈内容 :</b></td>
                <td>
                  <textarea name="remarks" style="width:420px;height: 150px;max-width: 700px;padding: 5px;" placeholder="请输入客户投诉内容" v-model="complainContent"></textarea>
                  <span>200字以内</span>
                </td>
              </tr>
              <tr>
                <td ></td>
                <td>
                  <Button type="primary" style="width: 120px;height: 36px;" @click="sureAdd()">确定</Button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <success-modal :success-message="successMessage" v-if="successModal"></success-modal>
        <warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warnningModal"></warning-modal>
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
  import qs from 'qs';
  import {allCommunity,addComplain,UserInfo500053} from '../api.js';


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
        activeTabName:'customServiceManagement',
        warningMessage:"投诉信息填写不完整，请填写完整后重新提交！",
        successMessage:"添加投诉成功！",

        roomCommunity:"",
        complainContent:"",
        userPhone:"",
        userName:"",
        complainTime:"",
        complainTypeList:[
          {
            value:0,
            lable:"咨询"
          },
          {
            value:1,
            lable:"建议"
          },
          {
            value:2,
            lable:"投诉"
          },
        ],
        complainType:2,

        allCommunity:[],
        successModal:false,
        warnningModal:false,
        userNameFlag:false,
      }
    },
    mounted(){
      this.getCommunityData();
    },
    methods:{
      getCommunityData(){
        var that = this;
        this.$http.get(allCommunity)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.allCommunity = res.data.entity;
            }
          })
      },
      // 获取用户信息
      getSignedUserInfo () {
        let that = this
        if (this.userPhone === '') {
          this.warningMessage = "手机号码不能为空";
          this.warnningModal = true;
          return;
        } else if (!(/^1[0-9]{10}$/).test(this.userPhone)) {
          this.warningMessage = "请填写正确的手机号码";
          this.warnningModal = true;
          return;
        } else {
          this.$http.post( UserInfo500053, qs.stringify({
            userPhone:this.userPhone // 	用户手机号
          })).then(res => {
            let code = parseInt(res.data.code)
            if(code == 10000){
              let user = res.data.result.userInfo
              that.userName = user.userName //	String	用户名称
              that.userNameFlag = true;
            }else{
//              this.userPhone = ''
              this.warningMessage = res.data.content;
              this.warnningModal = true;
              that.userNameFlag = false;
            }
          }).catch(function (error) {
            console.log(error);
          })
        }
      },
      sureAdd(){
        var that = this;
        if(this.roomCommunity ==="" || this.complainContent ==="" || this.userPhone ==="" || this.userName===""){
          this.warningMessage = "投诉信息填写不完整，请填写完整后重新提交！";
          this.warnningModal = true;
          return;
        }
        if(this.complainContent.length>200){
          this.warningMessage = "反馈内容不能超过200字!";
          this.warnningModal = true;
          return;
        }
        if (!(/^1[0-9]{10}$/).test(this.userPhone)){
          this.warningMessage = "请输入正确的手机号码";
          this.warnningModal = true;
          return;
        }

          var data = {
          communityId:this.roomCommunity,
          complainContent:this.complainContent,
          userPhone:this.userPhone,
          userName:this.userName,
          complainType:this.complainType
        };
        this.$http.post(addComplain,qs.stringify(data))
          .then(function(res){
            // console.log(res);
              if(res.status == 200 && res.data.code == 10000){
                that.successModal = true;
                setTimeout(() => {
                  that.successModal = true;
                  that.$router.push('/custom/customServiceManagement');
                }, 3000);
              }
              else{
                that.warningMessage = res.data.content;
                that.warnningModal = true;
              }
          })
      },
      closeWarningModal(){
        this.warnningModal = false;
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


  #add-complain-wrap {
    padding-bottom: 50px;
    width: 100%;
    min-height: 1000px;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .add-complain-content{
      padding-left: 80px;
      padding-top: 50px;
      table{
        tr{
          td:nth-child(1){
            width: 100px;
            text-align: right;
            padding-bottom: 20px;
          }
          td:nth-child(2){
            text-align: left;
            padding-left: 10px;
            padding-bottom: 20px;
          }
          .position-relative{
            b{
              position: relative;
              top: -65px;
            }
          }
        }
      }
      .ivu-icon-ios-calendar-outline{
        color:#038be2;
        font-family: "iconfont" !important;
        font-size: 18px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        &:before{
          content: "\e60c";
        }
      }
    }

  }
</style>
