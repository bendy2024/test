$(document).ready(function() {

    var url = window.location.href
    var data = {"recordid": url.substring(url.lastIndexOf('=')+1)}

    if(!localStorage.getItem("access")){
        $('#backBtn').remove()
    }

    $.ajax({
        url: '/api/v1/mystery/opinion/get-record',
        // url: 'http://localhost:3001/api/v1/mystery/opinion/get-record',
        dataType: 'html',
        type: 'Post',
        cache: false,
        data: data,
        // contentType: false,
        // processData: false,
        // timeout: 300000,
        success: function(response, textStatus, jqXHR){
            var data = JSON.parse(response)
            // console.log(data)
            var op = data.opinion
            var mda = data.media

            $('.name').text(op.name)
            $('.tel').text(op.telephone)
            $('.brand').text(op.brand)
            $('.resturtant').text(op.resturtant)
            $('.time').text(moment(op.time).format("YYYY-MM-DD HH:mm:ss"))

            $('.mark1').text(op.outlook1)
            $('.mark2').text(op.outlook2)
            $('.mark3').text(op.outlook3)
            $('.mark4').text(op.waiting1)
            $('.mark5').text(op.waiting2)
            $('.mark6').text(op.ordering1)
            $('.mark7').text(op.ordering2)
            $('.mark8').text(op.ordering3)
            $('.mark9').text(op.service1)
            $('.mark10').text(op.service2)
            $('.mark11').text(op.service3)
            $('.mark12').text(op.qunility1)
            $('.mark13').text(op.qunility2)
            $('.mark14').text(op.qunility3)
            $('.mark15').text(op.value1)
            $('.mark16').text(op.value2)
            $('.mark17').text(op.rating)
            $('.comment').text(op.comment)
            $.each(mda, function(index, value){
                var aws_path ='https://mystery-file.s3.ap-southeast-1.amazonaws.com/'
                var clone = $('#clone a').clone()
                var path = value.path
                var ext = path.substring(path.lastIndexOf(".")+1, path.length)
                // console.log(path)
                // clone.attr("data-path", aws_path+path)
                var media ;
                if($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) != -1){
                    media = $("<img />")
                    media.attr("src", aws_path+path)
                } else {
                    media = $("<video mute />")
                    media.attr("src", aws_path+path)
                }

                media.bind("click", function(){
                    console.log($(this).attr("src"))
                    $('.pic-modal').find(".active").removeClass('active')
                    if($.inArray(ext, ['gif', 'png', 'jpg', 'jpeg']) != -1){
                        $('.pic-modal img').attr("src", aws_path+path)
                        $('.pic-modal img.preview').addClass('active')
                    } else {
                        $('.pic-modal video').attr("src", aws_path+path)
                        $('.pic-modal video.preview').addClass('active')
                    }
                    $('.pic-modal').addClass("active")
                })

                clone.append(media)
                $('.image-wrapper').append(clone)
            })
        },
        error: function(jqXHR, textStatus, errorThrown){
            var msg = jqXHR.responseText
            alert(JSON.parse(msg).msg)
        }
    });

    $('.closeBtn').click(function (){
        if($(this).parent().find('video').hasClass('active')){
            $('video.preview').prop('mute', true);
            $('video.preview').get(0).pause();
            $('video.preview').get(0).currentTime = 0;
        }
        $(this).parent().removeClass('active')
        $(this).parent().find(".active").removeClass('active')
    })
})

function clickRecord(id) {
    // console.log(id)
    window.location.href = 'opinion.html?='+id
}