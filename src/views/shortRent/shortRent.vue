<template>
    <div>
        <menu-box></menu-box>
        <div class="right-content" id="right-content">
            <right-header></right-header>
            <div class="wordbench-box">
                <Tabs type="card" v-model="activeName" @on-click="changeTab">
                    <Tab-pane label="社区房间状态" name="short-term-item">
                        <div class="message-tim" v-if="activeName == 'short-term-item'">
                          <short-term-item></short-term-item>
                        </div>
                    </Tab-pane>
                    <Tab-pane label="社区短租配置" name="short-setting-list">
                        <div class="message-tim">
                          <short-setting-list @successUpload ="successUpload"></short-setting-list>
                        </div>
                    </Tab-pane>
                    <Tab-pane label="价格设置" name="short-price-set">
                        <div class="message-tim">
                            <short-price-set ref="price" @setPrice="setPrice"></short-price-set>
                        </div>
                    </Tab-pane>
                     <Tab-pane label="产品日历" name="short-product-calendar">
                        <div class="message-tim">
                            <short-product-calendar ref="cliskm" @clisk="clisk"></short-product-calendar>
                        </div>
                    </Tab-pane>
                    <Tab-pane label="入住列表" name="short-stay-list">
                        <div class="message-tim">
                            <short-stay-list @checkdetails = "checkdetails"></short-stay-list>
                        </div>
                    </Tab-pane>
                    <Tab-pane label="订单列表" name="short-order-list">
                        <div class="message-tim">
                            <div class="finance-header-kong">
                                <short-order-list @openWarningModal="openWarningModal"></short-order-list>
                            </div>
                        </div>
                    </Tab-pane>
                    <Tab-pane label="哑房账" name="short-Room-Bill-list">
                        <div class="message-tim">
                            <short-Room-Bill-list @openWarningModal="openWarningModal"></short-Room-Bill-list>
                        </div>
                    </Tab-pane>
                </Tabs>
            </div>
            <footer-box></footer-box>
        </div>
        <div class="scherm" v-show="isHide"></div>
        <div class="setmeal" v-show="isHide">
            <p>设置</p>
            <i class="el-icon-circle-close" @click="coloseSet"></i>
            <span class="state">开始时间：</span><Date-picker type="date" placeholder="请选择日期" v-model="stateDatas" disabled></Date-picker>
            <span class="out">结束时间：</span><Date-picker type="date" placeholder="请选择日期" v-model="endDatas" disabled></Date-picker>

            <el-checkbox-group v-model="checkList" @change="allcheckList(checkList)">
                <span style="margin-left:10px;line-height: 38px;">开始时间：</span>
                <el-checkbox label="日"></el-checkbox>
                <el-checkbox label="一"></el-checkbox>
                <el-checkbox label="二"></el-checkbox>
                <el-checkbox label="三"></el-checkbox>
                <el-checkbox label="四"></el-checkbox>
                <el-checkbox label="五"></el-checkbox>
                <el-checkbox label="六"></el-checkbox>

            </el-checkbox-group>
            <Checkbox v-model="single" @click.prevent.native="handleCheckAll2" class="all">全选</Checkbox>
            <div class="form-item">
                <b>套系名称：</b>
                <Select v-model="codes" style="width:90px">
                    <Option v-for="code in  codeList" :value="code" :key="code">
                    </Option>
                </Select>
            </div>
            <a class="commlun" @click="sublitSetprice">确定</a>
            <a class="commlun commlun2" @click="coloseSet">关闭</a>
        </div>
        <div class="scherm" v-show="shows"></div>
        <div class="mack" v-show="shows">
          <h2>用户信息</h2>
          <table>
            <tr v-if="checkdetail.roomNum">
              房间号：{{checkdetail.roomNum}}
            </tr>
            <tr v-if="checkdetail.roomieInfo">
              联系人：{{checkdetail.roomieInfo.name}}
            </tr>
            <tr v-if="checkdetail.roomNum">
              联系电话：{{checkdetail.roomieInfo.phone}}
            </tr>
            <tr v-if="checkdetail.roomieInfo">
              身份证：{{checkdetail.roomieInfo.certificateNumber}}
            </tr>
            <tr v-if="checkdetail.inTime">
              入住时间：{{checkdetail.inTime | time}}
            </tr>
            <tr v-if="checkdetail.refundInfo">
              退房时间：{{checkdetail.refundInfo.refundTime | time}}
            </tr>
            <tr>
              入住状态：{{checkdetail.status | status}}
            </tr>
            <tr v-if="checkdetail.orderRoomFee">
              协议价：{{checkdetail.orderRoomFee}}元
            </tr>
            <tr v-if="checkdetail.refundInfo">
              罚款金额：{{checkdetail.refundInfo.inMoney}}元
            </tr>
            <tr v-if="checkdetail.serviceFee">
              增值服务：{{checkdetail.serviceFee}}元
            </tr>
            <tr v-if="checkdetail.refundInfo">
              总消费：{{checkdetail.refundInfo.totalMoney}}元
            </tr>
            <tr v-if="checkdetail.refundInfo && checkdetail.refundInfo.refundMoney > 0">
              应退款：{{checkdetail.refundInfo.refundMoney}}元
            </tr>
            <tr v-if="checkdetail.refundInfo && checkdetail.refundInfo.refundMoney < 0">
              应收款：{{checkdetail.refundInfo.refundMoney | Money}}元
            </tr>
            <tr v-if="checkdetail.payType">
              支付方式：{{checkdetail.payType | payType}}
            </tr>
          </table>
          <a @click="closemack">关闭</a>
        </div>
        <warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
	    <success-modal :success-message="successMessage" v-if="successModal"></success-modal>
    </div>
