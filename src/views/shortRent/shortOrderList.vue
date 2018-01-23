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
                入住率：
            </div>
            <div class="form-item">
                总房数/已订房：
            </div>
        </div>
        <div class="marginT30">
            <div class="rentTypeBox" >
                <div class="rentTypeTitle">标准大单间</div>
                <div class="rentTypeMain">
                    <ul>
                        <li>已订/入住：10/6</li>
                        <li>剩余：3</li>
                    </ul>
                    <i></i>
                    <p>创建订单</p>
                </div>
            </div>
            <div class="rentTypeBox" >
                <div class="rentTypeTitle">豪华大床房</div>
                <div class="rentTypeMain">
                    <ul>
                        <li>已订/入住：10/6</li>
                        <li>剩余：3</li>
                    </ul>
                    <i></i>
                    <p>创建订单</p>
                </div>
            </div>
        </div>
        <div class="">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="1">全部 <i v-if="!selectShow" class="el-icon-caret-bottom" style="color: #97A8BE"></i><i class="el-icon-caret-top" v-if="selectShow"></i></el-menu-item>
                <el-submenu index="2">
                    <template slot="title">今日预抵</template>
                    <el-menu-item index="2-1">全部</el-menu-item>
                    <el-menu-item index="2-2">待排房</el-menu-item>
                    <el-menu-item index="2-3">已排房</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">明日预抵</template>
                    <el-menu-item index="3-1">全部</el-menu-item>
                    <el-menu-item index="3-2">待排房</el-menu-item>
                    <el-menu-item index="3-3">已排房</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">待入住</template>
                    <el-menu-item index="4-1">全部</el-menu-item>
                    <el-menu-item index="4-2">待排房</el-menu-item>
                    <el-menu-item index="4-3">已排房</el-menu-item>
                </el-submenu>
                <el-menu-item index="5">已入住</el-menu-item>
                <el-menu-item index="6">已取消</el-menu-item>
                <el-menu-item index="7">NoShow</el-menu-item>
            </el-menu>
        </div>
        <div v-if="selectShow" class="selectShowClass">

            <ul class="dateUl">
                <li>
                    <span>预订起止时间：</span>
                    <Date-picker type="date" :options="option6" placeholder="选择日期" v-model="refundHandStartDate"></Date-picker>
                    <span class="inline-block spanBar">--</span>
                    <Date-picker type="date" :options="option3" placeholder="选择日期" v-model="refundHandEndDate"></Date-picker>
                </li>
                <li>
                    <span>到店起止时间：</span>
                    <Date-picker type="date" :options="option6" placeholder="选择日期" v-model="refundHandStartDate"></Date-picker>
                    <span class="inline-block spanBar">--</span>
                    <Date-picker type="date" :options="option3" placeholder="选择日期" v-model="refundHandEndDate"></Date-picker>
                </li>
                <li>
                    <span>离店起止时间：</span>
                    <Date-picker type="date" :options="option6" placeholder="选择日期" v-model="refundHandStartDate"></Date-picker>
                    <span class="inline-block spanBar">--</span>
                    <Date-picker type="date" :options="option3" placeholder="选择日期" v-model="refundHandEndDate"></Date-picker>
                </li>
            </ul>
            <ul class="selectUl">
                <li>
                    <span>房型：</span>
                    <input v-model="refundHandSearchKey">
                </li>
                <li>
                    <span>房号：</span>
                    <input v-model="refundHandSearchKey">
                </li>
                <li>
                    <span>入住人手机号：</span>
                    <input v-model="refundHandSearchKey">
                </li>
            </ul>
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
      return {
        activeTabName: "shortRent",
        successModal: false,
        warningModal: false,
        successMessage: '添加部门成功',
        warningMessage: '添加部门失败，请检查是否重复',
        selectShow:true,//条件查询显示或隐藏
        rentTypeList:[//模拟房间类型数据
//          {
//            rentTypeName:'标准大床房',
//            rentType
//          }
        ]
      }
    },
    mounted() {

    },
    methods: {},
  }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../sass/base/_mixin.scss';
    @import '../../sass/base/_public.scss';
    @import '../../sass/page/shortRent.scss';
</style>