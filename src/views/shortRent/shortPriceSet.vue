<template>
  <div class="shortPriceSet">
    <div class="form-item">
        <b>社区：</b>
        <Select v-model="stationCommunity" style="width:180px">
            <Option v-for="community in  stationSelectList" :value="community.communityId"
                    :key="community.communityId">{{ community.communityName }}
            </Option>
        </Select>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="价格套系" name="first">
            <div class="pricecombo">
                <a class="addprice">添加</a>
                <a class="addprice">导出</a>
                <table>
                    <thead>
                        <td></td>
                        <td>长租房户型</td>
                        <td>单人间</td>
                        <td>一房一厅</td>
                        <td>两房一厅</td>
                        <td>三房一厅</td>
                        <td>四房一厅</td>
                        <td colspan="2" style="background:rgb(216, 216, 216);">操作</td>
                    </thead>
                    <tr style="height:56px;background:rgb(216, 216, 216);">
                        <td>代号</td>
                        <td>短租房户型</td>
                        <td>豪华双床房</td>
                        <td>豪华双床房</td>
                        <td>豪华双床房</td>
                        <td>豪华双床房</td>
                        <td>豪华双床房</td>
                        <td></td>
                    </tr>
                    <tr style="height:68px;">
                        <td>BZ</td>
                        <td>标准房价</td>
                        <td>300</td>
                        <td>400</td>
                        <td>400</td>
                        <td>400</td>
                        <td>500</td>
                        <td>
                            <a>编辑</a>
                            <a>删除</a>
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

    export default {
        components: {
            Calendar
        },
        data(){
            return{
                activeName: 'second',
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
        methods:{
            handleClick(tab, event) {
                console.log(tab, event);
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
