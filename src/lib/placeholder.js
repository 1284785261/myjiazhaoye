(function($){
    $.fn.extend({
        placeholder : function(options){
            var defaults={
                cssClass:"" //自定义样式
            };
            $.extend(defaults,options);

            if('placeholder' in document.createElement('input')){
                return false;
            }else{
                //var ele=$("[placeholder]");
                $.each(this,function(){
                    var _this=$(this);
                    var ele_value=_this.attr("placeholder");
                    var nodewrap="<span class='placeholderWrap "+defaults.cssClass+"'></span>";
                    var showHide=function(){
                        if(_this.val()==""){
                            _this.siblings("span.placeval").show();
                        }else{
                            _this.siblings("span.placeval").hide();
                        }
                    }
                    if(_this.attr("pid")=="1"){
                        //判断是否已经处理过
                        showHide();
                        return true;
                    }
                    _this.wrap(nodewrap);
                    _this.parents("span.placeholderWrap").append("<span class='placeval'>"+ele_value+"</span>");
                    _this.attr("pid",'1');
                    showHide();

                    _this.on("blur focus keyup keydown",function(){
                        showHide();
                    });
                    _this.siblings("span.placeval").on("click",function(){
                        _this.focus();
                    })
                });

            }
        }
    });
})(jQuery)