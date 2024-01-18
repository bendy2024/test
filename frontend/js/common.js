var shopBrand = {
    "data":[
        {
            "code":"CT",
            "desc":"茶泰"
        },
        {
            "code":"MC",
            "desc":"牛奶冰室"
        },
        {
            "code":"HP",
            "desc":"百份百"
        },
        {
            "code":"LF",
            "desc":"漁樂"
        },
        {
            "code":"MM",
            "desc":"韓樂"
        },
        {
            "code":"IM",
            "desc":"意樂餐廳"
        },
        {
            "code":"UR",
            "desc":"UURO"
        },
        {
            "code":"TY",
            "desc":"桃園"
        },
        {
            "code":"CF",
            "desc":"Chicken Factory"
        },
        {
            "code":"DA",
            "desc":"MC Dau"
        },
        {
            "code":"RU",
            "desc":"RUD"
        },
        {
            "code":"MZ",
            "desc":"米籽"
        },
    ]
}

var resop =[]
$(document).ready(function(){

    var today = new Date(Date.now())
    var dateFormat = today.getDate()+"/"+today.getMonth()+"/"+today.getFullYear()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
    var selectBrand = ""
    var selectResturtant = ""
    var selectAddr =""
    var shop = getSource()
    setOption(shop)
    setBrand(shopBrand)
    console.log(shopBrand)

    $("footer #time").text(dateFormat)

    $("#brand").change(function(){
        var brand = $("#brand option:selected").text()
        selectBrand = brand
        var select = $(this).val()
        console.log(select)
        $("#resturtant > option").each(function(){
            // $(this).show()
            // if($(this).attr("data") != select){
            //     $(this).hide()
            //     $(this).css('display', 'none')
            // }
            $(this).remove()
        })
        $("#resturtant").append('<option value="">分店所屬地區</option>')
        $.each(resop, function(index, value){
            var selop = value+""
            if (select == (selop.substring(selop.lastIndexOf("data=")+5, selop.lastIndexOf("data=")+7))){
                // console.log(value)
                $('#resturtant').append(value)
            }
        })
        $("#resturtant").prop("disabled", false)
    })

    $("#resturtant").change(function(){
        if($(this).val() != ""){
            selectResturtant = $("#resturtant option:selected").text();
            selectAddr = $(this).val();
        }
    })

    $("#logBtn").click(function(){
        var btnStatus = true

        if(selectBrand == ''){
            alert("請選擇餐廳品牌")
            btnStatus = false
        }

        if(selectResturtant == ''){
            alert("請選擇分店")
            btnStatus = false
        }

        if($("#name").val().length <2 ){
           alert("名字最少兩個字")
           btnStatus = false
        }

        if($("#tel").val().length <7){
            alert("電話最少八個字")
            btnStatus = false
        } else if(!$.isNumeric($("#tel").val())){
            alert("請輸入數字")
            btnStatus = false
        }
        // console.log(btnStatus)
        if(btnStatus){
            var loginData = { "name":$("#name").val(), "tel":$("#tel").val(), "brand":selectBrand, "resturtant":selectResturtant, "addr":selectAddr, "time":today.toISOString() }
            // console.log(loginData)
            localStorage.setItem("login", JSON.stringify(loginData))
            // console.log(JSON.parse(localStorage.getItem("login")))
            window.location.href = "mystery-detail.html"
        }
    })
})

function getSource(){
    var shopData = []
    $.each(jData.data, function(i, item){
        // console.log(item)
        var name = item.desc
        var brand = name.split(" - ")[0]
        var addr = item.addr3
        shopData.push({"shopCd": item.code, "name": name.split(" - ")[1], "brand": brand.substr(0,2), "addr":addr.replace(/\s/g, "")})
    })
    
    for (var i = 0; i <shopData.length; i++){
        for (var j = 0; j <shopData.length-i-1 ; j++){
            var shopA = shopData[j]['shopCd']
            var shopB = shopData[j+1]['shopCd']
            if(shopA > shopB){
                var temp = shopData[j]
                shopData[j] = shopData[j+1]
                shopData[j+1] = temp     
            }      
        }
    }
    return shopData
}

function setOption(data){
    // $("#resturtant")
    // var option = $('#resturtant')
    $.each(data, function(i, item){
        // option.append("<option data="+item.brand+" value="+item.addr+">"+item.name+"</option>")
        resop.push("<option data="+item.brand+" value="+item.addr+">"+item.name+"</option>")
    })
}

function setBrand(data){
    // console.log(data)
    var option = $('#brand')
    $.each(data.data, function(i, item){
        // console.log(item)
        option.append("<option value="+item.code+">"+item.desc+"</option>")
    })
}

