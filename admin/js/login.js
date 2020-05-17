$(function () {
    $('.login_form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: window.BigNew.user_login,
            type: "post",
            data: $(this).serialize(),
            beforeSend: function () {
                $('.login_form input[name]').each(function (index, value) {
                    console.log($(value));
                    if (!$.trim($(value).val())) {
                        $('.modal').modal('show');
                        $('.modal-body p').html('用户名或密码不能为空');
                    }
                })
            },
            success: function (res) {
                $('.modal').modal('show');
                $('.modal-body p').html(res.msg);
                // console.log(res.token);
                if (res.code == 200) {
                    $('.modal').on('hidden.bs.modal', function () {
                        localStorage.setItem('token', res.token);
                        window.location.href = './index.html';
                    })
                } else {
                    $('.login_form input[name]').val('');
                }
            }

        })
    })






})