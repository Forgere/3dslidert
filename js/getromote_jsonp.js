$(function() {
	var reg = /id=[a-zA-Z0-9]{15}/;
	var ziduan = location.search.match(reg)[0].split('=')[1];
	$.ajax({
		// url: "http://dev.kadashow.com:8000/api/v1/galleryshare/"+ ziduan +"=/?format=jsonp&callback=cb",
		url: "./demodata.jsonp",
		type: "GET",
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: 'success_jsonpCallback',
		contentType: "application/jsonp; charset=utf-8",
		success: function(result){
			$('.gr-caption-close').html(result.name);
			var ajax = result;
			var ajaxphotos = ajax.scenes,
					// 每面墙的容量
					ajaxlayout = [],
					//由图片src，描述信息组成数组
					romoteObject = [],
					//图片id
					photosId = [];
					//根据id获取到的src数组；
					photosSrc = [];

			$.each(ajaxphotos,function(i) {
				ajaxlayout[i] = ajaxphotos[i].scene_template.capacity;
				photosId.push.apply( photosId, ajaxphotos[i].photo_seq.split(","));
				romoteObject[i]=[];
				$.each(ajax.photos,function(j) {
					if(ajax.photos[j].id == photosId[i]){
						photosSrc[i] = ajax.photos[j].image;
						romoteObject[i].describe = ajax.photos[j].description;
					}
				});
				//图片src并入数组
				romoteObject[i].photo = "http://kadaphoto.img-cn-beijing.aliyuncs.com/User/" + photosSrc[i] + "@80p";
			});
			Gallery.init({
				layout : ajaxlayout,  //给主墙限定一个宽度是为了将图片限制在“墙”的范围内。每一面墙上的图片的数量是图片总数除以wallNumber(最后一面墙是剩下的图片)，我们也可以自定义每面墙上的图片数量(当图片总数不够填补最后一页时，有多少显示多少，没有则空白墙)
        romoteObject : romoteObject,// 图片数组
        name: result.name,
        created: result.created.split("T")[0] + " " + result.created.split("T")[1].split(".")[0]
			});
		}
	});
});