var jData =
{
    "data":[
     {
      "code": "CT01",
      "desc": "CT001 - 茶泰啟田店",
      "addr": "Shop No. 209, 2\/F, Kai Tin Shopping Centre, Kai Tin Estate and On Tin Estate,",
      "addr2": "No. 50 Kai Tin Road, Lam Tin, Kowloon",
      "addr3": "九龍 藍田 啟田邨 啟田商場 2樓 209號舖",
      "udfTrucklane": "E020",
      "ai1": "CT",
      "ai2": "CT1",
      "ai3": "CT001"
     },
     {
      "code": "HP01",
      "desc": "HP001 - 百份百明德店",
      "addr": "Shop Nos. 42-45 & 48, G\/F, Ming Tak Shopping Centre,",
      "addr2": "10 Pui Shing Lane, Tseung Kwan O, N.T.",
      "addr3": "新界 將軍澳 培成里10號 明德商場地下 42-45 及 48號鋪  (港鐵坑口站 B 出口)",
      "udfTrucklane": "D010",
      "ai1": "HP",
      "ai2": "HP1",
      "ai3": "HP001"
     },
     {
      "code": "HP04",
      "desc": "HP004 - 百份百翠屏店",
      "addr": "Shop No. 3, M1 Level, Tsui Lau House,",
      "addr2": "Tsui Ping North Estate, 19 Tsui Ping Road, Kwun Tong, Kowloon",
      "addr3": "九龍 觀塘 翠屏道 19號 翠屏北邨 翠柳樓 M1層 3號舖  (港鐵觀塘站 D出口)",
      "udfTrucklane": "E015",
      "ai1": "HP",
      "ai2": "HP1",
      "ai3": "HP004"
     },
     {
      "code": "HP07",
      "desc": "HP007 - 百份百華景山莊店",
      "addr": "Shop No. 20, G\/F, Wonderland Villas Commercial Complex,",
      "addr2": "9 Wah King Hill Road, 9 Wah King Hill Road, Kwai Chung,Ｎ.T.",
      "addr3": "新界 葵涌 華景山路 9號 華景山莊商場 地下 20號舖",
      "udfTrucklane": "H015",
      "ai1": "HP",
      "ai2": "HP1",
      "ai3": "HP007"
     },
     {
      "code": "HP08",
      "desc": "HP008 - 百份百長康店",
      "addr": "Shop No. 7, G\/F, Hong Tai House, ",
      "addr2": "Cheung Hong Estate, 12 Ching Hong Road, Tsing Yi, Ｎ.T.",
      "addr3": "新界 青衣 青康路 12 號 長康邨 康泰樓 地下 7號舖  (長康第一商場)",
      "udfTrucklane": "H010",
      "ai1": "HP",
      "ai2": "HP1",
      "ai3": "HP008"
     },
     {
      "code": "HP09",
      "desc": "HP009 - 百份百愛東店",
      "addr": "Shop No. 13, G\/F, Oi Tung Shopping Centre,",
      "addr2": "Oi Tung Estate, Shau Kei Wan,Hong Kong",
      "addr3": "香港 筲箕灣 愛東邨 愛東商場 地下 13 號舖",
      "udfTrucklane": "F014",
      "ai1": "HP",
      "ai2": "HP1",
      "ai3": "HP009"
     },
     {
      "code": "HP10",
      "desc": "HP010 - 百份百富亨店",
      "addr": "Shop No .27, G\/F, Fu Heng Shopping Centre,",
      "addr2": "Fu Heng Estate, 6 Chung Nga Road, Tai Po, N.T.",
      "addr3": "新界 大埔 富亨邨 富亨商場 地下 27 號舖",
      "udfTrucklane": "A012",
      "ai1": "HP",
      "ai2": "HP1",
      "ai3": "HP010"
     },
     {
      "code": "HP13",
      "desc": "HP013 - 百份百華心店",
      "addr": "Shop Nos. R101-R106, 1\/F, Wah Sum Shopping Centre,",
      "addr2": "Wah Sum Estate,  18 Yat Ming Road, Fanling, N.T.",
      "addr3": "新界 粉嶺 華心邨 華心商場 １樓 R101-R106 號舖",
      "udfTrucklane": "A008",
      "ai1": "HP",
      "ai2": "HP1",
      "ai3": "HP013"
     },
     {
      "code": "HP15",
      "desc": "HP015 - 百份百愛民店",
      "addr": "Shop Nos. G37A - G37B, G\/F, Oi Man Plaza,",
      "addr2": "Upper Oi Man Estate, No. 60 Chung Hau Street, Kowloon",
      "addr3": "九龍  忠孝街 60號 愛民邨 愛民商場 地下 G37A及G37B號舖",
      "udfTrucklane": "B012",
      "ai1": "HP",
      "ai2": "HP1",
      "ai3": "HP015"
     },
     {
      "code": "HP16",
      "desc": "HP016 - 百份百天平店",
      "addr": "Shop Nos. 124 - 126, G\/F, Tin Ming House, ",
      "addr2": "Tin Ping Estate, 48 Tin Ping Road, Sheung Shui, N.T.",
      "addr3": "新界 上水 天平邨 天明樓 地下 124 至 126 號舖",
      "udfTrucklane": "A002",
      "ai1": "HP",
      "ai2": "HP1",
      "ai3": "HP016"
     },
     {
      "code": "HP17",
      "desc": "HP017 - 百份百平田店",
      "addr": "Shop Nos. 203 & 205-208, 2\/F, Ping Tin Shopping Centre, ",
      "addr2": "Ping Tin Estate,Nos. 18 and 23 On Tin Street, Lam Tin, Kowloon",
      "addr3": "九龍 藍田 平田邨 平田商場 2樓 203, 205 至 208 號舖",
      "udfTrucklane": "E021",
      "ai1": "HP",
      "ai2": "HP1",
      "ai3": "HP017"
     },
     {
      "code": "HP20",
      "desc": "HP020 - 百份百大窩口店",
      "addr": "Shop No. 6, G\/F, Tai Wo Hau Commercial Centre (II),",
      "addr2": "Tai Wo Hau Estate, 15 Tai Wo Hau Road, Kwai Chung, Ｎ.T.",
      "addr3": "新界 葵涌 大窩口街 15號 大窩口邨 大窩口商場 2期 地下 6號舖",
      "udfTrucklane": "H013",
      "ai1": "HP",
      "ai2": "HP1",
      "ai3": "HP020"
     },
     {
      "code": "HP21",
      "desc": "HP021 - 百份百新屯門中心店",
      "addr": "Shop Nos. 134-135 & 143, Level 3, Sun Tuen Mun Shopping Centre,",
      "addr2": "No. 55-65 Lung Mun Road, Tuen Mun, Ｎ.T.",
      "addr3": "新界 屯門 龍門路 55-65號 新屯門商場 3樓 134 -135 及143號舖",
      "udfTrucklane": "C016",
      "ai1": "HP",
      "ai2": "HP1",
      "ai3": "HP021"
     },
     {
      "code": "HP22",
      "desc": "HP022 - 百份百寶琳店",
      "addr": "G\/F, Po Kan House, Po Lam Road,",
      "addr2": "Po Lam Estate, Tsang Kwan O, Ｎ.T.",
      "addr3": "新界 將軍澳 寶琳邨 寶琳北路 寶勤樓 地下",
      "udfTrucklane": "D017",
      "ai1": "HP",
      "ai2": "HP1",
      "ai3": "HP022"
     },
     {
      "code": "HP23",
      "desc": "HP023 - 百份百逸峯店",
      "addr": "Shop No. G06, G\/F, Green Code Plaza,",
      "addr2": "1 Ma Sik Road, Fanling, N.T.",
      "addr3": "新界 粉嶺 馬適路1號 逸峰商場 地下 G06舖",
      "udfTrucklane": "A003",
      "ai1": "HP",
      "ai2": "HP1",
      "ai3": "HP023"
     },
     {
      "code": "HP25",
      "desc": "HP025 - 百份百寶熙店",
      "addr": "Shop No.3, G\/F., Po Hei Court Commercial Centre,",
      "addr2": "Po Hei CourtNo.255 Po On Road, Kowloon.",
      "addr3": "九龍 深水埗 保安道255號 寶熙苑寶熙苑商場地下3號舖",
      "udfTrucklane": "B005",
      "ai1": "HP",
      "ai2": "HP2",
      "ai3": "HP025"
     },
     {
      "code": "HP26",
      "desc": "HP026 - 百份百天澤店",
      "addr": "Shop No. 9, G\/F, Tin Chak Shopping Centre,",
      "addr2": "71,73,75&77 Tin Shui Road,Tin Shui Wai, Ｎ.T.",
      "addr3": "新界 天水圍 天瑞路71,73,75及77號 天澤商場地下9號舖",
      "udfTrucklane": "C012",
      "ai1": "HP",
      "ai2": "HP2",
      "ai3": "HP026"
     },
     {
      "code": "HP27",
      "desc": "HP027 - 百份百南豐店",
      "addr": "Unit R-1B Podium Level 1, Nan Fung Plaza,",
      "addr2": "8 Pui Shing Road, Tseung Kwan O, N.T.",
      "addr3": "新界 將軍澳 培成路8號 南豐廣場1樓R-1B號舖",
      "udfTrucklane": "D007",
      "ai1": "HP",
      "ai2": "HP2",
      "ai3": "HP027"
     },
     {
      "code": "HP28",
      "desc": "HP028 - 百份百置富嘉湖店",
      "addr": "Shop No. G77-78a, G79&G80, G\/F., Phase 1, Fortune Kingswood,",
      "addr2": "12-18 Tin Yan Road, Tin Shui Wai, N.T.",
      "addr3": "新界 元朗 天水圍 天恩路1號 置富嘉湖地下G77-78a, G79&G80號舖",
      "udfTrucklane": "C009",
      "ai1": "HP",
      "ai2": "HP2",
      "ai3": "HP028"
     },
     {
      "code": "HP29",
      "desc": "HP029 - 百份百黃埔花園店",
      "addr": "Shop 41, G\/F, Site 12, Whampoa Garden,",
      "addr2": "Hung Hom, Kowloon",
      "addr3": "九龍 紅磡 黃埔花園 第十二期地下 41號舖",
      "udfTrucklane": "B015",
      "ai1": "HP",
      "ai2": "HP2",
      "ai3": "HP029"
     },
     {
      "code": "HP30",
      "desc": "HP030 - 百份百嘉福店",
      "addr": "Shop 103-104, 1\/F, Ka Fuk Shopping Centre,",
      "addr2": "Ka Fuk Estate, Fanling, N.T.",
      "addr3": "新界 粉嶺 嘉福邨 嘉福商場 1樓103及104號舖",
      "udfTrucklane": "A007",
      "ai1": "HP",
      "ai2": "HP2",
      "ai3": "HP030"
     },
     {
      "code": "HP32",
      "desc": "HP032 - 百份百奧柏御峯店",
      "addr": "G01-G03 & G05, Floor G, Tower 01 Park Summit,",
      "addr2": "88 Beech Street, Kowloon",
      "addr3": "九龍 大角咀 櫸樹街 88號 奧柏‧御峯 1座G1-3&G5號舖",
      "udfTrucklane": "E004",
      "ai1": "HP",
      "ai2": "HP2",
      "ai3": "HP032"
     },
     {
      "code": "HP33",
      "desc": "HP033 - 百份百大興店",
      "addr": "Shop 64, G\/F, Tai Hing Shopping Centre,",
      "addr2": "Tai Hing Estate, No. 1 Tai Hing Street,Tuen Mun, N.T",
      "addr3": "新界 屯門 大興街1號 大興商場地下64號舖",
      "udfTrucklane": "C020",
      "ai1": "HP",
      "ai2": "HP2",
      "ai3": "HP033"
     },
     {
      "code": "HP34",
      "desc": "HP034 - 百份百香港仔中心店",
      "addr": "Shop 6A, G\/F, Site 5, Aberdeen Centre,",
      "addr2": "Aberdeen, Hong Kong",
      "addr3": "香港 香港仔 香港仔中心地下6A號鋪",
      "udfTrucklane": "F002",
      "ai1": "HP",
      "ai2": "HP2",
      "ai3": "HP034"
     },
     {
      "code": "HP35",
      "desc": "HP035 - 百份百翠林店",
      "addr": "No. 128, 130A & 131A Level 5, Tsui Lam Square,",
      "addr2": "11 Tsui Lam Road,Tseung Kwan O, N.T,",
      "addr3": "新界 將軍澳 翠林街11號 翠林新城5樓120, 130A及131A號舖",
      "udfTrucklane": "D018",
      "ai1": "HP",
      "ai2": "HP2",
      "ai3": "HP035"
     },
     {
      "code": "HP36",
      "desc": "HP036 - 百份百港灣豪庭店",
      "addr": "Shop G71-73, G\/F, Metro Harbour Plaza,",
      "addr2": "8 Fuk Lee Street, Tai Kok Tsui, Kowloon",
      "addr3": "九龍 大角咀 福利街8號 港灣豪庭廣場地下G71-73號舖",
      "udfTrucklane": "E006",
      "ai1": "HP",
      "ai2": "HP2",
      "ai3": "HP036"
     },
     {
      "code": "HP37",
      "desc": "HP037 - 百份百美葵樓店",
      "addr": "Shop G02, G\/F, Mei Kwai House,",
      "addr2": "Shek Kip Mei Estate (Phase 3), 13 Park Tin Street Sham Shui Po, Kowloon",
      "addr3": "九龍 深水埗白田街13號 石硤尾邨美葵樓地下02號舖",
      "udfTrucklane": "B010",
      "ai1": "HP",
      "ai2": "HP2",
      "ai3": "HP037"
     },
     {
      "code": "HP38",
      "desc": "HP038 - 百份百啟朗店",
      "addr": "Shop 101, Retail Block Kai Long Court,",
      "addr2": "Kowloon City, Kowloon.",
      "addr3": "九龍城 啟德 沐安街18號 啟朗苑 101號舖\n",
      "udfTrucklane": "F021",
      "ai1": "HP",
      "ai2": "HP2",
      "ai3": "HP038"
     },
     {
      "code": "HP39",
      "desc": "HP039 - 百份百九龍酒店店",
      "addr": "Shop B2-09, the Kowloon Hotel,",
      "addr2": "19-21 Nathan Road, Tsimshatsui, Kowloon",
      "addr3": "九龍 尖沙咀 彌敦道19 - 21號 九龍酒店 B2-09號舖",
      "udfTrucklane": "B016",
      "ai1": "HP",
      "ai2": "HP2",
      "ai3": "HP039"
     },
     {
      "code": "HP40",
      "desc": "HP040 - 百份百石籬店",
      "addr": "Shop 324, 3\/F, Shek Lei Shopping Centre,",
      "addr2": "110 Tai Loong Street, Kwai Chung,New Territories.",
      "addr3": "新界 葵涌 110 大朗街 石籬廣場 3 樓 324號舖",
      "udfTrucklane": "G007",
      "ai1": "HP",
      "ai2": "HP2",
      "ai3": "HP040"
     },
     {
      "code": "IM03",
      "desc": "IM003 - 意樂良景店",
      "addr": "Shop No. L238, Level 2, Leung King Shopping Centre,",
      "addr2": "Leung King Estate, No. 31 Tin King Road, Tuen Mun, N.T.",
      "addr3": "新界 屯門 良景邨 良景廣場 ２樓 L238 號舖",
      "udfTrucklane": "H001",
      "ai1": "IM",
      "ai2": "IM1",
      "ai3": "IM003"
     },
     {
      "code": "IM04",
      "desc": "IM004 - 意樂彩雲店",
      "addr": "Shop No. A209, 2\/F, Choi Wan Shopping Centre (Phase 2),",
      "addr2": "Choi Wan (1) Estate,45 Clear Water Bay Road, Ngau Chi Wan, Kowloon",
      "addr3": "九龍 牛池灣 彩雲邨 彩雲商場2期 2樓 A209號舖",
      "udfTrucklane": "F018",
      "ai1": "IM",
      "ai2": "IM1",
      "ai3": "IM004"
     },
     {
      "code": "IM05",
      "desc": "IM005 - 意樂華富店",
      "addr": "Shop No. 2D, Wah Fu Shopping Centre,",
      "addr2": "Wah Fu (I) Estate, Aberdeen, Hong Kong",
      "addr3": "香港 香港仔 華富(I)邨 華富商場 2D 號舖",
      "udfTrucklane": "F001",
      "ai1": "IM",
      "ai2": "IM1",
      "ai3": "IM005"
     },
     {
      "code": "IM07",
      "desc": "IM007 - 意樂海趣坊店",
      "addr": "Shop Nos. 51-52, Ocean Walk,",
      "addr2": "No. 168-236 Wu Chui Road, Tuen Mun, Ｎ.T.",
      "addr3": "新界 屯門 湖翠路 168-236號 海趣坊 51-52號舖",
      "udfTrucklane": "C017",
      "ai1": "IM",
      "ai2": "IM1",
      "ai3": "IM007"
     },
     {
      "code": "IM08",
      "desc": "IM008 - 意樂逢源大廈店",
      "addr": "Shop No. F, Fung Yuen Building,",
      "addr2": "388-414 Shau Kei Wan Road,Shau Kei Wan, Hong Kong.",
      "addr3": "香港 筲箕灣 筲箕灣道 388-414號 逢源大廈 F 號舖",
      "udfTrucklane": "F017",
      "ai1": "IM",
      "ai2": "IM1",
      "ai3": "IM008"
     },
     {
      "code": "IM11",
      "desc": "IM011 - 意樂寶熙店",
      "addr": "Shop No.12, G\/F., Po Hei Court Commercial Centre,",
      "addr2": "Po Hei Court, No.255 Po On Road, Kowloon",
      "addr3": "九龍深水埗保安道255號寶熙苑寶熙苑商場地下12號舖",
      "udfTrucklane": "B004",
      "ai1": "IM",
      "ai2": "IM2",
      "ai3": "IM011"
     },
     {
      "code": "IM12",
      "desc": "IM012 - 意樂天晉匯店",
      "addr": "Shop No. G06A, G\/F, PopWalk 2,",
      "addr2": "No. 19 Tong Yin Street, Tseung Kwan O, Ｎ.T.",
      "addr3": "新界 將軍澳 唐賢街19號 天晉滙II商場地下G06A號舖",
      "udfTrucklane": "D004",
      "ai1": "IM",
      "ai2": "IM2",
      "ai3": "IM012"
     },
     {
      "code": "IM13",
      "desc": "IM013 - 意樂大興店",
      "addr": "Shop Nos. 70 and 75, G\/F, Tai Hing Shopping Centre,",
      "addr2": "No. 1 Tai Hing Street, Tuen Mun, Ｎ.T.",
      "addr3": "新界 屯門 大興街1號 大興商場地下70及75號舖",
      "udfTrucklane": "C019",
      "ai1": "IM",
      "ai2": "IM2",
      "ai3": "IM013"
     },
     {
      "code": "IM15",
      "desc": "IM015 - 意樂天慈店",
      "addr": "Shop No. 1C, G\/F, Tin Tsz Shopping Centre,",
      "addr2": "9 Tin Hei Street, Tin Shui Wai, Yuen Long, N.T.",
      "addr3": "新界 元朗 天水圍 天喜街 9 號 天慈邨 天慈商場地下1C號舖",
      "udfTrucklane": "C007",
      "ai1": "IM",
      "ai2": "IM2",
      "ai3": "IM015"
     },
     {
      "code": "IM16",
      "desc": "IM016 - 意樂新都城店",
      "addr": "Shop No.2028-31, Level 2, Metro City Plaza II,",
      "addr2": "8 Yan King Road, Tseung Kwan O, N.T.",
      "addr3": "新界 將軍澳 欣景路8號 新都城中心二期2樓2028-31號舖",
      "udfTrucklane": "D013",
      "ai1": "IM",
      "ai2": "IM2",
      "ai3": "IM016"
     },
     {
      "code": "IM17",
      "desc": "IM017 - 意樂天澤店",
      "addr": "Shop 104B-D, 1\/F,Tin Chak Shopping Centre,",
      "addr2": "71, 73, 75&77 Tin Shui Road, Tin Shui Wai, N.T.",
      "addr3": "新界 天水圍 天瑞路71, 73, 75及77號 天澤商場1樓104B-D號舖",
      "udfTrucklane": "C013",
      "ai1": "IM",
      "ai2": "IM2",
      "ai3": "IM017"
     },
     {
      "code": "IM18",
      "desc": "IM018 - 意樂迎東店",
      "addr": "Shop No.2, G\/F, Ying Tung Shopping Centre,",
      "addr2": "Ying Tung Estate, 1 Ying Tung Road, Lantau Island, Tung Chung, N.T.",
      "addr3": "新界 東涌 大嶼山 迎東路1號 迎東邨 迎東商場地下2號舖",
      "udfTrucklane": "H017",
      "ai1": "IM",
      "ai2": "IM2",
      "ai3": "IM018"
     },
     {
      "code": "IM19",
      "desc": "IM019 - 意樂曼坊店",
      "addr": "Shop No. 101C, 104&107, 1\/F, Manhattan Mid-Town,",
      "addr2": "1 Po Lun Street, Mei Foo, Kowloon",
      "addr3": "九龍 美孚 寶輪街1號 曼坊–曼克頓山  1樓101C, 104&107號舖",
      "udfTrucklane": "B001",
      "ai1": "IM",
      "ai2": "IM2",
      "ai3": "IM019"
     },
     {
      "code": "IM20",
      "desc": "IM020 - 意樂置富嘉湖店",
      "addr": "Shop No. G77-78a, G79&G80, G\/F., Phase 1, Fortune Kingswood,",
      "addr2": "Fortune Kingswood,12-18 Tin Yan Road, Tin Shui Wai, N.T.",
      "addr3": "新界 元朗 天水圍 天恩路1號 置富嘉湖地下G77-78a, G79&G80號舖",
      "udfTrucklane": "C008",
      "ai1": "IM",
      "ai2": "IM2",
      "ai3": "IM020"
     },
     {
      "code": "IM21",
      "desc": "IM021 - 意樂何文田店",
      "addr": "Shop No, 101B, 1\/F, Homantin Plaza,",
      "addr2": "80 Fat Kwon Street, Homantin, Kowloon",
      "addr3": "九龍 何文田 佛光街80號 何文田邨 何文田廣場1樓101B號舖",
      "udfTrucklane": "B013",
      "ai1": "IM",
      "ai2": "IM3",
      "ai3": "IM021"
     },
     {
      "code": "IM22",
      "desc": "IM022 - 意樂囍逸店",
      "addr": "No. G04, Commune Modern,",
      "addr2": "28 Wo Fung Road, Fanling, N.T.",
      "addr3": "新界 粉嶺 聯和墟 和豐街 28號 囍逸地下G04號舖",
      "udfTrucklane": "A005",
      "ai1": "IM",
      "ai2": "IM3",
      "ai3": "IM022"
     },
     {
      "code": "IM23",
      "desc": "IM023 - 意樂香港仔中心店",
      "addr": "Shop 6A, G\/F, Site 5, Aberdeen Centre,",
      "addr2": "Aberdeen, Hong Kong",
      "addr3": "香港 香港仔 香港仔中心地下6A號鋪",
      "udfTrucklane": "F003",
      "ai1": "IM",
      "ai2": "IM3",
      "ai3": "IM023"
     },
     {
      "code": "IM24",
      "desc": "IM024 - 意樂荃錦中心店",
      "addr": "Shop 51-75, 2\/F, Tsuen Kam Centre,",
      "addr2": "338 Castle Peak Road, Tsuen Wan, N.T",
      "addr3": "新界 荃灣 青山公路338號 荃錦中心 2樓 51-75號舖",
      "udfTrucklane": "H012",
      "ai1": "IM",
      "ai2": "IM3",
      "ai3": "IM024"
     },
     {
      "code": "IM25",
      "desc": "IM025 - 意樂新九龍廣場店",
      "addr": "Shop Nos. 031-033, Ground Floor,",
      "addr2": "New Kowloon Plaza, Tai Kok Tsui, Kowloon.",
      "addr3": "九龍 大角咀 大角咀道38號 新九龍廣場 地下 031-033號舖",
      "udfTrucklane": "E003",
      "ai1": "IM",
      "ai2": "IM3",
      "ai3": "IM025"
     },
     {
      "code": "IM26",
      "desc": "IM026 - 意樂樂富店",
      "addr": "Shop Nos. U210, U211, U213, UG 2\/F Zone B, Lok Fu Place,",
      "addr2": "198 Junction Road, Wong Tai Sin, Kowloon",
      "addr3": "九龍 黃大仙 聯合道198號樂富廣場B區 2樓 U210, U211, U213 號舖",
      "udfTrucklane": "G010",
      "ai1": "IM",
      "ai2": "IM3",
      "ai3": "IM026"
     },
     {
      "code": "IM27",
      "desc": "IM027 - 意樂石籬店",
      "addr": "Shop 324, 3\/F, Shek Lei Shopping Centre,",
      "addr2": "110 Tai Loong Street, Kwai Chung,New Territories.",
      "addr3": "新界 葵涌 110 大朗街 石籬廣場 3 樓 324號舖",
      "udfTrucklane": "G008",
      "ai1": "IM",
      "ai2": "IM3",
      "ai3": "IM027"
     },
     {
      "code": "IM28",
      "desc": "IM028 - 意樂啟朗店",
      "addr": "Shop 101, Retail Block Kai Long Court,",
      "addr2": "Kowloon City, Kowloon. ",
      "addr3": "九龍城 啟德 沐安街18號 啟朗苑 101號舖\n",
      "udfTrucklane": "F022",
      "ai1": "IM",
      "ai2": "IM3",
      "ai3": "IM028"
     },
     {
      "code": "IM29",
      "desc": "IM029 - 意樂錦綉花園店",
      "addr": "Block E, 1, 1A and 2, G\/F,",
      "addr2": "Fairview Park, Yuen Long, N.T.",
      "addr3": "新界 元朗錦綉花園商場E座地下1, 1A 及2號舖",
      "udfTrucklane": "C001",
      "ai1": "IM",
      "ai2": "IM3",
      "ai3": "IM029"
     },
     {
      "code": "LF01",
      "desc": "LF001 - 漁樂禾輋店",
      "addr": "Shop No. 332, 3\/F, Wo Che Plaza,",
      "addr2": "Wo Che Estate, 3 Tak Hau Street, Shatin, N.T.",
      "addr3": "新界 沙田 禾輋邨 禾輋商場 3樓 332 號舖",
      "udfTrucklane": "G018",
      "ai1": "LF",
      "ai2": "LF1",
      "ai3": "LF001"
     },
     {
      "code": "LF03",
      "desc": "LF003 - 漁樂尚德店",
      "addr": "Shop No. 205B, Second Floor, Sheung Tak Plaza,",
      "addr2": "Sheung Tak Estate, 2 Tong Ming Street, Tseung Kwan O, N.T.",
      "addr3": "將軍澳 唐明街2號 尚德邨尚德廣場2樓205B號舖",
      "udfTrucklane": "D001",
      "ai1": "LF",
      "ai2": "LF1",
      "ai3": "LF003"
     },
     {
      "code": "LF04",
      "desc": "LF004 - 漁樂黃大仙店",
      "addr": "Shop No. UG5, Upper Ground Floor, Temple Mall South,",
      "addr2": "Lower Wong Tai Sin (2) Estate, Wong Tai Sin, Kowloon, Hong Kong",
      "addr3": "黃大仙下(二)邨黃大仙中心南館UG層5號舖",
      "udfTrucklane": "F020",
      "ai1": "LF",
      "ai2": "LF1",
      "ai3": "LF004"
     },
     {
      "code": "LF05",
      "desc": "LF005 - 漁樂天澤店",
      "addr": "Shop 104B-D, 1\/F,Tin Chak Shopping Centre,",
      "addr2": "71, 73, 75&77 Tin Shui Road, Tin Shui Wai, N.T.",
      "addr3": "新界 天水圍 天瑞路71, 73, 75及77號 天澤商場1樓104B-D號舖",
      "udfTrucklane": "C014",
      "ai1": "LF",
      "ai2": "LF1",
      "ai3": "LF005"
     },
     {
      "code": "LF06",
      "desc": "LF006 - 漁樂曼坊店",
      "addr": "Shop No. 101C, 104&107, 1\/F, Manhattan Mid-Town,",
      "addr2": "1 Po Lun Street, Mei Foo, Kowloon",
      "addr3": "九龍 美孚 寶輪街1號 曼坊–曼克頓山  1樓101C, 104&107號舖",
      "udfTrucklane": "B002",
      "ai1": "LF",
      "ai2": "LF1",
      "ai3": "LF006"
     },
     {
      "code": "LF07",
      "desc": "LF007 - 漁樂欣田店",
      "addr": "Shop G05, G\/F, Yan Tin Shopping Centre,",
      "addr2": "Yan Tin Estate, Tuen Mun, N.T.",
      "addr3": "新界 屯門 欣田邨 欣田商場地下 G05號舖",
      "udfTrucklane": "C023",
      "ai1": "LF",
      "ai2": "LF1",
      "ai3": "LF007"
     },
     {
      "code": "LF08",
      "desc": "LF008 - 漁樂富泰店",
      "addr": "Shop no. 103E, 1st Floor, Fu Tai Shopping Centre,",
      "addr2": "Fu Tai Estate, Tuen Mun, N.T",
      "addr3": "新界 屯門 屯貴路9號富泰商場 1樓103E號舖",
      "udfTrucklane": "H003",
      "ai1": "LF",
      "ai2": "LF1",
      "ai3": "LF008"
     },
     {
      "code": "LF09",
      "desc": "LF009 - 漁樂良景店",
      "addr": "Shop No. L238, Level 2, Leung King Shopping Centre,",
      "addr2": "Leung King Estate, No. 31 Tin King Road, Tuen Mun, N.T.",
      "addr3": "新界 屯門 良景邨 良景廣場 ２樓 L238 號舖",
      "udfTrucklane": "H002",
      "ai1": "LF",
      "ai2": "LF1",
      "ai3": "LF009"
     },
     {
      "code": "LF10",
      "desc": "LF010 - 漁樂大興店",
      "addr": "Shop 72 & 73, G\/F, Tai Hing Shopping Centre,",
      "addr2": "Tai Hing Estate, No. 1 Tai Hing Street, Tuen Mun, N.T",
      "addr3": "新界 屯門 大興街1號 大興商場地下72-73號舖",
      "udfTrucklane": "C021",
      "ai1": "LF",
      "ai2": "LF1",
      "ai3": "LF010"
     },
     {
      "code": "MM02",
      "desc": "MM002 - 韓樂頌富店",
      "addr": "Shop No. N210, 2\/F, T Town North,",
      "addr2": "30 & 33 Tin Wah Road, Tin Shui Wai, N.T.",
      "addr3": "新界 天水圍 天華路30及33號 T Town North 2 樓 N210號鋪",
      "udfTrucklane": "C011",
      "ai1": "MM",
      "ai2": "MM1",
      "ai3": "MM002"
     },
     {
      "code": "MM04",
      "desc": "MM004 - 韓樂海之戀店",
      "addr": "Shop No. G16, G\/F, OP Mall,",
      "addr2": "Tsuen Wan, N.T.",
      "addr3": "新界 荃灣 大河道100號 海之戀商場地下 G16號舖",
      "udfTrucklane": "H011",
      "ai1": "MM",
      "ai2": "MM1",
      "ai3": "MM004"
     },
     {
      "code": "TY06",
      "desc": "TY006 - 桃園彩雲店",
      "addr": "Shop No. A322, 3\/F, Choi Wan Shopping Centre (Phase 2),",
      "addr2": "Choi Wan (1) Estate, No. 45 Clear Water Bay Road, Ngau Chi Wan, Kowloon",
      "addr3": "九龍 牛池灣 彩雲邨 彩雲商場2期 3樓 A322號舖",
      "udfTrucklane": "F019",
      "ai1": "TY",
      "ai2": "TY1",
      "ai3": "TY006"
     },
     {
      "code": "TY10",
      "desc": "TY010 - 桃園朗屏店",
      "addr": "Shop No. L114, First Floor, Long Ping Shopping Centre,",
      "addr2": "Long Pin Estate, Yuen Long, Ｎ.T.",
      "addr3": "新界 元朗 朗屏邨 朗屏商場 1樓 L114號舖",
      "udfTrucklane": "C006",
      "ai1": "TY",
      "ai2": "TY1",
      "ai3": "TY010"
     },
     {
      "code": "TY13",
      "desc": "TY013 - 桃園寶琳店",
      "addr": "Shop No. 304, 3\/FL, Po Lam Shopping Centre,",
      "addr2": "Po Lam Est, No 18 Po Lam Road,Tseung Kwan O, N.T.",
      "addr3": "新界 將軍澳 寶琳北路18號 寶林商場3樓304號舖",
      "udfTrucklane": "D016",
      "ai1": "TY",
      "ai2": "TY2",
      "ai3": "TY013"
     },
     {
      "code": "TY14",
      "desc": "TY014 - 桃園慈雲山店",
      "addr": "Shop 113, 1\/F, Tsz Wan Shan Shopping Centre,",
      "addr2": "Tse Lok Estate, Tsz Wan Shan,Wong Tai Sin, Kowloon",
      "addr3": "九龍 黃大仙 慈雲山 慈樂邨 慈雲山中心1樓113號舖",
      "udfTrucklane": "G013",
      "ai1": "TY",
      "ai2": "TY2",
      "ai3": "TY014"
     },
     {
      "code": "TY15",
      "desc": "TY015 - 木兆小品-樂富店",
      "addr": "Shop Nos. U210, U211, U213, UG 2\/F Zone B,",
      "addr2": "Luk Fu Plaza, 198 Junction Road, Wong Tai Sin, Kowloon",
      "addr3": "九龍 黃大仙 聯合道198號樂富廣場B區 2樓 U210, U211, U213 號舖",
      "udfTrucklane": "G011",
      "ai1": "TY",
      "ai2": "TY2",
      "ai3": "TY015"
     },
    
     {
      "code": "HP41",
      "desc": "HP041 - 百份百荃薈店",
      "addr": "Shops Nos. 37-43 and 43A, Ground Floor, Smartland,",
      "addr2": "No. 16 Tsuen Wah Street, Tsuen Wan, New Territories",
      "addr3": "新界 荃灣 16 荃華街 荃薈商場 地下 37-43號舖",
      "ai1": "HP",
      "ai2": "HP3",
      "ai3": "HP041"
     },
     {
      "code": "IM31",
      "desc": "IM031 - 意樂嘉福店",
      "addr": "Shop Nos. 3-5, G\/F, Ka Fuk Shopping Centre,",
      "addr2": "Ka Fuk Estate, Fanling, N.T.",
      "addr3": "新界 粉嶺 嘉福邨 嘉福商場 地下３-5號舖",
      "udfTrucklane": "A006",
      "ai1": "IM",
      "ai2": "IM3",
      "ai3": "IM031"
     },
     {
      "code": "CT02",
      "desc": "CT002 - 茶泰健威坊店",
      "addr": "Shop No. U26, Upper Ground Floor, Fitfort,",
      "addr2": "560 King's Road, North Point, Hong Kong",
      "addr3": "香港 北角英皇道560號健威坊UG樓U26號舖",
      "udfTrucklane": "F011",
      "ai1": "CT",
      "ai2": "CT1",
      "ai3": "CT002"
     },
     {
      "code": "TY16",
      "desc": "TY016 - 桃園美禧樓店",
      "addr": "Shop G05, Mei Hei House",
      "addr2": "Shek Kip Mei Estate (Phase 6), Sham Shui PO, Kowloon",
      "addr3": "九龍 深水埗石硤尾邨第6期美禧樓G05號舖",
      "udfTrucklane": "B011",
      "ai1": "TY",
      "ai2": "TY2",
      "ai3": "TY016"
     },
     {
      "code": "TY17",
      "desc": "TY017 - 木兆小品-寶達店",
      "addr": "Shop 121-122, P1 Floor, Po Tat Shopping Centre,",
      "addr2": "Po Tat Estate, 2 Po Lam Road, Kowloon",
      "addr3": "九龍 寶達邨寶達商場P1樓121-122號舖",
      "udfTrucklane": "E023",
      "ai1": "TY",
      "ai2": "TY2",
      "ai3": "TY017"
     },
     {
      "code": "IM35",
      "desc": "IM035 - 意樂健威坊店",
      "addr": "Shop No. U26, Upper Ground Floor, Fitfort,",
      "addr2": "560 King's Road, North Point, Hong Kong",
      "addr3": "香港 北角英皇道560號健威坊UG樓U26號舖",
      "udfTrucklane": "F010",
      "ai1": "IM",
      "ai2": "IM4",
      "ai3": "IM035"
     },
     {
      "code": "IM33",
      "desc": "IM033 - 意樂利安店",
      "addr": "Shop Nos.101-102, Level LG\/1 Floor, Lee On Shopping Centre",
      "addr2": "Lee On Estate, No. 23 Sha On Street, Ma On Shan, N.T",
      "addr3": "新界馬鞍山利安邨利安商場LG1樓101-102號舖",
      "udfTrucklane": "A018",
      "ai1": "IM",
      "ai2": "IM4",
      "ai3": "IM033"
     },
     {
      "code": "IM32",
      "desc": "IM032 - 意樂幸福店",
      "addr": "Shop Nos. G16-17, G\/F, Fortune Shopping Centre,",
      "addr2": "Fortune Estate, 8 Hang Cheung Street, Cheung Sha Wan, Kowloon",
      "addr3": "九龍長沙灣幸福邨幸福商場地下G16-17號舖",
      "udfTrucklane": "B003",
      "ai1": "IM",
      "ai2": "IM4",
      "ai3": "IM032"
     },
     {
      "code": "HP42",
      "desc": "HP042 - 百份百長亨店",
      "addr": "Shop Nos. 319-320, Third Floor, Cheung Hang Shopping Centre",
      "addr2": "Cheung Hang Estate, 6 Liu To Road, Rsing Yi, N.T.",
      "addr3": "新界 青衣 長亨邨 長亨商場 3樓 319-320號舖",
      "udfTrucklane": "H008",
      "ai1": "HP",
      "ai2": "HP3",
      "ai3": "HP042"
     },
     {
      "code": "IM34",
      "desc": "IM034 - 意樂海怡商場店",
      "addr": "NOS 117, 118 & 119, 1\/F, MARINA SQUARE,",
      "addr2": "SOUTH HORIZONS, AP LEI CHAU, HONG KONG",
      "addr3": "香港鴨脷洲海怡商場117, 118 及 119號舖",
      "udfTrucklane": "F005",
      "ai1": "IM",
      "ai2": "IM4",
      "ai3": "IM034"
     },
     {
      "code": "HP45",
      "desc": "HP045 - 百份百寶石湖店",
      "addr": "Shop No. 3, Pik Yuk House, Po Shek Wu Estate,",
      "addr2": "Sheung Shui, N.T.",
      "addr3": "新界上水寶石湖邨碧玉樓3號舖",
      "udfTrucklane": "A001",
      "ai1": "HP",
      "ai2": "HP3",
      "ai3": "HP045"
     },
     {
      "code": "HP46",
      "desc": "HP046 - 百份百新都大廈店",
      "addr": "Shop No. 310, 2nd Floor (Level 3), New Town Mansion,",
      "addr2": "No. 2 Tuen Lee Street, Tuen Mun, NT",
      "addr3": "新界屯門屯利街2號, 新都大廈L3 3樓310號舖",
      "udfTrucklane": "C025",
      "ai1": "HP",
      "ai2": "HP3",
      "ai3": "HP046"
     },
     {
      "code": "HP47",
      "desc": "HP047 - 百份百新都城店",
      "addr": "Shop No. G27 Metro City Phase I,",
      "addr2": "Tseung Kwan O, NT",
      "addr3": "新界將軍澳新都城一期G27號舖",
      "udfTrucklane": "D014",
      "ai1": "HP",
      "ai2": "HP3",
      "ai3": "HP047"
     },
     {
      "code": "TY18",
      "desc": "TY018 - 木兆小品-天晉店",
      "addr": "Shop No. G17 on the Ground Floor of Pop Walk 2,",
      "addr2": "No. 19 Tong Yin Street, Tseung Kwan O, New Territories",
      "addr3": "新界 將軍澳 唐賢街19號 天晉滙II商場地下G17號舖",
      "udfTrucklane": "D005",
      "ai1": "TY",
      "ai2": "TY2",
      "ai3": "TY018"
     },
     {
      "code": "MM05",
      "desc": "MM005 - 韓樂將軍澳廣場店",
      "addr": "Shop Nos. 2-070-072 on Level 2,  Tseung Kwan O Plaza,",
      "addr2": "1 Tong Tak Street, Tseung Kwan O, N.T.",
      "addr3": "新界 將軍澳 將軍澳廣場2樓 2070-2072號鋪",
      "udfTrucklane": "D002",
      "ai1": "MM",
      "ai2": "MM1",
      "ai3": "MM005"
     },
     {
      "code": "MM06",
      "desc": "MM006 - 韓樂新世紀廣場店",
      "addr": "Shop No.127 on Level 1, Moko,",
      "addr2": "Mongkok, Kowloon",
      "addr3": "九龍 旺角 新世紀廣場 1樓 127號鋪",
      "udfTrucklane": "F026",
      "ai1": "MM",
      "ai2": "MM1",
      "ai3": "MM006"
     },
     {
      "code": "IM37",
      "desc": "IM037 - 意樂荃新天地店",
      "addr": "UG82-UG83, Floor UG, Citywalk 2, ",
      "addr2": "No. 18 Yeung Uk Road, Tsuen Wan",
      "addr3": "新界 荃灣 荃新天地2期 UG樓 UG82-UG83號鋪",
      "udfTrucklane": "G001",
      "ai1": "IM",
      "ai2": "IM4",
      "ai3": "IM037"
     },
     {
      "code": "CF01",
      "desc": "CF001 - 雞檔健威坊店",
      "addr": "SHOP U24 UPPER GROUND FLOOR,",
      "addr2": "FIRFORT, 560 KING'S ROAD, HONG KONG",
      "addr3": "香港 北角 健威坊 UG樓 U24號舖",
      "udfTrucklane": "F012",
      "ai1": "CF",
      "ai2": "CF1",
      "ai3": "CF001"
     },
     {
      "code": "HP48",
      "desc": "HP048 - 百份百麗港城店",
      "addr": "Shop Nos. 72-75A & 81-84, 1\/F, Laguna Plaza,",
      "addr2": "Kwun Tong, Kowloon",
      "addr3": "九龍 觀塘 麗港城1樓72-75A及81-84號鋪",
      "udfTrucklane": "E011",
      "ai1": "HP",
      "ai2": "HP3",
      "ai3": "HP048"
     },
     {
      "code": "HP49",
      "desc": "HP049 - 百份百鴨脷洲店",
      "addr": "Shop No. 9, Ground Floor, Commercial\/Car Park Block,",
      "addr2": "Ap Lei Chau Estate, Hong Kong",
      "addr3": "香港 鴨脷洲邨停車場大樓 地下 9號舖",
      "udfTrucklane": "F007",
      "ai1": "HP",
      "ai2": "HP3",
      "ai3": "HP049"
     },
     {
      "code": "IM36",
      "desc": "IM036 - 意樂麗港城店",
      "addr": "Shop Nos. 72-75A & 81-84, 1\/F, Laguna Plaza,",
      "addr2": "Kwun Tong, Kowloon",
      "addr3": "九龍 觀塘 麗港城1樓72-75A及81-84號鋪",
      "udfTrucklane": "E012",
      "ai1": "IM",
      "ai2": "IM4",
      "ai3": "IM036"
     },
     {
      "code": "IM38",
      "desc": "IM038 - 意樂富泰店",
      "addr": "Shop No. 217, 2\/F, Fu Tai Shopping Centre,",
      "addr2": "Tuen Mun, N.T.",
      "addr3": "新界 屯門 富泰商場 2樓217號鋪",
      "udfTrucklane": "H005",
      "ai1": "IM",
      "ai2": "IM4",
      "ai3": "IM038"
     },
    
     {
      "code": "CF02",
      "desc": "CF002 - 雞檔將軍澳廣場店",
      "addr": "SHOP NOS 2-070-072 LEVEL 2, TSEUNG KWAN O PLAZA,",
      "addr2": "1 TONG TAK STREET, TSEUNG KWAN O, N.T.",
      "addr3": "新界 將軍澳 將軍澳廣場2樓 2070-2072號鋪",
      "udfTrucklane": "D003",
      "ai1": "CF",
      "ai2": "CF1",
      "ai3": "CF002"
     },
     {
      "code": "HP50",
      "desc": "HP050 - 百份百秦石店",
      "addr": "Shop Nos. 2 & 3, Ground Floor, Chun Shek shopping Centre, Chun Shek Estate,",
      "addr2": "1 Shing Tin Street, Shatin, New Territories, Hong Kong",
      "addr3": "新界 沙田 秦石邨 秦石商場 地下2&3號舖",
      "udfTrucklane": "A022",
      "ai1": "HP",
      "ai2": "HP3",
      "ai3": "HP050"
     },
     {
      "code": "CF03",
      "desc": "CF003 - 雞檔富亨店",
      "addr": "Shop No.22, Ground Floor, Fu Heng Shopping Centre,",
      "addr2": "Fu Heng Estate, No.6 Chung Nga Road, Tai Po, New Territories",
      "addr3": "新界 大埔 富亨商場 地下 22 號舖",
      "udfTrucklane": "A013",
      "ai1": "CF",
      "ai2": "CF1",
      "ai3": "CF003"
     },
     {
      "code": "CF04",
      "desc": "CF004 - 雞檔麗港城店",
      "addr": "Shop Nos. 72-75A & 81-84 on First Floor of Laguna Plaza,",
      "addr2": "88 Cha Kwo Ling Road, Kwun Tong, Kowloon",
      "addr3": "九龍 觀塘 麗港城1樓72-75A及81-84號鋪",
      "udfTrucklane": "E014",
      "ai1": "CF",
      "ai2": "CF1",
      "ai3": "CF004"
     },
     {
      "code": "CF05",
      "desc": "CF005 - 雞檔海富店",
      "addr": "Shop No. 1, Ground Floor, Hoi Fu Shopping Centre, Hoi Fu Court,",
      "addr2": "2 Hoi Ting Road, Mongkok, Kowloon",
      "addr3": "九龍 旺角 海富商場 地下 1號舖",
      "udfTrucklane": "E010",
      "ai1": "CF",
      "ai2": "CF1",
      "ai3": "CF005"
     },
     {
      "code": "IM39",
      "desc": "IM039 - 意樂海富店",
      "addr": "Shop No. 2A, Ground Floor, Hoi Fu Shopping Centre, Hoi Fu Court,",
      "addr2": "2 Hoi Ting Road, Mongkok, Kowloon",
      "addr3": "九龍 旺角 海富商場 地下 2A號舖",
      "ai1": "IM",
      "ai2": "IM1",
      "ai3": "IM039"
     },
     {
      "code": "MM07",
      "desc": "MM007 - 韓樂啟田店",
      "addr": "Shop No. 303, Third Floor, Kai Tin Shopping Centre, Kai Tin Estate and On Tin Estate,",
      "addr2": "50 Kai Tin Road, Lam Tin, Kowloon, Hong Kong",
      "addr3": "九龍 藍田 啟田商場 3樓 303號舖",
      "udfTrucklane": "E019",
      "ai1": "MM",
      "ai2": "MM1",
      "ai3": "MM007"
     },
     {
      "code": "TY19",
      "desc": "TY019 - 木兆小品-啟田店",
      "addr": "Shop No. 303, Third Floor, Kai Tin Shopping Centre, Kai Tin Estate and On Tin Estate,",
      "addr2": "50 Kai Tin Road, Lam Tin, Kowloon, Hong Kong",
      "addr3": "九龍 藍田 啟田商場 3樓 303號舖",
      "udfTrucklane": "E018",
      "ai1": "TY",
      "ai2": "TY2",
      "ai3": "TY019"
     },
     {
      "code": "CF06",
      "desc": "CF006 - 雞檔海怡商場店",
      "addr": "Units Nos. 117, 118 & 119, First Floor of Marina Square,",
      "addr2": "South Horizons, Ap Lei Chau, Hong Kong",
      "addr3": "香港 鴨脷洲 海怡商場 117, 118 及 119號舖",
      "udfTrucklane": "F006",
      "ai1": "CF",
      "ai2": "CF1",
      "ai3": "CF006"
     },
     {
      "code": "HP51",
      "desc": "HP051 - 百份百V WALK店",
      "addr": "Shop No. L2-116 on Level Two of V Walk,",
      "addr2": "No.28 Sham Mong Road, Kowloon",
      "addr3": "九龍 西九龍 深水埗 深旺道28號V Walk 2樓L2-116號舖",
      "udfTrucklane": "E002",
      "ai1": "HP",
      "ai2": "HP4",
      "ai3": "HP051"
     },
     {
      "code": "HP52",
      "desc": "HP052 - 百份百濕地店",
      "addr": "Shop No. 2B on Ground Floor of the Commercial Accommodation (Wetland) on Tin Shui Waiown Lot No.34, ",
      "addr2": "Tin Shui Wai, New Territories",
      "addr3": "新界 天水圍 濕地公園商埸地下2B號舖",
      "udfTrucklane": "C015",
      "ai1": "HP",
      "ai2": "HP4",
      "ai3": "HP052"
     },
     {
      "code": "MC01",
      "desc": "MC001 - 牛奶智選假日",
      "addr": "Shop G02, Ground Floor, Holiday Inn Express, No.33 Sharp Street East,",
      "addr2": "No.11 Yiu Wa Street, Causeway Bay, Hong Kong",
      "addr3": "香港 銅鑼灣 霎東街33號  智選假日酒店 G02 號舖",
      "udfTrucklane": "F009",
      "ai1": "MC",
      "ai2": "MC1",
      "ai3": "MC001"
     },
     {
      "code": "MC02",
      "desc": "MC002 - 牛奶御海灣",
      "addr": "Shop Nos. 15 - 17, G\/F, Regency Bay Shopping Arcade,",
      "addr2": "23 Hoi Wong Road, Tuen Mun, New Territories",
      "addr3": "新界 屯門 海皇路23號 御海灣廣場 地下15-17號舖",
      "udfTrucklane": "H007",
      "ai1": "MC",
      "ai2": "MC1",
      "ai3": "MC002"
     },
     {
      "code": "CF07",
      "desc": "CF007 - 雞檔V WALK店",
      "addr": "Shop No. L2-116 on Level Two of V Walk,",
      "addr2": "No.28 Sham Mong Road, Kowloon",
      "addr3": "九龍 西九龍 深水埗 深旺道28號V Walk 2樓L2-116號舖",
      "udfTrucklane": "E001",
      "ai1": "CF",
      "ai2": "CF1",
      "ai3": "CF007"
     },
     {
      "code": "CF08",
      "desc": "CF008 - 雞檔御海灣店",
      "addr": "Shop Nos. 15 - 17, G\/F, Regency Bay Shopping Arcade",
      "addr2": "23 Hoi Wong Road, Tuen Mun, New Territories",
      "addr3": "新界 屯門 海皇路23號 御海灣廣場 地下15-17號舖",
      "udfTrucklane": "H006",
      "ai1": "CF",
      "ai2": "CF1",
      "ai3": "CF008"
     },
     {
      "code": "IM40",
      "desc": "IM040 - 意樂慈雲山中心店",
      "addr": "Shop No. 108C on First Floor, Tsz Wan Shan Shopping Centre,",
      "addr2": "Tsz Lok Estate, Tsz Wan Shan, Kowloon, Hong Kong",
      "addr3": "九龍 慈雲山 慈樂邨 慈雲山中心 1樓 108C號舖",
      "udfTrucklane": "G014",
      "ai1": "IM",
      "ai2": "IM4",
      "ai3": "IM040"
     },
     {
      "code": "CF09",
      "desc": "CF009 - 雞檔慈雲山中心店",
      "addr": "Shop No. 108C on First Floor, Tsz Wan Shan Shopping Centre,",
      "addr2": "Tsz Lok Estate, Tsz Wan Shan, Kowloon, Hong Kong",
      "addr3": "九龍 慈雲山 慈樂邨 慈雲山中心 1樓 108C號舖",
      "udfTrucklane": "G015",
      "ai1": "CF",
      "ai2": "CF1",
      "ai3": "CF009"
     },
     {
      "code": "IM41",
      "desc": "IM041 - 意樂形點II店",
      "addr": "Shop Nos. A201-A202 on Level 2, YOHO MALL II,",
      "addr2": "8 Long Yat Road, Yuen Long, New Territories",
      "addr3": "新界 元朗 朗日路8-9號 形點II 2樓 A201-A202號舖",
      "udfTrucklane": "C005",
      "ai1": "IM",
      "ai2": "IM5",
      "ai3": "IM041"
     },
     {
      "code": "CT03",
      "desc": "CT003 - 茶泰荃新天地店",
      "addr": "UG81, Floor UG, Citywalk 2, ",
      "addr2": "No. 18 Yeung Uk Road, Tsuen Wan",
      "addr3": "香港 新界 荃灣 楊屋道18號 荃新天地2期 UG層 UG81號舖",
      "udfTrucklane": "G003",
      "ai1": "CT",
      "ai2": "CT1",
      "ai3": "CT003"
     },
     {
      "code": "MC03",
      "desc": "MC003 - 牛奶328廣場",
      "addr": "Shop No. G6 & G7 on G\/F, Plaza 328, Bo Shek Mansion,",
      "addr2": "328 Sha Tsui Road, Tsuen Wan, New Territories",
      "addr3": "新界 荃灣 沙咀道328號 寶石大廈 328廣場 G06 & G07 號舖",
      "ai1": "MC",
      "ai2": "MC1",
      "ai3": "MC003"
     },
     {
      "code": "MC04",
      "desc": "MC004 - 牛奶廣田",
      "addr": "No.2, Ground Floor, Kwong Tin Shopping Centre,",
      "addr2": "Kwong Tin Estate, Pik Wan Road, Lam Tin",
      "addr3": "香港 九龍 藍田 廣田邨 廣田商場 地下2號舖",
      "udfTrucklane": "E017",
      "ai1": "MC",
      "ai2": "MC1",
      "ai3": "MC004"
     },
     {
      "code": "CF10",
      "desc": "CF010 - 雞檔荃新天地店",
      "addr": "UG81, Floor UG, Citywalk 2,",
      "addr2": "No. 18 Yeung Uk Road, Tsuen Wan",
      "addr3": "香港 新界 荃灣 楊屋道18號 荃新天地2期 UG層 UG81號舖",
      "udfTrucklane": "G004",
      "ai1": "CF",
      "ai2": "CF1",
      "ai3": "CF010"
     },
     {
      "code": "IM42",
      "desc": "IM042 - 意樂翔龍灣店",
      "addr": "Shop Nos. G04A, G04B and G04C, Ground Floor, Grand Waterfront Plaza,",
      "addr2": "38 San Ma Tau Street, Ma Tau Kok, Kowloon",
      "addr3": "九龍 碼頭角 新碼頭街38號 翔龍灣廣場 地下 G04A, G04B & G04C 號舖",
      "udfTrucklane": "F024",
      "ai1": "IM",
      "ai2": "IM5",
      "ai3": "IM042"
     },
     {
      "code": "CF11",
      "desc": "CF011 - 雞檔翔龍灣店",
      "addr": "Shop Nos. G04A, G04B and G04C, Ground Floor, Grand Waterfront Plaza,",
      "addr2": "38 San Ma Tau Street, Ma Tau Kok, Kowloon",
      "addr3": "九龍 碼頭角 新碼頭街38號 翔龍灣廣場 地下 G04A, G04B & G04C 號舖",
      "udfTrucklane": "F025",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF011"
     },
     {
      "code": "TY20",
      "desc": "TY020 - 木兆小品-荃灣廣場店",
      "addr": "Shop Nos. B101-B104 on Basement 1 of Tsuen Wan Plaza, Tsuen Wan, N.T.",
      "addr3": "新界 荃灣 荃灣廣場 地庫 B101-B104號舖",
      "udfTrucklane": "G005",
      "ai1": "TY",
      "ai2": "TY2",
      "ai3": "TY020"
     },
     {
      "code": "CF12",
      "desc": "CF012 - 雞檔置富第一城店",
      "addr": "Shop Nos. G37, G38 & G38A on G\/F, Fortune City One,",
      "addr2": "City One Shatin, N.T.",
      "addr3": "新界 沙田第一城 置富第一城 G37, G38 & G38A號舖",
      "udfTrucklane": "A020",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF012"
     },
     {
      "code": "CF13",
      "desc": "CF013 - 雞檔新達廣場店",
      "addr": "Shop Nos 097 & 097A on Level 1, Uptown Plaza,",
      "addr2": " No.9 Nam Wan Road, Tai Po, New Territories",
      "addr3": "新界 沙田 大埔 南運路9號 新達廣場 第一層 097 & 097A 號舖",
      "udfTrucklane": "A011",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF013"
     },
     {
      "code": "CF14",
      "desc": "CF014 - 雞檔荃灣廣場店",
      "addr": "Shop Nos. B101-B104 on Basement 1 of Tsuen Wan Plaza,",
      "addr2": "Tsuen Wan, NT",
      "addr3": "新界 荃灣 荃灣廣場 地庫 B101-B104號舖",
      "udfTrucklane": "G006",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF014"
     },
     {
      "code": "MM08",
      "desc": "MM008 - 韓樂利東店",
      "addr": "Shop No. L-201A, First Floor, Commercial Complex 1",
      "addr2": "Lei Tung Estate, No. 5 Lei Tung Estate Road, Hong Kong",
      "addr3": "香港 利東邨路5號 利東邨 利東商場一期 一樓L201A號舖",
      "udfTrucklane": "A014",
      "ai1": "MM",
      "ai2": "MM1",
      "ai3": "MM008"
     },
    
     {
      "code": "MC06",
      "desc": "MC006 - 牛奶屯門時代廣場",
      "addr": "Shop Nos. 6-7 & 20-21 on Level 1 of North Wing of Trend Plaza,",
      "addr2": "Tuen Mun, New Territories",
      "addr3": "新界 屯門 屯門時代廣場北翼 1樓 6-7 & 20-21號舖",
      "ai1": "MC",
      "ai2": "MC1",
      "ai3": "MC006"
     },
     {
      "code": "LF11",
      "desc": "LF011 - 漁樂沙田第一城店",
      "addr": "Shop Nos. 107-108 on First Floor, Fortune City One,",
      "addr2": "City One Shatin, N.T.",
      "addr3": "新界 沙田第一城 置富第一城 1樓107-108號",
      "udfTrucklane": "A021",
      "ai1": "LF",
      "ai2": "LF1",
      "ai3": "LF011"
     },
     {
      "code": "CF15",
      "desc": "CF015 - 雞檔啟業店",
      "addr": "Shop No. 5, G\/F, Kai Yip Shopping Centre,",
      "addr2": "Kai Yip Estate, Kowloon Bay, Kowloon",
      "addr3": "九龍 九龍灣 啟業邨 啟業商場 地下 5號舖",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF015"
     },
     {
      "code": "CF16",
      "desc": "CF016 - 雞檔華心店",
      "addr": "Shop No. R120, R121, R122 & R123, First Floor, Wah Sum Shopping Centre,",
      "addr2": "Wah Sum Estate, 18 Yat Ming Road, Fanling New Territories",
      "addr3": "新界 粉嶺 一鳴路18號 華心邨 華心商場 1樓 R120, R121, R122 & R123號舖",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF016"
     },
     {
      "code": "CF17",
      "desc": "CF017 - 雞檔愛民店",
      "addr": "Shop No. F11A, First Floor, Oi Man Plaza,",
      "addr2": "Upper Oi Man Estate, No. 60 Chung Hau Street, Kowloon",
      "addr3": "九龍 忠考街60號 愛民邨 愛民廣場 1樓 F11A號舖",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF017"
     },
     {
      "code": "IM43",
      "desc": "IM043 - 意樂翠屏店",
      "addr": "Shop No.78, M1 Floor, Tsui Ping North Shopping Circuit,",
      "addr2": "19 Tsui Ping Road, Kwun Tong, Kowloon",
      "addr3": "九龍 觀塘 翠屏路19號 翠屏(北)商場 M1層 78號舖",
      "ai1": "IM",
      "ai2": "IM5",
      "ai3": "IM043"
     },
     {
      "code": "IM44",
      "desc": "IM044 - 意樂啟業店",
      "addr": "Shop No. 5, G\/F, Kai Yip Shopping Centre,",
      "addr2": "Kai Yip Estate, Kowloon Bay, Kowloon",
      "addr3": "九龍 九龍灣 啟業邨 啟業商場 地下 5號舖",
      "ai1": "IM",
      "ai2": "IM5",
      "ai3": "IM044"
     },
     {
      "code": "IM45",
      "desc": "IM045 - 意樂愛民店",
      "addr": "Shop No. F11A, First Floor, Oi Man Plaza,",
      "addr2": "Upper Oi Man Estate, No. 60 Chung Hau Street, Kowloon",
      "addr3": "九龍 忠考街60號 愛民邨 愛民廣場 1樓 F11A號舖",
      "ai1": "IM",
      "ai2": "IM5",
      "ai3": "IM045"
     },
     {
      "code": "MC05",
      "desc": "MC005 - 牛奶何文田廣場",
      "addr": "Shop Nos. 234A and 234B, Level 2, Homantin Plaza,",
      "addr2": "Ho Man Tin Estate, Ho Man Tin, Kowloon",
      "addr3": "香港 九龍 何文田 何文田邨 何文田廣場 2樓234A 及 234B 號舖",
      "udfTrucklane": "B014",
      "ai1": "MC",
      "ai2": "MC1",
      "ai3": "MC005"
     },
     {
      "code": "MM09",
      "desc": "MM009 - 韓樂美林店",
      "addr": "Shop No. F1, First Floor, Mei Lam Shopping Centre,",
      "addr2": "Mei Lam Estate, No. 30 Mei Tin Road, Tai Wai, New Territories",
      "addr3": "新界 大圍 美田路30號 美林邨 美林商場 1樓 F1號舖",
      "udfTrucklane": "G016",
      "ai1": "MM",
      "ai2": "MM1",
      "ai3": "MM009"
     },
     {
      "code": "MM10",
      "desc": "MM010 - 韓樂華心店",
      "addr": "Shop No. R120, R121, R122 & R123, First Floor, Wah Sum Shopping Centre,",
      "addr2": "Wah Sum Estate, 18 Yat Ming Road, Fanling New Territories",
      "addr3": "新界 粉嶺 一鳴路18號 華心邨 華心商場 1樓 R120, R121, R122 & R123號舖",
      "ai1": "MM",
      "ai2": "MM1",
      "ai3": "MM010"
     },
     {
      "code": "CF18",
      "desc": "CF018 - 雞檔新都城店",
      "addr": "Shop Nos. 249-251, Level 2, MCP Discovery,",
      "addr2": "Tseung Kwan O Town Lot No.34, New Territories",
      "addr3": "新界 將軍澳 貿業路8號 新都城中心三期 2樓 249-251號舖",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF018"
     },
     {
      "code": "CT04",
      "desc": "CT004 - 茶泰新都城店",
      "addr": "Shop Nos. 249-251, Level 2, MCP Discovery,",
      "addr2": "Tseung Kwan O Town Lot No.34, New Territories",
      "addr3": "新界 將軍澳 貿業路8號 新都城中心三期 2樓 249-251號舖",
      "udfTrucklane": "G003",
      "ai1": "CT",
      "ai2": "CT1",
      "ai3": "CT004"
     },
     {
      "code": "CT05",
      "desc": "CT005 - 茶泰新都會廣場店",
      "addr": "Shop Nos. 501-510, Level 5, Metroplaza,",
      "addr2": "Kwai Fong, New Territories",
      "addr3": "新界 葵芳 興芳路223號 新都會廣場 5樓 501-510號舖",
      "udfTrucklane": "G003",
      "ai1": "CT",
      "ai2": "CT1",
      "ai3": "CT005"
     },
     {
      "code": "HP53",
      "desc": "HP053 - 百份百秀茂坪店",
      "addr": "Shop No. 201, Second Floor, Sau Mau Ping Shopping Centre,",
      "addr2": "Sau Mau Ping Estate, Sau Ming Road, Sau Mau Ping, Kowloon, Hong Kong",
      "addr3": "九龍 秀茂坪 秀明道 秀茂坪邨 秀茂坪商場 2樓201號舖",
      "udfTrucklane": "C015",
      "ai1": "HP",
      "ai2": "HP4",
      "ai3": "HP053"
     },
     {
      "code": "IM46",
      "desc": "IM046 - 意樂麗城薈店",
      "addr": "Shop Nos. 5, 10, & 11 on G\/F of Belvedere Square of Belvedere Garden Phase3,",
      "addr2": "No. 625 Castle Peak Road, Tsuen Wan, New Territories",
      "addr3": "新界 荃灣 青山公路625號 麗城花園第三期 麗城薈 地下5, 10 &11號舖",
      "ai1": "IM",
      "ai2": "IM5",
      "ai3": "IM046"
     },
     {
      "code": "MC07",
      "desc": "MC007 - 牛奶麗城薈",
      "addr": "Shop Nos. 5, 10, & 11 on G\/F of Belvedere Square of Belvedere Garden Phase3,",
      "addr2": "No. 625 Castle Peak Road, Tsuen Wan, New Territories",
      "addr3": "新界 荃灣 青山公路625號 麗城花園第三期 麗城薈 地下5, 10 &11號舖",
      "ai1": "MC",
      "ai2": "MC1",
      "ai3": "MC007"
     },
     {
      "code": "MM11",
      "desc": "MM011 - 韓樂新都城店",
      "addr": "Shop Nos. 249-251, Level 2, MCP Discovery,",
      "addr2": "Tseung Kwan O Town Lot No.34, New Territories",
      "addr3": "新界 將軍澳 貿業路8號 新都城中心三期 2樓 249-251號舖",
      "ai1": "MM",
      "ai2": "MM1",
      "ai3": "MM011"
     },
     {
      "code": "MC08",
      "desc": "MC008 - 牛奶迎海",
      "addr": "Shop No. 3, Second Floor, Double Cove Place,",
      "addr2": "Lok Wo Sha, STTL502,Wu Kai Sha, Ｎ.T.",
      "addr3": "新界 沙田 馬鞍山 落禾沙 烏溪沙路 8號 迎海薈 2樓 3號舖",
      "ai1": "MC",
      "ai2": "MC1",
      "ai3": "MC008"
     },
     {
      "code": "CF19",
      "desc": "CF019 - 雞檔迎海店",
      "addr": "Shop No. 3, Second Floor, Double Cove Place,",
      "addr2": "Lok Wo Sha, STTL502,Wu Kai Sha, Ｎ.T.",
      "addr3": "新界 沙田 馬鞍山 落禾沙 烏溪沙路 8號 迎海薈 2樓 3號舖",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF019"
     },
     {
      "code": "DA01",
      "desc": "DA001 - 竇新都城店",
      "addr": "Shop No. 138a & 138a OSA, Level 1, MCP Discovery,",
      "addr2": "Tseung Kwan O Town Lot No. 34",
      "addr3": "新界 將軍澳 新都城三期 1樓138A號舖",
      "ai1": "DA",
      "ai2": "DA1",
      "ai3": "DA001"
     },
     {
      "code": "HP54",
      "desc": "HP054 - 百份百白田店",
      "addr": "Shop No.LG402, Lower Ground Floor, Pak Tin Commercial Centre,",
      "addr2": "Pak Tin Estate, Sham Shui Po, Kowloon",
      "addr3": "九龍 深水埗 白田邨第七及第八期 白田商場 LG402號舖",
      "udfTrucklane": "C015",
      "ai1": "HP",
      "ai2": "HP4",
      "ai3": "HP054"
     },
     {
      "code": "IM47",
      "desc": "IM047 - 意樂啟鑽店",
      "addr": "Shop No.G23, G\/F, Kai Chuen Shopping Centre,",
      "addr2": "Kai Chuen Court, 235 Choi Hung Road, Kowloon",
      "addr3": "九龍 彩虹道235號 啟鑽苑 啟鑽商場 地下 G23號舖",
      "ai1": "IM",
      "ai2": "IM5",
      "ai3": "IM047"
     },
     {
      "code": "CF20",
      "desc": "CF020 - 雞檔啟鑽店",
      "addr": "Shop No.G23, G\/F, Kai Chuen Shopping Centre",
      "addr2": "Kai Chuen Court, 235 Choi Hung Road, Kowloon",
      "addr3": "九龍 彩虹道235號 啟鑽苑 啟鑽商場 地下 G23號舖",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF020"
     },
     {
      "code": "MC09",
      "desc": "MC009 - 牛奶怡豐大廈",
      "addr": "Shops Nos. 1,2,3 & 4 on Lower Ground Floor, Yee Fung Building, ",
      "addr2": "No. 1A Wong Nai Chung Road, Hong Kong",
      "addr3": "香港 黃泥涌道1A 怡豐大廈 地下下層 1-4號舖",
      "ai1": "MC",
      "ai2": "MC1",
      "ai3": "MC009"
     },
     {
      "code": "CF21",
      "desc": "CF021 - 雞檔爹核士街店",
      "addr": "Shop No.1, Ground Floor,",
      "addr2": "22 Davis Street, Hong Kong",
      "addr3": "香港 爹核士街22號 地下1號舖",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF021"
     },
     {
      "code": "CF22",
      "desc": "CF022 - 雞檔麗城薈店",
      "addr": "Shop Nos.12 & 13 on G\/F of Belvedere Square of Belvedere Garden Phase3,",
      "addr2": "No. 625 Castle Peak Road, Tsuen Wan, New Territories",
      "addr3": "新界 荃灣 青山公路625號 麗城花園第三期 麗城薈 地下12 & 13號舖",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF022"
     },
     {
      "code": "CF23",
      "desc": "CF023 - 雞檔香港仔中心店",
      "addr": "Shop C on the Ground Floor of Site 5 of  Aberdeen Centre",
      "addr2": "Aberdeen, Hong Kong",
      "addr3": "香港 香港仔 香港仔中心地下 C 號鋪",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF023"
     },
     {
      "code": "LF12",
      "desc": "LF012 - 漁樂皇后山店",
      "addr": "Shop Nos. 28 and 29, G\/F., Queens Hill Shopping Centre,",
      "addr2": "Queens Hill Estate, Fanling, New Territories",
      "addr3": "新界 粉嶺 皇后山邨 皇后山商場 地下28-29號舖",
      "udfTrucklane": "A021",
      "ai1": "LF",
      "ai2": "LF1",
      "ai3": "LF012"
     },
     {
      "code": "MC10",
      "desc": "MC010 - 牛奶喜韻",
      "addr": "Shop No.1, G\/F of Heya Star,",
      "addr2": "368 Castle Peak Road, Cheung Sha Wan",
      "addr3": "九龍 青山道 368號 喜韻商場 地下 1號舖",
      "ai1": "MC",
      "ai2": "MC1",
      "ai3": "MC010"
     },
     {
      "code": "MC11",
      "desc": "MC011 - 牛奶啟鑽",
      "addr": "Shop No.G08, Kai Chuen Shopping Centre, Kai Chuen Court,",
      "addr2": "235 Choi Hung Road, Kowloon",
      "addr3": "九龍 彩虹道235號 啟鑽苑 啟鑽商場 地下 G08號舖",
      "ai1": "MC",
      "ai2": "MC1",
      "ai3": "MC011"
     },
     {
      "code": "MC12",
      "desc": "MC012 - 牛奶美景花園",
      "addr": "Shop Nos. 55-58, Level 3, Mayfair Gardens, ",
      "addr2": "2-16 Sai Shan Road, Tsing Yi, New Territories",
      "addr3": "新界 青衣 細山路2-16號 美景花園 3樓 55-58號舖",
      "ai1": "MC",
      "ai2": "MC1",
      "ai3": "MC012"
     },
     {
      "code": "MM12",
      "desc": "MM012 - 韓樂禾輋店",
      "addr": "Shop 332, 3\/F., Wo Che Plaza,",
      "addr2": "Wo Che Estate, Shatin, New Territories",
      "addr3": "新界 沙田 禾輋邨 禾輋商場 3樓 332 號舖",
      "ai1": "MM",
      "ai2": "MM2",
      "ai3": "MM012"
     },
     {
      "code": "MM13",
      "desc": "MM013 - 韓樂香港仔中心店",
      "addr": "Shop C on the Ground Floor of Site 5 of  Aberdeen Centre",
      "addr2": "Aberdeen, Hong Kong",
      "addr3": "香港 香港仔 香港仔中心地下 C 號舖",
      "ai1": "MM",
      "ai2": "MM2",
      "ai3": "MM013"
     },
     {
      "code": "HP55",
      "desc": "HP055 - 百份百錦英店",
      "addr": "Shop No. LG01B, 2\/F, Kam Ying Shopping Centre,",
      "addr2": "Kam Yin Court, Ma On Shan, Ｎ.T.",
      "addr3": "新界 馬鞍山 錦英苑 錦英商場 2樓 LG01B號舖",
      "ai1": "HP",
      "ai2": "HP4",
      "ai3": "HP055"
     },
     {
      "code": "TY21",
      "desc": "TY021 - 木兆小品-海趣坊店",
      "addr": "Shop Nos. 46-48, Ocean Walk,",
      "addr2": "No. 168-236 Wu Chui Road, Tuen Mun, Ｎ.T.",
      "addr3": "新界 屯門 湖翠路 168-236號 海趣坊 46-48號舖",
      "ai1": "TY",
      "ai2": "TY2",
      "ai3": "TY021"
     },
     {
      "code": "CF24",
      "desc": "CF024 - 雞檔美景花園店",
      "addr": "Shop No. 36, Level 3, Mayfair Gardens,",
      "addr2": "2-16 Sai Shan Road, Tsing Yi, New Territories",
      "addr3": "新界 青衣 細山路2-16號 美景花園 3樓 36號舖",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF024"
     },
     {
      "code": "CF25",
      "desc": "CF025 - 雞檔海趣坊店",
      "addr": "Shop Nos. 46-48, Ocean Walk,",
      "addr2": "No. 168-236 Wu Chui Road, Tuen Mun, Ｎ.T.",
      "addr3": "新界 屯門 湖翠路 168-236號 海趣坊 46-48號舖",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF025"
     },
     {
      "code": "MC13",
      "desc": "MC013 - 牛奶海怡商場",
      "addr": "Shop No.120, 1\/F, Marina Square, The West Commercial Block,",
      "addr2": "South Horizons, Ap Lei Chau, Hong Kong",
      "addr3": "香港 鴨脷洲 海怡商場西翼 1樓 120號舖",
      "ai1": "MC",
      "ai2": "MC2",
      "ai3": "MC013"
     },
     {
      "code": "RU01",
      "desc": "RU001 - 香港仔中心",
      "addr": "Shop B on the Ground Floor of Site 5 of  Aberdeen Centre",
      "addr2": "Aberdeen, Hong Kong",
      "addr3": "香港 香港仔 香港仔中心 地下 B 號舖",
      "ai1": "RU",
      "ai2": "RU1",
      "ai3": "RU001"
     },
     {
      "code": "MC14",
      "desc": "MC014 - 牛奶杏花新城",
      "addr": "Shop No.G43A, Ground Floor, Paradise Mall, ",
      "addr2": "Heng Fa Chuen, 100 Shing Tai Road, Chaiwan, H.K.",
      "addr3": "香港島 柴灣 盛泰道100號 杏花邨 杏花新城 地下G43A號舖",
      "ai1": "MC",
      "ai2": "MC2",
      "ai3": "MC014"
     },
     {
      "code": "CF26",
      "desc": "CF026 - 雞檔馬鞍山廣場店",
      "addr": "Shop No.256-257, Level 2, Ma On Shan Plaza,",
      "addr2": "No.608, Sai Sha Road, Ma On Shan, N.T.",
      "addr3": "新界 沙田 馬鞍山 西沙路608號 馬鞍山廣場 2樓 256-257號舖",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF026"
     },
     {
      "code": "MM14",
      "desc": "MM014 - 韓樂馬鞍山廣場店",
      "addr": "Shop No.256-257, Level 2, Ma On Shan Plaza,",
      "addr2": "No.608, Sai Sha Road, Ma On Shan, N.T.",
      "addr3": "新界 沙田 馬鞍山 西沙路608號 馬鞍山廣場 2樓 256-257號舖",
      "ai1": "MM",
      "ai2": "MM2",
      "ai3": "MM014"
     },
     {
      "code": "MM15",
      "desc": "MM015 - 韓樂逸峯廣場店",
      "addr": "Shop No.G01B on Ground Floor, Green Code Plaza,",
      "addr2": "1 Ma Sik Road, Fanling, N.T. Hong Kong",
      "addr3": "新界 粉嶺 馬適路1號 逸峰商場 地下 G01B號舖",
      "ai1": "MM",
      "ai2": "MM2",
      "ai3": "MM015"
     },
     {
      "code": "IM48",
      "desc": "IM048 - 意樂杏花新城店",
      "addr": "Shop Unit G53A of Ground Floor, Paradise Mall,",
      "addr2": "100 Shing Tai Road, Pak Sha Wan, Hong Kong",
      "addr3": "香港 白沙灣 盛泰路100號 杏花新城 地下G53A號舖",
      "ai1": "IM",
      "ai2": "IM5",
      "ai3": "IM048"
     },
     {
      "code": "MC15",
      "desc": "MC015 - 牛奶曉麗",
      "addr": "Shop Nos. 215 & 216A, 2\/F, Hiu Lai Shopping Centre, Hiu Lai Court,",
      "addr2": "21 Hiu Kwong Street, Kwun Tong, Kowloon",
      "addr3": "九龍 觀塘 曉光街21號 曉麗苑 曉麗商場 2樓215 & 216A 號舖",
      "ai1": "MC",
      "ai2": "MC2",
      "ai3": "MC015"
     },
     {
      "code": "IM49",
      "desc": "IM049 - 意樂秀茂坪店",
      "addr": "Shop No. 201, Second Floor, Sau Mau Ping Shopping Centre,",
      "addr2": "Sau Mau Ping Estate, Sau Ming Road, Sau Mau Ping, Kowloon, Hong Kong",
      "addr3": "九龍 秀茂坪 秀明道 秀茂坪邨 秀茂坪商場 2樓201號舖",
      "ai1": "IM",
      "ai2": "IM5",
      "ai3": "IM049"
     },
     {
      "code": "MM16",
      "desc": "MM016 - 韓樂TKO Gateway店",
      "addr": "Shop W001-W002, G\/F., West Wing of TKO Gateway,",
      "addr2": "Hau Tak Estate, 2 Sheung Ning Road, Tseung Kwan O, N.T.",
      "addr3": "新界 將軍澳 常寧路2號 厚德邨TKO Gateway西翼地下W001-W002號舖",
      "ai1": "MM",
      "ai2": "MM1",
      "ai3": "MM016"
     },
     {
      "code": "MM17",
      "desc": "MM017 - 韓樂淘大商場店",
      "addr": "Shop Nos. G301-320, G\/F, Amoy Plaza of Amoy Gardens Phase III,",
      "addr2": "No. 77 Ngau Tau Kok Road, Kowloon",
      "addr3": "九龍 牛頭角道77號 淘大花園三期 淘大商場 地下301-320號舖",
      "ai1": "MM",
      "ai2": "MM2",
      "ai3": "MM017"
     },
     {
      "code": "CF27",
      "desc": "CF027 - 雞檔杏花新城店",
      "addr": "Shop Unit G53A of Ground Floor, Paradise Mall,",
      "addr2": "100 Shing Tai Road, Pak Sha Wan, Hong Kong",
      "addr3": "香港 柴灣 盛泰道100號 杏花邨 杏花新城 地下G53A號舖",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF027"
     },
     {
      "code": "CF28",
      "desc": "CF028 - 雞檔菁田店",
      "addr": "Shop No. G4, Ching Tin Shopping Centre,",
      "addr2": "Ching Tin Estate, Tuen Mun, New Territories",
      "addr3": "新界 屯門 菁田邨 菁田商場 G4號舖",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF028"
     },
     {
      "code": "CF29",
      "desc": "CF029 - 雞檔錦綉花園店",
      "addr": "Block A, Shop 5 and 6, G\/F,",
      "addr2": "Fairview Park, Yuen Long, N.T.",
      "addr3": "新界 元朗錦綉花園商場A座地下5及6號舖",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF029"
     },
     {
      "code": "CF30",
      "desc": "CF030 - 雞檔秀茂坪店",
      "addr": "Shop No. 201, Second Floor, Sau Mau Ping Shopping Centre,",
      "addr2": "Sau Mau Ping Estate, Sau Ming Road, Sau Mau Ping, Kowloon, Hong Kong",
      "addr3": "九龍 秀茂坪 秀明道 秀茂坪邨 秀茂坪商場 2樓201號舖",
      "ai1": "CF",
      "ai2": "CF2",
      "ai3": "CF030"
     },
     {
      "code": "CF31",
      "desc": "CF031 - 雞檔淘大商場店",
      "addr": "Shop Nos. G301-320, G\/F, Amoy Plaza of Amoy Gardens Phase III,",
      "addr2": "No. 77 Ngau Tau Kok Road, Kowloon",
      "addr3": "九龍 牛頭角道77號 淘大花園三期 淘大商場 地下301-320號舖",
      "ai1": "CF",
      "ai2": "CF1",
      "ai3": "CF031"
     },
     {
      "code": "MC16",
      "desc": "MC016 - 牛奶錦綉花園",
      "addr": "Block C, Shop 4, G\/F,",
      "addr2": "Fairview Park, Yuen Long, N.T.",
      "addr3": "新界 元朗錦綉花園商場C座地下4號舖",
      "ai1": "MC",
      "ai2": "MC2",
      "ai3": "MC016"
     },
     {
      "code": "MC17",
      "desc": "MC017 - 牛奶逸東",
      "addr": "Shop Nos. 18-19, Ground Floor, Yat Tung Shopping Centre,",
      "addr2": " Yat Tung Estate, 8 Yat Tung Street, Tung Chung, New Territories",
      "addr3": "新界 東涌 逸東街8號 逸東邨 逸東商場 地下18-19號舖",
      "ai1": "MC",
      "ai2": "MC2",
      "ai3": "MC017"
     },
     {
      "code": "MC18",
      "desc": "MC018 - 牛奶大興花園",
      "addr": "Shop No. 5-6, Ground Floor of Commercial Podium Tai Hing Gardens Phase 1",
      "addr2": "No. 11 Tsun Wen Road, Tuen Mun, New Territories",
      "addr3": "新界 屯門 震寰路11號 大興花園一期商場 地下5-6號舖",
      "ai1": "MC",
      "ai2": "MC2",
      "ai3": "MC018"
     },
     {
      "code": "MC19",
      "desc": "MC019 - 牛奶淘大花園",
      "addr": "Shop Nos. G301-320, G\/F, Amoy Plaza of Amoy Gardens Phase III,,",
      "addr2": "No. 77 Ngau Tau Kok Road, Kowloon",
      "addr3": "九龍 牛頭角道77號 淘大花園三期 淘大商場 地下301-320號舖",
      "ai1": "MC",
      "ai2": "MC2",
      "ai3": "MC019"
     },
     {
      "code": "RU02",
      "desc": "RU002 - 逸峯",
      "addr": "Shop No.G01B on Ground Floor, Green Code Plaza,",
      "addr2": "1 Ma Sik Road, Fanling, N.T. Hong Kong",
      "addr3": "新界 粉嶺 馬適路1號 逸峰商場 地下 G01B號舖",
      "ai1": "RU",
      "ai2": "RU1",
      "ai3": "RU002"
     },
     {
      "code": "RU03",
      "desc": "RU003 - 秀茂坪",
      "addr": "Shop No. 201, Second Floor, Sau Mau Ping Shopping Centre,",
      "addr2": "Sau Mau Ping Estate, Sau Ming Road, Sau Mau Ping, Kowloon, Hong Kong",
      "addr3": "九龍 秀茂坪 秀明道 秀茂坪邨 秀茂坪商場 2樓201號舖",
      "ai1": "RU",
      "ai2": "RU1",
      "ai3": "RU003"
     },
     {
      "code": "RU04",
      "desc": "RU004 - 淘大商場",
      "addr": "Shop Nos. G301-320, G\/F, Amoy Plaza of Amoy Gardens Phase III,",
      "addr2": "No. 77 Ngau Tau Kok Road, Kowloon",
      "addr3": "九龍 牛頭角道77號 淘大花園三期 淘大商場 地下301-320號舖",
      "ai1": "RU",
      "ai2": "RU1",
      "ai3": "RU004"
     },
     {
      "code": "MZ01",
      "desc": "MZ001 - 米籽翠林店",
      "addr": "No. 129, 130B & 131B Level 5, Tsui Lam Square,",
      "addr2": "11 Tsui Lam Road,Tseung Kwan O, N.T,",
      "addr3": "新界 將軍澳 翠林街11號 翠林新城5樓129, 130B及131B號舖",
      "udfTrucklane": "D019",
      "ai1": "MZ",
      "ai2": "MZ1",
      "ai3": "MZ001"
     },
     {
      "code": "MC20",
      "desc": "MC020 - 牛奶好順福",
      "addr": "Shop Nos. G26 & 27, Ho Shun Fuk Building,",
      "addr2": "60 Sau Fu Street, Yuen Long, New Territories",
      "addr3": "新界 元朗 壽富街60號 好順福大廈 G26 & 27號舖",
      "ai1": "MC",
      "ai2": "MC2",
      "ai3": "MC020"
     },
     {
      "code": "RU05",
      "desc": "RU005 - 好順福",
      "addr": "Shop Nos. G26 & 27, Ho Shun Fuk Building,",
      "addr2": "60 Sau Fu Street, Yuen Long, New Territories",
      "addr3": "新界 元朗 壽富街60號 好順福大廈 G26 & 27號舖",
      "ai1": "RU",
      "ai2": "RU1",
      "ai3": "RU005"
     },
     {
      "code": "IM51",
      "desc": "IM051 - 意樂禾輋店",
      "addr": "Shop No. R11 & R12, G\/F, Wo Che Plaza,",
      "addr2": "Wo Che Estate, 3 Tak Hau Street, Shatin, N.T.",
      "addr3": "新界 沙田 禾輋邨 禾輋商場 地下 R11 & R12 號舖",
      "udfTrucklane": "G017",
      "ai1": "IM",
      "ai2": "IM5",
      "ai3": "IM051"
     },
     {
      "code": "MC21",
      "desc": "MC021 - 牛奶愉景新城",
      "addr": "Shop No.2029 on Level 2 of D.Park, Discovery Park",
      "addr2": "398 Castle Peak Road, Tsuen Wan, N.T.",
      "addr3": "新界 荃灣 青山公路398號 愉景新城 2樓 2029號舖",
      "ai1": "MC",
      "ai2": "MC2",
      "ai3": "MC021"
     },
     {
      "code": "MC24",
      "desc": "MC024 - 牛奶鯉景灣",
      "addr": "Shop GB 14B-16, Ground Floor of Lei King Wan,",
      "addr2": "45 Tai Hong Street, Sai Wan Ho, Hong Kong",
      "addr3": "香港 西灣河 鯉景灣 太康街 45 號 地下 GB 14B-16 號舖",
      "ai1": "MC",
      "ai2": "MC3",
      "ai3": "MC024"
     },
     {
      "code": "RU07",
      "desc": "RU007 - 鯉景灣",
      "addr": "Shop GB 14B-16, Ground Floor of Lei King Wan,",
      "addr2": "45 Tai Hong Street, Sai Wan Ho, Hong Kong",
      "addr3": "香港 西灣河 鯉景灣 太康街 45 號 地下 GB 14B-16 號舖",
      "ai1": "RU",
      "ai2": "RU1",
      "ai3": "RU007"
     },
     {
      "code": "IM50",
      "desc": "IM050 - 意樂啟田店",
      "addr": "Shop No. 235, 2\/F, Kai Tin Shopping Centre, Kai Tin Estate and On Tin Estate,",
      "addr2": "No. 50 Kai Tin Road, Lam Tin, Kowloon",
      "addr3": "九龍 藍田 啟田邨 啟田商場 2樓 235號舖",
      "udfTrucklane": "G017",
      "ai1": "IM",
      "ai2": "IM5",
      "ai3": "IM050"
     },
     {
      "code": "IM52",
      "desc": "IM052 - 意樂長發店",
      "addr": "Shop No. 321C, Level 3, Cheung Fat Plaza,",
      "addr2": "6 Tam Kon Shan Road, Tsing Yi, N.T.",
      "addr3": "新界 青衣 担杆山路 ６號 長發廣場 ３樓 321C 號舖",
      "udfTrucklane": "H009",
      "ai1": "IM",
      "ai2": "IM1",
      "ai3": "IM052"
     },
     {
      "code": "MC22",
      "desc": "MC022 - 牛奶置富第一城",
      "addr": "Shop Nos. G71-73 & G82B on G\/F,",
      "addr2": "Fortune City One, City One Shatin, N.T.",
      "addr3": "新界 沙田 置富第一城 地下G71-G73 & G82B 號舖",
      "ai1": "MC",
      "ai2": "MC2",
      "ai3": "MC022"
     },
     {
      "code": "RU06",
      "desc": "RU006 - 啟田",
      "addr": "Shop No. 235, 2\/F, Kai Tin Shopping Centre, Kai Tin Estate and On Tin Estate,",
      "addr2": "No. 50 Kai Tin Road, Lam Tin, Kowloon",
      "addr3": "九龍 藍田 啟田邨 啟田商場 2樓 235號舖",
      "ai1": "RU",
      "ai2": "RU1",
      "ai3": "RU006"
     },
     {
      "code": "RU08",
      "desc": "RU008 - 長發",
      "addr": "Shop 321C, Level 3, Cheung Fat Plaza,",
      "addr2": "6 Tam Kon Shan Road, Tsing Yi, NT",
      "addr3": "新界 青衣 担杆山路 ６號 長發廣場 ３樓 321C 號舖",
      "ai1": "RU",
      "ai2": "RU1",
      "ai3": "RU008"
     },
     {
      "code": "RU09",
      "desc": "RU009 - TKO Gateway",
      "addr": "Shop W001-W002, G\/F., West Wing of TKO Gateway,",
      "addr2": "Hau Tak Estate, 2 Sheung Ning Road, Tseung Kwan O, N.T.",
      "addr3": "新界 將軍澳 常寧路2號 厚德邨TKO Gateway西翼地下W001-W002號舖",
      "ai1": "RU",
      "ai2": "RU1",
      "ai3": "RU009"
     },
     {
      "code": "CF32",
      "desc": "CF032 - 雞檔景林店",
      "addr": "Shop No. 7, G\/F, King Lam Shopping Centre,",
      "addr2": "King Lam Estate, No. 38 Po Lam Road North, Tseung Kwan O, N.T.",
      "addr3": "新界 將軍澳 景林邨 景林商場 地下 7號舖",
      "ai1": "CF",
      "ai2": "CF1",
      "ai3": "CF032"
     },
     {
      "code": "CF33",
      "desc": "CF033 - 雞檔黃大仙中心店",
      "addr": "Shop Nos. LG04 & LG07, Basement Floor, Temple Mall North,",
      "addr2": "Upper Wong Tai Sin Estate, Lung Cheung Road, Wong Tai Sin, Kowloon",
      "addr3": "九龍 黃大仙 龍翔道 上黃大仙邨 黃大仙中心北館 B層 LG04 & LG07號舖",
      "ai1": "CF",
      "ai2": "CF1",
      "ai3": "CF033"
     },
     {
      "code": "MC23",
      "desc": "MC023 - 牛奶海悅豪園",
      "addr": "Shop No. G1, G\/F, Maritime Bay Shopping Centre,",
      "addr2": "No. 18 Pui Shing Road, Tseung Kwan O, N.T.",
      "addr3": "將軍澳 培成路 18號 海悅豪園購物中心 地下 G1號舖",
      "ai1": "MC",
      "ai2": "MC3",
      "ai3": "MC023"
     },
     {
      "code": "MC25",
      "desc": "MC025 - 牛奶景林",
      "addr": "Shop No. 7, G\/F, King Lam Shopping Centre,",
      "addr2": "King Lam Estate, No. 38 Po Lam Road North, Tseung Kwan O, N.T.",
      "addr3": "新界 將軍澳 景林邨 景林商場 地下 7號舖",
      "ai1": "MC",
      "ai2": "MC3",
      "ai3": "MC025"
     },
     {
      "code": "MC26",
      "desc": "MC026 - 牛奶YOHO MALL",
      "addr": "Shop No. A101, Level 1, Yoho Mall II",
      "addr2": "8 Long Yat Road, Yuen Long, New Territories",
      "addr3": "新界 元朗 朗日路8號 YOHO MALL II 一樓A101號舖",
      "ai1": "MC",
      "ai2": "MC3",
      "ai3": "MC026"
     },
     {
      "code": "MC27",
      "desc": "MC027 - 牛奶PARK CIRCLE",
      "addr": "Shop 116, G\/F., Park Circle Park Yoho,",
      "addr2": "18 Castle Peak Road, Tam Mi, Yuen Long, New Territories",
      "addr3": "新界 元朗 譚尾段 青山公路18號 MARK CIRCLE PARK YOHO 地下116號舖",
      "ai1": "MC",
      "ai2": "MC3",
      "ai3": "MC027"
     },
     {
      "code": "MC28",
      "desc": "MC028 - 牛奶黃大仙中心",
      "addr": "Shop Nos. LG04 & LG07, Basement Floor, Temple Mall North,",
      "addr2": "Upper Wong Tai Sin Estate, Lung Cheung Road, Wong Tai Sin, Kowloon",
      "addr3": "九龍 黃大仙 龍翔道 上黃大仙邨 黃大仙中心北館 B層 LG04 & LG07號舖",
      "ai1": "MC",
      "ai2": "MC3",
      "ai3": "MC028"
     },
     {
      "code": "MM18",
      "desc": "MM018 - 韓樂天耀廣場店",
      "addr": "Shop No. L012, G\/F, Tin Yiu Plaza,",
      "addr2": "Tin Yiu Estate, Tin Wu Road, Tin Shui Wai, New Territories",
      "addr3": "新界 天水圍 天湖路 天耀邨 天耀廣場 地下 L012號舖",
      "ai1": "MM",
      "ai2": "MM2",
      "ai3": "MM018"
     },
     {
      "code": "MZ02",
      "desc": "MZ002 - 米籽喜薈店",
      "addr": "Shop No. 1, 1\/F, Heya Crystal Shopping Center,",
      "addr2": "No. 399 Castle Peak Road, Cheung Sha Wan, Kowloon",
      "addr3": "九龍 青山道 399號 喜薈商場 1樓 1號舖",
      "udfTrucklane": "D019",
      "ai1": "MZ",
      "ai2": "MZ1",
      "ai3": "MZ002"
     },
     {
      "code": "RU10",
      "desc": "RU010 - 天耀廣場",
      "addr": "Shop No. L012, G\/F, Tin Yiu Plaza,",
      "addr2": "Tin Yiu Estate, Tin Wu Road, Tin Shui Wai, New Territories",
      "addr3": "新界 天水圍 天湖路 天耀邨 天耀廣場 地下 L012號舖",
      "ai1": "RU",
      "ai2": "RU1",
      "ai3": "RU010"
     },
     {
      "code": "HP57",
      "desc": "HP057 - 百份百水泉澳店",
      "addr": "Shop No. 205, Shui Chuen O Plaza,",
      "addr2": "Shui Chuen O Estate, Sha Tin, New Territories",
      "addr3": "新界 沙田 水泉澳邨 水泉澳廣場 205號舖",
      "ai1": "HP",
      "ai2": "HP4",
      "ai3": "HP057"
     },
     {
      "code": "CF34",
      "desc": "CF034 - 雞檔水泉澳店",
      "addr": "Shop No. 205, Shui Chuen O Plaza,",
      "addr2": "Shui Chuen O Estate, Sha Tin, New Territories",
      "addr3": "新界 沙田 水泉澳邨 水泉澳廣場 205號舖",
      "ai1": "CF",
      "ai2": "CF1",
      "ai3": "CF034"
     },
     {
      "code": "RU11",
      "desc": "RU011 - 黃大仙中心",
      "addr": "Shop Nos. LG04 & LG07, Basement Floor, Temple Mall North",
      "addr2": "Upper Wong Tai Sin Estate, Lung Cheung Road, Wong Tai Sin, Kowloon",
      "addr3": "九龍 黃大仙 龍翔道 上黃大仙邨 黃大仙中心北館 B層 LG04 & LG07號舖",
      "ai1": "RU",
      "ai2": "RU2",
      "ai3": "RU011"
     },
     {
      "code": "IM53",
      "desc": "IM053 - 意樂菁田店",
      "addr": "Shop No. G4, Ching Tin Shopping Centre,",
      "addr2": "Ching Tin Estate, Tuen Mun, New Territories",
      "addr3": "新界 屯門 菁田邨 菁田商場 G4號舖",
      "ai1": "IM",
      "ai2": "IM6",
      "ai3": "IM053"
     },
     {
      "code": "MC29",
      "desc": "MC029 - 牛奶銅鑼灣廣場",
      "addr": "Shop No. G04, G\/F of Causeway Bay Plaza 2,",
      "addr2": "463-483 Lockhart Road, Hong Kong",
      "addr3": "銅鑼灣 駱克道463-483號 銅鑼灣廣場2期 地下 G04號舖",
      "ai1": "MC",
      "ai2": "MC3",
      "ai3": "MC029"
     },
     {
      "code": "MC30",
      "desc": "MC030 - 牛奶耀基大廈",
      "addr": "G\/F, Yau Kei Mansion, ",
      "addr2": "108 Austin Road, Tsim sha Tsui, Kowloon",
      "addr3": "九龍 尖沙咀 柯士甸道 108 號耀基大廈地舖",
      "ai1": "MC",
      "ai2": "MC3",
      "ai3": "MC030"
     },
     {
      "code": "MZ03",
      "desc": "MZ003 - 米籽第一城店",
      "addr": "Shop Nos. G97-100 on G\/F, Fortune City One,",
      "addr2": "City One Shatin, N.T.",
      "addr3": "新界 沙田 置富第一城 地下G97-100 號舖",
      "udfTrucklane": "D019",
      "ai1": "MZ",
      "ai2": "MZ1",
      "ai3": "MZ003"
     },
     {
      "code": "MZ04",
      "desc": "MZ004 - 米籽新屯門中心店",
      "addr": "Shops 34-39, Sun Tuen Mun Shopping Centre,",
      "addr2": "No.55-65 Lung Mun Road, NT",
      "addr3": "新界 屯門 龍門路 55-65號 新屯門商場 34-39號舖",
      "udfTrucklane": "D019",
      "ai1": "MZ",
      "ai2": "MZ1",
      "ai3": "MZ004"
     },
     {
      "code": "IM54",
      "desc": "IM054 - 意樂黃大仙南館店",
      "addr": "Shop 130, L1\/F, Temple Mall South",
      "addr2": "103 Ching Tak Street, Wong Tai Sin, Kowloon",
      "addr3": "九龍黃大仙正德街103號黃大仙中心南館 L1樓130號舖",
      "ai1": "IM",
      "ai2": "IM6",
      "ai3": "IM054"
     },
     {
      "code": "MC31",
      "desc": "MC031 - 牛奶大埔超級城",
      "addr": "Shops No.s 531-535, Level 1, Zone C,",
      "addr2": "Tai Po Mega Mall, Tai Po, New Territories",
      "addr3": "新界 大埔 大埔超級城 C區 1樓 531-535號舖",
      "ai1": "MC",
      "ai2": "MC3",
      "ai3": "MC031"
     },
     {
      "code": "HP58",
      "desc": "HP058 - 百份百鯉魚門廣場店",
      "addr": "Shop No. 202, Level 2, Lei Yue Mun Plaza,",
      "addr2": "Yau Mei Court, No. 80 Lei Yue Mun Road, Kowloon",
      "addr3": "九龍 鯉魚門道80號 油美苑 鯉魚門廣場 2樓 202號舖",
      "ai1": "HP",
      "ai2": "HP4",
      "ai3": "HP058"
     },
     {
      "code": "IM56",
      "desc": "IM056 - 意樂青富苑店",
      "addr": "Shop No. 101, UG\/F., Ching Fu Shopping Centre,",
      "addr2": "Ching Fu Court, Tsing Yi",
      "addr3": "青衣 青富苑 青富商場 UG層 101號舖",
      "ai1": "IM",
      "ai2": "IM6",
      "ai3": "IM056"
     },
     {
      "code": "IM57",
      "desc": "IM057 - 意樂裕雅苑店",
      "addr": "Shop No. 1, G\/F., Yu Nga Shopping Centre,",
      "addr2": "Yu Nga Court, Tung Chung",
      "addr3": "東涌 裕雅苑 裕雅商場 地下1號舖",
      "ai1": "IM",
      "ai2": "IM6",
      "ai3": "IM057"
     },
     {
      "code": "MC32",
      "desc": "MC032 - 牛奶新葵興廣場",
      "addr": "Shop No. 4 3\/F, Sun Kwai Hing Plaza,",
      "addr2": "Sun Kwai Hing Gardens, Kwai Chung, New Territories",
      "addr3": "新界 葵涌 新葵興花園 新葵興廣場 3樓4號舖",
      "ai1": "MC",
      "ai2": "MC3",
      "ai3": "MC032"
     },
     {
      "code": "MC33",
      "desc": "MC033 - 牛奶置樂花園",
      "addr": "Shop Nos. 103-105 & 130-133 on Ground Floor,",
      "addr2": "Chi Lok Fa Yuen, Tuen Mun, New Territories",
      "addr3": "新界 屯門 置樂花園 地下103-105 號 & 130-133號舖",
      "ai1": "MC",
      "ai2": "MC3",
      "ai3": "MC033"
     },
     
     {
      "code": "RU12",
      "desc": "RU012 - 小西灣",
      "addr": "Shop No. 111,  1\/F, Siu Sai Wan Shopping Centre,",
      "addr2": "Siu Sai Wan Estate,10 Siu Sai Wan Road, Chai Wan.",
      "addr3": "香港 小西灣 小西灣道10號 小西灣邨 小西灣廣場1樓111號舖",
      "ai1": "RU",
      "ai2": "RU2",
      "ai3": "RU012"
     },
     {
      "code": "MM19",
      "desc": "MM019 - 韓樂小西灣店",
      "addr": "Shop No. 111,  1\/F, Siu Sai Wan Shopping Centre,",
      "addr2": "Siu Sai Wan Estate,10 Siu Sai Wan Road, Chai Wan.",
      "addr3": "香港 小西灣 小西灣道10號 小西灣邨 小西灣廣場1樓111號舖",
      "udfTrucklane": "F016",
      "ai1": "MM",
      "ai2": "MM1",
      "ai3": "MM019"
     },
     {
      "code": "MC34",
      "desc": "MC034 - 牛奶藍灣廣場",
      "addr": "G\/F 16, Floor G, Island Resort Mall,",
      "addr2": "28 Siu Sai Wan Road, Siu Sai Wan, Hong Kong",
      "addr3": "香港 小西灣 小西灣道 28號 藍灣廣場 地下 G16號舖",
      "ai1": "MC",
      "ai2": "MC3",
      "ai3": "MC034"
     },
     {
      "code": "MC35",
      "desc": "MC035 - 牛奶潮樓",
      "addr": "Shop No. A&B, G\/F, In House, ",
      "addr2": "307 To Kwa Wan Road, To Kwa Wan, Kowloon",
      "addr3": "九龍 土瓜灣 土瓜灣道307號 潮樓 地下A&B號舖",
      "ai1": "MC",
      "ai2": "MC3",
      "ai3": "MC035"
     },
     {
      "code": "MC36",
      "desc": "MC036 - 牛奶長沙灣廣場",
      "addr": "Unit G08 on G\/F and M07-08 on M\/F, Cheung Sha Wan Plaza,",
      "addr2": "833 Cheung Sha Wan Raod, Kowloon",
      "addr3": "九龍 長沙灣 長沙灣道833號 長沙灣廣場MF層M07-08號舖及地下G08號舖",
      "ai1": "MC",
      "ai2": "MC3",
      "ai3": "MC036"
     },
     {
      "code": "MC37",
      "desc": "MC037 - 牛奶惠安苑",
      "addr": "Shop Nos. SLG 8 and 9A, Westlands Gardens",
      "addr2": "Quarry Bay, Hong Kong",
      "addr3": "香港 鰂魚涌 惠安苑 SLG 8 & 9A號舖",
      "ai1": "MC",
      "ai2": "MC3",
      "ai3": "MC037"
     },
    
     {
      "code": "UR01",
      "desc": "UR001 - UURO東港城店",
      "addr": "Shop No. 188, Level 1, East Point City,",
      "addr2": "8 Chung Wa Road, Tseung Kwan O, Ｎ.T.",
      "addr3": "新界 將軍澳 重華路8號 東港城商場 1樓188號舖",
      "ai1": "IM",
      "ai2": "IM2",
      "ai3": "UR001"
     },
     {
      "code": "MC39",
      "desc": "MC039 - 牛奶啟田",
      "addr": "Shop No. L331, 3\/F, Kai Tin Shopping Centre,",
      "addr2": "Kai Tin Estate and On Tin Estate,No. 50 Kai Tin Road, Lam Tin, Kowloon",
      "addr3": "九龍 藍田 啟田邨 啟田商場 3樓 L331號舖",
      "ai1": "MC",
      "ai2": "MC3",
      "ai3": "MC039"
     }
    ]
}