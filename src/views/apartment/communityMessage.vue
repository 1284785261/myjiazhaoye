<template>
  <div>
    <menu-box :active-tab-name="activeTabName"></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box" style="margin: 0">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link class="active" to="/apartment/communityManagement">社区管理</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>社区信息</h3>
        </div>
        <div class="message-tis">
          <table class="cops" v-if="Datas">
            <tr>
              <td>社区名称：</td>
              <td>{{ Name }}</td>
            </tr>
            <tr>
              <td>所属公司：</td>
              <td>{{ Datas.companyName }}</td>
            </tr>
            <tr>
              <td>地址：</td>
              <td>{{ sites }}</td>
            </tr>
            <tr>
              <td>坐标地址：</td>
              <td v-if="Datas.communityLongitude && Datas.communityLatitude">{{
                Datas.communityLongitude+","+Datas.communityLatitude }}
              </td>
            </tr>
            <tr>
              <td>社区类型：</td>
              <td>{{ type }}</td>
            </tr>
            <tr>
              <td>开业日期：</td>
              <td>{{Datas.communityOpeningDate | Open(Datas.communityOpeningDate)}}</td>
            </tr>
            <tr>
              <td>社区服务电话：</td>
              <td>{{Datas.communityPhone}}</td>
            </tr>
            <tr>
              <td>物业合同编号：</td>
              <td>{{Datas.communityContractNum}}</td>
            </tr>
            <tr>
              <td>租期：</td>
              <td>{{ lease }}</td>
            </tr>
            <tr>
              <td>免租期：</td>
              <td>{{ freelease }}</td>
            </tr>
            <tr v-if="Datas.propertySignDate">
              <td>物业合同签约日期：</td>
              <td>{{ Datas.propertySignDate | Open(Datas.propertySignDate)}}</td>
            </tr>
            <tr v-if="Datas.propertyContactName">
              <td>业主姓名：</td>
              <td>{{ Datas.propertyContactName }}</td>
            </tr>
            <tr v-if="Datas.propertyContactPhone">
              <td>业主联系电话：</td>
              <td>{{ Datas.propertyContactPhone }}</td>
            </tr>
            <tr v-if="Datas.propertyRent">
              <td>社区月租金：</td>
              <td>{{ Datas.propertyRent }} 元</td>
            </tr>
            <tr v-if="contract">
              <td style="vertical-align: top;">物业合同：{{contract}}</td>
              <td style="width: 500px;">

                <a v-for="(item,index) in contart" v-if="mv[index]" @click="getXML(imgPath + mv[index])"><img
                  src="../../../static/images/temp/message.png" class="mess"> {{item}}</a><br/>

              </td>
            </tr>
          </table>
          <div class="operation-box">

            <Button type="primary" @click="Complie" v-if="jurisdiction('COMMUNITY_UPDATE')">编辑</Button>

            <Button @click="gos">取消</Button>
          </div>
        </div>


      </div>
      <footer-box></footer-box>
    </div>
  </div>
</template>

<script>

  import '../../sass/style/communityMessage.css';
  import menuBox from '../../components/menuBox.vue';
  import rightHeader from '../../components/rightHeader.vue';
  import footerBox from '../../components/footerBox.vue';
  import axios from 'axios';
  import {hostTitle, imgPath} from '../api.js';
  import qs from 'qs';

  export default {
    components: {
      rightHeader,
      menuBox,
      footerBox
    },
    data() {
      return {
        activeTabName: "communityManagement",
        communityId: null,
        Datas: null,
        site: null,
        contart: [],
        Name: null,
        imgPath: '',
        mv: []
      }
    },
    mounted() {
      this.imgPath = imgPath
      this.communityId = this.$route.query.id;
      // this.communityId =sessionStorage.getItem('communityMangementId');
      this.datas();
    },
    methods: {
      gos() {
        this.$router.go(-1);
      },
      Complie: function () {
        this.$router.push({path: "/apartment/communityComplie", query: {id: this.communityId}});
      },
      datas() {
        let vm = this
        axios.post(hostTitle,
          qs.stringify({
            communityId: vm.communityId
          }))
          .then((response) => {
            console.log(response);
            if (response.status == 200 && response.data.code == 10000) {
              vm.Datas = response.data.result.community;
              vm.Name = response.data.result.community.communityName;
              if (vm.Datas.province.areaName == vm.Datas.city.areaName) {
                vm.site = vm.Datas.province.areaName + vm.Datas.district.areaName + vm.Datas.communityAddress;
              }
              else {
                vm.site = vm.Datas.province.areaName + vm.Datas.city.areaName + vm.Datas.district.areaName + vm.Datas.communityAddress;
              }
            }
          })
      },
      getXML(item) {
        window.open(item, "", "width=600,height=600");
      }
    },
    filters: {
      Open(data) {
        var date = new Date(data);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        return Y + M + D;
      }
    },
    computed: {
      sites: function () {
        return this.site;
      },
      type: function () {
        let ss = this.Datas.communityType.split(",");
        for (let i = 0; i < ss.length; i++) {
          if (ss[i] == 0 && ss.length <= 1) {
            return '公寓';
          }
          else if (ss[i] == 1 && ss.length <= 1) {
            return '办公空间'
          }
          else if (ss.length >= 2) {
            return '公寓、办公空间'
          }
        }
      },
      lease: function () {
        var date = new Date(this.Datas.communityLeaseBegin);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        var date2 = new Date(this.Datas.communityLeaseEnd);
        var U = date2.getFullYear() + '-';
        var V = (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1) + '-';
        var W = (date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate());
        return Y + M + D + ' - ' + U + V + W;
      },
      freelease: function () {
        var date = new Date(this.Datas.communityFreeLeaseBegin);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        var date2 = new Date(this.Datas.communityFreeLeaseEnd);
        var U = date2.getFullYear() + '-';
        var V = (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1) + '-';
        var W = (date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate());
        return Y + M + D + ' - ' + U + V + W;
      },
      contract: function () {
        if (this.Datas.communityContract) {
          this.mv = this.Datas.communityContract.split(',');
          for (let i = 0; i < this.mv.length; i++) {
            this.contart.push(this.mv[i].substring(this.mv[i].lastIndexOf("/") + 1, this.mv[i].length));
          }
        }

      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  @import '../../sass/page/_communityManagement.scss';
</style>
