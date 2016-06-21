$(function(){
	var start,end,startY,endY;
	$('body').on('touchstart','.gr-room', function(event) {
		event.preventDefault()
		start = event.originalEvent.touches[0].clientX;
		startY = event.originalEvent.touches[0].clientY;
	});
	$('body').on('touchend','.gr-room', function(event) {
		end = event.originalEvent.changedTouches[0].clientX;
		endY = event.originalEvent.changedTouches[0].clientY;
		if($(window).width() > $(window).height()){
			if (start < end) {
				$('.gr-prev').trigger('click');
			}else{
				$('.gr-next').trigger('click');
			}
		}else{
			if(startY < endY){
				$('.gr-next').trigger('click');
			}else{
				$('.gr-prev').trigger('click');
			}
		}
	});
});