/*会员中心-checkbox全选反选**/
$("document").ready(function() {
    $(".checkbox").click(function () {
        if (this.checked) {
            $("input[name='checkbox']").each(function () {
                this.checked = true;
            });
            $(".checkbox").attr("value", "反选");
        } else {
            $("input[name='checkbox']").each(function () {
                this.checked = false;
            });
            $(".checkbox").attr("value", "全选");
        }
    });

    //火狐,ie6-11的checkbox处理
    checkboxJr();

    //h5的placeholder
    $('[placeholder]:visible').placeholder();
});
function checkboxJr(){
    if(isFirefox=navigator.userAgent.indexOf("Firefox")>0 || !!window.ActiveXObject || "ActiveXObject" in window){
        $("input[type='checkbox'],input[type='radio']").addClass("input-check");
    }
}

$(function(){
    /**商户页面**/
    //商品列表加载更多
    var hide_liLenght=10; //显示多少个li
    var list_num=$("#tab-list").find("li").length;
    $.each($("#tab-list").find("li"),function(index,value){
        if(index>(hide_liLenght-1) && index<(list_num-1)){
            $(this).hide();
        }
        if(index==(list_num-1)){
            $(this).children("a").addClass("hide");
        }
    });
    $("#tab-list").find("a.more").on("click",function(){
        if($(this).hasClass("hide")){
            $(this).removeClass("hide").children("span").text("收起").siblings("i.icon").attr("class","icon icon-up").parents("li").show().siblings("li").show();
        }else{
            $(this).addClass("hide").children("span").text("更多").siblings("i.icon").attr("class","icon icon-down");

            for(var i=hide_liLenght;i<(list_num-1);i++){
                //console.log($(this).parent("li").siblings("li"));
                $(this).parent("li").siblings("li").eq(i).hide();
            }
        }
    })

    /**活动帖子详情**/

    /**个人资料**/
    //选择默认头像
    $(".chooce-pic a").on("click", function(event) {
        $(this).addClass("selected").parent("li").siblings("li").children("a").removeClass("selected");
        $(".default-hp img").attr("src",$(this).find("img").attr("src"));
    });
    //file按钮鼠标效果
    $(".upload-box").on("mouseover mouseout", function(event) {
        if(event.type == "mouseover"){
            $(this).find("a").addClass("hover");
        }else if(event.type == "mouseout"){
            $(this).find("a").removeClass("hover");
        }
    });

    /**团体注册-待审核**/
    //查看大图
    function seePic(windowW,windowH,imgW,imgH){
        if(windowW<=imgW){
            imgW=windowW-50;
        }
        if(windowH<=imgH){
            imgH=windowH-50;
        }
        $.layer({
            type:1,
            title:false,
            area: [imgW, imgH],
            border:[0],
            shadeClose:true,
            page: {
                dom: '#see-bigimg'
            }
        })
    }
    $(".see-bigpic").on("click",function(){
        $("#see-bigimg").find("img").attr("src",$(this).find("img").attr("data-bigsrc"));
        var windowW=$(window).width();
        var windowH=$(window).height();
        var imgW,imgH;
        var img_url = $(this).find("img").attr("data-bigsrc");
        var img = new Image();
        img.src = img_url;
        // 判断是否有缓存
        if(img.complete){
            imgW=img.width;
            imgH=img.height;
            seePic(windowW,windowH,imgW,imgH);
        }else{
            img.onload = function(){
                imgW=img.width;
                imgH=img.height;
                seePic(windowW,windowH,imgW,imgH);
            };
        }
    })
    /**团体注册-待审核**/

    /**订单支付**/
    //佳运动余额充值面额选择
    $(".recharge-denomination a").on("click",function(){
        $(this).addClass("selected").parent("li").siblings("li").children("a").removeClass("selected");
        $(".payment-total").find("span.price").html($(this).find("span.price").html())
    })
    /**订单支付**/

    //select选择对于模块切换
    $('select.registration-type').on('change', function(){
        var selected = $(this).find("option:selected").val();
        $(".selected-table").children("div").eq(selected).css("display","block").siblings("div").css("display","none");
    });

//选择支付方式
    $(".selected_pay").find('a').on("click",function(){
        if($(this).hasClass("disable")){
            return;
        }
        if($(this).hasClass("zhye-pay")){
            $(".payment-pwd").css("display","block");
        }else{
            $(".payment-pwd").css("display","none");
        }
        $(this).addClass('active').siblings('a').removeClass('active');
    });

    //社区管理
    //table下tr鼠标事件
    $(".edlist-table tbody tr").hover(
        function(){
            $(this).addClass("tr-hover");
        },
        function(){
            $(this).removeClass("tr-hover");
        }
    );


    //场馆管理中心-入驻审核-入驻审核操作,点击查看图片提示
    $(".tips-ui li:last-child").append("<div class='message-tips'><p class='warning'><i class='icon'></i>图片可以点击放大查看</p></div>");

    //场馆管理中心-审核管理-社区公告审核
    $(".radio-check label").on("click",function(){
        $(this).addClass("checked").siblings("label").removeClass("checked");
    })
})

