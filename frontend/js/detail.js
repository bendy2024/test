var data = []
var opinion  = {}
var filePath = []
var test = []
var link = ''
var ratingValue

$(document).ready(function(){
    if(localStorage.getItem("login") == ''){
        window.location.href = 'index.html'
    }
    
    var json = JSON.parse(localStorage.getItem("login"))
    
    $(".welcome #name").text(json.name)

    $(".slider").slider({
        max: 5,
        min: 1,
        range: "min",
        orientation: "horizontal",
        animate: "fast",
        value: 3,
        // change: refreshSwatch,
        // slide: refreshSwatch,
    });

    var swiper = new Swiper('.swiper', {
        spaceBetween: 10,
        slidesPerView: 2,
    })
    var star =$('.star').starbox({
        average: 0.6,
        autoUpdateAverage: true,
        ghosting: true
    })

    $('.uploadBtn').click(function(){
        $('#imgInp').trigger('click');
    })

    $('#imgInp').change(function(e){
        for (var i =0; i < imgInp.files.length; i++){
            const file = imgInp.files[i]
            // console.log(file.type)
            test.push(imgInp.files[i])
            var media =''
            if(file){
                var blah = URL.createObjectURL(file)
                var ext = file.type.split('/').pop()
                
                var slide = $('<div />')
                slide.addClass('swiper-slide')
                if($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) != -1){
                    media = $('<a data-link="'+blah+'" href="javascript:void(0)"><img src="'+blah+'" /></a>')
                    slide.addClass('bg-swiper')
                    media.bind("click", function(){
                        // console.log($(this).attr('data-link'))
                        $('.pic-modal img.preview').attr("src", $(this).attr('data-link')).addClass('active')
                        $('.pic-modal').addClass('active')
                    })
                } else {
                    media = $('<a data-link="'+blah+'"><video src="'+blah+'" muted/></a>')
                    media.bind("click", function(){
                        console.log($(this).attr('data-link'))
                        $('.pic-modal video.preview').attr("src", $(this).attr('data-link')).addClass('active')
                        $('.pic-modal').addClass('active')
                    })
                }
                var aTag = $('<a class="cancelBtn" href="javascript:void(0)"></a>')
                aTag.bind("click", function(){
                    var index = swiper.clickedIndex
                    test.splice(index, 1)
                    swiper.removeSlide(index)
                    swiper.update()
                    console.log(test)
                })
                slide.css('background-image', 'url('+blah+')')
                slide.append(media).append(aTag)
                swiper.appendSlide(slide)
                swiper.update()
            }
        }
        console.log(test)
    })

    $('.pic-modal .closeBtn').click(function(){
        // console.log("close")
        if($(this).parent().find('video').hasClass('active')){
            $('video.preview').prop('mute', true);
            $('video.preview').get(0).pause();
            $('video.preview').get(0).currentTime = 0;
        }
        $(this).parent().removeClass('active')
        $(this).parent().find('.active').removeClass('active')
    })

    $("#subBtn").click(function(){
        // console.log(uMedia)
        for(var i=0; i < $(".slider").length; i++){
            var no = i+1
            opinion[$("#slider"+no).attr("data-name")] = $("#slider"+no).slider("value")
        }
        opinion["comment"] = $('textarea').val()
        opinion["rating"] = ratingValue
        opinion["name"] = json.name
        opinion["tel"] = json.tel
        opinion["brand"] = json.brand
        opinion["resturtant"] = json.resturtant
        opinion["addr"] = json.addr
        opinion["time"] = json.time
        var uuid = getUuid()
        opinion["id"] = uuid.valueOf()
        data.push(opinion)
        localStorage.setItem("opinion", opinion)
        var uploading = false;

        var fileList = new DataTransfer()
        $.each(test, function(index, file){
            fileList.items.add(file)
        })
        uMedia = fileList.files
        if(uMedia.length != 0){
            uploading = true
            checkUploading(uploading)
            var formData = new FormData()
            $.each(uMedia, function(i, val){
                formData.append('file', uMedia[i])
            })
            // console.log(formData)
            // return
            var path =link +'api/v1/mystery/opinion/upload'

            $.ajax({
                // url: path,
                url: 'api/v1/mystery/opinion/upload',
                // dataType: 'multipart/form-data',
                type: 'post',
                cache: false,
                data: formData,
                contentType: false,
                processData: false,
                timeout: 300000,
                success: function(response, textStatus, jqXHR){
                    // console.log(response)
                    uploading = false
                    uploadData(response.file, uuid, link)
                },
                error: function(jqXHR, textStatus, errorThrown){
                    //console.error("Error occurred: "+textStatus, errorThrown);
                }
            });
        } else {
            uploadData('', uuid, link)
        }
    })


    const stars=document.querySelector(".rating").children;
    for (let i= 0; i<stars.length; i++){
        stars[i].addEventListener("mouseover", function(){
            for (let j= 0; j<stars.length; j++){
                stars[j].classList.remove('fa-star')
                stars[j].classList.add('fa-star-o')
            }
            for (let j= 0; j<=i; j++){
                stars[j].classList.remove('fa-star-o')
                stars[j].classList.add('fa-star')
            }
        })
        
        let index
        stars[i].addEventListener("click", function(){
            ratingValue = i+1
            index = i
        })

        stars[i].addEventListener("mouseout", function(){
            for(let j=0;j<stars.length;j++){
                stars[j].classList.remove("fa-star")
                stars[j].classList.add("fa-star-o")
            }
            for(let j=0;j<=index;j++){
                stars[j].classList.remove("fa-star-o")
                stars[j].classList.add("fa-star")
            }
        })
    }

    $(".right-arrow").click(function(){
        localStorage.setItem("login", "")
        window.location.href = "index.html"
    })
})

function uploadData(filePath, uuid, path) {
    if(filePath != '') {
        opinion["media"] = filePath
    }
    var Apilink = path+'api/v1/mystery/opinion/send-opinion'
    // console.log(Apilink)
    $.ajax({
        url: 'api/v1/mystery/opinion/send-opinion',
        // dataType: 'html',
        type: 'post',
        cache: false,
        data: opinion,
        success: function(response, textStatus, jqXHR){
            // var result = $.parseJson(response)
            // console.log(response)
            checkUploading(false)
            window.location.href = "finish.html?="+uuid
        },
        error: function(jqXHR, textStatus, errorThrown){
            //console.error("Error occurred: "+textStatus, errorThrown);
        }
    });
}

function refreshSwatch() {
    $( ".slider .ui-slider-range" ).css( "background-color", "#5218FF");
    // $( ".slider .ui-state-default, .ui-widget-content .ui-state-default" ).css( "background-color", "#5218FF" );
}

function getUuid() {
    var uuid = (function () {
        var i,
            c = "89ab",
            u = [];
        for (i = 0; i < 36; i += 1) {
            u[i] = (Math.random() * 16 | 0).toString(16);
        }
        u[8] = u[13] = u[18] = u[23] = "-";
        u[14] = "4";
        u[19] = c.charAt(Math.random() * 4 | 0);
        return u.join("");
    })();
    return {
        toString: function () {
            return uuid;
        },
        valueOf: function () {
            return uuid;
        }
    };
}

function checkUploading(status) {
    if(status){
        $('.modal').addClass('active')
    }else{
        $('.modal').removeClass('active')
    }
}