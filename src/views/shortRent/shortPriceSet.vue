<template>
  <div class="shortPriceSet">
    <div class="form-item">
        <b>社区：</b>
        <Select v-model="stationCommunity" style="width:180px" @on-change="selectCommunity(stationCommunity)">
            <Option v-for="community in  stationSelectList" :value="community.communityId"
                    :key="community.communityId">{{ community.communityName }}
            </Option>
        </Select>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="价格套系" name="first">
            <div class="pricecombo">
                <a class="addprice" @click="addPrice">添加</a>
                <a class="addprice" :href="host3">导出</a>
                <table class="pricelist" v-if="shortHousetype != []">
                    <tr v-if="longHousetype">
                        <td></td>
                        <td>长租房户型</td>
                        <td v-for="item in longHousetype">{{item.housetypeName}}</td>
                        <td rowspan="2" style="background:rgb(216, 216, 216);">操作</td>
                    </tr>
                    <tr style="height:56px;background:rgb(216, 216, 216);" v-if="shortHousetype">
                        <td>代号</td>
                        <td>短租房户型</td>
                        <td v-for="item in shortHousetype">{{item.pmsRoomTypename}}</td>
                    </tr>
                    <tr style="height:68px;background:white;" v-for="(item,index) in shortPriceroom" v-if="shortPriceroom">
                        <td>
                            <span v-if="item.typeCompile == 0">{{item.code}}</span>
                            <Input style="width: 100px;" v-model="item.code" v-if="item.typeCompile == 1 || item.typeCompile == 2"></Input>
                        </td>
                        <td>
                            <span v-if="item.typeCompile == 0">{{item.name}}</span>
                            <Input style="width: 100px;" v-model="item.name" v-if="item.typeCompile == 1 || item.typeCompile == 2"></Input>
                        </td>
                        <td v-for="ite in item.pmsRoomPrice">
                            <span v-if="item.typeCompile == 0">{{ite.price}}</span>
                            <Input style="width: 100px;" v-model="ite.price" v-if="item.typeCompile == 1 || item.typeCompile == 2"></Input>
                        </td>
                        <td>
                            <a @click="compileRoomPrice(item,index)" v-if="item.typeCompile == 0">编辑</a>
                            <a @click="saveRoomPrice(item,index)" v-if="item.typeCompile == 1">保存</a>
                            <a @click="addRoomPrice(item,index)" v-if="item.typeCompile == 2">保存</a>
                            <a @click="desRoomPrice(item)">删除</a>
                        </td>
                    </tr>
                </table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="价格日历" name="second">
            <div style="height: 600px;">
            <calendar class="event-calendar" v-model="value"  :disabled-days-of-week="disabled" :format="format" :clear-button="clear" :placeholder="placeholder" :pane="2" :has-input="false" :on-day-click="onDayClick3" :change-pane="changePane">
                <div class="event" v-for="(evt, index) in events" :key="index" :slot="evt.date">
                    ${{evt.content}} <i :class="{low : evt.low}" v-if="evt.low">↓</i>
                </div>
            </calendar>
            <p>{{date3}}</p>
            </div>
            <lorem :len="3"></lorem>
            
        </el-tab-pane>
        <el-tab-pane label="变价日志" name="third">
            <div class="pricejournal">
                <table>
                    <thead>
                        <td>ID</td>
                        <td>任务</td>
                        <td>操作人</td>
                        <td>内容</td>
                        <td>开始时间</td>
                        <td>结束时间</td>
                    </thead>
                    <tr>
                        <td>111111</td>
                        <td>111111</td>
                        <td>111111</td>
                        <td>111111</td>
                        <td>111111</td>
                        <td>111111</td>
                    </tr>
                </table>
            </div>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
    import Calendar from '../../components/Calendar.vue'
    import successModal from '../../components/successModal.vue';
    import warningModal from '../../components/warningModal.vue';
    import axios from 'axios';
    import {allCommunity,RoomPriceTable200195,RoomPriceEdit200196,PmsRoomPriceDelete200197,host,PmsRoomPrice200194} from '../api.js';
    import qs from 'qs';
    export default {
        components: {
            Calendar,
            successModal,
            warningModal
        },
        data(){
            return{
                activeName: 'first',
                disabled: [],
                value: this.stringify(new Date()),
                value2: '',
                date3: '',
                events: [],
                lurevents: [],
                format: 'yyyy-MM-dd',
                clear: true,
                isHoliday: true,
                placeholder: 'placeholder is displayed',
                successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息',
                stationCommunity:null, //选择社区id
                stationSelectList:null, //社区全部分类
                longHousetype:[],  //长租房户型
                shortHousetype:[],     //短租房户型
                shortPriceroom:[],      //短租房价格
                cxkjPmsRoomPriceList:[], //短租价格修改数据
                host3:'', //导出短租价格表信息地址
            }
        },
        created () {
            this.bus = new Vue()
        },
        computed: {
            _dateMap () {
                return this._createDateMap()
            }
        },
        mounted(){
            this.getCommunity();
            // console.log(this.host3);
        },
        watch:{
            stationCommunity(val,olaval){
                this.host3 = host + '/cxkj-pms/apis/pc/pmsroomprice/CxkjCommunityPmsRoomPriceDownLoad200198?'+'&communityId='+ val;
            }
        },
        methods:{
            //获取社区的分类信息
            getCommunity(){
                let vm = this
                let value = sessionStorage.getItem('communityId');
                axios.get(allCommunity).then(function(res){
                    if(res.status == 200 && res.data.code == 10000){
                        vm.stationSelectList = res.data.entity;
                        if(value){
                            vm.stationCommunity = parseInt(value);
                        }else{
                            vm.stationCommunity = parseInt(vm.stationSelectList[0].communityId);
                        }
                        this.priceCommunity(vm.stationCommunity);
                    }
                })
            },
            priceCommunity(value){
                let vm = this
                vm.longHousetype = [];
                vm.shortHousetype  = [];
                vm.shortPriceroom = [];
                axios.post(RoomPriceTable200195,
                    qs.stringify({
                        communityId:value
                    })
                ).then((res)=>{
                    if(res.status == 200 && res.data.code == 10000){
                        if(res.data.entity.roomTypeMap){
                            for(let i = 0;i < res.data.entity.roomTypeMap.length;i++){
                                vm.longHousetype.push({housetypeName:res.data.entity.roomTypeMap[i].housetypeName});
                                vm.shortHousetype.push({pmsRoomTypename:res.data.entity.roomTypeMap[i].pmsRoomTypename,roomTypeId:res.data.entity.roomTypeMap[i].roomTypeId});
                            }
                        }
                        if(res.data.entity.roomPriceMap){
                            vm.shortPriceroom = res.data.entity.roomPriceMap;
                            for(let i = 0 ;i < res.data.entity.roomTypeMap.length;i++){
                                for(let j = 0 ; j < vm.shortPriceroom.length;j++){
                                    if(vm.shortPriceroom[j].pmsRoomPrice.length < res.data.entity.roomTypeMap.length){
                                        vm.shortPriceroom[j].pmsRoomPrice.push({price:'',roomTypeId:''});
                                    }
                                } 
                            }
                            for( let i = 0 ; i < vm.shortPriceroom.length;i++){
                                this.$set(vm.shortPriceroom[i],"typeCompile",0);
                            }
                            
                           
                        }
                        
                    }else{
                        vm.longHousetype = [];
                        vm.shortHousetype = [];
                        vm.shortPriceroom = [];
                    }
                })
            },
            //切换社区获取价格套系数据
            selectCommunity(value){
                this.priceCommunity(value);
            },
            //添加短租户型价格
            addPrice(){
                // console.log(this.shortPriceroom);   
                this.shortPriceroom.push({
                    code:'',
                    name:'',
                    pmsRoomPrice:[],
                    pmsRoomPriceIds:'',
                    typeCompile:2
                }) 
                for(let i = 0;i<this.shortHousetype.length;i++){
                    for(let j = 0;j<this.shortPriceroom.length;j++){
                        if(this.shortPriceroom[j].pmsRoomPrice.length < this.shortHousetype.length){
                            this.shortPriceroom[j].pmsRoomPrice.push({roomTypeId:'',price:''});
                        }
                    }
                }
            },
            //新增短租户型价格表
            addRoomPrice(item,index){
                let vm = this
                this.cxkjPmsRoomPriceList = [];
                if(vm.shortPriceroom[index].pmsRoomPrice){
                    for(let i = 0; i < vm.shortPriceroom[index].pmsRoomPrice.length;i++){
                        let roomTypeId = vm.shortHousetype[i].roomTypeId,
                        price=vm.shortPriceroom[index].pmsRoomPrice[i].price
                        vm.cxkjPmsRoomPriceList.push({roomTypeId:roomTypeId,price:price});
                    }  
                }
                // console.log(vm.stationCommunity);
                // console.log(vm.shortPriceroom[index].code);
                // console.log(vm.shortPriceroom[index].name);
                // console.log(vm.cxkjPmsRoomPriceList);
                axios.post(PmsRoomPrice200194,     
                    {
                        communityId:vm.stationCommunity,
                        code:vm.shortPriceroom[index].code,
                        name:vm.shortPriceroom[index].name,
                        cxkjPmsRoomPriceList:vm.cxkjPmsRoomPriceList
                    }).then((res)=>{
                    // console.log(res);
                    if(res.status == 200 && res.data.code == 10000){
                        // this.successMessage = '新增成功';
                        // this.$emit('successMessage','修改成功');
                        // vm.successModal = true;

                        this.$emit('successModal',true);
                        // setTimeout(()=>{
                            // this.successModal = false;
                            this.$set(this.shortPriceroom[index],"typeCompile",0);
                            this.priceCommunity(vm.stationCommunity);
                        // },2000);
                    }else{
                        this.warningMessage = res.data.content;
						this.warningModal = true;
                    }
                }).catch((err)=>{
                    this.warningMessage = '新增失败,服务器出现异常';
					this.warningModal = true;
                })
            },
            //修改编辑短租户型的状态值
            compileRoomPrice(item,index){
                this.$set(this.shortPriceroom[index],"typeCompile",1);
            },
            //保存编辑短租
            saveRoomPrice(item,index){
                let vm = this
                this.cxkjPmsRoomPriceList = [];
                if(vm.shortPriceroom[index].pmsRoomPrice){
                    for(let i = 0; i < vm.shortPriceroom[index].pmsRoomPrice.length;i++){
                        let roomTypeId = vm.shortHousetype[i].roomTypeId,
                        price=vm.shortPriceroom[index].pmsRoomPrice[i].price
                        vm.cxkjPmsRoomPriceList.push({roomTypeId:roomTypeId,price:price});
                    }
                   
                }
                // console.log(vm.stationCommunity);
                // console.log(vm.shortPriceroom[index].code);
                // console.log(vm.shortPriceroom[index].name);
                // console.log(vm.cxkjPmsRoomPriceList);
                // console.log(vm.shortPriceroom[index].pmsRoomPriceIds);
                axios.post(RoomPriceEdit200196,     
                    {
                        communityId:vm.stationCommunity,
                        code:vm.shortPriceroom[index].code,
                        name:vm.shortPriceroom[index].name,
                        cxkjPmsRoomPriceList:vm.cxkjPmsRoomPriceList,
                        pmsRoomPriceIds:vm.shortPriceroom[index].pmsRoomPriceIds
                    }).then((res)=>{
                    // console.log(res);
                    if(res.status == 200 && res.data.code == 10000){
                        // this.successMessage = '修改成功';
                        // this.$emit('successMessage','修改成功');
                        // vm.successModal = true;
                        // this.selectCommunity(stationCommunity);
                        this.$set(this.shortPriceroom[index],"typeCompile",0);
                        this.priceCommunity(vm.stationCommunity);
                        // this.$emit('successModal',true);
                        // setTimeout(()=>{
                            // this.successModal = false;
                        // },2000);
                    }
                    // else{
                    //     this.warningMessage = res.data.content;
					// 	this.warningModal = true;
                    // }
                }).catch((err)=>{
                    // this.warningMessage = '修改失败,服务器出现异常';
					// this.warningModal = true;
                })
            },
            //删除户型价格
            desRoomPrice(item){
                // console.log(item.pmsRoomPriceIds);
                axios.post(PmsRoomPriceDelete200197,
                qs.stringify({
                    pmsRoomPriceIds:item.pmsRoomPriceIds
                })).then((res)=>{
                    // console.log(res);
                    if(res.status == 200 && res.data.code == 10000){
                        this.priceCommunity(this.stationCommunity);
                    }
                }).catch((err)=>{
                    // console.log(err);
                })
            },
            closeWarningModal() {
				this.warningModal = false;
			},
            handleClick(tab, event) {
                // console.log(tab, event);
            },
            getBus () {
                return this.bus
            },
            onDrawDate (e) {
                let date = e.date
                if (new Date().getTime() > date.getTime()) {
                    e.allowSelect = false
                }
            },
            onDrawDate2 (e) {
            // console.info(e)
            // let date = e.date
            // if (new Date().getTime() > date.getTime()) {
            //   e.allowSelect = false
            // }
            },
            getDateInfo (v) {
                var iDiff = -1
                var sNowDate = this.stringify(new Date())
                var sDateName = ['今天', '明天', '后天']
                switch (true) {
                    case v === sNowDate:
                    iDiff = 0
                    break
                    case v === this.siblings(sNowDate, 1):
                    iDiff = 1
                    break
                    case v === this.siblings(sNowDate, 2):
                    iDiff = 2
                    break
                }
                !this._dateMap && this.isHoliday && (this._dateMap = this._createDateMap())
                return (this._dateMap && this._dateMap[v]) || sDateName[iDiff]
            },
            _createDateMap () {
                var oTmp = {}
                for (var propety in this.HOLIDAYS) {
                    var curHoliday = this.HOLIDAYS[propety]
                    for (var i = 0; i < curHoliday.length; i++) {
                    var sDate = curHoliday[i]
                    var sName = this.DATENAME[propety]
                    oTmp[sDate] = sName
                    }
                }
                return oTmp
            },
            isDate (v) {
                if (v instanceof Date) {
                    return true
                }
                return false
            },
            stringify (v) {
                if (!this.isDate(v)) return null
                return v.getFullYear() + '-' + this.filled(v.getMonth() * 1 + 1) + '-' + this.filled(v.getDate())
            },
            siblings (v, n) {
                var REG = /\d+/g
                v = v.match(REG)
                return this.stringify(new Date(v[0], v[1] - 1, v[2] * 1 + n * 1))
            },
            filled (v) {
                return String(v).replace(/^(\d)$/, '0$1')
            },
            onDayClick1 (date, str) {
                this.date1 = str
            },
            onDayClick2 (date, str) {
                this.date2 = this.getDateInfo(str) || str
            },
            onDayClick3 (date, str) {
                this.date3 = str
            },
            changePane (year, month, pane) {
                this.events = []
            // ajax data or ...
            setTimeout(() => {
                this.events = this.getEventContent(year, month, pane)
            }, 200)
            },
            onDayClick4 (date, str) {
                this.date4 = str
            },
            changePane2 (year, month, pane) {
                var Today = new Date()
                var ty = parseInt(Today.getFullYear())
                var tm = parseInt(Today.getMonth())
                var td = parseInt(Today.getDate())
                var days = []
                for (var i = 0; i < pane; i++) {
                    var date = new Date(year, month + i)
                    var r = new lunar.Calendar(date.getFullYear(), date.getMonth(), ty, tm, td)
                    days = days.concat([].slice.call(r, 0))
                }
                for (var j = 0; j < days.length; j++) {
                    days[j].date = this.stringify(new Date(days[j].sYear, days[j].sMonth - 1, days[j].sDay))
                    days[j].content = this.foramtDay(days[j])
                }
                this.lurevents = days
            },
            foramtDay (el) {
            /* eslint-disable */
                var S = "",
                    J, I;
                if (el.lDay == 1) {
                    S = "<b>" + (el.isLeap ? "\u95f0" : "") + el.lMonth + "\u6708" + (lunar.monthDays(el.lYear, el.lMonth) == 29 ? "\u5c0f" : "\u5927") + "</b>";
                } else {
                    S = lunar.cDay(el.lDay);
                }
                I = el.lunarFestival;
                if (el.lMonth == "4" && I.indexOf("\u7aef\u5348\u8282") != -1) {
                    I = "";
                    el.lunarFestival = ""
                }
                if (I.length > 0) {
                    if (I.length > 7) {
                        // I = I.substr(0, 5) + "\u2026"
                        I = I.split(' ')[0]
                    }
                    I = I.fontcolor("#909090");
                } else {
                    // I = el.solarFestival;
                    // if (I.length > 0) {
                    //     J = (I.charCodeAt(0) > 0 && I.charCodeAt(0) < 128) ? 9 : 5;
                    //     if (I.length > J + 1) {
                    //         I = I.substr(0, J - 1) + "\u2026"
                    //     }
                    //     I = I.fontcolor("#909090");
                    // } else {
                    //     I = el.solarTerms;
                    //     if (I.length > 0) {
                    //         I = I.fontcolor("#ff7200") // 节日
                    //     }
                    // }
                }
                if (I.length > 0) {
                    S = I
                }
                return S;
            },
            getDayCount (year, month) {
                const dict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
                if (month === 1) {
                    if ((year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0)) {
                    return 29
                    }
                }
                return dict[month]
            },
            random (min, max) {
                if (max == null) {
                    max = min
                    min = 0
                }
                return min + Math.floor(Math.random() * (max - min + 1))
            },
            getEventContent (year, month, pane) {
                const data = []
                for (let p = 0; p < pane; p++) {
                    let date = new Date(year, month + p)
                    let monthCounts = this.getDayCount(date.getFullYear(), date.getMonth())
                    for (let i = 1; i <= monthCounts; i++) {
                    data.push({
                        date: this.stringify(new Date(year, month + p, i)),
                        content: this.random(100, 1000),
                        low: this.random(1)
                    })
                    }
                }
                return data
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../sass/base/_mixin.scss';
    @import '../../sass/base/_public.scss';
    @import '../../sass/page/_communityManagement.scss';


    .shortPriceSet{
        .el-tabs__nav{
            margin-left: 45px;
            .el-tabs__active-bar{
                height: 0;
            }
        }
        .el-tabs__header{
            border: none;
            .el-tabs__item.is-active{

                // color: white;
                // background-color: #038be2;
            }
        }
        .form-item{
            margin-left: 60px;
            line-height: 50px;
        }
        .pricecombo{
            .addprice{
                display: inline-block;
                width: 70px;
                height: 32px;
                background-color:#038be2;
                line-height: 32px;
                text-align: center;
                color: white;
                border-radius: 5px;
                margin-left: 60px;
            }
            .pricelist{
                width: 100%;
                text-align: center;
                border-collapse: collapse;
                background-color: rgb(216, 216, 216);
                margin-top: 40px;
                color: #000;
                tr:nth-child(1){
                    td{
                        height: 40px;
                        color: #000;
                        background-color: #c5c4c4;
                    }
                }
                tr,td{
                    border: 1px solid #dcdcdc;
                    a{
                        margin: 5px;
                    }
                }
            }
        }
    }
    .pricejournal{
        table{
                width: 100%;
                text-align: center;
                border-collapse: collapse;
                margin-top: 40px;
                color: #000;
                thead{
                    td{
                        height: 40px;
                        color: #000;
                        background-color: #e2e2e2;
                    }
                }
                tr,td{
                    height: 52px;
                    border: 1px solid #dcdcdc;
                }
            }
    }
    .lorem{
        visibility: hidden;
    }
    .event-calendar {
        display: block!important;
        .datepicker-inner{
            width: 440px;
        }
        .datepicker-body{
            span{
            width: 60px;
            height: 60px;
            vertical-align: top;
            }
            .event{
            color: #E56700;
            }
            .low{
            color: red;
            font-weight: bold;
            }
            .datepicker-monthRange span{
            width: 100px;
            height: 100px;
            vertical-align: middle;
            line-height: 100px;
            // font-weight: 600;
            }
        }
    }
</style>
