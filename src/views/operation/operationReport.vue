<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div id="operation-report-wrap">
            <Tabs type="card">
                <Tab-pane label="日报">
                  <operation-Day-Report></operation-Day-Report>
                </Tab-pane>
                <Tab-pane label="周报">
                  <operation-Month-Report></operation-Month-Report>
                </Tab-pane>
                <Tab-pane label="月报">
                  <invite-Record></invite-Record>
                </Tab-pane>
            </Tabs>
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
  import operationDayReport from '../../views/operation/operationDayReport.vue';
  import operationMonthReport from '../../views/operation/operationMonthReport.vue';
  import inviteRecord from '../../views/operation/inviteRecord.vue';
  import qs from 'qs';
  import {} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox,
      operationDayReport,
      operationMonthReport,
      inviteRecord
    },
    data(){
      return{
      }
    },
    mounted(){
      this.userId = this.$route.query.id;
    },
    methods:{
      goToDay(){
          this.$router.push({name:"operationDayReport"})
      },
      goToMonth(){
          this.$router.push({name:"operationMonthReport"})
      },
      goToInvite(){
          this.$router.push({name:"inviteRecord"})
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #operation-report-wrap {
    padding-bottom: 50px;
    width: 100%;
    min-height: 1000px;
    .operation-report-content-wrap{
      height: 180px;
      width: 100%;
      background-color: #fff;
      box-shadow: 0 3px 1px #ccc;
      .report-item{
        height: 100%;
        width: 33.33%;
        display: inline-block;
        float: left;
        .img-content-wrap{
          margin: 40px auto;
          height: 100px;
          width: 320px;
          text-align: center;
          padding-top: 25px;
          cursor: pointer;
          span{
            color: #038be2;
            font-size: 22px;
            font-weight: 500;
            // padding-left: 40px;
          }
        }
        .img-content-wrap:hover{
          border: solid 1px #038be2;
          border-radius: 10px;
        }
      }
    }
    .report-center-wrap{
      height: 820px;
      width: 100%;
      margin-top: 20px;
      background-color: #fff;
      box-shadow: 0 3px 1px #ccc;
      img{
        display: block;
        margin: 0 auto;
        padding-top: 150px;
      }
    }
    .el-tabs__item{
      width: 120px;
      text-align: center;
    }
    .el-tab-pane{
      min-height: 500px;
    }
  }

</style>
