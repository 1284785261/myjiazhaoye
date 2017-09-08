<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link v-if="isEidRoom"  class="active" to="/apartment/communityManagement">编辑房间</router-link>
          <router-link v-else class="active" to="/apartment/communityManagement">批量添加房间</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3 v-if="isEidRoom"><i class="icon icon-iden"></i>编辑房间</h3>
          <h3 v-else><i class="icon icon-iden"></i>批量添加房间</h3>
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
              <th v-if="!isEidRoom">操作</th>
            </tr>
            <tr v-for="(room,index) in cxkjCommunityListRoom">
              <td >
                <el-select v-model="cacheFloorName" filterable placeholder="请输入或选择" disabled>
                  <el-option v-for="item in floors" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td ><Input v-model="room.roomNum"  placeholder="请填写房号"></Input></td>
              <td>
                <el-select v-model="room.roomType" filterable placeholder="请输入或选择">
                  <el-option v-for="item in filterRoomType" :key="item.label" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <a @click="editRoomFurniture(room.roomFurniture,index)">{{room.roomFurniture}}<span v-if="!room.roomFurniture">请选择家用电器</span></a>
              </td>
              <td>
                <p>
                  <template v-if="room.waterType==1">
                    <span>在线 </span><span>按用量 {{room.waterPrice}}元/m³</span>
                  </template>
                  <template v-else>
                    <span>在线 </span><span>按合租人数 {{room.waterPrice}}元/人</span>
                  </template>
                </p>
              </td>
              <td>
                <p>
                  <template v-if="room.electricType==1">
                    <span>在线 </span><span>按用量 {{room.energyPrice}}元/度</span>
                  </template>
                  <template v-else>
                    <span>在线 </span><span>按合租人数 {{room.energyPrice}}元/人</span>
                  </template>
                </p>
              </td>
              <td>
                <Input v-model="room.roomRent"  placeholder="请填写租金"></Input>
              </td>
              <td v-if="!isEidRoom">
                <a @click="copyRoom(index)">复制</a><a style="padding-left: 10px" @click="deleteRoom(index)">删除</a>
              </td>
            </tr>
          </table>
          <div class="add-item" v-if="!isEidRoom">
            <span>继续添加&nbsp;&nbsp;</span><input v-model="numberLine" type="number" max="5" min="1" step="1" style="width: 50px;padding-left: 15px;">&nbsp;&nbsp;行&nbsp;&nbsp;&nbsp;&nbsp;<Button @click="addRoom()">确定</Button>
          </div>
          <div class="house-type-btn">
            <Button v-if="isEidRoom"  type="primary" style="width: 130px;height: 40px" @click="updateRoom()">确定</Button>
            <Button v-else  type="primary" style="width: 130px;height: 40px" @click="createNewRoom()">确定</Button>
            <Button style="width: 130px;height: 40px; margin-left: 20px;" @click="cancleNewRoom()">取消</Button>
          </div>

          <!--<Modal v-model="modal3" width="500">-->
            <!--<div slot="header" style="background-color:#2d8cf0;text-align:center;">-->
              <!--<span>电费设置</span>-->
            <!--</div>-->
            <!--<div class="modal-content-meddle">-->
              <!--<p style="margin-bottom: 15px"><b>电表状态 :</b><span style="padding-left: 17px;">在线</span></p>-->
              <!--<div>-->
                <!--<div style="display: inline-block;vertical-align: top;padding-top: 6px;"><b>计费方式 :</b></div>-->
                <!--<div style="display: inline-block;padding-left: 15px;vertical-align: bottom;">-->
                  <!--<Radio-group v-model="electricTypeSelect" vertical>-->
                    <!--<Radio label="1">-->
                      <!--<span>按用量 </span>-->
                    <!--</Radio>-->
                    <!--<Radio label="2">-->
                      <!--<span>按合租人数 </span>-->
                    <!--</Radio>-->
                  <!--</Radio-group>-->
                <!--</div>-->
                <!--<div style="display: inline-block;">-->
                  <!--<div><Input v-model="electricValue" placeholder="请填写金额" style="width: 120px"></Input><span style="padding-left:10px; ">元/度</span><br></div>-->
                  <!--<div style="padding-top: 10px"><Input v-model="energyOfValue" placeholder="请填写金额" style="width: 120px"></Input ><span style="padding-left:10px;">元/人</span></div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div slot="footer">-->
              <!--<Button type="primary" size="large" style="width: 130px;height: 40px" @click="setElectric()">确定</Button>-->
            <!--</div>-->
          <!--</Modal>-->

          <Modal v-model="modal1" width="500" id="select-house-modal">
            <div slot="header" style="background-color:#2d8cf0;text-align:center;">
              <span>家用电器设置</span>
            </div>
            <div id="appliances-setting" class="modal-content-meddle">
              <el-checkbox-group v-model="selectListData">
                <el-checkbox v-for="select in checkBoxArr2" :label="select.dataName"></el-checkbox>
              </el-checkbox-group>
            </div>
            <div slot="footer">
              <Button type="primary" size="large" style="width: 130px;height: 40px" @click="updatetRoomFurniture()">确定</Button>
            </div>
          </Modal>

          <!--<Modal v-model="modal2" width="500">-->
            <!--<div slot="header" style="background-color:#2d8cf0;text-align:center;">-->
              <!--<span>水费设置</span>-->
            <!--</div>-->
            <!--<div class="modal-content-meddle">-->
              <!--<p style="margin-bottom: 15px"><b>水表状态 :</b><span style="padding-left: 17px;">在线</span></p>-->
              <!--<div>-->
                <!--<div style="display: inline-block;vertical-align: top;padding-top: 6px;"><b>计费方式 :</b></div>-->
                <!--<div style="display: inline-block;padding-left: 15px;vertical-align: bottom;">-->
                  <!--<Radio-group v-model="waterTypeSelect" vertical>-->
                    <!--<Radio label="1">-->
                      <!--<span>按用量 </span>-->
                    <!--</Radio>-->
                    <!--<Radio label="2">-->
                      <!--<span>按合租人数 </span>-->
                    <!--</Radio>-->
                  <!--</Radio-group>-->
                <!--</div>-->
                <!--<div style="display: inline-block;">-->
                  <!--<div><Input v-model="waterValue" placeholder="请填写金额" style="width: 120px"></Input><span style="padding-left:10px; ">元/m³</span><br></div>-->
                  <!--<div style="padding-top: 10px"><Input v-model="waterOfValue" placeholder="请填写金额" style="width: 120px"></Input ><span style="padding-left:10px;">元/人</span></div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div slot="footer">-->
              <!--<Button type="primary" size="large" style="width: 130px;height: 40px" @click="seWater()">确定</Button>-->
            <!--</div>-->
          <!--</Modal>-->

        </div>
      </div>
      <footer-box></footer-box>
    </div>

    <div class="community-room-modal" v-if="addRoomSeccess"></div>
    <div id="addroom-success-modal" v-if="addRoomSeccess">
      <div class="modal-img-wrap">
        <img src="../../../static/images/icon/house_type_success.png">
      </div>
      <p class="success-p">
        <span v-if="isEidRoom">编辑成功</span>
        <span v-else>添加成功</span>
      </p>
    </div>
  </div>

