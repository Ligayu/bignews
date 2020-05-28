(function () {
    //封装了一个字符串转成对象键值对的方法
    var utils = {
        convertToObj: function (str) {
            var obj = {}
            var arry = str.split('&');
            for (var i = 0; i < arry.length; i++) {
                var temp = arry[i].split('=');
                obj[temp[0]] = temp[1];
            }
            return obj;
        }
    }
    window.utils = utils;
}());