$(document).ready(function(){
    $('.right-arrow').click(function(){
        window.location.href = "mystery-detail.html"
    })
    // console.log(window.location.hostname)
    $('.wtsBtn').click(function(){
        var cPage = window.location.href    
        console.log(cPage.substring(cPage.lastIndexOf("=")+1, cPage.length))
        var backend = encodeURIComponent("http://mystery.abi.com.hk:8081/admin/opinion.html?="+cPage.substring(cPage.lastIndexOf("=")+1, cPage.length))
        window.open("whatsapp://send?text="+backend)
        
    })
})