</template>

<script>
  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import {api,Housetype,SytemData,addRoom,updateRoom} from '../api.js';
  import qs from 'qs';


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
            roomFurniture:"",
            roomWater:"1000",
            roomElectric:"2000",
            roomRent:"",
            waterType:1,
            electricType:1,
            waterPrice:8,
            energyPrice:2.2
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
        addRoomSeccess:false,
        roomTypes: [],
        checkBoxArr2:[],
        checkBoxObj:{},
        selectListData:[],
        modal1: false,
        modal2: false,
        modal3: false,
        modal_loading: false,
        waterTypeSelect: 1,
        waterValue:"",//水费单价
        waterOfValue:"",//水费人头费用
        electricTypeSelect:1,//1按用量，2按人头
        electricValue:"",//电费单价
        energyOfValue:"",//电费人头费用
        isEidRoom:false,//是否为编辑房间页面
        cacheFloorId:"",//缓存楼层
        cacheCommunityId:"",//缓存社区id
        cacheFloorName:1//缓存名字
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      init(){debugger
        var to_floorName = "";
        var roomObj = this.$route.params.roomObj;
        var communityId = this.$route.params.communityId;
        var to_floorId = this.$route.params.floorId;
        this.cacheFloorName = this.$route.params.floorName;
        var floorId = "";
        if(roomObj) {//编辑跳转
          floorId = roomObj.floorId;
          this.isEidRoom = true;
          this.cacheCommunityId = roomObj.communityId;
          for (var i = 0; i < this.cxkjCommunityListRoom.length; i++) {
            this.cxkjCommunityListRoom = [{
              communityId: roomObj.communityId,
              roomId:roomObj.roomId,
              floorId: roomObj.floorId,
              roomNum: roomObj.roomNum || "",
              roomType: roomObj.roomType,
              roomFurniture: roomObj.roomFurniture || "",
              roomWater: roomObj.roomWater,
              roomElectric: roomObj.roomElectric,
              roomRent: roomObj.roomRent,
              waterType: roomObj.waterType,
              electricType: roomObj.electricType,
              waterPrice:8,
              energyPrice:2.2
            }];
          }
        } else{//批量添加
          floorId = to_floorId;
          this.cacheCommunityId = communityId;
          this.cxkjCommunityListRoom =[
            {
              communityId:"",
              floorId:"",
              roomNum:"",
              roomType:"",
              roomFurniture:"",
              roomWater:"1000",
              roomElectric:"2000",
              roomRent:"",
              waterType:1,
              electricType:1,
              waterPrice:8,
              energyPrice:2.2
            }
          ];
          for(var i =0;i<this.cxkjCommunityListRoom.length;i++){
            this.cxkjCommunityListRoom[i].communityId =communityId;
            this.cxkjCommunityListRoom[i].floorId = floorId;
          }
        }
        this.cacheFloorId = floorId;//缓存当前楼层
        this.getHouseType();
        this.getFurniture();
      },
      getRoomSource(){

      },
      //弹出编辑水费窗口
