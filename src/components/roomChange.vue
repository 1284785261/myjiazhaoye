<template>
    <div class="roomchange">
        <ul class="state2 transition-box">
            <li>
                <div>
                        <p></p>
                        <span class="short">短租</span>
                        <p></p>
                        <!-- <p v-else></p> -->
                        <span></span>
                        <!-- <span v-else></span> -->
                        <span>租期剩余天</span>
                        <!-- <span v-else></span> -->
                        <p>￥.00
                            <!-- <i :class="[{'act':its.roomStatus == 0},{'act2':its.roomStatus == 1}]">{{its.roomStatus | states(its.roomStatus)}}</i> -->
                        </p>
                </div>
                
            </li>
        </ul>
        <a @click="roomchange()">提交</a>
        <a @click="notroomChange()" style="left: 600px;">取消</a>
    </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  methods:{
    notroomChange(){
        this.$emit("notroomChange",false);
    },
  }
}
</script>

<style>
  .roomchange{
        width: 900px;
        min-height: 300px;
        background: #fff;
        z-index: 10000;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        border-radius: 5px;
    }
    .roomchange .state2{
        display: block;
    }
    .roomchange .state2 li{
        width: 194px;
        height: 160px;
        border: 1px solid #DCDCDC;
        border-radius: 5px;
        float: left;
        margin: 15px 15px;
        position: relative;
    }
    .roomchange .state2 li div{
        width: 194px;
        height: 160px;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 5px;
        cursor: pointer;
    }
    .roomchange .state2 li div{
        width: 194px;
        height: 160px;
        background-color: #038be2;
        display: inline-block;
    }
    .roomchange .state2 li div .act{
        color: #1fbba6;
    }
    .roomchange .state2 li div .act2{
        color: #038be2;
    }
    .roomchange .state2 li div p:nth-child(1){
        font-size: 12px;
        font-weight: bold;
        margin:10px 0 7px 10px;
    }
    .roomchange .state2 li div p:nth-child(3){
        font-size: 12px;
        margin:0 0 8px 10px;
    }

    .roomchange .state2 li span{
        display: block;
        font-size: 12px;
        color: #ff1d10;
        margin:0 0 0 10px;
    }
    .roomchange .state2 li .short{
        position: absolute;
        right: 10px;
        top: 10px;
        width: 50px;
        height: 25px;
        display: inline-block;
        background: #ffffff;
        text-align: center;
        line-height: 25px;
        color: black;
    }
    .roomchange .state2 li p:nth-child(6){
        width: 100%;
        height: 46px;
        border-radius: 5px;
        border-top: 1px solid #dcdcdc;
        background: #1dc0e9;
        font-size: 12px;
        color: #000;
        line-height: 45px;
        padding-left: 10px;
        position: absolute;
        bottom: 0px;
    }
    .roomchange .state2 li p:nth-child(6) i{
        float: right;
        font-style: normal;
        margin-right: 10px;
    }
    .roomchange a{
        width: 100px;
        height: 30px;
        display: inline-block;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        color: white;
        background: #038BE2;
        border-radius: 5px;
        position: absolute;
        left: 200px;
        bottom: 20px;
    }
</style>
