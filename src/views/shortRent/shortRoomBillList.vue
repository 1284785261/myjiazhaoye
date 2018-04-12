<template>
  <div class="shortOrderListClass">
    <div>
      <div class="form-item item-margin-bottom">
        <b>名称：</b>
        <Input style="width: 225px;" v-model="debtNameKey"></Input>
      </div>
      <div class="form-item item-margin-bottom">
        <b>哑房单号：</b>
        <Input style="width: 225px;" v-model="debtNumKey"></Input>
      </div>
      <div class="form-item item-margin-bottom">
        <b>状态：</b>
        <Select v-model="roomState" style="width:180px">
          <Option v-for="state in  stateSelectList" :value="state.id"
                  :key="state.id">{{ state.name }}
          </Option>
        </Select>
      </div>
      <div class="form-item item-margin-bottom">
        <b>创建时间：</b>
        <Date-picker type="date" :options="createStartTimeOption" placeholder="选择日期" v-model="createStartTime"></Date-picker>
        <span>--</span>
        <Date-picker type="date" :options="createEndTimeOption" placeholder="选择日期" v-model="createEndTime"></Date-picker>
      </div>
      <div class="form-item item-margin-bottom">
        <Button type="primary" style="width: 120px;height: 36px;" @click="search()" >查询</Button>
      </div>
      <div class="form-item item-margin-bottom">
        <Button type="primary" style="width: 120px;height: 36px;" @click="openNewBillModal" >创建哑账</Button>
      </div>
    </div>
    <div class="tableDiv">
      <table class="table ivu-table" >
        <tr>
          <th>哑房单号</th>
          <th>订单号</th>
          <th>名称</th>
          <th>欠款</th>

          <th>创建时间</th>
          <th>入住日期</th>
          <th>离店时间</th>
          <th>创建人</th>
          <th>状态</th>
          <th>备注</th>
        </tr>
        <tr v-for="(item,index) in roomBillList">
          <td>{{item.debtNum}}</td>
          <td>{{item.orderNum}}</td>
          <td>{{item.debtName}}</td>
          <td>{{item.totalMoney}}</td>
          <td>{{item.createTime | timefilter('yyyy-MM-dd')}}</td>
          <td>{{item.inTime | timefilter('yyyy-MM-dd')}}</td>
          <td>{{item.leaveTime | timefilter('yyyy-MM-dd')}}</td>
          <td>{{item.createName}}</td>
          <td>
            <span v-if="item.debtState==0">未办结</span>
            <span v-if="item.debtState==1">已办结</span>
          </td>
          <td>{{item.remark}}</td>
        </tr>
      </table>
      <div class="block">
        <el-pagination @current-change="search" :current-page="pageNum" :page-size="10" layout=" prev, pager, next, total,jumper" :total=totalNum>
        </el-pagination>
      </div>
    </div>


    <div class="new-bill-modal" v-if="newBillModal" ref="outBillModal" @click="closeNewBillModal()"></div>
    <div class="new-bill-content newBillModal" v-if="newBillModal" ref="newBillModal">
      <div class="new-bill-content-title">
        <span>创建哑帐</span>
      </div>
      <div class="modal-content-meddle">
        <div class="form-item">
          <b>订单号: </b>
          <Input style="width: 175px;" v-model="orderNum"></Input>
        </div>
        <div class="form-item">
          <b>名称: </b>
          <Input style="width: 175px;" v-model="debtName"></Input>
        </div>
        <div class="form-item">
          <b>欠款: </b>
          <Input style="width: 175px;" v-model="totalMoney"></Input>
        </div>
        <div class="form-item">
          <b>入住时间：</b>
          <Date-picker type="date" :options="inTimeOption" placeholder="选择日期" v-model="inTime"></Date-picker>
        </div>
        <div class="form-item">
          <b>离店时间: </b>
          <Date-picker type="date" :options="leaveTimeOption" placeholder="选择日期" v-model="leaveTime"></Date-picker>
        </div>
        <div class="form-item">
          <b style="position: relative;top: -80px;">备注: </b>
          <textarea style="width: 680px;height:100px;resize: none;margin-left: 5px;" v-model="remark"></textarea>
        </div>
      </div>
      <div class="form-btn-wrap">
        <Button type="primary" style="width: 120px;height: 36px;margin-right: 150px;" @click="createRoomBill" >提交</Button>
        <Button type="primary" style="width: 120px;height: 36px;" @click="closeNewBillModal" >取消</Button>
      </div>
      <div class="modal-close-btn" @click="closeNewBillModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>

  </div>