//      editWater(index){
//        this.modal2=true;
//        this.activeRoomIndex = index;
//        if(this.cxkjCommunityListRoom[this.activeRoomIndex].waterType == 1){
//          this.waterTypeSelect = 1;
//          this.waterValue = this.cxkjCommunityListRoom[this.activeRoomIndex].waterPrice;
//          this.waterOfValue = "";
//        }else{
//          this.waterTypeSelect = 2;
//          this.waterOfValue = this.cxkjCommunityListRoom[this.activeRoomIndex].waterPrice;
//          this.waterValue = "";
//        }
//      },
      //弹出编辑电费窗口
//      editElectric(index){
//        this.modal3=true;
//        this.activeRoomIndex = index;
//        if(this.cxkjCommunityListRoom[this.activeRoomIndex].electricType == 1){
//          this.electricTypeSelect = 1;
//          this.electricValue = this.cxkjCommunityListRoom[this.activeRoomIndex].energyPrice;
//          this.energyOfValue = "";
//        }else{
//          this.electricTypeSelect = 2;
//          this.energyOfValue = this.cxkjCommunityListRoom[this.activeRoomIndex].energyPrice;
//          this.electricValue = "";
//        }
//      },
      //编辑水费
//      seWater () {
//        this.modal2 = false;
//        if(this.waterTypeSelect==1){//按用量
//          this.cxkjCommunityListRoom[this.activeRoomIndex].waterType = 1;
//          this.cxkjCommunityListRoom[this.activeRoomIndex].waterPrice = this.waterValue;
//        }else{
//          this.cxkjCommunityListRoom[this.activeRoomIndex].waterType = 2;
//          this.cxkjCommunityListRoom[this.activeRoomIndex].waterPrice = this.waterOfValue;
//        }
//      },
      //编辑电费
