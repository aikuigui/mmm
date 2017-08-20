$(function () {
    var site = GetQueryString('productid');
    //console.log(site);
    $.ajax({
        url: 'http://182.254.146.100:3000/api/getproduct',
        data: {
            'productid': site
        },
        success: function (data) {
            //console.log(data);
            var dataName = data.result[0].productName.split(" ")[0];  // split 方法用于把一个字符串分割成字符串数组。
            var dataName2 = data.result[0].productName;
            var dataimage = data.result[0].productImg;
            $('.commodity-name').html(dataName);
            $('.pic').html(dataimage);
            $('.pic-text').html(dataName2);
        }
    });
    discuss(site);
});

function discuss(site) {
    $.ajax({
        url: 'http://182.254.146.100:3000/api/getproductcom',
        data: {
            'productid': site
        },
        success: function (data) {
            var mis = template('discuss-s', data);
            $('.discuss-content').html(mis);
        }
    })
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}