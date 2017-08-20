$(function () {
    $('.menu').on('click', '.commodity:nth-child(8)', function () {
        $('.commodity:nth-last-child(-n+4)').toggle();
    });
    menu();
    commodity();
});

function menu() {
     $.ajax({
         url:'http://182.254.146.100:3000/api/getindexmenu',
         success:function (data) {
             var mis  = template("menu-c",data);
             //template绑定模板 ,模板id和数据
             $(".menu").html(mis)
         }
     })
}

function commodity() {
    $.ajax({
        url:'http://182.254.146.100:3000/api/getmoneyctrl',
        success:function (data) {
            var mia  = template("commodity-c",data);
            //template绑定模板 ,模板id和数据
            $(".merchandise").html(mia)
        }
    })
}