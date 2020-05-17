$(function () {
    $.ajax({
        url: BigNew.user_detail,
        type: 'get',
        headers: {
            'Authorization': localStorage.getItem('token')
        },
        success: function (res) {
            console.log(res);
            console.log(typeof res);
            if (res.code == 200) {
                for (var key in res.data) {
                    console.log(key);
                    $('#form .' + key).val(res.data[key]);
                }
                $('#form .user_pic').attr('src', res.data.userPic)
            }
        }
    })
    //使得修改的用户头像可以预览
    $('#exampleInputFile').on('change', function () {
        // this.files是一个文件列表,是一个数组,里面存着上传的文件信息
        var file = this.files[0];
        console.dir(file);
        console.log(typeof file);
        var fileUrl = URL.createObjectURL(file);
        $('#form .user_pic').attr('src', fileUrl);

    })



    $('#form').on('submit', function (e) {
        e.preventDefault()
        var data = new FormData(this);
        $.ajax({
            url: BigNew.user_edit,
            type: 'post',
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            data: data,
            contentType: false, // 不要进行其它编码 不需要额外编码就是二进制
            processData: false, // 不要转换成字符串
            success: function (res) {
                console.log(res);
                console.log(typeof res);
                if (res.code == 200) {
                    // 显示登陆的用户名 
                    window.parent.$('.user_info span i').html(res.data.nickname)

                    // 显示登陆的头像
                    window.parent.$('.user_info img').attr('src', res.data.userPic)

                    // 个人中心的图片也设置一样
                    window.parent.$('.user_center_link img').attr('src', res.data.userPic)
                }

            }
        })
    })






})