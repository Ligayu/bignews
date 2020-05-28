$(function () {
    //日期插件
    jeDate("#testico", {
        format: "YYYY-MM-DD",
        isTime: false,
        zIndex: 20999,  //修改日期插件的弹出层级
        isToday: true, // 是否显示本月或今天
        minDate: "2014-09-19 00:00:00"
    });
    //富文本插件
    var E = window.wangEditor
    var editor = new E('#editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create();

    //发送ajax请求获取文章所有的分类 
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        headers: {
            "Authorization": localStorage.getItem('token')
        },
        success: function (res) {
            console.log(res);
            if (res.code == 200) {
                // res.categoryId = categoryId;//给查询回来的信息添加一个键值对
                var htmlStr = template('categoryList', res)
                $('#selCategory').html(htmlStr)
            }

        }
    })

    $('#inputCover').on('change', function () {
        var file = this.files[0];
        var addStr = URL.createObjectURL(file);
        $('.article_cover').attr('src', addStr);
    })
    //获取form表单数据


    $('#form').on('click', '.btn', function (e) {
        e.preventDefault()
        let formData = new FormData($('#form')[0]);
        formData.append('content', editor.txt.html())
        if ($(e.target).hasClass('btn-release'))
            formData.append('state', '已发布')
        else
            formData.append('state', '草稿')

        $.ajax({
            url: BigNew.article_publish,
            type: 'post',
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    parent.$('.level02 li:eq(0)').addClass('active').siblings().removeClass('active');
                    window.location.href = './article_list.html'
                }

            }
        })


    })


})