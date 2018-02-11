(function($){

	$.fn.placeholder = function(){
		if('placeholder' in document.createElement('input')){
			return false;
		}else{
			return this.each(function () {
				var _self = $(this);
				if(_self.parents().is(":hidden")){
					$("div[pid="+_self.attr('name')+"]").remove();
					return false;
				}
				$("div[pid="+_self.attr('name')+"]").remove();
				var phv = _self.attr('placeholder');
				var _selfPid = _self.attr('name');
				var color = '#cccccc';
				//div setup
				var placeholder = $('<div>'+phv+'</div>');
				$('body').append(placeholder);
				var top = _self.offset().top;
				var left = _self.offset().left + ((_self.outerWidth() - _self.width()) / 2);
				var width = _self.outerWidth();
				var height =  _self.outerHeight();
				var lineHeight = '';
				var zIndex = _self.css('zIndex');
				if(zIndex != 'auto'){
					zIndex = parseInt(zIndex) + 1;
				}
				placeholder.attr("pid", _selfPid);
				if(_self[0].nodeName=="INPUT"){
					lineHeight=height;
				}
				placeholder.css({pointerEvents: 'none',cursor: 'text',display: 'none',zIndex: zIndex, color: color, position: 'absolute', left: left, top: top ,width: width ,height: height ,'line-height': lineHeight+'px' , overflow : 'hidden' });

				var value = function(){
					var val = _self.val();
					if(val == typeof(undefined) || val == null || val == '')
						return '';
					else
						return val;
				};
				var addPlaceholder = function(){
					placeholder.css('display','');
				};
				var remPlaceholder = function(){
					placeholder.css('display','none');
				};
				var hasPlaceholder = function(){
					return placeholder.css('display') != 'none';
				};

				if(value() == ''){
					addPlaceholder();
				}
				//needs to be keydown to get the value before changed
				_self.focusin(function(e){
					if(hasPlaceholder() == true){
						remPlaceholder();
					}
				});
				_self.focusout(function(e){
					if(value() == ''){
						addPlaceholder();
					}
				});
				placeholder.on("click",function(){
					_self.trigger("focus");
				})

			});
		}
	};

})(jQuery)