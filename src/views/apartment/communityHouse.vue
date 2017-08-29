<template>

  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link class="active" to="/apartment/communityManagement">社区管理>公寓</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>社区资源</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div class="message-tis">
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="公寓(1000)" name="first">
              <div class="house_hu">
                <router-link to="apartment/communityHouseType" class="hux">管理户型</router-link>
                <a href="#" class="adds">添加楼层</a>
              </div>
              <div class="ls">
                <div class="lishi" v-for="floorData in filterRootData">
                  <div class="house_xq">
                    <img src="../../../static/images/temp/logo2_03.png">
                    <a href="#" class="ceng">{{floorData.floorId}}层</a>
                    <a href="#" class="del">删除楼层</a>
                    <a href="#" class="isste">快速复制楼层</a>
                    <router-link to="/apartment/communityAddRoom" class="adda">批量添加房间</router-link>
                  </div>
                  <div class="house_xqb">
                    <el-table
                      :data="floorData.cxkjCommunityListRoom"
                      border
                      style="width: 100%">
                      <el-table-column
                        prop="roomNum"
                        label="房间"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="houseTypeStr"
                        label="户型"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="roomFurniture"
                        label="家具电器">
                      </el-table-column>
                      <el-table-column
                        prop="roomRent"
                        label="租金(元/月)">
                      </el-table-column>
                      <el-table-column
                        prop="waterTypeStr"
                        label="水表/水费">
                      </el-table-column>
                      <el-table-column
                        prop="electricTypeStr"
                        label="电表/电费">
                      </el-table-column>
                      <el-table-column
                        prop="open"
                        label="智能门锁">
                      </el-table-column>
                      <el-table-column
                        prop="stateStr"
                        label="状态">
                      </el-table-column>
                      <el-table-column
                        label="操作">
                        <template scope="scope">
                          <el-button @click="handleClick" type="text" size="small">编辑</el-button>
                          <el-button type="text" size="small">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="开放工位" name="second">
              <ul>
                <li>
                  <span>开放工位：</span><input v-model="placeNum" type="text" placeholder="请输入开放工位数"/><span>个</span>
                </li>
                <li>
                  <span>工位租金：</span><input v-model="placeRent" type="text" placeholder="请输入工位租金"/><span>元/天</span>
                </li>
              </ul>
              <a href="javascript:;" class="confirm2" @click="addCommunityPlace()">确定</a>
              <a href="javascript:;" class="call">取消</a>
            </el-tab-pane>
            <el-tab-pane label="办公室" name="third">
              <table class="bgs">
                <thead>
                <tr>
                  <td>门牌号</td>
                  <td>工位数</td>
                  <td>租金(元/月)</td>
                  <td>操作</td>
                </tr>
                </thead>
                <tr class="mps" v-for="(office,index) in CommunityListOffice">
                  <td>
                    <input type="text" v-model="office.officeHouseNum" placeholder="请输入门牌号">
                  </td>
                  <td>
                    <input type="text" v-model="office.officeWorkNum"  placeholder="请输入工位数">
                  </td>
                  <td>
                    <input type="text" v-model="office.officeRent"  placeholder="请输入租金">
                  </td>
                  <td>
                    <a href="javascript:;" @click="deleteOffice(index)">删除</a>
                  </td>
                </tr>
                <tr class="add_a">
                  <td width="25% " colspan="4">
                    <span>继续添加</span><input type="text" v-model="newRowNum" value="1"/> <span>行</span><a href="javascript:;" @click="addOffice()">确定</a>
                  </td>
                </tr>
              </table>
              <a class="qd" href="javascript:;" @click="addCommunityOffice()">确定</a>
              <a class="qx" href="#">取消</a>
            </el-tab-pane>
            <el-tab-pane label="会议室" name="fourth">
              <table class="bgs">
                <thead>
                <tr>
                  <td>门牌号</td>
                  <td>人数</td>
                  <td>租金(元/小时)</td>
                  <td>操作</td>
                </tr>
                </thead>
                <tr class="mps" v-for="(meeting,index) in CommunityListMeeting">
                  <td>
                    <input type="text" v-model="meeting.meetingHouseNum" placeholder="请输入门牌号">
                  </td>
                  <td>
                    <input type="text" v-model="meeting.meetingPersonNum" placeholder="请输入人数">
                  </td>
                  <td>
                    <input type="text" v-model="meeting.meetingRent" placeholder="请输入租金">
                  </td>
                  <td>
                    <a href="javascript:;" @click="deleteMeeting(index)">删除</a>
                  </td>
                </tr>
                <tr class="add_a">
                  <td width="25% " colspan="4">
                    <span>继续添加</span><input type="text" v-model="newMeetingRoeNum" value="1"/> <span>行</span><a href="javascript:;" @click="addMeeting()">确定</a>
                  </td>
                </tr>
              </table>
              <a class="qd" href="javascript:;" @click="addCommunityMeeting()">确定</a>
              <a class="qx" href="javascript:;">取消</a>
            </el-tab-pane>
          </el-tabs>

        </div>
      </div>
      <footer-box></footer-box>
    </div>
  </div>
