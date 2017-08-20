$(function () {
    $('.classify-s>ul').on("click", ".title-s", function () {
        $(this).siblings('ul').toggle();
        $(this).parent().siblings().find("ul").slideUp();
        var ul = $(this).siblings('ul');
        // 只有点击的时候才触发，切换的时候不会触发
        if(ul.attr('style').indexOf('none')!=-1){
            $(this).css('background-image','url(http://www.zuyushop.com/wap/images/arrow1.gif)');
        }else {
            $(this).css('background-image','url(http://www.zuyushop.com/wap/images/arrow2.gif)');
        }

        var data_s=$(this).attr('data-s');
        //$ul=$(this).siblings('ul');
        classify_s(data_s);
    });


    classify_y();
});


function classify_y() {
    $.ajax({
        url:'http://182.254.146.100:3000/api/getcategorytitle',
        success:function (data) {
            var mis=template('classify-c',data);
            $('.classify-s > ul').html(mis);
        }
    });
}

function classify_s(data_s) {
    $.ajax({
        url:'http://182.254.146.100:3000/api/getcategory?titleid='+data_s,
        success:function (data) {
            var mis=template('classify-j',data);
            $('.classify-d>ul').html(mis);
        }
    });
}