//倒计时
//$('.get-vcode').on("click",function(){
//    countdownFun($(this));
//})
function countdownFun(ele){
    var ele=ele ? ele : $('.get-vcode');
    var t = 60;
    function run() {
        t = t - 1;
        if (t == 0) {
            ele.val("获取验证码").attr('disabled',false);
            clearInterval(time);
            return false;
        }else if(t > 0){
            ele.val(t + "秒可再次发送").attr('disabled',true);
        }
    }
    run();
    var time=setInterval(run, 1000);
}

/** 返回顶部 **/
function returnTop() {
    var s_top = document.documentElement.scrollTop || document.body.scrollTop;//获取滚动条到浏览器顶部的高度，主要做的ie6兼容
    var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if (s_top >= h / 3) {
        $(".return-top").fadeIn(500).click(function () {
            $("body,html").stop(true, false).animate({ scrollTop: 0 }, 500);
        });
    } else {
        $(".return-top").fadeOut(500);
    }
}

window.onscroll = function () {
    returnTop();
}

/**表单验证**/
//验证电话号码，0为空，1为验证成功，2为错误
function checkPhoneNumber(obj,reg){
    var value=obj.val();
    if(value.slice(0,3)=="+86"){
        value=value.slice(3); //分割字符串，电话前面默认带+86
    }
    if(value=="" || value==undefined){
        return 0;
    }else{
        if(reg.test(value)){
            return 1;
        }else{
            return 2;
        }
    }
}

//验证表单值是否为空且不小于length，0为空，1为验证成功,2为错误
function checkVCode(obj,length){
    var value=obj.val();
    if(value=="" || value==undefined){
        return 0;
    }else{
        if(value.length<length){
            return 2;
        }else{
            return 1;
        }
    }
}

//验证手机验证码是否为空且等于length，0为空，1为验证成功,2为错误
function checkVCodeLength(obj,length){
    var value=obj.val();
    if(value=="" || value==undefined){
        return 0;
    }else{
        if(value.length!=length){
            return 2;
        }else{
            return 1;
        }
    }
}

//再次确认密码，0为空，1为验证成功,2为错误
function checkComfirmPwd(obj,comfirmValue){
    if(comfirmValue=="" || comfirmValue==undefined){
        comfirmValue="";
    }
    var value=obj.val();
    if(value=="" || value==undefined){
        return 0;
    }else{
        if(value==comfirmValue){
            return 1;
        }else{
            return 2;
        }
    }
}

//验证标题还可以输入多少个字
function checkTitleLength(obj,length){
    var value=obj.val();
    if(value=="" || value==undefined){
        return 0;
    }else{
        if(value.length<=length){
            return 1;
        }else{
            return 2;
        }
    }
}

//验证输入框是否为空
function checkInput(obj){
    var value=obj.val();
    if(value=="" || value==undefined){
        return 0;
    }else{
        return 1;
    }
}

/**表单验证**/

$(function(){
    if($('.tr_hover').length>0){
        $('.tr_hover tbody tr').each(function(){
            $(this).hover(function(){
                    $(this).addClass('cur');
                },function(){
                    $(this).removeClass('cur');
                }
            )
        })
    }
})

/** tab切换 **/
function tab(obj,curclass,tabcon){
    $(obj).addClass(curclass).siblings("li").removeClass(curclass);
    $(tabcon).children().eq($(obj).index()).css("display","block").siblings("div").css("display","none");
}
