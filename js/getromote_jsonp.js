$(function() {
	var reg = /id=([^&]*)/;
	var matches = location.search.match(reg);
	var ziduan = matches[1];
	$.ajax({
		url: localStorage.jsonUrl || "http://dev.kadashow.com:8000/api/v1/galleryshare/"+ ziduan +"?format=jsonp",
		type: "GET",
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: 'success_jsonpCallback',
		contentType: "application/jsonp; charset=utf-8",
		success: function(result){
			$('.gr-caption-close').html(result.name);
			//title
			var $body = $('body');
			document.title = result.name;
			var $iframe = $('<iframe src="/favicon.ico"></iframe>');
			$iframe.on('load',function() {
			  setTimeout(function() {
			      $iframe.off('load').remove();
			  }, 0);
			}).appendTo($body);
			var ajax = result;
			if(ajax.type_kbn){
				var photosyanshao = [],photoDesyanshao = [];
				$.each(result.photos,function(i) {
					photosyanshao[i] ="http://kadaphoto.img-cn-beijing.aliyuncs.com/User/" + result.photos[i].image+ "@50p";
					photoDesyanshao[i] = result.photos[i].description;
				});
				var ajaxlayoutyanshao=[];
				console.log(ajax.photos)
				$.each(ajax.photos,function(i) {
					ajaxlayoutyanshao[i] = 1;
				});
				Gallery.init({
					layout : ajaxlayoutyanshao,  //给主墙限定一个宽度是为了将图片限制在“墙”的范围内。每一面墙上的图片的数量是图片总数除以wallNumber(最后一面墙是剩下的图片)，我们也可以自定义每面墙上的图片数量(当图片总数不够填补最后一页时，有多少显示多少，没有则空白墙)
	        romoteObject : photosyanshao,// 图片数组
	        romoteDes : photoDesyanshao,// 图片描述
	        name: result.name,
	        created: result.created.split("T")[0] + " " + result.created.split("T")[1].split(".")[0]
				});
			}else{
				var ajaxphotos = ajax.scenes,
						// 每面墙的容量
						ajaxlayout = [],
						//图片id
						photosId = [],
						//根据id获取到的src数组；
						photosSrc = [],
						//描述
						photosDes = [];
				$.each(ajaxphotos,function(i) {
					ajaxlayout[i] = ajaxphotos[i].scene_template.capacity;
					photosId.push.apply( photosId, ajaxphotos[i].photo_seq.split(","));
					$.each(photosId,function(j) {
						$.each(ajax.photos,function(k) {
							if(ajax.photos[k].id == photosId[j]){
								photosSrc[j] = "http://kadaphoto.img-cn-beijing.aliyuncs.com/User/" + ajax.photos[k].image + "@50p";
								photosDes[j] = ajax.photos[k].description;
							}
						});
					});
				});
				Gallery.init({
					layout : ajaxlayout,  //给主墙限定一个宽度是为了将图片限制在“墙”的范围内。每一面墙上的图片的数量是图片总数除以wallNumber(最后一面墙是剩下的图片)，我们也可以自定义每面墙上的图片数量(当图片总数不够填补最后一页时，有多少显示多少，没有则空白墙)
	        romoteObject : photosSrc,// 图片数组
	        romoteDes : photosDes,// 图片描述
	        name: result.name,
	        created: result.created.split("T")[0] + " " + result.created.split("T")[1].split(".")[0]
				});
			}
		}
	});
});