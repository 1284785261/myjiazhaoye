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
                <a class="addprice" @click="addPrice" :disabled="disabledbutton">添加</a>
                <a class="addprice" :href="host3" :disabled="disabledbutton">导出</a>
                <table class="pricelist" v-if="shortHousetype != []">
                    <tr v-if="longHousetype">
                        <td></td>
                        <td>长租房户型</td>
                        <td v-for="item in longHousetype">{{item.housetypeName}}</td>
                        <td rowspan="2" style="background:#f8f8f9;">操作</td>
                    </tr>
                    <tr style="height:56px;background:#f8f8f9;" v-if="shortHousetype">
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
                            <a @click="desRoomPrice(item,index)">删除</a>
                        </td>
                    </tr>
                </table>
            </div>
        </el-tab-pane>
        <el-tab-pane label="价格日历" name="second">
            <div style="height: 600px;">
            <calendar class="event-calendar" v-model="value"  :disabled-days-of-week="disabled" :format="format" :clear-button="clear" :placeholder="placeholder" :pane="2" :has-input="false" :on-day-click="onDayClick3" :change-pane="changePane">
                <div class="event" v-for="(evt, index) in events" :key="index" :slot="evt.date">
                    {{evt.content}} <i :class="{low : evt.low}" v-if="evt.low">↓</i>
                </div>
            </calendar>
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
                        <td>操作时间</td>
                    </thead>
                    <tr v-for="item in priceDayRecord">
                        <td>{{item.id}}</td>
                        <td>套餐设置</td>
                        <td>{{item.userName}}</td>
                        <td>{{item.content}}</td>
                        <td>{{item.dayNum}}</td>
                    </tr>
                </table>
                <el-pagination @current-change="handleCurrentChange" :current-page="currentPage3" :page-size=pageSize layout=" prev, pager, next, total,jumper" :total="totalNum">
				</el-pagination>
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
    import {allCommunity,RoomPriceTable200195,RoomPriceEdit200196,PmsRoomPriceDelete200197,host,PmsRoomPrice200194,RoomDayPriceInfo200201,RoomDayRecord200202} from '../api.js';
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
                events: [],
                format: 'yyyy-MM-dd',
                clear: true,
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
                disabledbutton:true, //禁用添加按钮
                DayPrice:null,   //获取价格日历的全部数据
                checkList:[],
                priceDayRecord:[], //变价日志数据
                pageSize:10,
                currentPage3:1,
                totalNum:0,
                pageNum:1,
                dataIf:{
                    isHide:true,
                    date3:'',
                    communityId:''
                }
                
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
                        vm.priceCommunity(vm.stationCommunity);
                    }
                })
            },
            //获取变价日志的数据
            getRoomDayRecord(value){
                axios.post(RoomDayRecord200202,
                    qs.stringify({
                        communityId:value,
                        pageNum:this.pageNum,
                        pageSize:this.pageSize
                    })
                ).then((res)=>{
                    if(res.status == 200 && res.data.code == 10000){
                        this.priceDayRecord = res.data.entity.page;
                        this.totalNum = res.data.entity.totalNum;
                    }
                })
            },
            //分页变价日志数据
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getRoomDayRecord(this.stationCommunity);
		    },
            //公共获取价格数据方法
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
                    // console.log(res);
                    if(res.status == 200 && res.data.code == 10000){
                        vm.disabledbutton = false;
                        if(res.data.entity.roomTypeMap){
                            
                            for(let i = 0;i < res.data.entity.roomTypeMap.length;i++){
                              let index = vm.longHousetype.findIndex(item=> item.housetypeName == res.data.entity.roomTypeMap[i].housetypeName)
                              if(index<0){
                                vm.longHousetype.push({housetypeName:res.data.entity.roomTypeMap[i].housetypeName});
                                vm.shortHousetype.push({pmsRoomTypename:res.data.entity.roomTypeMap[i].pmsRoomTypename,roomTypeId:res.data.entity.roomTypeMap[i].roomTypeId});
                              }

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
                        vm.disabledbutton = true;
                        vm.longHousetype = [];
                        vm.shortHousetype = [];
                        vm.shortPriceroom = [];
                    }
                })
            },
            //切换社区获取价格套系数据
            selectCommunity(value){
                this.priceCommunity(value);
                this.getRoomDayRecord(value);
                sessionStorage.setItem('priceID',value);
                this.dataIf.communityId = value;
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
            desRoomPrice(item,index){
                let vm = this
                // console.log(item.pmsRoomPriceIds);
                this.shortPriceroom.splice(index,1);
                axios.post(PmsRoomPriceDelete200197,
                qs.stringify({
                    pmsRoomPriceIds:item.pmsRoomPriceIds
                })).then((res)=>{
                    // console.log(res);
                    if(res.status == 200 && res.data.code == 10000){
                        vm.priceCommunity(this.stationCommunity);
                    }
                }).catch((err)=>{
                    // console.log(err);
                })
            },
            closeWarningModal() {
				this.warningModal = false;
			},
            handleClick(tab, event) {
                this.selectCommunity(this.stationCommunity);
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
            filled (v) {
                return String(v).replace(/^(\d)$/, '0$1')
            },
            onDayClick3 (date, str) {
                this.dataIf.date3 = str
                this.$emit("setPrice",this.dataIf);
            },
            changePane (year, month, pane) {
                this.events = []
            // ajax data or ...
                setTimeout(() => {
                    this.events = this.getEventContent(year, month, pane)
                }, 200)
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
                let Dates = '';
                for (let p = 0; p < pane; p++) {
                    let date = new Date(year, month + p)
                    let monthCounts = this.getDayCount(date.getFullYear(), date.getMonth())
                    // console.log(monthCounts);
                    for (let i = 1; i <= monthCounts; i++) {
                        data.push({
                            date: this.stringify(new Date(year, month + p, i)),
                            content: '',
                            priceInfo:''
                        })
                    }
                }

                if(month+1 < 10){
                    Dates = year +'-0'+(month+1)+'-01';
                }
                else{
                    Dates = year +'-'+(month+1)+'-01';
                }
                this.getPriceInfo(data,Dates);
                // console.log(data);
                return data
            },
            getPriceInfo(data,Dates){
                this.$http.post(RoomDayPriceInfo200201,
                    qs.stringify({
                        communityId:this.stationCommunity,
                        startDate:Dates
                    })).then((res)=>{
                        // console.log(res);
                        if(res.status == 200 && res.data.code == 10000){
                            this.DayPrice = res.data.entity;
                            for(let i = 0;i<data.length;i++){
                                for(let j=0;j<this.DayPrice.length;j++){
                                    if(data[i].date == this.DayPrice[j].dayNum){
                                        data[i].content = this.DayPrice[j].code;
                                        data[i].priceInfo = this.DayPrice[j].priceInfo;
                                    }
                                }
                            }
                        }
                    })
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
        .el-pagination {
            width: 100%;
            text-align: center;
            margin-top: 100px;
        }
        
        .el-pagination .el-pager .number {
            margin: 0 5px;
            border: 1px solid #DCDCDC;
        }
        .el-pagination button {
            border: 1px solid #DCDCDC!important;
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
