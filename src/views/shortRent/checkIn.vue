<template>
  <div>
    <menu-box :active-tab-name="activeTabName"></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">订单详情</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>添加入住信息</h3>
        </div>
        <div id="order-detail-wrap">
          <ul class="order-detail-content">
            <li class="ul-item">
              <h3><i class="icon icon-iden"></i>房间信息</h3>
              <table>
                <tr>
                  <td>格局 : </td>
                  <td>{{roomInfoData.name}}</td>
                </tr>
                <tr>
                  <td>面积 :</td>
                  <td>{{roomInfoData.housetypeArea}}m³</td>
                </tr>
                <tr>
                  <td>定房电话 :</td>
                  <td>{{roomInfoData.bookPhone}}</td>
                </tr>
                <tr>
                  <td>订房姓名 :</td>
                  <td>{{roomInfoData.bookName}}</td>
                </tr>
                <tr>
                  <td>门市价 :</td>
                  <td v-if="roomInfoData.price">{{roomInfoData.price}}元</td>
                </tr>
              </table>
            </li>
            <li class="ul-item">
              <h3><i class="icon icon-iden"></i>入住信息</h3>
              <table v-if="roomInfoData.checkInInfo">
                <tr>
                  <td>入住时间:</td>
                    <td>{{roomInfoData.checkInInfo.inTime | timefilter('yyyy-MM-dd')}}</td>
                </tr>
                <tr>
                  <td>入住天数:</td>
                  <td>{{DateDiff(roomInfoData.checkInInfo.inTime,roomInfoData.checkInInfo.leaveTime)}}天</td>
                </tr>
                <tr>
                  <td>预计退房日期:</td>
                  <td>{{roomInfoData.checkInInfo.leaveTime | timefilter('yyyy-MM-dd')}}</td>
                </tr>
                <tr>
                  <td>市场细分:</td>
                  <td>
                    <span v-if="roomInfoData.checkInInfo.marketType == 0">门市散客</span>
                    <span v-else-if="roomInfoData.checkInInfo.marketType == 1">内部员工 </span>
                    <span v-else-if="roomInfoData.checkInInfo.marketType == 2">协议单位</span>
                    <span v-else>无</span>
                  </td>
                </tr>
                <tr>
                  <td>备注:</td>
                  <td v-if="roomInfoData.checkInInfo.remark">{{roomInfoData.checkInInfo.remark}}</td>
                  <td v-else>无</td>
                </tr>
              </table>
            </li>
            <li class="ul-item">
              <h3><i class="icon icon-iden"></i>入住人信息</h3>
              <table>
                <tr>
                  <td>
                    <ul>
                      <li v-for="(item,index) in pmsRoomInfo" style="text-align: left">
                        房号：<b style="padding-left: 10px;">{{item.roomNum}}  {{item.name}} </b>
                        <span style="padding-left: 20px;">入住人：</span>
                        姓名 <input class="ivu-input " style="width:100px;" v-model="item.username">
                        <el-radio class="radio" v-model="item.gender" label="1">男</el-radio>
                        <el-radio class="radio" v-model="item.gender" label="0">女</el-radio>
                        <Select v-model="item.certificateType" style="width:120px;">
                          <Option v-for="community in  stationSelectList" :value="community.dataId" :key="community.dataId">{{ community.dataName }}</Option>
                        </Select>
                        <input class="ivu-input" style="width:200px;" v-model="item.certificateNumber">
                        年龄：<input class="ivu-input" style="width:70px;" v-model="item.age">
                        联系电话：<input class="ivu-input" style="width:100px;" v-model="item.phone">
                        <Button v-if="item.add == true" type="primary" style="display: inline-block" @click="addPerson(item,index)">+ 添加入住人</Button>
                        <Button v-if="item.add == false" type="primary" style="display: inline-block" @click="deletePerson(item,index)">- 删除</Button>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr style="text-align: center;" v-if="pmsRoomInfo != []">
                  <Button type="primary" style="width: 100px;margin-top: 100px;" @click="submit">提交</Button>
                  <Button type="primary" style="width: 100px;margin-top: 100px;margin-left: 100px;" @click="Notsubmit">取消</Button>
                </tr>
              </table>
            </li>
          </ul>
        </div>
      </div>
      <footer-box></footer-box>
      <warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
      <success-modal :success-message="successMessage" v-if="successModal"></success-modal>
    </div>
  </div>
</template>

