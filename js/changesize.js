// 判断屏幕方向
$(window).resize(function(e){
  // console.log('resize');
  var $w = $(window),
      $wrap = $('.container'),
      ww = $w.width(),
      wh = $w.height(),
      transform;
  if(ww > wh){
    // 横屏模式
    $wrap.css('-webkit-transform','rotate(0deg) translate(0,0)') // ios7 及早期版本android 下 必须添加该样式才能保证旋转到横屏后显示正常
         .css('transform','rotate(0deg) translate(0,0)')
         .css('width', '100%')
         .css('height', '100%')
         .addClass('landscape')
         .removeClass('portrait');
  }else{
    // 竖屏模式
    transform = 'rotate(-90deg) translate(-100%,0)';
    $wrap.css('-webkit-transform',transform)
         .css('transform',transform)
         .css('width', wh + 'px')
         .css('height', ww + 'px')
         .removeClass('landscape')
         .addClass('portrait');
  }
  console.log('resize');
}).trigger('resize');