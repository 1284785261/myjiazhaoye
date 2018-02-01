<template>
  <div class="productcalendar">
    <div class="form-item">
        <Select v-model="value" style="width:180px">
            <Option v-for="community in  options" :value="community.value"
                    :key="community.label">{{ community.label }}
            </Option>
        </Select>
        <a>查询</a>
    </div>
    <div class="calendarselect">
        <span class="leftcalendar"><前14天</span>
        <Date-picker type="date" :options="bookingEndTime" placeholder="选择日期"></Date-picker>
        <span class="rightcalendar">后14天></span>
    </div>
    <table>
        <thead>
            <td></td>
            <td>周一</td>
            <td>周二</td>
            <td>周三</td>
            <td>周四</td>
            <td>周五</td>
            <td>周六</td>
            <td>周日</td>
            <td>周一</td>
            <td>周二</td>
            <td>周三</td>
            <td>周四</td>
            <td>周五</td>
            <td>周六</td>
            <td>周日</td>
        </thead>
        <tr>
            <td>房型</td>
            <td>今天</td>
            <td>02/16</td>
            <td>02/16</td>
            <td>02/16</td>
            <td>02/16</td>
            <td>02/16</td>
            <td>02/16</td>
            <td>02/16</td>
            <td>02/16</td>
            <td>02/16</td>
            <td>02/16</td>
            <td>02/16</td>
            <td>02/16</td>
            <td>02/16</td>
        </tr>
        <tr>
            <td>
                标准双床房
            </td>
            <td>￥300</td>
            <td>￥300</td>
            <td>￥300</td>
            <td>￥300</td>
            <td>￥300</td>
            <td>￥300</td>
            <td>￥300</td>
            <td>￥300</td>
            <td>￥300</td>
            <td>￥300</td>
            <td>￥300</td>
            <td>￥300</td>
            <td>￥300</td>
            <td>￥300</td>
        </tr>
    </table>
  </div>
</template>


<script>
export default {
    data(){
        return{
            options: [{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }, {
            value: '选项3',
            label: '蚵仔煎'
            }, {
            value: '选项4',
            label: '龙须面'
            }, {
            value: '选项5',
            label: '北京烤鸭'
            }],
            value: '',
            bookingEndTime: {//预订结束时间验证
                disabledDate(date){
                }
            },
        }
    }
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
                width: 100px;
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
