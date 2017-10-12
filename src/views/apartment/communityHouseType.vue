<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：社区管理></span>
          <router-link  class="active" to="/apartment/communityManagement">管理户型</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>管理户型</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="house-type-management">
          <div style="height: 30px;width: 100%;"></div>
          <table class="house-type-table" border="0.5" bordercolor="#ccc" cellspacing="0" width="100%">
            <tr>
              <th>序号</th>
              <th>户型</th>
              <th>面积(m³)</th>
              <th>室</th>
              <th>厅</th>
              <th>卫</th>
              <th>窗</th>
              <th>朝向</th>
              <th style="width: 120px;">操作</th>
            </tr>
            <tr v-for="(house,index) in cxkjCommunityListHousetype">
              <td style="width: 50px">{{index+1}}</td>
              <td ><Input v-model="house.housetypeName"  placeholder="请填写户型名称"></Input></td>
              <td ><Input v-model="house.housetypeArea"  placeholder="请填写面积"></Input></td>
              <td>
                <el-select v-model="house.roomId" filterable placeholder="请输入或选择">
                  <el-option v-for="item in rooms" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="house.housetypeHall" filterable placeholder="请输入或选择">
                  <el-option v-for="item in halls" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="house.housetypeHygienism" filterable placeholder="请输入或选择">
                  <el-option v-for="item in hygienisms" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="house.housetypeWindow" filterable placeholder="请输入或选择">
                  <el-option v-for="item in windows" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="house.housetypeOrientations" filterable placeholder="请输入或选择">
                  <el-option v-for="item in orientations" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </td>
              <td style="width: 120px;">
                <a @click="copyHouse(index)">复制</a><a style="padding-left: 10px" @click="deleteHouse(index)">删除</a>
              </td>
            </tr>
          </table>
          <div class="add-item">
            <span>继续添加&nbsp;&nbsp;</span><input v-model="numberLine" style="width: 50px;padding-left: 15px;">&nbsp;&nbsp;行&nbsp;&nbsp;&nbsp;&nbsp;<Button @click="addHouse()">确定</Button>
          </div>
          <div class="house-type-btn">
            <Button type="primary" style="width: 130px;height: 40px" @click="createNewHouse()">确定</Button>
            <Button style="width: 130px;height: 40px; margin-left: 20px;" @click="back()">取消</Button>
          </div>
        </div>
      </div>
      <footer-box></footer-box>
    </div>
    <warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
    <success-modal :success-message="successMessage" v-if="successModal"></success-modal>
  </div>
</template>

<script>
  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import  successModal from '../../components/successModal.vue';
  import  warningModal from '../../components/warningModal.vue';
  import {addHouseType,Housetype,deleteHouseType} from '../api.js';
  import qs from 'qs';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox,
      successModal,
      warningModal
    },
    mounted:function () {
      this.communityId = this.$route.query.communityId;
      this.cxkjCommunityListHousetype = [
        {
          communityId:this.communityId,
          housetypeName:"",
          housetypeArea:"",
          roomId:"",
          housetypeHall:"",
          housetypeHygienism:"",
          housetypeWindow:"",
          housetypeOrientations:""
        }
      ];
      this.getHouseType();
    },
    data(){
      return{
        numberLine:1,
        value:"",
        cxkjCommunityListHousetype :[],
        rooms: [{
          value: 1,
          label: 1
        }, {
          value: 2,
          label: 2
        }, {
          value: 3,
          label: 3
        }, {
          value: 4,
          label: 4
        }],
        halls:[{
          value: 0,
          label: 0
        },{
          value: 1,
          label: 1
        }, {
          value: 2,
          label: 2
        }, {
          value: 3,
          label: 3
        }],
        hygienisms:[{
          value: 0,
          label: 0
        },{
          value: 1,
          label: 1
        }, {
          value: 2,
          label: 2
        }, {
          value: 3,
          label: 3
        }],
        windows:[{
          value: '有窗',
          label: '有窗'
        }, {
          value: '无窗',
          label: '无窗'
        }],
        orientations:[{
          value: '朝南',
          label: '朝南'
        }, {
          value: '朝北',
          label: '朝北'
        }],
        successModal:false,
        successMessage:"户型创建成功！",
        warningModal:false,
        warningMessage:"信息填写不完整，请填写完整后重新提交！"
      }
    },
    methods:{
      init(){

      },
      getHouseType(){
        var that = this;
        this.$http.post(
          Housetype,qs.stringify({communityId:this.communityId})
        ).then(function(res){
          if(res.data.code == 10000){
            that.cxkjCommunityListHousetype = res.data.entity;
          }else if(res.data.code == 10004){

          }
        }).catch(function(err){
          console.log(err);
        })
      },
      deleteHouse(index){
        var that = this;
        if(this.cxkjCommunityListHousetype[index].housetypeId){
          this.$http.post(deleteHouseType,qs.stringify({housetypeId:this.cxkjCommunityListHousetype[index].housetypeId})).then(function(res){debugger
            if(res.data.code == 10000){
              that.cxkjCommunityListHousetype.splice(index,1);
              that.successMessage = "删除户型成功!";
              that.successModal = true;
              setTimeout(function(){
                that.successModal = false;
              },1000)
            }
          }).catch(function(err){
            console.log(err);
          })
        }else{
          this.cxkjCommunityListHousetype.splice(index,1);
        }
      },
      addHouse(){
        this.cxkjCommunityListHousetype.push({
          communityId:this.communityId,
          housetypeName:"",
          housetypeArea:"",
          roomId:"",
          housetypeHall:"",
          housetypeHygienism:"",
          housetypeWindow:"",
          housetypeOrientations:""
        })
      },
      copyHouse(index){
        var copyObj = this.deepCopy(this.cxkjCommunityListHousetype[index]);
        this.cxkjCommunityListHousetype.splice(index+1,0, copyObj);
      },
      deepCopy(source){
        var result={};
        for (var key in source) {
          if(key == "housetypeId"){
            result[key] = null;
          }else{
            result[key] = typeof source[key]==='object'? deepCoyp(source[key]): source[key];
          }
        }
        return result;
      },
      createNewHouse(){
        var that = this;
        var data = [].concat(this.cxkjCommunityListHousetype);
        for(var j =0;j<data.length;j++){
            for(var key in data[j]){
                if(data[j][key]===""){
                  that.warningModal = true;
                  return;
                }
            }
        }debugger
        this.$http.post(
          addHouseType,{cxkjCommunityListHousetype:data}
        ).then(function(res){debugger
            that.successMessage = "编辑户型成功!";
            that.successModal = true;
            setTimeout(function(){
                that.successModal = false;
                history.go(-1);
            },1000)
        }).catch(function(err){
          console.log(err);
        })
      },
      closeWarningModal(){
        this.warningModal = false;
      },
      back(){
        window.history.go(-1);
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #house-type-management{
    min-height: 1000px;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 3px 3px #ccc;
    .house-type-table{
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

  #houseType-success-modal{
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

  .community-housetype-modal{
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

  #houseType-success-modal{
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
