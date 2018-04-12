<template>
  <div class="productcalendar">
    <div class="form-item">
        <Select v-model="stationCommunity" style="width:180px" @on-change="selectCommunity(stationCommunity)">
            <Option v-for="community in  stationSelectList" :value="community.communityId"
                    :key="community.communityId">{{community.communityName}}
            </Option>
        </Select>
        <Select v-model="value" style="width:180px" @on-change="selectcalender(value)">
            <Option v-for="calender in  calenderList" :value="calender.id"
                    :key="calender.id">{{ calender.name }}
            </Option>
        </Select>
        <a @click="inquire">查询</a>
    </div>
    <div class="calendarselect">
        <span class="leftcalendar" @click="frontCalender"> <前14天 </span>
        <Date-picker type="date" confirm placeholder="选择日期" v-model="calendarTime" @on-ok="DataCalender(calendarTime)"></Date-picker>
        <span class="rightcalendar" @click="behindCalender">后14天></span>
    </div>
    <table v-if="calenderProductList">
        <thead>
            <td></td>
            <td v-for="item in productList.weeks">{{item | week}}</td>
        </thead>
        <tr>
            <td>房型</td>
            <td v-for="item in productList.datalist">{{item | time}}</td>
        </tr>
        <tr v-for="item in calenderProductLists.lists">
            <td>
                {{item.name}}
            </td>
            <td v-for="ite in item.prices">{{ite.money| money}}</td>

        </tr>
    </table>
  </div>
</template>