</template>

<script>
  import menuBox from '../../components/menuBox.vue';
  import rightHeader from '../../components/rightHeader.vue';
  import footerBox from '../../components/footerBox.vue';
  import successModal from '../../components/successModal.vue';
  import warningModal from '../../components/warningModal.vue';
  import axios from 'axios';
  import {CxkjGetOrderDebtList300183,CxkjCreateOrderDebt300184} from '../api.js';
  import qs from 'qs';

  export default {
    components: {
      rightHeader,
      menuBox,
      footerBox,
      successModal,
      warningModal
    },
    data() {
      let _this = this;
      return {
        activeTabName: "shortRent",//右侧导航栏选中状态
        successModal: false,//成功弹框显示控制
        warningModal: false,//失败弹框显示控制
        successMessage: '',//成功弹框提示消息
        warningMessage: '',//失败弹框提示消息
        selectShow:false,//条件查询显示或隐藏
        stateSelectList:[{name:"全部",id:-1},{name:"未办结",id:0},{name:"已办结",id:1}],//状态列表
        roomState:-1,//哑房被选中状态
        roomBillList:[],//哑帐列表
        conmunityId:"",
        orderNum:"",//账单ID
        debtName:"",//名称
        totalMoney:"",//欠款
        inTime:"",//入住日期
        leaveTime:"",//离店日期
        remark:"",//备注
        inTimeOption: {//创建开始时间验证
          disabledDate(date){
            if(_this.leaveTime){
              return date &&  _this.leaveTime < date.valueOf();
            }
          }
        },
        leaveTimeOption: {//创建结束时间验证
          disabledDate(date){
            return date && date.valueOf() < _this.inTime;
          }
        },

        debtNameKey:"",//条件搜素名称
        debtNumKey:"",// 条件搜索哑房单号
        roomState:-1,//状态

        createStartTime:"",//查询条件创建开始时间
        createEndTime:"",//查询条件创建结束时间
        createStartTime1:"",//查询条件创建开始时间
        createEndTime1:"",//查询条件创建结束时间

        pageNum:1,//当前页数
        totalNum:0,//总条数

        createStartTimeOption: {//创建开始时间验证
          disabledDate(date){
            if(_this.createEndTime){
              return date &&  _this.createEndTime < date.valueOf();
            }
          }
        },
        createEndTimeOption: {//创建结束时间验证
          disabledDate(date){
            return date && date.valueOf() < _this.createStartTime;
          }
        },
        newBillModal:false,
      }
    },
    mounted() {
      this.communityId = sessionStorage.getItem("communityId");
      this.getRoomBillList({pageNum:1,communityId:this.communityId});
    },
    methods: {
      /**
       * 分页插件
       **/
      handleCurrentChange3(){

      },
      /**
       * 导航菜单事件
       **/
      handleSelect(key, keyPath){
        console.log(key)
        if(key == 1){
          this.selectShow = !this.selectShow
        }
      },
      /**
       * 点击创建订单显示弹框
       **/
      createOrderModelShow(){
        this.createOrderModel = true
      },
      /**
       * 创建订单确定按钮
       **/
      setBliakMember(){

      },
      /**
       * 取消创建订单按钮
       **/
      closeBlackModal(){

      },
      /**
       * 打开创建哑帐弹框
       */
      openNewBillModal(){
        this.newBillModal = true;
        setTimeout(() => {//将this.newBillModal = true;渲染完成后，否则找不到节点
          this.$nextTick(() => {
            document.querySelector("#app").firstChild.appendChild(this.$refs.newBillModal);
            document.querySelector("#app").firstChild.appendChild(this.$refs.outBillModal);
          })
        }, 0)
      },
      //获取哑帐列表
      getRoomBillList(params){
        let vm = this;
        this.$http.get(CxkjGetOrderDebtList300183,{params:params}).then(res=>{
          console.log(res);
          if(res.data.code == 10000){
            vm.roomBillList = res.data.pageBean.page;
            vm.totalNum = res.data.pageBean.totalNum;
          }else{
            vm.roomBillList = [];
            vm.totalNum = 0;
          }
        })
      },
      search(page){
        //接口待修改
        let params = {
          pageNum:page || 1,
          communityId:this.communityId,
        }
        if(this.debtNameKey){
          params.debtName = this.debtNameKey;
        }
        if(this.debtNumKey){
          params.debtNum = this.debtNumKey;
        }
        if(this.debtNumKey){
          params.debtNum = this.debtNumKey;
        }
        if(this.roomState != -1){
          params.debtState = this.roomState;
        }
        if(this.createStartTime){
          params.beginDate = new Date(this.createStartTime).Format("yyyy-MM-dd hh:mm:ss")
        }
        if(this.createEndTime){
          params.endDate = new Date(this.createEndTime).Format("yyyy-MM-dd hh:mm:ss")
        }

        this.getRoomBillList(params);
      },
      //提交创建哑帐按钮
      createRoomBill(){
        let vm = this;
        let param = {
          orderNum:this.orderNum,
          debtName:this.debtName,
          totalMoney:this.totalMoney,
          inTime:new Date(this.inTime).Format("yyyy-MM-dd hh:mm:ss"),
          leaveTime:new Date(this.leaveTime).Format("yyyy-MM-dd hh:mm:ss"),
          remark:this.remark,
        };
        this.$http.post(CxkjCreateOrderDebt300184,qs.stringify(param)).then(function(res){
          console.log(res);
            if(res.data.code == 10000){
                vm.closeNewBillModal();
                this.orderNum = "";
                this.debtName = "";
                this.totalMoney = "";
                this.inTime = "";
                this.leaveTime = "";
                this.remark = "";
            }
        });
      },
      /**
       * 关闭创建哑帐弹框
       */
      closeNewBillModal(){
        document.querySelector("#app").firstChild.removeChild(this.$refs.newBillModal);
        document.querySelector("#app").firstChild.removeChild(this.$refs.outBillModal);
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
  @import '../../sass/page/shortRent.scss';

  .item-margin-bottom{
    margin-bottom: 20px;
  }

  .new-bill-modal{
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.4);
    position: fixed;
    overflow: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
  }

  .new-bill-content{
    width: 800px;
    height: 420px;
    min-height:320px;
    background-color:#fff;
    border-radius: 5px;
    margin: auto;
    position: fixed;
    z-index:9999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .new-bill-content-title{
      height: 60px;
      width: 100%;
      font-size: 20px;
      color: #fff;
      background-color:rgb(53,154,240);
      text-align: center;
      line-height: 60px;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
    }
    .modal-content-meddle{
      padding: 20px;
      .form-item{
        display: inline-block;
        margin-right: 30px;
        margin-bottom: 20px;
      }
    }
    .form-btn-wrap{
      text-align: center;
    }
    .modal-close-btn{
      position: absolute;
      top: -36px;
      right: -36px;
      width: 36px;
      height: 36px;
      color: #fff;
      background-color:rgba(0,0,0,0.7) ;
      border-radius: 100%;
      text-align: center;
      font-size: 36px;
      cursor: pointer;
      i{
        position: relative;
        top: -8px;
      }
    }
  }
</style>
