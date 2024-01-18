$(document).ready(function() {

    $('#logBtn').click(function(){

        var data = {"username":$('#name').val(), "password":$('#password').val() }

        if($('#name').val() == ''){
            alert("請輸入登入名稱")
        }

        if($('#password').val() == ''){
            alert("請輸入密特碼")
        }

        testlink = 'http://localhost:3001/api/v1/mystery/opinion/login'

        $.ajax({
            url: '/api/v1/mystery/opinion/login',
            // url: testlink,
            dataType: 'html',
            type: 'post',
            cache: false,
            data: data,
            // contentType: false,
            // processData: false,
            // timeout: 300000,
            success: function(response, textStatus, jqXHR){
                // console.log(response)
                localStorage.setItem("access", true)
                window.location.href = "dashboard.html"
            },
            error: function(jqXHR, textStatus, errorThrown){
                var msg = jqXHR.responseText
                alert(JSON.parse(msg).msg)
            }
        });
    })

    setInterval(updateTime, 1000)

})

function updateTime(){
    
    var today = new Date(Date.now())
    var dateFormat = today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
    $("footer #time").text(dateFormat)
}