<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">批量添加房间</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>批量添加房间</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="add-room-management">
          <div style="height: 30px;width: 100%;"></div>
          <table class="add-room-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
            <tr>
              <th>楼层</th>
              <th>房号</th>
              <th>户型与格局</th>
              <th>家用电器</th>
              <th>水表/水费</th>
              <th>电表/电费</th>
              <th>租金（元/月）</th>
              <th>操作</th>
            </tr>
            <tr v-for="(room,index) in cxkjCommunityListRoom">
              <td >
                <el-select v-model="room.floorId" filterable placeholder="请输入或选择">
                  <el-option v-for="item in floors" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td ><Input v-model="room.roomNum"  placeholder="请填写房号"></Input></td>
              <td>
                <el-select v-model="room.roomType" filterable placeholder="请输入或选择">
                  <el-option v-for="item in roomTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <a @click="editRoomFurniture(room.roomFurniture,index)">{{room.roomFurniture}}</a>
              </td>
              <td>
                <a @click="modal2=true">{{room.roomWater}}</a>
              </td>
              <td>
                <a @click="modal3=true">{{room.roomElectric}}</a>
              </td>
              <td>
                <Input v-model="room.roomRent"  placeholder="请填写租金"></Input>
              </td>
              <td>
                <a @click="copyRoom(index)">复制</a><a style="padding-left: 10px" @click="deleteRoom(index)">删除</a>
              </td>
            </tr>
          </table>
          <div class="add-item">
            <span>继续添加&nbsp;&nbsp;</span><input v-model="numberLine" type="number" max="5" min="1" step="1" style="width: 50px;padding-left: 15px;">&nbsp;&nbsp;行&nbsp;&nbsp;&nbsp;&nbsp;<Button @click="addRoom()">确定</Button>
          </div>
          <div class="house-type-btn">
            <Button type="primary" style="width: 130px;height: 40px" @click="createNewRoom()">确定</Button>
            <Button style="width: 130px;height: 40px; margin-left: 20px;">取消</Button>
          </div>

          <Modal v-model="modal3" width="500">
            <div slot="header" style="background-color:#2d8cf0;text-align:center;">
              <span>电费设置</span>
            </div>
            <div class="modal-content-meddle">
              <p style="margin-bottom: 15px"><b>电表状态 :</b><span style="padding-left: 17px;">在线</span></p>
              <div>
                <div style="display: inline-block;vertical-align: top;padding-top: 6px;"><b>计费方式 :</b></div>
                <div style="display: inline-block;padding-left: 15px;vertical-align: bottom;">
                  <Radio-group v-model="electricTypeSelect" vertical>
                    <Radio label="1">
                      <span>按用量 </span>
                    </Radio>
                    <Radio label="2">
                      <span>按合租人数 </span>
                    </Radio>
                  </Radio-group>
                </div>
                <div style="display: inline-block;">
                  <div><Input v-model="electricValue" placeholder="请填写金额" style="width: 120px"></Input><span style="padding-left:10px; ">元/度</span><br></div>
                  <div style="padding-top: 10px"><Input v-model="value" placeholder="请填写金额" style="width: 120px"></Input ><span style="padding-left:10px;">元/人</span></div>
                </div>
              </div>
            </div>
            <div slot="footer">
              <Button type="primary" size="large" style="width: 130px;height: 40px" @click="del3">确定</Button>
            </div>
          </Modal>

          <Modal v-model="modal1" width="500">
            <div slot="header" style="background-color:#2d8cf0;text-align:center;">
              <span>家用电器设置</span>
            </div>
            <div id="appliances-setting" class="modal-content-meddle">
              <table class="appliances-setting-table">
                <Checkbox-group v-model="checkBoxArr">
                  <tr>
                    <td><Checkbox label="床">床</Checkbox></td>
                    <td><Checkbox label="空调">空调</Checkbox></td>
                    <td><Checkbox label="电视机">电视机</Checkbox></td>
                  </tr>
                  <tr>
                    <td><Checkbox label="洗衣机">洗衣机</Checkbox></td>
                    <td><Checkbox label="书桌">书桌</Checkbox></td>
                    <td><Checkbox label="衣柜">衣柜</Checkbox></td>
                  </tr>
                </Checkbox-group>
              </table>
            </div>
            <div slot="footer">
              <Button type="primary" size="large" style="width: 130px;height: 40px" @click="updatetRoomFurniture()">确定</Button>
            </div>
          </Modal>

          <Modal v-model="modal2" width="500">
            <div slot="header" style="background-color:#2d8cf0;text-align:center;">
              <span>水费设置</span>
            </div>
            <div class="modal-content-meddle">
              <p style="margin-bottom: 15px"><b>水表状态 :</b><span style="padding-left: 17px;">在线</span></p>
              <div>
                <div style="display: inline-block;vertical-align: top;padding-top: 6px;"><b>计费方式 :</b></div>
                <div style="display: inline-block;padding-left: 15px;vertical-align: bottom;">
                  <Radio-group v-model="waterTypeSelect" vertical>
                    <Radio label="1">
                      <span>按用量 </span>
                    </Radio>
                    <Radio label="2">
                      <span>按合租人数 </span>
                    </Radio>
                  </Radio-group>
                </div>
                <div style="display: inline-block;">
                  <div><Input v-model="waterValue" placeholder="请填写金额" style="width: 120px"></Input><span style="padding-left:10px; ">元/m³</span><br></div>
                  <div style="padding-top: 10px"><Input v-model="value" placeholder="请填写金额" style="width: 120px"></Input ><span style="padding-left:10px;">元/人</span></div>
                </div>
              </div>
            </div>
            <div slot="footer">
              <Button type="primary" size="large" style="width: 130px;height: 40px" @click="del2">确定</Button>
            </div>
          </Modal>

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
        cxkjCommunityListRoom :[
          {
            communityId:"",
            floorId:"",
            roomNum:"",
            roomType:"",
            roomFurniture:"床 衣柜 书桌 空调 电视机 洗衣机",
            roomWater:"在线 按用量8.00元/m³",
            roomElectric:"在线 按用量2.2元/度",
            roomRent:"",
            waterType:1,
            electricType:1,
          }
        ],
        activeRoomIndex:0,
        numberLine:1,
        value:"",
        rootValue:"",
        floors: [{
          value: '1',
          label: '1'
        }, {
          value: '2',
          label: '2'
        }, {
          value: '3',
          label: '3'
        }],
        roomTypes: [{
          value: '标准大标间  1室1厅1卫 35㎡ 朝南',
          label: '标准大标间  1室1厅1卫 35㎡ 朝南'
        }, {
          value: '标准大标间  1室1厅1卫 35㎡ 朝北',
          label: '标准大标间  1室1厅1卫 35㎡ 朝北'
        }],
        checkBoxArr:[],
        modal1: false,
        modal2: false,
        modal3: false,
        modal_loading: false,
        waterTypeSelect: 1,
        waterValue:"",
        electricTypeSelect:1,
        electricValue:""
      }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      del2 () {
        this.modal2 = false;
      },
      del3 () {
        this.modal3 = false;
      },
      editRoomFurniture(furniture,index){
        this.activeRoomIndex = index;
        this.modal1=true;
        this.checkBoxArr = furniture.split(" ");

      },
      updatetRoomFurniture () {
        this.modal1 = false;
        var furnitureStr = this.checkBoxArr.join(" ");
        this.cxkjCommunityListRoom[this.activeRoomIndex].roomFurniture = furnitureStr;
      },
      addRoom(){
        for(var i =0;i<this.numberLine;i++){
          this.cxkjCommunityListRoom.push({
            communityId:"",
            floorId:"",
            roomNum:"",
            roomType:"",
            roomFurniture:"床 衣柜 书桌 空调 电视机 洗衣机",
            roomWater:"在线 按用量8.00元/m³",
            roomElectric:"在线 按用量2.2元/度",
            roomRent:"",
            waterType:1,
            electricType:1,
          })
        }
      },
      deleteRoom(index){
        this.cxkjCommunityListRoom.splice(index,1);
      },
      copyRoom(index){
        var copyObj = this.deepCopy(this.cxkjCommunityListRoom[index]);
        this.cxkjCommunityListRoom.splice(index+1,0, copyObj);
      },
      deepCopy(source){
        var result={};
        for (var key in source) {
          result[key] = typeof source[key]==='object'? deepCoyp(source[key]): source[key];
        }
        return result;
      },
      createNewRoom(){

      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #add-room-management{
    height: 985px;
    /*width: 100%;*/
    background-color: #fff;
    box-shadow: 0 3px 3px #ccc;
    .add-room-table{
      border-collapse:collapse;
      text-align: center;
      th{
        background-color: #f8f8f9;
      }
      th,td{
        border: 1px solid #ccc;
        padding: 15px 10px;
        min-width: 130px;
      }
      tr>th:first-child,tr>td:first-child{
        border-left-width: 0;
      }
      tr>td:last-child,tr>th:last-child{
        border-right-width: 0;
      }
    }

  }
  .add-item{
    margin: 20px 0 0 20px;
    text-align: left;
  }
  .house-type-btn{
    margin: 70px auto;
    text-align: center;
  }

  //弹出框源码修改
  .ivu-modal-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    .ivu-modal{
      position: relative;
      top: 0;
      .ivu-modal-content{
        .ivu-modal-close{
          right: -30px;
          top: -30px;
          .ivu-icon-ios-close-empty{
            color: #fff;
            background-color: rgba(0,0,0,0.5);
            border-radius: 100%;
            width: 30px;
            height: 30px;
          }
          .ivu-icon-ios-close-empty:before{
            position: absolute;
            left: 9px;
          }
        }
        .ivu-modal-header{
          background-color: #2d8cf0;
          height: 60px;
          color: #fff;
          font-size: 20px;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
        .ivu-modal-body{
          margin:30px 50px 10px 70px;
          text-align: left;
          .ivu-radio-group label:nth-child(2){
            padding-top: 6px;
          }
        }
        .ivu-radio-group-vertical .ivu-radio-wrapper{
            height: 40px;
        }
        .ivu-modal-footer{
          border-top: 0;
          text-align: center;
          padding-bottom: 50px;
        }
      }
    }
  }
  #appliances-setting{
    .ivu-checkbox-wrapper{
      padding-right: 30px;
    }
    .appliances-setting-table{
      margin-left: 50px;
    }
  }


</style>
