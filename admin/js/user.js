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

                if (res.code == 200) {
                    $.ajax({
                        type: 'get',
                        // url:'http://localhost:8080/api/v1/admin/user/info',
                        url: BigNew.user_info,
                        headers: {
                            'Authorization': localStorage.getItem('token')
                        },
                        success: function (res) {
                            console.log(res);
                            // 1.2. 请求回来数据后要渲染到页面
                            if (res.code == 200) {
                                // 显示登陆的用户名 
                                parent.$('.user_info span i').text(res.data.nickname)

                                // 显示登陆的头像
                                parent.$('.user_info img').attr('src', res.data.userPic)

                                // 个人中心的图片也设置一样
                                parent.$('.user_center_link img').attr('src', res.data.userPic)
                            }
                        }
                    })
                }

            }
        })
    })






})