</template>

<script>

  import '../../sass/style/communityHouse.css';
  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import api from '../api.js';
  import qs from 'qs'

  export default{
    components: {
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return {
        activeName2: 'first',
        CommunityListRoom: [],
        rootData:[],
        placeNum:"",
        placeRent:"",
        newRowNum:1,
        newMeetingRoeNum:1,
        CommunityListOffice:[],
       CommunityListMeeting:[]
      }
    },
    mounted(){
      this.getCommunityListRoom();
      this.init();
    },
    computed:{
      filterRootData:function(){
          if(this.rootData.length>0){
            for(var i =0;i<this.rootData.length;i++){
              for(var j = 0;j<this.rootData[i].cxkjCommunityListRoom.length;j++){
                var room = this.rootData[i].cxkjCommunityListRoom[j];
                var houseType = room.cxkjCommunityHousetype;

                if(houseType){
                  var houseTypeStr = houseType.housetypeName + " " + houseType.housetypeArea + "㎡ "  + houseType.roomId +"室" + houseType.housetypeHall+"厅"
                    + houseType.housetypeHygienism +"卫 "+  houseType.housetypeWindow + " " +  houseType.housetypeOrientations;
                  this.rootData[i].cxkjCommunityListRoom[j].houseTypeStr = houseTypeStr;
                }
                var waterTypeStr ="在线 " + (room.waterType == 1?"按量计费":"按人计费");
                this.rootData[i].cxkjCommunityListRoom[j].waterTypeStr = waterTypeStr;
                var electricTypeStr ="在线 " + (room.electricType == 1?"按量计费":"按人计费");
                this.rootData[i].cxkjCommunityListRoom[j].electricTypeStr = electricTypeStr;
                var stateStr = room.state == 0?"配置中":room.state == 1?"待出租":" 已出租";
                this.rootData[i].cxkjCommunityListRoom[j].stateStr = stateStr;
                room.roomRent = room.roomRent.toFixed(2);
              }
            }
          }
          return this.rootData;
      }
    },
    methods: {
      init(){
        this.CommunityListOffice = [];
        this.CommunityListMeeting = [];
          for(var i=0;i<3;i++){
            this.CommunityListOffice.push({
              communityId:3,
              officeHouseNum:"",
              officeWorkNum:"",
              officeRent:""
            });
            this.CommunityListMeeting.push({
              communityId:3,
              meetingHouseNum:"",
              meetingPersonNum:"",
              meetingRent:""
            });
          }
      },
      handleClick(tab, event){
        //this.$router.push({path:"/apartment/communityRoom"});
        console.log(tab, event);
      },
      getCommunityListRoom(){
          var that = this;
        this.$http.post("http://115.29.138.230:8080/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityApartment200005", qs.stringify({"communityId": 3}))
          .then(function (res) {
            if(res.status == 200 && res.statusText=="OK"){
              that.rootData = res.data.result.communityData;
              console.log(that.rootData)
            }else{

            }
          }).catch(function(error){
          console.log(error);
        })
      },
      addCommunityPlace(){
          var that = this;
        var data = {
          communityId : 3,
          placeNum: this.placeNum,
          placeRent:this.placeRent
        };
        this.$http.post("http://115.29.138.230:8080/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityPlace200008", qs.stringify(data))
          .then(function (res) {
            console.log("添加工位成功！")
            that.placeNum = "";
            that.placeRent = "";
          }).catch(function(error){
          console.log(error);
        })
      },
      deleteOffice(index){
        this.CommunityListOffice.splice(index,1);
      },
      addOffice(){
        for(var i=0;i<this.newRowNum;i++){
          this.CommunityListOffice.push({
            communityId:3,
            officeHouseNum:"",
            officeWorkNum:"",
            officeRent:""
          });
        }
      },
      addCommunityOffice(){
        var that = this;
        this.$http.post("http://115.29.138.230:8080/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityOffice200009", {cxkjCommunityListOffice:this.CommunityListOffice})
          .then(function (res) {
            console.log("添加办公室成功！")
            that.init();
          }).catch(function(error){
          console.log(error);
        })
      },
      deleteMeeting(index){
        this.CommunityListMeeting.splice(index,1);
      },
      addMeeting(){
        for(var i=0;i<this.newMeetingRoeNum;i++){
          this.CommunityListMeeting.push({
            communityId:3,
            meetingHouseNum:"",
            meetingPersonNum:"",
            meetingRent:""
          });
        }
      },
      addCommunityMeeting(){
        var that = this;
        this.$http.post("http://115.29.138.230:8080/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityMeeting200010", {cxkjCommunityListMeeting:this.CommunityListMeeting})
          .then(function (res) {
            console.log("添加会议室成功！")
            that.init();
          }).catch(function(error){
          console.log(error);
        })
      },
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

</style>
