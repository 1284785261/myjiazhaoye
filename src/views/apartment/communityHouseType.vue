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
              <th>操作</th>
            </tr>
            <tr v-for="(house,index) in cxkjCommunityListHousetype">
              <td>{{index+1}}</td>
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
              <td>
                <a>复制</a><a style="padding-left: 10px" @click="deleteHouse(index)">删除</a>
              </td>
            </tr>
          </table>
          <div class="add-item">
            <span>继续添加&nbsp;&nbsp;</span><input v-model="numberLine" style="width: 50px;padding-left: 15px;">&nbsp;&nbsp;行&nbsp;&nbsp;&nbsp;&nbsp;<Button @click="addHouse()">确定</Button>
          </div>
          <div class="house-type-btn">
            <Button type="primary" style="width: 130px;height: 40px" @click="createNewHouse()">确定</Button>
            <Button style="width: 130px;height: 40px; margin-left: 20px;">取消</Button>
          </div>
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
  import qs from 'qs';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        numberLine:1,
        value:"",
        cxkjCommunityListHousetype :[
          {
            "communityId":5,
            "housetypeName":"",
            "housetypeArea":23.00,
            "roomId":"",
            "housetypeHall":"",
            "housetypeHygienism":"",
            "housetypeWindow":"",
            "housetypeOrientations":""
          }
        ],
//


        rooms: [{
          value: 1,
          label: 1
        }, {
          value: 2,
          label: 2
        }, {
          value: 3,
          label: 3
        }],
        halls:[{
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
          value: '有',
          label: '有'
        }, {
          value: '无',
          label: '无'
        }],
        orientations:[{
          value: '南',
          label: '南'
        }, {
          value: '北',
          label: '北'
        }],
      }
    },
    methods:{
      deleteHouse(index){
        this.cxkjCommunityListHousetype.splice(index,1);
      },
      addHouse(){
        this.cxkjCommunityListHousetype.push({
          rootValue:"",
          resourceHouseType:"",
          resourceArea:"",
          resourceRoom:"",
          resourceHall:"",
          resourceHygienism:"",
          resourceWindow:"",
          resourceOrientations:"",
        })
      },
      createNewHouse(){
        var data = {cxkjCommunityListHousetype:this.cxkjCommunityListHousetype}
        console.log(JSON.stringify(data))
//        cxkjCommunityListHousetype[0] = this.cxkjCommunityListHousetype;
//        cxkjCommunityListHousetype = this.cxkjCommunityListHousetype;
//        this.$http.get('http://192.168.26.164:8080/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunity200001').then(function(res){
//            debugger
//        })

        this.$http.post(
          'http://192.168.26.164:8080/cxkj-room/apis/pc/cxkjcommunity/CxkjCommunityResource200006',qs.stringify(data)
        ).then(function(res){
          debugger
        }).catch(function(err){
          console.log(err);
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #house-type-management{
    height: 985px;
    /*width: 100%;*/
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

</style>
