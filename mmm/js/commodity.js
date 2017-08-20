$(function () {
    var site = GetQueryString('categoryid');     //采用正则表达式获取地址栏参数d的函数调用
    var site1 = GetQueryString('pageid');
    $.ajax({
        url: 'http://182.254.146.100:3000/api/getcategorybyid',
        data: {
            'categoryid': site      //请求传递过来的数据
        },
        success: function (data) {
            var commodityName = data.result[0].category; //从data数据中得到的数据
            $('.commodity-name').html(commodityName);
        }
    });

    commodity(site, site1);
});
function commodity(site, site1) {
    $.ajax({
        url: 'http://182.254.146.100:3000/api/getproductlist',
        data: {
            'categoryid': site,
            'pageid': site1         //请求传递过来的数据
        },
        success: function (data) {
            var commodity = template('commodity-s', data);  //绑定模板
            $('.commodity-s>ul').html(commodity);     //把模板渲染到页面上去

            //什么鬼？ es6 模板字符串
            var pageSize = data.pagesize;    // 每页大小
            var total = data.totalCount;     //总条数
            var Pages = Math.floor(total / pageSize);    //页数
            var mis = '';    //先定义一个空字符串  用于存储下面‘数据’
            if (Pages == 0) {
                mis += `<option>${1}</option>`;   //es6 模板字符串
            } else {   //如果超过1页以上就要循环遍厉
                for (var i = 0; i < Pages; i++) {
                    if((i+1)==site1){     //当前的索引值等于地址栏中的页数时
                        mis+=`<option selected>${1+i}</option>`;    // selected  当前选项被选中
                    }else {
                        mis+=`<option>${1+i}</option>`;
                    }
                }
            }
            $("#selectPage").html(mis);  //渲染到页面上
            $("#selectPage").on("change",function(){
                window.location.href=`./commodity.html?categoryid=${site}&pageid=${$(this).val()}`
            });  //当元素之发生变化时触发事件  跳转页面


            var pageid = site1-0;   //转换数值
            if(Pages>0){              //根据页数判断上一页和下一页
                var next = `./commodity.html?categoryid=${site}&pageid=${pageid+1}`;
                $(".page-x a").attr("href",next);    //attr()方法设置或返回被选元素的属性值。   下一页
                if(Pages!=pageid&&Pages>1){
                    //3    1或者2
                    if(pageid==1){
                        //1
                        var previous = `./commodity.html?categoryid=${site}&pageid=${pageid}`;
                        $(".page-s a").attr("href",previous);   //上一页
                    }
                    else{
                        //2
                        var previous = `./commodity.html?categoryid=${site}&pageid=${pageid-1}`;
                        $(".page-s a").attr("href",previous);
                    }
                }
                else{
                    //3 3   1 1
                    if(Pages==1){
                        //1 1
                        var previous = `./commodity.html?categoryid=${site}&pageid=${pageid}`;
                        $(".page-s a").attr("href",previous);
                        var next = `./commodity.html?categoryid=${site}&pageid=${pageid}`;
                        $(".page-x a").attr("href",next);
                    }
                    else{
                        //3 3
                        var previous = `./commodity.html?categoryid=${site}&pageid=${pageid-1}`;
                        $(".page-s a").attr("href",previous);
                        var next = `./commodity.html?categoryid=${site}&pageid=${pageid}`;
                        $(".page-x a").attr("href",next);
                    }
                }
            }
        }
    })
}

//采用正则表达式获取地址栏参数的函数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}