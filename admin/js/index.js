$(function () {
    $.ajax({
        url: BigNew.user_info,
        type: "get",
        headers: {
            "Authorization": localStorage.getItem('token')
        },
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                $('.user_info span').html('欢迎&nbsp;&nbsp;' + res.data.nickname)
                $('.user_info img').attr('src', res.data.userPic)
                $('.user_center_link img').attr('src', res.data.userPic)
            }
        }
    })
    //退出登录
    $('.logout').on('click', function () {
        window.location.href = './login.html';
        localStorage.removeItem('token');
    })

    $('.level01').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')

    })
    $('.level01:eq(1)').on('click', function () {
        $('.level02').slideToggle();
        $('.icon-arrowdownl').toggleClass('rotate0');
        $('.level02 li:eq(0)').addClass('active').siblings().removeClass('active');
    })
    $('.level02 li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');

    })

})