</template>

<script>
  import '../../sass/style/activitys.css';
  import menuBox from '../../components/menuBox.vue';
  import rightHeader from '../../components/rightHeader.vue';
  import footerBox from '../../components/footerBox.vue';
  import successModal from '../../components/successModal.vue';
  import warningModal from '../../components/warningModal.vue';
  import shortOrderList from './shortOrderList.vue';
  import shortStayList from './shortStayList.vue';
  import shortRoomBillList from './shortRoomBillList.vue';
  import shortSettingList from './shortSettingList.vue';
  import shortPriceSet from './shortPriceSet.vue';
  import shortProductCalendar from './shortProductCalendar.vue';
  import shortTermItem from '../signed/shortTermItem.vue';
  import axios from 'axios';
  import { hostActivity,hostActivityModify,hostActivityInvite,PmsRoomPriceCode200199,PmsRoomDayPrices200200 } from '../api.js';
  import qs from 'qs';

  export default {
    components: {
      rightHeader,
      menuBox,
      footerBox,
      successModal,
      warningModal,
      shortOrderList,
      shortStayList,
      shortRoomBillList,
      shortSettingList,
      shortPriceSet,
      shortProductCalendar,
      shortTermItem
    },
    data() {
      return {
        activeName:"short-term-item",
        successModal: false,
        warningModal: false,
        successMessage: '添加部门成功',
        warningMessage: '添加部门失败，请检查是否重复',
        currentPage3: 1,
        radio: '1',
        ishide3: false,
        isHide:false,
        codeList:[],
        codes:'',
        stateDatas:'',//价格设置开始时间
        endDatas:'',//价格设置结束时间
        checkList:[],//开始时间组
        single:false, //全选值
        dayNumList:[],//选中日历日期
        communityIds:'', //设置日历组件社区ID
        shows:false,
        checkdetail:{} //入住详情
      }
    },
    mounted() {
      let tab = sessionStorage.getItem("shortRentIndexTab");
      if(tab){
        this.activeName = tab;
      }
      this.codem();
    },
    filters:{
        Money(val){
            return Math.abs(val);
        },
        payType(val){
            if(val == 1){
                return '支付宝'
            }else if(val == 2){
                return '微信'
            }else if(val == 3){
                return '银联'
            }else{
                return '其他方式'
            }
        },
        status(val){
            if(val == 0){
                return '未入住'
            }else if(val == 1){
                return '已入住'
            }else if(val == 2){
                return '已结账'
            }
        },
        time(val){
            return new Date(val).Format("yyyy-MM-dd");
        },
    },
    methods: {
        changeTab(tab){
          sessionStorage.setItem("shortRentIndexTab",tab);
        },
        //获取套系的种类
        codem(){
            if(sessionStorage.getItem('priceID')){
                let ID = sessionStorage.getItem('priceID')
                axios.post(PmsRoomPriceCode200199,
                qs.stringify({
                    communityId:ID
                })).then((res)=>{
                    // console.log(res);
                    if(res.status == 200 && res.data.code == 10000){
                        this.codeList = res.data.result.pmsRoomPriceCodeList;

                    }
                    else{
                        this.codeList = []
                    }
                })
            }
            else{
                let ID = sessionStorage.getItem('communityId')
                axios.post(PmsRoomPriceCode200199,
                qs.stringify({
                    communityId:ID
                })).then((res)=>{
                    // console.log(res);
                    if(res.status == 200 && res.data.code == 10000){
                        this.codeList = res.data.result.pmsRoomPriceCodeList;
                    }
                    else{
                        this.codeList = []
                    }
                })
            }

        },
        openWarningModal(message){
            // console.log(message);
            if(message.sum == 1){
                this.successMessage = message.title;
                this.successModal = true;
                setTimeout(()=>{
                    this.successModal = false;
                },1000)
            }else if(message.sum == 2){
                this.warningMessage = message.title;
                this.warningModal = true;
            }
            
            

        },
        //全选时间事件
        handleCheckAll2(){
            this.dayNumList = [];
            this.single = !this.single;
            if(this.single == true){
                this.checkList.push('日');
                this.checkList.push('一');
                this.checkList.push('二');
                this.checkList.push('三');
                this.checkList.push('四');
                this.checkList.push('五');
                this.checkList.push('六');
                let arrs = Array.from(new Set(this.checkList));
                for(let i = 0;i<arrs.length;i++){
                    let DataSour = new Date(this.stateDatas);
                    let data = new Date(this.stateDatas).Format("yyyy-MM-dd");
                    let now = data.split('-');
                    now = new Date(Number(now['0']),(Number(now['1'])-1),Number(now['2']));
                    if(arrs[i] =='一'){
                        let Daysum = DataSour.getDay()+1 - 2;
                        if(Daysum > 0){
                            now.setDate(now.getDate() - Daysum);
                        }else{
                            now.setDate(now.getDate() - Daysum);
                        }
                        this.dayNumList.push(new Date(now).Format("yyyy-MM-dd"));

                    }else if(arrs[i] =='二'){
                    let Daysum = DataSour.getDay()+1 - 3;
                        if(Daysum > 0){
                            now.setDate(now.getDate() - Daysum);
                        }else{
                            now.setDate(now.getDate() - Daysum);
                        }
                        this.dayNumList.push(new Date(now).Format("yyyy-MM-dd"));
                    }else if(arrs[i] =='三'){
                    let Daysum = DataSour.getDay()+1 - 4;
                        if(Daysum > 0){
                            now.setDate(now.getDate() - Daysum);
                        }else{
                            now.setDate(now.getDate() - Daysum);
                        }
                        this.dayNumList.push(new Date(now).Format("yyyy-MM-dd"));
                    }else if(arrs[i] =='四'){
                    let Daysum = DataSour.getDay()+1 - 5;
                        if(Daysum > 0){
                            now.setDate(now.getDate() - Daysum);
                        }else{
                            now.setDate(now.getDate() - Daysum);
                        }
                        this.dayNumList.push(new Date(now).Format("yyyy-MM-dd"));
                    }else if(arrs[i] =='五'){
                        let Daysum = DataSour.getDay()+1 - 6;
                        if(Daysum > 0){
                            now.setDate(now.getDate() - Daysum);
                        }else{
                            now.setDate(now.getDate() - Daysum);
                        }
                        this.dayNumList.push(new Date(now).Format("yyyy-MM-dd"));
                    }else if(arrs[i] =='六'){
                        let Daysum = DataSour.getDay()+1 - 7;
                        if(Daysum > 0){
                            now.setDate(now.getDate() - Daysum);
                        }else{
                            now.setDate(now.getDate() - Daysum);
                        }
                        this.dayNumList.push(new Date(now).Format("yyyy-MM-dd"));
                    }else if(arrs[i] =='日'){
                        let Daysum = DataSour.getDay()+1 - 1;
                        if(Daysum > 0){
                            now.setDate(now.getDate() - Daysum);
                        }else{
                            now.setDate(now.getDate() - Daysum);
                        }
                        this.dayNumList.push(new Date(now).Format("yyyy-MM-dd"));
                    }
                }
                //确定最大日期的存在
                let arr = [];
                for(let i=0;i<this.dayNumList.length;i++){
                    let date = new Date(this.dayNumList[i]);
                    arr.push(date.getTime());
                }
                let max = arr[0];
                for(let i=0;i<arr.length;i++){
                    if(arr[i] > max){
                        max = arr[i]
                    }
                }
                this.endDatas = new Date(max).Format("yyyy-MM-dd");
            }else{
                this.checkList = [];
                this.dayNumList = [];
            }
        },
        //选中星期得到日期
        allcheckList(list){
            if(list.length >= 7){
                this.single = true;
            }
            else{
                this.single = false;
            }
            this.dayNumList = [];
            for(let i = 0;i<list.length;i++){
                let DataSour = new Date(this.stateDatas);
                let data = new Date(this.stateDatas).Format("yyyy-MM-dd");
                let now = data.split('-');
                now = new Date(Number(now['0']),(Number(now['1'])-1),Number(now['2']));
                if(list[i] =='一'){
                    let Daysum = DataSour.getDay()+1 - 2;
                    if(Daysum > 0){
                        now.setDate(now.getDate() - Daysum);
                    }else{
                        now.setDate(now.getDate() - Daysum);
                    }
                    this.dayNumList.push(new Date(now).Format("yyyy-MM-dd"));
                }else if(list[i] =='二'){
                   let Daysum = DataSour.getDay()+1 - 3;
                    if(Daysum > 0){
                        now.setDate(now.getDate() - Daysum);
                    }else{
                        now.setDate(now.getDate() - Daysum);
                    }
                    this.dayNumList.push(new Date(now).Format("yyyy-MM-dd"));
                }else if(list[i] =='三'){
                   let Daysum = DataSour.getDay()+1 - 4;
                    if(Daysum > 0){
                        now.setDate(now.getDate() - Daysum);
                    }else{
                        now.setDate(now.getDate() - Daysum);
                    }
                    this.dayNumList.push(new Date(now).Format("yyyy-MM-dd"));
                }else if(list[i] =='四'){
                   let Daysum = DataSour.getDay()+1 - 5;
                    if(Daysum > 0){
                        now.setDate(now.getDate() - Daysum);
                    }else{
                        now.setDate(now.getDate() - Daysum);
                    }
                    this.dayNumList.push(new Date(now).Format("yyyy-MM-dd"));
                }else if(list[i] =='五'){
                    let Daysum = DataSour.getDay()+1 - 6;
                    if(Daysum > 0){
                        now.setDate(now.getDate() - Daysum);
                    }else{
                        now.setDate(now.getDate() - Daysum);
                    }
                    this.dayNumList.push(new Date(now).Format("yyyy-MM-dd"));
                }else if(list[i] =='六'){
                    let Daysum = DataSour.getDay()+1 - 7;
                    if(Daysum > 0){
                        now.setDate(now.getDate() - Daysum);
                    }else{
                        now.setDate(now.getDate() - Daysum);
                    }
                    this.dayNumList.push(new Date(now).Format("yyyy-MM-dd"));
                }else if(list[i] =='日'){
                    let Daysum = DataSour.getDay()+1 - 1;
                    if(Daysum > 0){
                        now.setDate(now.getDate() - Daysum);
                    }else{
                        now.setDate(now.getDate() - Daysum);
                    }
                    this.dayNumList.push(new Date(now).Format("yyyy-MM-dd"));
                }
            }
            //确定最大日期的存在
            let arr = [];
            for(let i=0;i<this.dayNumList.length;i++){
                let date = new Date(this.dayNumList[i]);
                arr.push(date.getTime());
            }
            let max = arr[0];
            for(let i=0;i<arr.length;i++){
                if(arr[i] > max){
                    max = arr[i]
                }
            }
            this.endDatas = new Date(max).Format("yyyy-MM-dd");

        },
        //获取价格设置组件传递的日期
        setPrice(dataIf){
            this.checkList = [];
            // console.log(dataIf);
            this.isHide = dataIf.isHide;
            this.stateDatas = dataIf.date3;
            this.endDatas = dataIf.date3;
            this.communityIds = dataIf.communityId;
            this.codem();
            let tmpdate = new Date(this.stateDatas);
            // console.log(tmpdate.getDay());
            if(tmpdate.getDay() == 0){
                this.checkList.push('日');
            }else if(tmpdate.getDay() == 1){
                this.checkList.push('一');
            }else if(tmpdate.getDay() == 2){
                this.checkList.push('二');
            }else if(tmpdate.getDay() == 3){
                this.checkList.push('三');
            }else if(tmpdate.getDay() == 4){
                this.checkList.push('四');
            }else if(tmpdate.getDay() == 5){
                this.checkList.push('五');
            }else if(tmpdate.getDay() == 6){
                this.checkList.push('六');
            }
            this.allcheckList(this.checkList);
        },
        //提交设置套系日历方法
        sublitSetprice(){
            axios.post(PmsRoomDayPrices200200,
            qs.stringify({
                communityId:this.communityIds,
                code:this.codes,
                dayNumList:this.dayNumList
            })).then((res)=>{
                // console.log(res);
                if(res.status == 200 && res.data.code == 10000){
                    this.isHide = false;
                    this.successMessage = '价格设置成功';
                    this.successModal = true;
                    this.checkList = [];
                    this.dayNumList=[];
                    this.codes = ''
                    setTimeout(() => {
                        this.successModal = false;
                        let date = this.stateDatas;
                        let arr = date.split("-");
                        for(let i=0;i<arr.length;i++){
                            arr[i] = parseInt(arr[i]);
                        }
                        if(arr[1]%2 == 0){
                            this.$refs.price.changePane(arr[0],arr[1]-2,arr[2]);
                        }else{
                            this.$refs.price.changePane(arr[0],arr[1]-1,arr[2]);
                        }
                        
                        this.clisk();
                    }, 2000);
                }else{
                    this.isHide = false;
                    this.warningMessage = res.data.content;
					this.warningModal = true;
                }
            }).catch((err)=>{
                // console.log(err);
            })
        },
        clisk(){
            // this.$refs.cliskm.$emit('childMethod')
            this.$refs.cliskm.callMethod();
        },
        //关闭价格设置窗口
        coloseSet(){
            this.isHide = false;
        },
        closeWarningModal() {
            this.warningModal = false;
//            this.isHide = true;
        },
        // shortpriceshortprice(){
        //   this.successModal = true;
        // },
        successUpload(data){
            let my = data;
            if(my == 1){
                this.successMessage = "上传图片成功!";
                this.successModal = true;
                setTimeout(()=>{
                    this.successModal = false;
                },1500)
            }else{
                this.warningMessage = "上传图片失败!";
                this.warningModal = true;
            }
          

        },
        //得到房间的所有信息
        checkdetails(value){
            this.checkdetail = value;
            // console.log(this.checkdetail);
            this.shows = true;
            
        },
        closemack(){
            this.shows = false;
        }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../sass/base/_mixin.scss';
    @import '../../sass/base/_public.scss';
    @import '../../sass/page/_communityManagement.scss';
    #right-content{
        height: 100%!important;
        min-height: 1300px;
        .message-tim{
            width: 100%;
            min-height: 1100px;
            background-color: #fff;
            overflow: hidden;
            box-shadow: 0 2px 1px #ccc!important;
        }
    }
    .ivu-tabs-tabpane{
        width: 100%;
        height: 100%;
        background-color: #fff;
        // box-shadow: 0 2px 1px #ccc;
    }

    .message-tim {
        position: relative;
    }

    .message-tim .block {
        position: absolute;
        left: 50%;
        margin-top: 120px;
        transform: translate(-50%, -50%);
    }

    .message-tim .block .el-pagination {
        text-align: center;
        margin-top: 40px;
    }

    .message-tim .block .el-pagination .el-pager .number {
        margin: 0 5px;
        border: 1px solid #DCDCDC;
    }

    .message-tim .block .el-pagination button {
        border: 1px solid #DCDCDC;
    }


    .setmeal{
        width: 526px;
        height: 240px;
        background: white;
        position: absolute;
        left: 50%;
        top: 35%;
        transform: translate(-50%,-50%);
        z-index: 9999;
        .el-icon-circle-close{
            position: absolute;
            right: -40px;
            top: -40px;
            font-size: 20px;
            line-height: 50px;
            cursor: pointer;
        }
        p{
            height: 50px;
            line-height: 50px;
            width: 100%;
            padding-left: 10px;
            background: #038be2;
            color: white;
            font-size: 16px;
        }
        .ivu-date-picker{
            width: 156px;
            height: 30px;
            margin-right: 10px;
        }
        .state{
            line-height: 60px;
            margin-left: 10px;
        }
        .out{
            margin-left: 10px;
            line-height: 60px;
        }
        .el-checkbox{
            margin-left: 8px;
        }
        .all{
            position: absolute;
            right: 26px;
            top: 118px;
            font-size: 14px;
            .ivu-checkbox-inner{
                width: 18px;
                height: 18px;
            }
            .ivu-checkbox-inner::after{
                width: 7px;
                height: 11px;
                position: absolute;
                top: 0px;
                left: 5px;
            }
        }
        .form-item{
            b{
                margin-left: 10px;
                font-weight: initial;
            }
        }
        .commlun{
            position: absolute;
            left: 104px;
            bottom: 9px;
            width: 110px;
            height: 32px;
            display: block;
            text-align: center;
            line-height: 32px;
            font-size: 16px;
            color: white;
            background: #038BE2;
            border-radius: 5px;
            cursor: pointer;
        }
        .commlun2{
            left: 300px;
        }
    }
    .scherm {
        width: 100%;
        height: 100%;
        background: #000;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        opacity: 0.5;
    }
    .mack{
        width: 430px;
        height: 720px;
        background: #fff;
        position: absolute;
        left: 50%;
        top: 40%;
        z-index: 101;
        transform: translate(-50%,-50%);
        h2{
            font-size: 22px;
            line-height: 30px;
            color: #000;
            margin: 10px;
        }
        table{
            margin-left: 20px;
            tr{
                line-height: 30px;
            }
        }
        a{
            width: 100px;
            height: 34px;
            display: inline-block;
            text-align: center;
            line-height: 34px;
            font-size: 14px;
            color: white;
            background: #038BE2;
            border-radius: 5px;
            margin-top: 30px;
            margin-left: 50%;
            transform: translate(-50%,0);
        }
    }
</style>
