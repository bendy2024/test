var testLink = "http://localhost:3001/api/v1/mystery/opinion/all"
$(document).ready(function() {

        // console.log(localStorage.getItem("access"))
        if(!localStorage.getItem("access")){
            window.location.href = "index.html"
        }

        $.ajax({
            url: '/api/v1/mystery/opinion/all',
            // url: testLink,
            dataType: 'html',
            type: 'get',
            cache: false,
            // data: data,
            // contentType: false,
            // processData: false,
            // timeout: 300000,
            success: function(response, textStatus, jqXHR){
                var data = JSON.parse(response)
                $.each(data.data, function(index, value){
                    var clone = $('#clone .row').clone()
                    clone.attr('data-id', value.id)
                    clone.find('.header4 p').text(moment(value.time).format("YYYY-MM-DD HH:mm:ss"))
                    clone.find('.header1 p').text(value.name)
                    clone.find('.header2 p').text(value.brand)
                    clone.find('.header3 p').text(value.resturtant)
                    clone.bind("click", function(){
                        clickRecord(value.id)
                    })
                    $('.wrapper').append(clone)
                })
            },
            error: function(jqXHR, textStatus, errorThrown){
                var msg = jqXHR.responseText
                alert(JSON.parse(msg).msg)
            }
        });
})

function clickRecord(id) {
    // console.log(id)
    window.location.href = 'opinion.html?='+id
}