<script>

    import successModal from '../../components/successModal.vue';
    import warningModal from '../../components/warningModal.vue';
    import axios from 'axios';
    import {allCommunity,host,PmsRoomProductCalendar200207} from '../api.js';
    import qs from 'qs';
    export default {
        components:{
            successModal,
            warningModal
        },
        data(){
            return{
                value: 0,
                successModal: false,
                warningModal: false,
                successMessage: '添加成功',
                warningMessage: '添加信息不完整，请检查添加社区信息',
                stationCommunity:null, //选择社区id
                stationSelectList:null, //社区全部分类
                roomTypeId:null, //选择房型ID
                calenderList:[{
                    id:'0',
                    name:'全部房型'
                }],//全部房型选择
                calendarTime:'',
                calenderProductList:null, //获取产品日历选择数据
                productList:{
                    weeks:[],
                    datalist:[],
                },
                calenderProductLists:{       //获取产品日期全部数据
                    lists:[{
                        dates:[],
                        name:'',
                        prices:[]
                    }]
                }

            }
        },
        filters:{
            time(val){
                return new Date(val).Format('MM/dd');
                
                
            },
            money(val){
                if(val){
                    return '￥'+val;
                }else{
                    return '--'
                }
            },
            week(val){
                if(val == 1){
                    return '星期一'
                }else if(val == 2){
                    return '星期二'
                }else if(val == 3){
                    return '星期三'
                }else if(val == 4){
                    return '星期四'
                }else if(val == 5){
                    return '星期五'
                }else if(val == 6){
                    return '星期六'
                }else if(val == 0){
                    return '星期日'
                }
            }
        },
        mounted(){
            this.getCommunity();
            this.value = '0';
            this.calendarTime = new Date();
            this.calendarDatas(this.calendarTime);
        },
        methods:{
            topPush(){
                this.calenderProductLists.lists.push({
                    dates:[],
                    name:'',
                    prices:[]
                })
            },
            //获取社区的分类信息
            getCommunity(){
                let vm = this
                let value = sessionStorage.getItem('communityId');
              this.productList.weeks = [];
              this.productList.datalist = [];
              this.calenderProductLists.lists = [];
                axios.get(allCommunity).then(function(res){
                    if(res.status == 200 && res.data.code == 10000){
                        vm.stationSelectList = res.data.entity;
                        if(value){
                            vm.stationCommunity = parseInt(value);
                        }else{
                            vm.stationCommunity = parseInt(vm.stationSelectList[0].communityId);
                        }
//                        vm.calendarTime = new Date();
//                        vm.productCalendarData(vm.stationCommunity);
                    }
                })
//              this.productList.weeks = [];
//              this.productList.datalist = [];
//              this.calenderProductLists.lists = [];
            },
            inquire(){
                this.productCalendarData(this.stationCommunity);
            },
            //进入页面获取产品日历数据
            productCalendarData(value){
                this.productList.weeks = [];
                this.productList.datalist = [];
                this.calenderProductLists.lists =[];
                this.calenderList = [{
                    id:'0',
                    name:'全部房型'
                }]
                // this.value = '0';
                let types = ''
                if(this.roomTypeId == 0){
                    types = ''
                }
                else{
                    types = this.roomTypeId
                }
                axios.post(PmsRoomProductCalendar200207,
                qs.stringify({
                    communityId:value,
                    roomTypeId:types
                })
                ).then((res)=>{
                    // console.log(res);
                    if(res.status == 200 && res.data.code == 10000){
                        this.calenderProductList = res.data.entity;
                        for(let i = 0;i < this.calenderProductList.length;i++){
                            this.calenderList.push({id:this.calenderProductList[i].id,name:this.calenderProductList[i].name});
                        }
                        for(let i = 0;i<this.calenderProductList.length;i++){
                            if(this.calenderProductLists.lists.length < this.calenderProductList.length){
                                this.topPush();
                                this.calenderProductLists.lists[i].name = this.calenderProductList[i].name;
                            }
                        }
                        this.calendarDatas(this.calendarTime);

                        for(let i= 0;i<this.productList.datalist.length;i++){
                            for(let j = 0;j<this.calenderProductLists.lists.length;j++){
                                if(this.calenderProductLists.lists[j].prices.length < this.productList.datalist.length){
                                    this.calenderProductLists.lists[j].prices.push({roomcont:'',money:'',data:this.productList.datalist[i]});
                                }
                            }
                        }

                        for(let j=0;j<this.calenderProductLists.lists.length;j++){
                            //  debugger
                            for(let k=0;k < this.calenderProductList[j].productCalendarPrice.length;k++){
                                for(let i=0;i<this.calenderProductLists.lists[j].prices.length;i++){
                                    if(this.calenderProductList[j].productCalendarPrice[k].dayNum && (this.calenderProductList[j].productCalendarPrice[k].dayNum==this.calenderProductLists.lists[j].prices[i].data)){
                                        this.calenderProductLists.lists[j].prices[i].money=this.calenderProductList[j].productCalendarPrice[k].price
                                         this.calenderProductLists.lists[j].prices[i].roomcont=this.calenderProductList[j].productCalendarPrice[k].roomCount
                                     }
                                }    
                            }
                            
                        }
                    }
                        // console.log(this.calenderProductLists);
                    })
            },
            //切换社区事件
            selectCommunity(value){
                this.productCalendarData(value);
            },
            //切换房型事件
            selectcalender(value){
                // console.log(value);
                this.roomTypeId = value;
            },
            
            DataCalender(value){
                this.productList.weeks = [];
                this.productList.datalist = [];
                this.calenderProductLists.lists = [];
//                this.calendarTime = new Date(value).Format("yyyy-MM-dd")
              this.calendarTime = new Date(value).Format("yyyy-MM-dd");
              this.productCalendarData(this.stationCommunity);

            },
            //遍历当前天后的14天数
            calendarDatas(value){
//              this.productList.weeks = [];
//              this.productList.datalist = [];
//              this.calenderProductLists.lists = [];
                for(let i= 0;i < 14;i++){
                    let DataSour = new Date(value);
                    let data = new Date(value).Format("yyyy-MM-dd");
                    let now = data.split('-');
                    now = new Date(Number(now['0']),(Number(now['1'])-1),Number(now['2']));
                    now.setDate(now.getDate() + i);
                    this.productList.datalist.push(new Date(now).Format("yyyy-MM-dd"));

                    for(let j =0;j<this.calenderProductLists.lists.length;j++){
                        this.calenderProductLists.lists[j].dates.push(now);
                    }
                }
                for(let i = 0;i<this.calenderProductLists.lists[0].dates.length;i++){
                    this.productList.weeks.push(this.calenderProductLists.lists[0].dates[i].getDay());
                }
                // console.log(this.calenderProductLists);
            },
            frontCalender(){
                let DataSour = new Date(this.calendarTime);
                let data = new Date(this.calendarTime).Format("yyyy-MM-dd");
                let now = data.split('-');
                now = new Date(Number(now['0']),(Number(now['1'])-1),Number(now['2']));
                now.setDate(now.getDate() - 14);
                this.calendarTime = new Date(now).Format("yyyy-MM-dd");
                this.productCalendarData(this.stationCommunity);
            },
            behindCalender(){
                let DataSour = new Date(this.calendarTime);
                let data = new Date(this.calendarTime).Format("yyyy-MM-dd");
                let now = data.split('-');
                now = new Date(Number(now['0']),(Number(now['1'])-1),Number(now['2']));
                now.setDate(now.getDate() + 14);
                this.calendarTime = new Date(now).Format("yyyy-MM-dd");
                this.productCalendarData(this.stationCommunity);
            }
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

    .productcalendar{
        .form-item{
            margin-left: 50px;
            margin-top: 30px;
            a{
                display: inline-block;
                width: 100px;
                height: 34px;
                background-color: #038be2;
                text-align: center;
                line-height: 34px;
                color: white;
                border-radius: 5px;
                margin-left: 30px;
                padding-top: -1px;
            }
        }
        .calendarselect{
            position: absolute;
            right: 10%;
            top: 3%;
            .ivu-date-picker{
                width: 120px;
            }
            .leftcalendar,.rightcalendar{
                margin: 0px 10px;
                cursor: pointer;
            }
        }
        table{
                width: 100%;
                text-align: center;
                border-collapse: collapse;
                margin-top: 40px;
                color: #000;
                thead{
                    td{
                        height: 30px;
                        color: #000;
                        background-color: #e2e2e2;
                    }
                }
                tr,td{
                    height: 60px;
                    border: 1px solid #dcdcdc;
                }
            }
    }
</style>