//      setElectric () {
//        this.modal3 = false;
//        if(this.electricTypeSelect==1){//按用量
//          this.cxkjCommunityListRoom[this.activeRoomIndex].electricType = 1;
//          this.cxkjCommunityListRoom[this.activeRoomIndex].energyPrice = this.electricValue;
//        }else{
//          this.cxkjCommunityListRoom[this.activeRoomIndex].electricType = 2;
//          this.cxkjCommunityListRoom[this.activeRoomIndex].energyPrice = this.energyOfValue;
//        }
//      },
      editRoomFurniture(furniture,index){
        this.activeRoomIndex = index;
        this.modal1=true;
        this.selectListData = furniture.split(" ");
      },
      updatetRoomFurniture () {
        this.modal1 = false;
        this.cxkjCommunityListRoom[this.activeRoomIndex].roomFurniture = this.selectListData.join(" ");
      },
      getHouseType(){
          var that = this;
        this.$http.post(
          Housetype,qs.stringify({communityId:this.cacheCommunityId})
        ).then(function(res){
          that.roomTypes = res.data.entity;
          console.log(that.roomTypes)
        }).catch(function(err){
          console.log(err);
        })
      },
      getFurniture(){
        var that = this;
        this.$http.post(SytemData,qs.stringify({parentId:19})).then(function(res){
          that.checkBoxArr2 = res.data.entity;
          for(var i =0;i<that.checkBoxArr2.length;i++){
            that.checkBoxObj[that.checkBoxArr2[i].dataName] = that.checkBoxArr2[i].dataId;
          }
        }).catch(function(err){
          console.log(err);
        })
      },
      addRoom(){
        var that = this;
        for(var i =0;i<this.numberLine;i++){
          this.cxkjCommunityListRoom.push({
            communityId:"",
            floorId:that.cacheFloorId,
            roomNum:"",
            roomType:"",
            roomFurniture:"",
            roomWater:"1000",
            roomElectric:"2000",
            roomRent:"",
            waterType:1,
            electricType:1,
            waterPrice:8,
            energyPrice:2.2,
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
      cancleNewRoom(){
        window.history.go(-1);
      },
      createNewRoom(){
        var that = this;
        for(var i =0;i<this.cxkjCommunityListRoom.length;i++){
          var roomFurniture = this.cxkjCommunityListRoom[i].roomFurniture.trim();
          var furnitureArr = roomFurniture.split(" ");
          var dataArr = [];
          for(var j =0;j<furnitureArr.length;j++){
            dataArr.push(this.checkBoxObj[furnitureArr[j]]+"");
          }
          if(dataArr.length){
            this.cxkjCommunityListRoom[i].roomFurniture = dataArr.join(",");
          }else{
            this.cxkjCommunityListRoom[i].roomFurniture = "";
          }
        }
        this.$http.post(addRoom,{cxkjCommunityListRoom:this.cxkjCommunityListRoom}).then(function(res){
//          that.init();
          that.addRoomSeccess = true;
          setTimeout(function(){
            that.addRoomSeccess = false;
            history.go(-1);
          },1500)
        }).catch(function(err){
          console.log(err);
        })
      },
      updateRoom(){
        var that = this;
        for(var i =0;i<this.cxkjCommunityListRoom.length;i++){
          var roomFurniture = this.cxkjCommunityListRoom[i].roomFurniture.trim();
          var furnitureArr = roomFurniture.split(" ");
          var dataArr = [];
          for(var j =0;j<furnitureArr.length;j++){
            dataArr.push(this.checkBoxObj[furnitureArr[j]]+"");
          }
          if(dataArr.length){
            this.cxkjCommunityListRoom[i].roomFurniture = dataArr.join(",");
          }else{
            this.cxkjCommunityListRoom[i].roomFurniture = "";
          }
        }
        this.$http.post(updateRoom,{cxkjCommunityListRoom:this.cxkjCommunityListRoom}).then(function(res){
          that.addRoomSeccess = true;
          setTimeout(function(){
            that.addRoomSeccess = false;
            history.go(-1);
          },1500)
        }).catch(function(err){
          console.log(err);
        })
      }
    },
    computed:{
      filterRoomType:function(){
        var filterroomTypes = [];
        if(this.roomTypes){
          for(var i =0;i<this.roomTypes.length;i++){
            var houseType = this.roomTypes[i];
            var typeObj = {};
            var houseTypeStr = houseType.housetypeName + " " + houseType.housetypeArea + "㎡ "  + houseType.roomId +"室" + houseType.housetypeHall+"厅"
              + houseType.housetypeHygienism +"卫 "+  houseType.housetypeWindow + " " +  houseType.housetypeOrientations;
            typeObj.value = houseType.housetypeId;
            typeObj.label = houseTypeStr;
            filterroomTypes.push(typeObj)
          }
        }
        return filterroomTypes;
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

  #select-house-modal{
    height: 280px;
    width: 500px;
    .modal-content-meddle{
      height: 120px;
      width: 100%;
      .el-checkbox-group{
        width: 270px;
        margin: 0 auto;
        padding-top: 40px;
        .el-checkbox{
          margin-left: 0!important;
          width: 90px;
          padding-bottom: 10px;
        }
      }
    }
  }

  #addroom-success-modal{
    width: 240px;
    height: 160px;
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

  .community-room-modal{
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

  #addroom-success-modal{
    width:280px;
    height:180px;
    background-color:#fff;
    border-radius: 5px;
    margin: auto;
    position: fixed;
    z-index:9999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .modal-img-wrap{
      height: 80px;
      width: 100%;
      text-align: center;
      img{
        margin-top: 30px;
      }
    }
    .success-p{
      text-align: center;
      padding-top: 15px;
      font-size: 18px;
    }
    .modal-btn{
      text-align: center;
      button{
        width: 90px;
        height: 30px;
        margin-top: 20px;
      }
    }
  }



</style>
