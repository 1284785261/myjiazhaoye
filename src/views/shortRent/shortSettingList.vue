<template>
  <div class="shortOrderListClass">
    <div>
      <div class="form-item">
        <b>社区：</b>
        <Select v-model="stationCommunity" style="width:180px">
          <Option v-for="community in  stationSelectList" :value="community.communityId"
                  :key="community.communityId">{{ community.communityName }}
          </Option>
        </Select>
      </div>
      <div class="form-item">
        <b>社区长租名称：</b>
        <Input style="width: 225px;"></Input>
      </div>
      <div class="form-item">
        <Button type="primary" style="width: 120px;height: 36px;" @click="" >查询</Button>
      </div>
      <div class="form-item ">
        <Button type="primary" style="width: 120px;height: 36px;" @click="goToNewShort" >新增</Button>
      </div>
    </div>
    <div class="tableDiv">
      <table class="table ivu-table" >
        <tr>
          <th>社区名称</th>
          <th>长租房名称</th>
          <th>短租房名称</th>
          <th>公寓设施</th>
          <th>服务说明</th>
          <th>房间信息</th>
          <th>操作</th>
        </tr>
        <tr >
          <td>已入住</td>
          <td>123456</td>
          <td>李杨</td>
          <td>13651412541</td>
          <td>标准大床房</td>
          <td>10003</td>
          <td>
            <a>删除</a>
            <a>编辑</a>
            <a>图片上传</a>
          </td>
        </tr>
      </table>
      <div class="block">
        <el-pagination @current-change="handleCurrentChange3" :current-page="pageNum" :page-size="10" layout=" prev, pager, next, total,jumper" :total=totalNum>
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
          <Input style="width: 175px;"></Input>
        </div>
        <div class="form-item">
          <b>名称: </b>
          <Input style="width: 175px;"></Input>
        </div>
        <div class="form-item">
          <b>欠款: </b>
          <Input style="width: 175px;"></Input>
        </div>
        <div class="form-item">
          <b>入住时间：</b>
          <Date-picker type="date" :options="createStartTimeOption" placeholder="选择日期" v-model="createStartTime1"></Date-picker>
        </div>
        <div class="form-item">
          <b>离店时间: </b>
          <Date-picker type="date" :options="createEndTimeOption" placeholder="选择日期" v-model="createEndTime1"></Date-picker>
        </div>
        <div class="form-item">
          <b style="position: relative;top: -80px;">备注: </b>
          <textarea style="width: 680px;height:100px;resize: none;margin-left: 5px;" ></textarea>
        </div>
      </div>
      <div class="form-btn-wrap">
        <Button type="primary" style="width: 120px;height: 36px;margin-right: 150px;" @click="closeNewBillModal" >提交</Button>
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
  import {} from '../api.js';
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
        stationSelectList:[],//社区列表
        stationCommunity:'',//被选中的社区



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
        payStartTimeOption: {//付账开始时间验证
          disabledDate(date){
            if(_this.payEndTime){
              return date &&  _this.payEndTime < date.valueOf();
            }
          }
        },
        payEndTimeOption: {//付账结束时间验证
          disabledDate(date){
            return date && date.valueOf() < _this.payStartTime;
          }
        },
        newBillModal:false,
      }
    },
    mounted() {

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
      /**
       * 关闭创建哑帐弹框
       */
      closeNewBillModal(){
        document.querySelector("#app").firstChild.removeChild(this.$refs.newBillModal);
        document.querySelector("#app").firstChild.removeChild(this.$refs.outBillModal);
      },
      goToNewShort(){
          this.$router.push({name:"newShortSetting"})
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  @import '../../sass/page/shortRent.scss';

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
