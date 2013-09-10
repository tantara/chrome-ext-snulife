function animal() {
    var imageWidth = 75;
    var imageHeight = 75;
    var imageHoverWidth = 120;
    var imageHoverHeight = 120;
    var imagePadding = 14;
    var bestCommentBorder = 1;
    
    $('#comment .fdb_lst_ul .fdb_itm').each(function() {
        var width = $(this).width();
        var innerHtml = $(this).html();
        $(this).empty();
        $(this).append('<div class="animal_pic" ></div>');
        $(this).append('<div class="previous_content"></div>');
        $(this).find('.previous_content').append(innerHtml).css({
            'float': 'left',
            'width': (width - imageWidth - bestCommentBorder*2 - imagePadding) + 'px'
        });
    });
    
    $('.animal_pic').each(function(){ 
        var before_height = 0;
        while (true) {
            var animal = $(this).next().find('.date').prev().text().trim();
            animal = animal.substring(1, animal.length-1);
            var height = $(this).next().height();
            if (height < imageHeight) { 
                height = imageHeight;
            }
            
            $(this).height(imageHeight);
            $(this).css({
                'float': 'left',
                'width': imageWidth + 'px',
                'padding-right': imagePadding + 'px'
            });
            if (before_height == height) {
                break;
            }
            before_height = height;
        }
        if (animal == '') {
            animal = '기본';
        }
        $(this).append('<img src="http://zoo.snu.ac/animal_pics/' + animal + '.jpg" ' + 
                       'width="' + imageWidth + '" height="' + imageHeight + '" ' + 
                       'alt="' + animal + '" style="border-radius:50%; border-width:2px ; border-style:solid; border-color:#A9E2F3">');
        
        $(this).hover(function() {
            $('#temporary_animal').remove();
            $('html').append('<img id="temporary_animal" src="http://zoo.snu.ac/animal_pics/' + animal + '.jpg" ' + 
                             'width="' + imageWidth + '" height="' + imageHeight + '" ' + 
                             'alt="' + animal + '" style="border-radius:50%; z-index:9999">');
            $('#temporary_animal').css({
                'position': 'absolute',
                'left': $(this).offset().left + 'px',
                'top': $(this).offset().top + 'px',
                'border-width': '2px',
                'border-style': 'solid',
                'border-color': '#A9E2F3'
            });
            $('#temporary_animal').animate({
                left: '-=' + ((imageHoverWidth - imageWidth) / 2),
                top: '-=' + ((imageHoverWidth - imageWidth) / 2),
                width: imageHoverWidth + 'px',
                height: imageHoverHeight + 'px'
            }, 300).hover(function(){ 
            }, function() {
                $('#temporary_animal').remove();
            });
            
        }, function() {
        });
    });
}

var snuAnimal = "false";
chrome.extension.sendRequest({}, function(response) {
	snuAnimal = response.active;
	if(snuAnimal == "true") {
		animal();
	}
});
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if(request.active) {
		animal();
	} else {
		$('.animal_pic').remove();
	}
});
