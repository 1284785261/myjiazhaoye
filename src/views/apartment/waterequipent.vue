<template>
  <div id="waterquipent">
    <menu-box :active-tab-name="activeTabName"></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <!-- <div class="ivu-site">
                    <span>您现在的位置：工作台 > </span>
                    <router-link class="active" to="/signed/housesubscribe">用户退租</router-link>
                </div> -->
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>实时度数记录</h3>
        </div>
        <div id="waterquipents" v-if="type == 2">
          <a class="btiss" :href="href1">导出</a>
          <div>
            <table>
              <thead>
              <td>序号</td>
              <td>电表读数</td>
              <td>抄表类型</td>
              <td>记录时间</td>
              <td>操作人</td>
              </thead>
              <tr v-for="(item,index) in elevtrRecords">
                <td>{{index+1}}</td>
                <td>{{item.waterElectricityData}}</td>
                <td>{{item.chaozuotype}}</td>
                <td>{{item.createTime | time}}</td>
                <td>{{item.userName}}</td>
              </tr>
            </table>
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size=pageSize
                           layout="prev, pager, next,total,jumper" :total=totalNum>
            </el-pagination>
          </div>
        </div>
        <div id="waterquipents" v-if="type == 1">
          <a class="btiss" :href="href1">导出</a>
          <div>
            <table>
              <thead>
              <td>序号</td>
              <td>水表读数</td>
              <td>抄表类型</td>
              <td>记录时间</td>
              <td>操作人</td>
              </thead>
              <tr v-for="(item,index) in waterRecords">
                <td>{{index+1}}</td>
                <td>{{item.waterElectricityData}}</td>
                <td>{{item.chaozuotype}}</td>
                <td>{{item.createTime | time}}</td>
                <td>{{item.userName}}</td>
              </tr>
            </table>
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size=pageSize
                           layout="prev, pager, next,total,jumper" :total=totalNum>
            </el-pagination>
          </div>
        </div>
      </div>
      <footer-box></footer-box>
    </div>
  </div>
</template>

<script>
  import '../../sass/style/waterqpuipent.css';
  import menuBox from '../../components/menuBox.vue';
  import rightHeader from '../../components/rightHeader.vue';
  import footerBox from '../../components/footerBox.vue';
  import axios from 'axios';
  import {RealTimeTable200227, host} from '../api.js';
  import qs from 'qs';

  export default {
    components: {
      rightHeader,
      menuBox,
      footerBox
    },
    data() {
      let _this = this
      return {
        activeTabName: "communityManagement",
        waterRecords: null,
        elevtrRecords: null,
        roomId: '',
        type: 0,
        pageNum: 1,
        currentPage3: 1,
        pageSize: 10,
        totalNum: 1,
        href1: ''
      }
    },
    mounted() {
      this.roomId = this.$route.query.roomId;
      this.type = this.$route.query.type;
      this.datas();
    },
    filters: {
      time(val) {
        return new Date(val).Format("yyyy-MM-dd hh:mm")
      }
    },
    methods: {
      datas() {
        let param = new FormData();
        this.href1 = host + '/cxkj-room/apis/pcManager/realTime/CxkjCommunityWaterElectricityRealTimeTableDownLoad200228?';
        param.append('pageNum', this.pageNum);
        param.append('roomId', this.roomId);
        param.append('type', this.type);
        this.href1 += 'roomId=' + this.roomId + '&type=' + this.type + '&pageNum=' + this.pageNum;
        if (this.type == 2) {
          axios.post(RealTimeTable200227, param).then((res) => {
            // console.log(res);
            if (res.data.code == 10000 && res.status == 200) {
              this.elevtrRecords = res.data.entity.page;
            }
          })
        } else if (this.type == 1) {
          axios.post(RealTimeTable200227, param).then((res) => {
            // console.log(res);
            if (res.data.code == 10000 && res.status == 200) {
              this.waterRecords = res.data.entity.page;
            }
          })
        }

      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.datas();
      },
    },
    created() {

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  @import '../../sass/page/_communityManagement.scss';
</style>