<script>
  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import successModal from '../../components/successModal.vue';
  import warningModal from '../../components/warningModal.vue';
  import {CxkjGetInRoomInfo300214,hostWay,CxkjAddPersonnel300215} from '../api.js';
  import qs from 'qs';


  export default {
    components:{
      rightHeader,
      menuBox,
      successModal,
      warningModal,
      footerBox
    },
    data(){
      return{
        activeTabName:'shortRent',
        successModal: false,
        warningModal: false,
        successMessage: '添加人员成功!',
        warningMessage: '入住人员信息填写不完整!',
        radio:"1",
        orderId:null,
        roomInfoData:{},
        stationSelected:"",
        stationSelectList:[],
        pmsRoomInfo:[],
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      init(){
        this.orderId = this.$route.query.orderId;
        this.getSystemData();
      },
      closeWarningModal() {
        this.warningModal = false;
      },
      getRoomInfo(){
        var that = this;
        this.$http.get(CxkjGetInRoomInfo300214,{params:{id:this.orderId}})
          .then(function(res){
            console.log(res);
            if(res.status == 200 && res.data.code == 10000){
              that.roomInfoData = res.data.entity;
              for(let i =0;i<that.roomInfoData.orderRoomList.length;i++){
                that.pmsRoomInfo.push({
                  username:'',
                  name:that.roomInfoData.orderRoomList[i].name,
                  gender:"1",
                  certificateType:that.stationSelectList[0].dataId,
                  certificateNumber:"",
                  age:'',
                  phone:'',
                  roomId:that.roomInfoData.orderRoomList[i].roomId,
                  id:that.roomInfoData.orderRoomList[i].id,
                  roomNum:that.roomInfoData.orderRoomList[i].roomNum,
                  add:true
                })
              }

              if(that.roomInfoData.isPersonnel == 1){
                that.pmsRoomInfo[0].username = that.roomInfoData.bookName;
              }
              // console.log(that.pmsRoomInfo);
            }

          })
      },
      getSystemData(){
       this.$http.get(hostWay+"?parentId="+35).then(res=>{
          this.stationSelectList = res.data.entity;
          this.stationSelected = this.stationSelectList[0].dataId;
          this.getRoomInfo();
       })
      },
      /*添加入住人*/
      addPerson(person,index){
        let les = {
          username:'',
          name:person.name,
          gender:person.gender,
          certificateType:this.stationSelectList[0].dataId,
          certificateNumber:"",
          age:'',
          phone:'',
          roomId:person.roomId,
          id:this.pmsRoomInfo[index].id,
          roomNum:person.roomNum,
          add:false
        }
        this.pmsRoomInfo.splice(index+1,0,les);
        // console.log(this.pmsRoomInfo);
      },
      /*删除入住人*/
      deletePerson(item,index){
        this.pmsRoomInfo.splice(index,1);
      },
      submit(){
        let that = this;
        let params = new FormData();
        for(let i=0;i<this.pmsRoomInfo.length;i++){
            if(this.pmsRoomInfo[i].name=="" || this.pmsRoomInfo[i].gender=="" || this.pmsRoomInfo[i].certificateType=="" || this.pmsRoomInfo[i].certificateNumber=="" || this.pmsRoomInfo[i].roomId==""){
                this.warningMessage = '入住人员信息填写不完整!';
                this.warningModal = true;
              return;
            }
            params.append(`cxkjPmsOrderRoomieDtos[${i}].orderRoomId`,this.pmsRoomInfo[i].id);
            params.append(`cxkjPmsOrderRoomieDtos[${i}].orderId`,this.orderId);
            params.append(`cxkjPmsOrderRoomieDtos[${i}].name`,this.pmsRoomInfo[i].username);
            params.append(`cxkjPmsOrderRoomieDtos[${i}].gender`,this.pmsRoomInfo[i].gender);
            params.append(`cxkjPmsOrderRoomieDtos[${i}].certificateType`,this.pmsRoomInfo[i].certificateType);
            params.append(`cxkjPmsOrderRoomieDtos[${i}].certificateNumber`,this.pmsRoomInfo[i].certificateNumber);
            params.append(`cxkjPmsOrderRoomieDtos[${i}].roomId`,this.pmsRoomInfo[i].roomId);
            params.append(`cxkjPmsOrderRoomieDtos[${i}].age`,this.pmsRoomInfo[i].age);
            params.append(`cxkjPmsOrderRoomieDtos[${i}].phone`,this.pmsRoomInfo[i].phone);
        }
        this.$http.post(CxkjAddPersonnel300215,params).then(res=>{
          // console.log(res);
          if(res.data.code == 10000){
            this.successMessage = '添加入住人员成功!';
            this.successModal = true;
            setTimeout(()=>{
              this.successMessage = false;
              that.$router.go(-1);
            },1500)
          }else{
            this.warningMessage = '添加入住人员失败!';
            this.warningModal = true;
          }
        })
      },
      Notsubmit(){
        window.history.go(-1);
      }
    },
    filters:{
      timefilter(value,format){
        if(value){
          return new Date(value).Format(format);
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #order-detail-wrap {
    padding-bottom: 50px;
    width: 100%;
    height: 100%;
    min-height: 1000px;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .order-detail-content{
      padding: 30px 50px;
      height: 100%;
      .ul-item{
        border-bottom:1px dashed #ccc;
        margin-top: 30px;
      }
      .ul-item:last-child{
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
            text-align: left;
            padding: 10px;
          }
        }
      }
    }
    .userInfo{
      margin: 0;
      height: 100%;
      li{
        border-bottom:none;
        margin-top: 10px;
        span{
          display: inline-block;
          min-width: 110px;
        }
        em{
          display: inline-block;
          min-width: 110px;
        }
      }
      li:last-child{
        border-bottom: none;
        margin-bottom: 30px;
      }
      .contactInfoList{
        color: #000;
      }
    }
  }



</style>
